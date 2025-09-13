import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../api/api";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = async (id: number, username: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err: any) {
      console.error("Delete error:", err);
      if (err.response?.data?.error) {
        setError(`Failed to delete user: ${err.response.data.error}`);
      } else if (err.message) {
        setError(`Failed to delete user: ${err.message}`);
      } else {
        setError("Failed to delete user. Please try again.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>All Users</h1>
        <Link
          to="/login"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          + Register New User
        </Link>
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
                </div>
              </div>
              <button
                onClick={() => handleDelete(u.id, u.username)}
                disabled={deletingId === u.id}
                style={{
                  opacity: deletingId === u.id ? 0.6 : 1,
                  cursor: deletingId === u.id ? 'not-allowed' : 'pointer'
                }}
              >
                {deletingId === u.id ? 'Deleting...' : 'Delete'}
              </button>
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
