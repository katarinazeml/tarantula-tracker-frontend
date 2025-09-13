import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 100%)',
      margin: '-24px -24px 48px -24px', // Negative margins to extend beyond container
      padding: '32px 48px',
      borderBottom: '2px solid rgba(168, 85, 247, 0.4)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      position: 'relative'
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
        <div style={{ flex: 1 }}>
          <h1 style={{
            margin: '0 0 16px 0',
            textShadow: '0 0 15px rgba(232, 121, 249, 0.8), 2px 2px 4px rgba(0, 0, 0, 1)'
          }}>
            Tarantula Tracker
          </h1>

          <p style={{
            marginBottom: '24px',
            color: '#d1d5db',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
          }}>
            Track and manage your tarantula collection
          </p>

          <nav>
            <Link to="/login" style={{
              color: '#a855f7',
              textDecoration: 'none',
              padding: '10px 16px',
              marginRight: '8px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'inline-block'
            }}>Login / Register</Link>

            <span style={{ margin: '0 12px', color: '#6b7280' }}>|</span>

            <Link to="/users" style={{
              color: '#a855f7',
              textDecoration: 'none',
              padding: '10px 16px',
              marginRight: '8px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'inline-block'
            }}>All Users</Link>

            <span style={{ margin: '0 12px', color: '#6b7280' }}>|</span>

            <Link to="/tarantulas" style={{
              color: '#a855f7',
              textDecoration: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'inline-block'
            }}>Tarantulas</Link>
          </nav>
        </div>

        {/* Right side ASCII spider art */}
        <div style={{
          marginLeft: '40px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '8px',
            color: '#a855f7',
            lineHeight: '1',
            margin: 0,
            textShadow: '0 0 5px rgba(168, 85, 247, 0.5)'
          }}>
{`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
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
