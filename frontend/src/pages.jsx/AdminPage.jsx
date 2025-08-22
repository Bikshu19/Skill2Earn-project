import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrashIcon,
  CheckIcon,
  LogoutIcon,
  MailIcon,
} from "@heroicons/react/outline";

function AdminPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchPendingUsers = async () => {
    setLoadingUsers(true);
    setUserError(null);
    try {
      const response = await fetch("http://localhost:5000/api/pending-users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setUserError(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    setMessageError(null);
    try {
      const response = await fetch("http://localhost:5000/api/messages");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
      setShowMessages(true);
    } catch (err) {
      setMessageError(err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const publishWork = async (userId, workId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/works/${workId}/publish`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to update status");
      await fetchPendingUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      await fetchPendingUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${messageId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete message");
      await fetchMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50/80 via-pink-100/60 to-purple-100/70">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center border-b border-pink-200">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight select-none">
          Admin <span className="text-pink-600">Dashboard</span>
        </h1>

        <div className="flex gap-3">
          <button
            onClick={fetchMessages}
            className="flex items-center gap-1 px-5 py-2 border border-pink-600 text-pink-600 rounded-xl shadow-md hover:bg-pink-50 transition duration-300"
            title="Load Messages"
          >
            <MailIcon className="w-5 h-5" />
            Get Messages
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-5 py-2 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700 transition duration-300"
            title="Logout"
          >
            <LogoutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-center text-gray-700 text-lg mb-10 select-none">
          Welcome, <span className="font-semibold text-pink-600">Admin!</span>
        </p>

        {/* Messages Section */}
        {showMessages && (
          <section className="mb-16 bg-white rounded-2xl shadow-xl border border-pink-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-pink-200 pb-3 select-none">
              User Messages
            </h2>

            {loadingMessages ? (
              <p className="text-gray-700 text-center">Loading messages...</p>
            ) : messageError ? (
              <p className="text-red-600 text-center">{messageError}</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-700 text-center">No messages found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-pink-100/70 text-gray-900 uppercase text-sm select-none">
                      <th className="p-4 border-b border-pink-300">Username</th>
                      <th className="p-4 border-b border-pink-300">Email</th>
                      <th className="p-4 border-b border-pink-300">Subject</th>
                      <th className="p-4 border-b border-pink-300">Message</th>
                      <th className="p-4 border-b border-pink-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr
                        key={msg._id}
                        className="hover:bg-pink-50 transition-all duration-200 cursor-pointer"
                      >
                        <td className="p-4 border-b border-gray-200 font-medium">
                          {msg.username}
                        </td>
                        <td className="p-4 border-b border-gray-200 lowercase text-pink-700">
                          {msg.email}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          {msg.subject}
                        </td>
                        <td className="p-4 border-b border-gray-200 text-gray-700">
                          {msg.message}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            className="inline-flex items-center gap-1 px-4 py-1 rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition duration-300"
                            title={`Delete message from ${msg.username}`}
                          >
                            <TrashIcon className="w-5 h-5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Users Section */}
        {loadingUsers ? (
          <p className="text-center text-gray-700 text-lg select-none">
            Loading users...
          </p>
        ) : userError ? (
          <p className="text-center text-red-600 text-lg select-none">
            {userError}
          </p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-700 text-lg select-none">
            No users with pending works found.
          </p>
        ) : (
          users.map((user) => (
            <section
              key={user._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 p-8 mb-12"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-bold text-gray-900 select-none">
                  {user.username}{" "}
                  <span className="text-gray-600 text-sm font-normal select-text">
                    ({user.email})
                  </span>
                </h3>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition duration-300"
                  title={`Delete user ${user.username}`}
                >
                  <TrashIcon className="w-5 h-5" />
                  Delete User
                </button>
              </div>

              <p className="text-gray-700 mb-7 select-none">
                Gender: <span className="font-semibold">{user.gender}</span>
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-pink-100/70 text-gray-900 uppercase text-sm select-none">
                      <th className="p-4 border-b border-pink-300">Category</th>
                      <th className="p-4 border-b border-pink-300">
                        Subcategory
                      </th>
                      <th className="p-4 border-b border-pink-300">Status</th>
                      <th className="p-4 border-b border-pink-300">Image</th>
                      <th className="p-4 border-b border-pink-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.works.map((work, idx) => (
                      <tr
                        key={`${user._id}-${idx}`}
                        className="hover:bg-pink-50 transition-all duration-200 cursor-pointer"
                      >
                        <td className="p-4 border-b border-gray-200">
                          {work.category}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          {work.subcategory}
                        </td>
                        <td className="p-4 border-b border-gray-200 font-semibold text-pink-600 capitalize">
                          {work.status}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          {work.image && work.image.length > 0 ? (
                            <img
                              src={work.image[0]}
                              alt="Work"
                              className="max-w-[100px] max-h-[60px] rounded-md shadow"
                              loading="lazy"
                            />
                          ) : (
                            <span className="italic text-gray-400">
                              No Image
                            </span>
                          )}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          {work.status === "pending" && (
                            <button
                              onClick={() => publishWork(user._id, work._id)}
                              className="flex items-center gap-2 bg-green-600 text-white px-4 py-1 rounded-lg shadow hover:bg-green-700 transition duration-300 select-none"
                              title={`Publish work in ${work.category}`}
                            >
                              <CheckIcon className="w-5 h-5" />
                              Publish
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}

export default AdminPage;
