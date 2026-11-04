import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Factory,
  Layers,
  Award,
  Users,
  Compass,
  MapPin,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import { Eyebrow, EverydayBand } from '@/components/storefront';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/catalog';
import facilityImg from '@/assets/company-facility.jpg';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/our-story')({
  head: () =>
    pageHead(
      'Our Heritage & Story | ShreeyaSudarshan Trading Company',
      'Meet ShreeyaSudarshan Trading Company — master manufacturers of handloom floor mats, eco-friendly cotton bags, golden jute bags, non-woven carry bags, and 20’s gada cloth in Bhavani, Tamil Nadu.'
    ),
  component: Story,
});

function Story() {
  const clients = [
    {
      name: 'AVR Swarnamahal Jewelry Ltd',
      tag: 'Jewellery Bags & Pouches',
      desc: 'Exclusive eco-cotton presentation packaging and gold delivery pouches.',
    },
    {
      name: 'Jewel One (Emerald JEWEL Industry)',
      tag: 'Custom Luxury Bags',
      desc: 'High-density unbleached cotton tote bags with silk-screen custom branding.',
    },
    {
      name: 'Kirtilal Kalidas Jewellers Pvt Ltd',
      tag: 'Velvet & Cloth Pouches',
      desc: 'Precision stitched custom cloth sleeves and display bags.',
    },
    {
      name: 'Thangamayil Jewellery Pvt Ltd',
      tag: 'Showroom Carry Bags',
      desc: 'High-durability laminated jute and handloom bags for retail showrooms.',
    },
  ];

  const milestones = [
    {
      year: 'Heritage',
      title: 'Roots in Bhavani’s Handloom Capital',
      desc: 'Bhavani in Erode district has centuries of handloom reputation. Our artisans learned their craft on traditional wooden looms passed down through generations.',
    },
    {
      year: 'Evolution',
      title: 'Transition to Sustainable Eco-Packaging',
      desc: 'Anticipating the need to eliminate single-use plastics, we developed dedicated production lines for unbleached cotton carry bags and golden jute totes.',
    },
    {
      year: 'Milestone',
      title: 'Packaging Partner to Gold & Jewellery Leaders',
      desc: 'Honored with contracts from India’s top jewellery houses, earning trust for consistent weave density, flawless stitching, and on-time dispatch.',
    },
    {
      year: 'Today',
      title: 'Pan-India Reach & Modern Handloom Center',
      desc: 'Operating a modern weaving and tailoring facility producing over 50,000 bags and handloom mats monthly, serving homeowners and businesses nationwide.',
    },
  ];

  return (
    <>
      {/* Editorial Header */}
      <section className="catalog-heading">
        <img src={logo.url} alt="" aria-hidden="true" />
        <Eyebrow>ShreeyaSudarshan Trading Company · Bhavani</Eyebrow>
        <h1>Crafted with Heritage &amp; Care.</h1>
        <p>Eco-Friendly Textile &amp; Bag Manufacturers · Bhavani, Tamil Nadu</p>
      </section>

      {/* Main Facility Showcase & Story */}
      <section className="section page-width brand-story">
        <div className="relative group overflow-hidden rounded-2xl border border-border shadow-md">
          <img
            src={facilityImg}
            className="story-photo rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
            alt="ShreeyaSudarshan Trading Company manufacturing facility"
            width={1024}
            height={768}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md px-4 py-3 rounded-xl border border-border/80 text-xs flex items-center justify-between">
            <span className="font-semibold text-foreground flex items-center gap-2">
              <Factory size={16} className="text-primary" /> Active Manufacturing Facility
            </span>
            <span className="text-muted-foreground font-medium">Bhavani, Erode District</span>
          </div>
        </div>

        <div className="story-content">
          <Eyebrow>About Us</Eyebrow>
          <h2 className="editorial-title">
            We are ShreeyaSudarshan<br />
            <em>Trading Company.</em>
          </h2>
          <p>
            We are engaged with all types of textile products with high specialization in <strong>Handloom Floor Mats</strong>, <strong>Cotton Carry Bags</strong>, <strong>Gada Cloth (20&apos;s)</strong>, and all types of cloth fabrics.
          </p>
          <p>
            From raw eco-conscious fabrics to intricately finished bags and handloom mats, we take immense pride in delivering dependable, sustainable, and tailored products across India.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="editorial" asChild>
              <Link to="/shop">
                Explore the Collection <ArrowRight size={14} />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact-us">
                Request Facility Tour / Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="section !py-12 bg-secondary/70 border-y border-border/70">
        <div className="page-width">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-primary">30+</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                Years of Handloom Craft
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-primary">100+</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                Artisans &amp; Master Weavers
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-primary">50,000+</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                Units Monthly Capacity
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-primary">100%</div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                Biodegradable &amp; Eco-Focus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Manufacture */}
      <section className="section page-width">
        <div className="section-title">
          <div>
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2>What We Manufacture</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Precision craftsmanship meets sustainable production across specialized textile divisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Floor Mats Card */}
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Building2 size={22} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Handloom Floor Mats &amp; Rugs</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                We manufacture all types of <strong>Handloom Floor Mats</strong> and <strong>Cotton Rugs</strong> with customized designs, geometric lattice, chenille tufts, and tailor-made dimensions.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary font-semibold pt-4 border-t border-border/60">
              <CheckCircle2 size={15} /> Supplying leading brand companies all over India.
            </div>
          </div>

          {/* Bags Card */}
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Sparkles size={22} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Cotton, Jute &amp; Non-Woven Bags</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                Specialized in manufacturing <strong>Cotton Bags</strong>, <strong>Non-Woven Bags</strong>, and <strong>Golden Jute Bags</strong> specially engineered for jewellery companies and upscale retail boutiques.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary font-semibold pt-4 border-t border-border/60">
              <CheckCircle2 size={15} /> Custom logo printing &amp; reinforced handles.
            </div>
          </div>

          {/* Gada Cloth & Fabrics Card */}
          <div className="p-8 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Layers size={22} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-3">Gada Cloth (20&apos;s) &amp; Fabrics</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                We produce high-grade raw <strong>Gada Cloth (20&apos;s count)</strong>, unbleached natural calico, and custom cloth fabrics for commercial stitching, packaging, and industrial needs.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary font-semibold pt-4 border-t border-border/60">
              <CheckCircle2 size={15} /> Available in bulk rolls &amp; cut lengths.
            </div>
          </div>
        </div>
      </section>

      {/* Our Heritage Timeline */}
      <section className="section bg-secondary/50 border-y border-border">
        <div className="page-width">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow className="justify-center">Our Journey</Eyebrow>
            <h2 className="editorial-title text-3xl sm:text-4xl mt-2">The Weaving Heritage</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Four chapters in our commitment to sustainable craftsmanship in Bhavani.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-background rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#c59b48] tracking-widest uppercase">
                    {m.year}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-foreground mt-2 leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestigious Clients Section */}
      <section className="section page-width">
        <div className="text-center max-w-xl mx-auto mb-10">
          <Eyebrow className="justify-center">Trusted Partnerships</Eyebrow>
          <h2 className="editorial-title text-3xl sm:text-4xl mt-2">Our Esteemed Clients</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Trusted by leading jewellery houses across South India and nationwide for packaging excellence and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="bg-card border border-border p-6 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {client.tag}
                </span>
                <h4 className="font-serif text-lg font-semibold text-foreground mt-4 leading-snug">
                  {client.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {client.desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-5 pt-3 border-t border-border/60">
                <ShieldCheck size={15} className="text-primary" /> Verified Brand Partner
              </div>
            </div>
          ))}
        </div>
      </section>

      <EverydayBand />
    </>
  );
}
