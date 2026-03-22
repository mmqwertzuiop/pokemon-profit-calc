// Auto price fetching via Vercel API routes

export async function fetchCMPrice(name) {
  try {
    const res = await fetch(`/api/cardmarket?name=${encodeURIComponent(name)}`)
    if (!res.ok) return null
    const data = await res.json()
    if (!data.found) return null
    return {
      low: data.low,
      avg: data.avg,
      trend: data.trend,
      sell: data.sell,
      url: data.url,
      fetchedAt: Date.now(),
    }
  } catch {
    return null
  }
}

export async function fetchEbayPrice(name) {
  try {
    const res = await fetch(`/api/ebay?name=${encodeURIComponent(name)}`)
    if (!res.ok) return null
    const data = await res.json()
    if (!data.found) return null
    return {
      avg: data.avg,
      low: data.low,
      high: data.high,
      count: data.count,
      fetchedAt: Date.now(),
    }
  } catch {
    return null
  }
}
