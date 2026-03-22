import { useState, useRef, useEffect } from 'react'
import { Search, Plus, Loader2, Zap, Package } from 'lucide-react'
import { sealedProducts, PRODUCT_TYPES } from '../data/products'

const PKM_API = 'https://api.pokemontcg.io/v2'

// ─── API helpers ──────────────────────────────────────────────────────────────

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

function getCmPrice(cardmarket) {
  if (!cardmarket?.prices) return null
  const p = cardmarket.prices
  return p.trendPrice ?? p.averageSellPrice ?? p.avg7 ?? null
}

// Konvertuje "2024/01/15" → timestamp
function cmDateToTs(dateStr) {
  if (!dateStr) return null
  try { return new Date(dateStr.replace(/\//g, '-')).getTime() } catch { return null }
}

async function fetchCards(query) {
  if (query.trim().length < 2) return []
  try {
    const url = `${PKM_API}/cards?q=name:"${encodeURIComponent(query.trim())}"&pageSize=10&orderBy=-set.releaseDate`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return (data.data || []).map((card) => ({
      id: card.id,
      name: card.name,
      set: card.set?.name ?? '',
      type: 'Single',
      rarity: card.rarity ?? '',
      image: card.images?.small ?? null,
      number: card.number ?? '',
      cmPrice: getCmPrice(card.cardmarket),
      cmUpdatedAt: cmDateToTs(card.cardmarket?.updatedAt),
      ebayPrice: getBestTcgPrice(card.tcgplayer),
      ebayUpdatedAt: cmDateToTs(card.tcgplayer?.updatedAt),
      cardmarketUrl: card.cardmarket?.url ?? null,
      priceSource: 'api',
      source: 'api-card',
    }))
  } catch {
    return []
  }
}

// Typy produktov ktoré generujeme pre každý set
const GENERATED_TYPES = [
  { suffix: 'ETB', type: 'ETB', label: 'Elite Trainer Box' },
  { suffix: 'Booster Box', type: 'Booster Box', label: 'Booster Box (36 packs)' },
  { suffix: '3-Pack Blister', type: 'Blister', label: '3-Pack Blister' },
]

// Zostaví sealed produkty z výsledku sets API
// Ak lokálna DB má cenu pre tento produkt, použije ju
function setsToProducts(sets) {
  const results = []
  for (const set of sets) {
    for (const { suffix, type } of GENERATED_TYPES) {
      const name = `${set.name} ${suffix}`
      // Skús nájsť v lokálnej DB
      const local = sealedProducts.find(
        (p) => p.name.toLowerCase() === name.toLowerCase() ||
               (p.set.toLowerCase() === set.name.toLowerCase() && p.type === type)
      )
      results.push({
        id: local?.id ?? `gen-${set.id}-${type.replace(' ', '-').toLowerCase()}`,
        name,
        set: set.name,
        series: set.series ?? '',
        releaseDate: set.releaseDate ?? '',
        type,
        cmPrice: null,
        ebayPrice: null,
        source: 'api-set',
      })
    }
  }
  return results
}

async function fetchSets(query) {
  if (query.trim().length < 2) return []
  try {
    const url = `${PKM_API}/sets?q=name:${encodeURIComponent(query.trim())}*&orderBy=-releaseDate&pageSize=6`
    const res = await fetch(url)
    if (!res.ok) return []
    const data = await res.json()
    return setsToProducts(data.data || [])
  } catch {
    return []
  }
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function TypeBadge({ type }) {
  const colors = {
    'ETB': 'bg-blue-100 text-blue-700',
    'Booster Box': 'bg-purple-100 text-purple-700',
    'Single': 'bg-amber-100 text-amber-700',
    'UPC': 'bg-green-100 text-green-700',
    'Tin': 'bg-cyan-100 text-cyan-700',
    'Blister': 'bg-pink-100 text-pink-700',
    'Bundle': 'bg-orange-100 text-orange-700',
  }
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 ${colors[type] ?? 'bg-slate-100 text-slate-600'}`}>
      {type}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProductSearch({ onAdd }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [sealedResults, setSealedResults] = useState([])   // z lokálnej DB (instant)
  const [setResults, setSetResults] = useState([])          // z API sets (async)
  const [cardResults, setCardResults] = useState([])        // z API cards (async)
  const [loadingSealed, setLoadingSealed] = useState(false)
  const [loadingCards, setLoadingCards] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customType, setCustomType] = useState('ETB')
  const [showCustom, setShowCustom] = useState(false)
  const dropdownRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const q = query.trim()

    // Instant: lokálna DB
    if (q.length === 0) {
      setSealedResults(sealedProducts.slice(0, 6))
      setSetResults([])
      setCardResults([])
      return
    }

    const localMatches = sealedProducts.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.set.toLowerCase().includes(q.toLowerCase()) ||
      p.type.toLowerCase().includes(q.toLowerCase())
    )
    setSealedResults(localMatches.slice(0, 8))

    // Async: sets + cards API (debounced)
    clearTimeout(timerRef.current)
    if (q.length >= 2) {
      setLoadingSealed(true)
      setLoadingCards(true)
      timerRef.current = setTimeout(async () => {
        const [sets, cards] = await Promise.all([fetchSets(q), fetchCards(q)])
        // Deduplikuj: vyhoď sety ktoré už sú v lokálnej DB
        const localIds = new Set(localMatches.map((p) => p.id))
        setSetResults(sets.filter((s) => !localIds.has(s.id)))
        setCardResults(cards)
        setLoadingSealed(false)
        setLoadingCards(false)
      }, 400)
    } else {
      setSetResults([])
      setCardResults([])
      setLoadingSealed(false)
      setLoadingCards(false)
    }

    return () => clearTimeout(timerRef.current)
  }, [query])

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
    setSetResults([])
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

  const isLoading = loadingSealed || loadingCards
  const totalSealed = sealedResults.length + setResults.length
  const hasAnything = totalSealed > 0 || cardResults.length > 0 || isLoading

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
            placeholder="Hľadaj ľubovoľný produkt alebo kartu... (napr. Prismatic ETB, Hidden Fates, Charizard)"
            className="w-full bg-white border border-pkm-border text-slate-800 text-sm rounded-lg pl-9 pr-10 py-2.5 focus:outline-none focus:border-blue-400 placeholder-slate-300"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-2.5 w-4 h-4 text-pkm-yellow animate-spin" />
          )}
        </div>

        {open && hasAnything && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-pkm-border rounded-xl shadow-2xl overflow-hidden">

            {/* ── Sealed: lokálna DB ── */}
            {sealedResults.length > 0 && (
              <Section
                label="Sealed — databáza (s cenami)"
                icon={<Package className="w-3 h-3 text-green-400" />}
              >
                {sealedResults.map((p) => (
                  <SealedRow key={p.id} p={p} onSelect={handleSelect} />
                ))}
              </Section>
            )}

            {/* ── Sealed: generované zo sets API ── */}
            {(setResults.length > 0 || loadingSealed) && (
              <Section
                label="Sealed — všetky sety (zadaj ceny manuálne)"
                icon={
                  loadingSealed
                    ? <Loader2 className="w-3 h-3 text-pkm-yellow animate-spin" />
                    : <Zap className="w-3 h-3 text-pkm-yellow" />
                }
              >
                {setResults.map((p) => (
                  <SealedRow key={p.id} p={p} onSelect={handleSelect} />
                ))}
                {loadingSealed && setResults.length === 0 && (
                  <div className="px-4 py-2 text-xs text-slate-400">Hľadám sety...</div>
                )}
              </Section>
            )}

            {/* ── Singles z API ── */}
            {(cardResults.length > 0 || loadingCards) && (
              <Section
                label="Singles — live dáta s cenami"
                icon={
                  loadingCards
                    ? <Loader2 className="w-3 h-3 text-pkm-yellow animate-spin" />
                    : <Zap className="w-3 h-3 text-pkm-yellow" />
                }
              >
                {cardResults.map((card) => (
                  <li
                    key={card.id}
                    onMouseDown={() => handleSelect(card)}
                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-3"
                  >
                    {card.image && (
                      <img src={card.image} alt={card.name} className="w-8 h-11 object-contain rounded shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 truncate">{card.name}</div>
                      <div className="text-xs text-slate-400 truncate">
                        {card.set}{card.number ? ` · #${card.number}` : ''}{card.rarity ? ` · ${card.rarity}` : ''}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      {card.cmPrice != null && <div className="text-xs text-blue-600">CM €{card.cmPrice}</div>}
                      {card.ebayPrice != null && <div className="text-xs text-amber-500">TCG ~€{card.ebayPrice}</div>}
                    </div>
                  </li>
                ))}
                {loadingCards && cardResults.length === 0 && (
                  <div className="px-4 py-2 text-xs text-slate-400">Hľadám karty...</div>
                )}
              </Section>
            )}

            {!hasAnything && query.length >= 2 && !isLoading && (
              <div className="px-4 py-4 text-sm text-slate-400 text-center">Nič sa nenašlo</div>
            )}
          </div>
        )}
      </div>

      {/* Custom */}
      {showCustom ? (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
            placeholder="Názov produktu..."
            className="flex-1 bg-pkm-input border border-pkm-border text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 placeholder-slate-300"
            autoFocus
          />
          <select
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="bg-pkm-input border border-pkm-border text-slate-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
          >
            {PRODUCT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={handleAddCustom} className="bg-pkm-yellow text-black text-sm font-bold px-3 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => setShowCustom(false)} className="text-slate-400 px-2 py-2 hover:text-slate-600">✕</button>
        </div>
      ) : (
        <button onClick={() => setShowCustom(true)} className="text-xs text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
          <Plus className="w-3 h-3" /> Pridať vlastný produkt
        </button>
      )}
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ label, icon, children }) {
  return (
    <div>
      <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <ul className="divide-y divide-pkm-border max-h-52 overflow-y-auto">
        {children}
      </ul>
    </div>
  )
}

function SealedRow({ p, onSelect }) {
  return (
    <li
      onMouseDown={() => onSelect(p)}
      className="px-3 py-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-3"
    >
      <div className="min-w-0">
        <div className="text-sm text-slate-800 truncate">{p.name}</div>
        <div className="text-xs text-slate-400 truncate">{p.series ? `${p.series} · ` : ''}{p.set}{p.releaseDate ? ` · ${p.releaseDate.slice(0, 4)}` : ''}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <TypeBadge type={p.type} />
        <span className="text-xs text-slate-400 italic">zadaj cenu →</span>
      </div>
    </li>
  )
}

