import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  MoveUpRight,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Eyebrow, EverydayBand, ProductCard, useStore } from '@/components/storefront';
import { pageHead } from '@/lib/catalog';
import hero from '@/assets/living-hero.jpg';
import tote from '@/assets/green-tote.jpg';
import woven from '@/assets/woven-bag.jpg';
import bagCottonTote from '@/assets/bag-cotton-tote.jpg';
import bagGoldenJute from '@/assets/bag-golden-jute.jpg';
import bagBlockprintFloral from '@/assets/bag-blockprint-floral.jpg';
import bagSageNonwoven from '@/assets/bag-sage-nonwoven.jpg';
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
      'Proudly Indian Handcrafted Bags & Handloom Floor Mats',
      'Discover ShreeyaSudarshan Trading Company — Bhavani manufacturers of eco-friendly cotton totes, golden jute bags, non-woven carry bags, and handloom floor mats.'
    ),
  component: Index,
});

function Index() {
  const { products } = useStore();

  // Zouk-style horizontal category story bubbles
  const storyCategories = [
    { label: 'All Essentials', image: tote, to: '/shop', search: {} },
    { label: 'Cotton Totes', image: bagCottonTote, to: '/shop', search: { category: 'Bags', q: 'cotton' } },
    { label: 'Jute Bags', image: bagGoldenJute, to: '/shop', search: { category: 'Bags', q: 'jute' } },
    { label: 'Block Print', image: bagBlockprintFloral, to: '/shop', search: { category: 'Bags', q: 'floral' } },
    { label: 'Eco Carry', image: bagSageNonwoven, to: '/shop', search: { category: 'Bags', q: 'non-woven' } },
    { label: 'Floor Mats', image: matDiamond, to: '/shop', search: { category: 'Floor mats' } },
    { label: 'Lattice Weave', image: matIkat, to: '/shop', search: { category: 'Floor mats', q: 'lattice' } },
    { label: 'Chenille Rugs', image: matShag, to: '/shop', search: { category: 'Floor mats', q: 'shag' } },
    { label: 'Bulk Orders', image: woven, to: '/contact-us', search: undefined },
  ];

  // Zouk-style full-bleed hero slides
  const heroSlides = [
    {
      id: 'slide-1',
      eyebrow: 'Proudly Indian · Direct From Bhavani',
      title: (
        <>
          Handcrafted bags.<br />
          Handloom spaces.<br />
          <em>Made for everyday India.</em>
        </>
      ),
      copy: 'Explore 100% eco-friendly cotton totes, golden jute shoppers, and vibrant handloom floor mats woven directly at our Bhavani, Tamil Nadu facility.',
      image: hero,
      alt: 'Natural canvas tote bag and handloom floor mat in a sunlit space',
      primaryBtn: { text: 'Shop All Essentials', to: '/shop', search: undefined },
      secondaryBtn: { text: 'Shop Bags', to: '/shop', search: { category: 'Bags' } },
    },
    {
      id: 'slide-2',
      eyebrow: 'Signature Bag Edit · Zero Plastic',
      title: (
        <>
          Golden jute &amp; khadi.<br />
          Pure cotton totes.<br />
          <em>Carry your craft with pride.</em>
        </>
      ),
      copy: 'Breathable handloom totes, botanical block-print bags, and reusable carry bags trusted by shoppers and India’s premiere jewellery houses.',
      image: woven,
      alt: 'Handcrafted cotton and golden jute tote bags',
      primaryBtn: { text: 'Explore Bag Collection', to: '/shop', search: { category: 'Bags' } },
      secondaryBtn: { text: 'Bulk & Branding', to: '/contact-us', search: undefined },
    },
    {
      id: 'slide-3',
      eyebrow: 'Bhavani Master Handlooms',
      title: (
        <>
          Raised lattice knots.<br />
          Pure cotton soles.<br />
          <em>Warmth for every doorway.</em>
        </>
      ),
      copy: 'Heavy handloom cotton cords in jewel tones and geometric patterns — effortlessly washable, ultra-durable, and dispatched directly from the mill.',
      image: matDiamond,
      alt: 'Artisan handloom floor mat with jewel-tone diamond weave',
      primaryBtn: { text: 'Shop Floor Mats', to: '/shop', search: { category: 'Floor mats' } },
      secondaryBtn: { text: 'Custom Sizing', to: '/contact-us', search: undefined },
    },
  ];

  // 4-card Zouk-style "Shop by Category" grid
  const shopCategories = [
    {
      title: 'Cotton & Canvas Totes',
      subtitle: 'Breathable daily handloom bags',
      tag: 'Bestselling',
      image: bagCottonTote,
      search: { category: 'Bags', q: 'cotton' },
    },
    {
      title: 'Golden Jute Bags',
      subtitle: '100% biodegradable natural burlap',
      tag: 'Eco Choice',
      image: bagGoldenJute,
      search: { category: 'Bags', q: 'jute' },
    },
    {
      title: 'Handloom Floor Mats',
      subtitle: 'Washable pure cotton & lattice rugs',
      tag: 'Bhavani Craft',
      image: matIkat,
      search: { category: 'Floor mats' },
    },
    {
      title: 'Non-Woven & Retail Bags',
      subtitle: 'Lightweight utility & bulk branding',
      tag: 'Factory Direct',
      image: bagSageNonwoven,
      search: { category: 'Bags', q: 'non-woven' },
    },
  ];

  // Zouk-style "Shop by Print & Weave" interactive lookbook
  const spotlightWeaves = [
    {
      id: 'heritage-lattice',
      title: 'Heritage Raised Lattice',
      type: 'Heavy Handloom Cord',
      desc: 'Plush crimson, turquoise and gold geometric knots designed for long-lasting doorstep comfort and effortless machine washing.',
      image: matIkat,
      accent: 'Artisan Favorite',
      search: { category: 'Floor mats' as const, q: 'lattice' },
    },
    {
      id: 'handblock-floral',
      title: 'Botanical Handblock Print',
      type: 'Vegetable-Dyed Handloom Cotton',
      desc: 'Hand-pressed traditional wooden block motifs on raw unbleached cotton canvas — each tote is a wearable piece of Indian craft.',
      image: bagBlockprintFloral,
      accent: 'Signature Print',
      search: { category: 'Bags' as const, q: 'floral' },
    },
    {
      id: 'jaipur-diamond',
      title: 'Jaipur Diamond Fringe',
      type: 'Jewel-Tone Micro Weave',
      desc: 'Intricate geometric diamond weaves finished with vibrant hand-braided tassels for living rooms and entryways.',
      image: matDiamond,
      accent: 'Signature Fringes',
      search: { category: 'Floor mats' as const, q: 'diamond' },
    },
    {
      id: 'pastel-shag',
      title: 'Pastel Chenille Shag',
      type: 'Multi-Textured Soft Tuft',
      desc: 'Cloud-soft alternating ridges of blush, ochre, olive and indigo crafted for plush barefoot comfort.',
      image: matShag,
      accent: 'Ultra Soft',
      search: { category: 'Floor mats' as const, q: 'shag' },
    },
    {
      id: 'modern-grid',
      title: 'Modern Dual-Grid & Ribbed',
      type: 'Structured Everyday Weave',
      desc: 'Crisp textural checkerboard and solid ribbed cotton weaves built for high-traffic corridors and daily use.',
      image: matGrid,
      accent: 'Everyday Classic',
      search: { category: 'Floor mats' as const },
    },
  ];

  // Zouk-style customer testimonials
  const reviews = [
    {
      name: 'Priya Ramasamy',
      city: 'Coimbatore, TN',
      product: 'The Classic Handloom Cotton Tote',
      quote: 'The stitching and thickness of the cotton canvas are way better than mall brands. I use it daily for office and grocery runs and it still looks brand new after washing.',
    },
    {
      name: 'Karthik Subramanian',
      city: 'Chennai, TN',
      product: 'The Heritage Lattice Weave Mat',
      quote: 'Authentic Bhavani handloom quality! The raised cotton lattice feels super soft underfoot, grips the floor nicely, and doesn’t fade at all. Ordered 4 more for our parents’ home.',
    },
    {
      name: 'Meenakshi Sundaram',
      city: 'Madurai, TN',
      product: 'Bulk Jute & Jewellery Bags',
      quote: 'We ordered 500 custom jute and cotton bags for our showroom festive gifting. Timely dispatch from Bhavani, neat finishing, and very honest direct factory pricing.',
    },
  ];

  const trustedPartners = [
    'AVR Swarnamahal Jewelry Ltd',
    'Jewel One (Emerald Jewel Industry)',
    'Kirtilal Kalidas Jewellers',
    'Thangamayil Jewellery Pvt Ltd',
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [bestsellerTab, setBestsellerTab] = useState<'All' | 'Bags' | 'Floor mats'>('All');
  const [activeWeave, setActiveWeave] = useState(0);

  const currentWeave = spotlightWeaves[activeWeave];

  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroHovered, heroSlides.length]);

  // Curate balanced 8 bestsellers across tabs
  const bestsellerProducts = (() => {
    if (bestsellerTab === 'Bags') {
      return products.filter(p => p.category === 'Bags').slice(0, 8);
    }
    if (bestsellerTab === 'Floor mats') {
      return products.filter(p => p.category === 'Floor mats').slice(0, 8);
    }
    const bags = products.filter(p => p.category === 'Bags').slice(0, 4);
    const mats = products.filter(p => p.category === 'Floor mats').slice(0, 4);
    const mixed = [];
    for (let i = 0; i < 4; i++) {
      if (bags[i]) mixed.push(bags[i]);
      if (mats[i]) mixed.push(mats[i]);
    }
    return mixed;
  })();

  return (
    <>
      {/* Subtle Fast Brand Splash */}
      <div className="opening" aria-hidden="true">
        <div className="opening-identity">
          <img src={logo.url} alt="" width={112} height={112} />
          <div className="opening-name">ShreeyaSudarshan</div>
          <div className="opening-company">Proudly Indian · Bhavani</div>
          <span className="opening-rule" />
          <p>Handcrafted Bags &amp; Floor Mats</p>
        </div>
      </div>

      {/* 1. ZOUK-STYLE CATEGORY QUICK-LINK STORY STRIP */}
      <section aria-label="Quick category navigation" className="bg-white border-b border-[#ECE9E2]">
        <div className="page-width py-3.5 sm:py-4">
          <div className="flex items-center justify-start lg:justify-between gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-0.5">
            {storyCategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to as any}
                search={cat.search as any}
                className="group flex flex-col items-center gap-1.5 shrink-0 w-[68px] sm:w-[78px] text-center"
              >
                <div className="size-[60px] sm:size-[68px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#164E33] via-[#2b7a53] to-[#D9A438] group-hover:scale-105 transition-transform duration-300 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full rounded-full object-cover"
                      width={72}
                      height={72}
                    />
                  </div>
                </div>
                <span className="text-[11px] sm:text-[11.5px] font-semibold text-[#2A2A2A] group-hover:text-[#164E33] transition-colors leading-tight line-clamp-1">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FULL-BLEED ZOUK-STYLE HERO BANNER CAROUSEL */}
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
                <Eyebrow className="!text-[#F4D178]">{slide.eyebrow}</Eyebrow>
                <h1>{slide.title}</h1>
                <p className="hero-copy">{slide.copy}</p>
                <div className="hero-actions">
                  <Link
                    to={slide.primaryBtn.to as any}
                    search={slide.primaryBtn.search as any}
                    className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-8 rounded-lg bg-[#164E33] hover:bg-[#0D3321] text-white text-xs sm:text-[13px] font-bold uppercase tracking-[0.1em] shadow-lg transition-all active:scale-95 border border-[#D9A438]/40"
                  >
                    <span>{slide.primaryBtn.text}</span>
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to={slide.secondaryBtn.to as any}
                    search={slide.secondaryBtn.search as any}
                    className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-7 rounded-lg bg-white/95 hover:bg-white text-[#121212] text-xs sm:text-[13px] font-bold uppercase tracking-[0.1em] transition-all shadow-md active:scale-95"
                  >
                    <span>{slide.secondaryBtn.text}</span>
                    <MoveUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Left/Right Edge Carousel Arrows (Desktop) */}
        <button
          type="button"
          onClick={() => setCurrentHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/85 hover:bg-white text-[#121212] items-center justify-center shadow-md transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length)}
          aria-label="Next slide"
          className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/85 hover:bg-white text-[#121212] items-center justify-center shadow-md transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight size={18} />
        </button>

        {/* Bottom Centered Pagination Dots */}
        <div className="hero-controls">
          <div className="page-width hero-controls-inner">
            <div className="flex items-center gap-2 bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentHeroSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentHeroSlide
                      ? 'w-7 bg-[#F4D178]'
                      : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE ZOUK "BESTSELLERS" LIVE TABBED PRODUCT GRID */}
      <section className="section bg-white">
        <div className="page-width">
          <div className="text-center max-w-2xl mx-auto mb-7">
            <Eyebrow className="justify-center">Customer Favourites</Eyebrow>
            <h2 className="font-['Manrope'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] mt-2 tracking-tight">
              Our Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-[#66645E] mt-1.5">
              Loved by everyday shoppers &amp; boutique brands across India. Direct from our Bhavani looms.
            </p>

            {/* Zouk-Style Category Pill Tabs */}
            <div className="inline-flex items-center gap-1.5 bg-[#F7F5F0] p-1 rounded-full border border-[#E6E2D9] mt-5">
              {(['All', 'Bags', 'Floor mats'] as const).map((tab) => {
                const active = bestsellerTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setBestsellerTab(tab)}
                    className={`px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#164E33] text-white shadow-xs'
                        : 'text-[#4A4843] hover:text-[#121212]'
                    }`}
                  >
                    {tab === 'All' ? 'All Bestsellers' : tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {bestsellerProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className="text-center mt-9">
            <Link
              to="/shop"
              search={bestsellerTab === 'All' ? undefined : { category: bestsellerTab }}
              className="inline-flex items-center gap-2 h-11 px-8 rounded-lg border-2 border-[#164E33] text-[#164E33] hover:bg-[#164E33] hover:text-white text-xs font-bold uppercase tracking-[0.12em] transition-all active:scale-95"
            >
              <span>View All {bestsellerTab === 'All' ? 'Products' : bestsellerTab}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ZOUK-STYLE "SHOP BY CATEGORY" 4-COLUMN EDITORIAL CARDS */}
      <section className="section bg-[#F7F5F0] border-y border-[#EAE7E0]">
        <div className="page-width">
          <div className="section-title">
            <div>
              <Eyebrow>Curated For Every Purpose</Eyebrow>
              <h2>Shop by Category</h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#164E33] hover:underline"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {shopCategories.map((cat) => (
              <Link
                key={cat.title}
                to="/shop"
                search={cat.search as any}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E6E2D9] shadow-xs hover:shadow-[0_14px_34px_rgba(17,47,33,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EFECE4]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112F21]/85 via-[#112F21]/15 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-white/95 text-[#164E33] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {cat.tag}
                  </span>
                  <div className="absolute inset-x-3.5 bottom-3.5 text-white flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-['Manrope'] text-sm sm:text-base font-extrabold leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-white/85 mt-0.5 line-clamp-1">
                        {cat.subtitle}
                      </p>
                    </div>
                    <span className="size-8 rounded-full bg-white/20 group-hover:bg-[#164E33] backdrop-blur-xs flex items-center justify-center shrink-0 transition-colors">
                      <MoveUpRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ZOUK-STYLE "SHOP BY PRINT & WEAVE" INTERACTIVE STUDIO */}
      <section className="section bg-white">
        <div className="page-width">
          <div className="section-title items-start">
            <div>
              <Eyebrow>Indian Craftsmanship</Eyebrow>
              <h2>Shop by Weave &amp; Print</h2>
              <p>Explore our signature Bhavani handloom patterns, raised cotton knots, and botanical block prints.</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#164E33] hover:bg-[#0D3321] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>Browse All Weaves</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-2">
            {/* Swatch / Pattern Selector List */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {spotlightWeaves.map((item, idx) => {
                const isActive = activeWeave === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveWeave(idx)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#F7F5F0] border-[#164E33] shadow-sm ring-1 ring-[#164E33]/20'
                        : 'bg-white border-[#EAE7E0] hover:bg-[#FAF9F6] hover:border-[#164E33]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E5E1D8] shrink-0 bg-[#F7F5F0]">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-['Manrope'] text-sm font-bold text-[#121212] leading-tight">
                          {item.title}
                        </h4>
                        <span className="text-[11.5px] text-[#66645E] block mt-0.5">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full hidden sm:inline-block ${
                          isActive
                            ? 'bg-[#164E33] text-white'
                            : 'bg-[#164E33]/10 text-[#164E33]'
                        }`}
                      >
                        {item.accent}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          isActive ? 'text-[#164E33] translate-x-0.5' : 'text-[#9E9B94]'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Weave Feature Stage */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#EAE7E0] bg-white shadow-[0_8px_28px_rgba(17,47,33,0.07)] group">
                <div className="aspect-[16/10] overflow-hidden bg-[#F7F5F0] relative">
                  <img
                    src={currentWeave.image}
                    alt={currentWeave.title}
                    key={currentWeave.id}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider bg-[#112F21]/90 text-white backdrop-blur-xs">
                    {currentWeave.accent}
                  </span>
                </div>
                <div className="p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#EAE7E0]">
                  <div>
                    <span className="text-[11px] font-bold text-[#164E33] uppercase tracking-wider block">
                      {currentWeave.type}
                    </span>
                    <h3 className="font-['Manrope'] text-xl sm:text-2xl font-extrabold text-[#121212] mt-1">
                      {currentWeave.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66645E] mt-1.5 max-w-md leading-relaxed">
                      {currentWeave.desc}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    search={currentWeave.search as any}
                    className="self-start sm:self-center shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#164E33] hover:bg-[#0D3321] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                  >
                    <span>Shop This Style</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ZOUK-STYLE BRAND PILLARS / USP STRIP */}
      <EverydayBand />

      {/* 7. ZOUK-STYLE SOCIAL PROOF: CUSTOMER REVIEWS & TRUSTED BRANDS */}
      <section className="section bg-white">
        <div className="page-width">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#164E33]/8 text-[#164E33] text-xs font-bold mb-3">
              <Star size={13} className="fill-[#D9A438] text-[#D9A438]" />
              <span>4.9 / 5 Average Rating · Trusted Across India</span>
            </div>
            <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
              Loved by Customers &amp; Retail Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((rev) => (
              <div
                key={rev.name}
                className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#EAE7E0] flex flex-col justify-between gap-4 hover:border-[#164E33]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D9A438] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#D9A438]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#2A2A2A] leading-relaxed">
                    “{rev.quote}”
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE7E0] flex items-center justify-between gap-2">
                  <div>
                    <div className="font-['Manrope'] text-xs font-extrabold text-[#121212] flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 size={13} className="text-[#164E33]" />
                    </div>
                    <span className="text-[11px] text-[#737069]">{rev.city}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#164E33] bg-white border border-[#E5E1D8] px-2.5 py-1 rounded-md max-w-[140px] truncate">
                    {rev.product}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted Jewellery & Brand Partners Bar */}
          <div className="mt-10 pt-8 border-t border-[#EAE7E0]">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#737069] mb-5">
              Trusted Manufacturing Partner For Leading Jewellery &amp; Lifestyle Brands
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {trustedPartners.map((partner) => (
                <div
                  key={partner}
                  className="px-4 py-3.5 rounded-xl bg-[#F7F5F0] border border-[#EAE7E0] flex items-center justify-center gap-2 text-center"
                >
                  <ShieldCheck size={15} className="text-[#164E33] shrink-0" />
                  <span className="font-['Manrope'] text-xs sm:text-[13px] font-bold text-[#121212]">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. HERITAGE SPLIT SECTION (BHAVANI FACILITY) */}
      <section className="section bg-[#F7F5F0] border-t border-[#EAE7E0]">
        <div className="page-width brand-story">
          <div className="relative group overflow-hidden rounded-2xl border border-[#E5E1D8] shadow-md bg-white">
            <img
              className="story-photo rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
              src={facilityImg}
              alt="ShreeyaSudarshan Trading Company facility in Bhavani"
              loading="lazy"
              width={1024}
              height={768}
            />
            <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#EAE7E0] text-xs flex items-center justify-between shadow-sm">
              <span className="flex items-center gap-2 font-bold text-[#121212]">
                <CheckCircle2 size={15} className="text-[#164E33]" /> Direct Mill Manufacturing Unit
              </span>
              <span className="text-[10px] uppercase font-bold text-[#164E33] tracking-wider">Bhavani · Erode</span>
            </div>
          </div>

          <div className="story-content">
            <Eyebrow>Our Heritage</Eyebrow>
            <h2 className="editorial-title">
              Proudly Indian.<br />
              <em>Woven into everyday life.</em>
            </h2>
            <p>
              From our manufacturing unit in Bhavani, Tamil Nadu, ShreeyaSudarshan Trading Company brings together generations of handloom mastery and modern eco-friendly utility — crafting cotton totes, golden jute bags, non-woven bags, gada cloth, and durable floor mats.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#164E33] hover:bg-[#0D3321] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
              >
                <span>Read Our Story</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-white border border-[#DEDAD0] hover:border-[#164E33] text-[#121212] hover:text-[#164E33] text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Bulk &amp; Custom Enquiry</span>
                <Sparkles size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CLEAN CLOSING BANNER */}
      <section className="bg-[#164E33] text-white text-center py-14 px-6 border-t border-[#D9A438]/30">
        <div className="page-width max-w-2xl">
          <Eyebrow className="justify-center !text-[#F4D178]">Factory-Direct Quality</Eyebrow>
          <h2 className="font-['Manrope'] text-2xl sm:text-4xl font-extrabold mt-3 mb-2.5 tracking-tight">
            Ready to elevate your everyday carry &amp; home?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mb-7 leading-relaxed">
            Shop retail essentials or partner with us for bulk branded cotton, jute, and handloom mat orders with pan-India delivery.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg bg-white hover:bg-[#F7F5F0] text-[#112F21] text-xs font-extrabold uppercase tracking-[0.1em] shadow-md transition-all active:scale-95"
            >
              <span>Shop All Products</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg bg-transparent border border-white/40 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.1em] transition-all"
            >
              <span>Request Bulk Quote</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
