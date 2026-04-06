import { parse } from 'yaml';
import yamlRaw from '$lib/data/shop-items.yaml?raw';

/** @returns {Promise<{ items: Array<{ img: string, name: string, desc: string, price: number, locked: boolean }> }>} */
export async function load() {
  const parsed = parse(yamlRaw);

  const items = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.items)
      ? parsed.items
      : [];

  return {
    items: items.map((item) => ({
      img: String(item.img ?? ''),
      name: String(item.name ?? 'Unnamed Item'),
      desc: String(item.desc ?? ''),
      price: Number(item.price ?? 0),
      locked: Boolean(item.locked)
    }))
  };
}
