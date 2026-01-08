import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

/* ===========================
   CONSTANTS
=========================== */

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "quoted",
  "won",
  "lost",
];

export const ACTIVE_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "quoted",
];

/* ===========================
   CREATE LEAD
=========================== */

export async function createLead(data, user) {
  if (!user?.uid) throw new Error("Not authenticated");

  const payload = {
    name: data.name?.trim() || "",
    business: data.business?.trim() || "",
    phone: data.phone || "",
    email: data.email || "",

    status: data.status || "new",
    madeContact: Boolean(data.madeContact),

    assignedTo: data.assignedTo || {
      uid: user.uid,
      name: user.name || user.email || "Staff",
    },

    notes: data.notes || "",
    tags: data.tags || [],
    source: data.source || "manual",

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastContactedAt: null,
  };

  const ref = await addDoc(collection(db, "leads"), payload);
  return ref.id;
}

/* ===========================
   UPDATE LEAD
=========================== */

export async function updateLead(leadId, updates) {
  if (!leadId) throw new Error("Missing leadId");

  const ref = doc(db, "leads", leadId);

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/* ===========================
   GET SINGLE LEAD
=========================== */

export async function getLeadById(leadId) {
  const ref = doc(db, "leads", leadId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
}

/* ===========================
   LIST LEADS (FILTERED)
=========================== */

export async function getLeads({
  activeOnly = false,
  status = null,
  assignedToUid = null,
  limitCount = 50,
} = {}) {
  let q = collection(db, "leads");

  const conditions = [];

 if (activeOnly) {
  conditions.push(where("status", "!=", "lost"));
}

  if (status) {
    conditions.push(where("status", "==", status));
  }

  if (assignedToUid) {
    conditions.push(where("assignedTo.uid", "==", assignedToUid));
  }

  q = query(
    q,
    ...conditions,
    orderBy("updatedAt", "desc"),
    limit(limitCount)
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/* ===========================
   RECENT LEADS (DASHBOARD)
=========================== */

export async function getRecentLeads(count = 5) {
  const q = query(
    collection(db, "leads"),
    orderBy("createdAt", "desc"),
    limit(count)
  );

  const snap = await getDocs(collection(db, "leads"));
  
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/* ===========================
   LEAD STATS (DASHBOARD)
=========================== */

export async function getLeadStats() {
  const snap = await getDocs(collection(db, "leads"));

  let stats = {
    total: 0,
    active: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    quoted: 0,
    won: 0,
    lost: 0,
    uncontacted: 0,
  };

  snap.forEach((doc) => {
    const lead = doc.data();
    stats.total++;

    if (ACTIVE_STATUSES.includes(lead.status)) {
      stats.active++;
    }

    if (!lead.madeContact) {
      stats.uncontacted++;
    }

    if (stats[lead.status] !== undefined) {
      stats[lead.status]++;
    }
  });

  stats.conversionRate =
    stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;

  return stats;
}