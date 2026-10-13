import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../lib/api";

export interface User { id: number; name: string; email: string; joined: string }
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  authenticate: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("taskify_token");
    if (!token) { setLoading(false); return; }
    fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("taskify_token"))
      .finally(() => setLoading(false));
  }, []);

  const authenticate = (token: string, authenticatedUser: User) => {
    localStorage.setItem("taskify_token", token);
    setUser(authenticatedUser);
  };
  const logout = () => { localStorage.removeItem("taskify_token"); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, authenticate, logout, updateUser: setUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
