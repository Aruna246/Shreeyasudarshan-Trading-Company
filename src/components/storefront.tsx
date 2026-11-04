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
    <Link to="/" className="brand" aria-label="ShreeyaSudarshan home">
      <img src={logo.url} alt="ShreeyaSudarshan tree logo" width={88} height={88} />
      <div className="brand-name">
        ShreeyaSudarshan
        <span className="brand-sub">Trading Company · Bhavani</span>
      </div>
    </Link>
  );
}

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
    toast.success('Product added successfully!');
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    const prods = productList.map(p => (p.id === updated.id ? updated : p));
    saveProducts(prods);
    toast.success('Product updated!');
  };

  const deleteProduct = (id: string) => {
    const prods = productList.filter(p => p.id !== id);
    saveProducts(prods);
    setCart(prev => prev.filter(c => c.id !== id));
    toast.success('Product removed!');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const ords = orderList.map(o => (o.id === orderId ? { ...o, status } : o));
    saveOrders(ords);
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

  const nav = (
    <>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        Shop Collection
      </Link>
      <Link to="/our-story" className={location.pathname === '/our-story' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        Our Story &amp; Heritage
      </Link>
      <Link to="/contact-us" className={location.pathname === '/contact-us' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        Bulk &amp; Custom Orders
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

      {/* Announcement Bar */}
      <div className="announcement flex items-center justify-between px-6">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <Sparkles size={13} className="text-[#c59b48] shrink-0" />
          <span className="font-semibold tracking-wide">
            Quality Bags &amp; Handloom Floor Mats · Direct Manufacturer in Bhavani, Tamil Nadu
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] tracking-normal font-normal opacity-95">
          <span className="inline-flex items-center gap-1.5 text-amber-200">
            <Truck size={13} /> Pan-India Delivery
          </span>
          <span>·</span>
          <a href="tel:+919842270384" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
            <Phone size={11} /> +91 98422 70384
          </a>
          <span>·</span>
          <a href="mailto:shreeyasudarshantradingcompany@gmail.com" className="hover:text-amber-200 transition-colors">
            Email Us
          </a>
        </div>
      </div>

      {/* Sticky Header */}
      <div className="header-wrapper">
        <header className="site-header page-width">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav}
          </nav>
          <div className="header-tools">
            <Button
              variant="ghost"
              size="icon"
              title="Search collection"
              aria-label="Search collection"
              onClick={() => setSearchOpen(true)}
              className="hover:text-primary"
            >
              <Search size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="header-wishlist relative hover:text-red-600"
              title="Saved favourites"
              aria-label="Saved favourites"
              onClick={() => setSavedOpen(true)}
            >
              <Heart size={18} fill={saved.length > 0 ? '#dc2626' : 'none'} color={saved.length > 0 ? '#dc2626' : 'currentColor'} />
              {saved.length > 0 && (
                <span className="bag-counter absolute -top-1 -right-1 text-[9px] min-w-3.5 h-3.5 bg-red-600 text-white">
                  {saved.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              className="px-2.5 rounded-full hover:bg-primary/10 flex items-center gap-1.5"
              title="Open shopping bag"
              aria-label="Open shopping bag"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={18} className="text-primary" />
              <span className="bag-counter">{totalCartCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </header>
      </div>

      {/* Main Page Content */}
      <main className="relative z-10">{children}</main>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/919842270384?text=Hello%20ShreeyaSudarshan%20Trading%20Company,%20I%20am%20interested%20in%20custom%20and%20bulk%20orders%20for%20bags%20and%20floor%20mats."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float group"
        aria-label="Chat with manufacturer on WhatsApp"
      >
        <MessageCircle size={18} className="shrink-0 transition-transform group-hover:scale-110" />
        <span>Enquire on WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="site-footer relative z-10">
        <div className="page-width">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">ShreeyaSudarshan</div>
              <p className="footer-tag">
                Eco-Friendly Textile &amp; Bag Manufacturers.<br />
                Master Handloom Floor Mats, Cotton Bags, Jute Bags &amp; Gada Cloth.
              </p>
              <div className="mt-5 text-[12px] opacity-85 space-y-2">
                <p className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#c59b48] shrink-0 mt-0.5" />
                  <span># 56C, Anna Nagar 1st Street, Near IOB, Bhavani, Erode - 638301, Tamil Nadu.</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-[#c59b48] shrink-0" />
                  <a href="tel:+919842270384" className="hover:underline">+91 98422 70384</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={15} className="text-[#c59b48] shrink-0" />
                  <a href="mailto:shreeyasudarshantradingcompany@gmail.com" className="hover:underline">shreeyasudarshantradingcompany@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="footer-links">
              <h3>Navigation</h3>
              <Link to="/">Home</Link>
              <Link to="/shop">Shop All Collections</Link>
              <Link to="/our-story">Our Story &amp; Weaving Heritage</Link>
              <Link to="/contact-us">Bulk Orders &amp; Custom Sizing</Link>
              <Link to="/admin" className="opacity-60 hover:opacity-100">Admin Portal</Link>
            </div>
            <div className="footer-links">
              <h3>Manufactured Collections</h3>
              <Link to="/shop" search={{ category: 'Bags' }}>Jute Fashion &amp; Tote Bags</Link>
              <Link to="/shop" search={{ category: 'Bags' }}>Handloom Cotton Bags</Link>
              <Link to="/shop" search={{ category: 'Floor mats' }}>Raised Lattice Floor Mats</Link>
              <Link to="/shop" search={{ category: 'Floor mats' }}>Chenille &amp; Cotton Rugs</Link>
              <Link to="/contact-us">Jewellery Packaging Pouches</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ShreeyaSudarshan Trading Company. All Rights Reserved.</span>
            <span>Bhavani Handlooms · Eco-Friendly Manufacturing · Pan-India Dispatch</span>
            <span>Trusted Partner for India&apos;s Leading Jewellery Houses</span>
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
                  <Heart size={16} fill={saved.length > 0 ? '#dc2626' : 'none'} color={saved.length > 0 ? '#dc2626' : 'currentColor'} /> Saved Favourites
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
                          className="h-7 w-7 text-muted-foreground hover:text-red-600"
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
          
          <div className="mt-3">
            <input
              autoFocus
              className="search-input"
              aria-label="Search collection"
              placeholder="Search bags, mats, cotton, jute, chettinad..."
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
                      className="text-xs font-medium text-muted-foreground hover:text-red-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Heart size={14} fill={saved.includes(product.id) ? '#dc2626' : 'none'} color={saved.includes(product.id) ? '#dc2626' : 'currentColor'} />
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
  
  return (
    <article className="group flex flex-col justify-between">
      <div>
        <div className="product-image">
          <img src={product.image} alt={product.name} width={1024} height={1024} loading="lazy" />
          <Button
            variant="image"
            className="product-open"
            aria-label={`View ${product.name}`}
            onClick={() => store.setProduct(product)}
          />
          {product.badge && <span className="product-badge">{product.badge}</span>}
          
          <Button
            variant="ghost"
            size="icon"
            className="product-save"
            aria-label={`${saved ? 'Unsave' : 'Save'} ${product.name}`}
            title={saved ? 'Remove from favourites' : 'Save to favourites'}
            aria-pressed={saved}
            onClick={(e) => {
              e.stopPropagation();
              store.toggleSave(product.id);
            }}
          >
            <Heart size={16} fill={saved ? '#dc2626' : 'none'} color={saved ? '#dc2626' : 'currentColor'} />
          </Button>

          {/* Quick Add Overlay on Hover */}
          <div className="quick-add-btn">
            <Button
              variant="default"
              size="sm"
              className="w-full h-9 rounded-lg bg-background/95 text-foreground hover:bg-primary hover:text-primary-foreground border border-border shadow-md backdrop-blur-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                store.addToCart(product, 1);
              }}
            >
              <Plus size={14} /> Quick Add to Bag
            </Button>
          </div>
        </div>

        <div className="product-info">
          <h3
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => store.setProduct(product)}
          >
            {product.name}
          </h3>
          <div className="product-meta items-baseline gap-2 mt-1">
            <span className="text-xs text-muted-foreground line-clamp-1">{product.material}</span>
            <span className="text-foreground font-semibold text-xs sm:text-sm text-right shrink-0">
              {product.priceNote || `₹${product.price.toLocaleString('en-IN')}`}
            </span>
          </div>
        </div>
      </div>

      <div className="product-swatches" aria-label="Craft palette">
        <span className="swatch natural" title="Natural Canvas" />
        <span className="swatch green" title="Bhavani Forest Green" />
        <span className="swatch" title="Antique Brass Gold" />
        <span className="text-[10px] text-muted-foreground/80 ml-auto font-medium">{product.size}</span>
      </div>
    </article>
  );
}

export function ProductCollection({ filter = 'All' }: { filter?: string }) {
  const { products } = useStore();
  const [tab, setTab] = useState(filter);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filtered = products
    .filter(p => tab === 'All' || p.category === tab)
    .filter(p => `${p.name} ${p.material} ${p.badge}`.toLowerCase().includes(searchFilter.toLowerCase()))
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border/70">
        <div className="filter-tabs mb-0" aria-label="Product categories">
          {(['All', 'Bags', 'Floor mats'] as const).map(t => (
            <Button
              key={t}
              variant="tab"
              data-active={tab === t}
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
              className="text-xs font-medium pb-2 border-b-2"
            >
              {t === 'All' ? 'All Essentials' : t} ({counts[t]})
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter by name or fiber..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-border text-xs bg-background focus:outline-none focus:border-primary w-48 sm:w-60"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="py-1.5 px-3 rounded-lg border border-border text-xs bg-background text-foreground focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state py-12">
          <p>No products match your current filter.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { setTab('All'); setSearchFilter(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}

export function EverydayBand() {
  return (
    <div className="intro-band page-width">
      <p>Master Handlooms. Eco-Friendly Precision. Bhavani Craft.</p>
      <div className="intro-facts">
        <span>
          <Leaf size={16} />
          100% Biodegradable Fibers
        </span>
        <span>
          <Award size={16} />
          Direct Factory Value
        </span>
        <span>
          <Factory size={16} />
          Bulk &amp; Custom Sizing
        </span>
      </div>
    </div>
  );
}
