import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Send, CalendarDays, Building2, User, Phone, Mail, MessageSquare } from "lucide-react";

const FIELD_WRAP =
  "relative border border-black/10 bg-[#F6F0E3] rounded-2xl px-5 py-4 transition-colors focus-within:border-[#982810]/60 focus-within:ring-2 focus-within:ring-[#982810]/20";
const LABEL =
  "block text-xs font-bold tracking-wide uppercase text-black/60 mb-2";
const INPUT =
  "w-full bg-transparent outline-none text-base md:text-lg placeholder:text-black/35";
const TEXTAREA =
  "w-full bg-transparent outline-none text-base md:text-lg placeholder:text-black/35 min-h-[140px] resize-none";

function Field({ label, icon: Icon, children }) {
  return (
    <div className={FIELD_WRAP}>
      <div className="flex items-start gap-4">
        <div className="pt-1 text-[#982810]">
          <Icon size={22} />
        </div>
        <div className="w-full">
          <div className={LABEL}>{label}</div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const canSubmit = useMemo(() => {
    const hasBasics =
      form.name.trim() &&
      form.company.trim() &&
      (form.email.trim() || form.phone.trim()) &&
      form.message.trim();
    return Boolean(hasBasics) && status !== "sending";
  }, [form, status]);

  function update(key) {
    return (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setStatus("sending");

      // TODO: wire to backend later
      // await fetch("/api/leads", { method:"POST", headers:{...}, body: JSON.stringify(form) })

      await new Promise((r) => setTimeout(r, 600)); // tiny UX pause
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-[#F6F0E3]">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          {/* Left: Pitch + Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Request a Date
                <span className="block text-[#982810]">& Estimate</span>
              </h2>
              <p className="text-xl opacity-80 leading-relaxed">
                Tell us what you’re planning. We’ll reply with a simple flat-rate option,
                recommended timing, and next steps.
              </p>
            </motion.div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Your Name" icon={User}>
                  <input
                    className={INPUT}
                    value={form.name}
                    onChange={update("name")}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </Field>

                <Field label="Company / Location" icon={Building2}>
                  <input
                    className={INPUT}
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Company Name"
                    autoComplete="organization"
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Email" icon={Mail}>
                  <input
                    className={INPUT}
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </Field>

                <Field label="Phone" icon={Phone}>
                  <input
                    className={INPUT}
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="(843) 555-0123"
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <Field label="Preferred Date (optional)" icon={CalendarDays}>
                <input
                  className={INPUT}
                  type="date"
                  value={form.date}
                  onChange={update("date")}
                />
              </Field>

              <Field label="Event Details" icon={MessageSquare}>
                <textarea
                  className={TEXTAREA}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Example: Employee lunch for ~80 people, 11:30–1:30, on-site parking available…"
                />
              </Field>

              {/* Submit strip */}
              <div className="pt-6">
                <div className="rounded-3xl border border-black/10 bg-[#E6D2AC] p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="font-extrabold text-xl">
                        We’ll respond fast.
                      </div>
                      <div className="opacity-75">
                        Same-day reply whenever possible.
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-4 font-extrabold text-white bg-[#982810] hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <Send size={18} />
                      {status === "sending"
                        ? "Sending..."
                        : status === "sent"
                        ? "Request Sent"
                        : "Send Request"}
                    </button>
                  </div>

                  {status === "sent" && (
                    <div className="mt-4 text-sm opacity-80">
                      Got it — we’ll reach out shortly.
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right: Confidence panel */}
          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="rounded-3xl bg-[#E6D2AC] border border-black/10 p-10"
          >
            <div className="text-sm font-bold tracking-wide uppercase text-[#982810] mb-4">
              What to expect
            </div>

            <div className="space-y-6 text-lg opacity-85 leading-relaxed">
              <p>
                We’ll confirm your time window, headcount, and any on-site needs.
              </p>
              <p>
                You’ll get a simple flat-rate quote and a clean plan for execution.
              </p>
              <p>
                Once approved, we can set you up with portal access for scheduling
                requests and updates.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-black/10">
              <div className="text-sm opacity-70 mb-2">Prefer to call?</div>
              <div className="text-2xl font-extrabold text-[#982810]">
                919-986-1174
              </div>
              <div className="text-sm opacity-70 mt-2">
                Charleston, SC
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}