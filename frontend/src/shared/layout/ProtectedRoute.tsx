
import { Navigate } from "react-router-dom";
import useAuth  from "../../modules/auth/useAuth";
import type { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />;
  return children;
};