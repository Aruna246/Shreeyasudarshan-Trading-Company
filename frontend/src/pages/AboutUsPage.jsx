import React from 'react';
import { ArrowRight, Factory, Truck, ShoppingCart, Globe2, Target, Eye, Leaf, Award, Users, Grid } from 'lucide-react';

export default function AboutUsPage({ setActivePage }) {
  return (
    <div style={{ backgroundColor: '#fcfaf4' }}>
      {/* ABOUT US HERO SECTION */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#f4eee4',
          borderBottom: '1px solid #e7ded0',
          padding: '60px 0'
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '36px'
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
              ABOUT US
            </span>

            <h1
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                lineHeight: 1.15,
                color: '#1b4332',
                marginBottom: '16px',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}
            >
              Shreeyasudarshan<br />Trading Company
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: '#344e41',
                lineHeight: 1.5,
                marginBottom: '18px'
              }}
            >
              Manufacturers Of all Type Of Handloom Floor Mats, Cotton Bags And Textiles Fabrics Exporter
            </p>

            <p
              style={{
                fontSize: '0.96rem',
                color: '#495d52',
                lineHeight: 1.7,
                marginBottom: '28px',
                maxWidth: '520px'
              }}
            >
              Shreeyasudarshan Trading Company is a trusted name in the manufacturing, wholesale and retail supply of eco-friendly bags and handloom products. We are committed to providing high-quality, durable and stylish bags that meet the needs of individuals, businesses and global markets.
            </p>

            <button
              className="btn-primary"
              style={{ padding: '14px 34px' }}
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Our Products</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div>
            <img
              src="/images/hero_bags.jpg"
              alt="Shreeyasudarshan Crafted Bags"
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: '0 12px 32px rgba(27,67,50,0.12)',
                objectFit: 'cover',
                maxHeight: '400px'
              }}
            />
          </div>
        </div>
      </section>

      {/* OUR STORY / OUR JOURNEY */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '48px'
            }}
          >
            {/* Factory Building Image */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  width: '60px',
                  height: '60px',
                  borderTop: '4px solid #1b4332',
                  borderLeft: '4px solid #1b4332',
                  zIndex: 1
                }}
              />
              <img
                src="/images/factory_building.jpg"
                alt="Shreeyasudarshan Trading Company Factory Unit in Bhavani"
                style={{
                  width: '100%',
                  borderRadius: '14px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  display: 'block'
                }}
              />
            </div>

            {/* Journey Description & Badges */}
            <div>
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
                OUR STORY
              </span>

              <h2 style={{ fontSize: '2.4rem', color: '#1b4332', marginBottom: '18px' }}>
                Our Journey
              </h2>

              <p style={{ color: '#4d5d55', fontSize: '1rem', lineHeight: 1.7, marginBottom: '32px' }}>
                Shreeyasudarshan Trading Company was established with the vision of promoting sustainable living through eco-friendly products. Over the years, we have grown into a reliable manufacturer, wholesaler and retailer, offering a wide range of jute fashion bags, cotton carry bags, cotton shopping bags, leather travel bags and fancy jute bags.
              </p>

              {/* 3 Circular Badges Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1b4332',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Leaf size={22} color="#52b788" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', color: '#1b4332', marginBottom: '2px' }}>Quality Products</h4>
                    <p style={{ fontSize: '0.82rem', color: '#68776f', margin: 0 }}>Durable and well-crafted bags</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1b4332',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Grid size={22} color="#52b788" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', color: '#1b4332', marginBottom: '2px' }}>Wide Range</h4>
                    <p style={{ fontSize: '0.82rem', color: '#68776f', margin: 0 }}>Designs for every need and occasion</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1b4332',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Users size={22} color="#52b788" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', color: '#1b4332', marginBottom: '2px' }}>Customer Satisfaction</h4>
                    <p style={{ fontSize: '0.82rem', color: '#68776f', margin: 0 }}>Trusted by individuals and businesses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION & OUR VISION CARDS */}
      <section style={{ padding: '70px 0', backgroundColor: '#f5eee4' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}
          >
            {/* Mission Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '36px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                border: '1px solid #e5ded0',
                display: 'flex',
                gap: '22px'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#1b4332',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Target size={28} color="#52b788" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#1b4332', marginBottom: '12px' }}>
                  Our Mission
                </h3>
                <p style={{ color: '#55665d', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  To provide high-quality, eco-friendly bags and handloom products that combine functionality, style and sustainability, while meeting the diverse needs of our customers across India and global markets.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '36px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                border: '1px solid #e5ded0',
                display: 'flex',
                gap: '22px'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#1b4332',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Eye size={28} color="#52b788" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#1b4332', marginBottom: '12px' }}>
                  Our Vision
                </h3>
                <p style={{ color: '#55665d', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  To be a leading manufacturer and supplier of eco-friendly bags, recognized for our quality, innovation and commitment to a greener and sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES STRIP (Manufacturer, Wholesaler, Retailer, Exporter) */}
      <section style={{ padding: '40px 0', backgroundColor: '#ebe3d3', borderBottom: '1px solid #dfd5c2' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              textAlign: 'center'
            }}
          >
            {[
              { title: 'Manufacturer', sub: 'High-Quality Production', icon: <Factory size={24} color="#1b4332" /> },
              { title: 'Wholesaler', sub: 'Bulk Orders Welcome', icon: <Truck size={24} color="#1b4332" /> },
              { title: 'Retailer', sub: 'For All Your Needs', icon: <ShoppingCart size={24} color="#1b4332" /> },
              { title: 'Exporter', sub: 'Serving Global Markets', icon: <Globe2 size={24} color="#1b4332" /> }
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #d4c9b5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                  }}
                >
                  {r.icon}
                </div>
                <h4 style={{ fontSize: '1.15rem', color: '#1b4332', marginBottom: '2px' }}>{r.title}</h4>
                <span style={{ fontSize: '0.84rem', color: '#66756d' }}>{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / SUSTAINABLE BAGS FOR A BETTER TOMORROW */}
      <section style={{ padding: '70px 0', backgroundColor: '#fcfaf4' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 48px auto' }}>
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
              WHY CHOOSE US
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#1b4332' }}>
              Sustainable Bags for a Better Tomorrow
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              {
                title: 'Eco-Friendly Materials',
                desc: 'Jute, cotton and sustainable fabrics',
                icon: <Leaf size={24} color="#1b4332" />
              },
              {
                title: 'Premium Quality',
                desc: 'Durable, stylish and long-lasting',
                icon: <Award size={24} color="#1b4332" />
              },
              {
                title: 'Wide Product Range',
                desc: 'Fashion, shopping, carry and travel bags',
                icon: <Grid size={24} color="#1b4332" />
              },
              {
                title: 'Manufacturer, Wholesaler & Retailer',
                desc: 'One-stop solution for all your bag needs',
                icon: <Users size={24} color="#1b4332" />
              }
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  border: '1px solid #e7dfd0',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.03)'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    border: '1.5px solid #2d6a4f',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px'
                  }}
                >
                  {p.icon}
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1b4332', marginBottom: '8px' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#6a7970', margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
