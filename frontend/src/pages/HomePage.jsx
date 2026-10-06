import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingCart, Leaf, ShieldCheck, Handshake, Globe2, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const SLIDES = [
  {
    id: 'bags',
    label: 'Bags',
    tag: 'ECO BAGS COLLECTION',
    title: 'Handcrafted\nEco-Friendly Bags',
    subtitle: 'Jute, Cotton & Leather Bags — Direct from Bhavani Manufacturers. Wholesale & Export.',
    image: '/images/hero_bags.jpg',
    alt: 'Eco Bags Collection',
    btnText: 'Shop Bags',
    accent: '#1b4332',
    bg: '#f3efe6'
  },
  {
    id: 'mats',
    label: 'Floor Mats',
    tag: 'HANDLOOM FLOOR MATS',
    title: 'Traditional\nHandloom Floor Mats',
    subtitle: 'Authentic Bhavani Handloom Mats — Vibrant Colors, Premium Quality. Wholesale & Export.',
    image: '/images/floor_mat_product_1.jpg',
    alt: 'Handloom Floor Mats Collection',
    btnText: 'Shop Floor Mats',
    accent: '#1b4332',
    bg: '#eef4ef'
  }
];

export default function HomePage({ setActivePage, products }) {
  const { addToCart, setActiveModalProduct } = useCart();
  const [slideIdx, setSlideIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Auto-slide every 4s
  useEffect(() => {
    const timer = setInterval(() => goTo((slideIdx + 1) % SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, [slideIdx]);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setSlideIdx(idx);
      setAnimating(false);
    }, 280);
  };

  const slide = SLIDES[slideIdx];

  const categories = [
    { name: 'Jute Fashion Bags', image: '/images/jute_fashion_bag.jpg' },
    { name: 'Cotton Bags', image: '/images/cotton_carry_bag.jpg' },
    { name: 'Fancy Jute Bags', image: '/images/fancy_jute_bag.jpg' },
    { name: 'Leather Bags', image: '/images/leather_travel_bag.jpg' },
    { name: 'Stripe Floor Mat', image: '/images/floor_mat_product_1.jpg' },
    { name: 'Checkered Floor Mat', image: '/images/floor_mat_product_2.jpg' },
  ];

  // 3 bags + 2 floor mats for featured
  const bags = products.filter(p => ['Jute Fashion Bags','Cotton Carry Bags','Cotton Shopping Bags','Leather Travel Bags','Fancy Jute Bags'].includes(p.category));
  const mats = products.filter(p => p.category === 'Handloom Floor Mats');
  const featured = [...bags.slice(0, 3), ...mats.slice(0, 2)];

  return (
    <div style={{ backgroundColor: '#fcfaf4' }}>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideOut { from { opacity: 1; } to { opacity: 0; } }
        .hero-slide-in { animation: slideIn 0.35s ease forwards; }
        .hero-slide-out { animation: slideOut 0.28s ease forwards; }
        @media (max-width: 680px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-img-wrap { max-height: 240px !important; }
          .hero-title { font-size: 1.8rem !important; }
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 14px !important; }
          .cat-circle { width: 90px !important; height: 90px !important; }
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .featured-card-img { height: 140px !important; }
          .feat-header { flex-direction: column !important; }
          .pillar-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 420px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO BANNER SLIDER */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        backgroundColor: slide.bg, borderBottom: '1px solid #e7e0d2',
        transition: 'background-color 0.4s ease'
      }}>
        <div
          className={`hero-grid ${animating ? 'hero-slide-out' : 'hero-slide-in'}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            minHeight: '480px',
            padding: '40px 5vw',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {/* Left: Text */}
          <div style={{ zIndex: 2 }}>
            <span style={{
              fontSize: '0.8rem', letterSpacing: '0.14em', fontWeight: 700,
              color: '#2d6a4f', textTransform: 'uppercase', display: 'block', marginBottom: '10px'
            }}>
              {slide.tag}
            </span>

            <h1 className="hero-title" style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.18, color: '#1b4332', marginBottom: '16px',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800, whiteSpace: 'pre-line'
            }}>
              {slide.title}
            </h1>

            <p style={{
              fontSize: '1rem', color: '#344e41', lineHeight: 1.6,
              marginBottom: '28px', maxWidth: '460px'
            }}>
              {slide.subtitle}
            </p>

            <button
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>{slide.btnText}</span>
              <ArrowRight size={17} />
            </button>

            {/* Slide Dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '32px', alignItems: 'center' }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === slideIdx ? '24px' : '9px',
                    height: '9px',
                    borderRadius: '5px',
                    backgroundColor: i === slideIdx ? '#1b4332' : '#c8bfb0',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="hero-img-wrap" style={{
            position: 'relative', borderRadius: '18px',
            overflow: 'hidden', boxShadow: '0 12px 36px rgba(27,67,50,0.13)',
            maxHeight: '420px'
          }}>
            <img
              src={slide.image}
              alt={slide.alt}
              style={{ width: '100%', height: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
            />
            {/* Prev/Next arrows */}
            <button
              onClick={() => goTo((slideIdx - 1 + SLIDES.length) % SLIDES.length)}
              style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ChevronLeft size={18} color="#1b4332" />
            </button>
            <button
              onClick={() => goTo((slideIdx + 1) % SLIDES.length)}
              style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ChevronRight size={18} color="#1b4332" />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section style={{ padding: '56px 0', backgroundColor: '#ffffff', borderBottom: '1px solid #f0eae0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{
              fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 700,
              color: '#2d6a4f', textTransform: 'uppercase', display: 'block', marginBottom: '6px'
            }}>EXPLORE CATEGORIES</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#1b4332' }}>Bags & Floor Mats</h2>
          </div>
          <div
            className="cat-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '24px',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => { setActivePage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div
                  className="cat-circle"
                  style={{
                    width: '120px', height: '120px', borderRadius: '50%',
                    overflow: 'hidden', backgroundColor: '#ffffff',
                    border: '2px solid #e2dbce', marginBottom: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                  }}
                >
                  <img src={cat.image} alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
                <span style={{
                  fontSize: '0.88rem', fontWeight: 600, color: '#1b4332',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '6px'
                }}>{cat.name}</span>
                <div style={{ width: '32px', height: '2px', backgroundColor: '#c9beac' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS — BAGS + FLOOR MATS */}
      <section style={{ padding: '70px 0', backgroundColor: '#fcfaf4' }}>
        <div className="container">
          <div className="feat-header" style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '40px'
          }}>
            <div style={{ maxWidth: '560px' }}>
              <span style={{
                fontSize: '0.82rem', letterSpacing: '0.12em', fontWeight: 700,
                color: '#2d6a4f', textTransform: 'uppercase', display: 'block', marginBottom: '8px'
              }}>OUR PRODUCTS</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: '#1b4332', marginBottom: '10px' }}>
                Bags & Floor Mats<br />for a Better Tomorrow
              </h2>
              <p style={{ color: '#55695f', fontSize: '0.96rem', lineHeight: '1.6' }}>
                Premium eco-friendly bags and authentic Bhavani handloom floor mats — sustainable, stylish, and crafted for excellence.
              </p>
              <div style={{ marginTop: '20px' }}>
                <button className="btn-primary"
                  onClick={() => { setActivePage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <span>View All Products</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Featured Product Cards */}
            <div
              className="featured-grid"
              style={{
                flex: 1, display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '18px', minWidth: '280px'
              }}
            >
              {featured.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    backgroundColor: '#ffffff', borderRadius: '16px',
                    border: '1px solid #e7e0d3', padding: '14px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', textAlign: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,67,50,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
                  }}
                >
                  <div
                    className="featured-card-img"
                    onClick={() => setActiveModalProduct(prod)}
                    style={{
                      width: '100%', height: '180px',
                      backgroundColor: '#ffffff',
                      borderRadius: '10px', marginBottom: '12px',
                      overflow: 'hidden', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid #f0ebe0'
                    }}
                  >
                    <img src={prod.image} alt={prod.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
                    />
                  </div>
                  <h3
                    onClick={() => setActiveModalProduct(prod)}
                    style={{
                      fontSize: '0.95rem', fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700, color: '#1b4332', marginBottom: '4px', cursor: 'pointer'
                    }}
                  >
                    {prod.name}
                  </h3>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#1b4332', marginBottom: '12px' }}>
                    ₹{prod.price.toLocaleString('en-IN')}.00
                  </div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '9px', fontSize: '0.84rem' }}
                    onClick={() => addToCart(prod, 1)}
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-PILLAR SUSTAINABLE BANNER */}
      <section style={{
        backgroundColor: '#f5efe4', padding: '60px 0',
        borderTop: '1px solid #e7ded0', borderBottom: '1px solid #e7ded0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1b4332', marginBottom: '28px' }}>
            <Leaf size={22} />
            <h3 style={{ fontSize: '1.5rem', margin: 0, color: '#1b4332' }}>Sustainable Choices for a Greener Planet</h3>
          </div>
          <div className="pillar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            {[
              { title: 'Eco-Friendly Materials', icon: <Leaf size={24} color="#1b4332" />, desc: 'Biodegradable jute, organic cotton, natural dyes' },
              { title: 'High Quality Products', icon: <ShieldCheck size={24} color="#1b4332" />, desc: 'Double-stitched seams and quality checked batches' },
              { title: 'Wholesale & Retail', icon: <Handshake size={24} color="#1b4332" />, desc: 'Flexible quantities for local & national retail' },
              { title: 'Worldwide Export', icon: <Globe2 size={24} color="#1b4332" />, desc: 'Reliable container and express shipments worldwide' }
            ].map((card, i) => (
              <div key={i} style={{
                backgroundColor: '#ffffff', padding: '22px 18px',
                borderRadius: '14px', textAlign: 'center',
                border: '1px solid #e5dece', boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  backgroundColor: '#eaf4ee', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center', marginBottom: '10px'
                }}>{card.icon}</div>
                <h4 style={{ fontSize: '0.98rem', color: '#1b4332', marginBottom: '4px' }}>{card.title}</h4>
                <p style={{ fontSize: '0.82rem', color: '#68776f', lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '50px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <span style={{
            fontSize: '0.82rem', letterSpacing: '0.12em', fontWeight: 700,
            color: '#2d6a4f', textTransform: 'uppercase',
            display: 'block', textAlign: 'center', marginBottom: '30px'
          }}>WHY CHOOSE US</span>
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' }}>
            {[
              { title: 'Premium Quality Products', desc: 'We ensure the best quality in every product we make.' },
              { title: 'Sustainable & Eco-Friendly', desc: 'Our products are kind to the environment.' },
              { title: 'Competitive Pricing', desc: 'Best quality at the right price directly from the loom.' },
              { title: 'Timely Delivery', desc: 'We value your time and ensure on-time delivery.' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  backgroundColor: '#1b4332', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <CheckCircle size={20} color="#52b788" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', color: '#1b4332', marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.84rem', color: '#63736a', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
