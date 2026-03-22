import { Trash2, ExternalLink } from 'lucide-react'
import { cmNetRevenue, ebayNetRevenue, calcProfit, calcMargin, getRecommendation } from '../utils/calc'

function PriceInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
      <input
        type="number"
        min="0"
        step="0.5"
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
        placeholder={placeholder}
        className="w-full bg-pkm-dark border border-pkm-border text-gray-200 text-sm rounded-lg pl-6 pr-2 py-1.5 focus:outline-none focus:border-pkm-yellow placeholder-gray-700"
      />
    </div>
  )
}

function ProfitBadge({ profit, margin }) {
  if (profit === null || isNaN(profit)) {
    return <span className="text-gray-600 text-xs">—</span>
  }
  const color = profit >= 0 ? (margin >= 15 ? 'text-green-400' : 'text-yellow-400') : 'text-red-400'
  return (
    <div className={`text-sm font-bold ${color}`}>
      {profit >= 0 ? '+' : ''}{profit.toFixed(2)}€
      <div className={`text-xs font-normal opacity-80`}>
        {margin >= 0 ? '+' : ''}{margin.toFixed(1)}%
      </div>
    </div>
  )
}

export default function OfferRow({ item, settings, onUpdate, onRemove }) {
  const qty = item.qty || 1
  const buyPrice = parseFloat(item.buyPrice) || 0
  const cmPrice = parseFloat(item.cmPrice) || 0
  const ebayPrice = parseFloat(item.ebayPrice) || 0
  const totalBuy = buyPrice * qty

  // CM výpočet
  const cmNet = cmNetRevenue(cmPrice, settings.cmFee, settings.shippingOut)
  const cmProfit = item.buyPrice !== '' ? calcProfit(buyPrice, cmNet) : null
  const cmMargin = cmProfit !== null ? calcMargin(cmProfit, buyPrice) : 0
  const cmRec = cmProfit !== null ? getRecommendation(cmMargin, settings.targetMargin) : null

  // eBay výpočet
  const ebayNet = ebayNetRevenue(ebayPrice, settings.ebayFee, settings.shippingOut)
  const ebayProfit = item.buyPrice !== '' && item.ebayPrice ? calcProfit(buyPrice, ebayNet) : null
  const ebayMargin = ebayProfit !== null ? calcMargin(ebayProfit, buyPrice) : 0

  const cmSearchUrl = `https://www.cardmarket.com/en/Pokemon/Products/Search?searchString=${encodeURIComponent(item.name)}`
  const ebaySearchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(item.name + ' pokemon')}&LH_Sold=1&LH_Complete=1`

  return (
    <tr className="border-b border-pkm-border hover:bg-white/[0.02] group">
      {/* Produkt */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-8 h-11 object-contain rounded shrink-0 opacity-90"
            />
          )}
          <div>
            <div className="text-sm text-gray-200 font-medium leading-tight">{item.name}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">{item.set}</span>
              <span className={`text-xs px-1 rounded ${
                item.type === 'ETB' ? 'bg-blue-900/50 text-blue-400' :
                item.type === 'Booster Box' ? 'bg-purple-900/50 text-purple-400' :
                item.type === 'Single' ? 'bg-amber-900/50 text-amber-400' :
                item.type === 'UPC' ? 'bg-green-900/50 text-green-400' :
                'bg-gray-800 text-gray-500'
              }`}>{item.type}</span>
              {item.rarity && (
                <span className="text-xs text-gray-600 truncate max-w-32">{item.rarity}</span>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Počet */}
      <td className="px-3 py-3 w-16">
        <input
          type="number"
          min="1"
          max="999"
          value={qty}
          onChange={(e) => onUpdate('qty', Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full bg-pkm-dark border border-pkm-border text-gray-200 text-sm rounded-lg px-2 py-1.5 text-center focus:outline-none focus:border-pkm-yellow"
        />
      </td>

      {/* Kúpna cena */}
      <td className="px-3 py-3 w-28">
        <PriceInput
          value={item.buyPrice}
          onChange={(v) => onUpdate('buyPrice', v)}
          placeholder="Ponuka"
        />
        {qty > 1 && item.buyPrice !== '' && (
          <div className="text-xs text-gray-600 mt-1 text-center">
            spolu: €{totalBuy.toFixed(2)}
          </div>
        )}
      </td>

      {/* Cardmarket */}
      <td className="px-3 py-3 w-36">
        <div className="space-y-1">
          <PriceInput
            value={item.cmPrice ?? ''}
            onChange={(v) => onUpdate('cmPrice', v)}
            placeholder="CM cena"
          />
          <a
            href={cmSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> Cardmarket
          </a>
        </div>
      </td>

      {/* CM zisk */}
      <td className="px-3 py-3 w-28 text-center">
        {cmRec ? (
          <div className="space-y-1">
            <ProfitBadge profit={cmProfit} margin={cmMargin} />
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              cmRec.color === 'green' ? 'bg-green-900/50 text-green-400' :
              cmRec.color === 'yellow' ? 'bg-yellow-900/50 text-yellow-400' :
              'bg-red-900/50 text-red-400'
            }`}>{cmRec.emoji} {cmRec.label}</span>
          </div>
        ) : (
          <span className="text-gray-600 text-xs">—</span>
        )}
      </td>

      {/* eBay */}
      <td className="px-3 py-3 w-36">
        <div className="space-y-1">
          <PriceInput
            value={item.ebayPrice ?? ''}
            onChange={(v) => onUpdate('ebayPrice', v)}
            placeholder="eBay cena"
          />
          <a
            href={ebaySearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> eBay predané
          </a>
        </div>
      </td>

      {/* eBay zisk */}
      <td className="px-3 py-3 w-28 text-center">
        {ebayProfit !== null ? (
          <ProfitBadge profit={ebayProfit} margin={ebayMargin} />
        ) : (
          <span className="text-gray-600 text-xs">—</span>
        )}
      </td>

      {/* Odstraniť */}
      <td className="px-3 py-3 w-12 text-center">
        <button
          onClick={onRemove}
          className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}
