import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, sendFriendRequest } from "../api/api";
import Header from "../components/Header";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [sendingRequest, setSendingRequest] = useState<number | null>(null);
  const [currentUserId] = useState<number>(1); // TODO: Replace with actual logged-in user ID

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
      setError("");
    } catch (err: any) {
      setError("Failed to load users. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSendFriendRequest = async (targetUserId: number, username: string) => {
    setSendingRequest(targetUserId);
    setError("");

    try {
      await sendFriendRequest(currentUserId, { usernameOrEmail: username });
      // Show success message (you could add a success state)
      alert(`Friend request sent to ${username}!`);
    } catch (err: any) {
      console.error("Send friend request error:", err);
      if (err.response?.data?.error) {
        setError(`Failed to send friend request: ${err.response.data.error}`);
      } else {
        setError("Failed to send friend request. Please try again.");
      }
    } finally {
      setSendingRequest(null);
    }
  };

  return (
    <div className="container">
      <Header />

      <div style={{ marginBottom: '24px', marginTop: '60px' }}>
        <Link to="/" style={{ color: '#a855f7', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>All Users</h1>
      </div>

      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          color: '#dc2626',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {users.length > 0 ? (
        <ul className="user-list">
          {users.map((u) => (
            <li key={u.id}>
              <div>
                <strong>{u.username}</strong> ({u.email})
                {u.isActive === false && (
                  <span style={{ color: '#6b7280', fontSize: '12px' }}> (Inactive)</span>
                )}
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  User ID: {u.id} • Created: {new Date(u.createdAt).toLocaleDateString()}
                  {u.firstName && u.lastName && (
                    <span> • {u.firstName} {u.lastName}</span>
                  )}
                </div>
              </div>

              {/* Only show Add Friend button for other users */}
              {u.id !== currentUserId && (
                <button
                  onClick={() => handleSendFriendRequest(u.id, u.username)}
                  disabled={sendingRequest === u.id}
                  style={{
                    padding: '8px 16px',
                    fontSize: '12px',
                    background: sendingRequest === u.id
                      ? 'linear-gradient(145deg, #6b7280, #9ca3af)'
                      : 'linear-gradient(145deg, #059669, #10b981)',
                    color: '#ffffff',
                    border: sendingRequest === u.id
                      ? '1px solid rgba(107, 114, 128, 0.5)'
                      : '1px solid rgba(5, 150, 105, 0.5)',
                    borderRadius: '6px',
                    cursor: sendingRequest === u.id ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    boxShadow: sendingRequest === u.id
                      ? '0 2px 8px rgba(107, 114, 128, 0.3)'
                      : '0 2px 8px rgba(5, 150, 105, 0.3)',
                    opacity: sendingRequest === u.id ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (sendingRequest !== u.id) {
                      e.currentTarget.style.background = 'linear-gradient(145deg, #047857, #059669)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sendingRequest !== u.id) {
                      e.currentTarget.style.background = 'linear-gradient(145deg, #059669, #10b981)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(5, 150, 105, 0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {sendingRequest === u.id ? 'Sending...' : '+ Add Friend'}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
          <p>No users found.</p>
          <Link to="/login" style={{ color: '#2563eb' }}>Create the first user</Link>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
