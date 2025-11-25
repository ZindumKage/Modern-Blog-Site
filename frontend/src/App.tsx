import React from "react";
import { AppRoutes } from "./app/routes";
import { ThemeProvider } from "./shared/context/ThemeProvider";
import { ProfileProvider } from "./modules/profile/ProfileProvider";
import { PostProvider } from "./modules/posts/PostProvider";
import { AuthProvider } from "./modules/auth/AuthProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <PostProvider>
            <AppRoutes />
          </PostProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
