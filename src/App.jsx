import { useState } from 'react'
import { Zap, RotateCcw } from 'lucide-react'
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
    if (offer.length > 0 && confirm('Vymazať celú ponuku?')) setOffer([])
  }

  return (
    <div className="min-h-screen bg-pkm-bg">
      {/* Header */}
      <header className="bg-white border-b border-pkm-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pkm-yellow rounded-lg p-1.5">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-base font-black text-slate-900 tracking-tight">Pokémon Profit Calc</h1>
              <p className="text-xs text-slate-400">Analýza nákupných ponúk</p>
            </div>
          </div>
          {offer.length > 0 && (
            <button
              onClick={clearOffer}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nová ponuka
            </button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">

        {/* Search + Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border border-pkm-border rounded-xl p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-700">Pridaj produkt do ponuky</h2>
            <ProductSearch onAdd={addProduct} />
          </div>
          <SettingsPanel settings={settings} onChange={setSettings} />
        </div>

        {/* Summary — vždy viditeľné */}
        <OfferSummary items={offer} settings={settings} />

        {/* Tabuľka produktov */}
        {offer.length > 0 ? (
          <div className="bg-white border border-pkm-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-pkm-border flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Produkty v ponuke
                <span className="ml-2 text-xs font-normal text-slate-400">({offer.length} položiek)</span>
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-pkm-border">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Produkt</th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">Ks</th>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Za koľko kupuješ</th>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <span className="text-blue-600">CM</span> cena
                    </th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <span className="text-blue-600">CM</span> zisk
                    </th>
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <span className="text-amber-500">eBay</span> cena
                    </th>
                    <th className="text-center px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      <span className="text-amber-500">eBay</span> zisk
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pkm-border">
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
          <div className="bg-white border border-pkm-border rounded-xl shadow-sm p-14 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <div className="text-slate-700 font-semibold mb-1">Zatiaľ žiadne produkty</div>
            <div className="text-slate-400 text-sm">Vyhľadaj produkty vyššie, zadaj za koľko ti ich niekto ponúka a uvidíš okamžite či sa to oplatí.</div>
          </div>
        )}

        <div className="text-xs text-slate-400 text-center pb-4">
          Ceny v databáze sú orientačné (január 2026). Vždy over aktuálne ceny na{' '}
          <a href="https://www.cardmarket.com/en/Pokemon" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 underline underline-offset-2">Cardmarket</a>{' '}
          a{' '}
          <a href="https://www.ebay.com/sch/i.html?_nkw=pokemon+tcg&LH_Sold=1" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 underline underline-offset-2">eBay</a>.
        </div>
      </div>
    </div>
  )
}
