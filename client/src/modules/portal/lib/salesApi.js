import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

const REF = collection(db, "sales");

/**
 * Sale shape (NOT enforced, just convention):
 * {
 *   customerId,
 *   customerName,
 *   description,
 *   amount,            // number
 *   date,              // Date or Timestamp
 *   notes,
 *   createdAt,
 *   updatedAt
 * }
 */

export async function getSales() {
  const q = query(REF, orderBy("date", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function createSale(data) {
  return addDoc(REF, {
    ...data,
    amount: Number(data.amount) || 0,
    date: data.date || new Date(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSale(id, data) {
  const ref = doc(db, "sales", id);

  return updateDoc(ref, {
    ...data,
    amount: Number(data.amount) || 0,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSale(id) {
  return deleteDoc(doc(db, "sales", id));
}