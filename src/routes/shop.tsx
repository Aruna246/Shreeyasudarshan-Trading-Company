import { createFileRoute } from '@tanstack/react-router';
import { Eyebrow, ProductCollection } from '@/components/storefront';
import { pageHead } from '@/lib/catalog';
import { Leaf, Award, Truck, Sparkles } from 'lucide-react';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/shop')({
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    const category = search['category'];
    return category === 'Bags' || category === 'Floor mats' ? { category } : {};
  },
  head: () =>
    pageHead(
      'The Handcrafted Collection',
      'Explore pure cotton bags, biodegradable jute totes, and master handloom floor mats manufactured by ShreeyaSudarshan Trading Company in Bhavani.'
    ),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();

  return (
    <>
      <section className="catalog-heading">
        <img src={logo.url} alt="" aria-hidden="true" />
        <Eyebrow>The Considered Collection</Eyebrow>
        <h1>{category ? `${category} Collection` : 'Everyday Handcrafted Essentials'}</h1>
        <p>
          Thoughtful bags for the places you go. Enduring handloom mats for the place you call home.
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 max-w-2xl mx-auto px-4 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1.5 bg-background/80 px-3 py-1.5 rounded-full border border-border/80 shadow-xs">
            <Leaf size={14} className="text-emerald-700" /> 100% Natural Fibers
          </span>
          <span className="flex items-center gap-1.5 bg-background/80 px-3 py-1.5 rounded-full border border-border/80 shadow-xs">
            <Award size={14} className="text-[#c59b48]" /> Bhavani Master Looms
          </span>
          <span className="flex items-center gap-1.5 bg-background/80 px-3 py-1.5 rounded-full border border-border/80 shadow-xs">
            <Truck size={14} className="text-primary" /> Free Pan-India Delivery
          </span>
        </div>
      </section>

      <section className="section page-width !pt-10">
        <ProductCollection key={category ?? 'All'} filter={category ?? 'All'} />

        <div className="mt-14 p-6 rounded-2xl bg-secondary/60 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground">Need Custom Sizing or Bulk Quantities?</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              We weave customized floor mat runners and print company branding logos on carry bags starting from 50 pcs.
            </p>
          </div>
          <a
            href="https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan,%20I%20want%20to%20enquire%20about%20custom%20sizes%20and%20bulk%20orders."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-none bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shrink-0"
          >
            Chat with Master Weaver
          </a>
        </div>
      </section>
    </>
  );
}
