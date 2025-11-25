import React, { useState } from "react";
import type { ReactNode } from "react";
import { ProfileContext } from "./ProfileContext";
import type { UserProfile } from "./types";
import useAuth from "../auth/useAuth";

interface Props {
  children: ReactNode;
}

export const ProfileProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  // Initialize local state based on user
  const [profile, setProfile] = useState<UserProfile | null>(
    () =>
      user && {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      }
  );

  // Update local profile
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
