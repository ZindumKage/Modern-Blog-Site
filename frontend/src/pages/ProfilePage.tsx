import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import type { User, Post } from "../utils/interfaces";
import PostCard from "../components/PostCard";
import { useAuth } from "../hooks/useAuth";

interface ProfilePageProps {
  userId: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userRes, postsRes] = await Promise.all([
          api.get<User>(`/users/${userId}`),
          api.get<Post[]>(`/users/${userId}/posts`),
        ]);
        setUserProfile(userRes.data);
        setPosts(postsRes.data);
        setUsername(userRes.data.username);
        setEmail(userRes.data.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError(null);
    try {
      const { data } = await api.put<User>(`/users/${userId}`, {
        username,
        email,
      });
      setUserProfile(data);
      setIsEditing(false);
    } catch (err: unknown) {
      console.error("Failed to update profile", err);
      if (err instanceof Error)
      setUpdateError(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );

  if (!userProfile) return null;

  const isCurrentUser = currentUser?._id === userId;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userProfile.username[0].toUpperCase()}
            </div>
            <div>
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-800">{userProfile.username}</h1>
                  <p className="text-gray-600">{userProfile.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {new Date(userProfile.createdAt).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {updateError && (
                    <p className="text-red-600 text-sm">{updateError}</p>
                  )}
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={updating}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {updating ? "Updating..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setUsername(userProfile.username);
                        setEmail(userProfile.email);
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          {isCurrentUser && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* User Posts */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Posts by {userProfile.username}
      </h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;