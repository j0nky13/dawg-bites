import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../../lib/firebase";

const STORAGE_KEY = "mm_emailForSignIn";

function actionCodeSettings() {
  return {
    url: `${window.location.origin}/portal/login`,
    handleCodeInApp: true,
  };
}

export async function sendLoginLink(email) {
  if (!email) throw new Error("Email is required");

  await sendSignInLinkToEmail(auth, email, actionCodeSettings());
  window.localStorage.setItem(STORAGE_KEY, email);

  return true;
}

// Backwards compat
export async function login(email) {
  return sendLoginLink(email);
}

/**
 * OTP Step 2: complete login when user opens email link
 * ⚠️ NO provisioning happens here anymore
 */
export async function completeEmailLogin() {
  const href = window.location.href;
  if (!isSignInWithEmailLink(auth, href)) return null;

  const email =
    window.localStorage.getItem(STORAGE_KEY) ||
    window.prompt("Confirm your email to finish signing in:");

  if (!email) throw new Error("Email confirmation cancelled");

  const result = await signInWithEmailLink(auth, email, href);
  window.localStorage.removeItem(STORAGE_KEY);

  return result.user;
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function onUserChanged(cb) {
  return onAuthStateChanged(auth, cb);
}

// Backwards-compat alias
export const onUserChange = onUserChanged;

export async function logout() {
  await signOut(auth);
}