import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Factory,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { Eyebrow, EverydayBand } from '@/components/storefront';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/catalog';
import { toast } from 'sonner';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/contact-us')({
  head: () =>
    pageHead(
      'Contact Us & Bulk Enquiries | ShreeyaSudarshan Trading Company',
      'Get in touch with ShreeyaSudarshan Trading Company in Bhavani, Erode. Quality handloom floor mats, cotton carry bags, jute totes, and custom jewellery packaging.'
    ),
  component: ContactUs,
});

function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'Jute Fashion Bags',
    quantity: '250',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    toast.success('Enquiry submitted successfully!', {
      description: 'Our Bhavani dispatch desk will contact you within 24 hours.',
    });
  };

  const faqs = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) for custom-printed bags?',
      a: 'For custom brand printing on cotton and jute bags, our starting MOQ is just 50 pieces. For unprinted plain bags, you can purchase as few as 10 units directly.',
    },
    {
      q: 'Can you print metallic gold / jewellery logos on packaging bags?',
      a: 'Yes! We specialize in high-definition screen printing, metallic gold foil stamping, and offset print on cotton, non-woven, and jute bags specifically for jewellery houses and luxury retailers.',
    },
    {
      q: 'Do you weave customized dimensions and runners for floor mats?',
      a: 'Absolutely. We operate pit and frame looms in Bhavani capable of weaving custom widths and lengths for temple halls, hotel lobbies, residential corridors, and doorway mats.',
    },
    {
      q: 'How does shipping and delivery work across India?',
      a: 'We partner with reliable surface and express logistics carriers with transit tracking across all Indian states and pin codes. Standard delivery takes 3 to 6 working days.',
    },
  ];

  return (
    <>
      {/* Header Heading */}
      <section className="catalog-heading">
        <img src={logo.url} alt="" aria-hidden="true" />
        <Eyebrow>Direct Manufacturer Support</Eyebrow>
        <h1>Get in Touch with Our Weavers</h1>
        <p>Bulk Orders, Custom Packaging &amp; Handloom Floor Mat Enquiries · Bhavani, Tamil Nadu</p>
      </section>

      {/* Main Dual Cards Section */}
      <section className="section page-width !pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Dark Forest Green Contact Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#123826] to-[#0c261a] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between border border-[#c59b48]/30">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-200 bg-white/10 px-3 py-1 rounded-full inline-block mb-4">
                Headquarters &amp; Mills
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3">
                Let&apos;s Connect
              </h2>
              <p className="text-[#d0e5d8] text-sm leading-relaxed mb-8">
                Call, message on WhatsApp, or visit our facility in Bhavani. We reply to every inquiry promptly.
              </p>

              <div className="space-y-6">
                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-amber-200 border border-white/10">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Direct Line / WhatsApp
                    </span>
                    <a
                      href="tel:+919842270384"
                      className="text-base sm:text-lg font-medium text-white hover:text-amber-200 transition-colors mt-0.5 block"
                    >
                      +91 98422 70384
                    </a>
                    <a
                      href="https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan,%20I%20would%20like%20to%20enquire%20about%20your%20bags%20and%20floor%20mats."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#25d366] font-medium hover:underline mt-1"
                    >
                      <MessageCircle size={13} /> Chat directly on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-amber-200 border border-white/10">
                    <Mail size={18} />
                  </div>
                  <div className="break-all">
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Email Address
                    </span>
                    <a
                      href="mailto:shreeyasudarshantradingcompany@gmail.com"
                      className="text-sm sm:text-base font-medium text-white hover:text-amber-200 transition-colors mt-0.5 block"
                    >
                      shreeyasudarshantradingcompany@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-amber-200 border border-white/10">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Factory Address
                    </span>
                    <p className="text-sm text-[#e2f0e8] leading-relaxed mt-0.5">
                      # 56C, Anna Nagar 1st Street,<br />
                      Near Indian Overseas Bank,<br />
                      Bhavani, Erode - 638301, Tamil Nadu.
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-amber-200 border border-white/10">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Operating Hours
                    </span>
                    <p className="text-sm text-[#e2f0e8] mt-0.5">
                      Monday to Saturday: 9:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-[#a0cbb0]">
              <span className="flex items-center gap-1.5">
                <Factory size={15} /> Bhavani Mill Sheds
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} /> Verified Manufacturer
              </span>
            </div>
          </div>

          {/* Right Enquiry Form Card */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground mb-2">
              Request a Custom Quote
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Let us know your specifications for bag dimensions, print requirements, or floor mat weaves.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center bg-primary/5 border border-primary/20 rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-foreground">Enquiry Received!</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formState.name}</strong>. Our production team will review your enquiry for{' '}
                  <strong>{formState.product}</strong> and contact you via {formState.phone} within one business day.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      phone: '',
                      email: '',
                      product: 'Jute Fashion Bags',
                      quantity: '250',
                      message: '',
                    });
                  }}
                >
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Your name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Product Interest
                    </label>
                    <select
                      value={formState.product}
                      onChange={e => setFormState(s => ({ ...s, product: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
                    >
                      <option value="Jute Fashion Bags">Jute Fashion &amp; Shopping Bags</option>
                      <option value="Cotton Bags">Handloom Cotton Carry Bags</option>
                      <option value="Non-Woven Bags">Eco Non-Woven Reusable Bags</option>
                      <option value="Handloom Floor Mats">Raised Lattice Floor Mats</option>
                      <option value="Cotton Rugs">Chenille Shag &amp; Cotton Rugs</option>
                      <option value="Gada Cloth (20s)">Gada Cloth (20&apos;s Count)</option>
                      <option value="Custom Jewellery Packaging">Jewellery Pouches &amp; Packaging</option>
                      <option value="Other Fabric Solutions">Other Custom Textile Weaves</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Estimated Quantity
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 250 pcs"
                      value={formState.quantity}
                      onChange={e => setFormState(s => ({ ...s, quantity: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                    Custom Specifications / Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about dimensions, custom logo colors, delivery city, or special yarn preferences..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  variant="editorial"
                  className="w-full h-12 text-xs font-semibold tracking-wider flex items-center justify-center gap-2"
                >
                  Send Enquiry to Factory Desk <Send size={15} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="section page-width !pt-0">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow className="justify-center">Buyer Guidelines</Eyebrow>
            <h2 className="editorial-title text-3xl mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-border border border-border rounded-2xl bg-card overflow-hidden">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-4 font-serif text-lg font-semibold text-foreground cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 text-muted-foreground ${
                      openFaq === i ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map & Location Section */}
      <section className="section page-width !pt-0">
        <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
          <div className="p-4 sm:p-5 bg-paper/60 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-serif text-lg font-medium text-foreground">
                📍 Bhavani Facility Map &amp; Direct Access
              </span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Near Indian Overseas Bank, Anna Nagar 1st Street, Bhavani - 638301
            </span>
          </div>

          <div className="relative w-full h-[320px] sm:h-[400px] bg-muted/40">
            <iframe
              title="ShreeyaSudarshan Trading Company Location"
              src="https://maps.google.com/maps?q=Anna+Nagar+1st+Street,+Bhavani,+Erode+638301&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <EverydayBand />
    </>
  );
}
