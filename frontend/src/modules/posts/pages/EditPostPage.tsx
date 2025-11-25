import React, { useState, useEffect } from "react";
import { usePosts } from "../usePosts";
import { useNavigate, useParams } from "react-router-dom";
import useAuth  from "../../auth/useAuth";

export const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, updatePost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const post = posts.find(p => p.id === Number(id));
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [image, setImage] = useState(post?.image || "");

  useEffect(() => {
    if (!post) navigate("/");
    if (post && user && post.authorId !== user.id && !user.isAdmin) navigate("/");
  }, [post, user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    updatePost(post.id, { title, content, image });
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Post</h2>
      <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          rows={8}
          placeholder="Content"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <div className="flex space-x-4">
          <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">Update</button>
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium">Cancel</button>
        </div>
      </form>
    </div>
  );
};