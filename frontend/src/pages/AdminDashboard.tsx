import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axiosInstance";
import type { User, Post } from "../utils/interfaces";

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, postsRes] = await Promise.all([
          api.get<User[]>('/admin/users'),
          api.get<Post[]>('/admin/posts'),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Failed to fetch users or posts", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Failed to delete post");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 dark:text-gray-300">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Users</h2>
        {users.length === 0 ? (
          <p className="mt-4 text-gray-500 dark:text-gray-400">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {users.map(u => (
              <div key={u._id} className="p-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                {u.username} — {u.email}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Posts</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-gray-500 dark:text-gray-400">No posts found.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {posts.map(p => (
              <div
                key={p._id}
                className="p-4 border border-gray-300 dark:border-gray-700 rounded flex justify-between items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">By {p.author.username}</div>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-red-600 dark:text-red-400 mr-4 hover:text-red-800 dark:hover:text-red-600"
                    onClick={() => deletePost(p._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/post/${p._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;