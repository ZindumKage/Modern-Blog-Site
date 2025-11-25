export interface Comment {
  id: number;
  userId: number;
  username: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  image?: string | null;
  createdAt: string;
  likes: number;
  comments: Comment[];
  likedUsers: number[];
}
export interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, "id" | "createdAt" | "likes" | "comments">) => void;
  updatePost: (id: number, updated: Partial<Post>) => void;
  deletePost: (id: number) => void;
  addComment: (postId: number, comment: Omit<Comment, "id" | "createdAt">) => void;
  toggleLike: (postId: number, userId: number) => void;
  deleteComment: (postId: number, commentId: number, userId: number) => void;
}