import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Sparkles, Building2, CheckCircle2, ShieldCheck, Factory } from 'lucide-react';
import { Eyebrow, EverydayBand } from '@/components/storefront';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/catalog';
import facilityImg from '@/assets/company-facility.jpg';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/our-story')({
  head: () =>
    pageHead(
      'Our Story',
      'Meet ShreeyaSudarshan Trading Company — manufacturers of eco-friendly cotton bags, jute bags, non-woven bags, handloom floor mats, and gada cloth.'
    ),
  component: Story,
});

function Story() {
  const clients = [
    { name: 'AVR Swarnamahal Jewelry Ltd', tag: 'Jewellery Bags' },
    { name: 'Jewel One (Emerald JEWEL Industry India Ltd)', tag: 'Custom Packaging' },
    { name: 'Kirtilal Kalidas Jewellers Pvt Ltd', tag: 'Premium Pouches' },
    { name: 'Thangamayil Jewellery Pvt Ltd', tag: 'Jewellery Bags' },
  ];

  return (
    <>
      {/* Heading Header */}
      <section className="catalog-heading">
        <img src={logo.url} alt="" aria-hidden="true" />
        <Eyebrow>ShreeyaSudarshan Trading Company</Eyebrow>
        <h1>Crafted with Heritage &amp; Care.</h1>
        <p>Eco-Friendly Textile &amp; Bag Manufacturers · Quality That Endures</p>
      </section>

      {/* Hero Showcase with Company Building Photo */}
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
              <Factory size={16} className="text-primary" /> Manufacturing Facility
            </span>
            <span className="text-muted-foreground font-medium">Eco-Friendly Textile &amp; Bags</span>
          </div>
        </div>

        <div className="story-content">
          <Eyebrow>About Us</Eyebrow>
          <h2 className="editorial-title">
            We are ShreeyaSudarshan<br />
            <em>Trading Company.</em>
          </h2>
          <p>
            We are engaged with all types of textile products with high specialization in <strong>Floor Mats</strong>, <strong>Cotton Bags</strong>, <strong>Gada Cloth (20&apos;s)</strong>, and all types of cloth fabrics.
          </p>
          <p>
            From raw eco-conscious fabrics to intricately finished bags and handloom mats, we take pride in delivering dependable, sustainable, and tailored products across India.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#D15608] hover:bg-[#9F160A] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-sm active:scale-98"
            >
              <span>Explore the collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Manufacturing Divisions */}
      <section className="section page-width !pt-0">
        <div className="section-title">
          <div>
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2>What We Manufacture</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Precision craftsmanship meets sustainable production across specialized departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Floor Mats Card */}
          <div className="p-8 rounded-2xl border border-[rgba(14,14,14,0.08)] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-[#D15608]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#D15608]/10 text-[#D15608] flex items-center justify-center mb-5">
              <Building2 size={22} />
            </div>
            <h3 className="font-['Manrope'] text-xl font-bold uppercase tracking-tight mb-3">Handloom Floor Mats &amp; Rugs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We manufacture all types of <strong>Handloom Floor Mats</strong> and <strong>Cotton Rugs</strong> with customized designs, patterns, and dimensions.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D15608] font-semibold">
              <CheckCircle2 size={15} /> Supplying to leading brand companies all over India.
            </div>
          </div>

          {/* Bags & Fabric Card */}
          <div className="p-8 rounded-2xl border border-[rgba(14,14,14,0.08)] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-[#D15608]/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#D15608]/10 text-[#D15608] flex items-center justify-center mb-5">
              <Sparkles size={22} />
            </div>
            <h3 className="font-['Manrope'] text-xl font-bold uppercase tracking-tight mb-3">Cotton, Jute &amp; Non-Woven Bags</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A premier manufacturing company supplying all types of <strong>Cotton Bags</strong>, <strong>Non-Woven Bags</strong>, and <strong>Jute Bags</strong> specially engineered for jewellery companies and upscale retail brands.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D15608] font-semibold">
              <CheckCircle2 size={15} /> Specialists in Gada Cloth (20&apos;s) &amp; tailored cloth fabrics.
            </div>
          </div>
        </div>
      </section>

      {/* Prestigious Clients Section */}
      <section className="section bg-[#FAF7F2] border-y border-[rgba(14,14,14,0.08)]">
        <div className="page-width">
          <div className="text-center max-w-xl mx-auto mb-10">
            <Eyebrow className="justify-center">Trusted Partnerships</Eyebrow>
            <h2 className="font-['Manrope'] text-2xl md:text-3xl font-bold uppercase tracking-tight mt-2">Our Esteemed Clients</h2>
            <p className="text-sm text-muted-foreground mt-3">
              Trusted by leading jewellery houses across South India and nationwide for packaging excellence and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="bg-white border border-[rgba(14,14,14,0.08)] p-6 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#D15608]/40 transition-all"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D15608] bg-[#D15608]/10 px-2.5 py-1 rounded-full">
                    {client.tag}
                  </span>
                  <h4 className="font-['Manrope'] text-base font-bold text-foreground mt-4 leading-snug">
                    {client.name}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-4 pt-3 border-t border-[rgba(14,14,14,0.06)]">
                  <ShieldCheck size={14} className="text-[#D15608]" /> Verified Partner
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EverydayBand />
    </>
  );
}
