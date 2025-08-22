import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  // State for users (existing)
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState(null);

  // State for messages (new)
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch users with pending works (existing)
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

  // Fetch messages (new)
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
      await fetchPendingUsers(); // refresh list
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
      await fetchPendingUsers(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  // New: Delete message by id
  const deleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${messageId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete message");
      // Refresh messages after deletion
      await fetchMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      {/* Top-left area with Logout and Get Messages buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <button
          onClick={handleLogout}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Logout
        </button>

        <button
          onClick={fetchMessages}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Get Messages
        </button>
      </div>

      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <p style={{ textAlign: "center" }}>Welcome, Admin!</p>

      {/* Display messages if showMessages is true */}
      {showMessages && (
        <div style={{ marginBottom: "3rem" }}>
          <h2>Messages</h2>
          {loadingMessages ? (
            <p>Loading messages...</p>
          ) : messageError ? (
            <p style={{ color: "red" }}>{messageError}</p>
          ) : messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "2rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Username
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Subject
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Message
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id}>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {msg.username}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {msg.email}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {msg.subject}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {msg.message}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          padding: "0.3rem 0.6rem",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Existing users section */}
      {loadingUsers ? (
        <p style={{ textAlign: "center" }}>Loading users...</p>
      ) : userError ? (
        <p style={{ textAlign: "center", color: "red" }}>{userError}</p>
      ) : users.length === 0 ? (
        <p>No users with pending works found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              marginBottom: "2rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <h3>
              {user.username} ({user.email})
            </h3>
            <p>Gender: {user.gender}</p>
            <button
              onClick={() => deleteUser(user._id)}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "0.3rem 0.6rem",
                border: "none",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              Delete User
            </button>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Subcategory
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Image
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.works.map((work, idx) => (
                  <tr key={`${user._id}-${idx}`}>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {work.category}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {work.subcategory}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {work.status}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {work.image && work.image.length > 0 ? (
                        <img
                          src={work.image[0]}
                          alt="Work"
                          style={{ maxWidth: 100, maxHeight: 60 }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "0.5rem",
                      }}
                    >
                      {work.status === "pending" && (
                        <button
                          onClick={() => publishWork(user._id, work._id)}
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.3rem 0.6rem",
                            marginRight: "0.5rem",
                          }}
                        >
                          Publish
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;
