import React from 'react';
import { Phone, Mail, Award, Truck } from 'lucide-react';

export default function TopBar() {
  return (
    <div
      style={{
        backgroundColor: '#0c261a',
        color: '#e2efe7',
        fontSize: '0.82rem',
        padding: '8px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.95, flexWrap: 'wrap' }}>
          <Truck size={14} color="#52b788" />
          <span>Quality Bags & Floor Mats</span>
          <span>|</span>
          <span>Bhavani Manufacturer</span>
          <span>|</span>
          <span style={{ color: '#b7dfc8', fontWeight: 600 }}>Wholesale & Export</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.95 }}>
          <a
            href="tel:+919842270384"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#52b788'}
            onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
          >
            <Phone size={13} color="#52b788" />
            <span>+91 98422 70384</span>
          </a>
          <span style={{ opacity: 0.4 }}>•</span>
          <a
            href="mailto:shreeyasudarshantradingcompany@gmail.com"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#52b788'}
            onMouseLeave={e => e.currentTarget.style.color = 'inherit'}
          >
            <Mail size={13} color="#52b788" />
            <span>shreeyasudarshantradingcompany@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
