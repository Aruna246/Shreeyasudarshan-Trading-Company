import React from 'react';

export default function Logo({ light = false, size = 'default' }) {
  const isSmall = size === 'small';
  const logoHeight = isSmall ? '42px' : '56px';

  if (light) {
    // For Dark Backgrounds (like the Footer)
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          userSelect: 'none'
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '4px 10px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
          }}
        >
          <img
            src="/images/logo_clean.png"
            alt="ShreeyaSudarshan Trading Company"
            style={{
              height: isSmall ? '38px' : '50px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>
    );
  }

  // Standard Header / Light Background
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src="/images/logo_clean.png"
        alt="ShreeyaSudarshan Trading Company Logo"
        style={{
          height: logoHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
