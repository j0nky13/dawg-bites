import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getLeads } from "../lib/leadsApi";
import ViewCustomerModal from "../components/ViewCustomerModal";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  async function loadCustomers() {
    const data = await getLeads();

    // ONLY won leads become customers
    const won = data.filter((l) => l.status === "won");

    setCustomers(won);
    setLoading(false);
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  const filtered = customers.filter((c) =>
    [c.name, c.business, c.email, c.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-sm text-neutral-400">
          Active customers converted from leads
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full md:max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers…"
          className="
            w-full pl-9 pr-3 py-2 rounded-lg
            bg-neutral-800 border border-white/10
            text-sm text-white placeholder:text-neutral-500
            focus:outline-none focus:ring-2 focus:ring-[#B6F24A]/40
          "
        />
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="py-10 text-center text-neutral-400">
            Loading customers…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center text-neutral-400">
            No customers found
          </div>
        )}

        {filtered.map((customer) => (
          <div
            key={customer.id}
            onClick={() => setSelected(customer)}
            className="
              rounded-xl
              border border-white/10
              bg-neutral-900
              p-4
              space-y-2
              cursor-pointer
              active:bg-white/5
            "
          >
            <div className="font-semibold text-white">
              {customer.name || "—"}
            </div>

            <div className="text-sm text-neutral-400">
              {customer.business || "No business"}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <span>
                {customer.phone || customer.email || "—"}
              </span>

              <span>
                {customer.updatedAt?.toDate
                  ? customer.updatedAt.toDate().toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10 bg-neutral-900">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-neutral-800 text-neutral-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Business</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-right font-medium">Updated</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {filtered.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => setSelected(customer)}
                className="
                  cursor-pointer
                  hover:bg-white/5
                  transition
                "
              >
                <td className="px-4 py-3 text-white font-medium">
                  {customer.name || "—"}
                </td>

                <td className="px-4 py-3 text-neutral-300">
                  {customer.business || "—"}
                </td>

                <td className="px-4 py-3 text-neutral-300">
                  {customer.phone || customer.email || "—"}
                </td>

                <td className="px-4 py-3 text-right text-neutral-500">
                  {customer.updatedAt?.toDate
                    ? customer.updatedAt.toDate().toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Customer Modal */}
      <ViewCustomerModal
        open={!!selected}
        customer={selected}
        onClose={() => setSelected(null)}
        onUpdated={loadCustomers}
      />
    </div>
  );
}