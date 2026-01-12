import { useEffect, useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";

import { getSales, createSale } from "../lib/salesApi";
import { getExpenses, createExpense } from "../lib/expensesApi";
import StatsChart from "../components/StatsChart";
import { groupByDay } from "../lib/stats.chart.utils";

const TABS = ["overview", "sales", "expenses", "export"];
const TAX_RATE = 0.22;

export default function Sales() {
  const [tab, setTab] = useState("overview");
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("today"); // today | month | year

  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  async function load() {
    setLoading(true);
    const [s, e] = await Promise.all([getSales(), getExpenses()]);
    setSales(Array.isArray(s) ? s : []);
    setExpenses(Array.isArray(e) ? e : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  /* ---------------- helpers ---------------- */

  const n = (v) => Number(v) || 0;
  const money = (v) => `$${Math.round(n(v)).toLocaleString()}`;

  function isInPeriod(date, period) {
    if (!date) return false;
    const d = date.toDate ? date.toDate() : new Date(date);
    const now = new Date();

    if (period === "today") {
      return d.toDateString() === now.toDateString();
    }

    if (period === "month") {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }

    if (period === "year") {
      return d.getFullYear() === now.getFullYear();
    }

    return true;
  }

  /* ---------------- derived ---------------- */

  const periodSales = useMemo(
    () => sales.filter(s => isInPeriod(s.date, period)),
    [sales, period]
  );

  const periodExpenses = useMemo(
    () => expenses.filter(e => isInPeriod(e.date, period)),
    [expenses, period]
  );

  const salesSeries = useMemo(
    () => groupByDay(periodSales, (s) => n(s.amount)),
    [periodSales]
  );

  const expenseSeries = useMemo(
    () => groupByDay(periodExpenses, (e) => n(e.amount)),
    [periodExpenses]
  );

  const grossRevenue = useMemo(
    () => periodSales.reduce((sum, s) => sum + n(s.amount), 0),
    [periodSales]
  );

  const totalExpenses = useMemo(
    () => periodExpenses.reduce((sum, e) => sum + n(e.amount), 0),
    [periodExpenses]
  );

  const estimatedTax = grossRevenue * TAX_RATE;
  const netRevenue = grossRevenue - totalExpenses;
  const takeHome = netRevenue - estimatedTax;

  const filteredSales = sales.filter((s) =>
    [s.customerName, s.description, s.notes]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredExpenses = expenses.filter((e) =>
    [e.category, e.description, e.notes]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-neutral-400">Loading sales…</div>;
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales</h1>
          <p className="text-sm text-neutral-400">
            Revenue, expenses, and take-home tracking
          </p>
        </div>
        {(tab === "sales" || tab === "expenses") && (
          <div className="w-full md:w-auto mt-2 md:mt-0">
            <button
              onClick={() =>
                tab === "sales"
                  ? setShowSaleModal(true)
                  : setShowExpenseModal(true)
              }
              className="
                w-full md:w-auto
                inline-flex items-center justify-center gap-2
                px-4 py-3 md:py-2
                rounded-lg
                bg-[#B6F24A]
                text-black font-semibold
              "
            >
              <Plus size={16} />
              Add {tab === "sales" ? "Sale" : "Expense"}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm capitalize border-b-2 transition ${
              tab === t
                ? "border-[#B6F24A] text-[#B6F24A]"
                : "border-transparent text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <>
          <div className="flex gap-2 mb-4">
            {["today", "month", "year"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs rounded-md capitalize border ${
                  period === p
                    ? "bg-[#B6F24A] text-black border-[#B6F24A]"
                    : "border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Stat label="Gross Revenue" value={money(grossRevenue)} />
            <Stat label="Expenses" value={money(totalExpenses)} />
            <Stat label="Net Revenue" value={money(netRevenue)} />
            <Stat label="Est. Tax" value={money(estimatedTax)} />
            <Stat label="Take-Home" value={money(takeHome)} highlight />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-black/40 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Sales Trend
              </h3>
              <StatsChart data={salesSeries} />
            </div>

            <div className="bg-black/40 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-neutral-300 mb-2">
                Expense Trend
              </h3>
              <StatsChart data={expenseSeries} />
            </div>
          </div>
        </>
      )}

      {/* SALES */}
      {tab === "sales" && (
        <>
          <SearchBar search={search} setSearch={setSearch} />

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredSales.length === 0 && (
              <div className="text-neutral-400 text-sm">No sales recorded</div>
            )}
            {filteredSales.map((s) => (
              <MobileCard
                key={s.id}
                title={s.customerName || "Sale"}
                subtitle={s.description}
                amount={money(s.amount)}
                meta={formatDate(s.date)}
              />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <Table
              headers={["Date", "Customer", "Description", "Amount"]}
              rows={filteredSales.map((s) => [
                formatDate(s.date),
                s.customerName || "—",
                s.description || "—",
                money(s.amount),
              ])}
              empty="No sales recorded"
            />
          </div>
        </>
      )}

      {/* EXPENSES */}
      {tab === "expenses" && (
        <>
          <SearchBar search={search} setSearch={setSearch} />

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredExpenses.length === 0 && (
              <div className="text-neutral-400 text-sm">No expenses recorded</div>
            )}
            {filteredExpenses.map((e) => (
              <MobileCard
                key={e.id}
                title={e.category || "Expense"}
                subtitle={e.description}
                amount={money(e.amount)}
                meta={formatDate(e.date)}
              />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <Table
              headers={["Date", "Category", "Description", "Amount"]}
              rows={filteredExpenses.map((e) => [
                formatDate(e.date),
                e.category || "—",
                e.description || "—",
                money(e.amount),
              ])}
              empty="No expenses recorded"
            />
          </div>
        </>
      )}

      {/* MODALS */}
      {showSaleModal && (
        <AddSaleModal
          onClose={() => setShowSaleModal(false)}
          onSaved={load}
        />
      )}

      {showExpenseModal && (
        <AddExpenseModal
          onClose={() => setShowExpenseModal(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}

/* ================= MODALS ================= */

function AddSaleModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    customerName: "",
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });

  async function save() {
    await createSale(form);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Add Sale" onClose={onClose} onSave={save}>
      <Input label="Customer" value={form.customerName} onChange={(v) => setForm(f => ({ ...f, customerName: v }))} />
      <Input label="Description" value={form.description} onChange={(v) => setForm(f => ({ ...f, description: v }))} />
      <Input label="Amount ($)" type="number" value={form.amount} onChange={(v) => setForm(f => ({ ...f, amount: v }))} />
      <Input label="Date" type="date" value={form.date} onChange={(v) => setForm(f => ({ ...f, date: v }))} />
      <Textarea label="Notes" value={form.notes} onChange={(v) => setForm(f => ({ ...f, notes: v }))} />
    </Modal>
  );
}

function AddExpenseModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    category: "",
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });

  async function save() {
    await createExpense(form);
    onSaved();
    onClose();
  }

  return (
    <Modal title="Add Expense" onClose={onClose} onSave={save}>
      <Input label="Category" value={form.category} onChange={(v) => setForm(f => ({ ...f, category: v }))} />
      <Input label="Description" value={form.description} onChange={(v) => setForm(f => ({ ...f, description: v }))} />
      <Input label="Amount ($)" type="number" value={form.amount} onChange={(v) => setForm(f => ({ ...f, amount: v }))} />
      <Input label="Date" type="date" value={form.date} onChange={(v) => setForm(f => ({ ...f, date: v }))} />
      <Textarea label="Notes" value={form.notes} onChange={(v) => setForm(f => ({ ...f, notes: v }))} />
    </Modal>
  );
}

/* ================= UI HELPERS ================= */

function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-full max-w-lg bg-neutral-900 rounded-xl border border-white/10 p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold">{title}</h2>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        {children}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-neutral-400">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-[#B6F24A] text-black font-semibold rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-neutral-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded bg-neutral-800 border border-white/10 px-3 py-2 text-white"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-neutral-400">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded bg-neutral-800 border border-white/10 px-3 py-2 text-white"
      />
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? "border-[#B6F24A]/40 bg-[#B6F24A]/10" : "border-white/10 bg-black/40"}`}>
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white"
      />
    </div>
  );
}

function Table({ headers, rows, empty }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-neutral-900">
      <table className="min-w-[700px] w-full text-sm">
        <thead className="bg-neutral-800 text-neutral-300">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-4 py-10 text-center text-neutral-400">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-3 text-neutral-300">{c}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function MobileCard({ title, subtitle, amount, meta }) {
  return (
    <div className="md:hidden rounded-lg border border-white/10 bg-black/40 p-4 space-y-1">
      <div className="text-sm text-white font-medium">{title}</div>
      {subtitle && <div className="text-xs text-neutral-400">{subtitle}</div>}
      <div className="text-lg font-semibold text-[#B6F24A]">{amount}</div>
      {meta && <div className="text-xs text-neutral-500">{meta}</div>}
    </div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  if (d.toDate) return d.toDate().toLocaleDateString();
  return new Date(d).toLocaleDateString();
}