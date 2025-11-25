import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "../shared/layout/AppLayout";
import { ProtectedRoute } from "../shared/layout/ProtectedRoute";

// Auth Pages
import { LoginPage } from "../modules/auth/pages/LoginPage";
import { RegisterPage } from "../modules/auth/pages/RegisterPage";

// Posts Pages
import { HomePage } from "../modules/posts/pages/HomePage";
import { SinglePostPage } from "../modules/posts/pages/SinglePostPage";
import { CreatePostPage } from "../modules/posts/pages/CreatePostPage";
import { EditPostPage } from "../modules/posts/pages/EditPostPage";

// Profile Pages
import { ProfilePage } from "../modules/profile/pages/ProfilePage";
import SettingsPage from "../modules/profile/pages/SettingsPage";

// Admin Pages
import { AdminPage } from "../modules/admin/AdminPage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Layout */}
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="posts/:id" element={<SinglePostPage />} />
        <Route path="create" element={<CreatePostPage />} />
        <Route path="edit/:id" element={<EditPostPage />} />

        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />

        <Route path="admin" element={<AdminPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<h1 className="text-center mt-20 text-2xl">404 - Page Not Found</h1>} />
    </Routes>
  );
};