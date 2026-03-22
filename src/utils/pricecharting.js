const PC_API = 'https://www.pricecharting.com/api'

// Hľadá produkty na PriceCharting, filtruje na Pokémon
export async function searchPC(query, token) {
  if (!token?.trim()) return []
  try {
    const url = `${PC_API}/products?q=${encodeURIComponent(query)}&t=${token.trim()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.status !== 'success') return []
    return (data.products || []).filter((p) =>
      (p['console-name'] || '').toLowerCase().includes('pokemon')
    )
  } catch (e) {
    console.warn('PriceCharting search error:', e.message)
    return []
  }
}

// Načíta ceny konkrétneho produktu
export async function getPCProductPrice(productId, token) {
  if (!token?.trim() || !productId) return null
  try {
    const url = `${PC_API}/product?id=${productId}&t=${token.trim()}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.status !== 'success') return null

    const consoleName = (data['console-name'] || '').toLowerCase().replace(/\s+/g, '-')
    const productSlug = (data['id'] || '').toString()

    return {
      productId: data['id'],
      name: data['product-name'],
      // Ceny v USD (pricecharing ukladá v centoch → delíme 100)
      newPrice:      data['new-price']      ? data['new-price'] / 100      : null, // sealed
      loosePrice:    data['loose-price']    ? data['loose-price'] / 100    : null, // ungraded single
      completePrice: data['complete-price'] ? data['complete-price'] / 100 : null, // CIB
      gradedPrice:   data['graded-price']   ? data['graded-price'] / 100   : null,
      url: `https://www.pricecharting.com/game/${consoleName}/${productSlug}`,
    }
  } catch (e) {
    console.warn('PriceCharting fetch error:', e.message)
    return null
  }
}

// Nájde najlepší match zo zoznamu výsledkov (skóre podľa prekryvu slov)
export function findBestMatch(products, query) {
  if (!products.length) return null
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const scored = products.map((p) => {
    const name = (p['product-name'] || '').toLowerCase()
    const hits = words.filter((w) => name.includes(w)).length
    return { product: p, score: hits / words.length }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored[0]?.score >= 0.4 ? scored[0].product : null
}
