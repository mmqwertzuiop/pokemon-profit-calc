import { Settings, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const EBAY_PLATFORMS = [
  {
    value: 'de',
    label: 'eBay.de — EU súkromný predajca (~3%)',
    fee: 3,
    hint: '0% FVF + 2.49% platba + €0.35/objednávku',
  },
  {
    value: 'com',
    label: 'eBay.com — US / profesionálny (13.25%)',
    fee: 13.25,
    hint: '13.25% FVF + $0.40/objednávku pre trading cards',
  },
]

function SettingRow({ label, hint, value, onChange, min, max, step, suffix }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="text-sm text-slate-700">{label}</div>
        {hint && <div className="text-xs text-slate-400 leading-tight">{hint}</div>}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <input
          type="number" min={min} max={max} step={step ?? 0.5} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-20 bg-pkm-input border border-pkm-border text-slate-800 text-sm rounded-lg px-2 py-1.5 text-right focus:outline-none focus:border-blue-400"
        />
        <span className="text-slate-400 text-sm w-6">{suffix}</span>
      </div>
    </div>
  )
}

export default function SettingsPanel({ settings, onChange }) {
  const [open, setOpen] = useState(false)

  const update = (key, value) => onChange({ ...settings, [key]: value })

  const handleEbayPlatform = (platform) => {
    const p = EBAY_PLATFORMS.find((x) => x.value === platform)
    onChange({ ...settings, ebayPlatform: platform, ebayFee: p?.fee ?? settings.ebayFee })
  }

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
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">eBay</div>
            <div className="mb-3 space-y-2">
              {EBAY_PLATFORMS.map((p) => (
                <label key={p.value} className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="radio" name="ebay-platform" value={p.value}
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
            <SettingRow
              label="Efektívny poplatok"
              hint="Automaticky nastavený — môžeš upraviť"
              value={settings.ebayFee}
              onChange={(v) => update('ebayFee', v)}
              min={0} max={20} step={0.5} suffix="%"
            />
          </div>

          {/* Ostatné */}
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

          <p className="text-xs text-slate-400 border-t border-pkm-border pt-3">Ukladá sa automaticky.</p>
        </div>
      )}
    </div>
  )
}
