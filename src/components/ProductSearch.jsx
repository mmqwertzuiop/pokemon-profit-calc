import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, Plus, Loader2, Zap } from 'lucide-react'
import { sealedProducts, PRODUCT_TYPES } from '../data/products'

const PKM_API = 'https://api.pokemontcg.io/v2'

// Vráti najrelevantnejšiu cenu karty z TCGPlayer (USD → EUR konverzia ~0.92)
function getBestTcgPrice(tcgplayer) {
  if (!tcgplayer?.prices) return null
  const p = tcgplayer.prices
  const market =
    p.holofoil?.market ??
    p['1stEditionHolofoil']?.market ??
    p.reverseHolofoil?.market ??
    p.normal?.market ??
    Object.values(p)[0]?.market ??
    null
  return market ? Math.round(market * 0.92 * 100) / 100 : null
}

// Vráti CM trendovú cenu (EUR)
function getCmPrice(cardmarket) {
  if (!cardmarket?.prices) return null
  const p = cardmarket.prices
  return p.trendPrice ?? p.averageSellPrice ?? p.avg7 ?? null
}

async function fetchCards(query) {
  const q = query.trim()
  if (q.length < 2) return []
  try {
    const url = `${PKM_API}/cards?q=name:"${encodeURIComponent(q)}"&pageSize=10&orderBy=-set.releaseDate`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return (data.data || []).map((card) => ({
      id: card.id,
      name: card.name,
      set: card.set?.name ?? '',
      setCode: card.set?.id ?? '',
      type: 'Single',
      rarity: card.rarity ?? '',
      image: card.images?.small ?? null,
      number: card.number ?? '',
      cmPrice: getCmPrice(card.cardmarket),
      ebayPrice: getBestTcgPrice(card.tcgplayer),
      cardmarketUrl: card.cardmarket?.url ?? null,
      tcgplayerUrl: card.tcgplayer?.url ?? null,
      source: 'api',
    }))
  } catch {
    return []
  }
}

function filterSealed(query) {
  const q = query.toLowerCase().trim()
  if (!q) return sealedProducts.slice(0, 8)
  return sealedProducts
    .filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.set.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    )
    .slice(0, 10)
}

function TypeBadge({ type }) {
  const colors = {
    'ETB': 'bg-blue-900/60 text-blue-300',
    'Booster Box': 'bg-purple-900/60 text-purple-300',
    'Single': 'bg-amber-900/60 text-amber-300',
    'UPC': 'bg-green-900/60 text-green-300',
    'Tin': 'bg-cyan-900/60 text-cyan-300',
    'Blister': 'bg-pink-900/60 text-pink-300',
    'Bundle': 'bg-orange-900/60 text-orange-300',
  }
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 ${colors[type] ?? 'bg-gray-800 text-gray-400'}`}>
      {type}
    </span>
  )
}

export default function ProductSearch({ onAdd }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [sealedResults, setSealedResults] = useState([])
  const [cardResults, setCardResults] = useState([])
  const [loadingCards, setLoadingCards] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customType, setCustomType] = useState('ETB')
  const [showCustom, setShowCustom] = useState(false)
  const dropdownRef = useRef(null)
  const timerRef = useRef(null)

  // Keď sa zmení query
  useEffect(() => {
    const q = query.trim()
    setSealedResults(filterSealed(q))

    clearTimeout(timerRef.current)
    if (q.length >= 2) {
      setLoadingCards(true)
      timerRef.current = setTimeout(async () => {
        const cards = await fetchCards(q)
        setCardResults(cards)
        setLoadingCards(false)
      }, 400)
    } else {
      setCardResults([])
      setLoadingCards(false)
    }

    return () => clearTimeout(timerRef.current)
  }, [query])

  // Klik mimo zavrieť
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (product) => {
    onAdd({ ...product, buyPrice: '', qty: 1 })
    setQuery('')
    setOpen(false)
    setCardResults([])
  }

  const handleAddCustom = () => {
    if (!customName.trim()) return
    onAdd({
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      set: 'Vlastný',
      type: customType,
      cmPrice: null,
      ebayPrice: null,
      buyPrice: '',
      qty: 1,
      source: 'custom',
    })
    setCustomName('')
    setShowCustom(false)
  }

  const hasResults = sealedResults.length > 0 || cardResults.length > 0 || loadingCards

  return (
    <div className="space-y-3">
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            placeholder="Hľadaj produkt alebo kartu... (napr. ETB, Charizard, Pikachu)"
            className="w-full bg-pkm-dark border border-pkm-border text-gray-200 text-sm rounded-lg pl-9 pr-10 py-2.5 focus:outline-none focus:border-pkm-yellow placeholder-gray-600"
          />
          {loadingCards && (
            <Loader2 className="absolute right-3 top-2.5 w-4 h-4 text-pkm-yellow animate-spin" />
          )}
        </div>

        {open && (query.length >= 1 || sealedResults.length > 0) && (
          <div className="absolute z-50 w-full mt-1 bg-[#1a1d27] border border-pkm-border rounded-xl shadow-2xl overflow-hidden">
            {/* Sealed produkty */}
            {sealedResults.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider bg-black/20">
                  Sealed produkty
                </div>
                <ul className="divide-y divide-pkm-border max-h-48 overflow-y-auto">
                  {sealedResults.map((p) => (
                    <li
                      key={p.id}
                      onMouseDown={() => handleSelect(p)}
                      className="px-3 py-2.5 hover:bg-white/5 cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-gray-200 truncate">{p.name}</div>
                        <div className="text-xs text-gray-500 truncate">{p.set}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <TypeBadge type={p.type} />
                        {p.cmPrice && (
                          <span className="text-xs text-blue-400">CM €{p.cmPrice}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Karty z API */}
            {(cardResults.length > 0 || loadingCards) && (
              <div>
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider bg-black/20 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-pkm-yellow" />
                  Singles (live dáta)
                  {loadingCards && <Loader2 className="w-3 h-3 text-pkm-yellow animate-spin" />}
                </div>
                {loadingCards && cardResults.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-600">Hľadám karty...</div>
                ) : (
                  <ul className="divide-y divide-pkm-border max-h-64 overflow-y-auto">
                    {cardResults.map((card) => (
                      <li
                        key={card.id}
                        onMouseDown={() => handleSelect(card)}
                        className="px-3 py-2 hover:bg-white/5 cursor-pointer flex items-center gap-3"
                      >
                        {card.image && (
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-8 h-11 object-contain rounded shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-200 truncate">{card.name}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {card.set} {card.number ? `· #${card.number}` : ''} {card.rarity ? `· ${card.rarity}` : ''}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          {card.cmPrice && (
                            <div className="text-xs text-blue-400">CM €{card.cmPrice}</div>
                          )}
                          {card.ebayPrice && (
                            <div className="text-xs text-yellow-500">TCG ~€{card.ebayPrice}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!hasResults && query.length >= 2 && !loadingCards && (
              <div className="px-4 py-4 text-sm text-gray-600 text-center">
                Nič sa nenašlo — skús iný názov alebo pridaj manuálne
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom produkt */}
      {showCustom ? (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
            placeholder="Názov produktu..."
            className="flex-1 bg-pkm-dark border border-pkm-border text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-pkm-yellow placeholder-gray-600"
            autoFocus
          />
          <select
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="bg-pkm-dark border border-pkm-border text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-pkm-yellow"
          >
            {PRODUCT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            onClick={handleAddCustom}
            className="bg-pkm-yellow text-black text-sm font-bold px-3 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => setShowCustom(false)} className="text-gray-500 px-2 py-2 hover:text-gray-300">✕</button>
        </div>
      ) : (
        <button
          onClick={() => setShowCustom(true)}
          className="text-xs text-gray-600 hover:text-pkm-yellow transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Pridať vlastný produkt (nie je v databáze)
        </button>
      )}
    </div>
  )
}
