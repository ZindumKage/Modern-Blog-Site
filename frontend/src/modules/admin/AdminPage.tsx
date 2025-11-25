import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { usePosts } from "../posts/usePosts";
import type{ Post } from "../posts/types";

export const AdminPage: React.FC = () => {
  const { posts, deletePost } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">All Posts</h3>
          <div className="space-y-3">
            {posts.map(post => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">by {post.author}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.likes} ❤️ • {post.comments.length} 💬</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deletePost(post.id); setSelectedPost(null); }}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Post Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Post Preview</h3>
          {selectedPost ? (
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{selectedPost.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                by {selectedPost.author} • {new Date(selectedPost.createdAt).toLocaleDateString()}
              </p>
              {selectedPost.image && (
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded mb-4" />
              )}
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedPost.content}</p>

              <div className="flex space-x-4 mb-4">
                <span>❤️ {selectedPost.likes}</span>
                <span>💬 {selectedPost.comments.length} comments</span>
              </div>

              {selectedPost.comments.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h5 className="font-bold mb-2">Comments</h5>
                  {selectedPost.comments.map(c => (
                    <div key={c.id} className="mb-2">
                      <p className="text-sm font-medium">{c.username}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{c.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => { deletePost(selectedPost.id); setSelectedPost(null); }}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium mt-4"
              >
                Delete Post
              </button>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">Select a post to preview</p>
          )}
        </div>
      </div>
    </div>
  );
};