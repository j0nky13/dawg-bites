import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { onUserChanged } from "./lib/auth";
import { db } from "../../lib/firebase";

import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import Sales from "./pages/Sales";

export default function PortalApp() {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bootErr, setBootErr] = useState("");

  useEffect(() => {
    const unsub = onUserChanged(async (user) => {
      setBootErr("");
      setAuthUser(user);

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          const newProfile = {
            email: user.email || "",
            role: "admin",
            active: true,
            createdAt: serverTimestamp(),
          };

          await setDoc(ref, newProfile);
          setProfile({ uid: user.uid, ...newProfile });
        } else {
          setProfile({ uid: user.uid, ...snap.data() });
        }
      } catch (err) {
        console.error("Portal boot failed:", err);
        setBootErr(err.message || "Portal boot failed");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-slate-400">
        Loading portal…
      </div>
    );
  }

  if (!authUser) {
    return <Login />;
  }

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="p-4 rounded-xl border border-red-500">
          Portal Error: {bootErr || "Profile failed to load"}
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard profile={profile} />} />
        <Route path="/leads" element={<Leads profile={profile} />} />
        <Route path="/customers" element={<Customers profile={profile} />} />
        <Route path="/sales" element={<Sales profile={profile} />} /> 
        <Route path="/inbox" element={<Inbox profile={profile} />} />
        <Route path="/stats" element={<Stats profile={profile} />} />
        <Route path="/settings" element={<Settings profile={profile} />} />
      </Route>

      <Route path="*" element={<Navigate to="/portal" replace />} />
    </Routes>
  );
}