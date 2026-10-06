import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, HelpCircle } from 'lucide-react';

export default function ProductDetailModal({ setActivePage }) {
  const { activeModalProduct, setActiveModalProduct, addToCart, setSelectedEnquiryProduct } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!activeModalProduct) return null;

  const p = activeModalProduct;

  const handleBulkEnquiry = () => {
    setSelectedEnquiryProduct(p.name);
    setActiveModalProduct(null);
    setActivePage('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={() => setActiveModalProduct(null)}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setActiveModalProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px',
            borderRadius: '50%',
            backgroundColor: '#f5f3ec',
            color: '#333',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Product Image Column */}
          <div
            style={{
              backgroundColor: '#f7f4ec',
              padding: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: '100%',
                maxHeight: '380px',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />
          </div>

          {/* Details Column */}
          <div style={{ padding: '32px' }}>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '700',
                color: '#2d6a4f',
                backgroundColor: '#e6f3eb',
                padding: '4px 10px',
                borderRadius: '20px'
              }}
            >
              {p.category}
            </span>

            <h2
              style={{
                fontSize: '1.8rem',
                color: '#1b4332',
                marginTop: '12px',
                marginBottom: '8px',
                lineHeight: 1.2
              }}
            >
              {p.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#333' }}>
                {p.rating}
              </span>
              <span style={{ fontSize: '0.82rem', color: '#777' }}>
                ({p.reviewsCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '18px' }}>
              <span style={{ fontSize: '1.9rem', fontWeight: '800', color: '#1b4332' }}>
                ₹ {p.price.toFixed(2)}
              </span>
              {p.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: '#999', textDecoration: 'line-through' }}>
                  ₹ {p.originalPrice.toFixed(2)}
                </span>
              )}
              <span style={{ fontSize: '0.82rem', color: '#2d6a4f', fontWeight: '600' }}>
                Inclusive of all taxes
              </span>
            </div>

            <p style={{ color: '#555', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '20px' }}>
              {p.description}
            </p>

            {/* Specifications list */}
            <div style={{ backgroundColor: '#fbf9f4', padding: '14px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.88rem' }}>
              {p.material && (
                <div style={{ marginBottom: '6px' }}>
                  <strong>Material:</strong> {p.material}
                </div>
              )}
              {p.dimensions && (
                <div style={{ marginBottom: '6px' }}>
                  <strong>Dimensions:</strong> {p.dimensions}
                </div>
              )}
              <div>
                <strong>Bulk Orders:</strong> Minimum {p.minBulkOrder || 50} units for custom logo branding
              </div>
            </div>

            {/* Key highlights */}
            {p.features && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#1b4332', marginBottom: '8px' }}>Highlights:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: '#444' }}>
                  {p.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={15} color="#2d6a4f" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1.5px solid #dfd8c8',
                  borderRadius: '30px',
                  padding: '4px'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '6px 12px', fontWeight: 'bold', fontSize: '1rem', color: '#1b4332' }}
                >
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '6px 12px', fontWeight: 'bold', fontSize: '1rem', color: '#1b4332' }}
                >
                  +
                </button>
              </div>

              <button
                className="btn-primary"
                onClick={() => {
                  addToCart(p, quantity);
                  setActiveModalProduct(null);
                }}
                style={{ flex: 1 }}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>

              <button
                className="btn-secondary"
                onClick={handleBulkEnquiry}
                title="Send enquiry with custom printing/size options"
              >
                Bulk Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
