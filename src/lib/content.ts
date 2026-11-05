import { getCollection, type CollectionEntry } from 'astro:content';
import { POLICY_DOCS, type PolicyDoc } from '../config';

export type Product = CollectionEntry<'products'>;
export type Policy = CollectionEntry<'policies'>;

export async function getProducts(): Promise<Product[]> {
  const all = await getCollection('products');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

export const productHref = (slug: string) => `/${slug}/`;
export const policyHref = (slug: string, doc: PolicyDoc) => `/${slug}/${doc}/`;

/** Split a policy entry id ("easykara/privacy") into its product slug and doc key. */
export function parsePolicyId(id: string): { product: string; doc: PolicyDoc } | null {
  const [product, doc] = id.split('/');
  if (!product || !doc || !(doc in POLICY_DOCS)) return null;
  return { product, doc: doc as PolicyDoc };
}

export interface PolicyLink {
  doc: PolicyDoc;
  label: string;
  href: string;
  updated: string;
}

/** Map of product slug → its policy docs, in POLICY_DOCS order. */
export async function getPolicyIndex(): Promise<Map<string, PolicyLink[]>> {
  const entries = await getCollection('policies');
  const index = new Map<string, PolicyLink[]>();
  for (const entry of entries) {
    const parsed = parsePolicyId(entry.id);
    if (!parsed) continue;
    const list = index.get(parsed.product) ?? [];
    list.push({
      doc: parsed.doc,
      label: POLICY_DOCS[parsed.doc],
      href: policyHref(parsed.product, parsed.doc),
      updated: entry.data.updated,
    });
    index.set(parsed.product, list);
  }
  const order = Object.keys(POLICY_DOCS);
  for (const list of index.values()) list.sort((a, b) => order.indexOf(a.doc) - order.indexOf(b.doc));
  return index;
}
