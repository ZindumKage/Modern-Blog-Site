import React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../utils/interfaces";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400">
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </h2>

      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span className="font-medium">{post.author.username}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>

      <Link
        to={`/post/${post._id}`}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
      >
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;