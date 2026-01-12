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

const REF = collection(db, "expenses");

/**
 * Expense shape (manual entry only):
 * {
 *   category,        // food, fuel, payroll, permit, misc
 *   description,
 *   amount,          // number
 *   date,            // Date or Timestamp
 *   vendor,
 *   notes,
 *   createdAt,
 *   updatedAt
 * }
 */

export async function getExpenses() {
  const q = query(REF, orderBy("date", "desc"));
  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function createExpense(data) {
  return addDoc(REF, {
    ...data,
    amount: Number(data.amount) || 0,
    date: data.date || new Date(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateExpense(id, data) {
  const ref = doc(db, "expenses", id);

  return updateDoc(ref, {
    ...data,
    amount: Number(data.amount) || 0,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteExpense(id) {
  return deleteDoc(doc(db, "expenses", id));
}