import React, { useEffect, useMemo, useState } from "react";
import { usePosts } from "../usePosts";
import { PostCard } from "../../../shared/components/PostCard";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export const HomePage: React.FC = () => {
  const { posts, deletePost, toggleLike } = usePosts();  // ← FIX
  const { user } = useAuth();  // ← FIX
  const navigate = useNavigate();
  const location = useLocation();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const qParam = params.get("q")?.trim().toLowerCase() || "";

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (!qParam) return posts.slice().reverse();
    return posts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(qParam) ||
          p.content.toLowerCase().includes(qParam)
      )
      .reverse();
  }, [posts, qParam]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-block animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 w-56 h-6 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Loading posts…</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Latest Posts</h2>

      {qParam && (
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Showing results for <span className="font-medium">"{qParam}"</span>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
            No posts found{qParam ? " for your search" : ""}.
          </p>
          <div className="space-x-2">
            <button
              onClick={() => navigate("/create")}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
            >
              Create the first post
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
            >
              Clear search
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={(p, action) => {
                if (action === "edit") navigate(`/edit/${p.id}`);
                else navigate(`/posts/${p.id}`);
              }}
              onDelete={() => deletePost(post.id)}
              showActions
              onLike={() => user && toggleLike(post.id, user.id)}  // ← FIXED
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
