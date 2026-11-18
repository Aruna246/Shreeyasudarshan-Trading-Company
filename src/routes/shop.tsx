import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { Eyebrow, ProductCollection, EverydayBand } from '@/components/storefront';
import { pageHead } from '@/lib/catalog';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/shop')({
  validateSearch: (search: Record<string, unknown>): { category?: string; q?: string } => {
    const category = search['category'];
    const q = search['q'];
    const result: { category?: string; q?: string } = {};
    if (category === 'Bags' || category === 'Floor mats') {
      result.category = category;
    }
    if (typeof q === 'string' && q.trim()) {
      result.q = q.trim();
    }
    return result;
  },
  head: () =>
    pageHead(
      'The Collection',
      'Explore handcrafted cotton bags, golden jute totes, and Bhavani handloom floor mats by ShreeyaSudarshan Trading Company.'
    ),
  component: Shop,
});

function Shop() {
  const { category, q } = Route.useSearch();

  return (
    <>
      <section className="catalog-heading">
        <img src={logo.url} alt="" aria-hidden="true" />
        <div className="page-width">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-[#66645E] mb-3">
            <Link to="/" className="hover:text-[#164E33] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="font-semibold text-[#121212]">{category ?? (q ? `Search: ${q}` : 'All Collections')}</span>
          </nav>
          <Eyebrow>Direct from Bhavani Handlooms</Eyebrow>
          <h1>{category ?? (q ? `Showing "${q}"` : 'Shop All Essentials')}</h1>
          <p>
            Proudly Indian, 100% eco-friendly bags and handloom floor mats crafted for everyday durability.
          </p>
        </div>
      </section>

      <section className="section page-width !pt-8">
        <ProductCollection key={`${category ?? 'All'}-${q ?? ''}`} filter={category ?? 'All'} initialQuery={q ?? ''} />
        <p className="preview-note mt-10">
          Direct manufacturer catalog · Product imagery, dimensions, and base prices are illustrative for retail &amp; bulk enquiries.
        </p>
      </section>

      <EverydayBand />
    </>
  );
}
