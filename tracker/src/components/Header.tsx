import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '12px 24px',
      borderBottom: '2px solid rgba(168, 85, 247, 0.4)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Subtle glow effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.05), transparent)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Left side content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'left',
          gap: '32px'
        }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              textShadow: '0 0 15px rgba(232, 121, 249, 0.8), 2px 2px 4px rgba(0, 0, 0, 1)',
              cursor: 'pointer'
            }}>
              Tarantula Tracker
            </h1>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/login" style={{
              color: '#a855f7',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'inline-block',
              fontSize: '14px'
            }}>Login / Register</Link>

            <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>

            <Link to="/users" style={{
              color: '#a855f7',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'inline-block',
              fontSize: '14px'
            }}>All Users</Link>

            <span style={{ margin: '0 8px', color: '#6b7280' }}>|</span>

            <Link to="/tarantulas" style={{
              color: '#a855f7',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'inline-block',
              fontSize: '14px'
            }}>My Tarantulas</Link>
          </nav>
        </div>

        {/* Right side ASCII spider art - smaller */}
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '6px',
            color: '#a855f7',
            lineHeight: '1',
            margin: 0,
            textShadow: '0 0 5px rgba(168, 85, 247, 0.5)'
          }}>
{`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⣴⣿⣿⣿⣷⣼⣿⠀⣴⠾⠷⠶⠦⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⡤⢶⣦⣾⣿⣿⣿⣿⣿⣿⣿⠀⣿⣶⣶⣦⣄⠳⣤⣤⠄⠀⠀⠀
⠀⠀⠀⢀⣼⣳⡿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣗⠈⠙⠻⣶⣄⡀⠀⠀⠀
⠀⠀⠀⣰⠿⠁⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠈⠳⣤⠀⠀
⠀⠀⢀⡟⠀⢰⣿⠟⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⠉⠁⠈⠻⣶⣄⠀⠀⠈⠛⢦
⠀⣀⡼⠃⠀⣼⡟⠀⠀⢸⣿⡿⠉⣿⡿⠿⠛⣿⡄⠀⠀⠀⠙⠿⣆⠀⠀⠀⠈
⠈⠁⠀⠀⢸⡟⠀⠀⠀⢸⣿⠀⠀⣿⠁⠀⠀⠈⠃⠀⠀⠀⠀⠀⠘⢷⡄⠀⠀
⠀⠀⠀⠀⣼⠃⠀⠀⠀⢸⡟⠀⠀⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡆⠀
⠀⠀⠀⣠⡏⠀⠀⠀⠀⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠻⠃⠀⠀⠀⠀⣻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
          </pre>
        </div>
      </div>
    </header>
  );
};

export default Header;
