let _rate = null
let _fetchedAt = 0

// Fetch live EUR/USD rate, cache na 1 hodinu
export async function getEurUsdRate() {
  if (_rate && Date.now() - _fetchedAt < 3_600_000) return _rate
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD')
    const data = await res.json()
    _rate = data.rates?.EUR ?? 0.92
    _fetchedAt = Date.now()
    return _rate
  } catch {
    return _rate ?? 0.92
  }
}

export function usdToEur(usd, rate = 0.92) {
  if (!usd) return null
  return Math.round(usd * rate * 100) / 100
}
