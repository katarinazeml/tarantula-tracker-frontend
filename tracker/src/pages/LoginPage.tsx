import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../api/api";

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    usernameOrEmail: "" // for login
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await loginUser({
        usernameOrEmail: form.usernameOrEmail,
        password: form.password
      });

      // Store user info in localStorage (or use a proper state management solution)
      localStorage.setItem('currentUser', JSON.stringify(response.data));

      setSuccess(`Welcome back, ${response.data.username}!`);

      // Redirect to tarantulas page after successful login
      setTimeout(() => {
        navigate('/tarantulas');
      }, 1500);
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await createUser({
        username: form.username,
        email: form.email,
        password: form.password
      });
      setSuccess("Account created successfully! You can now login.");
      setForm({ username: "", email: "", password: "", usernameOrEmail: "" });

      // Switch to login mode
      setTimeout(() => {
        setIsLogin(true);
        setSuccess("");
      }, 2000);
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setForm({ username: "", email: "", password: "", usernameOrEmail: "" });
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" style={{ color: '#a855f7', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div className="form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>
          {isLogin ? 'Login' : 'Create Account'}
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '24px' }}>
          {isLogin ? 'Welcome back to Tarantula Tracker' : 'Register to start tracking your tarantulas'}
        </p>

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

        {success && (
          <div style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px',
            color: '#166534',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="form-content">
          {isLogin ? (
            // Login Form
            <>
              <div className="form-group">
                <label className="form-label">Username or Email *</label>
                <input
                  name="usernameOrEmail"
                  value={form.usernameOrEmail}
                  onChange={handleChange}
                  placeholder="Enter your username or email"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>
            </>
          ) : (
            // Register Form
            <>
              <div className="form-group">
                <label className="form-label">Username *</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  className="form-input"
                />
              </div>
            </>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
              style={{
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                width: '100%'
              }}
            >
              {isLoading
                ? (isLogin ? 'Logging in...' : 'Creating Account...')
                : (isLogin ? 'Login' : 'Create Account')
              }
            </button>
          </div>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderRadius: '6px',
          border: '1px solid rgba(168, 85, 247, 0.3)'
        }}>
          <p style={{ color: '#d1d5db', fontSize: '14px', margin: '0' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#a855f7',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {isLogin ? 'Create one here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
