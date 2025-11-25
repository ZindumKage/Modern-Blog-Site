import React, { useState } from "react";
import { useProfile } from "../useProfile";

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    email: profile?.email || "",
    avatar: profile?.avatar || ""
  });

  const handleSubmit = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(prev => ({ ...prev, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  if (!profile) return <p className="p-8 text-gray-500 dark:text-gray-400">No profile found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-indigo-600 text-white text-3xl mr-6">
            {formData.avatar ? <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover"/> : profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.username}</h3>
            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
            {profile.isAdmin && <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-sm rounded-full">Admin</span>}
          </div>
        </div>

        {editing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Avatar</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"/>
            </div>
            <div className="flex space-x-4">
              <button onClick={handleSubmit} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Save</button>
              <button onClick={() => setEditing(false)} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">Edit Profile</button>
        )}
      </div>
    </div>
  );
};