import type{ UserProfile } from "../profile/types";

export interface AdminPost {
  id: number;
  title: string;
  content: string;
  author: string;
  authorId: number;
  createdAt: string;
}

export interface AdminContextType {
  posts: AdminPost[];
  deletePost: (id: number) => void;
  selectPost: (post: AdminPost | null) => void;
  selectedPost: AdminPost | null;
}