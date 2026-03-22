// Vercel serverless function — eBay Finding API proxy
// ENV var required: EBAY_APP_ID

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { name } = req.query
  if (!name) return res.status(400).json({ error: 'name required' })

  const appId = process.env.EBAY_APP_ID
  if (!appId) return res.status(500).json({ error: 'EBAY_APP_ID not configured' })

  try {
    const keyword = `${name} pokemon`
    const url = new URL('https://svcs.ebay.com/services/search/FindingService/v1')
    url.searchParams.set('OPERATION-NAME', 'findCompletedItems')
    url.searchParams.set('SERVICE-VERSION', '1.0.0')
    url.searchParams.set('SECURITY-APPNAME', appId)
    url.searchParams.set('RESPONSE-DATA-FORMAT', 'JSON')
    url.searchParams.set('keywords', keyword)
    url.searchParams.set('categoryId', '2536') // Trading Card Games
    url.searchParams.set('itemFilter(0).name', 'SoldItemsOnly')
    url.searchParams.set('itemFilter(0).value', 'true')
    url.searchParams.set('itemFilter(1).name', 'Currency')
    url.searchParams.set('itemFilter(1).value', 'EUR')
    url.searchParams.set('sortOrder', 'EndTimeSoonest')
    url.searchParams.set('paginationInput.entriesPerPage', '20')

    const ebayRes = await fetch(url.toString())
    if (!ebayRes.ok) throw new Error(`eBay HTTP ${ebayRes.status}`)
    const data = await ebayRes.json()

    const resp = data.findCompletedItemsResponse?.[0]
    if (resp?.ack?.[0] !== 'Success' && resp?.ack?.[0] !== 'Warning') {
      return res.status(200).json({ found: false, error: resp?.errorMessage?.[0]?.error?.[0]?.message?.[0] })
    }

    const items = resp.searchResult?.[0]?.item ?? []
    if (items.length === 0) return res.status(200).json({ found: false, count: 0 })

    const prices = items
      .map((i) => parseFloat(i.sellingStatus?.[0]?.currentPrice?.[0]?.__value__))
      .filter((p) => !isNaN(p) && p > 0)

    if (prices.length === 0) return res.status(200).json({ found: false, count: 0 })

    const avg = prices.reduce((a, b) => a + b, 0) / prices.length
    const low = Math.min(...prices)
    const high = Math.max(...prices)

    // Filter outliers (within 1.5x IQR) for better avg
    prices.sort((a, b) => a - b)
    const q1 = prices[Math.floor(prices.length * 0.25)]
    const q3 = prices[Math.floor(prices.length * 0.75)]
    const iqr = q3 - q1
    const filtered = prices.filter((p) => p >= q1 - 1.5 * iqr && p <= q3 + 1.5 * iqr)
    const cleanAvg = filtered.length > 0
      ? filtered.reduce((a, b) => a + b, 0) / filtered.length
      : avg

    return res.status(200).json({
      found: true,
      avg: Math.round(cleanAvg * 100) / 100,
      low: Math.round(low * 100) / 100,
      high: Math.round(high * 100) / 100,
      count: prices.length,
      currency: 'EUR',
    })
  } catch (err) {
    console.error('eBay API error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
