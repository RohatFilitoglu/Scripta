import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import Navbar from "./components/Navbar";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log(session);

  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
}

export default App;
