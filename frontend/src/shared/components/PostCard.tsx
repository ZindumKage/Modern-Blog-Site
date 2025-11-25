import type { Post } from "../../modules/posts/types";
import useAuth from "../../modules/auth/useAuth";
import { Edit, Trash2, User, Heart, MessageCircle } from "lucide-react";

interface Props {
  post: Post;
  onClick: (post: Post, action?: "edit") => void;
  onDelete: (id: number) => void;
  showActions?: boolean;
  onLike?: () => void;
}

export const PostCard = ({
  post,
  onClick,
  onDelete,
  showActions = false,
  onLike,
}: Props) => {
  const { user } = useAuth();

  const canEdit = user && user.id === post.authorId;
  const canDelete = user && (user.id === post.authorId || user.isAdmin);

  //  Correct: likedUsers contains user IDs
  const isLiked = user ? post.likedUsers.includes(user.id) : false;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}

      <div className="p-6">
        <h3
          className="text-xl font-bold text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
          onClick={() => onClick(post)}
        >
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* LIKE + COMMENTS + AUTHOR */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">

            {/* ❤️ SINGLE LIKE BUTTON */}
            <button onClick={onLike} className="flex items-center space-x-1">
              <Heart
                size={16}
                fill={isLiked ? "red" : "none"}
                color={isLiked ? "red" : "currentColor"}
              />
              <span>{post.likes}</span>
            </button>

            <div className="flex items-center space-x-1">
              <MessageCircle size={16} /> <span>{post.comments.length}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        {showActions && canDelete && (
          <div className="mt-4 flex space-x-2">
            {canEdit && (
              <button
                onClick={() => onClick(post, "edit")}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                <Edit size={16} /> <span>Edit</span>
              </button>
            )}

            <button
              onClick={() => onDelete(post.id)}
              className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
              <Trash2 size={16} /> <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
