import React, { useState } from "react";
import { PostContext } from "./PostContext";
import type { Post, Comment } from "./types";

interface Props {
  children: React.ReactNode;
}

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Getting Started with React",
      content: "React is a powerful JS library for building UIs...",
      author: "Demo User",
      authorId: 1,
      image: null,
      createdAt: "2025-01-15",
      likes: 0,
      comments: [],
      likedUsers: []
    },
    {
      id: 2,
      title: "Dark Mode Implementation",
      content: "Learn how to implement dark mode with React...",
      author: "Demo User",
      authorId: 1,
      image: null,
      createdAt: "2025-01-20",
      likes: 0,
      comments: [],
      likedUsers: []
    },
  ]);

  const addPost = (post: Omit<Post, "id" | "createdAt" | "likes" | "comments">) => {
    const newPost: Post = {
      ...post,
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      likedUsers: []
    };
    setPosts([...posts, newPost]);
  };

  const updatePost = (id: number, updated: Partial<Post>) => {
    setPosts(posts.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const addComment = (postId: number, comment: Omit<Comment, "id" | "createdAt">) => {
    setPosts(posts.map(p =>
      p.id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              {
                ...comment,
                id: p.comments.length ? p.comments[p.comments.length - 1].id + 1 : 1,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : p
    ));
  };

  const toggleLike = (postId: number, userId: number) => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;

      const likedUsers = p.likedUsers ?? [];
      const hasLiked = likedUsers.includes(userId);

      return {
        ...p,
        likes: hasLiked ? p.likes - 1 : p.likes + 1,
        likedUsers: hasLiked
          ? likedUsers.filter(id => id !== userId)
          : [...likedUsers, userId]
      };
    }));
  };

  const deleteComment = (postId: number, commentId: number, userId: number) => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: p.comments.filter(c => !(c.id === commentId && c.userId === userId))
      };
    }));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        addComment,
        toggleLike,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
