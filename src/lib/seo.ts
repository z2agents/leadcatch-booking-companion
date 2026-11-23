export const SITE_URL = "https://leadcatch-booking-companion.lovable.app";

/** Per-page title, description, social tags and canonical link. */
export function pageHead(path: string, title: string, description: string, opts: { noindex?: boolean } = {}) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      ...(opts.noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
