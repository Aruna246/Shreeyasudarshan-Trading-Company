import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import ProductDetailModal from './components/ProductDetailModal.jsx';
import AdminModal from './components/AdminModal.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import WhyUsPage from './pages/WhyUsPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';

import { useCart } from './context/CartContext.jsx';

// Default initial catalog
const defaultProducts = [
  {
    id: "p1",
    name: "Jute Fashion Bag",
    slug: "jute-fashion-bag",
    category: "Jute Fashion Bags",
    price: 180,
    originalPrice: 220,
    image: "/images/jute_fashion_bag.jpg",
    rating: 4.8,
    reviewsCount: 124,
    inStock: true,
    minBulkOrder: 50,
    description: "Eco-friendly, durable natural jute tote bag with dark navy cotton padded handles and botanical leaf motif. Perfect for everyday carrying, shopping, or promotional gifting.",
    dimensions: "38cm (H) x 32cm (W) x 12cm (Gusset)",
    material: "100% Premium Golden Natural Jute with Cotton Webbing Handles",
    features: [
      "100% Biodegradable Golden Jute",
      "Sturdy Navy Padded Cotton Handles",
      "Custom Logo Printing Available",
      "Laminated Interior for Moisture Resistance"
    ],
    badge: "Best Seller"
  },
  {
    id: "p2",
    name: "Cotton Shopping Bag",
    slug: "cotton-shopping-bag",
    category: "Cotton Shopping Bags",
    price: 120,
    originalPrice: 150,
    image: "/images/cotton_shopping_bag.jpg",
    rating: 4.9,
    reviewsCount: 210,
    inStock: true,
    minBulkOrder: 100,
    description: "Premium unbleached eco-cotton canvas shopping bag printed with 'SAVE OUR PLANET'. Strong, washable, and reusable thousands of times.",
    dimensions: "42cm (H) x 38cm (W)",
    material: "Unbleached Natural Cotton Canvas (180 GSM)",
    features: [
      "Natural Organic Cotton 180 GSM",
      "Machine Washable & Reusable",
      "Zero-plastic construction",
      "High load-bearing capacity"
    ],
    badge: "Eco Choice"
  },
  {
    id: "p3",
    name: "Leather Travel Bag",
    slug: "leather-travel-bag",
    category: "Leather Travel Bags",
    price: 1250,
    originalPrice: 1600,
    image: "/images/leather_travel_bag.jpg",
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    minBulkOrder: 10,
    description: "Artisan handcrafted genuine leather travel duffle bag. Features solid antique brass hardware, reinforced stitching, and spacious compartments.",
    dimensions: "52cm (L) x 28cm (W) x 28cm (H)",
    material: "Full-Grain Handcrafted Leather & Brass Hardware",
    features: [
      "Genuine Handcrafted Rich Leather",
      "Solid Brass Zippers & Heavy Buckles",
      "Detachable Padded Shoulder Strap"
    ],
    badge: "Luxury"
  },
  {
    id: "p4",
    name: "Cotton Carry Bag",
    slug: "cotton-carry-bag",
    category: "Cotton Carry Bags",
    price: 95,
    originalPrice: 120,
    image: "/images/cotton_carry_bag.jpg",
    rating: 4.7,
    reviewsCount: 150,
    inStock: true,
    minBulkOrder: 100,
    description: "Everyday sustainable cotton carry bag with durable handles. Clean, versatile, and ideal for groceries, books, and retail packaging.",
    dimensions: "40cm (H) x 35cm (W)",
    material: "100% Pure Natural Cotton (150 GSM)",
    features: [
      "Durable Natural Canvas Fabric",
      "Reinforced Cross Stitching",
      "Custom Screen Printing Available"
    ],
    badge: "Popular"
  },
  {
    id: "p5",
    name: "Fancy Jute Bag",
    slug: "fancy-jute-bag",
    category: "Fancy Jute Bags",
    price: 240,
    originalPrice: 290,
    image: "/images/fancy_jute_bag.jpg",
    rating: 5.0,
    reviewsCount: 95,
    inStock: true,
    minBulkOrder: 50,
    description: "Exquisite handcrafted festive fancy jute bag featuring ornate traditional Indian floral embroidery in vibrant colors. A premium gifting and wedding favorite.",
    dimensions: "35cm (H) x 30cm (W)",
    material: "High-Grade Jute Fabric with Artisanal Thread Embroidery",
    features: [
      "Artisanal Multi-Color Thread Embroidery",
      "Comfortable Braided Rope Handles",
      "Ideal for Weddings & Corporate Gifting"
    ],
    badge: "Handcrafted"
  },
  {
    id: "p6",
    name: "Multicolor Stripe Handloom Mat",
    slug: "multicolor-stripe-handloom-mat",
    category: "Handloom Floor Mats",
    price: 350,
    originalPrice: 450,
    image: "/images/floor_mat_product_1.jpg",
    rating: 4.8,
    reviewsCount: 76,
    inStock: true,
    minBulkOrder: 20,
    description: "Vibrant handwoven cotton floor mat with bold multicolor stripes in red, yellow, black, blue, and green. Traditional Bhavani handloom craftsmanship, durable and washable.",
    dimensions: "60cm (L) x 40cm (W)",
    material: "100% Handloom Cotton Yarn",
    features: [
      "Handwoven on Traditional Bhavani Loom",
      "Colorfast & Fade-Resistant Dyes",
      "Anti-Slip Backing Available",
      "Machine Washable"
    ],
    badge: "Handloom"
  },
  {
    id: "p7",
    name: "Checked Handloom Floor Mat",
    slug: "checked-handloom-floor-mat",
    category: "Handloom Floor Mats",
    price: 380,
    originalPrice: 480,
    image: "/images/floor_mat_product_2.jpg",
    rating: 4.9,
    reviewsCount: 54,
    inStock: true,
    minBulkOrder: 20,
    description: "Exquisite handloom cotton floor mat with vibrant checked pattern in pink, cyan, blue, yellow, and maroon with a bold black border. Perfect for living rooms, doorways, and gifting.",
    dimensions: "60cm (L) x 40cm (W)",
    material: "100% Handloom Cotton Yarn",
    features: [
      "Authentic Bhavani Handloom Weave",
      "Vibrant Multi-Color Checked Design",
      "Durable & Long-Lasting",
      "Ideal for Gifting & Bulk Export"
    ],
    badge: "New Arrival"
  },
  {
    id: "p8",
    name: "Rainbow Tassel Handloom Mat",
    slug: "rainbow-tassel-handloom-mat",
    category: "Handloom Floor Mats",
    price: 320,
    originalPrice: 400,
    image: "/images/floor_mat_wb_3.jpg",
    rating: 4.7,
    reviewsCount: 63,
    inStock: true,
    minBulkOrder: 20,
    description: "Bright and cheerful handloom cotton mat with vertical rainbow stripe pattern and colorful fringe tassels on both sides. Adds instant warmth and color to any room.",
    dimensions: "55cm (L) x 45cm (W)",
    material: "100% Handloom Cotton Yarn",
    features: [
      "Handwoven Rainbow Stripe Design",
      "Colorful Fringe Tassels",
      "Soft & Comfortable Underfoot",
      "Machine Washable"
    ],
    badge: "Colorful"
  },
  {
    id: "p9",
    name: "Diamond Lattice Handloom Mat",
    slug: "diamond-lattice-handloom-mat",
    category: "Handloom Floor Mats",
    price: 420,
    originalPrice: 520,
    image: "/images/floor_mat_wb_4.jpg",
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
    minBulkOrder: 10,
    description: "Premium handloom floor mat with intricate diamond lattice geometric pattern in rich purple, red and green. An elegant piece of Bhavani artisan craftsmanship for home décor.",
    dimensions: "70cm (L) x 45cm (W)",
    material: "100% Handloom Cotton Yarn",
    features: [
      "Intricate Diamond Geometric Weave",
      "Rich Multi-Color Design",
      "Premium Bhavani Artisan Craft",
      "Ideal for Living Room & Gifting"
    ],
    badge: "Premium"
  }
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [products, setProducts] = useState(defaultProducts);
  const { toast } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(err => {
        console.log('Using initial products cache');
      });
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <TopBar />

      {/* Sticky Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage setActivePage={setActivePage} products={products} />
        )}
        {activePage === 'about' && (
          <AboutUsPage setActivePage={setActivePage} />
        )}
        {activePage === 'why-us' && (
          <WhyUsPage setActivePage={setActivePage} />
        )}
        {activePage === 'contact' && (
          <ContactUsPage />
        )}
        {activePage === 'products' && (
          <ProductsPage products={products} setActivePage={setActivePage} />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer setActivePage={setActivePage} />
      <CheckoutModal />
      <ProductDetailModal setActivePage={setActivePage} />
      <AdminModal />

      {/* Toast Alert Popups */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#1b4332',
            color: '#ffffff',
            padding: '14px 22px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.92rem',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <span>✓</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
