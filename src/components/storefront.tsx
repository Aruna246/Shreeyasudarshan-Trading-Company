import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  Menu,
  Plus,
  Minus,
  Trash2,
  Leaf,
  Grid2X2,
  MoveUpRight,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBagIcon,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  Award,
  Factory,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Star,
  Send,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  defaultProducts,
  defaultOrders,
  cartTotal,
  changeQuantity,
  type Product,
  type CartLine,
  type Order,
  type OrderStatus,
} from '@/lib/catalog';
import {
  fetchProductsFromDb,
  syncProductToDb,
  deleteProductFromDb,
  fetchOrdersFromDb,
  syncOrderToDb,
} from '@/lib/db';
import logo from '@/assets/company-logo.png.asset.json';

const PRODUCTS_STORAGE_KEY = 'ss_boutique_products_v4';
const ORDERS_STORAGE_KEY = 'ss_boutique_orders_v1';

type Store = {
  cart: CartLine[];
  saved: string[];
  products: Product[];
  orders: Order[];
  toggleSave: (id: string) => void;
  setProduct: (product: Product) => void;
  openCart: () => void;
  addToCart: (product: Product, qty?: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  createOrderFromCart: (customer: { name: string; email: string; phone: string; address: string; paymentMethod: string }) => Order | null;
  resetToDefaults: () => void;
};

const StoreContext = createContext<Store | null>(null);

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('Storefront is missing');
  return store;
}

export function Brand() {
  return (
    <Link to="/" className="brand group select-none shrink-0 min-w-0" aria-label="ShreeyaSudarshan home">
      <img
        src={logo.url}
        alt="ShreeyaSudarshan Trading Company"
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-1.5 ring-[#164E33]/35 shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0 bg-[#F7F5F0]"
        width={44}
        height={44}
      />
      <div className="flex flex-col min-w-0">
        <span className="font-['Manrope'] text-[14px] sm:text-[17px] font-extrabold tracking-[0.12em] text-[#121212] group-hover:text-[#164E33] transition-colors leading-none truncate uppercase">
          ShreeyaSudarshan
        </span>
        <span className="text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#164E33] block mt-1">
          Trading Company · Bhavani
        </span>
      </div>
    </Link>
  );
}

const ANNOUNCEMENTS = [
  { text: 'Direct Factory Rates from Bhavani · Handloom Floor Mats, Cotton, Jute & Non-Woven Bags', link: '/shop' },
  { text: 'Bulk & Custom Orders for Jewellery & Retail Brands · Call +91 98422 70384', link: '/contact-us' },
  { text: 'Handloom Floor Mats Starting ₹50 · Pure Cotton, Vasthu & Designer Weaves', link: '/shop' },
];

export function Storefront({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderSuccessModal, setOrderSuccessModal] = useState<Order | null>(null);
  const [query, setQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'All' | 'Bags' | 'Floor mats'>('All');
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAnnouncementIdx(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery',
  });

  // Persistent products & orders state with SSR safety
  const [productList, setProductList] = useState<Product[]>(defaultProducts);
  const [orderList, setOrderList] = useState<Order[]>(defaultOrders);

  useEffect(() => {
    try {
      const storedProds = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProds) {
        const parsed: Product[] = JSON.parse(storedProds);
        const validParsed = parsed.filter(p => p.id !== 'mat-blue-stripe' && p.id !== 'sage-mat');
        const existingIds = new Set(validParsed.map(p => p.id));
        const missingDefaults = defaultProducts.filter(p => !existingIds.has(p.id));
        const merged = [...validParsed, ...missingDefaults];
        setProductList(merged);
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
      } else {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
      }
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        setOrderList(JSON.parse(storedOrders));
      }
    } catch {
      // fallback to initial state on restricted browsers
    }

    // Background sync with Neon PostgreSQL
    (async () => {
      try {
        const dbProducts = await fetchProductsFromDb();
        if (dbProducts && dbProducts.length > 0) {
          const validDb = dbProducts.filter(p => p.id !== 'mat-blue-stripe' && p.id !== 'sage-mat');
          const existingIds = new Set(validDb.map(p => p.id));
          const missingDefaults = defaultProducts.filter(p => !existingIds.has(p.id));
          const merged = [...validDb, ...missingDefaults];
          setProductList(merged);
          try {
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
          } catch {}
        }
        const dbOrders = await fetchOrdersFromDb();
        if (dbOrders && dbOrders.length > 0) {
          setOrderList(dbOrders);
          try {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(dbOrders));
          } catch {}
        }
      } catch (err) {
        console.warn('Neon DB background pull silent error:', err);
      }
    })();
  }, []);

  const saveProducts = (prods: Product[]) => {
    setProductList(prods);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(prods));
    } catch {}
  };

  const saveOrders = (ords: Order[]) => {
    setOrderList(ords);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ords));
    } catch {}
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const slug = newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `${slug || 'product'}-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = { ...newProdData, id };
    const updated = [newProduct, ...productList];
    saveProducts(updated);
    syncProductToDb(newProduct).catch(err => console.warn('Neon DB sync error:', err));
    toast.success('Product added successfully!');
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    const prods = productList.map(p => (p.id === updated.id ? updated : p));
    saveProducts(prods);
    syncProductToDb(updated).catch(err => console.warn('Neon DB sync error:', err));
    toast.success('Product updated!');
  };

  const deleteProduct = (id: string) => {
    const prods = productList.filter(p => p.id !== id);
    saveProducts(prods);
    setCart(prev => prev.filter(c => c.id !== id));
    deleteProductFromDb(id).catch(err => console.warn('Neon DB sync error:', err));
    toast.success('Product removed!');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const ords = orderList.map(o => (o.id === orderId ? { ...o, status } : o));
    saveOrders(ords);
    const target = ords.find(o => o.id === orderId);
    if (target) {
      syncOrderToDb(target).catch(err => console.warn('Neon DB sync error:', err));
    }
    toast.success(`Order status changed to ${status}`);
  };

  const createOrderFromCart = (customer: { name: string; email: string; phone: string; address: string; paymentMethod: string }) => {
    if (cart.length === 0) return null;
    const items = cart
      .map(line => {
        const p = productList.find(x => x.id === line.id) ?? defaultProducts.find(x => x.id === line.id);
        if (!p) return null;
        return {
          productId: p.id,
          name: p.name,
          price: p.price,
          quantity: line.quantity,
          image: p.image,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newOrder: Order = {
      id: `ORD-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerName: customer.name || 'Valued Customer',
      email: customer.email || 'customer@example.com',
      phone: customer.phone || '+91 98422 70384',
      address: customer.address || 'Standard Delivery Address',
      date: dateStr,
      items,
      totalAmount: cartTotal(cart, productList),
      status: 'Pending',
      paymentMethod: customer.paymentMethod || 'Cash on Delivery',
    };

    const updated = [newOrder, ...orderList];
    saveOrders(updated);
    syncOrderToDb(newOrder).catch(err => console.warn('Neon DB sync error:', err));
    setCart([]);
    toast.success('Order placed successfully!', {
      description: `Order ID: ${newOrder.id}`,
    });
    return newOrder;
  };

  const resetToDefaults = () => {
    saveProducts(defaultProducts);
    saveOrders(defaultOrders);
    toast.info('Store catalog reset to default values.');
  };

  const location = useLocation();

  const toggleSave = (id: string) => {
    const willSave = !saved.includes(id);
    setSaved(prev => (willSave ? [...prev, id] : prev.filter(x => x !== id)));
    const target = productList.find(p => p.id === id);
    if (willSave) {
      toast.success(target ? `Added "${target.name}" to favourites` : 'Added to favourites');
    } else {
      toast.info('Removed from favourites');
    }
  };

  const selectProduct = (p: Product) => {
    setQuantity(1);
    setProduct(p);
  };

  const addToCart = (p: Product, qty: number = 1) => {
    setCart(prev => changeQuantity(prev, p.id, qty));
    toast.success(`Added ${qty} × "${p.name}" to shopping bag!`, {
      action: {
        label: 'View Bag',
        onClick: () => setCartOpen(true),
      },
    });
  };

  const searchResults = productList.filter(p => {
    const matchesCategory = activeCategoryFilter === 'All' || p.category === activeCategoryFilter;
    const matchesQuery = `${p.name} ${p.category} ${p.material} ${p.badge}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const placed = createOrderFromCart(checkoutForm);
    if (placed) {
      setCheckoutModalOpen(false);
      setCartOpen(false);
      setOrderSuccessModal(placed);
      setCheckoutForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'Cash on Delivery',
      });
    }
  };

  const totalCartCount = cart.reduce((n, l) => n + l.quantity, 0);
  const totalCartAmount = cartTotal(cart, productList);

  const currentSearch = location.search as { category?: string; q?: string } | undefined;
  const currentCat = currentSearch?.category;
  const currentQ = currentSearch?.q?.toLowerCase();

  const nav = (
    <>
      <Link
        to="/shop"
        className={location.pathname === '/shop' && !currentCat && !currentQ ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Shop All
      </Link>
      <Link
        to="/shop"
        search={{ category: 'Bags', q: 'cotton' }}
        className={location.pathname === '/shop' && currentQ === 'cotton' ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Cotton &amp; Khadi Bags
      </Link>
      <Link
        to="/shop"
        search={{ category: 'Bags', q: 'jute' }}
        className={location.pathname === '/shop' && currentQ === 'jute' ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Jute Bags
      </Link>
      <Link
        to="/shop"
        search={{ category: 'Bags', q: 'non-woven' }}
        className={location.pathname === '/shop' && currentQ === 'non-woven' ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Non-Woven Bags
      </Link>
      <Link
        to="/shop"
        search={{ category: 'Floor mats' }}
        className={location.pathname === '/shop' && currentCat === 'Floor mats' && !currentQ ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Floor Mats
      </Link>
      <Link
        to="/shop"
        search={{ category: 'Floor mats', q: 'vasthu' }}
        className={location.pathname === '/shop' && currentQ === 'vasthu' ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Vasthu Mats
      </Link>
      <Link
        to="/our-story"
        className={location.pathname === '/our-story' ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Our Story
      </Link>
      <Link
        to="/contact-us"
        className={location.pathname === '/contact-us' ? 'active' : ''}
        onClick={() => setMenuOpen(false)}
      >
        Bulk Orders
      </Link>
    </>
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        saved,
        products: productList,
        orders: orderList,
        toggleSave,
        setProduct: selectProduct,
        openCart: () => setCartOpen(true),
        addToCart,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        createOrderFromCart,
        resetToDefaults,
      }}
    >
      <Toaster position="bottom-right" richColors />

      {/* CONTINUOUS WATERMARK: Pointer events disabled so all pages share one watermark without blocking shopping controls (AGENTS.md rule) */}
      <div className="site-watermark" aria-hidden="true">
        <img src={logo.url} alt="" width={1064} height={1042} />
      </div>

      {/* 1. ZOUK-STYLE SLIM ROTATING TOP BAR */}
      <div className="announcement">
        <div className="page-width flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setAnnouncementIdx(prev => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
            aria-label="Previous announcement"
            className="text-white/70 hover:text-white transition-colors p-0.5 cursor-pointer shrink-0"
          >
            <ChevronLeft size={14} />
          </button>
          <Link
            to={ANNOUNCEMENTS[announcementIdx].link as any}
            className="text-[11px] sm:text-xs font-medium text-white/95 hover:text-[#F4D178] transition-colors truncate"
          >
            {ANNOUNCEMENTS[announcementIdx].text}
          </Link>
          <button
            type="button"
            onClick={() => setAnnouncementIdx(prev => (prev + 1) % ANNOUNCEMENTS.length)}
            aria-label="Next announcement"
            className="text-white/70 hover:text-white transition-colors p-0.5 cursor-pointer shrink-0"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. ZOUK-STYLE TWO-TIER PURE WHITE STICKY HEADER */}
      <div className="header-wrapper">
        {/* Row 1: Brand + Centered Search Bar + Wishlist & Bag */}
        <header className="site-header page-width">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu -ml-2 hover:bg-black/5 text-[#141414]"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={21} />
            </Button>
            <Brand />
          </div>

          {/* Prominent Centered Zouk Search Bar */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            className="hidden md:flex items-center gap-3 flex-1 max-w-md h-10 px-4 rounded-full bg-[#F6F3EC] hover:bg-[#EFECE3] border border-[#E5E0D5] text-xs sm:text-[13px] text-[#66635C] transition-colors cursor-pointer"
          >
            <Search size={15} className="text-[#164E33] shrink-0" />
            <span className="truncate">Search Cotton Totes, Jute Bags, Vasthu Mats, Floor Mats...</span>
          </button>

          <div className="header-tools">
            <Button
              variant="ghost"
              size="icon"
              title="Search collection"
              aria-label="Search collection"
              onClick={() => setSearchOpen(true)}
              className="md:hidden rounded-full size-9 hover:text-[#164E33] hover:bg-[#F6F3EC] text-[#141414]"
            >
              <Search size={19} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full size-9 hover:text-[#164E33] hover:bg-[#F6F3EC] text-[#141414]"
              title="Saved favourites"
              aria-label="Saved favourites"
              onClick={() => setSavedOpen(true)}
            >
              <Heart
                size={19}
                fill={saved.length > 0 ? '#164E33' : 'none'}
                color={saved.length > 0 ? '#164E33' : 'currentColor'}
              />
              {saved.length > 0 && (
                <span className="bag-counter absolute -top-0.5 -right-0.5 text-[9px] min-w-4 h-4 bg-[#164E33] text-white">
                  {saved.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              className="h-9 px-3 rounded-full bg-[#164E33] hover:bg-[#0F3925] text-white flex items-center gap-1.5 shadow-xs"
              title="Open shopping bag"
              aria-label="Open shopping bag"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={16} className="text-white" />
              <span className="hidden sm:inline text-xs font-bold">Bag</span>
              <span className="min-w-4.5 h-4.5 px-1 rounded-full bg-white text-[#164E33] text-[10px] font-extrabold inline-grid place-items-center">
                {totalCartCount}
              </span>
            </Button>
          </div>
        </header>

        {/* Row 2: Zouk-Style Category Sub-Navigation Bar */}
        <div className="zouk-subnav">
          <nav className="desktop-nav page-width" aria-label="Product categories navigation">
            {nav}
          </nav>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="relative z-10">{children}</main>

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-4 sm:right-6 z-40">
        <a
          href="https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan%20Trading%20Company,%20I%20am%20interested%20in%20custom%20and%20bulk%20orders%20for%20bags%20and%20floor%20mats."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-13 md:size-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_18px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.65)] hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Chat with manufacturer on WhatsApp"
        >
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none group-hover:opacity-0"
            aria-hidden="true"
          />
          <svg
            viewBox="0 0 24 24"
            className="size-7 md:size-8 fill-current relative z-10"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.2.301-.778.979-.954 1.18-.175.2-.351.226-.652.075-.3-.15-1.267-.467-2.414-1.488-.893-.796-1.496-1.78-1.672-2.08-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.151-.176.201-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.633-.929-2.235-.245-.587-.494-.508-.678-.517-.176-.01-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.511s1.079 2.912 1.23 3.113c.15.201 2.124 3.242 5.145 4.547.719.31 1.28.496 1.718.636.722.23 1.378.197 1.9.12.58-.087 1.78-.727 2.032-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12 2C6.477 2 2 6.477 2 12c0 1.892.524 3.662 1.435 5.172L2 22l4.957-1.301A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.174c-1.597 0-3.084-.46-4.348-1.258l-.312-.195-2.937.771.784-2.862-.213-.339A8.136 8.136 0 0 1 3.826 12c0-4.507 3.667-8.174 8.174-8.174 4.507 0 8.174 3.667 8.174 8.174 0 4.507-3.667 8.174-8.174 8.174z" />
          </svg>
          <span className="hidden md:group-hover:flex items-center absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-[#111111] text-white text-xs font-medium tracking-wide whitespace-nowrap shadow-xl pointer-events-none transition-all">
            Chat on WhatsApp
            <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-[#111111]" />
          </span>
        </a>
      </aside>

      {/* 3. CLEAN 3-COLUMN FOOTER (100% REAL COMPANY DETAILS) */}
      <footer className="site-footer relative z-10">
        <div className="page-width">
          <div className="footer-grid">
            {/* Col 1: Brand & Bhavani Factory Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logo.url}
                  alt="ShreeyaSudarshan Trading Company"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F4D178]/40 shadow-sm shrink-0 bg-[#F6F3EC] p-0.5"
                  width={44}
                  height={44}
                />
                <div>
                  <div className="footer-brand leading-none">SHREEYASUDARSHAN</div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4D178] block mt-1">
                    TRADING COMPANY · BHAVANI
                  </span>
                </div>
              </div>
              <p className="footer-tag">
                Eco-Friendly Textile &amp; Bag Manufacturers specializing in Handloom Floor Mats, Cotton Bags, Jute Bags, Non-Woven Bags &amp; Gada Cloth (20&apos;s).
              </p>
              <div className="mt-4 text-[12.5px] text-white/80 space-y-2">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#F4D178] shrink-0 mt-0.5" />
                  <span># 56C, Anna Nagar 1st Street, Near IOB, Bhavani, Erode - 638301, Tamil Nadu.</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-[#F4D178] shrink-0" />
                  <a href="tel:+919842270384" className="hover:text-[#F4D178] transition-colors">+91 98422 70384</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-[#F4D178] shrink-0" />
                  <a href="mailto:shreeyasudarshantradingcompany@gmail.com" className="hover:text-[#F4D178] transition-colors break-all">
                    shreeyasudarshantradingcompany@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Col 2: Our Real Product Categories */}
            <div className="footer-links">
              <h3>Our Collections</h3>
              <Link to="/shop" search={{ category: 'Bags', q: 'cotton' }}>Handloom Cotton &amp; Khadi Bags</Link>
              <Link to="/shop" search={{ category: 'Bags', q: 'jute' }}>Golden Jute &amp; Market Bags</Link>
              <Link to="/shop" search={{ category: 'Bags', q: 'non-woven' }}>Eco Non-Woven Carry Bags</Link>
              <Link to="/shop" search={{ category: 'Floor mats' }}>Designer Handloom Floor Mats</Link>
              <Link to="/shop" search={{ category: 'Floor mats', q: 'vasthu' }}>Vasthu &amp; Traditional Floor Mats</Link>
              <Link to="/shop">Shop All Products</Link>
            </div>

            {/* Col 3: Company Links */}
            <div className="footer-links">
              <h3>Company</h3>
              <Link to="/">Home</Link>
              <Link to="/our-story">Our Story &amp; Clients</Link>
              <Link to="/contact-us">Bulk &amp; Custom Orders</Link>
              <a
                href="https://maps.google.com/maps?q=Anna+Nagar+1st+Street,+Bhavani,+Erode+638301"
                target="_blank"
                rel="noreferrer"
              >
                View Factory on Google Maps
              </a>
              <Link to="/admin" className="opacity-65 hover:opacity-100">Admin Portal</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ShreeyaSudarshan Trading Company. All Rights Reserved.</span>
            <span>Bhavani Handlooms · Eco-Friendly Manufacturing · Pan-India Dispatch</span>
            <span className="text-[#F4D178] font-medium">Trusted Partner for Leading Jewellery Houses</span>
          </div>
        </div>
      </footer>

      {/* Mobile Drawer */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent className="w-[300px] sm:w-[360px] flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 pb-6 border-b border-border/70">
              <img src={logo.url} alt="ShreeyaSudarshan" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="font-serif text-lg font-bold">ShreeyaSudarshan</h3>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Trading Company · Bhavani</p>
              </div>
            </div>
            <nav className="flex flex-col gap-4 mt-6 text-base font-medium" aria-label="Mobile navigation">
              {nav}
              <button
                type="button"
                className="flex items-center justify-between text-left py-2.5 border-t border-border/70 text-sm font-medium mt-3 pt-4 text-foreground cursor-pointer"
                onClick={() => {
                  setMenuOpen(false);
                  setSavedOpen(true);
                }}
              >
                <span className="flex items-center gap-2">
                  <Heart size={16} fill={saved.length > 0 ? '#164E33' : 'none'} color={saved.length > 0 ? '#164E33' : 'currentColor'} /> Saved Favourites
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary">
                  {saved.length}
                </span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-border/70 space-y-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Phone size={14} className="text-primary" />
              <a href="tel:+919842270384">+91 98422 70384</a>
            </div>
            <a
              href="https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan,%20I%20want%20to%20enquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#25d366] text-white font-semibold text-xs shadow"
            >
              <MessageCircle size={15} /> WhatsApp Quick Chat
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* Shopping Bag Drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-6">
          <div className="pb-3 border-b border-border/70">
            <SheetTitle className="text-2xl font-serif">Shopping Bag</SheetTitle>
            <SheetDescription className="text-xs mt-0.5">
              {totalCartCount} item{totalCartCount === 1 ? '' : 's'} in your bag
            </SheetDescription>
            {/* Free shipping progress indicator */}
            <div className="mt-3 bg-secondary/80 rounded-lg p-2.5 text-[11px] flex items-center gap-2 text-primary">
              <Truck size={14} className="shrink-0" />
              <span>Complimentary Pan-India shipping included on all direct orders!</span>
            </div>
          </div>

          <div className="overflow-auto flex-1 divide-y divide-border/60 py-2">
            {cart.length === 0 ? (
              <div className="empty-state py-12">
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center text-primary mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-serif text-xl font-medium text-foreground">Your bag is empty</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                  Explore our handcrafted collection of pure cotton bags and handloom floor mats.
                </p>
                <Button variant="editorial" className="mt-6" onClick={() => setCartOpen(false)} asChild>
                  <Link to="/shop">
                    Explore the collection <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            ) : (
              cart.map(line => {
                const p = productList.find(item => item.id === line.id) ?? defaultProducts.find(item => item.id === line.id);
                if (!p) return null;
                return (
                  <div className="cart-row" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3>{p.name}</h3>
                        <p className="text-xs font-semibold text-primary mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                        <span className="text-[10px] text-muted-foreground block">{p.size}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="quantity-control my-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            aria-label={`Decrease ${p.name}`}
                            onClick={() => setCart(prev => changeQuantity(prev, p.id, -1))}
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="text-xs">{line.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            aria-label={`Increase ${p.name}`}
                            onClick={() => setCart(prev => changeQuantity(prev, p.id, 1))}
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-[#164E33]"
                          aria-label={`Remove ${p.name}`}
                          onClick={() => {
                            setCart(prev => prev.filter(l => l.id !== p.id));
                            toast.info(`Removed "${p.name}" from bag`);
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-summary border-t border-border/80 pt-4">
              <div className="cart-total">
                <span className="text-muted-foreground text-sm font-normal">Subtotal</span>
                <span className="text-lg font-serif text-primary">₹{totalCartAmount.toLocaleString('en-IN')}</span>
              </div>
              <Button
                variant="editorial"
                className="w-full h-11 text-xs tracking-wider"
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutModalOpen(true);
                }}
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Button>
              <p className="preview-note text-center" role="status">
                Direct mill dispatch with quality guarantee. Cash on Delivery &amp; UPI available.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-6">
          <DialogTitle className="text-2xl font-serif">Complete Your Order</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            Provide delivery details for instant processing by our dispatch team in Bhavani.
          </DialogDescription>
          <form onSubmit={handlePlaceOrder} className="space-y-4 mt-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Anand Sundaram"
                value={checkoutForm.name}
                onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                className="w-full border rounded-lg px-3.5 py-2.5 text-sm bg-background border-border focus:border-primary focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1">Email</label>
                <input
                  required
                  type="email"
                  placeholder="anand@example.com"
                  value={checkoutForm.email}
                  onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2.5 text-sm bg-background border-border focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1">Phone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={checkoutForm.phone}
                  onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2.5 text-sm bg-background border-border focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1">Delivery Address</label>
              <textarea
                required
                rows={2}
                placeholder="Door No, Street Name, City, State & Pincode"
                value={checkoutForm.address}
                onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                className="w-full border rounded-lg px-3.5 py-2.5 text-sm bg-background border-border focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1">Payment Method</label>
              <select
                value={checkoutForm.paymentMethod}
                onChange={e => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                className="w-full border rounded-lg px-3.5 py-2.5 text-sm bg-background border-border focus:border-primary focus:outline-none"
              >
                <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe (Prompt on Dispatch)</option>
                <option value="Bank NEFT / RTGS">Bank NEFT / RTGS (Bulk Orders)</option>
              </select>
            </div>

            <div className="bg-secondary/70 p-3.5 rounded-xl text-xs space-y-1.5 border border-border/80">
              <div className="flex justify-between font-medium">
                <span>Total Items:</span>
                <span className="font-semibold text-foreground">{totalCartCount} items</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Order Total:</span>
                <span className="font-semibold text-primary text-sm">₹{totalCartAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-[11px]">
                <span>Pan-India Shipping:</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setCheckoutModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="editorial" className="flex-1">
                Confirm Order <ArrowRight size={14} />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Order Success Confirmation Dialog */}
      <Dialog open={orderSuccessModal !== null} onOpenChange={open => !open && setOrderSuccessModal(null)}>
        <DialogContent className="max-w-md text-center p-6 sm:p-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mb-4 shadow-sm">
            <CheckCircle2 size={32} />
          </div>
          <DialogTitle className="text-2xl font-serif">Order Confirmed!</DialogTitle>
          <DialogDescription className="mt-1 text-xs">
            Thank you! Your order reference is <span className="font-semibold text-foreground">{orderSuccessModal?.id}</span>.
          </DialogDescription>
          <div className="bg-secondary/60 rounded-xl p-4 text-left my-4 text-xs space-y-2 border border-border/70">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipient:</span>
              <span className="font-medium text-foreground">{orderSuccessModal?.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Value:</span>
              <span className="font-semibold text-primary">₹{orderSuccessModal?.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment:</span>
              <span>{orderSuccessModal?.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                <Clock size={12} /> {orderSuccessModal?.status}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Our dispatch coordinator in Bhavani will verify your delivery details and contact you via phone/WhatsApp.
          </p>
          <div className="flex gap-2">
            <Button variant="editorial" className="w-full" onClick={() => setOrderSuccessModal(null)}>
              Continue Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-xl max-h-[85vh] p-6 flex flex-col">
          <DialogTitle className="text-xl font-serif">Search Collection</DialogTitle>
          <DialogDescription className="text-xs">
            Explore bags, handloom floor mats, fabrics, and weaves.
          </DialogDescription>
          
          <div className="mt-3 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#DEDAD0] bg-[#F7F5F0] text-sm text-[#121212] placeholder:text-[#7A7770] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#164E33]/25 focus:border-[#164E33] transition-all"
              aria-label="Search collection"
              placeholder="Search bags, mats, cotton, jute, lattice..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-3 pb-2 border-b border-border/70">
            {(['All', 'Bags', 'Floor mats'] as const).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                  activeCategoryFilter === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-border/60 mt-2 flex-1">
            {searchResults.length ? (
              searchResults.map(p => (
                <button
                  key={p.id}
                  type="button"
                  className="search-result w-full text-left cursor-pointer hover:bg-secondary/50 rounded-lg px-2 transition-colors flex items-center justify-between"
                  onClick={() => {
                    setSearchOpen(false);
                    selectProduct(p);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{p.name}</h4>
                      <p className="text-[11px] text-muted-foreground">
                        {p.category} · {p.material}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-primary text-xs">
                      {p.priceNote || `₹${p.price.toLocaleString('en-IN')}`}
                    </span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                  </div>
                </button>
              ))
            ) : (
              <p className="empty-state py-8">No matching items found. Try searching for “cotton”, “jute”, or “mat”.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Saved Favourites Sheet */}
      <Sheet open={savedOpen} onOpenChange={setSavedOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-auto p-6">
          <SheetTitle className="text-2xl font-serif">Saved Favourites</SheetTitle>
          <SheetDescription className="text-xs">Your curated shortlist of essentials.</SheetDescription>
          {saved.length ? (
            <div className="divide-y divide-border/60 mt-4">
              {productList
                .filter(p => saved.includes(p.id))
                .map(p => (
                  <div className="cart-row" key={p.id}>
                    <img src={p.image} alt={p.name} />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3>{p.name}</h3>
                        <p className="text-xs font-semibold text-primary mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                        <span className="text-[10px] text-muted-foreground">{p.material}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="editorial"
                          size="sm"
                          className="h-8 text-[10px]"
                          onClick={() => {
                            addToCart(p);
                          }}
                        >
                          Add to Bag
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-[10px]"
                          onClick={() => {
                            setSavedOpen(false);
                            selectProduct(p);
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="empty-state py-12">
              <div className="w-14 h-14 rounded-full bg-secondary mx-auto flex items-center justify-center text-muted-foreground mb-4">
                <Heart size={26} />
              </div>
              <p>Your favourites will find a home here. Click the heart icon on any product.</p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Product Detail Dialog */}
      <Dialog
        open={product !== null}
        onOpenChange={open => {
          if (!open) setProduct(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-auto p-6 sm:p-8">
          {product && (
            <>
              <DialogTitle className="sr-only">{product.name}</DialogTitle>
              <DialogDescription className="sr-only">Product preview and specifications</DialogDescription>
              <div className="detail-grid">
                <div className="relative rounded-xl overflow-hidden border border-border/80 bg-paper">
                  <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                  {product.badge && (
                    <span className="product-badge top-3 left-3">{product.badge}</span>
                  )}
                </div>
                <div>
                  <div className="eyebrow">{product.category}</div>
                  <h2 className="mt-2 text-3xl font-serif font-medium">{product.name}</h2>
                  
                  {product.priceNote ? (
                    <div className="mt-3 py-2.5 px-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="font-semibold text-base text-primary">
                        {product.priceNote}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Base starting rate: ₹{product.price.toLocaleString('en-IN')} · Final quotation depends on order volume and custom dimension requirements.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 font-semibold text-2xl text-primary font-serif">₹{product.price.toLocaleString('en-IN')}</p>
                  )}

                  <p className="detail-copy text-sm">{product.description}</p>
                  
                  <div className="bg-secondary/60 rounded-lg p-3 text-xs space-y-1 my-4 border border-border/60">
                    <p><strong className="text-foreground">Fabric/Material:</strong> {product.material}</p>
                    <p><strong className="text-foreground">Dimensions / Spec:</strong> {product.size}</p>
                    <p><strong className="text-foreground">Origin:</strong> Master Handloom Sheds · Bhavani, Tamil Nadu</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="quantity-control my-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                        onClick={() => setQuantity(n => Math.max(1, n - 1))}
                      >
                        <Minus size={14} />
                      </Button>
                      <span aria-label="Quantity" className="text-xs font-semibold">{quantity}</span>
                      <Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQuantity(n => n + 1)}>
                        <Plus size={14} />
                      </Button>
                    </div>

                    <Button
                      variant="editorial"
                      className="flex-1 h-11"
                      onClick={() => {
                        addToCart(product, quantity);
                        setProduct(null);
                        setCartOpen(true);
                      }}
                    >
                      Add to Bag · ₹{(product.price * quantity).toLocaleString('en-IN')} <ShoppingBag size={14} />
                    </Button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/70 flex items-center justify-between">
                    <a
                      href={`https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan,%20I%20am%20interested%20in%20bulk%20enquiry%20for%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-emerald-700 hover:underline flex items-center gap-1.5"
                    >
                      <MessageCircle size={14} /> Enquire Bulk Pricing on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleSave(product.id)}
                      className="text-xs font-medium text-muted-foreground hover:text-[#164E33] flex items-center gap-1 cursor-pointer"
                    >
                      <Heart size={14} fill={saved.includes(product.id) ? '#164E33' : 'none'} color={saved.includes(product.id) ? '#164E33' : 'currentColor'} />
                      <span>{saved.includes(product.id) ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </StoreContext.Provider>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("eyebrow", className)}>
      <span className="eyebrow-line" />
      <span className="eyebrow-text">{children}</span>
      <span className="eyebrow-line eyebrow-line-after" />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const store = useStore();
  const saved = store.saved.includes(product.id);
  const badge = product.badge?.trim();

  return (
    <article className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-[#EAE6DE] hover:border-[#164E33]/40 hover:shadow-[0_12px_28px_rgba(17,47,33,0.09)] transition-all duration-300 select-none text-[#141414]">
      {/* Zouk-Style Clean Studio Image Container */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F3EC] cursor-pointer"
        onClick={() => store.setProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
          width={1024}
          height={1024}
        />

        {/* Top-Left Real Product Tag */}
        {badge ? (
          <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-white/95 text-[#164E33] border border-[#164E33]/15 shadow-xs pointer-events-none">
            {badge}
          </span>
        ) : null}

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            store.toggleSave(product.id);
          }}
          aria-label={saved ? "Remove from favourites" : "Add to favourites"}
          className={`absolute top-2.5 right-2.5 z-10 size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
            saved
              ? "bg-[#164E33] text-white"
              : "bg-white/90 hover:bg-white text-[#141414]"
          }`}
        >
          <Heart className={`size-3.5 ${saved ? "fill-white" : ""}`} strokeWidth={1.75} />
        </button>

        {/* Bottom-Left Real Dimension Pill */}
        {product.size ? (
          <span className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-white/92 backdrop-blur-xs text-[10px] font-semibold text-[#3A3834] shadow-xs pointer-events-none">
            {product.size}
          </span>
        ) : null}
      </div>

      {/* Zouk-Style Clean Product Info & Full-Width Add to Bag CTA */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        <div>
          <h3
            onClick={() => store.setProduct(product)}
            className="font-['Manrope'] text-[13px] sm:text-[14px] font-bold text-[#141414] line-clamp-2 min-h-[2.3rem] sm:min-h-[2.5rem] leading-snug cursor-pointer hover:text-[#164E33] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-[#737069] line-clamp-1 mt-0.5">
            {product.material}
          </p>

          {/* Honest Direct Price Display */}
          <div className="mt-2">
            {product.priceNote ? (
              <div className="flex flex-col">
                <span className="font-['Manrope'] text-[14px] sm:text-[15px] font-extrabold text-[#141414]">
                  From ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-[#164E33] font-medium mt-0.5 line-clamp-1">
                  {product.priceNote}
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-['Manrope'] text-[15px] sm:text-[16px] font-extrabold tabular-nums text-[#141414]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-semibold text-[#164E33] bg-[#164E33]/8 px-1.5 py-0.5 rounded">
                  Direct Mill Price
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Full-Width Zouk Conversion Button */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              store.addToCart(product, 1);
            }}
            className="flex-1 h-9 sm:h-10 rounded-lg bg-[#164E33] hover:bg-[#0E3824] text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.07em] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
          >
            <ShoppingBag className="size-3.5" strokeWidth={1.75} />
            <span>Add to Bag</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              store.setProduct(product);
            }}
            aria-label={`View details for ${product.name}`}
            title="View Details"
            className="h-9 sm:h-10 px-2.5 rounded-lg border border-[#E2DFD7] hover:border-[#164E33] hover:text-[#164E33] text-[#45433E] text-[11px] font-semibold transition-colors cursor-pointer bg-[#F6F3EC] hover:bg-white shrink-0"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductCollection({
  filter = 'All',
  initialQuery = '',
}: {
  filter?: string;
  initialQuery?: string;
}) {
  const { products } = useStore();
  const [tab, setTab] = useState(filter);
  const [searchFilter, setSearchFilter] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const quickChips = [
    { label: 'Cotton', value: 'cotton' },
    { label: 'Jute', value: 'jute' },
    { label: 'Non-Woven', value: 'non-woven' },
    { label: 'Vasthu Mats', value: 'vasthu' },
    { label: 'Lattice & Fringe', value: 'fringe' },
    { label: 'Reversible', value: 'reversible' },
  ];

  const filtered = products
    .filter(p => tab === 'All' || p.category === tab)
    .filter(p => `${p.name} ${p.material} ${p.badge} ${p.description}`.toLowerCase().includes(searchFilter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const counts = {
    All: products.length,
    Bags: products.filter(p => p.category === 'Bags').length,
    'Floor mats': products.filter(p => p.category === 'Floor mats').length,
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-7 pb-4 border-b border-[#EAE6DE]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap" aria-label="Product categories">
            {(['All', 'Bags', 'Floor mats'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setSearchFilter('');
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer",
                  tab === t && !searchFilter
                    ? "bg-[#164E33] text-white shadow-xs"
                    : "bg-[#F6F3EC] border border-[#E5E0D5] text-[#2A2A2A] hover:border-[#164E33]/50"
                )}
              >
                {t === 'All' ? 'All Products' : t} ({counts[t]})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative flex-1 sm:flex-initial">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737069]" />
              <input
                type="text"
                placeholder="Filter by product or material..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="pl-8 pr-8 h-9 rounded-lg border border-[#E2DFD7] text-xs bg-[#F6F3EC] focus:bg-white text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#164E33]/20 focus:border-[#164E33] w-full sm:w-56 transition-all"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737069] hover:text-[#141414] cursor-pointer"
                  aria-label="Clear search filter"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              aria-label="Sort products"
              className="h-9 px-3 rounded-lg border border-[#E2DFD7] text-xs font-medium bg-white text-[#141414] focus:outline-none focus:border-[#164E33] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Zouk-Style Quick Material & Weave Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-[#737069] shrink-0">Quick filter:</span>
          {quickChips.map(chip => {
            const active = searchFilter.toLowerCase() === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => setSearchFilter(active ? '' : chip.value)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer shrink-0 border ${
                  active
                    ? 'bg-[#164E33] text-white border-[#164E33]'
                    : 'bg-white text-[#3F3D39] border-[#E5E0D5] hover:border-[#164E33]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state py-14 text-center bg-[#F6F3EC] rounded-2xl border border-[#EAE6DE]">
          <p className="text-[#5C5952] text-sm font-medium">No products match your current filter.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 rounded-full border-[#164E33] text-[#164E33] hover:bg-[#164E33] hover:text-white"
            onClick={() => { setTab('All'); setSearchFilter(''); }}
          >
            Show All Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}

export function EverydayBand() {
  const pillars = [
    {
      title: 'Proudly Indian',
      subtext: 'Handcrafted by skilled artisans in Bhavani, Tamil Nadu',
      icon: <Award className="size-5 text-[#164E33]" />,
    },
    {
      title: '100% Eco-Friendly',
      subtext: 'Pure cotton, biodegradable jute & natural handloom fibres',
      icon: <Leaf className="size-5 text-[#164E33]" />,
    },
    {
      title: 'Direct Mill Value',
      subtext: 'Factory-direct prices with zero middlemen markups',
      icon: <Factory className="size-5 text-[#164E33]" />,
    },
    {
      title: 'Pan-India Dispatch',
      subtext: 'Trusted delivery for retail & bulk jewellery brand orders',
      icon: <Truck className="size-5 text-[#164E33]" />,
    },
  ];

  return (
    <section className="w-full bg-[#F7F5F0] border-y border-[#EAE7E0] py-8 sm:py-10 select-none">
      <div className="page-width">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-3.5"
            >
              <div className="shrink-0 size-11 rounded-full bg-white border border-[#E5E1D8] shadow-xs flex items-center justify-center">
                {p.icon}
              </div>
              <div>
                <h4 className="font-['Manrope'] font-extrabold text-[13px] sm:text-[14.5px] text-[#121212] leading-tight">
                  {p.title}
                </h4>
                <p className="text-[11.5px] sm:text-xs text-[#66645E] mt-1 leading-relaxed">
                  {p.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
