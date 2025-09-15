import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/api";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

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

  return (
    <div className="container">
      <div style={{ marginBottom: '24px' }}>
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
                </div>
              </div>
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
