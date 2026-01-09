import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLeads } from "../lib/leadsApi";
import { listMessages } from "../../../lib/messagesApi";
import { listProjects } from "../lib/projectsApi";

const GREEN = "#B6F24A";

/**
 * Dashboard (role-based)
 * - admin/staff: AdminDashboard
 * - user: CustomerDashboard
 */
export default function Dashboard({ profile }) {
  const role = (profile?.role || "").toLowerCase();
  const isAdminLike = role === "admin" || role === "staff";

  return isAdminLike ? (
    <AdminDashboard />
  ) : (
    <CustomerDashboard profile={profile} />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  ADMIN UI                                  */
/* -------------------------------------------------------------------------- */

function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    let alive = true;

    async function fetchData() {
      try {
        const [leadData, messageData] = await Promise.all([
          getLeads(),
          listMessages(),
        ]);

        if (!alive) return;

        setLeads(Array.isArray(leadData) ? leadData : []);
        setMessages(Array.isArray(messageData) ? messageData : []);
      } catch (err) {
        console.error("Failed to load admin dashboard:", err);
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchData();
    return () => (alive = false);
  }, []);

  const newLeads = useMemo(
    () => leads.filter((l) => l.status === "new"),
    [leads]
  );

  const customers = useMemo(
    () => leads.filter((l) => l.status === "won"),
    [leads]
  );

  const unreadMessages = useMemo(
    () => messages.filter((m) => m.status === "new"),
    [messages]
  );

  if (loading) {
    return <div className="text-slate-500 text-sm">Loading dashboard…</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Admin Overview
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Leads, customers, and communication activity
        </p>
      </header>

      {/* STATUS STRIP */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
        <StatusBlock label="Total Leads" value={leads.length} />
        <StatusBlock
          label="New Leads"
          value={newLeads.length}
          highlight={newLeads.length > 0}
        />
        <StatusBlock label="Customers" value={customers.length} />
        <StatusBlock
          label="Unread Messages"
          value={unreadMessages.length}
          highlight={unreadMessages.length > 0}
        />
      </section>

      {/* CONTENT GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* RECENT LEADS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Recent Leads</h2>
            <button
              onClick={() => nav("/portal/leads")}
              className="text-sm hover:underline"
              style={{ color: GREEN }}
            >
              View all
            </button>
          </div>

          {leads.length === 0 ? (
            <p className="text-sm text-slate-400">No leads yet.</p>
          ) : (
            <ul className="space-y-3">
              {leads.slice(0, 6).map((lead) => (
                <li
                  key={lead.id}
                  onClick={() => nav("/portal/leads")}
                  className="cursor-pointer rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="text-sm font-medium text-white truncate">
                    {lead.name || "Unnamed Lead"}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {lead.business || lead.email || "—"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RECENT CUSTOMERS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Recent Customers</h2>
            <button
              onClick={() => nav("/portal/customers")}
              className="text-sm hover:underline"
              style={{ color: GREEN }}
            >
              View customers
            </button>
          </div>

          {customers.length === 0 ? (
            <p className="text-sm text-slate-400">No customers yet.</p>
          ) : (
            <ul className="space-y-3">
              {customers.slice(0, 6).map((cust) => (
                <li
                  key={cust.id}
                  onClick={() => nav("/portal/customers")}
                  className="cursor-pointer rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="text-sm font-medium text-white truncate">
                    {cust.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {cust.business || cust.email}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* MESSAGES */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Recent Messages</h2>
            <button
              onClick={() => nav("/portal/inbox")}
              className="text-sm hover:underline"
              style={{ color: GREEN }}
            >
              Open inbox
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="text-sm text-slate-400">No messages yet.</p>
          ) : (
            <ul className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <li
                  key={msg.id}
                  onClick={() => nav("/portal/inbox")}
                  className={`cursor-pointer rounded-xl px-4 py-3 transition border
                    ${
                      msg.status === "new"
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                >
                  <div className="flex justify-between items-center mb-1 gap-3">
                    <span className="text-sm font-medium text-white truncate">
                      {msg.name || "Message"}
                    </span>
                    <span className="text-xs text-slate-400 shrink-0">
                      {msg.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {msg.message}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

function StatusBlock({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl px-6 py-5 border ${
        highlight ? "bg-emerald-500/10" : "bg-white/5"
      }`}
      style={{
        borderColor: highlight
          ? "rgba(16,185,129,0.35)"
          : "rgba(255,255,255,0.10)",
      }}
    >
      <div className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CUSTOMER UI                                 */
/* -------------------------------------------------------------------------- */

function CustomerDashboard({ profile }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myProjects, setMyProjects] = useState([]);
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    let alive = true;

    async function fetchData() {
      try {
        const [projectsData, messagesData] = await Promise.all([
          listProjects(),
          listMessages(),
        ]);

        if (!alive) return;

        const safeProjects = Array.isArray(projectsData)
          ? projectsData.filter(
              (p) =>
                p.clientUid === profile.uid ||
                p.clientEmail === profile.email
            )
          : [];

        const safeMessages = Array.isArray(messagesData)
          ? messagesData.filter(
              (m) =>
                m.clientUid === profile.uid ||
                m.email === profile.email
            )
          : [];

        setMyProjects(safeProjects);
        setMyMessages(safeMessages);
      } catch (err) {
        console.error("Failed to load customer dashboard:", err);
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchData();
    return () => (alive = false);
  }, [profile?.uid]);

  const activeProject = useMemo(() => {
    const active = myProjects.find((p) => p.status === "active");
    return active || myProjects[0] || null;
  }, [myProjects]);

  const unreadCount = useMemo(
    () => myMessages.filter((m) => m.status === "new").length,
    [myMessages]
  );

  if (loading) {
    return <div className="text-slate-500 text-sm">Loading dashboard…</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Your Project
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Updates, next steps, and messages
        </p>
      </header>

      {/* TOP STRIP */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <InfoCard label="Status" value={activeProject?.status || "—"} />
        <InfoCard label="Project" value={activeProject?.title || "—"} />
        <InfoCard
          label="Unread Messages"
          value={unreadCount}
          highlight={unreadCount > 0}
        />
      </section>

      {/* MAIN */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Latest Update" action="View project" onAction={() => nav("/portal/projects")}>
          {activeProject ? (
            <div className="space-y-2 text-sm text-slate-300">
              <div>Phase: {activeProject.phase || "Discovery"}</div>
              <div>Next step: {activeProject.nextStep || "We’ll be in touch."}</div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No project assigned.</p>
          )}
        </Panel>

        <Panel title="Messages" action="Open inbox" onAction={() => nav("/portal/inbox")}>
          {myMessages.length === 0 ? (
            <p className="text-sm text-slate-400">No messages yet.</p>
          ) : (
            myMessages.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                {m.message}
              </div>
            ))
          )}
        </Panel>
      </section>
    </main>
  );
}

function InfoCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl border px-5 py-4 ${
        highlight ? "bg-emerald-500/10" : "bg-white/5"
      }`}
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <div className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function Panel({ title, action, onAction, children }) {
  return (
    <div
      className="rounded-2xl border bg-black/30 p-5"
      style={{ borderColor: "rgba(255,255,255,0.10)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <button
          onClick={onAction}
          className="text-sm hover:underline"
          style={{ color: GREEN }}
        >
          {action}
        </button>
      </div>
      {children}
    </div>
  );
}