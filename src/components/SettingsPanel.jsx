import { Settings, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

function SettingRow({ label, hint, value, onChange, min, max, step, suffix }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-sm text-gray-300">{label}</div>
        {hint && <div className="text-xs text-gray-600">{hint}</div>}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <input
          type="number"
          min={min}
          max={max}
          step={step ?? 0.5}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-20 bg-pkm-dark border border-pkm-border text-gray-200 text-sm rounded-lg px-2 py-1.5 text-right focus:outline-none focus:border-pkm-yellow"
        />
        <span className="text-gray-500 text-sm w-6">{suffix}</span>
      </div>
    </div>
  )
}

export default function SettingsPanel({ settings, onChange }) {
  const [open, setOpen] = useState(false)

  const update = (key, value) => onChange({ ...settings, [key]: value })

  return (
    <div className="bg-pkm-card border border-pkm-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Settings className="w-4 h-4 text-pkm-yellow" />
          Nastavenia poplatkov
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-pkm-border pt-3">
          <SettingRow
            label="Cardmarket poplatok"
            hint="Závisí od tvojho seller levelu"
            value={settings.cmFee}
            onChange={(v) => update('cmFee', v)}
            min={0} max={15} step={0.5}
            suffix="%"
          />
          <SettingRow
            label="eBay poplatok"
            hint="Zvyčajne 12–13% pre karty"
            value={settings.ebayFee}
            onChange={(v) => update('ebayFee', v)}
            min={0} max={20} step={0.5}
            suffix="%"
          />
          <SettingRow
            label="Poštovné (odchod)"
            hint="Čo zaplatíš za odoslanie"
            value={settings.shippingOut}
            onChange={(v) => update('shippingOut', v)}
            min={0} max={20} step={0.5}
            suffix="€"
          />
          <SettingRow
            label="Cieľová marža"
            hint="Pod touto hranicou = žltá"
            value={settings.targetMargin}
            onChange={(v) => update('targetMargin', v)}
            min={0} max={100} step={5}
            suffix="%"
          />
          <div className="pt-1 text-xs text-gray-600 border-t border-pkm-border">
            Nastavenia sa ukladajú automaticky do prehliadača.
          </div>
        </div>
      )}
    </div>
  )
}
