import { useLocalStorage } from './useLocalStorage'

// Cache formát: { [productId]: { cmPrice, ebayPrice, cmUpdatedAt, ebayUpdatedAt, source } }
// source: 'api' (pokemontcg.io) | 'manual' (user zadal) | 'db' (lokálna databáza)

export function usePriceCache() {
  const [cache, setCache] = useLocalStorage('pkm-price-cache-v2', {})

  const getCache = (id) => cache[id] ?? null

  const saveToCache = (id, { cmPrice, ebayPrice, cmUpdatedAt, ebayUpdatedAt, source }) => {
    setCache((prev) => {
      const existing = prev[id] ?? {}
      return {
        ...prev,
        [id]: {
          cmPrice: cmPrice ?? existing.cmPrice,
          ebayPrice: ebayPrice ?? existing.ebayPrice,
          cmUpdatedAt: cmUpdatedAt ?? existing.cmUpdatedAt,
          ebayUpdatedAt: ebayUpdatedAt ?? existing.ebayUpdatedAt,
          source: source ?? existing.source ?? 'manual',
        },
      }
    })
  }

  // Enrichí produkt o ceny z cache (ak produkt nemá vlastné ceny)
  const enrichProduct = (product) => {
    const cached = cache[product.id]
    if (!cached) return product
    return {
      ...product,
      cmPrice: product.cmPrice ?? cached.cmPrice,
      ebayPrice: product.ebayPrice ?? cached.ebayPrice,
      cmUpdatedAt: product.cmUpdatedAt ?? cached.cmUpdatedAt,
      ebayUpdatedAt: product.ebayUpdatedAt ?? cached.ebayUpdatedAt,
      priceSource: product.cmPrice ? product.priceSource : (cached.source ?? 'cache'),
    }
  }

  return { getCache, saveToCache, enrichProduct }
}
