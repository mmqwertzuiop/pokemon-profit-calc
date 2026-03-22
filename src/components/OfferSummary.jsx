import { TrendingUp, TrendingDown, Minus, ShoppingCart } from 'lucide-react'
import { calcOfferSummary, getRecommendation } from '../utils/calc'

export default function OfferSummary({ items, settings }) {
  const hasItems = items.length > 0
  const hasAnyBuyPrice = items.some((i) => i.buyPrice !== '' && parseFloat(i.buyPrice) > 0)

  if (!hasItems || !hasAnyBuyPrice) {
    return (
      <div className="bg-pkm-card border border-pkm-border rounded-xl p-6 text-center text-gray-600">
        <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <div className="text-sm">Pridaj produkty a zadaj ceny</div>
      </div>
    )
  }

  const summary = calcOfferSummary(items, settings)
  const recCm = getRecommendation(summary.marginCm, settings.targetMargin)
  const recEbay = getRecommendation(summary.marginEbay, settings.targetMargin)

  const VerdictBlock = ({ label, platform, profit, margin, rec }) => (
    <div className={`rounded-xl p-4 border ${
      rec.color === 'green' ? 'border-green-700/50 bg-green-900/10' :
      rec.color === 'yellow' ? 'border-yellow-700/50 bg-yellow-900/10' :
      'border-red-700/50 bg-red-900/10'
    }`}>
      <div className="text-xs text-gray-500 mb-1">{platform}</div>
      <div className={`text-2xl font-black ${
        rec.color === 'green' ? 'text-green-400' :
        rec.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'
      }`}>
        {profit >= 0 ? '+' : ''}{profit.toFixed(2)} €
      </div>
      <div className="text-sm text-gray-400">
        {margin >= 0 ? '+' : ''}{margin.toFixed(1)}% marža
      </div>
      <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
        rec.color === 'green' ? 'bg-green-900/60 text-green-300' :
        rec.color === 'yellow' ? 'bg-yellow-900/60 text-yellow-300' :
        'bg-red-900/60 text-red-300'
      }`}>
        {rec.emoji} {rec.label}
      </div>
    </div>
  )

  return (
    <div className="bg-pkm-card border border-pkm-border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-300">Celkové zhrnutie ponuky</h2>
        <div className="text-sm text-gray-500">
          Investícia: <span className="text-gray-300 font-semibold">€{summary.totalBuy.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <VerdictBlock
          platform="Cardmarket"
          profit={summary.totalProfitCm}
          margin={summary.marginCm}
          rec={recCm}
        />
        <VerdictBlock
          platform="eBay"
          profit={summary.totalProfitEbay}
          margin={summary.marginEbay}
          rec={recEbay}
        />
      </div>

      <div className="text-xs text-gray-600 pt-1 border-t border-pkm-border">
        CM fee {settings.cmFee}% · eBay fee {settings.ebayFee}% · Poštovné {settings.shippingOut}€/ks · Cieľová marža {settings.targetMargin}%
      </div>
    </div>
  )
}
