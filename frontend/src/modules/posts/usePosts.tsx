import { useContext } from "react";
import { PostContext } from "./PostContext";

export const usePosts = () => {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePosts must be used within PostProvider");
  return ctx;
};