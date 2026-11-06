import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  MoveUpRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Factory,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, EverydayBand } from '@/components/storefront';
import { pageHead } from '@/lib/catalog';
import hero from '@/assets/living-hero.jpg';
import tote from '@/assets/green-tote.jpg';
import woven from '@/assets/woven-bag.jpg';
import matIkat from '@/assets/mat-ikat-crossstitch.jpg';
import matShag from '@/assets/mat-shaggy-palette.jpg';
import matDiamond from '@/assets/mat-fringe-diamond-weave.jpg';
import matGrid from '@/assets/mat-grid-geometric-fan.jpg';
import matRibbon from '@/assets/mat-solid-ribbon-fan.jpg';
import facilityImg from '@/assets/company-facility.jpg';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/')({
  head: () =>
    pageHead(
      'Bags, Floor Mats & Beautiful Everyday Living',
      'Discover ShreeyaSudarshan Trading Company — master manufacturers of handloom floor mats, cotton bags, and tailored fabrics.'
    ),
  component: Index,
});

function Index() {
  const heroSlides = [
    {
      id: 'slide-1',
      eyebrow: 'Rooted in nature. Made for life.',
      title: (
        <>
          Thoughtful bags.<br />
          Beautiful spaces.<br />
          <em className="text-[#164E33] italic">Everyday, elevated.</em>
        </>
      ),
      copy: 'Carry a little character. Bring a little warmth home. Discover handloom floor mats and eco-friendly bags crafted with precision in Bhavani, Tamil Nadu.',
      image: hero,
      alt: 'Natural canvas bag and floor mat in a sunlit living space',
      primaryBtn: { text: 'Explore the collection', to: '/shop', search: undefined },
      secondaryBtn: { text: 'The story behind us', to: '/our-story' },
      tag: '01 / 03 · THE EVERYDAY EDIT',
      caption: 'From your doorstep to your next adventure',
    },
    {
      id: 'slide-2',
      eyebrow: 'Master Handlooms · 100% Eco-Friendly',
      title: (
        <>
          Raised lattice knots.<br />
          Pure cotton soles.<br />
          <em className="text-[#EDBC3D] italic">A warm welcome starts here.</em>
        </>
      ),
      copy: 'Plush crimson, turquoise and gold geometric knots designed for long-lasting doorstep comfort, dirt trapping, and effortless washing on pure handlooms.',
      image: matDiamond,
      alt: 'Artisan handloom floor mat with vibrant jewel-tone diamond weave',
      primaryBtn: { text: 'Shop Handloom Mats', to: '/shop', search: { category: 'Floor mats' } },
      secondaryBtn: { text: 'Custom Sizing Enquiry', to: '/contact-us' },
      tag: '02 / 03 · MASTER WEAVES',
      caption: 'Direct mill dispatch from Bhavani weavers',
    },
    {
      id: 'slide-3',
      eyebrow: 'Direct Factory Value · Zero Plastic',
      title: (
        <>
          Golden jute &amp; khadi.<br />
          Pure cotton totes.<br />
          <em className="text-[#164E33] italic">Your everyday, well carried.</em>
        </>
      ),
      copy: 'Durable, sustainable, and tailored cloth bags trusted by premiere jewellery houses, lifestyle retail brands, and eco-conscious shoppers across India.',
      image: woven,
      alt: 'Artisan woven cotton and jute tote bags',
      primaryBtn: { text: 'Shop Bag Collection', to: '/shop', search: { category: 'Bags' } },
      secondaryBtn: { text: 'Bulk Orders & Branding', to: '/contact-us' },
      tag: '03 / 03 · SUSTAINABLE BAGS',
      caption: 'Trusted by leading South Indian brands',
    },
  ];

  const spotlightMats = [
    {
      id: 'heritage-lattice',
      title: 'Heritage Raised Lattice',
      type: 'Heavy Handloom Cord',
      desc: 'Plush crimson, turquoise and gold geometric knots designed for long-lasting doorstep comfort.',
      image: matIkat,
      accent: 'Artisan Favorite',
    },
    {
      id: 'jaipur-diamond',
      title: 'Jaipur Diamond Fringe',
      type: 'Jewel-Tone Micro Weave',
      desc: 'Intricate geometric diamond weaves finished with hand-braided vibrant tassels.',
      image: matDiamond,
      accent: 'Signature Fringes',
    },
    {
      id: 'pastel-shag',
      title: 'Pastel Chenille Shag',
      type: 'Multi-Textured Tuft',
      desc: 'Alternating cloud-soft ridges of blush, gold, terracotta, olive and indigo.',
      image: matShag,
      accent: 'Ultra Soft',
    },
    {
      id: 'modern-grid',
      title: 'Modern Dual-Grid',
      type: 'Structured Weave',
      desc: 'Crisp two-tone textural checkerboard weave built for high-traffic zones and effortless washing.',
      image: matGrid,
      accent: 'Modern Living',
    },
    {
      id: 'ribbed-solid',
      title: 'Ribbed Cotton Soles',
      type: 'Pure Cotton Rib',
      desc: 'Durable solid bands in rich jewel tones: emerald teal, royal violet, and scarlet.',
      image: matRibbon,
      accent: 'Everyday Classic',
    },
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const current = spotlightMats[activeSpotlight];

  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroHovered, heroSlides.length]);

  return (
    <>
      {/* Luxury Opening Identity Animation */}
      <div className="opening" aria-hidden="true">
        <div className="opening-identity">
          <img src={logo.url} alt="" width={260} height={255} />
          <div className="opening-name">ShreeyaSudarshan</div>
          <div className="opening-company">Trading Company · Bhavani</div>
          <span className="opening-rule" />
          <p>Bags &amp; Floor Mats</p>
        </div>
      </div>

      {/* Dynamic Luxury Hero Slider */}
      <section
        className="hero"
        aria-label="Hero Showcase"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentHeroSlide;
          return (
            <div
              key={slide.id}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                className="hero-slide-bg"
                src={slide.image}
                alt={slide.alt}
                width={1920}
                height={1088}
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
              <div className="hero-content page-width">
                <Eyebrow>{slide.eyebrow}</Eyebrow>
                <h1>{slide.title}</h1>
                <p className="hero-copy">{slide.copy}</p>
                <div className="hero-actions">
                  <Link
                    to={slide.primaryBtn.to}
                    search={slide.primaryBtn.search as any}
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#164E33] hover:bg-[#0D2E1F] text-white text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-all active:scale-95 border border-[#EDBC3D]/40"
                  >
                    <span>{slide.primaryBtn.text}</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to={slide.secondaryBtn.to}
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white/70 hover:bg-white border-2 border-[#0E0E0E] text-[#0E0E0E] text-xs font-bold uppercase tracking-[0.14em] transition-all backdrop-blur-xs"
                  >
                    <span>{slide.secondaryBtn.text}</span>
                    <MoveUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Hero Interactive Controls */}
        <div className="hero-controls">
          <div className="page-width hero-controls-inner">
            <div className="flex items-center gap-2.5">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentHeroSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentHeroSlide
                      ? 'w-8 bg-[#164E33] shadow-xs'
                      : 'w-2 bg-[#0E0E0E]/30 hover:bg-[#0E0E0E]/60'
                  }`}
                />
              ))}
              <span className="text-[11px] font-bold text-[#164E33] tracking-widest ml-3">
                {heroSlides[currentHeroSlide].tag}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
                }
                aria-label="Previous slide"
                className="size-9 rounded-full bg-white/80 hover:bg-white text-[#0E0E0E] flex items-center justify-center transition-all shadow-sm border border-[rgba(14,14,14,0.1)] active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length)
                }
                aria-label="Next slide"
                className="size-9 rounded-full bg-white/80 hover:bg-white text-[#0E0E0E] flex items-center justify-center transition-all shadow-sm border border-[rgba(14,14,14,0.1)] active:scale-95 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <EverydayBand />

      {/* Category Dual Portal */}
      <section className="section page-width">
        <div className="section-title">
          <div>
            <Eyebrow>Two worlds. One thoughtful touch.</Eyebrow>
            <h2>For you. For your home.</h2>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block max-w-xs text-right leading-relaxed">
            Find beauty in the things you use most. 100% biodegradable &amp; handloom crafted.
          </span>
        </div>
        <div className="category-grid">
          <Link
            to="/shop"
            search={{ category: 'Bags' }}
            className="category bag-category group"
            aria-label="Explore bags"
          >
            <img src={tote} alt="Forest green and natural canvas bag" loading="lazy" width={1024} height={1024} />
            <div className="category-copy">
              <div>
                <span className="category-badge-pill">Collection 01</span>
                <h3>Bags</h3>
                <p>Pure cotton, golden jute &amp; tailored shoppers.</p>
              </div>
              <span className="category-arrow">
                <MoveUpRight size={22} />
              </span>
            </div>
          </Link>
          <Link
            to="/shop"
            search={{ category: 'Floor mats' }}
            className="category mat-category group"
            aria-label="Explore floor mats"
          >
            <img src={matIkat} alt="Handloom raised floor mat" loading="lazy" width={1024} height={1024} />
            <div className="category-copy">
              <div>
                <span className="category-badge-pill">Collection 02</span>
                <h3>Floor mats</h3>
                <p>Handloom raised lattice &amp; vibrant doorstep soles.</p>
              </div>
              <span className="category-arrow">
                <MoveUpRight size={22} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Textile & Weave Studio Spotlight */}
      <section className="section collection-band border-y border-[rgba(14,14,14,0.08)] bg-white">
        <div className="page-width">
          <div className="section-title items-start">
            <div>
              <Eyebrow>Textile Craft &amp; Weaving</Eyebrow>
              <h2>The Floor Mat Lookbook</h2>
              <p>Explore the tangible texture, hand-dyed yarns, and distinctive weaves of our Bhavani workshop.</p>
            </div>
            <Link
              to="/shop"
              search={{ category: 'Floor mats' }}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#164E33] hover:bg-[#0D2E1F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 border border-[#EDBC3D]/40"
            >
              <span>View in Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
            {/* Interactive Selector Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {spotlightMats.map((mat, idx) => {
                const isActive = activeSpotlight === idx;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setActiveSpotlight(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#164E33] shadow-[0_6px_20px_rgba(22,78,51,0.15)] ring-2 ring-[#164E33]/20 scale-[1.01]'
                        : 'bg-[#FAF7F2]/80 border-[rgba(14,14,14,0.08)] hover:bg-white hover:border-[#164E33]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[rgba(14,14,14,0.1)] flex-shrink-0 bg-paper shadow-xs">
                        <img src={mat.image} alt={mat.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-['Manrope'] text-sm sm:text-base font-bold leading-tight text-foreground">
                          {mat.title}
                        </h4>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          {mat.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full hidden sm:inline-block ${
                          isActive
                            ? 'bg-[#123826] text-white shadow-xs'
                            : 'bg-[#164E33]/10 text-[#164E33]'
                        }`}
                      >
                        {mat.accent}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          isActive ? 'text-[#164E33] translate-x-1' : 'text-muted-foreground/50'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Showcase Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-[rgba(14,14,14,0.08)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white group">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-radial from-background to-paper flex items-center justify-center p-3 sm:p-5 relative">
                  <img
                    src={current.image}
                    alt={current.title}
                    key={current.id}
                    className="w-full h-full object-cover rounded-2xl shadow-sm transition-all duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#123826] text-white shadow-md">
                      {current.accent}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 border-t border-[rgba(14,14,14,0.08)] bg-white/95 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#164E33] uppercase tracking-wider block">
                      {current.type} · Master Handloom
                    </span>
                    <h3 className="font-['Manrope'] text-2xl sm:text-3xl font-bold uppercase mt-1.5 text-foreground">
                      {current.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
                      {current.desc}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    search={{ category: 'Floor mats' }}
                    className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#164E33] hover:bg-[#0D2E1F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 border border-[#EDBC3D]/40"
                  >
                    <span>Shop this style</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Pillars Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[rgba(14,14,14,0.08)]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#164E33]/10 text-[#164E33] flex items-center justify-center shrink-0">
                <Factory size={22} />
              </div>
              <div>
                <h4 className="font-['Manrope'] font-bold text-sm text-foreground uppercase tracking-wide">Direct Mill Manufacturing</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Crafted in-house from high-grade cotton and gada cloth threads with zero third-party markups.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#164E33]/10 text-[#164E33] flex items-center justify-center shrink-0">
                <Layers size={22} />
              </div>
              <div>
                <h4 className="font-['Manrope'] font-bold text-sm text-foreground uppercase tracking-wide">Custom Sizing &amp; Patterns</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  From residential doorways to large retail runners, customized woven solutions are available.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#164E33]/10 text-[#164E33] flex items-center justify-center shrink-0">
                <Award size={22} />
              </div>
              <div>
                <h4 className="font-['Manrope'] font-bold text-sm text-foreground uppercase tracking-wide">Trusted by Leading Brands</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Supplying premiere jewellery and lifestyle houses across India with consistent woven quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand & Purpose Section */}
      <section className="section page-width brand-story">
        <div className="relative group overflow-hidden rounded-2xl border border-[rgba(14,14,14,0.08)] shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <img
            className="story-photo rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
            src={facilityImg}
            alt="ShreeyaSudarshan Trading Company facility"
            loading="lazy"
            width={1024}
            height={768}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-[rgba(14,14,14,0.08)] text-xs flex items-center justify-between shadow-sm">
            <span className="flex items-center gap-2 font-semibold text-[#0E0E0E]">
              <CheckCircle2 size={16} className="text-[#164E33]" /> Eco-Friendly Textile &amp; Bag Manufacturers
            </span>
            <span className="text-[10px] uppercase font-bold text-[#123826] tracking-wider">Bhavani Facility</span>
          </div>
        </div>

        <div className="story-content">
          <Eyebrow>ShreeyaSudarshan Trading Company</Eyebrow>
          <h2 className="editorial-title">
            Rooted in purpose.<br />
            <em>Woven into your life.</em>
          </h2>
          <p>
            Some things just belong. The bag you reach for every morning. The mat that makes a doorway feel like home. We bring these everyday essentials together with a thoughtful eye for texture, form, and feeling.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/our-story"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white border border-[rgba(14,14,14,0.15)] text-[#0E0E0E] hover:bg-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Get to know our story</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#164E33] hover:bg-[#0D2E1F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 border border-[#EDBC3D]/40"
            >
              <span>Explore Full Catalog</span>
              <Sparkles size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="bg-gradient-to-b from-[#123826] to-[#0A2016] text-[#F4F0E8] text-center py-16 px-6 border-t-2 border-[#EDBC3D]">
        <Eyebrow className="justify-center text-[#EDBC3D]">Make room for the everyday</Eyebrow>
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-medium mt-4 mb-3 text-white">
          A little more character. <em className="text-[#EDBC3D] italic">A little more you.</em>
        </h2>
        <p className="text-xs sm:text-sm text-[#F4F0E8]/80 max-w-md mx-auto mb-6 leading-relaxed">
          Direct manufacturer pricing from Bhavani sheds with dependable handloom quality.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#164E33] hover:bg-[#0D2E1F] text-white border border-[#EDBC3D]/50 text-xs font-bold uppercase tracking-[0.14em] shadow-[0_4px_20px_rgba(22,78,51,0.4)] transition-all active:scale-95"
        >
          <span>Discover your favourites</span>
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
