import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, MoveUpRight, Sparkles, Layers, ShieldCheck, Factory, Award, CheckCircle2, ChevronRight } from 'lucide-react';
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

  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const current = spotlightMats[activeSpotlight];

  return (
    <>
      <div className="opening" aria-hidden="true">
        <div className="opening-identity">
          <img src={logo.url} alt="" width={260} height={255} />
          <div className="opening-name">ShreeyaSudarshan</div>
          <div className="opening-company">Trading Company</div>
          <span className="opening-rule" />
          <p>Bags &amp; floor mats</p>
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
          <Eyebrow>Rooted in nature. Made for life.</Eyebrow>
          <h1>
            Thoughtful bags.<br />
            Beautiful spaces.<br />
            <em>Everyday, elevated.</em>
          </h1>
          <p className="hero-copy">
            Carry a little character. Bring a little warmth home.<br />
            Discover handloom floor mats and eco-friendly bags crafted with precision.
          </p>
          <div className="hero-actions">
            <Button variant="editorial" asChild>
              <Link to="/shop">
                Explore the collection <ArrowRight />
              </Link>
            </Button>
            <Button variant="understated" asChild>
              <Link to="/our-story">
                The story behind us <MoveUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="hero-pagination">01 <span /> THE EVERYDAY EDIT</div>
        <div className="hero-caption">From your doorstep to your next adventure</div>
      </section>

      <EverydayBand />

      {/* Category Dual Portal */}
      <section className="section page-width">
        <div className="section-title">
          <div>
            <Eyebrow>Two worlds. One thoughtful touch.</Eyebrow>
            <h2>For you. For your home.</h2>
          </div>
          <span className="text-[11px] text-muted-foreground hidden sm:block">
            Find beauty in the things you use most.
          </span>
        </div>
        <div className="category-grid">
          <Link to="/shop" search={{ category: 'Bags' }} className="category bag-category" aria-label="Explore bags">
            <img src={tote} alt="Forest green and natural canvas bag" loading="lazy" width={1024} height={1024} />
            <div className="category-copy">
              <div>
                <h3>Bags</h3>
                <p>Your everyday, well carried.</p>
              </div>
              <span className="category-arrow">
                <MoveUpRight size={18} />
              </span>
            </div>
          </Link>
          <Link to="/shop" search={{ category: 'Floor mats' }} className="category mat-category" aria-label="Explore floor mats">
            <img src={matIkat} alt="Handloom raised floor mat" loading="lazy" width={1024} height={1024} />
            <div className="category-copy">
              <div>
                <h3>Floor mats</h3>
                <p>A warm welcome starts here.</p>
              </div>
              <span className="category-arrow">
                <MoveUpRight size={18} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* UNIQUE ALTERNATIVE FEATURE: Interactive Textile & Texture Studio Spotlight */}
      <section className="section collection-band border-y border-border/60">
        <div className="page-width">
          <div className="section-title items-start">
            <div>
              <Eyebrow>Textile Craft &amp; Weaving</Eyebrow>
              <h2>The Floor Mat Lookbook</h2>
              <p>Explore the tangible texture, hand-dyed yarns, and distinctive weaves of our workshop.</p>
            </div>
            <Button variant="understated" asChild>
              <Link to="/shop" search={{ category: 'Floor mats' }}>
                View in Catalog <ArrowRight />
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
                        ? 'bg-background border-primary/50 shadow-md ring-1 ring-primary/20 scale-[1.02]'
                        : 'bg-card/60 border-border/70 hover:bg-background/80 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-border/80 flex-shrink-0 bg-paper">
                        <img src={mat.image} alt={mat.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base font-semibold leading-tight text-foreground">
                            {mat.title}
                          </h4>
                        </div>
                        <span className="text-[11px] text-muted-foreground block mt-0.5">
                          {mat.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-medium tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full hidden sm:inline-block">
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

            {/* Stage Showcase Showcase Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg bg-background group">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-radial from-background to-paper flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={current.image}
                    alt={current.title}
                    key={current.id}
                    className="w-full h-full object-cover rounded-xl shadow-inner transition-all duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 sm:p-8 border-t border-border/70 bg-card/70 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                  </div>
                  <Button variant="editorial" className="self-start sm:self-center shrink-0" asChild>
                    <Link to="/shop" search={{ category: 'Floor mats' }}>
                      Shop this style <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Pillars Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/60">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Factory size={18} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">Direct Mill Manufacturing</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Crafted in-house from high-grade cotton and gada cloth threads with zero third-party markups.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Layers size={18} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">Custom Sizing &amp; Patterns</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  From residential doorways to large retail runners, customized woven solutions are available.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">Trusted by Leading Brands</h4>
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
        <div className="relative group overflow-hidden rounded-xl border border-border">
          <img
            className="story-photo rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
            src={facilityImg}
            alt="ShreeyaSudarshan Trading Company facility"
            loading="lazy"
            width={1024}
            height={768}
          />
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-border text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="text-primary" />
            <span>Eco-Friendly Textile &amp; Bag Manufacturers</span>
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
            <Button variant="understated" asChild>
              <Link to="/our-story">
                Get to know our story <ArrowRight />
              </Link>
            </Button>
            <Button variant="editorial" asChild>
              <Link to="/shop">
                Explore Full Catalog <Sparkles size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="closing-band">
        <Eyebrow>Make room for the everyday</Eyebrow>
        <h2 className="mt-4">A little more character. A little more you.</h2>
        <p>Find something for wherever life takes you.</p>
        <Button variant="editorial" asChild>
          <Link to="/shop">
            Discover your favourites <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
