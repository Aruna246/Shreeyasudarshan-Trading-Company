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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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

const PRODUCTS_STORAGE_KEY = 'ss_boutique_products_v1';
const ORDERS_STORAGE_KEY = 'ss_boutique_orders_v1';

type Store = {
  cart: CartLine[];
  saved: string[];
  products: Product[];
  orders: Order[];
  toggleSave: (id: string) => void;
  setProduct: (product: Product) => void;
  openCart: () => void;
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
        <span className="brand-sub">Trading Company</span>
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
        setProductList(JSON.parse(storedProds));
      }
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        setOrderList(JSON.parse(storedOrders));
      }
    } catch {
      // fallback to initial state on private/restricted browsers
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
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    const prods = productList.map(p => (p.id === updated.id ? updated : p));
    saveProducts(prods);
  };

  const deleteProduct = (id: string) => {
    const prods = productList.filter(p => p.id !== id);
    saveProducts(prods);
    setCart(prev => prev.filter(c => c.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const ords = orderList.map(o => (o.id === orderId ? { ...o, status } : o));
    saveOrders(ords);
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
      phone: customer.phone || '+91 98765 43210',
      address: customer.address || 'Standard Delivery Address',
      date: dateStr,
      items,
      totalAmount: cartTotal(cart, productList),
      status: 'Pending',
      paymentMethod: customer.paymentMethod || 'Online / UPI',
    };

    const updated = [newOrder, ...orderList];
    saveOrders(updated);
    setCart([]);
    return newOrder;
  };

  const resetToDefaults = () => {
    saveProducts(defaultProducts);
    saveOrders(defaultOrders);
  };

  const location = useLocation();
  const toggleSave = (id: string) =>
    setSaved(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  const selectProduct = (p: Product) => {
    setQuantity(1);
    setProduct(p);
  };

  const searchResults = productList.filter(p =>
    `${p.name} ${p.category} ${p.material}`.toLowerCase().includes(query.toLowerCase())
  );

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

  const nav = (
    <>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        All collections
      </Link>
      <Link to="/shop" search={{ category: 'Bags' }} onClick={() => setMenuOpen(false)}>
        Bags
      </Link>
      <Link to="/shop" search={{ category: 'Floor mats' }} onClick={() => setMenuOpen(false)}>
        Floor mats
      </Link>
      <Link to="/our-story" className={location.pathname === '/our-story' ? 'active' : ''} onClick={() => setMenuOpen(false)}>
        Our story
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
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        createOrderFromCart,
        resetToDefaults,
      }}
    >
      <div className="site-watermark" aria-hidden="true">
        <img src={logo.url} alt="" width={1064} height={1042} />
      </div>
      <div className="announcement">
        THOUGHTFULLY MADE. BEAUTIFULLY EVERYDAY.
        <span className="hidden sm:inline ml-3 opacity-75">· Free delivery across India</span>
      </div>

      <header className="site-header page-width">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav}
        </nav>
        <div className="header-tools">
          <Button variant="ghost" size="icon" title="Search products" aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="header-wishlist relative"
            title="Saved favourites"
            aria-label="Saved favourites"
            onClick={() => setSavedOpen(true)}
          >
            <Heart size={18} fill={saved.length > 0 ? "currentColor" : "none"} />
            {saved.length > 0 && (
              <span className="bag-counter absolute -top-1 -right-1 text-[9px] min-w-3.5 h-3.5 bg-amber-700 text-white">
                {saved.length}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            className="px-2"
            title="Open shopping bag"
            aria-label="Open shopping bag"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span className="bag-counter">{cart.reduce((n, l) => n + l.quantity, 0)}</span>
          </Button>
          <Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu />
          </Button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">ShreeyaSudarshan</div>
              <p className="footer-tag">
                Bags for the places you go.
                <br />
                Floor mats for the place you call home.
              </p>
            </div>
            <div className="footer-links">
              <h3>Explore</h3>
              <Link to="/shop" search={{ category: 'Bags' }}>
                Bags
              </Link>
              <Link to="/shop" search={{ category: 'Floor mats' }}>
                Floor mats
              </Link>
              <Link to="/shop">All collections</Link>
            </div>
            <div className="footer-links">
              <h3>The company</h3>
              <Link to="/our-story">Our story</Link>
              <Button
                variant="link"
                className="justify-start p-0 h-auto text-surface-dark-foreground text-[11px]"
                onClick={() => setSearchOpen(true)}
              >
                Find your everyday essential <MoveUpRight />
              </Button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ShreeyaSudarshan Trading Company</span>
            <span>Concept storefront · Illustrative products and prices</span>
            <span>Rooted in everyday living.</span>
          </div>
        </div>
      </footer>

      {/* Mobile Drawer */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent>
          <SheetTitle>Explore</SheetTitle>
          <SheetDescription>ShreeyaSudarshan Trading Company</SheetDescription>
          <nav className="flex flex-col gap-5 mt-7" aria-label="Mobile navigation">
            {nav}
            <button
              type="button"
              className="flex items-center justify-between text-left py-2 border-t border-border/60 text-sm font-medium mt-2 pt-4"
              onClick={() => {
                setMenuOpen(false);
                setSavedOpen(true);
              }}
            >
              <span className="flex items-center gap-2">
                <Heart size={16} fill={saved.length > 0 ? "currentColor" : "none"} /> Saved Favourites
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary">
                {saved.length}
              </span>
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Shopping Bag Drawer */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetTitle>Your shopping bag</SheetTitle>
          <SheetDescription>{cart.reduce((n, l) => n + l.quantity, 0)} thoughtfully chosen essentials</SheetDescription>
          <div className="overflow-auto flex-1">
            {cart.length === 0 ? (
              <div className="empty-state">
                <ShoppingBag className="mx-auto mb-5" />
                <p>Your next everyday favourite awaits.</p>
                <Button variant="editorial" className="mt-6" onClick={() => setCartOpen(false)} asChild>
                  <Link to="/shop">
                    Explore the collection <ArrowRight />
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
                    <div>
                      <h3>{p.name}</h3>
                      <p>₹{p.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="quantity-control my-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Decrease ${p.name}`}
                            onClick={() => setCart(prev => changeQuantity(prev, p.id, -1))}
                          >
                            <Minus />
                          </Button>
                          <span>{line.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Increase ${p.name}`}
                            onClick={() => setCart(prev => changeQuantity(prev, p.id, 1))}
                          >
                            <Plus />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove ${p.name}`}
                          onClick={() => setCart(prev => prev.filter(l => l.id !== p.id))}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-total">
                <span>Subtotal</span>
                <span>₹{cartTotal(cart, productList).toLocaleString('en-IN')}</span>
              </div>
              <Button
                variant="editorial"
                className="w-full"
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutModalOpen(true);
                }}
              >
                Proceed to Checkout <ArrowRight />
              </Button>
              <p className="preview-note" role="status">
                Complimentary shipping on all orders. Thoughtfully packaged and dispatched.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-xl font-serif">Complete Your Order</DialogTitle>
          <DialogDescription>
            Enter shipping details to place your test/live order. It will instantly show on the Admin page.
          </DialogDescription>
          <form onSubmit={handlePlaceOrder} className="space-y-4 mt-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Priya Sundaram"
                value={checkoutForm.name}
                onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm bg-background"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1">Email</label>
                <input
                  required
                  type="email"
                  placeholder="priya@example.com"
                  value={checkoutForm.email}
                  onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1">Phone</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={checkoutForm.phone}
                  onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm bg-background"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1">Shipping Address</label>
              <textarea
                required
                rows={2}
                placeholder="Door No, Street, Landmark, City & Pincode"
                value={checkoutForm.address}
                onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1">Payment Method</label>
              <select
                value={checkoutForm.paymentMethod}
                onChange={e => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm bg-background"
              >
                <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe</option>
                <option value="Debit / Credit Card">Debit / Credit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            <div className="bg-secondary/60 p-3 rounded text-xs space-y-1 mt-4">
              <div className="flex justify-between font-medium">
                <span>Order Total ({cart.reduce((n, l) => n + l.quantity, 0)} items):</span>
                <span className="font-semibold text-primary">₹{cartTotal(cart, productList).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping:</span>
                <span className="text-emerald-700 font-medium">Free</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setCheckoutModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="editorial" className="flex-1">
                Confirm & Place Order
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Order Success Confirmation Dialog */}
      <Dialog open={orderSuccessModal !== null} onOpenChange={open => !open && setOrderSuccessModal(null)}>
        <DialogContent className="max-w-md text-center p-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mb-3">
            <CheckCircle2 size={28} />
          </div>
          <DialogTitle className="text-2xl font-serif">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="mt-1">
            Thank you! Your order ID is <span className="font-semibold text-foreground">{orderSuccessModal?.id}</span>.
          </DialogDescription>
          <div className="bg-secondary/50 rounded-lg p-3 text-left my-4 text-xs space-y-1.5 border border-border/50">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span className="font-medium">{orderSuccessModal?.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Paid/Due:</span>
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
          <p className="text-xs text-muted-foreground mb-4">
            We have received your order. We will reach out shortly to coordinate delivery.
          </p>
          <div className="flex gap-2">
            <Button variant="editorial" className="w-full" onClick={() => setOrderSuccessModal(null)}>
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent>
          <DialogTitle>Find your everyday favourite</DialogTitle>
          <DialogDescription>Explore bags and floor mats.</DialogDescription>
          <input
            autoFocus
            className="search-input"
            aria-label="Search collection"
            placeholder="Search bags, mats, colours…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="max-h-96 overflow-auto">
            {searchResults.length ? (
              searchResults.map(p => (
                <Button
                  key={p.id}
                  variant="image"
                  className="search-result w-full h-auto justify-start text-left"
                  onClick={() => {
                    setSearchOpen(false);
                    selectProduct(p);
                  }}
                >
                  <img src={p.image} alt={p.name} />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {p.category} · ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto" />
                </Button>
              ))
            ) : (
              <p className="empty-state">No matches. Try “bag” or “mat”.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Saved Favourites Sheet */}
      <Sheet open={savedOpen} onOpenChange={setSavedOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-auto">
          <SheetTitle>Your favourites</SheetTitle>
          <SheetDescription>A little collection of things you love.</SheetDescription>
          {saved.length ? (
            productList
              .filter(p => saved.includes(p.id))
              .map(p => (
                <div className="cart-row" key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <div>
                    <h3>{p.name}</h3>
                    <p>₹{p.price.toLocaleString('en-IN')}</p>
                    <Button
                      variant="understated"
                      onClick={() => {
                        setSavedOpen(false);
                        selectProduct(p);
                      }}
                    >
                      Take a closer look <ArrowRight />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <div className="empty-state">
              <Heart className="mx-auto mb-4" />
              Your favourites will find a home here.
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
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-auto">
          {product && (
            <>
              <DialogTitle className="sr-only">{product.name}</DialogTitle>
              <DialogDescription className="sr-only">Product preview and shopping bag</DialogDescription>
              <div className="detail-grid">
                <img src={product.image} alt={product.name} />
                <div>
                  <div className="eyebrow">{product.category}</div>
                  <h2 className="mt-3">{product.name}</h2>
                  <p className="mt-4 font-semibold text-lg text-primary">₹{product.price.toLocaleString('en-IN')}</p>
                  <p className="detail-copy">{product.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.material}
                    <br />
                    Dimensions / Size: {product.size}
                  </p>
                  <div className="quantity-control">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(n => Math.max(1, n - 1))}
                    >
                      <Minus />
                    </Button>
                    <span aria-label="Quantity">{quantity}</span>
                    <Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQuantity(n => n + 1)}>
                      <Plus />
                    </Button>
                  </div>
                  <Button
                    variant="editorial"
                    className="w-full"
                    onClick={() => {
                      setCart(prev => changeQuantity(prev, product.id, quantity));
                      setProduct(null);
                      setCartOpen(true);
                    }}
                  >
                    Add to bag <ShoppingBag />
                  </Button>
                  <p className="preview-note">Thoughtfully handcrafted by ShreeyaSudarshan Trading Company.</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </StoreContext.Provider>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const store = useStore();
  const saved = store.saved.includes(product.id);
  return (
    <article>
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
          onClick={() => store.toggleSave(product.id)}
        >
          <Heart fill={saved ? 'currentColor' : 'none'} />
        </Button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-meta">
          <span>{product.material}</span>
          <span className="text-foreground font-medium">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
        <div className="product-swatches" aria-label="Natural and forest palette">
          <span className="swatch natural" />
          <span className="swatch green" />
          <span className="swatch" />
        </div>
      </div>
    </article>
  );
}

export function ProductCollection({ filter = 'All' }: { filter?: string }) {
  const { products } = useStore();
  const [tab, setTab] = useState(filter);
  const filtered = products.filter(p => tab === 'All' || p.category === tab);
  return (
    <>
      <div className="filter-tabs" aria-label="Product categories">
        {['All', 'Bags', 'Floor mats'].map(t => (
          <Button key={t} variant="tab" data-active={tab === t} aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t === 'All' ? 'All essentials' : t}
          </Button>
        ))}
      </div>
      <div className="product-grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}

export function EverydayBand() {
  return (
    <div className="intro-band page-width">
      <p>Small details. A beautiful everyday.</p>
      <div className="intro-facts">
        <span>
          <Leaf size={15} />
          Nature-inspired textures
        </span>
        <span>
          <ShoppingBag size={15} />
          Made for everyday living
        </span>
        <span>
          <Grid2X2 size={15} />
          Bags &amp; floor mats
        </span>
      </div>
    </div>
  );
}