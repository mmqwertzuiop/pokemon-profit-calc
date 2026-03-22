import { ShoppingCart, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { calcOfferSummary, getRecommendation } from '../utils/calc'

export default function OfferSummary({ items, settings }) {
  const hasAnyBuyPrice = items.some((i) => i.buyPrice !== '' && parseFloat(i.buyPrice) > 0)

  if (!items.length || !hasAnyBuyPrice) {
    return (
      <div className="bg-white border border-pkm-border rounded-xl shadow-sm p-5 flex items-center gap-3 text-slate-400">
        <ShoppingCart className="w-5 h-5 shrink-0" />
        <span className="text-sm">Pridaj produkty a zadaj nákupné ceny — tu uvidíš výsledok celej ponuky.</span>
      </div>
    )
  }

  const s = calcOfferSummary(items, settings)
  const recCm = getRecommendation(s.marginCm, settings.targetMargin)
  const recEbay = getRecommendation(s.marginEbay, settings.targetMargin)

  // Hlavný verdikt: vyber lepšiu platformu
  const bestProfit = Math.max(s.totalProfitCm, s.totalProfitEbay)
  const bestMargin = s.totalProfitCm >= s.totalProfitEbay ? s.marginCm : s.marginEbay
  const bestPlatform = s.totalProfitCm >= s.totalProfitEbay ? 'Cardmarket' : 'eBay'
  const mainRec = getRecommendation(bestMargin, settings.targetMargin)

  const verdictBg = mainRec.color === 'green' ? 'bg-green-500' : mainRec.color === 'yellow' ? 'bg-amber-400' : 'bg-red-500'
  const verdictText = mainRec.color === 'green' ? 'KÚPIŤ' : mainRec.color === 'yellow' ? 'ZVAŽUJ' : 'NEKÚPIŤ'
  const verdictIcon = mainRec.color === 'green'
    ? <TrendingUp className="w-6 h-6" />
    : mainRec.color === 'yellow'
    ? <Minus className="w-6 h-6" />
    : <TrendingDown className="w-6 h-6" />

  return (
    <div className="bg-white border border-pkm-border rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-pkm-border">

        {/* Hlavný verdikt */}
        <div className={`${verdictBg} text-white p-5 flex flex-col items-center justify-center gap-2`}>
          {verdictIcon}
          <div className="text-2xl font-black tracking-tight">{verdictText}</div>
          <div className="text-sm opacity-80">najlepšie cez {bestPlatform}</div>
        </div>

        {/* Investícia */}
        <div className="p-5 flex flex-col justify-center">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Zaplatíš celkom</div>
          <div className="text-2xl font-black text-slate-900">€{s.totalBuy.toFixed(2)}</div>
          <div className="text-xs text-slate-400 mt-1">{items.filter(i => i.buyPrice !== '' && parseFloat(i.buyPrice) > 0).length} z {items.length} položiek oceňovaných</div>
        </div>

        {/* CM zisk */}
        <div className="p-5 flex flex-col justify-center">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Zisk cez Cardmarket</div>
          <div className={`text-2xl font-black ${s.totalProfitCm >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {s.totalProfitCm >= 0 ? '+' : ''}{s.totalProfitCm.toFixed(2)} €
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              recCm.color === 'green' ? 'bg-green-100 text-green-700' :
              recCm.color === 'yellow' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-600'
            }`}>{recCm.emoji} {s.marginCm.toFixed(1)}% marža</span>
          </div>
        </div>

        {/* eBay zisk */}
        <div className="p-5 flex flex-col justify-center">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Zisk cez eBay</div>
          <div className={`text-2xl font-black ${s.totalProfitEbay >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {s.totalProfitEbay >= 0 ? '+' : ''}{s.totalProfitEbay.toFixed(2)} €
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              recEbay.color === 'green' ? 'bg-green-100 text-green-700' :
              recEbay.color === 'yellow' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-600'
            }`}>{recEbay.emoji} {s.marginEbay.toFixed(1)}% marža</span>
          </div>
        </div>
      </div>

      {/* Subinfo */}
      <div className="px-5 py-2 bg-slate-50 border-t border-pkm-border text-xs text-slate-400 flex flex-wrap gap-4">
        <span>CM fee {settings.cmFee}%</span>
        <span>eBay fee {settings.ebayFee}%</span>
        <span>Poštovné {settings.shippingOut}€/ks</span>
        <span>Cieľová marža {settings.targetMargin}%</span>
      </div>
    </div>
  )
}
