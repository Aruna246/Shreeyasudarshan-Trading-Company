import { useState, useEffect, useRef } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Factory,
  Leaf,
  Truck,
  Award,
  Sparkles,
} from 'lucide-react';
import { ProductCard, useStore } from '@/components/storefront';
import { pageHead, type Product } from '@/lib/catalog';
import hero from '@/assets/living-hero.jpg';
import tote from '@/assets/green-tote.jpg';
import woven from '@/assets/woven-bag.jpg';
import bagCottonTote from '@/assets/bag-cotton-tote.jpg';
import bagGoldenJute from '@/assets/bag-golden-jute.jpg';
import bagBlockprintFloral from '@/assets/bag-blockprint-floral.jpg';
import bagRoyalNonwoven from '@/assets/bag-royal-nonwoven.jpg';
import matDiamond from '@/assets/mat-fringe-diamond-weave.jpg';
import matIkat from '@/assets/mat-ikat-crossstitch.jpg';
import matShag from '@/assets/mat-shaggy-palette.jpg';
import matRoyalVasthu from '@/assets/mat-royal-vasthu.jpg';
import matRainbow from '@/assets/mat-rainbow.jpg';
import facilityImg from '@/assets/company-facility.jpg';

export const Route = createFileRoute('/')({
  head: () =>
    pageHead(
      'Handcrafted Bags & Bhavani Handloom Floor Mats',
      'Discover ShreeyaSudarshan Trading Company — Bhavani manufacturers of eco-friendly cotton totes, golden jute bags, non-woven bags, and handloom floor mats.'
    ),
  component: Index,
});

function ZoukProductCarousel({ items }: { items: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slide = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const step = Math.max(300, scrollRef.current.clientWidth * 0.78);
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group/carousel">
      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => slide('left')}
        aria-label="Scroll products left"
        className="hidden md:flex absolute -left-4 top-[38%] -translate-y-1/2 z-20 size-10 rounded-full bg-white border border-[#E5E0D5] text-[#141414] hover:bg-[#164E33] hover:text-white hover:border-[#164E33] shadow-md items-center justify-center transition-all cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable Product Track */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2"
      >
        {items.map(item => (
          <div
            key={item.id}
            className="w-[64%] sm:w-[44%] md:w-[31%] lg:w-[23.6%] shrink-0 snap-start"
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => slide('right')}
        aria-label="Scroll products right"
        className="hidden md:flex absolute -right-4 top-[38%] -translate-y-1/2 z-20 size-10 rounded-full bg-white border border-[#E5E0D5] text-[#141414] hover:bg-[#164E33] hover:text-white hover:border-[#164E33] shadow-md items-center justify-center transition-all cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function Index() {
  const { products } = useStore();

  // 1. Zouk-Style Full-Width Edge-to-Edge Hero Banner Slides (using ONLY original images)
  const heroSlides = [
    {
      id: 'zouk-hero-1',
      eyebrow: 'PROUDLY INDIAN · BHAVANI HANDLOOMS',
      headline: 'Everyday Bags & Handloom Floor Mats',
      subtext: 'Pure cotton totes, golden jute bags & washable Bhavani handloom mats — direct from our manufacturing unit.',
      ctaText: 'SHOP NOW',
      ctaTo: '/shop',
      ctaSearch: undefined,
      image: hero,
      alt: 'Handcrafted cotton bag and handloom floor mat in living space',
    },
    {
      id: 'zouk-hero-2',
      eyebrow: 'ECO-FRIENDLY BAG COLLECTION',
      headline: 'Cotton Totes, Jute & Non-Woven Bags',
      subtext: 'Handblock floral prints, golden biodegradable jute & reusable carry bags starting from ₹60.',
      ctaText: 'SHOP BAGS',
      ctaTo: '/shop',
      ctaSearch: { category: 'Bags' },
      image: woven,
      alt: 'Woven jute and cotton tote bags',
    },
    {
      id: 'zouk-hero-3',
      eyebrow: 'VASTHU & DESIGNER WEAVES',
      headline: 'Bhavani Handloom Floor Mats',
      subtext: 'Royal Vasthu, Oval Vasthu, Raised Lattice & everyday cotton floor mats starting from ₹50.',
      ctaText: 'SHOP FLOOR MATS',
      ctaTo: '/shop',
      ctaSearch: { category: 'Floor mats' },
      image: matRoyalVasthu,
      alt: 'Royal Vasthu handloom floor mat',
    },
  ];

  // 2. Zouk-Style Trust Badges Bar (Right below Hero Banner)
  const trustBadges = [
    { icon: <Leaf size={20} />, title: '100% Eco-Friendly', sub: 'Pure Cotton & Jute' },
    { icon: <Award size={20} />, title: 'Proudly Indian', sub: 'Woven in Bhavani, TN' },
    { icon: <Factory size={20} />, title: 'Direct Mill Value', sub: 'Zero Middlemen' },
    { icon: <Truck size={20} />, title: 'Pan-India Dispatch', sub: 'Retail & Bulk Orders' },
  ];

  // 3. Zouk-Style "Shop By Category" Visual Grid (Matched to our real 32 products)
  const shopCategories = [
    {
      title: 'Cotton Totes',
      image: bagCottonTote,
      search: { category: 'Bags', q: 'cotton' },
    },
    {
      title: 'Jute Bags',
      image: bagGoldenJute,
      search: { category: 'Bags', q: 'jute' },
    },
    {
      title: 'Non-Woven Bags',
      image: bagRoyalNonwoven,
      search: { category: 'Bags', q: 'non-woven' },
    },
    {
      title: 'Designer Mats',
      image: matDiamond,
      search: { category: 'Floor mats' },
    },
    {
      title: 'Vasthu Mats',
      image: matRoyalVasthu,
      search: { category: 'Floor mats', q: 'vasthu' },
    },
    {
      title: 'Everyday ₹50 Mats',
      image: matRainbow,
      search: { category: 'Floor mats', q: 'floor mat' },
    },
  ];

  // 4. Zouk-Style "Shop By Print & Weave" 4-Card Editorial Grid
  const craftPrints = [
    {
      title: 'Handblock & Cotton',
      subtitle: 'Botanical prints & pure unbleached canvas',
      image: bagBlockprintFloral,
      search: { category: 'Bags', q: 'cotton' },
    },
    {
      title: 'Golden Jute & Khadi',
      subtitle: 'Biodegradable burlap & handspun weaves',
      image: bagGoldenJute,
      search: { category: 'Bags', q: 'jute' },
    },
    {
      title: 'Raised Lattice & Shag',
      subtitle: 'Plush thick cotton cords & chenille tufts',
      image: matIkat,
      search: { category: 'Floor mats', q: 'lattice' },
    },
    {
      title: 'Vasthu & Heritage',
      subtitle: 'Royal paisley & braided oval designs',
      image: matRoyalVasthu,
      search: { category: 'Floor mats', q: 'vasthu' },
    },
  ];

  // 5. Real Trusted Jewellery House Partners (Zouk "As Seen In" style trust strip)
  const trustedClients = [
    'AVR Swarnamahal Jewelry Ltd',
    'Jewel One (Emerald Jewel Industry)',
    'Kirtilal Kalidas Jewellers Pvt Ltd',
    'Thangamayil Jewellery Pvt Ltd',
  ];

  const [heroIdx, setHeroIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bestsellerTab, setBestsellerTab] = useState<'All' | 'Bags' | 'Floor mats' | 'Vasthu'>('All');
  const touchStartX = useRef<number | null>(null);

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setHeroIdx(prev => (prev + 1) % heroSlides.length);
      } else {
        setHeroIdx(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % heroSlides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const allBags = products.filter(p => p.category === 'Bags');
  const allMats = products.filter(p => p.category === 'Floor mats');

  // Bestsellers carousel items by tab
  const bestsellerItems = (() => {
    if (bestsellerTab === 'Bags') return allBags;
    if (bestsellerTab === 'Floor mats') return allMats.slice(0, 10);
    if (bestsellerTab === 'Vasthu') {
      return allMats.filter(p => /vasthu|guptha|third eye|two in one|rainbow/i.test(`${p.name} ${p.badge}`));
    }
    // Balanced mix of top Bags & Floor Mats
    const mixed: Product[] = [];
    for (let i = 0; i < 6; i++) {
      if (allBags[i]) mixed.push(allBags[i]);
      if (allMats[i]) mixed.push(allMats[i]);
    }
    return mixed;
  })();

  // New Launches carousel items (our newer Vasthu, Everyday ₹50, Handblock & Shag editions)
  const newLaunchIds = [
    'bag-blockprint-floral',
    'mat-royal-vasthu',
    'everyday-tote',
    'mat-vasthu-round-oval',
    'woven-bag',
    'mat-two-in-one',
    'mat-shaggy-palette',
    'mat-third-eye',
    'bag-ochre-khadi',
    'mat-rainbow',
  ];
  const newLaunchItems = newLaunchIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="bg-white">
      {/* 1. ZOUK-STYLE FULL-WIDTH EDGE-TO-EDGE HERO BANNER CAROUSEL */}
      <section
        aria-label="Featured Banners"
        className="relative w-full h-[430px] sm:h-[490px] lg:h-[550px] overflow-hidden bg-[#112F21]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        {heroSlides.map((slide, idx) => {
          const active = idx === heroIdx;
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
              />
              {/* Bottom-up vignette on mobile for clear bright top image + readable bottom text; left-to-right on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2217]/92 via-[#0C2217]/55 to-[#0C2217]/15 sm:bg-gradient-to-r sm:from-[#0C2217]/82 sm:via-[#0C2217]/45 sm:to-transparent" />

              <div className="absolute inset-0 flex items-end pb-12 sm:items-center sm:pb-0">
                <div className="page-width">
                  <div className="max-w-xl text-white">
                    <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#F4D178] mb-2">
                      {slide.eyebrow}
                    </span>
                    <h1 className="font-['Manrope'] text-[26px] sm:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight text-white">
                      {slide.headline}
                    </h1>
                    <p className="text-xs sm:text-base text-white/90 mt-2.5 sm:mt-3.5 leading-relaxed max-w-md line-clamp-3 sm:line-clamp-none">
                      {slide.subtext}
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center gap-2.5 sm:gap-3 flex-wrap">
                      <Link
                        to={slide.ctaTo as any}
                        search={slide.ctaSearch as any}
                        className="inline-flex items-center gap-2 h-10 sm:h-12 px-5 sm:px-9 rounded-md bg-white hover:bg-[#F6F3EC] text-[#112F21] text-[11.5px] sm:text-[13px] font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.12em] shadow-lg transition-all active:scale-95"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        to="/contact-us"
                        className="inline-flex items-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-md bg-[#164E33]/90 hover:bg-[#164E33] border border-white/30 text-white text-[11.5px] sm:text-[13px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] transition-all"
                      >
                        <span>Bulk Enquiry</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Edge Prev / Next Arrows */}
        <button
          type="button"
          onClick={() => setHeroIdx(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous banner"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white/85 hover:bg-white text-[#141414] items-center justify-center shadow-md cursor-pointer transition-all"
        >
          <ChevronLeft size={19} />
        </button>
        <button
          type="button"
          onClick={() => setHeroIdx(prev => (prev + 1) % heroSlides.length)}
          aria-label="Next banner"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white/85 hover:bg-white text-[#141414] items-center justify-center shadow-md cursor-pointer transition-all"
        >
          <ChevronRight size={19} />
        </button>

        {/* Bottom Centered Dots */}
        <div className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setHeroIdx(i)}
              aria-label={`Banner ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === heroIdx ? 'w-7 bg-[#F4D178]' : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. ZOUK-STYLE VALUE PROPOSITION / TRUST BADGES BAR (DIRECTLY UNDER HERO) */}
      <section className="bg-[#F6F3EC] border-b border-[#EAE6DE] py-4 sm:py-5">
        <div className="page-width">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {trustBadges.map(badge => (
              <div key={badge.title} className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3">
                <div className="size-9 sm:size-10 rounded-full bg-white border border-[#E5E0D5] text-[#164E33] flex items-center justify-center shrink-0 shadow-2xs">
                  {badge.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-['Manrope'] text-[11.5px] sm:text-[13px] font-extrabold text-[#141414] leading-tight truncate">
                    {badge.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#66635C] mt-0.5 truncate">{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ZOUK-STYLE "SHOP BY CATEGORY" CENTERED VISUAL ROW */}
      <section className="py-8 sm:py-14 bg-white">
        <div className="page-width">
          <div className="text-center mb-5 sm:mb-7">
            <h2 className="font-['Manrope'] text-xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-[#66635C] mt-1">
              Explore our complete range of handcrafted bags &amp; Bhavani handloom floor mats
            </p>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-6">
            {shopCategories.map(cat => (
              <Link
                key={cat.title}
                to="/shop"
                search={cat.search as any}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#F6F3EC] border border-[#EAE6DE] group-hover:border-[#164E33] group-hover:shadow-md transition-all duration-300">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="font-['Manrope'] text-[11px] sm:text-[13.5px] font-bold text-[#141414] group-hover:text-[#164E33] mt-2 sm:mt-2.5 leading-tight transition-colors">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ZOUK-STYLE 2-COLUMN SIDE-BY-SIDE PROMO BANNER GRID */}
      <section className="pb-8 sm:pb-14 bg-white">
        <div className="page-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
            {/* Left Promo Banner: Bags */}
            <Link
              to="/shop"
              search={{ category: 'Bags' }}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#112F21] block shadow-sm"
            >
              <img
                src={tote}
                alt="Handcrafted Cotton and Jute Bags"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2217]/90 via-[#0C2217]/30 to-transparent" />
              <div className="absolute inset-x-4 sm:inset-x-7 bottom-4 sm:bottom-7 text-white">
                <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#F4D178]">
                  STARTING AT ₹60 · {allBags.length} STYLES
                </span>
                <h3 className="font-['Manrope'] text-lg sm:text-2xl font-extrabold mt-0.5 sm:mt-1 leading-snug">
                  Cotton, Jute &amp; Non-Woven Bags
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-2 sm:mt-3 text-white group-hover:text-[#F4D178] transition-colors">
                  Shop Bags <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* Right Promo Banner: Floor Mats */}
            <Link
              to="/shop"
              search={{ category: 'Floor mats' }}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#112F21] block shadow-sm"
            >
              <img
                src={matShag}
                alt="Bhavani Handloom Floor Mats"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C2217]/90 via-[#0C2217]/30 to-transparent" />
              <div className="absolute inset-x-4 sm:inset-x-7 bottom-4 sm:bottom-7 text-white">
                <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#F4D178]">
                  STARTING AT ₹50 · {allMats.length} WEAVES
                </span>
                <h3 className="font-['Manrope'] text-lg sm:text-2xl font-extrabold mt-0.5 sm:mt-1 leading-snug">
                  Handloom &amp; Vasthu Floor Mats
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-2 sm:mt-3 text-white group-hover:text-[#F4D178] transition-colors">
                  Shop Floor Mats <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ZOUK-STYLE "BESTSELLERS" HORIZONTAL CAROUSEL WITH UNDERLINE TABS */}
      <section className="py-8 sm:py-14 bg-[#FAF9F6] border-y border-[#ECE8E0]">
        <div className="page-width">
          <div className="text-center mb-6 sm:mb-7">
            <h2 className="font-['Manrope'] text-xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Bestsellers
            </h2>
            {/* Zouk-Style Clean Underline Tabs (single-line scrollable on narrow phones) */}
            <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-8 mt-3.5 border-b border-[#E5E0D5] max-w-lg mx-auto overflow-x-auto no-scrollbar px-1">
              {(
                [
                  { id: 'All', label: 'All' },
                  { id: 'Bags', label: 'Bags' },
                  { id: 'Floor mats', label: 'Floor Mats' },
                  { id: 'Vasthu', label: 'Vasthu Mats' },
                ] as const
              ).map(tab => {
                const active = bestsellerTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setBestsellerTab(tab.id)}
                    className={`pb-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer relative whitespace-nowrap shrink-0 ${
                      active ? 'text-[#164E33]' : 'text-[#66635C] hover:text-[#141414]'
                    }`}
                  >
                    {tab.label}
                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-[2.5px] bg-[#164E33] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <ZoukProductCarousel items={bestsellerItems} />

          <div className="text-center mt-8">
            <Link
              to="/shop"
              search={
                bestsellerTab === 'Bags'
                  ? { category: 'Bags' }
                  : bestsellerTab === 'Floor mats'
                    ? { category: 'Floor mats' }
                    : bestsellerTab === 'Vasthu'
                      ? { category: 'Floor mats', q: 'vasthu' }
                      : undefined
              }
              className="inline-flex items-center gap-2 h-11 px-8 rounded-md bg-[#164E33] hover:bg-[#0E3824] text-white text-xs font-bold uppercase tracking-[0.12em] transition-all shadow-xs"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. ZOUK-STYLE "SHOP BY WEAVE & CRAFT" 4-CARD TALL LOOKBOOK GRID */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="page-width">
          <div className="text-center mb-8">
            <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Shop By Weave &amp; Craft
            </h2>
            <p className="text-xs sm:text-sm text-[#66635C] mt-1">
              Authentic Indian fabrics &amp; handloom textures crafted in Bhavani
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {craftPrints.map(item => (
              <Link
                key={item.title}
                to="/shop"
                search={item.search as any}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#F6F3EC] block border border-[#EAE6DE]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C2217]/88 via-[#0C2217]/15 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-center text-white">
                  <h3 className="font-['Manrope'] text-sm sm:text-lg font-extrabold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-white/85 mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>
                  <span className="inline-block mt-2.5 text-[10.5px] font-bold uppercase tracking-widest text-[#F4D178] border-b border-[#F4D178]/70 pb-0.5">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ZOUK-STYLE "NEW LAUNCHES" SECOND HORIZONTAL PRODUCT CAROUSEL */}
      <section className="py-10 sm:py-14 bg-[#FAF9F6] border-y border-[#ECE8E0]">
        <div className="page-width">
          <div className="text-center mb-7">
            <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              New Launches
            </h2>
            <p className="text-xs sm:text-sm text-[#66635C] mt-1">
              Fresh handloom weaves, Vasthu editions &amp; botanical block-print totes
            </p>
          </div>

          <ZoukProductCarousel items={newLaunchItems} />

          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-11 px-8 rounded-md border-2 border-[#164E33] text-[#164E33] hover:bg-[#164E33] hover:text-white text-xs font-bold uppercase tracking-[0.12em] transition-all"
            >
              <span>Shop Full Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ZOUK-STYLE "SHOP BY BUDGET & BULK GIFTING" 3-COLUMN CARDS */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="page-width">
          <div className="text-center mb-8">
            <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#141414] tracking-tight">
              Shop By Price &amp; Bulk Orders
            </h2>
            <p className="text-xs sm:text-sm text-[#66635C] mt-1">
              Honest direct factory rates for everyday homes, retail stores &amp; jewellery brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Link
              to="/shop"
              search={{ category: 'Floor mats', q: 'floor mat' }}
              className="group p-6 sm:p-7 rounded-2xl bg-[#F6F3EC] border border-[#E6E1D6] hover:border-[#164E33] transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <span className="inline-block text-[10.5px] font-bold uppercase tracking-widest text-[#164E33] bg-white px-2.5 py-1 rounded border border-[#E5E0D5]">
                  Under ₹100
                </span>
                <h3 className="font-['Manrope'] text-xl font-extrabold text-[#141414] mt-3">
                  Everyday &amp; Vasthu Mats
                </h3>
                <p className="text-xs sm:text-sm text-[#66635C] mt-1.5 leading-relaxed">
                  Grape, Rainbow, Limestone, Guptha, Vasthu Oval &amp; Royal Vasthu handloom cotton mats from ₹50 to ₹70.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#164E33]">
                Shop Under ₹100 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/shop"
              search={{ category: 'Bags' }}
              className="group p-6 sm:p-7 rounded-2xl bg-[#F6F3EC] border border-[#E6E1D6] hover:border-[#164E33] transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <span className="inline-block text-[10.5px] font-bold uppercase tracking-widest text-[#164E33] bg-white px-2.5 py-1 rounded border border-[#E5E0D5]">
                  ₹60 – ₹1,290
                </span>
                <h3 className="font-['Manrope'] text-xl font-extrabold text-[#141414] mt-3">
                  Eco-Friendly Daily Bags
                </h3>
                <p className="text-xs sm:text-sm text-[#66635C] mt-1.5 leading-relaxed">
                  Reusable non-woven bags, pure cotton canvas totes, golden jute shoppers &amp; handblock floral bags.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#164E33]">
                Explore All Bags <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/contact-us"
              className="group p-6 sm:p-7 rounded-2xl bg-[#112F21] text-white border border-[#164E33] hover:bg-[#164E33] transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-widest text-[#F4D178] bg-white/10 px-2.5 py-1 rounded">
                  <Sparkles size={11} /> Bulk &amp; Corporate
                </span>
                <h3 className="font-['Manrope'] text-xl font-extrabold text-white mt-3">
                  Custom Branding &amp; Bulk
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed">
                  Custom logo bags, jewellery pouches, Gada Cloth (20&apos;s) &amp; wholesale floor mat lots with GST billing.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F4D178]">
                Request Factory Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. ZOUK-STYLE "TRUSTED BY" PARTNER STRIP + BRAND STORY BANNER */}
      <section className="py-10 sm:py-14 bg-[#F6F3EC] border-t border-[#EAE6DE]">
        <div className="page-width">
          {/* Trusted Jewellery Partners Strip */}
          <div className="text-center mb-10 pb-10 border-b border-[#E5E0D5]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#164E33] mb-5">
              Trusted Manufacturing Partner For Leading Jewellery Houses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {trustedClients.map(client => (
                <div
                  key={client}
                  className="bg-white border border-[#EAE6DE] rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 shadow-2xs"
                >
                  <ShieldCheck size={16} className="text-[#164E33] shrink-0" />
                  <span className="font-['Manrope'] text-xs sm:text-[13px] font-extrabold text-[#141414]">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Story Split */}
          <div className="brand-story">
            <div className="relative overflow-hidden rounded-2xl border border-[#EAE6DE] bg-white shadow-sm">
              <img
                src={facilityImg}
                alt="ShreeyaSudarshan Trading Company facility in Bhavani"
                loading="lazy"
                className="story-photo rounded-2xl"
                width={1024}
                height={768}
              />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#EAE6DE] text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-[#141414]">
                  <CheckCircle2 size={15} className="text-[#164E33]" /> Direct Bhavani Manufacturing Unit
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#164E33]">Erode · TN</span>
              </div>
            </div>

            <div className="story-content">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#164E33]">
                Why ShreeyaSudarshan
              </span>
              <h2 className="editorial-title">
                Proudly Indian.<br />
                <em>Crafted in Bhavani for modern living.</em>
              </h2>
              <p>
                ShreeyaSudarshan Trading Company brings together Bhavani&apos;s renowned handloom heritage and sustainable bag manufacturing — producing durable cotton bags, jute totes, non-woven bags, gada cloth (20&apos;s), and handloom floor mats for homes and brands across India.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-[#164E33] hover:bg-[#0E3824] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Read Our Story</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-white border border-[#D8D3C8] hover:border-[#164E33] text-[#141414] hover:text-[#164E33] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Contact Factory</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
