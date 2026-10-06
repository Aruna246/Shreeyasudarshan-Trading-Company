import React, { useState } from 'react';
import Logo from './Logo.jsx';
import { Search, User, ShoppingCart, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar({ activePage, setActivePage }) {
  const { cartCount, setIsCartOpen, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, setIsAdminOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header
      style={{
        backgroundColor: '#fbf9f3',
        borderBottom: '1px solid #e7dfce',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          paddingBottom: '14px'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ cursor: 'pointer' }}
        >
          <Logo />
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hide-on-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  fontSize: '0.96rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#1b4332' : '#334138',
                  padding: '6px 2px',
                  borderBottom: isActive ? '2.5px solid #1b4332' : '2.5px solid transparent',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = '#1b4332';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = '#334138';
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, User, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search products"
            style={{
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1b4332',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0eb'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Search size={21} strokeWidth={2} />
          </button>

          {/* User Account / Orders */}
          <button
            onClick={() => setIsAdminOpen(true)}
            title="Admin & Orders Management"
            style={{
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1b4332',
              transition: 'background-color 0.2s',
              position: 'relative'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0eb'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <User size={21} strokeWidth={2} />
          </button>

          {/* Shopping Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="View Cart"
            style={{
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1b4332',
              position: 'relative',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8f0eb'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ShoppingCart size={22} strokeWidth={2} />
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '1px',
                backgroundColor: '#1b4332',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: '700',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fbf9f3'
              }}
            >
              {cartCount}
            </span>
          </button>

          {/* Admin badge quick access */}
          <button
            onClick={() => setIsAdminOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#e6f3eb',
              color: '#1b4332',
              fontSize: '0.76rem',
              fontWeight: '700',
              padding: '5px 10px',
              borderRadius: '20px',
              border: '1px solid #c2e2d0'
            }}
          >
            <ShieldCheck size={13} />
            <span>Admin</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none' }}
            className="show-on-mobile"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Input Bar (Dropdown) */}
      {isSearchOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e7dfce',
            padding: '12px 0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search size={20} color="#1b4332" />
            <input
              type="text"
              placeholder="Search bags by name, material, e.g. 'Jute', 'Cotton', 'Travel'..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'products') setActivePage('products');
              }}
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                color: '#1b4332'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: '#888', fontSize: '0.85rem' }}
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              style={{ color: '#666', padding: '4px 8px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#fbf9f3',
            borderTop: '1px solid #eee',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                textAlign: 'left',
                padding: '8px 0',
                fontSize: '1.05rem',
                fontWeight: activePage === link.id ? '700' : '500',
                color: activePage === link.id ? '#1b4332' : '#333'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
