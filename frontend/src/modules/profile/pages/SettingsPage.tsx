import useAuth from "../../auth/useAuth";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  const save = () => {
    console.log("Update profile", { username, email });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Settings
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={save}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}