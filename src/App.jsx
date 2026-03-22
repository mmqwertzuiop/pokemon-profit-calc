import { useState } from 'react'
import { Trash2, Zap, RotateCcw } from 'lucide-react'
import ProductSearch from './components/ProductSearch'
import OfferRow from './components/OfferRow'
import OfferSummary from './components/OfferSummary'
import SettingsPanel from './components/SettingsPanel'
import { useLocalStorage } from './hooks/useLocalStorage'

const DEFAULT_SETTINGS = {
  cmFee: 5,
  ebayFee: 13,
  shippingOut: 3,
  targetMargin: 15,
}

export default function App() {
  const [offer, setOffer] = useState([])
  const [settings, setSettings] = useLocalStorage('pkm-settings', DEFAULT_SETTINGS)

  const addProduct = (product) => {
    // Ak už je v zozname, zvýš qty
    setOffer((prev) => {
      const existing = prev.findIndex((i) => i.id === product.id)
      if (existing !== -1) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], qty: (updated[existing].qty || 1) + 1 }
        return updated
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateItem = (id, field, value) => {
    setOffer((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const removeItem = (id) => {
    setOffer((prev) => prev.filter((item) => item.id !== id))
  }

  const clearOffer = () => {
    if (offer.length > 0 && confirm('Vymazať celú ponuku?')) {
      setOffer([])
    }
  }

  return (
    <div className="min-h-screen bg-pkm-dark">
      {/* Header */}
      <header className="border-b border-pkm-border bg-pkm-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pkm-yellow rounded-lg p-1.5">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight">Pokémon Profit Calc</h1>
              <p className="text-xs text-gray-500">Analýza nákupných ponúk</p>
            </div>
          </div>
          {offer.length > 0 && (
            <button
              onClick={clearOffer}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Vymazať ponuku
            </button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Search + Settings row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-pkm-card border border-pkm-border rounded-xl p-4 space-y-3">
            <h2 className="text-sm font-semibold text-gray-300">
              Pridaj produkt do ponuky
            </h2>
            <ProductSearch onAdd={addProduct} />
          </div>

          <div className="space-y-4">
            <SettingsPanel settings={settings} onChange={setSettings} />
          </div>
        </div>

        {/* Summary */}
        <OfferSummary items={offer} settings={settings} />

        {/* Table */}
        {offer.length > 0 ? (
          <div className="bg-pkm-card border border-pkm-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-pkm-border bg-black/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Produkt</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ks</th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kúpna cena</th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <span className="text-blue-400">CM</span> cena
                    </th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <span className="text-blue-400">CM</span> zisk
                    </th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <span className="text-yellow-400">eBay</span> cena
                    </th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <span className="text-yellow-400">eBay</span> zisk
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {offer.map((item) => (
                    <OfferRow
                      key={item.id}
                      item={item}
                      settings={settings}
                      onUpdate={(field, value) => updateItem(item.id, field, value)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-pkm-card border border-pkm-border rounded-xl p-12 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-gray-400 font-medium mb-1">Ponuka je prázdna</div>
            <div className="text-gray-600 text-sm">Vyhľadaj produkty vyššie a pridaj ich do ponuky</div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-gray-700 text-center pb-4">
          Ceny v databáze sú orientačné (január 2026). Vždy skontroluj aktuálne ceny na{' '}
          <a href="https://www.cardmarket.com/en/Pokemon" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400">Cardmarket</a>{' '}
          a{' '}
          <a href="https://www.ebay.com/sch/i.html?_nkw=pokemon+tcg&LH_Sold=1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400">eBay</a>.
        </div>
      </div>
    </div>
  )
}
