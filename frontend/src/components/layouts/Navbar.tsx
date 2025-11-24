import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          BlogApp
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300'
            }
          >
            Home
          </NavLink>
          {user && (
            <NavLink to="/create" className="text-gray-700 dark:text-gray-300">
              Create
            </NavLink>
          )}
          {user && (
            <NavLink to="/profile" className="text-gray-700 dark:text-gray-300">
              Profile
            </NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className="text-gray-700 dark:text-gray-300">
              Admin
            </NavLink>
          )}
          <Button onClick={toggle}>{theme === 'dark' ? '☀️' : '🌙'}</Button>
          {user ? (
            <Button
              onClick={() => {
                logout();
                nav('/');
              }}
            >
              Logout
            </Button>
          ) : (
            <div className="space-x-2">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen((o) => !o)} className="mr-2 text-gray-700 dark:text-gray-300">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 dark:text-gray-300 py-2">
            Home
          </Link>
          {user && <Link to="/create" className="block text-gray-700 dark:text-gray-300 py-2">Create</Link>}
          {user && <Link to="/profile" className="block text-gray-700 dark:text-gray-300 py-2">Profile</Link>}
          {user?.role === 'admin' && (
            <Link to="/admin" className="block text-gray-700 dark:text-gray-300 py-2">
              Admin
            </Link>
          )}
          <button
            onClick={toggle}
            className="block text-gray-700 dark:text-gray-300 py-2 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Toggle Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;