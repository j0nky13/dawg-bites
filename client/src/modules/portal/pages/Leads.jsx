import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { getLeads, updateLead } from "../lib/leadsApi";
import AddLeadModal from "../components/AddLeadModal";
import ViewLeadModal from "../components/ViewLeadModal";

const STATUS_STYLES = {
  new: "bg-neutral-700/40 text-neutral-200",
  contacted: "bg-neutral-600/40 text-neutral-100",
  qualified: "bg-[#B6F24A]/15 text-[#B6F24A]",
  quoted: "bg-[#B6F24A]/20 text-[#B6F24A]",
  won: "bg-green-500/20 text-green-400",
  lost: "bg-red-500/20 text-red-400",
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  async function loadLeads() {
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const filtered = leads.filter((l) =>
    [l.name, l.business, l.email, l.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-sm text-neutral-400">
            Track, qualify, and convert incoming leads
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="
            inline-flex items-center justify-center gap-2
            rounded-lg px-4 py-2
            text-sm font-semibold
            bg-[#B6F24A] text-black
            hover:opacity-90 transition
            w-full md:w-auto
          "
        >
          <Plus size={16} />
          Add Lead
        </button>
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
          placeholder="Search leads…"
          className="
            w-full pl-9 pr-3 py-2
            rounded-lg
            bg-neutral-800 border border-white/10
            text-sm text-white
            placeholder:text-neutral-500
            focus:outline-none focus:ring-2 focus:ring-[#B6F24A]/40
          "
        />
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="py-10 text-center text-neutral-400">
            Loading leads…
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center text-neutral-400">
            No leads found
          </div>
        )}

        {filtered.map((lead) => (
          <div
            key={lead.id}
            onClick={() => setSelectedLead(lead)}
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
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white">
                {lead.name || "—"}
              </div>

              <span
                className={`
                  inline-flex items-center px-2 py-1 rounded-md
                  text-xs font-semibold capitalize
                  ${
                    STATUS_STYLES[lead.status] ||
                    "bg-neutral-700/40 text-neutral-300"
                  }
                `}
              >
                {lead.status}
              </span>
            </div>

            <div className="text-sm text-neutral-400">
              {lead.business || "No business"}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <span>
                Contacted:{" "}
                {lead.madeContact ? (
                  <span className="text-[#B6F24A] font-medium">Yes</span>
                ) : (
                  "No"
                )}
              </span>

              <span>
                {lead.updatedAt?.toDate
                  ? lead.updatedAt.toDate().toLocaleDateString()
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
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Contacted</th>
              <th className="px-4 py-3 text-right font-medium">Updated</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="cursor-pointer hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 text-white font-medium">
                  {lead.name || "—"}
                </td>

                <td className="px-4 py-3 text-neutral-300">
                  {lead.business || "—"}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`
                      inline-flex items-center px-2 py-1 rounded-md
                      text-xs font-semibold capitalize
                      ${
                        STATUS_STYLES[lead.status] ||
                        "bg-neutral-700/40 text-neutral-300"
                      }
                    `}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {lead.madeContact ? (
                    <span className="text-[#B6F24A] font-medium">Yes</span>
                  ) : (
                    <span className="text-neutral-500">No</span>
                  )}
                </td>

                <td className="px-4 py-3 text-right text-neutral-500">
                  {lead.updatedAt?.toDate
                    ? lead.updatedAt.toDate().toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={loadLeads}
      />

      {/* View Lead Modal */}
      {selectedLead && (
        <ViewLeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={async (data) => {
            await updateLead(selectedLead.id, data);
            await loadLeads();
          }}
        />
      )}
    </div>
  );
}