import React from 'react';
import Logo from './Logo.jsx';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const productLinks = [
    'Jute Fashion Bags',
    'Cotton Carry Bags',
    'Cotton Shopping Bags',
    'Leather Travel Bags',
    'Fancy Jute Bags'
  ];

  return (
    <footer style={{ backgroundColor: '#0e2a1d', color: '#e0ece4', paddingTop: '60px', paddingBottom: '30px' }}>
      <div className="container">
        {/* Main 4-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '50px'
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <Logo light={true} />
            </div>
            <p style={{ color: '#a3beaf', fontSize: '0.88rem', lineHeight: '1.7', marginTop: '12px' }}>
              Manufacturers and exporters of premium handcrafted eco-friendly jute bags, pure cotton bags, and traditional handloom mats based in Bhavani, Tamil Nadu.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '1.05rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      setActivePage(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      color: '#b2c8bc',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '1.05rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Our Products
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {productLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setActivePage('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      color: '#b2c8bc',
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'color 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
                  >
                    <ChevronRight size={14} color="#52b788" />
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4
              style={{
                color: '#ffffff',
                fontSize: '1.05rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                marginBottom: '20px'
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <a
                href="tel:+919842270384"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#b2c8bc' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
              >
                <Phone size={16} color="#52b788" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>+91 98422 70384</span>
              </a>

              <a
                href="mailto:shreeyasudarshantradingcompany@gmail.com"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#b2c8bc', wordBreak: 'break-all' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
              >
                <Mail size={16} color="#52b788" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>shreeyasudarshantradingcompany@gmail.com</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#b2c8bc' }}>
                <MapPin size={18} color="#52b788" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ lineHeight: '1.5' }}>
                  # 56C, Anna Nagar 1st Street, Near Indian Overseas Bank, Bhavani, Erode - 638301.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: '#8fa99c'
          }}
        >
          <div>
            © 2025 Shreeyasudarshan Trading Company. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#b2c8bc', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#b2c8bc', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919842270384"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#b2c8bc', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#52b788'}
              onMouseLeave={e => e.currentTarget.style.color = '#b2c8bc'}
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
