import { useState } from 'react'
import { Trash2, ExternalLink, CheckCircle, Loader2, RefreshCw } from 'lucide-react'
import { cmNetRevenue, ebayNetRevenue, calcProfit, calcMargin, getRecommendation } from '../utils/calc'
import { timeAgo, daysOld } from '../utils/time'
import { searchPC, getPCProductPrice, findBestMatch } from '../utils/pricecharting'
import { getEurUsdRate, usdToEur } from '../utils/exchangeRate'

function PriceFreshness({ updatedAt, source }) {
  if (!updatedAt) return null
  const days = daysOld(updatedAt)
  const ago = timeAgo(updatedAt)
  if (source === 'api' && days < 2) return (
    <div className="flex items-center gap-1 text-xs text-green-600 mt-0.5">
      <CheckCircle className="w-3 h-3" /><span>CM API · {ago}</span>
    </div>
  )
  if (days <= 1) return <div className="text-xs text-green-600 mt-0.5">✓ {ago}</div>
  if (days <= 5) return <div className="text-xs text-amber-500 mt-0.5">⚠ {ago} — over cenu</div>
  return <div className="text-xs text-red-500 font-medium mt-0.5">⚠ {ago} — môže byť zastaraná!</div>
}

function PriceInput({ value, onChange, placeholder, highlight }) {
  return (
    <div className="relative">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
      <input
        type="number" min="0" step="0.5" value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
        placeholder={placeholder}
        className={`w-full border text-slate-800 text-sm rounded-lg pl-6 pr-2 py-1.5 focus:outline-none transition-colors placeholder-slate-300
          ${highlight ? 'bg-amber-50 border-amber-300 focus:border-amber-400 font-semibold' : 'bg-pkm-input border-pkm-border focus:border-blue-400'}`}
      />
    </div>
  )
}

function ProfitCell({ profit, margin, rec }) {
  if (profit === null || isNaN(profit)) return <span className="text-slate-300 text-xs">—</span>
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

// PriceCharting inline blok — zobrazí sa len ak má user token
function PCPriceBlock({ item, pcToken }) {
  const [state, setState] = useState('idle') // idle | loading | done | error | notfound
  const [pcData, setPcData] = useState(null)
  const [eurRate, setEurRate] = useState(0.92)

  const fetchPC = async () => {
    setState('loading')
    try {
      const [results, rate] = await Promise.all([
        searchPC(item.name, pcToken),
        getEurUsdRate(),
      ])
      setEurRate(rate)
      if (!results.length) { setState('notfound'); return }
      const best = findBestMatch(results, item.name)
      if (!best) { setState('notfound'); return }
      const prices = await getPCProductPrice(best.id, pcToken)
      if (!prices) { setState('error'); return }
      setPcData(prices)
      setState('done')
    } catch {
      setState('error')
    }
  }

  // Relevantná cena: sealed → newPrice, single → loosePrice
  const relevantUsd = item.type === 'Single'
    ? (pcData?.loosePrice ?? pcData?.newPrice)
    : (pcData?.newPrice ?? pcData?.completePrice)
  const relevantEur = relevantUsd ? usdToEur(relevantUsd, eurRate) : null

  return (
    <div className="mt-1.5 pt-1.5 border-t border-slate-100">
      {state === 'idle' && (
        <button
          onClick={fetchPC}
          className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-800 transition-colors font-medium"
        >
          <RefreshCw className="w-3 h-3" /> Načítať PC cenu
        </button>
      )}
      {state === 'loading' && (
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Loader2 className="w-3 h-3 animate-spin" /> Načítavam...
        </div>
      )}
      {state === 'done' && pcData && (
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-violet-700">
              PC: ${relevantUsd?.toFixed(2)} ≈ €{relevantEur?.toFixed(2)}
            </span>
            <button onClick={fetchPC} className="text-slate-400 hover:text-slate-600" title="Obnoviť">
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
          <a href={pcData.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-violet-500 hover:text-violet-700 transition-colors mt-0.5">
            <ExternalLink className="w-3 h-3" /> PriceCharting
          </a>
        </div>
      )}
      {state === 'notfound' && (
        <span className="text-xs text-slate-400">PC: produkt sa nenašiel</span>
      )}
      {state === 'error' && (
        <button onClick={fetchPC} className="text-xs text-red-400 hover:text-red-600">
          PC: chyba — skúsiť znova
        </button>
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

  const cmUrl = item.cardmarketUrl
    ?? `https://www.cardmarket.com/en/Pokemon/Products/Search?searchString=${encodeURIComponent(item.name)}`
  const ebayUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(item.name + ' pokemon')}&LH_Sold=1&LH_Complete=1`

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      {/* Produkt */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {item.image && <img src={item.image} alt={item.name} className="w-8 h-11 object-contain rounded shrink-0" />}
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
        <input type="number" min="1" max="999" value={qty}
          onChange={(e) => onUpdate('qty', Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full bg-pkm-input border border-pkm-border text-slate-800 text-sm rounded-lg px-2 py-1.5 text-center focus:outline-none focus:border-blue-400"
        />
      </td>

      {/* Kúpna cena */}
      <td className="px-3 py-3 w-32">
        <PriceInput value={item.buyPrice} onChange={(v) => onUpdate('buyPrice', v)} placeholder="za koľko?" highlight />
        {qty > 1 && item.buyPrice !== '' && (
          <div className="text-xs text-slate-400 mt-1 text-center">{qty}× = €{(buyPrice * qty).toFixed(2)}</div>
        )}
      </td>

      {/* CM cena */}
      <td className="px-3 py-3 w-44">
        <PriceInput value={item.cmPrice ?? ''} onChange={(v) => onUpdate('cmPrice', v)} placeholder="trhová" />
        <PriceFreshness updatedAt={item.cmUpdatedAt} source={item.priceSource} />
        <a href={cmUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors">
          <ExternalLink className="w-3 h-3" />
          {item.cardmarketUrl ? 'Otvoriť na CM' : 'Hľadať na CM'}
        </a>
        {settings.pcToken && <PCPriceBlock item={item} pcToken={settings.pcToken} />}
      </td>

      {/* CM zisk */}
      <td className="px-3 py-3 w-28">
        <ProfitCell profit={cmProfit} margin={cmMargin} rec={cmRec} />
      </td>

      {/* eBay cena */}
      <td className="px-3 py-3 w-40">
        <PriceInput value={item.ebayPrice ?? ''} onChange={(v) => onUpdate('ebayPrice', v)} placeholder="trhová" />
        <PriceFreshness updatedAt={item.ebayUpdatedAt} source={null} />
        <a href={ebayUrl} target="_blank" rel="noopener noreferrer"
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
        <button onClick={onRemove} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}
