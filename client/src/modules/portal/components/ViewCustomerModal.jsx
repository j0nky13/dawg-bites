import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { updateLead, LEAD_STATUSES } from "../lib/leadsApi";

const INPUT =
  "w-full rounded-md bg-neutral-800 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#B6F24A]/40";

export default function ViewCustomerModal({
  open,
  customer,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        business: customer.business || "",
        phone: customer.phone || "",
        email: customer.email || "",
        notes: customer.notes || "",
        status: customer.status || "won",
        temperature: customer.temperature || "hot",
        madeContact: customer.madeContact || false,
      });
    }
  }, [customer]);

  if (!open || !form) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      await updateLead(customer.id, form);
      onUpdated?.();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-neutral-900 border border-white/10 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-semibold text-white">
              Customer Details
            </h2>
            <p className="text-xs text-neutral-400">
              Converted lead • Active customer
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Name / Business */}
          <div className="grid grid-cols-2 gap-3">
            <input
              className={INPUT}
              placeholder="Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <input
              className={INPUT}
              placeholder="Business"
              value={form.business}
              onChange={(e) => update("business", e.target.value)}
            />
          </div>

          {/* Phone / Email */}
          <div className="grid grid-cols-2 gap-3">
            <input
              className={INPUT}
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <input
              className={INPUT}
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          {/* Status / Heat / Contacted */}
          <div className="grid grid-cols-3 gap-3">
            <select
              className={INPUT}
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              className={INPUT}
              value={form.temperature}
              onChange={(e) => update("temperature", e.target.value)}
            >
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>

            <select
              className={INPUT}
              value={form.madeContact ? "yes" : "no"}
              onChange={(e) =>
                update("madeContact", e.target.value === "yes")
              }
            >
              <option value="no">Not Contacted</option>
              <option value="yes">Contacted</option>
            </select>
          </div>

          {/* Notes */}
          <textarea
            rows={4}
            className={`${INPUT} resize-none`}
            placeholder="Customer notes, preferences, history…"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Close
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold bg-[#B6F24A] text-black disabled:opacity-50"
          >
            {/* <Save size={14} /> */}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}