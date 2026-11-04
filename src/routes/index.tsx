import { useState } from 'react';
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
  ShoppingBag,
  MessageCircle,
  Truck,
  Leaf,
  Star,
  Users,
  Compass,
  Check,
  Building2,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, EverydayBand, ProductCard, useStore } from '@/components/storefront';
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
  const { products } = useStore();

  const spotlightMats = [
    {
      id: 'heritage-lattice',
      title: 'Heritage Raised Lattice',
      type: 'Heavy Handloom Cord',
      desc: 'Plush crimson, turquoise and gold geometric knots designed for long-lasting doorstep comfort.',
      image: matIkat,
      accent: 'Artisan Favorite',
      placement: 'Main Entrance & Living Foyer',
      yarn: '100% Ring-Spun Cotton Cord',
    },
    {
      id: 'jaipur-diamond',
      title: 'Jaipur Diamond Fringe',
      type: 'Jewel-Tone Micro Weave',
      desc: 'Intricate geometric diamond weaves finished with hand-braided vibrant tassels.',
      image: matDiamond,
      accent: 'Signature Fringes',
      placement: 'Bedroom & Pooja Room Accent',
      yarn: 'Multi-Tone Handloom Thread',
    },
    {
      id: 'pastel-shag',
      title: 'Pastel Chenille Shag',
      type: 'Multi-Textured Tuft',
      desc: 'Alternating cloud-soft ridges of blush, gold, terracotta, olive and indigo.',
      image: matShag,
      accent: 'Ultra Soft',
      placement: 'Bedside & Reading Nook',
      yarn: 'Velvet Chenille & Cotton Blend',
    },
    {
      id: 'modern-grid',
      title: 'Modern Dual-Grid',
      type: 'Structured Weave',
      desc: 'Crisp two-tone textural checkerboard weave built for high-traffic zones and effortless washing.',
      image: matGrid,
      accent: 'Modern Living',
      placement: 'Kitchen, Patio & High-Traffic Hall',
      yarn: 'Heavy-Duty 20’s Gada Weave',
    },
    {
      id: 'ribbed-solid',
      title: 'Ribbed Cotton Soles',
      type: 'Pure Cotton Rib',
      desc: 'Durable solid bands in rich jewel tones: emerald teal, royal violet, and scarlet.',
      image: matRibbon,
      accent: 'Everyday Classic',
      placement: 'Bathroom Threshold & Balcony',
      yarn: 'Absorbent Twisted Cotton Yarn',
    },
  ];

  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const current = spotlightMats[activeSpotlight];

  // Bulk Enquiry Calculator State
  const [calcProduct, setCalcProduct] = useState('Cotton Carry Bags');
  const [calcQty, setCalcQty] = useState(250);
  const [calcCustomLogo, setCalcCustomLogo] = useState(true);

  // Curated Bestsellers (top 4 items)
  const bestsellers = products.slice(0, 4);

  return (
    <>
      {/* Luxury Opening Brand Presentation */}
      <div className="opening" aria-hidden="true">
        <div className="opening-identity">
          <img src={logo.url} alt="" width={260} height={255} />
          <div className="opening-name">ShreeyaSudarshan</div>
          <div className="opening-company">Trading Company · Bhavani</div>
          <span className="opening-rule" />
          <p>Master Handloom Floor Mats &amp; Eco-Bags</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <img
          className="hero-image"
          src={hero}
          alt="Natural canvas bag and floor mat in a sunlit living space"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="hero-content page-width">
          <div className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-primary/20 shadow-sm text-xs text-primary font-semibold tracking-wide mb-3">
            <Sparkles size={13} className="text-[#c59b48]" />
            <span>100% Eco-Friendly Handloom &amp; Textile Manufacturer · Bhavani</span>
          </div>

          <h1>
            Rooted in heritage.<br />
            Woven for everyday.<br />
            <em>Conscious living, elevated.</em>
          </h1>

          <p className="hero-copy">
            Discover authentic handloom floor mats and biodegradable cotton &amp; jute bags. Crafted with generations of weaving expertise in Bhavani, Tamil Nadu.
          </p>

          <div className="hero-actions">
            <Button variant="editorial" className="h-12 px-7 text-xs font-semibold shadow-md" asChild>
              <Link to="/shop">
                Explore Full Collection <ArrowRight size={15} />
              </Link>
            </Button>
            <Button variant="outline" className="h-12 px-6 text-xs font-semibold rounded-none border-foreground hover:bg-foreground hover:text-background transition-all" asChild>
              <Link to="/contact-us">
                Bulk &amp; Custom Enquiries <MoveUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="hero-pagination">
          01 <span /> THE BHAVANI EDIT
        </div>
        <div className="hero-caption">Direct Factory Manufacturing · Est. Bhavani</div>
      </section>

      {/* Trust & Craft Matrix Band */}
      <EverydayBand />

      {/* Category Dual Portal */}
      <section className="section page-width">
        <div className="section-title">
          <div>
            <Eyebrow>Two Worlds. One Handcrafted Soul.</Eyebrow>
            <h2>For You. For Your Home.</h2>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block max-w-xs text-right">
            Handcrafted with pure cotton, biodegradable jute, and authentic handlooms.
          </span>
        </div>

        <div className="category-grid">
          <Link to="/shop" search={{ category: 'Bags' }} className="category bag-category" aria-label="Explore bags">
            <img src={tote} alt="Forest green and natural canvas bag" loading="lazy" width={1024} height={1024} />
            <div className="category-copy">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-200 font-semibold block mb-1">
                  11+ Eco Styles
                </span>
                <h3>Bags</h3>
                <p>Jute totes, cotton carry bags &amp; jewellery pouches.</p>
              </div>
              <span className="category-arrow">
                <MoveUpRight size={20} />
              </span>
            </div>
          </Link>

          <Link to="/shop" search={{ category: 'Floor mats' }} className="category mat-category" aria-label="Explore floor mats">
            <img src={matIkat} alt="Handloom raised floor mat" loading="lazy" width={1024} height={1024} />
            <div className="category-copy">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-200 font-semibold block mb-1">
                  15+ Master Weaves
                </span>
                <h3>Floor mats</h3>
                <p>Heavy raised lattice, chenille tufts &amp; doorway runners.</p>
              </div>
              <span className="category-arrow">
                <MoveUpRight size={20} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* CURATED BESTSELLERS SHOWCASE */}
      <section className="section page-width !pt-0">
        <div className="section-title">
          <div>
            <Eyebrow>Curated Bestsellers</Eyebrow>
            <h2>Essential Favourites</h2>
            <p>Our most cherished everyday handloom bags and doorstep floor mats.</p>
          </div>
          <Button variant="understated" asChild>
            <Link to="/shop">
              View All {products.length} Products <ArrowRight size={14} />
            </Link>
          </Button>
        </div>

        <div className="product-grid">
          {bestsellers.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* INTERACTIVE TEXTILE & WEAVE STUDIO (LOOKBOOK) */}
      <section className="section collection-band border-y border-border/70">
        <div className="page-width">
          <div className="section-title items-start">
            <div>
              <Eyebrow>Textile Craft &amp; Weaving Studio</Eyebrow>
              <h2>The Floor Mat Lookbook</h2>
              <p>Explore the tangible texture, hand-spun cord, and distinctive weaves of our Bhavani workshop.</p>
            </div>
            <Button variant="editorial" asChild>
              <Link to="/shop" search={{ category: 'Floor mats' }}>
                View All Mats in Catalog <ArrowRight size={14} />
              </Link>
            </Button>
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
                    className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-background border-primary/60 shadow-md ring-1 ring-primary/20 scale-[1.01]'
                        : 'bg-card/70 border-border/70 hover:bg-background/90 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-border/80 flex-shrink-0 bg-paper">
                        <img src={mat.image} alt={mat.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-semibold leading-tight text-foreground">
                          {mat.title}
                        </h4>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          {mat.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                        {mat.accent}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          isActive ? 'text-primary translate-x-1' : 'text-muted-foreground/50'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Showcase Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg bg-background group">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-radial from-background to-paper flex items-center justify-center p-3 sm:p-5">
                  <img
                    src={current.image}
                    alt={current.title}
                    key={current.id}
                    className="w-full h-full object-cover rounded-xl shadow-inner transition-all duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6 sm:p-8 border-t border-border/70 bg-card/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-primary bg-primary/10 px-2.5 py-1 rounded">
                        {current.accent}
                      </span>
                      <span className="text-xs text-muted-foreground">· {current.type}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-2 text-foreground">
                      {current.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-md leading-relaxed">
                      {current.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                      <span className="bg-secondary px-2.5 py-0.5 rounded-md font-medium text-foreground">
                        Yarn: {current.yarn}
                      </span>
                      <span className="bg-secondary px-2.5 py-0.5 rounded-md font-medium text-foreground">
                        Ideal: {current.placement}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button variant="editorial" asChild>
                      <Link to="/shop" search={{ category: 'Floor mats' }}>
                        Shop Collection <ArrowRight size={14} />
                      </Link>
                    </Button>
                    <a
                      href={`https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan,%20I%20am%20interested%20in%20custom%20order%20for%20${encodeURIComponent(current.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-xs font-medium text-emerald-700 hover:underline flex items-center justify-center gap-1 mt-1"
                    >
                      <MessageCircle size={13} /> Custom Size Enquiry
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/60">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Factory size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Direct Mill Manufacturing</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Crafted in-house from high-grade cotton and 20&apos;s gada cloth threads with zero third-party markups.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Custom Sizing &amp; Patterns</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  From residential doorways to large retail runners and bulk corporate packaging, customized solutions are our specialty.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">Trusted by Leading Brands</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Trusted packaging supplier to premiere jewellery and retail brands across India with verified quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTIGIOUS CLIENT PARTNERSHIPS */}
      <section className="section page-width !py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Eyebrow className="justify-center">Trusted Craftsmanship</Eyebrow>
          <h2 className="editorial-title text-3xl sm:text-4xl mt-3">
            Supplying India&apos;s Finest Jewellery Houses
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            We manufacture bespoke jewellery packaging bags, pouches, and showroom floor mats for elite brands across South India.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'AVR Swarnamahal Jewelry Ltd', role: 'Jewellery Bags & Velvet Pouches' },
            { name: 'Jewel One (Emerald JEWEL)', role: 'Eco-Cotton Packaging' },
            { name: 'Kirtilal Kalidas Jewellers', role: 'Premium Fabric Pouches' },
            { name: 'Thangamayil Jewellery Ltd', role: 'Showroom Bags & Runners' },
          ].map((client, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm text-center flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[#123826]/10 text-[#123826] mx-auto flex items-center justify-center mb-3">
                <Building2 size={18} />
              </div>
              <h4 className="font-serif text-base font-semibold text-foreground">{client.name}</h4>
              <p className="text-[11px] text-muted-foreground mt-1.5">{client.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE WHOLESALE / BULK ESTIMATOR */}
      <section className="section collection-band border-y border-border/70 !py-16">
        <div className="page-width">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>Direct Manufacturer Wholesale</Eyebrow>
              <h2 className="editorial-title mt-2">Planning a Bulk Order?</h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Whether you need 100 custom-printed cotton bags for a boutique, 500 jewellery pouches for a wedding, or 250 heavy handloom floor mats for a retail chain — we offer mill-direct pricing with custom branding.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Custom silk-screen and offset brand logo printing</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Custom dimension weaving and tailored GSM fabric weights</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground font-medium">
                  <CheckCircle2 size={16} className="text-primary" />
                  <span>Pan-India transport dispatch with transit insurance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-lg">
              <h3 className="font-serif text-2xl font-semibold mb-1">Quick Wholesale Estimator</h3>
              <p className="text-xs text-muted-foreground mb-6">Select your requirements to view direct mill estimates.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1.5">
                    Product Category
                  </label>
                  <select
                    value={calcProduct}
                    onChange={e => setCalcProduct(e.target.value)}
                    className="w-full border border-border rounded-lg px-3.5 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Cotton Carry Bags">Handloom Cotton Carry Bags</option>
                    <option value="Jute Totes">Eco Golden Jute Shopping Totes</option>
                    <option value="Raised Lattice Mats">Raised Lattice Handloom Floor Mats</option>
                    <option value="Chenille Rugs">Chenille Shag &amp; Bedside Rugs</option>
                    <option value="Jewellery Pouches">Custom Fabric Jewellery Pouches</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    <span>Order Quantity</span>
                    <span className="text-primary font-bold">{calcQty} Units</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={calcQty}
                    onChange={e => setCalcQty(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>50 pcs</span>
                    <span>250 pcs</span>
                    <span>500 pcs</span>
                    <span>1,000+ pcs</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/70 border border-border text-xs">
                  <span className="font-medium text-foreground">Include Custom Logo / Monogram Printing?</span>
                  <input
                    type="checkbox"
                    checked={calcCustomLogo}
                    onChange={e => setCalcCustomLogo(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#123826] text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-200 uppercase tracking-wider block font-semibold">
                      Estimated Wholesale Price
                    </span>
                    <span className="text-2xl font-serif font-bold">
                      {calcProduct.includes('Bags') || calcProduct.includes('Pouches')
                        ? `₹${(calcQty * 45).toLocaleString('en-IN')} - ₹${(calcQty * 85).toLocaleString('en-IN')}`
                        : `₹${(calcQty * 180).toLocaleString('en-IN')} - ₹${(calcQty * 320).toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan,%20I%20would%20like%20a%20bulk%20quote%20for%20${calcQty}%20units%20of%20${encodeURIComponent(calcProduct)}%20${calcCustomLogo ? 'with%20custom%20logo%20printing' : 'plain'}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-[#25d366] text-white font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#20ba59] transition-colors"
                  >
                    <MessageCircle size={15} /> Get Quote on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand & Purpose Section */}
      <section className="section page-width brand-story">
        <div className="relative group overflow-hidden rounded-2xl border border-border shadow-md">
          <img
            className="story-photo rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            src={facilityImg}
            alt="ShreeyaSudarshan Trading Company facility"
            loading="lazy"
            width={1024}
            height={768}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md px-4 py-3 rounded-xl border border-border text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={16} className="text-primary" /> Bhavani Weaving Sheds &amp; Facility
            </span>
            <span className="text-muted-foreground text-[11px]">Eco-Textiles Since Inception</span>
          </div>
        </div>

        <div className="story-content">
          <Eyebrow>ShreeyaSudarshan Trading Company</Eyebrow>
          <h2 className="editorial-title">
            Rooted in purpose.<br />
            <em>Woven into your everyday.</em>
          </h2>
          <p>
            Some things just belong. The bag you reach for every morning. The mat that greets your doorstep with warmth. We craft these everyday essentials with generations of handloom mastery, unbleached cotton, and biodegradable fibers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="editorial" asChild>
              <Link to="/our-story">
                Our Weaving Story <ArrowRight size={14} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact-us">
                Visit Our Facility <MoveUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="closing-band">
        <Eyebrow>Make Room for Conscious Living</Eyebrow>
        <h2>A little more character. A little more you.</h2>
        <p>Pure handloom floor mats and sustainable cotton bags crafted for modern homes.</p>
        <Button variant="editorial" className="h-12 px-8 text-xs font-semibold" asChild>
          <Link to="/shop">
            Discover Your Favourites <ArrowRight size={14} />
          </Link>
        </Button>
      </section>
    </>
  );
}
