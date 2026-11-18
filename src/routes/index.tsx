import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Factory,
  ShoppingBag,
  Layers,
} from 'lucide-react';
import { Eyebrow, EverydayBand, ProductCard, useStore } from '@/components/storefront';
import { pageHead } from '@/lib/catalog';
import hero from '@/assets/living-hero.jpg';
import woven from '@/assets/woven-bag.jpg';
import bagCottonTote from '@/assets/bag-cotton-tote.jpg';
import bagGoldenJute from '@/assets/bag-golden-jute.jpg';
import bagRoyalNonwoven from '@/assets/bag-royal-nonwoven.jpg';
import matDiamond from '@/assets/mat-fringe-diamond-weave.jpg';
import matIkat from '@/assets/mat-ikat-crossstitch.jpg';
import matRoyalVasthu from '@/assets/mat-royal-vasthu.jpg';
import matVasthuOval from '@/assets/mat-vasthu-round-oval.jpg';
import matRainbow from '@/assets/mat-rainbow.jpg';
import facilityImg from '@/assets/company-facility.jpg';

export const Route = createFileRoute('/')({
  head: () =>
    pageHead(
      'Handcrafted Bags & Bhavani Handloom Floor Mats',
      'Shop direct from ShreeyaSudarshan Trading Company, Bhavani — eco-friendly cotton totes, golden jute bags, non-woven bags, designer floor mats, and Vasthu mats.'
    ),
  component: Index,
});

function Index() {
  const { products } = useStore();

  const heroSlides = [
    {
      id: 'hero-everyday',
      tag: 'Direct from Bhavani Mill',
      title: 'Handcrafted Cotton Bags & Handloom Floor Mats.',
      subtitle:
        'Eco-friendly pure cotton totes, biodegradable golden jute bags, reusable non-woven carry bags, and Bhavani handloom floor mats — crafted directly at our manufacturing unit.',
      image: hero,
      alt: 'Natural canvas bag and floor mat',
      cardLabel: 'Featured Collection',
      cardTitle: 'Bags & Floor Mats',
      cardMeta: `${products.length} Direct Mill Products`,
      primaryBtn: { text: 'Shop All Products', to: '/shop', search: undefined },
      secondaryBtn: { text: 'Bulk & Custom Orders', to: '/contact-us', search: undefined },
    },
    {
      id: 'hero-bags',
      tag: 'Eco-Friendly Bag Collection',
      title: 'Cotton Totes, Golden Jute & Non-Woven Bags.',
      subtitle:
        'From handblock floral totes and handspun khadi bags to sturdy retail & jewellery packaging bags — durable, washable, and 100% eco-conscious.',
      image: woven,
      alt: 'Woven jute and cotton bags',
      cardLabel: 'Bag Range',
      cardTitle: 'Cotton · Jute · Non-Woven',
      cardMeta: 'Starting ₹60 · Retail & Bulk',
      primaryBtn: { text: 'Shop All Bags', to: '/shop', search: { category: 'Bags' } },
      secondaryBtn: { text: 'Jewellery Bulk Orders', to: '/contact-us', search: undefined },
    },
    {
      id: 'hero-mats',
      tag: 'Bhavani Handloom Looms',
      title: 'Vasthu, Lattice & Everyday Cotton Floor Mats.',
      subtitle:
        'Explore Royal Vasthu mats, oval braided Vasthu mats, raised lattice weaves, chenille shag rugs, and everyday cotton floor mats starting at ₹50.',
      image: matRoyalVasthu,
      alt: 'Royal Vasthu handloom floor mat',
      cardLabel: 'Floor Mat Range',
      cardTitle: 'Designer & Vasthu Mats',
      cardMeta: 'Starting ₹50 · Washable Cotton',
      primaryBtn: { text: 'Shop Floor Mats', to: '/shop', search: { category: 'Floor mats' } },
      secondaryBtn: { text: 'Custom Sizing Enquiry', to: '/contact-us', search: undefined },
    },
  ];

  // 6-Tile Zouk-Style Category Grid (100% matched to our real catalog)
  const categoryTiles = [
    {
      title: 'Cotton & Khadi Bags',
      count: 'Handloom totes & canvas',
      image: bagCottonTote,
      search: { category: 'Bags', q: 'cotton' },
    },
    {
      title: 'Golden Jute Bags',
      count: '100% natural burlap',
      image: bagGoldenJute,
      search: { category: 'Bags', q: 'jute' },
    },
    {
      title: 'Non-Woven Bags',
      count: 'Starting ₹60 · Reusable',
      image: bagRoyalNonwoven,
      search: { category: 'Bags', q: 'non-woven' },
    },
    {
      title: 'Designer Floor Mats',
      count: 'Lattice, diamond & shag',
      image: matDiamond,
      search: { category: 'Floor mats' },
    },
    {
      title: 'Vasthu Floor Mats',
      count: 'Royal & Oval Vasthu',
      image: matRoyalVasthu,
      search: { category: 'Floor mats', q: 'vasthu' },
    },
    {
      title: 'Everyday ₹50 Mats',
      count: 'Grape, Rainbow, Guptha',
      image: matRainbow,
      search: { category: 'Floor mats', q: 'floor mat' },
    },
  ];

  const trustedClients = [
    { name: 'AVR Swarnamahal Jewelry Ltd', tag: 'Jewellery Bags' },
    { name: 'Jewel One (Emerald JEWEL Industry)', tag: 'Custom Packaging' },
    { name: 'Kirtilal Kalidas Jewellers Pvt Ltd', tag: 'Premium Pouches' },
    { name: 'Thangamayil Jewellery Pvt Ltd', tag: 'Jewellery Bags' },
  ];

  const [slideIdx, setSlideIdx] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [bagTab, setBagTab] = useState<'all' | 'cotton' | 'jute' | 'non-woven'>('all');
  const [matTab, setMatTab] = useState<'all' | 'designer' | 'vasthu' | 'everyday'>('all');

  useEffect(() => {
    if (heroPaused) return;
    const t = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(t);
  }, [heroPaused, heroSlides.length]);

  const currentHero = heroSlides[slideIdx];

  // Real Bag Products filtered by tab
  const allBags = products.filter(p => p.category === 'Bags');
  const visibleBags = (() => {
    if (bagTab === 'cotton') {
      return allBags.filter(p => /cotton|canvas|khadi|floral/i.test(`${p.name} ${p.material}`));
    }
    if (bagTab === 'jute') {
      return allBags.filter(p => /jute|weave/i.test(`${p.name} ${p.material}`));
    }
    if (bagTab === 'non-woven') {
      return allBags.filter(p => /non-woven/i.test(`${p.name} ${p.material}`));
    }
    return allBags.slice(0, 8);
  })();

  // Real Floor Mat Products filtered by tab
  const allMats = products.filter(p => p.category === 'Floor mats');
  const visibleMats = (() => {
    if (matTab === 'designer') {
      return allMats.filter(p => p.price >= 500).slice(0, 8);
    }
    if (matTab === 'vasthu') {
      return allMats.filter(p => /vasthu|guptha|third eye|two in one/i.test(`${p.name} ${p.badge}`));
    }
    if (matTab === 'everyday') {
      return allMats.filter(p => p.price <= 70).slice(0, 8);
    }
    // Mix of designer + Vasthu + everyday ₹50 mats so user sees full range immediately
    const designer = allMats.filter(p => p.price >= 500).slice(0, 4);
    const affordable = allMats.filter(p => p.price <= 70).slice(0, 4);
    return [...designer, ...affordable];
  })();

  return (
    <>
      {/* 1. ZOUK-STYLE BRIGHT 2-COLUMN SPLIT HERO SHOWCASE (NO DARK OVERLAY, NO SPLASH) */}
      <section
        className="bg-[#F6F3EC] border-b border-[#EAE6DE]"
        aria-label="Featured Storefront Showcase"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div className="page-width py-7 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Eyebrow>{currentHero.tag}</Eyebrow>
              <h1 className="font-['Manrope'] text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#141414] leading-[1.12] tracking-tight mt-3">
                {currentHero.title}
              </h1>
              <p className="text-sm sm:text-[15px] text-[#5C5952] leading-relaxed mt-3.5 max-w-xl">
                {currentHero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Link
                  to={currentHero.primaryBtn.to as any}
                  search={currentHero.primaryBtn.search as any}
                  className="inline-flex items-center gap-2 h-11 sm:h-12 px-6 sm:px-7 rounded-lg bg-[#164E33] hover:bg-[#0E3824] text-white text-xs sm:text-[13px] font-bold uppercase tracking-[0.09em] shadow-sm transition-all active:scale-95"
                >
                  <span>{currentHero.primaryBtn.text}</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to={currentHero.secondaryBtn.to as any}
                  search={currentHero.secondaryBtn.search as any}
                  className="inline-flex items-center gap-2 h-11 sm:h-12 px-5 sm:px-6 rounded-lg bg-white hover:bg-[#FAF9F6] border border-[#D8D3C8] hover:border-[#164E33] text-[#141414] hover:text-[#164E33] text-xs sm:text-[13px] font-bold uppercase tracking-[0.09em] transition-all"
                >
                  <span>{currentHero.secondaryBtn.text}</span>
                </Link>
              </div>

              {/* Real Catalog Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mt-7 pt-5 border-t border-[#E5E0D5] max-w-lg">
                <div>
                  <span className="font-['Manrope'] text-lg sm:text-xl font-extrabold text-[#164E33] block leading-none">
                    {allBags.length}+
                  </span>
                  <span className="text-[11px] text-[#66635C] font-medium mt-1 block">
                    Eco Bag Styles
                  </span>
                </div>
                <div>
                  <span className="font-['Manrope'] text-lg sm:text-xl font-extrabold text-[#164E33] block leading-none">
                    {allMats.length}+
                  </span>
                  <span className="text-[11px] text-[#66635C] font-medium mt-1 block">
                    Floor Mat Weaves
                  </span>
                </div>
                <div>
                  <span className="font-['Manrope'] text-lg sm:text-xl font-extrabold text-[#164E33] block leading-none">
                    ₹50+
                  </span>
                  <span className="text-[11px] text-[#66635C] font-medium mt-1 block">
                    Direct Mill Pricing
                  </span>
                </div>
              </div>
            </div>

            {/* Right Bright Unobstructed Visual Stage */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E5E0D5] shadow-[0_12px_36px_rgba(17,47,33,0.10)] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  key={currentHero.id}
                  src={currentHero.image}
                  alt={currentHero.alt}
                  className="w-full h-full object-cover transition-all duration-700"
                  fetchPriority="high"
                />

                {/* Clean Floating White Card Bottom-Left */}
                <Link
                  to={currentHero.primaryBtn.to as any}
                  search={currentHero.primaryBtn.search as any}
                  className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#EAE6DE] shadow-md hover:border-[#164E33] transition-colors hidden sm:flex items-center gap-3"
                >
                  <div className="size-9 rounded-lg bg-[#164E33]/10 text-[#164E33] flex items-center justify-center shrink-0">
                    <ShoppingBag size={17} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#164E33] block leading-none">
                      {currentHero.cardLabel}
                    </span>
                    <span className="font-['Manrope'] text-xs font-extrabold text-[#141414] block mt-0.5">
                      {currentHero.cardTitle}
                    </span>
                    <span className="text-[10.5px] text-[#66635C] block">
                      {currentHero.cardMeta}
                    </span>
                  </div>
                </Link>

                {/* Slide Controls Bottom-Right */}
                <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-md border border-[#EAE6DE]">
                  <button
                    type="button"
                    onClick={() => setSlideIdx(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    aria-label="Previous slide"
                    className="size-7 rounded-full hover:bg-[#F6F3EC] text-[#141414] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <div className="flex items-center gap-1 px-1">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSlideIdx(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          i === slideIdx ? 'w-5 bg-[#164E33]' : 'w-1.5 bg-[#D4CFC4]'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSlideIdx(prev => (prev + 1) % heroSlides.length)}
                    aria-label="Next slide"
                    className="size-7 rounded-full hover:bg-[#F6F3EC] text-[#141414] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ZOUK-STYLE 6-TILE "SHOP BY CATEGORY" CLEAN GRID */}
      <section className="section bg-white border-b border-[#EFECE5]">
        <div className="page-width">
          <div className="section-title">
            <div>
              <Eyebrow>Browse Our Range</Eyebrow>
              <h2>Shop by Category</h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#164E33] hover:underline"
            >
              <span>View All {products.length} Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {categoryTiles.map(tile => (
              <Link
                key={tile.title}
                to="/shop"
                search={tile.search as any}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#EAE6DE] hover:border-[#164E33]/50 hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square w-full overflow-hidden bg-[#F6F3EC]">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center bg-white">
                  <h3 className="font-['Manrope'] text-xs sm:text-[13px] font-extrabold text-[#141414] group-hover:text-[#164E33] transition-colors leading-snug">
                    {tile.title}
                  </h3>
                  <p className="text-[10.5px] text-[#737069] mt-0.5 line-clamp-1">
                    {tile.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ZOUK-STYLE SECTION 1: HANDCRAFTED BAGS (TABBED LIVE PRODUCT GRID) */}
      <section className="section bg-[#FAF9F6]">
        <div className="page-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <Eyebrow>Eco-Friendly Carry</Eyebrow>
              <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#141414] mt-1.5">
                Handcrafted Bags Collection
              </h2>
              <p className="text-xs sm:text-sm text-[#66635C] mt-1">
                Pure cotton totes, golden jute shoppers, handblock floral bags &amp; reusable non-woven bags.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#E5E0D5] self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
              {(
                [
                  { id: 'all', label: 'All Bags' },
                  { id: 'cotton', label: 'Cotton & Khadi' },
                  { id: 'jute', label: 'Jute' },
                  { id: 'non-woven', label: 'Non-Woven' },
                ] as const
              ).map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setBagTab(t.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    bagTab === t.id
                      ? 'bg-[#164E33] text-white shadow-xs'
                      : 'text-[#4A4843] hover:text-[#141414]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {visibleBags.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop"
              search={{ category: 'Bags' }}
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg border-2 border-[#164E33] text-[#164E33] hover:bg-[#164E33] hover:text-white text-xs font-bold uppercase tracking-[0.1em] transition-all"
            >
              <span>View All {allBags.length} Bags</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ZOUK-STYLE VISUAL PROMO BANNER: BHAVANI FLOOR MATS & VASTHU COLLECTION */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="page-width">
          <div className="rounded-2xl overflow-hidden bg-[#112F21] text-white grid grid-cols-1 lg:grid-cols-12 border border-[#164E33]">
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F4D178]">
                <Layers size={14} /> Bhavani Handloom Looms
              </span>
              <h2 className="font-['Manrope'] text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mt-3">
                Handloom Floor Mats &amp; Vasthu Rugs — Direct Mill Rates.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-3 max-w-md">
                Discover Royal Vasthu mats, oval braided Vasthu mats, reversible two-in-one rugs, raised lattice knots, and everyday washable cotton floor mats starting from ₹50.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/shop"
                  search={{ category: 'Floor mats' }}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#D4A037] hover:bg-[#c3912d] text-[#112F21] text-xs font-extrabold uppercase tracking-wider transition-all"
                >
                  <span>Shop All {allMats.length} Floor Mats</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/shop"
                  search={{ category: 'Floor mats', q: 'vasthu' }}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore Vasthu Mats</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-1.5 p-1.5 bg-[#0C2217]">
              <img src={matRoyalVasthu} alt="Royal Vasthu Floor Mat" loading="lazy" className="w-full h-40 sm:h-52 object-cover rounded-lg" />
              <img src={matVasthuOval} alt="Vasthu Round Oval Mat" loading="lazy" className="w-full h-40 sm:h-52 object-cover rounded-lg" />
              <img src={matIkat} alt="Heritage Lattice Weave Mat" loading="lazy" className="w-full h-40 sm:h-52 object-cover rounded-lg" />
              <img src={matRainbow} alt="Rainbow Cotton Floor Mat" loading="lazy" className="w-full h-40 sm:h-52 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. ZOUK-STYLE SECTION 2: HANDLOOM & VASTHU FLOOR MATS (TABBED LIVE PRODUCT GRID) */}
      <section className="section bg-white !pt-4">
        <div className="page-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <Eyebrow>Woven in Bhavani</Eyebrow>
              <h2 className="font-['Manrope'] text-2xl sm:text-3xl font-extrabold text-[#141414] mt-1.5">
                Handloom &amp; Vasthu Floor Mats
              </h2>
              <p className="text-xs sm:text-sm text-[#66635C] mt-1">
                Thick cotton cords, raised lattice knots, reversible weaves &amp; auspicious Vasthu designs.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F6F3EC] p-1 rounded-full border border-[#E5E0D5] self-start md:self-auto overflow-x-auto no-scrollbar max-w-full">
              {(
                [
                  { id: 'all', label: 'Featured Mats' },
                  { id: 'designer', label: 'Designer Weaves' },
                  { id: 'vasthu', label: 'Vasthu & Traditional' },
                  { id: 'everyday', label: 'Everyday (₹50–₹70)' },
                ] as const
              ).map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMatTab(t.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    matTab === t.id
                      ? 'bg-[#164E33] text-white shadow-xs'
                      : 'text-[#4A4843] hover:text-[#141414]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {visibleMats.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop"
              search={{ category: 'Floor mats' }}
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg border-2 border-[#164E33] text-[#164E33] hover:bg-[#164E33] hover:text-white text-xs font-bold uppercase tracking-[0.1em] transition-all"
            >
              <span>View All {allMats.length} Floor Mats</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BRAND VALUE PILLARS */}
      <EverydayBand />

      {/* 7. REAL MANUFACTURING FACILITY & ESTEEMED JEWELLERY CLIENTS */}
      <section className="section bg-white">
        <div className="page-width">
          <div className="brand-story">
            <div className="relative overflow-hidden rounded-2xl border border-[#EAE6DE] shadow-sm bg-[#F6F3EC]">
              <img
                className="story-photo rounded-2xl"
                src={facilityImg}
                alt="ShreeyaSudarshan Trading Company facility in Bhavani"
                loading="lazy"
                width={1024}
                height={768}
              />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#EAE6DE] text-xs flex items-center justify-between shadow-sm">
                <span className="flex items-center gap-2 font-bold text-[#141414]">
                  <Factory size={15} className="text-[#164E33]" /> Direct Textile &amp; Bag Manufacturing
                </span>
                <span className="text-[10px] uppercase font-bold text-[#164E33] tracking-wider">Bhavani · Erode</span>
              </div>
            </div>

            <div className="story-content">
              <Eyebrow>ShreeyaSudarshan Trading Company</Eyebrow>
              <h2 className="editorial-title">
                Direct from our Bhavani looms to your home &amp; brand.
              </h2>
              <p>
                We specialize in manufacturing <strong>Handloom Floor Mats</strong>, <strong>Cotton Bags</strong>, <strong>Golden Jute Bags</strong>, <strong>Non-Woven Bags</strong>, and <strong>Gada Cloth (20&apos;s)</strong> — serving both retail shoppers and leading jewellery houses across India with custom sizes and consistent quality.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#164E33] hover:bg-[#0E3824] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Our Story &amp; Facility</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#F6F3EC] border border-[#DDD8CE] hover:border-[#164E33] text-[#141414] hover:text-[#164E33] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Request Bulk Quote</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Trusted Jewellery & Brand Clients */}
          <div className="mt-12 pt-9 border-t border-[#EAE6DE]">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#164E33]">
                Trusted Packaging &amp; Textile Partner For
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {trustedClients.map(client => (
                <div
                  key={client.name}
                  className="p-4 rounded-xl bg-[#F6F3EC] border border-[#EAE6DE] flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#164E33] bg-white border border-[#E5E0D5] px-2 py-0.5 rounded">
                      {client.tag}
                    </span>
                    <ShieldCheck size={15} className="text-[#164E33] shrink-0" />
                  </div>
                  <h4 className="font-['Manrope'] text-[13px] font-extrabold text-[#141414] leading-snug mt-1">
                    {client.name}
                  </h4>
                  <span className="text-[11px] text-[#66635C] flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-[#164E33]" /> Verified Client
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
