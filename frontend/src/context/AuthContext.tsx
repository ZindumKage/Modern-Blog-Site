import React, { createContext, useState } from "react";
import api from "../api/axiosInstance";
import type { AuthContextType, User } from "../utils/interfaces";

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export {AuthContext};



// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy initializer: read localStorage only once on mount
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (storedUser && token) return JSON.parse(storedUser) as User;
      return null;
    } catch {
      return null;
    }
  });

  // Login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post<{ token: string; user: User }>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message || "Login failed");
      throw new Error("Login failed");
    }
  };

  // Register
  const register = async (username: string, email: string, password: string) => {
    try {
      const { data } = await api.post<{ token: string; user: User }>("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message || "Registration failed");
      throw new Error("Registration failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};