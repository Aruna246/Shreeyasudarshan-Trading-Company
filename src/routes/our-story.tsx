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
        <div className="relative group overflow-hidden rounded-xl border border-border shadow-sm">
          <img
            src={facilityImg}
            className="story-photo rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
            alt="ShreeyaSudarshan Trading Company manufacturing facility"
            width={1024}
            height={768}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md px-4 py-3 rounded-lg border border-border/80 text-xs flex items-center justify-between">
            <span className="font-medium text-foreground flex items-center gap-2">
              <Factory size={16} className="text-primary" /> Manufacturing Facility
            </span>
            <span className="text-muted-foreground">Eco-Friendly Textile &amp; Bags</span>
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
            <Button variant="editorial" asChild>
              <Link to="/shop">
                Explore the collection <ArrowRight />
              </Link>
            </Button>
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
          <div className="p-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
              <Building2 size={20} />
            </div>
            <h3 className="font-serif text-2xl font-medium mb-3">Handloom Floor Mats &amp; Rugs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We manufacture all types of <strong>Handloom Floor Mats</strong> and <strong>Cotton Rugs</strong> with customized designs, patterns, and dimensions.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <CheckCircle2 size={15} /> Supplying to leading brand companies all over India.
            </div>
          </div>

          {/* Bags & Fabric Card */}
          <div className="p-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
              <Sparkles size={20} />
            </div>
            <h3 className="font-serif text-2xl font-medium mb-3">Cotton, Jute &amp; Non-Woven Bags</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A premier manufacturing company supplying all types of <strong>Cotton Bags</strong>, <strong>Non-Woven Bags</strong>, and <strong>Jute Bags</strong> specially engineered for jewellery companies and upscale retail brands.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <CheckCircle2 size={15} /> Specialists in Gada Cloth (20&apos;s) &amp; tailored cloth fabrics.
            </div>
          </div>
        </div>
      </section>

      {/* Prestigious Clients Section */}
      <section className="section bg-secondary/50 border-y border-border">
        <div className="page-width">
          <div className="text-center max-w-xl mx-auto mb-10">
            <Eyebrow className="justify-center">Trusted Partnerships</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mt-2">Our Esteemed Clients</h2>
            <p className="text-sm text-muted-foreground mt-3">
              Trusted by leading jewellery houses across South India and nationwide for packaging excellence and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="bg-background border border-border p-6 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                    {client.tag}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-foreground mt-4 leading-snug">
                    {client.name}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-4 pt-3 border-t border-border/60">
                  <ShieldCheck size={14} className="text-primary" /> Verified Partner
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