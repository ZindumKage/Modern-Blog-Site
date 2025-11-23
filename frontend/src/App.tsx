import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeProvider';
import { RequireAuth, RequireAdmin } from './routes/RequireAuth';
import { useAuth } from './hooks/useAuth';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const PostDetailsPage = lazy(() => import('./pages/PostDetails'));
const CreateEditPostPage = lazy(() => import('./pages/CreateEditPost'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Wrapper to pass postId from URL to PostDetailsPage
const PostDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Post ID not found</div>;
  return <PostDetailsPage />; // no props needed anymore
};

// Wrapper to pass postId from URL to CreateEditPostPage
const CreateEditPostWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <CreateEditPostPage />; // no props needed
};

// Profile wrapper to use logged-in user ID
const ProfileWrapper: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <div>User not found</div>;
  return <ProfilePage userId={user._id} />;
};

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <ProfileWrapper />
                    </RequireAuth>
                  }
                />
                <Route path="/posts/:id" element={<PostDetailsWrapper />} />
                <Route
                  path="/create"
                  element={
                    <RequireAuth>
                      <CreateEditPostPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <RequireAuth>
                      <CreateEditPostWrapper />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminDashboard />
                    </RequireAdmin>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;