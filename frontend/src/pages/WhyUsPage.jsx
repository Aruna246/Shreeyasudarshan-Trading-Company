import React from 'react';
import { Check, Settings, Leaf, Users, Truck, Factory, ShoppingCart, Globe2, FileText, PackageCheck, Send } from 'lucide-react';

export default function WhyUsPage({ setActivePage }) {
  const features = [
    {
      title: 'Premium quality products',
      desc: 'Every bag is checked for stitching, strength and finish before it leaves our unit.',
      icon: <Settings size={24} color="#ffffff" />,
      checklist: [
        'Strong handles and lining',
        'Quality check on every batch',
        'Durable natural fabrics'
      ]
    },
    {
      title: 'Sustainable and eco-friendly',
      desc: 'We use jute, cotton and handloom fabrics that are kind to the environment.',
      icon: <Leaf size={24} color="#ffffff" />,
      checklist: [
        'Plastic-free materials',
        'Reusable and long-lasting',
        'Natural fibres'
      ]
    },
    {
      title: 'Competitive pricing',
      desc: 'As the manufacturer, we cut out middlemen and pass the saving to you.',
      icon: <Users size={24} color="#ffffff" />,
      checklist: [
        'Factory-direct rates',
        'Discounts on bulk orders',
        'Custom logo printing'
      ]
    },
    {
      title: 'Timely delivery',
      desc: 'We plan production around your deadline and keep you updated until delivery.',
      icon: <Truck size={24} color="#ffffff" />,
      checklist: [
        'Delivery across India',
        'Export shipping worldwide',
        'Order updates on call or WhatsApp'
      ]
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Tell us what you need',
      desc: 'Share the bag type, quantity and any logo or colour.'
    },
    {
      step: '2',
      title: 'Get a quote',
      desc: 'We send a price and sample details within one working day.'
    },
    {
      step: '3',
      title: 'We make your order',
      desc: 'Production starts after you approve the sample.'
    },
    {
      step: '4',
      title: 'Receive on time',
      desc: 'We pack and ship to your door or port.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfaf4' }}>
      {/* WHY CHOOSE US HERO WITH BAG ILLUSTRATIONS */}
      <section style={{ backgroundColor: '#f5eee4', padding: '60px 0 50px 0', borderBottom: '1px solid #e7ded0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '40px'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  color: '#2d6a4f',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                WHY CHOOSE US
              </span>

              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  color: '#1b4332',
                  marginBottom: '18px',
                  fontFamily: "'Playfair Display', Georgia, serif"
                }}
              >
                Sustainable bags<br />you can rely on
              </h1>

              <p style={{ color: '#4a5d52', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '500px' }}>
                We make, supply and export bags ourselves, so you get consistent quality, fair prices and delivery on the date we promise.
              </p>
            </div>

            {/* Cute Illustrated Bags matching the screenshot! */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '20px' }}>
              {/* Bag 1: Jute bag with colorful dots */}
              <div
                style={{
                  width: '110px',
                  height: '130px',
                  backgroundColor: '#d8b284',
                  borderRadius: '10px 10px 6px 6px',
                  position: 'relative',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Handle */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-26px',
                    width: '50px',
                    height: '35px',
                    border: '4px solid #99683b',
                    borderRadius: '50% 50% 0 0',
                    borderBottom: 'none'
                  }}
                />
                {/* Polka Dots */}
                <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                  <span style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e76f51' }} />
                  <span style={{ position: 'absolute', top: '15px', right: '12px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#2a9d8f' }} />
                  <span style={{ position: 'absolute', bottom: '15px', left: '15px', width: '13px', height: '13px', borderRadius: '50%', backgroundColor: '#e76f51' }} />
                  <span style={{ position: 'absolute', bottom: '10px', right: '15px', width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#e9c46a' }} />
                </div>
              </div>

              {/* Bag 2: Tote with leaf */}
              <div
                style={{
                  width: '115px',
                  height: '140px',
                  backgroundColor: '#c49a6c',
                  borderRadius: '10px 10px 6px 6px',
                  position: 'relative',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Handle */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-26px',
                    width: '52px',
                    height: '35px',
                    border: '4px solid #754f27',
                    borderRadius: '50% 50% 0 0',
                    borderBottom: 'none'
                  }}
                />
                {/* Leaf Motif */}
                <Leaf size={32} color="#1b4332" />
              </div>

              {/* Bag 3: Canvas with SAVE OUR PLANET */}
              <div
                style={{
                  width: '110px',
                  height: '135px',
                  backgroundColor: '#ece5d8',
                  borderRadius: '10px 10px 6px 6px',
                  position: 'relative',
                  boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '8px'
                }}
              >
                {/* Handle */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-26px',
                    width: '50px',
                    height: '35px',
                    border: '4px solid #b8a994',
                    borderRadius: '50% 50% 0 0',
                    borderBottom: 'none'
                  }}
                />
                <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#1b4332', lineHeight: 1.15 }}>
                  SAVE OUR<br />PLANET
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 FEATURE ROWS (Circle Icon + Middle Text + Right Checklist) */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr 1fr',
                  alignItems: 'center',
                  gap: '30px',
                  padding: '24px 0',
                  borderBottom: idx < features.length - 1 ? '1px solid #eee5d7' : 'none'
                }}
              >
                {/* Left Icon in Forest Green Circle */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#1b4332',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(27,67,50,0.18)'
                  }}
                >
                  {feat.icon}
                </div>

                {/* Middle Title & Description */}
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#1b4332', marginBottom: '6px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ color: '#5b6c62', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>

                {/* Right Checklist */}
                <div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {feat.checklist.map((item, cIdx) => (
                      <li
                        key={cIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.88rem',
                          color: '#34453b',
                          fontWeight: 500
                        }}
                      >
                        <Check size={16} color="#2d6a4f" strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES BANNER (Cream Background) */}
      <section style={{ padding: '40px 0', backgroundColor: '#ebe3d3', borderTop: '1px solid #dfd5c2', borderBottom: '1px solid #dfd5c2' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}
          >
            {[
              { title: 'Manufacturer', sub: 'High-quality production' },
              { title: 'Wholesaler', sub: 'Bulk orders welcome' },
              { title: 'Retailer', sub: 'For all your needs' },
              { title: 'Exporter', sub: 'Serving global markets' }
            ].map((r, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '1.4rem', color: '#1b4332', marginBottom: '4px', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {r.title}
                </h4>
                <span style={{ fontSize: '0.88rem', color: '#66756d' }}>{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW A BULK ORDER WORKS (4 White Rounded Cards) */}
      <section style={{ padding: '70px 0', backgroundColor: '#fcfaf4' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: '#1b4332' }}>
              How a bulk order works
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}
          >
            {steps.map((st) => (
              <div
                key={st.step}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '28px 22px',
                  border: '1px solid #e7ded0',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.03)'
                }}
              >
                <h4 style={{ fontSize: '1.1rem', color: '#1b4332', marginBottom: '10px' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#63736b', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Action Button to Request Bulk Quote */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              className="btn-primary"
              style={{ padding: '14px 36px', fontSize: '1.02rem' }}
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
            >
              <span>Get Your Bulk Quote Now</span>
              <Send size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
