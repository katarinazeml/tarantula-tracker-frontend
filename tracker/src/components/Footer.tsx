import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={{
      marginTop: '64px',
      padding: '32px 24px',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <pre style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#a855f7',
            lineHeight: '1',
            margin: 0,
            textShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
          }}>
{`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
          </pre>
        </div>

        {/* Footer Content */}
        <div style={{
          textAlign: 'center',
          color: '#d1d5db'
        }}>
          <p style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            Track your eight-legged friends with care and precision
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <span>© 2025 Tarantula Tracker</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
