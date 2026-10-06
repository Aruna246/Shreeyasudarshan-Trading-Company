import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingBag, Star, ArrowUpDown, Send } from 'lucide-react';

const BAG_CATEGORIES = ['Jute Fashion Bags', 'Cotton Carry Bags', 'Cotton Shopping Bags', 'Leather Travel Bags', 'Fancy Jute Bags'];
const MAT_CATEGORIES = ['Handloom Floor Mats'];

export default function ProductsPage({ products, setActivePage }) {
  const { addToCart, setActiveModalProduct, searchQuery, setSearchQuery, setSelectedEnquiryProduct } = useCart();
  const [mainTab, setMainTab] = useState('Bags');
  const [sortBy, setSortBy] = useState('featured');

  const isBagsTab = mainTab === 'Bags';
  let filtered = products.filter(p => {
    const inTab = isBagsTab
      ? BAG_CATEGORIES.includes(p.category)
      : MAT_CATEGORIES.includes(p.category);
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return inTab && matchSearch;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const handleBulkQuote = (productName) => {
    setSelectedEnquiryProduct(productName);
    setActivePage('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const tabStyle = (tab) => ({
    padding: '12px 36px',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: mainTab === tab ? '700' : '500',
    backgroundColor: mainTab === tab ? '#1b4332' : '#ffffff',
    color: mainTab === tab ? '#ffffff' : '#334139',
    border: `2px solid ${mainTab === tab ? '#1b4332' : '#dfd7c7'}`,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    boxShadow: mainTab === tab ? '0 4px 14px rgba(27,67,50,0.22)' : 'none',
    letterSpacing: '0.02em'
  });

  return (
    <div style={{ backgroundColor: '#fcfaf4', padding: '40px 0 80px 0' }}>
      <style>{`
        @media (max-width: 600px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .product-card-img { height: 150px !important; }
          .products-hdr h1 { font-size: 1.6rem !important; }
          .tab-row { gap: 10px !important; }
          .tab-btn { padding: 10px 20px !important; font-size: 0.88rem !important; }
          .bulk-banner { flex-direction: column !important; text-align: center !important; }
          .bulk-banner h3 { font-size: 1.2rem !important; }
          .sort-row { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 380px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
          <span
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: '#2d6a4f',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            OUR CATALOG
          </span>
          <h1 className="products-hdr" style={{ fontSize: '2.5rem', color: '#1b4332', marginBottom: '12px' }}>
            Eco-Friendly Bags & Handloom Floor Mats
          </h1>
          <p style={{ color: '#55685d', fontSize: '0.98rem', lineHeight: 1.6 }}>
            Direct manufacturer prices for wholesale, retail, and bulk export. Handcrafted in Bhavani with pure natural sustainable fibers.
          </p>
        </div>

        {/* Main Category Tabs */}
        <div className="tab-row" style={{
          display: 'flex', justifyContent: 'center', gap: '16px',
          marginBottom: '32px', flexWrap: 'wrap'
        }}>
          <button className="tab-btn" style={tabStyle('Bags')} onClick={() => setMainTab('Bags')}>
            🛍️ Bags
          </button>
          <button className="tab-btn" style={tabStyle('Floor Mats')} onClick={() => setMainTab('Floor Mats')}>
            🪵 Floor Mats
          </button>
        </div>

        {/* Sort + Status Row */}
        <div className="sort-row" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px', marginBottom: '28px',
          paddingBottom: '18px', borderBottom: '1px solid #e7dfce'
        }}>
          <span style={{ fontSize: '0.9rem', color: '#55695f', fontWeight: 500 }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} in <strong>{mainTab}</strong>
            {searchQuery && (
              <> · Searching "<strong>{searchQuery}</strong>"
              <button onClick={() => setSearchQuery('')}
                style={{ textDecoration: 'underline', color: '#2d6a4f', fontWeight: 600, marginLeft: '4px', cursor: 'pointer' }}
              >clear</button></>
            )}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={15} color="#1b4332" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '8px 14px', borderRadius: '12px', border: '1px solid #dfd7c7',
                backgroundColor: '#ffffff', fontSize: '0.88rem', color: '#1b4332',
                fontWeight: 500, outline: 'none'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#777' }}>
            <h3>No products found</h3>
            <p>Try resetting filters or searching for something else.</p>
            <button
              className="btn-primary"
              style={{ marginTop: '16px' }}
              onClick={() => {
                setMainTab('Bags');
                setSearchQuery('');
              }}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div
            className="products-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '26px'
            }}
          >
            {filtered.map(p => (
              <div
                key={p.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e7e0d3',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 3px 14px rgba(0,0,0,0.03)',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(27,67,50,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 3px 14px rgba(0,0,0,0.03)';
                }}
              >
                {/* Badge if available */}
                {p.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: '#1b4332',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      zIndex: 2,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {p.badge}
                  </span>
                )}

                {/* Product Image Area */}
                <div
                  className="product-card-img"
                  onClick={() => setActiveModalProduct(p)}
                  style={{
                    backgroundColor: '#ffffff',
                    height: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderBottom: '1px solid #f0ebe0'
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '16px',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Content Area */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.76rem', color: '#6a7d73', textTransform: 'uppercase', fontWeight: 600 }}>
                      {p.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontSize: '0.8rem' }}>
                      <Star size={13} fill="currentColor" />
                      <span>{p.rating}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setActiveModalProduct(p)}
                    style={{
                      fontSize: '1.1rem',
                      color: '#1b4332',
                      marginBottom: '8px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      cursor: 'pointer',
                      lineHeight: 1.3
                    }}
                  >
                    {p.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: '#66756d',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {p.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1b4332' }}>
                      ₹ {p.price.toFixed(2)}
                    </span>
                    {p.originalPrice && (
                      <span style={{ fontSize: '0.88rem', color: '#9aa59f', textDecoration: 'line-through' }}>
                        ₹ {p.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                    <button
                      className="btn-primary"
                      style={{ padding: '10px 14px', fontSize: '0.88rem' }}
                      onClick={() => addToCart(p, 1)}
                    >
                      <ShoppingBag size={15} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => handleBulkQuote(p.name)}
                      title="Enquire for bulk order"
                      style={{
                        padding: '10px 14px',
                        border: '1.5px solid #1b4332',
                        borderRadius: '20px',
                        color: '#1b4332',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <Send size={13} />
                      <span>Bulk</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bulk Order Banner at the bottom */}
        <div
          className="bulk-banner"
          style={{
            marginTop: '60px',
            backgroundColor: '#1b4332',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '8px' }}>
              Need Custom Branding or Bulk Export?
            </h3>
            <p style={{ color: '#bfe0cf', fontSize: '0.96rem', margin: 0, maxWidth: '600px' }}>
              We specialize in custom screen printing, personalized dimensions, and bulk manufacturing with delivery across India and global export.
            </p>
          </div>

          <button
            className="btn-primary"
            style={{
              backgroundColor: '#ffffff',
              color: '#1b4332',
              borderColor: '#ffffff',
              padding: '14px 30px'
            }}
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 200, behavior: 'smooth' });
            }}
          >
            <span>Request Bulk Quotation</span>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
