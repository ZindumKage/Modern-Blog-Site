import React from "react";
import type { Comment as CommentType } from "../utils/interfaces";
import { useAuth } from "../hooks/useAuth";

interface CommentItemProps {
  comment: CommentType;
  onDelete?: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
  const { user, isAdmin } = useAuth();
  const canDelete = isAdmin || user?._id === comment.author._id;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {comment.author.username}
            </span>
            <span className="mx-2 text-gray-400 dark:text-gray-500">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
        {canDelete && onDelete && (
          <button
            onClick={() => onDelete(comment._id)}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm ml-4"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;