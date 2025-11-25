import type{ ReactNode } from "react";
import { ThemeProvider } from "../shared/context/ThemeProvider";
import { AuthProvider } from "../modules/auth/AuthProvider";
import { PostProvider } from "../modules/posts/PostProvider";
import { ProfileProvider } from "../modules/profile/ProfileProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <PostProvider>{children}</PostProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}