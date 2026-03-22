import { Trash2, ExternalLink } from 'lucide-react'
import { cmNetRevenue, ebayNetRevenue, calcProfit, calcMargin, getRecommendation } from '../utils/calc'

function PriceInput({ value, onChange, placeholder, highlight }) {
  return (
    <div className="relative">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
      <input
        type="number"
        min="0"
        step="0.5"
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
        placeholder={placeholder}
        className={`w-full border text-slate-800 text-sm rounded-lg pl-6 pr-2 py-1.5 focus:outline-none transition-colors placeholder-slate-300
          ${highlight
            ? 'bg-pkm-yellow/10 border-pkm-yellow focus:border-yellow-400 font-semibold'
            : 'bg-pkm-input border-pkm-border focus:border-blue-400'
          }`}
      />
    </div>
  )
}

function ProfitCell({ profit, margin, rec }) {
  if (profit === null || isNaN(profit)) {
    return <span className="text-slate-300 text-xs">—</span>
  }
  return (
    <div className="text-center">
      <div className={`text-sm font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
        {profit >= 0 ? '+' : ''}{profit.toFixed(2)}€
      </div>
      <div className="text-xs text-slate-400">{margin >= 0 ? '+' : ''}{margin.toFixed(1)}%</div>
      {rec && (
        <span className={`inline-block mt-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
          rec.color === 'green' ? 'bg-green-100 text-green-700' :
          rec.color === 'yellow' ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-600'
        }`}>{rec.label}</span>
      )}
    </div>
  )
}

export default function OfferRow({ item, settings, onUpdate, onRemove }) {
  const qty = item.qty || 1
  const buyPrice = parseFloat(item.buyPrice) || 0
  const cmPrice = parseFloat(item.cmPrice) || 0
  const ebayPrice = parseFloat(item.ebayPrice) || 0

  const cmNet = cmNetRevenue(cmPrice, settings.cmFee, settings.shippingOut)
  const cmProfit = item.buyPrice !== '' && cmPrice > 0 ? calcProfit(buyPrice, cmNet) : null
  const cmMargin = cmProfit !== null ? calcMargin(cmProfit, buyPrice) : 0
  const cmRec = cmProfit !== null ? getRecommendation(cmMargin, settings.targetMargin) : null

  const ebayNet = ebayNetRevenue(ebayPrice, settings.ebayFee, settings.shippingOut)
  const ebayProfit = item.buyPrice !== '' && ebayPrice > 0 ? calcProfit(buyPrice, ebayNet) : null
  const ebayMargin = ebayProfit !== null ? calcMargin(ebayProfit, buyPrice) : 0

  const cmSearchUrl = `https://www.cardmarket.com/en/Pokemon/Products/Search?searchString=${encodeURIComponent(item.name)}`
  const ebaySearchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(item.name + ' pokemon')}&LH_Sold=1&LH_Complete=1`

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      {/* Produkt */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {item.image && (
            <img src={item.image} alt={item.name} className="w-8 h-11 object-contain rounded shrink-0" />
          )}
          <div>
            <div className="text-sm font-semibold text-slate-800 leading-tight">{item.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="text-xs text-slate-400">{item.set}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                item.type === 'ETB' ? 'bg-blue-100 text-blue-700' :
                item.type === 'Booster Box' ? 'bg-purple-100 text-purple-700' :
                item.type === 'Single' ? 'bg-amber-100 text-amber-700' :
                item.type === 'UPC' ? 'bg-green-100 text-green-700' :
                item.type === 'Tin' ? 'bg-cyan-100 text-cyan-700' :
                'bg-slate-100 text-slate-600'
              }`}>{item.type}</span>
              {item.rarity && <span className="text-xs text-slate-400 truncate max-w-36">{item.rarity}</span>}
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
          className="w-full bg-pkm-input border border-pkm-border text-slate-800 text-sm rounded-lg px-2 py-1.5 text-center focus:outline-none focus:border-blue-400"
        />
      </td>

      {/* Kúpna cena */}
      <td className="px-3 py-3 w-32">
        <PriceInput
          value={item.buyPrice}
          onChange={(v) => onUpdate('buyPrice', v)}
          placeholder="za koľko?"
          highlight
        />
        {qty > 1 && item.buyPrice !== '' && (
          <div className="text-xs text-slate-400 mt-1 text-center">
            {qty}× = €{(buyPrice * qty).toFixed(2)}
          </div>
        )}
      </td>

      {/* CM cena */}
      <td className="px-3 py-3 w-36">
        <PriceInput
          value={item.cmPrice ?? ''}
          onChange={(v) => onUpdate('cmPrice', v)}
          placeholder="trhová"
        />
        <a href={cmSearchUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors">
          <ExternalLink className="w-3 h-3" /> Cardmarket
        </a>
      </td>

      {/* CM zisk */}
      <td className="px-3 py-3 w-28">
        <ProfitCell profit={cmProfit} margin={cmMargin} rec={cmRec} />
      </td>

      {/* eBay cena */}
      <td className="px-3 py-3 w-36">
        <PriceInput
          value={item.ebayPrice ?? ''}
          onChange={(v) => onUpdate('ebayPrice', v)}
          placeholder="trhová"
        />
        <a href={ebaySearchUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-700 mt-1 transition-colors">
          <ExternalLink className="w-3 h-3" /> eBay predané
        </a>
      </td>

      {/* eBay zisk */}
      <td className="px-3 py-3 w-28">
        <ProfitCell profit={ebayProfit} margin={ebayMargin} rec={null} />
      </td>

      {/* Odstraniť */}
      <td className="px-3 py-3 w-10 text-center">
        <button
          onClick={onRemove}
          className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}
