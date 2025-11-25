import React, { useState,useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../modules/auth/useAuth";
import { useTheme } from "../context/ThemeContext";
import {
  Home,
  PlusCircle,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
  Search,
} from "lucide-react";

/**
 * Navbar: uses NavLink for active styling and URL navigation
 * - Search updates ?q= query param
 * - Shows Admin link when user.isAdmin
 * - Uses Theme context and Auth hook
 */

const activeClass =
  "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300";
const inactiveClass =
  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
const [q, setQ] = useState("");

  // Optional: if you want to clear query param from URL on reload
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("q")) {
      params.delete("q");
      navigate({ pathname: "/", search: params.toString() }, { replace: true });
    }
  }, []); // runs only on mount

  const submitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const searchParams = new URLSearchParams(); // start fresh
    if (q) searchParams.set("q", q);

  navigate({ pathname: "/", search: searchParams.toString() });
};



  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* left */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              aria-label="Go home"
            >
              BlogHub
            </button>

            {user && (
              <div className="hidden md:flex items-center space-x-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/create"
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                >
                  <PlusCircle size={18} />
                  <span>Create</span>
                </NavLink>

                {user.isAdmin && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? activeClass : inactiveClass
                      }`
                    }
                  >
                    <Settings size={18} />
                    <span>Admin</span>
                  </NavLink>
                )}
              </div>
            )}
          </div>

          {/* center - search */}
          <div className="flex-1 px-4">
            <form onSubmit={submitSearch} className="max-w-lg mx-auto">
              <label htmlFor="nav-search" className="sr-only">
                Search posts
              </label>
              <div className="relative">
                <input
                  id="nav-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search posts (title or content)..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={16} />
                </div>
              </div>
            </form>
          </div>

          {/* right */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="hover:text-indigo-500 dark:hover:text-indigo-400
 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">{user.username}</span>
                </NavLink>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
