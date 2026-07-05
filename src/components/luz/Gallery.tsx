import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Category = "auto" | "home";

type Project = {
  id: string;
  title: string;
  description?: string;
  category: Category;
  image: string;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Luxury Sedan Full Detail",
    description: "Paint decontamination, interior deep clean, and gloss restoration.",
    category: "auto",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p2",
    title: "Driveway Pressure Wash",
    description: "Years of grime lifted for a like-new concrete finish.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p3",
    title: "SUV Exterior Restoration",
    description: "Hand wash, wax, and headlight restoration in one visit.",
    category: "auto",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p4",
    title: "House Soft Wash",
    description: "Safe, low-pressure exterior cleaning for siding and trim.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p5",
    title: "Interior Deep Clean",
    description: "Upholstery, carpets, and dash treated to a factory-fresh feel.",
    category: "auto",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p6",
    title: "Patio & Pool Deck Refresh",
    description: "Stain removal and surface brightening for outdoor living areas.",
    category: "home",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
];

const FILTERS: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "auto", label: "Auto" },
  { key: "home", label: "Home" },
];

export default function Gallery() {
  const navigate = useNavigate();
  const [active, setActive] = useState<"all" | Category>("all");

  const items = useMemo(
    () => (active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            See the Difference Quality Makes
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Real results from real projects. Every detail matters, and our work speaks for itself.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-14">
          {FILTERS.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={[
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 animate-fade-in"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/90 text-primary-foreground backdrop-blur">
                  {p.category === "auto" ? "Auto" : "Home"}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                {p.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 md:mt-24 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-foreground">
            Ready to Transform Your Vehicle or Property?
          </h3>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Get a free quote today and let SoSpreadShine bring back the shine.
          </p>
          <Button
            onClick={() => navigate("/contact")}
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold tracking-wide rounded-full shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get My Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
