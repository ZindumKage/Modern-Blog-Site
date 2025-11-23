import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path
import type { AuthContextType } from "../utils/interfaces";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};