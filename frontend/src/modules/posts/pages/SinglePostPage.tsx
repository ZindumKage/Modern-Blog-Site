import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../usePosts";
import useAuth from "../../auth/useAuth";

export const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, addComment, toggleLike, deleteComment } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));
  const [commentText, setCommentText] = useState("");

  if (!post)
    return (
      <p className="p-8 text-gray-500 dark:text-gray-400">Post not found.</p>
    );

  const handleComment = () => {
    if (!user || !commentText.trim()) return;

    addComment(post.id, {
      userId: user.id,
      username: user.username,
      content: commentText,
    });

    setCommentText("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        ← Back
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">
          {post.content}
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => user && toggleLike(post.id, user.id)}
            disabled={!user}
            className="flex items-center space-x-1 px-3 py-1 rounded
    bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ❤️ {post.likes}
          </button>

          <span>{post.comments.length} comments</span>
        </div>

        {user && (
          <div className="mb-6">
            <textarea
              rows={3}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 mb-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              onClick={handleComment}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Comment
            </button>
          </div>
        )}

        {post.comments.length > 0 && (
          <div className="space-y-4">
            {post.comments.map((c) => (
              <div
                key={c.id}
                className="p-4 border rounded-lg dark:border-gray-700 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {c.username}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {c.content}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>

                {user && c.userId === user.id && (
                  <button
                    onClick={() => deleteComment(post.id, c.id, user.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};
