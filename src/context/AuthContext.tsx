import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

type UserProfile = {
  id: string;
  bio: string;
  username: string;
  full_name: string;
  avatar_url: string;
};

interface AuthContextType {
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    username: string,
    full_name: string,
    avatar_url: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  profile: UserProfile | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
