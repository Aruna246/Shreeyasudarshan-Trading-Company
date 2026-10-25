import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Factory, ShieldCheck, Sparkles } from 'lucide-react';
import { Eyebrow, EverydayBand } from '@/components/storefront';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/catalog';
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
          {/* Left Dark Forest Green Contact Card */}
          <div className="lg:col-span-5 bg-[#173e2d] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#9ed3b0] bg-white/10 px-3 py-1 rounded-full inline-block mb-4">
                Headquarters
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3">
                Contact us
              </h2>
              <p className="text-[#d0e5d8] text-sm leading-relaxed mb-8">
                Call, message or visit us. We reply to every enquiry within one working day.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#9ed3b0] border border-white/10">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Phone
                    </span>
                    <a
                      href="tel:+919842270384"
                      className="text-base sm:text-lg font-medium text-white hover:text-[#9ed3b0] transition-colors mt-0.5 block"
                    >
                      +91 98422 70384
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#9ed3b0] border border-white/10">
                    <Mail size={18} />
                  </div>
                  <div className="break-all">
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Email
                    </span>
                    <a
                      href="mailto:shreeyasudarshantradingcompany@gmail.com"
                      className="text-sm sm:text-base font-medium text-white hover:text-[#9ed3b0] transition-colors mt-0.5 block"
                    >
                      shreeyasudarshantradingcompany@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#9ed3b0] border border-white/10">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Address
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
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#9ed3b0] border border-white/10">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#a0cbb0] block font-medium">
                      Working hours
                    </span>
                    <p className="text-sm text-[#e2f0e8] mt-0.5">
                      Monday to Saturday, 9:00 am to 6:00 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-[#a0cbb0]">
              <span className="flex items-center gap-1.5">
                <Factory size={15} /> Mill Facility
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} /> Verified Manufacturer
              </span>
            </div>
          </div>

          {/* Right Enquiry Form Card */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground mb-2">
              Send us an enquiry
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
              Let us know your product requirements, desired quantity, or custom branding specifications.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center bg-primary/5 border border-primary/20 rounded-xl">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-foreground">Enquiry Received!</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formState.name}</strong>. Our team will review your requirements for{' '}
                  <strong>{formState.product}</strong> and contact you via {formState.phone} within one working day.
                </p>
                <Button
                  variant="understated"
                  className="mt-6"
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
                    <label className="block text-xs font-medium text-foreground mb-1.5">Your name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Phone number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 "
                      value={formState.phone}
                      onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Product</label>
                    <select
                      value={formState.product}
                      onChange={e => setFormState(s => ({ ...s, product: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
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
                    <label className="block text-xs font-medium text-foreground mb-1.5">Quantity</label>
                    <input
                      type="text"
                      placeholder="e.g. 500"
                      value={formState.quantity}
                      onChange={e => setFormState(s => ({ ...s, quantity: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about colours, sizes or logo printing"
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#173e2d] hover:bg-[#1f523c] text-white px-8 py-3 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2"
                >
                  Send enquiry <Send size={15} />
                </Button>
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
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
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
