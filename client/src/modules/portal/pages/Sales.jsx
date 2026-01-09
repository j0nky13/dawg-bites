import { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";

import { getSales } from "../lib/salesApi";
import { getExpenses } from "../lib/expensesApi";

const TABS = ["overview", "sales", "expenses", "export"];
const TAX_RATE = 0.22;

export default function Sales() {
  const [tab, setTab] = useState("overview");
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    try {
      const [s, e] = await Promise.all([
        getSales(),
        getExpenses(),
      ]);
      setSales(Array.isArray(s) ? s : []);
      setExpenses(Array.isArray(e) ? e : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  /* ---------------- helpers ---------------- */

  const n = (v) => Number(v) || 0;
  const money = (v) => `$${Math.round(n(v)).toLocaleString()}`;

  /* ---------------- derived ---------------- */

  const grossRevenue = useMemo(
    () => sales.reduce((sum, s) => sum + n(s.amount), 0),
    [sales]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + n(e.amount), 0),
    [expenses]
  );

  const estimatedTax = useMemo(
    () => grossRevenue * TAX_RATE,
    [grossRevenue]
  );

  const netRevenue = useMemo(
    () => grossRevenue - totalExpenses,
    [grossRevenue, totalExpenses]
  );

  const takeHome = useMemo(
    () => netRevenue - estimatedTax,
    [netRevenue, estimatedTax]
  );

  const filteredSales = sales.filter((s) =>
    [s.customer, s.location, s.notes]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredExpenses = expenses.filter((e) =>
    [e.category, e.notes]
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
      <div>
        <h1 className="text-2xl font-bold text-white">Sales</h1>
        <p className="text-sm text-neutral-400">
          Revenue, expenses, and take-home tracking
        </p>
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

      {/* ================= OVERVIEW ================= */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Stat label="Gross Revenue" value={money(grossRevenue)} />
          <Stat label="Expenses" value={money(totalExpenses)} />
          <Stat label="Net Revenue" value={money(netRevenue)} />
          <Stat label="Est. Tax" value={money(estimatedTax)} />
          <Stat
            label="Take-Home"
            value={money(takeHome)}
            highlight={takeHome > 0}
          />
        </div>
      )}

      {/* ================= SALES ================= */}
      {tab === "sales" && (
        <>
          <SearchBar search={search} setSearch={setSearch} />

          <Table
            headers={["Date", "Customer", "Location", "Amount"]}
            rows={filteredSales.map((s) => [
              formatDate(s.date),
              s.customer || "—",
              s.location || "—",
              money(s.amount),
            ])}
            empty="No sales recorded"
          />
        </>
      )}

      {/* ================= EXPENSES ================= */}
      {tab === "expenses" && (
        <>
          <SearchBar search={search} setSearch={setSearch} />

          <Table
            headers={["Date", "Category", "Amount", "Notes"]}
            rows={filteredExpenses.map((e) => [
              formatDate(e.date),
              e.category || "—",
              money(e.amount),
              e.notes || "—",
            ])}
            empty="No expenses recorded"
          />
        </>
      )}

      {/* ================= EXPORT ================= */}
      {tab === "export" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ExportCard
            title="Export Sales"
            onClick={() => downloadCSV("sales.csv", sales)}
          />
          <ExportCard
            title="Export Expenses"
            onClick={() => downloadCSV("expenses.csv", expenses)}
          />
          <ExportCard
            title="Export Summary"
            onClick={() =>
              downloadCSV("summary.csv", [
                {
                  grossRevenue,
                  totalExpenses,
                  estimatedTax,
                  takeHome,
                },
              ])
            }
          />
        </div>
      )}
    </div>
  );
}

/* ---------------- UI ---------------- */

function Stat({ label, value, highlight }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-[#B6F24A]/40 bg-[#B6F24A]/10"
          : "border-white/10 bg-black/40"
      }`}
    >
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
        className="
          w-full pl-9 pr-3 py-2 rounded-lg
          bg-neutral-800 border border-white/10
          text-sm text-white
          placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-[#B6F24A]/40
        "
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
              <th key={h} className="px-4 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-10 text-center text-neutral-400"
              >
                {empty}
              </td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 text-neutral-300">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExportCard({ title, onClick }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
      <div className="text-sm font-medium text-white mb-3">{title}</div>
      <button
        onClick={onClick}
        className="px-4 py-2 text-sm rounded bg-[#B6F24A] text-black font-semibold"
      >
        Download CSV
      </button>
    </div>
  );
}

/* ---------------- utils ---------------- */

function formatDate(d) {
  if (!d) return "—";
  if (d.toDate) return d.toDate().toLocaleDateString();
  return new Date(d).toLocaleDateString();
}

function downloadCSV(name, rows) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}