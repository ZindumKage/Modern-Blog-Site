import React from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../profile/useProfile";
import type{ JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

export const AdminRoute: React.FC<Props> = ({ children }) => {
  const { profile } = useProfile();

  if (!profile?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};