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
} from 'lucide-react';
import { Eyebrow, EverydayBand } from '@/components/storefront';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/catalog';
import { toast } from 'sonner';
import logo from '@/assets/company-logo.png.asset.json';

export const Route = createFileRoute('/contact-us')({
  head: () =>
    pageHead(
      'Contact Us',
      'Get in touch with ShreeyaSudarshan Trading Company — Quality Bags & Handloom Floor Mats Manufacturer in Bhavani, Erode. Send an enquiry for custom and bulk orders.'
    ),
  component: ContactUs,
});

function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'Jute Fashion Bags',
    quantity: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    toast.success('Enquiry submitted successfully!');
  };

  return (
    <>
      {/* Header Heading */}
      <section className="catalog-heading">
        <img src={logo.url} alt="" aria-hidden="true" />
        <Eyebrow>Direct Manufacturer Support</Eyebrow>
        <h1>Get in Touch</h1>
        <p>Bulk Orders, Custom Packaging &amp; Handloom Floor Mat Enquiries</p>
      </section>

      {/* Main Dual Cards Section */}
      <section className="section page-width !pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Royal Forest Green Contact Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#123826] to-[#0c261a] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between border-t-2 border-[#EDBC3D] border-x border-b border-[#EDBC3D]/25">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#EDBC3D] bg-white/15 border border-white/20 px-3 py-1 rounded-full inline-block mb-4">
                Headquarters
              </span>
              <h2 className="font-['Manrope'] text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F0E8] mb-3 uppercase">
                Contact us
              </h2>
              <p className="text-[#F4F0E8]/70 text-sm leading-relaxed mb-8">
                Call, message or visit us. We reply to every enquiry within one working day.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#EDBC3D] border border-white/10">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#EDBC3D] block font-medium">
                      Phone
                    </span>
                    <a
                      href="tel:+919842270384"
                      className="text-base sm:text-lg font-medium text-white hover:text-[#EDBC3D] transition-colors mt-0.5 block"
                    >
                      +91 98422 70384
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#EDBC3D] border border-white/10">
                    <Mail size={18} />
                  </div>
                  <div className="break-all">
                    <span className="text-[11px] uppercase tracking-wider text-[#EDBC3D] block font-medium">
                      Email
                    </span>
                    <a
                      href="mailto:shreeyasudarshantradingcompany@gmail.com"
                      className="text-sm sm:text-base font-medium text-white hover:text-[#EDBC3D] transition-colors mt-0.5 block"
                    >
                      shreeyasudarshantradingcompany@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#EDBC3D] border border-white/10">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#EDBC3D] block font-medium">
                      Address
                    </span>
                    <p className="text-sm text-[#F4F0E8]/80 leading-relaxed mt-0.5">
                      # 56C, Anna Nagar 1st Street,<br />
                      Near Indian Overseas Bank,<br />
                      Bhavani, Erode - 638301, Tamil Nadu.
                    </p>
                    <div className="mt-2">
                      <a
                        href="https://maps.google.com/maps?q=Anna+Nagar+1st+Street,+Bhavani,+Erode+638301"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#164E33] hover:text-[#EDBC3D] hover:underline uppercase tracking-wider font-semibold transition-colors"
                      >
                        <MapPin size={13} />
                        <span>View on Google Maps</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-[#EDBC3D] border border-white/10">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#EDBC3D] block font-medium">
                      Working hours
                    </span>
                    <p className="text-sm text-[#F4F0E8]/80 mt-0.5">
                      Monday to Saturday, 9:00 am to 9:00 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#F4F0E8]/60">
              <span className="flex items-center gap-1.5">
                <Factory size={15} className="text-[#EDBC3D]" /> Mill Facility
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[#EDBC3D]" /> Verified Manufacturer
              </span>
            </div>
          </div>

          {/* Right Enquiry Form Card */}
          <div className="lg:col-span-7 bg-white border border-[rgba(14,14,14,0.08)] rounded-2xl p-8 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="font-['Manrope'] text-3xl font-bold tracking-tight text-foreground mb-2 uppercase">
              Send us an enquiry
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Let us know your product requirements, desired quantity, or custom branding specifications.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center bg-[#FAF7F2] border border-[rgba(14,14,14,0.08)] rounded-xl">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-['Manrope'] text-2xl font-bold text-foreground">Enquiry Received!</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formState.name}</strong>. Our team will review your requirements for{' '}
                  <strong>{formState.product}</strong> and contact you via {formState.phone} within one working day.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      phone: '',
                      email: '',
                      product: 'Jute Fashion Bags',
                      quantity: '',
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
                      className="w-full rounded-lg border border-[rgba(14,14,14,0.12)] bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33]"
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
                      className="w-full rounded-lg border border-[rgba(14,14,14,0.12)] bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full rounded-lg border border-[rgba(14,14,14,0.12)] bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Product
                    </label>
                    <select
                      value={formState.product}
                      onChange={e => setFormState(s => ({ ...s, product: e.target.value }))}
                      className="w-full rounded-lg border border-[rgba(14,14,14,0.12)] bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33] cursor-pointer"
                    >
                      <option value="Jute Fashion Bags">Jute Fashion Bags</option>
                      <option value="Cotton Bags">Cotton Bags</option>
                      <option value="Non-Woven Bags">Non-Woven Bags</option>
                      <option value="Handloom Floor Mats">Handloom Floor Mats</option>
                      <option value="Cotton Rugs">Cotton Rugs</option>
                      <option value="Gada Cloth (20s)">Gada Cloth (20&apos;s)</option>
                      <option value="Custom Jewellery Packaging">Custom Jewellery Packaging</option>
                      <option value="Other Fabric Solutions">Other Fabric Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                      Quantity
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 500"
                      value={formState.quantity}
                      onChange={e => setFormState(s => ({ ...s, quantity: e.target.value }))}
                      className="w-full rounded-lg border border-[rgba(14,14,14,0.12)] bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about colours, sizes or logo printing"
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full rounded-lg border border-[rgba(14,14,14,0.12)] bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#164E33] hover:bg-[#0D2E1F] text-white text-xs font-bold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 border border-[#EDBC3D]/40"
                >
                  <span>Send Enquiry</span>
                  <Send size={15} />
                </button>
              </form>
            )}
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
                📍 Bhavani, Erode — Facility Location
              </span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Near Indian Overseas Bank, Anna Nagar 1st Street
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
