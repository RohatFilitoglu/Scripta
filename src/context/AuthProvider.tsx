import type { Session } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../supabaseClient";
import { AuthContext } from "./AuthContext";

type UserProfile = {
  id: string;
  bio: string;
  username: string;
  full_name: string;
  avatar_url: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  async function fetchProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profil çekilemedi:", error.message);
      return null;
    }
    return data;
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          fetchProfile(session.user.id).then(setProfile);
        } else {
          setProfile(null);
        }
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signUp, signOut, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
