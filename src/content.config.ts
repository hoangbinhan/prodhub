import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), href: z.string() });

/** One JSON file per app in src/content/products/. File name = URL slug. */
const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    mono: z.string().max(2),
    accent: z.string().default('#1E3FD8'),
    status: z.enum(['Live', 'Beta', 'Android', 'Coming soon']),
    order: z.number().default(100),
    /** External site. When set, "View app" on the home card opens it instead of the local landing page. */
    url: z.url().optional(),
    /**
     * The app has its own hand-built pages in src/pages/<slug>/ (own design),
     * so the generic landing route must not generate /<slug>/.
     */
    customPage: z.boolean().default(false),
    /** Square app icon image. Falls back to the `mono` letter tile. */
    icon: z.string().optional(),
    desc: z.string(),
    platforms: z.array(z.string()),
    supportEmail: z.string().optional(),

    // Landing page content — every section is optional and only renders when present.
    nav: z.object({ cta: link.optional() }).optional(),
    hero: z
      .object({
        badge: z.string().optional(),
        title: z.string(),
        subtitle: z.string(),
        primary: link.optional(),
        secondary: link.optional(),
        note: z.string().optional(),
        screenshot: z
          .object({ src: z.string().optional(), alt: z.string(), caption: z.string().optional() })
          .optional(),
      })
      .optional(),
    features: z
      .array(z.object({ icon: z.string(), title: z.string(), desc: z.string() }))
      .optional(),
    pricing: z
      .array(
        z.object({
          name: z.string(),
          price: z.string(),
          desc: z.string(),
          cta: link,
          highlight: z.boolean().default(false),
        }),
      )
      .optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

/** Markdown policies at src/content/policies/<product-slug>/<doc>.md */
const policies = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/policies' }),
  schema: z.object({
    title: z.string(),
    effective: z.string(),
    updated: z.string(),
    summary: z.string().optional(),
  }),
});

export const collections = { products, policies };
