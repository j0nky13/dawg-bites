import { useState } from "react";
import { X } from "lucide-react";

export default function ViewLeadModal({ lead, onClose, onSave }) {
  const [form, setForm] = useState({ ...lead });
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    await onSave(form);
    setSaving(false);
    onClose();
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-start md:items-center justify-center
        bg-black/60 backdrop-blur
        overflow-y-auto
      "
    >
      <div
        className="
          w-full max-w-2xl
          m-4 md:m-0
          rounded-2xl
          bg-[#121212]
          border border-white/10
          shadow-xl
          max-h-[calc(100vh-2rem)]
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {form.name || "Lead"}
            </h2>
            <p className="text-sm text-white/60">
              {form.business || "—"}
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-white/60 hover:text-white" />
          </button>
        </div>

        {/* Body (SCROLLABLE) */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          <Input label="Name" value={form.name} onChange={v => update("name", v)} />
          <Input label="Business" value={form.business} onChange={v => update("business", v)} />
          <Input label="Phone" value={form.phone} onChange={v => update("phone", v)} />
          <Input label="Email" value={form.email} onChange={v => update("email", v)} />

          <Select
            label="Status"
            value={form.status}
            options={["new", "contacted", "qualified", "won", "lost"]}
            onChange={v => update("status", v)}
          />

          <Select
            label="Temperature"
            value={form.temperature}
            options={["cold", "warm", "hot"]}
            onChange={v => update("temperature", v)}
          />

          <Checkbox
            label="Contacted"
            checked={form.madeContact}
            onChange={v => update("madeContact", v)}
          />

          <div className="md:col-span-2">
            <label className="text-sm text-white/60">Notes</label>
            <textarea
              value={form.notes || ""}
              onChange={e => update("notes", e.target.value)}
              className="
                mt-1 w-full h-28
                rounded-lg bg-black/40
                border border-white/10
                p-3
                focus:outline-none focus:ring-1 focus:ring-lime-400
              "
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-white/70 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="
              px-4 py-2 rounded-lg
              bg-lime-400 text-black font-semibold
              hover:bg-lime-300
              disabled:opacity-50
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inputs ---------- */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-white/60">{label}</label>
      <input
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        className="
          mt-1 w-full rounded-lg
          bg-black/40 border border-white/10
          p-2
          focus:outline-none focus:ring-1 focus:ring-lime-400
        "
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-sm text-white/60">{label}</label>
      <select
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        className="
          mt-1 w-full rounded-lg
          bg-black/40 border border-white/10
          p-2
        "
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 mt-6 text-sm text-white/70">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={e => onChange(e.target.checked)}
        className="accent-lime-400"
      />
      {label}
    </label>
  );
}