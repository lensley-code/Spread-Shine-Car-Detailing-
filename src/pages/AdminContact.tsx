import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

type Submission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "new" | "read" | "replied";
  admin_notes: string | null;
};

const AdminContact = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) console.error("[admin] role check failed", error);
      setIsAdmin(!!data);
    })();
  }, [session]);

  const load = async () => {
    setLoading(true);
    let q = supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(200);
    if (filter !== "all") q = q.eq("status", filter);
    const { data, error } = await q;
    if (error) { console.error(error); toast.error("Failed to load submissions"); }
    else setItems(data as Submission[]);
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin, filter]);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/contact` },
    });
    setSending(false);
    if (error) toast.error(error.message);
    else toast.success("Magic link sent — check your inbox.");
  };

  const updateStatus = async (id: string, status: Submission["status"]) => {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) { toast.error("Update failed"); return; }
    setItems(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  // ── Sign-in screen ─────────────────────────────────────
  if (!session) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <Navbar />
        <div className="container mx-auto max-w-md px-6 py-32">
          <h1 className="font-heading text-3xl mb-2" style={{ color: "var(--color-navy)" }}>Admin sign in</h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-light)" }}>
            Enter your admin email to receive a magic link.
          </p>
          <form onSubmit={sendMagicLink} className="space-y-4">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@luz-astrology.com"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: "var(--color-white)", border: "1.5px solid var(--color-border)" }}
            />
            <button type="submit" disabled={sending}
              className="w-full rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider"
              style={{ background: "var(--color-gold)", color: "var(--color-white)", opacity: sending ? 0.7 : 1 }}>
              {sending ? "Sending…" : "Send magic link"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Awaiting role check / not admin ────────────────────
  if (isAdmin === null) return <div className="p-12 text-center">Checking access…</div>;
  if (!isAdmin) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <Navbar />
        <div className="container mx-auto max-w-md px-6 py-32 text-center">
          <h1 className="font-heading text-2xl mb-4" style={{ color: "var(--color-navy)" }}>Access denied</h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-light)" }}>
            Signed in as <strong>{session.user.email}</strong>, but this account is not an admin.
          </p>
          <button onClick={() => supabase.auth.signOut()} className="text-sm underline">Sign out</button>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl mb-1" style={{ color: "var(--color-navy)" }}>Contact submissions</h1>
            <p className="text-xs" style={{ color: "var(--color-text-light)" }}>
              {items.length} {filter !== "all" ? filter + " " : ""}message{items.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {(["all", "new", "read", "replied"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{
                  background: filter === f ? "var(--color-navy)" : "var(--color-white)",
                  color: filter === f ? "var(--color-white)" : "var(--color-navy)",
                  border: "1px solid var(--color-border)",
                }}>{f}</button>
            ))}
            <button onClick={load} className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider"
              style={{ border: "1px solid var(--color-border)" }}>Refresh</button>
            <button onClick={() => supabase.auth.signOut()} className="px-3 py-1.5 text-xs underline">Sign out</button>
          </div>
        </div>

        {loading ? <div className="text-center py-12 text-sm">Loading…</div> :
         items.length === 0 ? <div className="text-center py-12 text-sm" style={{ color: "var(--color-text-light)" }}>No submissions yet.</div> :
         (
          <div className="space-y-4">
            {items.map(s => (
              <div key={s.id} className="rounded-2xl p-5 sm:p-6"
                style={{ background: "var(--color-white)", border: "1px solid var(--color-border)" }}>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="font-semibold" style={{ color: "var(--color-navy)" }}>{s.name}</div>
                    <a href={`mailto:${s.email}`} className="text-sm underline" style={{ color: "var(--color-gold)" }}>{s.email}</a>
                    <div className="text-xs mt-1" style={{ color: "var(--color-text-light)" }}>
                      {new Date(s.created_at).toLocaleString()} · {s.topic}
                    </div>
                  </div>
                  <select value={s.status} onChange={(e) => updateStatus(s.id, e.target.value as Submission["status"])}
                    className="text-xs rounded-full px-3 py-1.5 uppercase tracking-wider"
                    style={{
                      background: s.status === "new" ? "#fef3c7" : s.status === "read" ? "#e0e7ff" : "#d1fae5",
                      border: "1px solid var(--color-border)",
                    }}>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
                <div className="text-sm whitespace-pre-wrap" style={{ color: "var(--color-text)", lineHeight: 1.7 }}>
                  {s.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;