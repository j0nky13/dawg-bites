import { updateLead } from "../lib/leadsApi";

const STATUS_COLORS = {
  new: "bg-slate-200",
  contacted: "bg-yellow-200",
  qualified: "bg-blue-200",
  won: "bg-green-300",
  lost: "bg-red-200",
};

export default function LeadsTable({ leads }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Business</th>
            <th className="p-3">Status</th>
            <th className="p-3">Contacted</th>
            <th className="p-3">Updated</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-3 font-medium">{lead.name}</td>
              <td className="p-3">{lead.business}</td>

              <td className="p-3">
                <select
                  value={lead.status}
                  className={`rounded px-2 py-1 ${STATUS_COLORS[lead.status]}`}
                  onChange={(e) =>
                    updateLead(lead.id, { status: e.target.value })
                  }
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </td>

              <td className="p-3">
                <input
                  type="checkbox"
                  checked={lead.contacted}
                  onChange={(e) =>
                    updateLead(lead.id, { contacted: e.target.checked })
                  }
                />
              </td>

              <td className="p-3 opacity-60">
                {lead.updatedAt?.toDate?.().toLocaleDateString() || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}