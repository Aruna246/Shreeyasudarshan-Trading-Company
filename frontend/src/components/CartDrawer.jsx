import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ setActivePage }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const shippingCost = cartTotal > 499 || cartTotal === 0 ? 0 : 50;
  const tax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + shippingCost + tax;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.25s'
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 25px rgba(0,0,0,0.15)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fbf9f5'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#1b4332" />
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#1b4332' }}>
              Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: '#666',
              transition: 'background-color 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ padding: '12px 24px', backgroundColor: '#eaf4ee', fontSize: '0.84rem', color: '#1b4332' }}>
          {cartTotal >= 499 ? (
            <span>🎉 You qualify for <strong>FREE Shipping</strong> across India!</span>
          ) : (
            <span>
              Add ₹{499 - cartTotal} more to get <strong>FREE Shipping</strong>!
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                color: '#666'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f2f0ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#9aa8a0'
                }}
              >
                <ShoppingBag size={38} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: '#1b4332', marginBottom: '8px' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#777', maxWidth: '260px', marginBottom: '24px' }}>
                Explore our eco-friendly jute, cotton bags and traditional floor mats.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('products');
                }}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '12px',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      backgroundColor: '#f9f8f4'
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '0.96rem', margin: 0, color: '#1b4332', lineHeight: '1.2' }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#777' }}>{item.category}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#d9534f', padding: '4px' }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontWeight: '700', color: '#1b4332', fontSize: '1rem' }}>
                        ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #dfd8c8',
                          borderRadius: '20px',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fbf9f4'
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ padding: '0 10px', fontSize: '0.88rem', fontWeight: '600' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fbf9f4'
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #eee',
              backgroundColor: '#fbf9f5'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#555' }}>
              <span>Subtotal</span>
              <span>₹ {cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#555' }}>
              <span>Estimated Tax (5% GST)</span>
              <span>₹ {tax.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '14px', color: '#555' }}>
              <span>Shipping</span>
              <span>{shippingCost === 0 ? <strong style={{ color: '#2d6a4f' }}>FREE</strong> : `₹ ${shippingCost}`}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#1b4332',
                marginBottom: '18px',
                paddingTop: '10px',
                borderTop: '1px dashed #dcd5c5'
              }}
            >
              <span>Total Amount</span>
              <span>₹ {grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
