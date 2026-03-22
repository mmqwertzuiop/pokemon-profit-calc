// Vercel serverless function — Cardmarket API proxy (OAuth 1.0a)
// ENV vars required: CM_APP_TOKEN, CM_APP_SECRET, CM_ACCESS_TOKEN, CM_ACCESS_SECRET

import crypto from 'crypto'

const CM_BASE = 'https://api.cardmarket.com/ws/v2.0/output.json'

function buildAuthHeader(method, url, appToken, appSecret, accessToken, accessSecret) {
  const nonce = crypto.randomBytes(16).toString('hex')
  const ts = Math.floor(Date.now() / 1000).toString()

  const oauthParams = {
    oauth_consumer_key: appToken,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: ts,
    oauth_token: accessToken,
    oauth_version: '1.0',
  }

  // Parse URL query params into oauth params for base string
  const urlObj = new URL(url)
  const allParams = { ...oauthParams }
  urlObj.searchParams.forEach((v, k) => { allParams[k] = v })

  const sortedParams = Object.keys(allParams)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(allParams[k])}`)
    .join('&')

  const baseUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`
  const baseString = `${method}&${percentEncode(baseUrl)}&${percentEncode(sortedParams)}`
  const signingKey = `${percentEncode(appSecret)}&${percentEncode(accessSecret)}`
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64')

  oauthParams.oauth_signature = signature

  const headerValue = 'OAuth realm="",' +
    Object.entries(oauthParams)
      .map(([k, v]) => `${k}="${percentEncode(v)}"`)
      .join(',')

  return headerValue
}

function percentEncode(str) {
  return encodeURIComponent(String(str))
    .replace(/!/g, '%21').replace(/'/g, '%27')
    .replace(/\(/g, '%28').replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
}

async function cmGet(path, appToken, appSecret, accessToken, accessSecret) {
  const url = `${CM_BASE}${path}`
  const auth = buildAuthHeader('GET', url, appToken, appSecret, accessToken, accessSecret)
  const res = await fetch(url, {
    headers: { Authorization: auth, Accept: 'application/json' },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`CM ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { name, type } = req.query
  if (!name) return res.status(400).json({ error: 'name required' })

  const appToken = process.env.CM_APP_TOKEN
  const appSecret = process.env.CM_APP_SECRET
  const accessToken = process.env.CM_ACCESS_TOKEN
  const accessSecret = process.env.CM_ACCESS_SECRET

  if (!appToken || !appSecret || !accessToken || !accessSecret) {
    return res.status(500).json({ error: 'CM API credentials not configured' })
  }

  try {
    // Step 1: search for product
    // categoryId=1 = Pokemon
    const searchPath = `/products/${encodeURIComponent(name)}/1/1/0`
    const searchData = await cmGet(searchPath, appToken, appSecret, accessToken, accessSecret)

    const products = searchData.product ?? []
    if (products.length === 0) {
      return res.status(200).json({ found: false })
    }

    // Try to find best match by name similarity + type
    let match = products[0]
    const nameLower = name.toLowerCase()
    const typeLower = (type ?? '').toLowerCase()

    for (const p of products) {
      const pName = (p.enName ?? p.locName ?? '').toLowerCase()
      if (pName === nameLower) { match = p; break }
      if (pName.includes(nameLower) && typeLower && pName.includes(typeLower)) { match = p; break }
    }

    const idProduct = match.idProduct
    const cmUrl = match.website ?? `https://www.cardmarket.com/en/Pokemon/Products/Singles/${idProduct}`

    // Step 2: fetch price guide for this product
    const priceData = await cmGet(`/products/${idProduct}`, appToken, appSecret, accessToken, accessSecret)
    const guide = priceData.product?.priceGuide ?? {}

    // priceGuide keys: LOW, LOWEX, LOWFOIL, AVG, AVG1, AVG7, AVG30, TREND, SELL
    const low = guide.LOW ?? guide.LOWEX ?? null
    const avg = guide.AVG ?? guide.AVG7 ?? null
    const trend = guide.TREND ?? null
    const sell = guide.SELL ?? null

    return res.status(200).json({
      found: true,
      name: match.enName ?? match.locName,
      low,
      avg,
      trend,
      sell,
      url: cmUrl,
      idProduct,
    })
  } catch (err) {
    console.error('CM API error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
