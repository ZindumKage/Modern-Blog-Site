import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import type { Post } from '../utils/interfaces';
import { useAuth } from '../hooks/useAuth';
import CommentItem from '../components/CommentItem';

const PostDetailsPage: React.FC = () => {
  const { id: postId } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const { isAuthenticated, user, isAdmin } = useAuth();

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const { data } = await api.get<Post>(`/posts/${postId}`);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !postId) return;

    try {
      await api.post(`/posts/${postId}/comments`, { content: comment });
      setComment('');
      const { data } = await api.get<Post>(`/posts/${postId}`);
      setPost(data);
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!postId) return;
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      const { data } = await api.get<Post>(`/posts/${postId}`);
      setPost(data);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (!post) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  const canEdit = user?._id === post.author._id || isAdmin;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{post.title}</h1>
    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6 border-b pb-4">
      <div className="flex items-center">
        <span className="font-medium">{post.author.username}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      {canEdit && (
        <div className="flex space-x-2">
          <a href={`/edit/${post._id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Edit</a>
          <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">Delete</button>
        </div>
      )}
    </div>
    <div className="prose max-w-none text-gray-700 dark:text-gray-200 leading-relaxed">{post.content}</div>
  </article>

  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Comments ({post.comments.length})</h2>
    {isAuthenticated && (
      <form onSubmit={handleCommentSubmit} className="mb-8">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          rows={4}
        />
        <button type="submit" className="mt-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600">
          Post Comment
        </button>
      </form>
    )}
    <div className="space-y-4">
      {post.comments.map(c => (
        <CommentItem key={c._id} comment={c} onDelete={handleDeleteComment} />
      ))}
    </div>
  </div>
</div>
  );
};

export default PostDetailsPage;