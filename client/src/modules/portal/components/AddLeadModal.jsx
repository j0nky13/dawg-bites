import { useState } from "react";
import { X } from "lucide-react";
import { createLead, LEAD_STATUSES } from "../lib/leadsApi";
import { auth } from "../../../lib/firebase";

/* ===========================
   STYLES
=========================== */

const INPUT =
  "w-full rounded-md bg-neutral-800 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#B6F24A]/40";

/* ===========================
   HELPERS
=========================== */

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (!digits) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7)
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/* ===========================
   COMPONENT
=========================== */

export default function AddLeadModal({
  open,
  onClose,
  onCreated,
  profile, // ✅ passed from parent
}) {
  const user = auth.currentUser;

  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    notes: "",
    status: "new",
    temperature: "warm",
    madeContact: false,
  });

  const [saving, setSaving] = useState(false);

  if (!open) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit() {
    if (!form.name.trim() || !user) return;

    setSaving(true);
    try {
      await createLead(
        {
          ...form,
          assignedTo: {
            uid: user.uid,
            name: profile?.name || profile?.email || "Staff",
          },
        },
        user
      );

      onCreated?.();
      onClose();

      setForm({
        name: "",
        business: "",
        phone: "",
        email: "",
        notes: "",
        status: "new",
        temperature: "warm",
        madeContact: false,
      });
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
            <h2 className="text-base font-semibold text-white">Add Lead</h2>
            <p className="text-xs text-neutral-400">
              Capture and qualify a new lead
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
              placeholder="Name *"
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
              inputMode="numeric"
              value={form.phone}
              onChange={(e) =>
                update("phone", formatPhone(e.target.value))
              }
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
                  {s.charAt(0).toUpperCase() + s.slice(1)}
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
            className={`${INPUT} resize-none`}
            rows={3}
            placeholder="Notes / context"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />

          {/* Assigned */}
          <div className="text-xs text-neutral-400">
            Assigned to{" "}
            <span className="text-neutral-200">
              {profile?.name || profile?.email || "Staff"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving || !form.name.trim()}
            className="rounded-md px-4 py-2 text-sm font-semibold bg-[#B6F24A] text-black disabled:opacity-50"
          >
            {saving ? "Saving…" : "Create Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}