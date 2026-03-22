import { Settings, ChevronDown, ChevronUp, Eye, EyeOff, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const EBAY_PLATFORMS = [
  {
    value: 'de',
    label: 'eBay.de — EU súkromný predajca',
    fee: 3,
    hint: '0% FVF + 2.49% platba + €0.35/objednávku ≈ 3% efektívne',
  },
  {
    value: 'com',
    label: 'eBay.com — US / profesionálny',
    fee: 13.25,
    hint: '13.25% FVF + $0.40/objednávku pre trading cards',
  },
]

function SettingRow({ label, hint, value, onChange, min, max, step, suffix, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="text-sm text-slate-700">{label}</div>
        {hint && <div className="text-xs text-slate-400 leading-tight">{hint}</div>}
      </div>
      {children ?? (
        <div className="flex items-center gap-1 shrink-0">
          <input
            type="number" min={min} max={max} step={step ?? 0.5} value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-20 bg-pkm-input border border-pkm-border text-slate-800 text-sm rounded-lg px-2 py-1.5 text-right focus:outline-none focus:border-blue-400"
          />
          <span className="text-slate-400 text-sm w-6">{suffix}</span>
        </div>
      )}
    </div>
  )
}

export default function SettingsPanel({ settings, onChange }) {
  const [open, setOpen] = useState(false)
  const [showToken, setShowToken] = useState(false)

  const update = (key, value) => onChange({ ...settings, [key]: value })

  const handleEbayPlatform = (platform) => {
    const p = EBAY_PLATFORMS.find((x) => x.value === platform)
    onChange({ ...settings, ebayPlatform: platform, ebayFee: p?.fee ?? settings.ebayFee })
  }

  const currentPlatform = EBAY_PLATFORMS.find((p) => p.value === (settings.ebayPlatform ?? 'de'))

  return (
    <div className="bg-white border border-pkm-border rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Settings className="w-4 h-4 text-slate-400" />
          Nastavenia poplatkov
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-pkm-border pt-4">

          {/* Cardmarket */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cardmarket</div>
            <SettingRow
              label="Predajný poplatok"
              hint="Štandardný predajca: 5% z predajnej ceny"
              value={settings.cmFee}
              onChange={(v) => update('cmFee', v)}
              min={0} max={15} step={0.5} suffix="%"
            />
          </div>

          {/* eBay */}
          <div className="border-t border-pkm-border pt-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">eBay</div>
            <div className="mb-3">
              <div className="text-sm text-slate-700 mb-1">Platforma</div>
              <div className="space-y-1">
                {EBAY_PLATFORMS.map((p) => (
                  <label key={p.value} className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ebay-platform"
                      value={p.value}
                      checked={(settings.ebayPlatform ?? 'de') === p.value}
                      onChange={() => handleEbayPlatform(p.value)}
                      className="mt-0.5 accent-blue-600"
                    />
                    <div>
                      <div className="text-sm text-slate-700">{p.label}</div>
                      <div className="text-xs text-slate-400">{p.hint}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <SettingRow
              label="Efektívny poplatok"
              hint="Automaticky nastavený podľa platformy (môžeš upraviť)"
              value={settings.ebayFee}
              onChange={(v) => update('ebayFee', v)}
              min={0} max={20} step={0.5} suffix="%"
            />
          </div>

          {/* Poštovné + marža */}
          <div className="border-t border-pkm-border pt-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ostatné</div>
            <SettingRow
              label="Poštovné (odchod)"
              hint="Priemerná cena jednej zásielky"
              value={settings.shippingOut}
              onChange={(v) => update('shippingOut', v)}
              min={0} max={20} step={0.5} suffix="€"
            />
            <SettingRow
              label="Cieľová marža"
              hint="Pod touto hranicou = oranžové upozornenie"
              value={settings.targetMargin}
              onChange={(v) => update('targetMargin', v)}
              min={0} max={100} step={5} suffix="%"
            />
          </div>

          {/* PriceCharting */}
          <div className="border-t border-pkm-border pt-4">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">PriceCharting (voliteľné)</div>
              <a
                href="https://www.pricecharting.com/subscriptions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                Získať token <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Platená služba. Token nájdeš na pricecharting.com/subscriptions — umožní načítať USD ceny pre všetky produkty.
            </p>
            <div className="relative">
              <input
                type={showToken ? 'text' : 'password'}
                value={settings.pcToken ?? ''}
                onChange={(e) => update('pcToken', e.target.value)}
                placeholder="40-znakový API token..."
                className="w-full bg-pkm-input border border-pkm-border text-slate-800 text-sm rounded-lg px-3 pr-9 py-2 focus:outline-none focus:border-blue-400 placeholder-slate-300 font-mono"
              />
              <button
                onClick={() => setShowToken(!showToken)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {settings.pcToken && (
              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                ✓ PriceCharting aktívny — zobrazí sa tlačidlo "PC cena" pri každom produkte
              </div>
            )}
          </div>

          <p className="text-xs text-slate-400 border-t border-pkm-border pt-3">Nastavenia sa ukladajú automaticky do prehliadača.</p>
        </div>
      )}
    </div>
  )
}
