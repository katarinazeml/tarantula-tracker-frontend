import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1>Tarantula Tracker</h1>
      <p style={{ marginBottom: '24px', color: '#6b7280' }}>
        Track and manage your tarantula collection
      </p>

      <nav style={{
        padding: '16px 0',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        <Link to="/login" style={{
          color: '#2563eb',
          textDecoration: 'none',
          padding: '8px 16px',
          marginRight: '8px',
          borderRadius: '6px',
          transition: 'background-color 0.2s'
        }}>Login / Register</Link>
        <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
        <Link to="/users" style={{
          color: '#2563eb',
          textDecoration: 'none',
          padding: '8px 16px',
          marginRight: '8px',
          borderRadius: '6px',
          transition: 'background-color 0.2s'
        }}>All Users</Link>
        <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>
        <Link to="/tarantulas" style={{
          color: '#2563eb',
          textDecoration: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          transition: 'background-color 0.2s'
        }}>Tarantulas</Link>
      </nav>

      <div style={{ marginTop: '32px' }}>
        <h2>Welcome to Tarantula Tracker</h2>
        <p>Get started by registering an account or browse existing users and tarantulas.</p>
      </div>
    </div>
  );
};

export default HomePage;
