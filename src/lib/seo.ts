const SITE_URL = "https://sospreadshine.lovable.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULTS = {
  title: "SoSpreadShine | Premium Auto Detailing & Shine Services",
  description:
    "SoSpreadShine — professional auto detailing and finishing services. We know your expectations, let us spread the shine.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
};

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export type SeoOptions = {
  title?: string;
  description?: string;
  image?: string;
  path?: string; // e.g. "/guide"
  type?: string; // og:type
};

export function setPageSeo(opts: SeoOptions = {}) {
  const title = opts.title ?? DEFAULTS.title;
  const description = opts.description ?? DEFAULTS.description;
  const image = opts.image ?? DEFAULTS.image;
  const type = opts.type ?? DEFAULTS.type;
  const url =
    SITE_URL +
    (opts.path ?? (typeof window !== "undefined" ? window.location.pathname : "/"));

  document.title = title;

  upsertMeta('meta[name="description"]', "name", "description", description);

  upsertMeta('meta[property="og:title"]', "property", "og:title", title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", description);
  upsertMeta('meta[property="og:image"]', "property", "og:image", image);
  upsertMeta('meta[property="og:url"]', "property", "og:url", url);
  upsertMeta('meta[property="og:type"]', "property", "og:type", type);
  upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "SoSpreadShine");

  upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
  upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

  upsertCanonical(url);
}

export const SEO_DEFAULTS = DEFAULTS;