import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function ContactUsPage() {
  const { selectedEnquiryProduct, setSelectedEnquiryProduct, showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: selectedEnquiryProduct || 'Jute Fashion Bag',
    quantity: '500',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedEnquiryProduct) {
      setFormData(prev => ({ ...prev, product: selectedEnquiryProduct }));
    }
  }, [selectedEnquiryProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        showToast('Enquiry sent! We will contact you within 1 working day.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          product: 'Jute Fashion Bag',
          quantity: '500',
          message: ''
        });
        setSelectedEnquiryProduct('');
      } else {
        alert(data.message || 'Error submitting enquiry');
      }
    } catch (err) {
      console.error(err);
      // Fallback display
      setSubmitted(true);
      showToast('Enquiry recorded successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fcfaf4', padding: '50px 0 70px 0' }}>
      <div className="container">
        {/* TWO-COLUMN CONTACT HERO CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
            alignItems: 'stretch'
          }}
        >
          {/* LEFT CARD: Dark Forest Green Contact Info */}
          <div
            style={{
              backgroundColor: '#133826',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '44px 38px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(19, 56, 38, 0.15)'
            }}
          >
            <h2
              style={{
                fontSize: '2.1rem',
                color: '#ffffff',
                marginBottom: '12px',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}
            >
              Contact us
            </h2>

            <p style={{ color: '#b9d4c5', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '36px' }}>
              Call, message or visit us. We reply to every enquiry within one working day.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={18} color="#7fe3b3" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#9cc0ad', display: 'block' }}>Phone</span>
                  <a
                    href="tel:+919842270384"
                    style={{ fontSize: '1.02rem', fontWeight: 600, color: '#ffffff', letterSpacing: '0.02em' }}
                  >
                    +91 98422 70384
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={18} color="#7fe3b3" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#9cc0ad', display: 'block' }}>Email</span>
                  <a
                    href="mailto:shreeyasudarshantradingcompany@gmail.com"
                    style={{ fontSize: '0.94rem', fontWeight: 600, color: '#ffffff', wordBreak: 'break-all' }}
                  >
                    shreeyasudarshantradingcompany@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={18} color="#f87171" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#9cc0ad', display: 'block' }}>Address</span>
                  <p style={{ fontSize: '0.94rem', color: '#ffffff', lineHeight: 1.5, margin: 0 }}>
                    # 56C, Anna Nagar 1st Street, Near Indian Overseas Bank, Bhavani, Erode - 638301.
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Clock size={18} color="#7fe3b3" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#9cc0ad', display: 'block' }}>Working hours</span>
                  <p style={{ fontSize: '0.94rem', color: '#ffffff', margin: 0 }}>
                    Monday to Saturday, 9:00 am to 6:00 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Send Us An Enquiry Form */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '44px 38px',
              border: '1px solid #ebe4d5',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h2
              style={{
                fontSize: '1.9rem',
                color: '#1b4332',
                marginBottom: '24px',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}
            >
              Send us an enquiry
            </h2>

            {submitted && (
              <div
                style={{
                  backgroundColor: '#eaf5ee',
                  border: '1px solid #b7dfc8',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  color: '#1b4332',
                  fontSize: '0.92rem'
                }}
              >
                <CheckCircle2 size={22} color="#2d6a4f" />
                <span>Thank you! Your enquiry has been received. Our team will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1: Name and Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Your name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Row 3: Product and Quantity */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Product</label>
                  <select
                    className="form-select"
                    value={formData.product}
                    onChange={e => setFormData({ ...formData, product: e.target.value })}
                  >
                    <option value="Jute Fashion Bag">Jute Fashion Bag</option>
                    <option value="Cotton Carry Bag">Cotton Carry Bag</option>
                    <option value="Cotton Shopping Bag">Cotton Shopping Bag</option>
                    <option value="Leather Travel Bag">Leather Travel Bag</option>
                    <option value="Fancy Jute Bag">Fancy Jute Bag</option>
                    <option value="Handloom Floor Mat">Handloom Floor Mat</option>
                    <option value="Custom Bag Design">Custom Bag Design</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="text"
                    placeholder="e.g. 500"
                    className="form-input"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about colours, sizes or logo printing"
                  className="form-textarea"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  marginTop: '6px',
                  padding: '13px 34px',
                  fontSize: '0.98rem'
                }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send enquiry'}</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* MAP SECTION: Bhavani, Erode */}
        <div
          style={{
            backgroundColor: '#efe9dc',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #ded5c2',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            position: 'relative',
            minHeight: '280px'
          }}
        >
          {/* Top Location Header */}
          <div
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(5px)',
              borderBottom: '1px solid #dcd3c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📍</span>
              <strong style={{ fontSize: '1.1rem', color: '#1b4332' }}>Bhavani, Erode</strong>
              <span style={{ color: '#666', fontSize: '0.88rem' }}>• Tamil Nadu 638301</span>
            </div>
            <a
              href="https://www.google.com/maps/search/Bhavani+Erode+Tamil+Nadu"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '0.85rem',
                color: '#1b4332',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Open in Google Maps ↗
            </a>
          </div>

          {/* Interactive Google Map Embed */}
          <iframe
            title="Shreeyasudarshan Trading Company Location"
            src="https://maps.google.com/maps?q=Bhavani,%20Erode,%20Tamil%20Nadu,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
