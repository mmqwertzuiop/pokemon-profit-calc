import { useState, useRef, useEffect } from 'react'
import { Search, Plus } from 'lucide-react'
import { products, PRODUCT_TYPES } from '../data/products'

export default function ProductSearch({ onAdd }) {
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState('Všetky')
  const [open, setOpen] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customType, setCustomType] = useState('ETB')
  const [showCustom, setShowCustom] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const filtered = products.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.set.toLowerCase().includes(query.toLowerCase())
    const matchType = filterType === 'Všetky' || p.type === filterType
    return matchQuery && matchType
  }).slice(0, 12)

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
    })
    setCustomName('')
    setShowCustom(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-pkm-card border border-pkm-border text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-pkm-yellow"
        >
          <option value="Všetky">Všetky typy</option>
          {PRODUCT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <div className="relative flex-1" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
              onFocus={() => setOpen(true)}
              placeholder="Hľadaj produkt..."
              className="w-full bg-pkm-card border border-pkm-border text-gray-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-pkm-yellow placeholder-gray-600"
            />
          </div>

          {open && (query.length > 0 || filtered.length > 0) && (
            <div className="absolute z-50 w-full mt-1 bg-pkm-card border border-pkm-border rounded-lg shadow-xl overflow-hidden">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">Nenašiel sa žiadny produkt</div>
              ) : (
                <ul className="max-h-64 overflow-y-auto divide-y divide-pkm-border">
                  {filtered.map((p) => (
                    <li
                      key={p.id}
                      onMouseDown={() => handleSelect(p)}
                      className="px-4 py-2.5 hover:bg-white/5 cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm text-gray-200">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.set}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                          p.type === 'ETB' ? 'bg-blue-900/60 text-blue-300' :
                          p.type === 'Booster Box' ? 'bg-purple-900/60 text-purple-300' :
                          p.type === 'Single' ? 'bg-amber-900/60 text-amber-300' :
                          'bg-gray-800 text-gray-400'
                        }`}>{p.type}</span>
                        {p.cmPrice && (
                          <div className="text-xs text-gray-500 mt-0.5">CM ~€{p.cmPrice}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
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
            className="flex-1 bg-pkm-card border border-pkm-border text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-pkm-yellow placeholder-gray-600"
          />
          <select
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="bg-pkm-card border border-pkm-border text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-pkm-yellow"
          >
            {PRODUCT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            onClick={handleAddCustom}
            className="bg-pkm-yellow text-black text-sm font-bold px-3 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowCustom(false)}
            className="text-gray-500 text-sm px-2 py-2 hover:text-gray-300"
          >✕</button>
        </div>
      ) : (
        <button
          onClick={() => setShowCustom(true)}
          className="text-xs text-gray-500 hover:text-pkm-yellow transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Pridať vlastný produkt (nie je v databáze)
        </button>
      )}
    </div>
  )
}
