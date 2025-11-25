import  { useState} from "react";
import type{ ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type{ AuthContextType, User } from "./types";

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login: AuthContextType["login"] = async (email, password) => {
    const mockUser: User = { id: 1, email, username: "Demo User", isAdmin: email === "admin@blog.com", avatar: null };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const register: AuthContextType["register"] = async (email, username, password) => {
    const mockUser: User = { id: 2, email, username, isAdmin: false, avatar: null };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>;
};