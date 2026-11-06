/**
 * /sitemap.xml — every public page, built at compile time.
 * Static .astro routes (home, custom app pages) are discovered with import.meta.glob;
 * dynamic routes come from the same collections their getStaticPaths use.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getProducts, parsePolicyId, policyHref, productHref } from '../lib/content';

const staticPages = Object.keys(import.meta.glob('./**/*.astro'))
  // Skip non-route helpers (_*), dynamic routes ([*]) and the 404 page.
  .filter((f) => !/\/_|\[|\/404\.astro$/.test(f))
  .map((f) => f.replace(/^\.\//, '/').replace(/(index)?\.astro$/, ''))
  .map((p) => (p.endsWith('/') ? p : `${p}/`));

export const GET: APIRoute = async ({ site }) => {
  const products = await getProducts();
  const policies = (await getCollection('policies'))
    .map((e) => parsePolicyId(e.id))
    .filter((p) => p !== null)
    .map((p) => policyHref(p.product, p.doc));

  const paths = new Set<string>([
    ...staticPages,
    // Every product has a page: generic route or its own custom folder.
    ...products.filter((p) => !p.data.url || p.data.customPage).map((p) => productHref(p.id)),
    ...policies,
  ]);

  const urls = [...paths]
    .sort()
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
