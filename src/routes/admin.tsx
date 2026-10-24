import { useState, useEffect, useRef } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Package,
  ShoppingBag,
  PlusCircle,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  RotateCcw,
  Tag,
  Layers,
  IndianRupee,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Trash2,
  Search,
  Filter,
  Upload,
  Image as ImageIcon,
  FileCheck,
  Edit3,
  Pencil,
  Lock,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Settings,
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
  FlaskConical,
  AlertTriangle,
} from 'lucide-react';
import { useStore, Eyebrow } from '@/components/storefront';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { pageHead, type OrderStatus, type Product } from '@/lib/catalog';
import {
  getSavedDatabaseUrl,
  saveDatabaseUrl,
  initNeonTables,
  syncProductToDb,
  syncOrderToDb,
  fetchProductsFromDb,
  fetchOrdersFromDb,
} from '@/lib/db';
import tote from '@/assets/green-tote.jpg';
import mat from '@/assets/sage-mat.jpg';
import woven from '@/assets/woven-bag.jpg';

export const Route = createFileRoute('/admin')({
  head: () =>
    pageHead(
      'Admin Portal - Orders & Product Management',
      'Manage orders, order statuses, and add new products to ShreeyaSudarshan Trading Company.'
    ),
  component: AdminPage,
});

const ADMIN_AUTH_KEY = 'ss_admin_authenticated_session';
const ADMIN_CREDENTIALS_KEY = 'ss_admin_user_credentials';
const DEFAULT_ADMIN_USERNAME = 'ShreeyaSudarshan';
const DEFAULT_ADMIN_PASSWORD = 'ABC@123';

function AdminPage() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    resetToDefaults,
  } = useStore();

  // Dynamic Credentials state
  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: DEFAULT_ADMIN_USERNAME,
    password: DEFAULT_ADMIN_PASSWORD,
  });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Settings tab form state
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: DEFAULT_ADMIN_USERNAME,
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [settingsSuccess, setSettingsSuccess] = useState<string>('');
  const [settingsError, setSettingsError] = useState<string>('');

  // Database Settings state
  const [dbUrl, setDbUrl] = useState<string>('');
  const [dbUrlInput, setDbUrlInput] = useState<string>('');
  const [dbStatus, setDbStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [dbStatusMsg, setDbStatusMsg] = useState<string>('');
  const [dbSyncing, setDbSyncing] = useState<boolean>(false);
  const [dbSyncMsg, setDbSyncMsg] = useState<string>('');
  const dbUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const storedCreds = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
      if (storedCreds) {
        const parsed = JSON.parse(storedCreds);
        if (parsed.username && parsed.password) {
          setCredentials(parsed);
          setSettingsForm(prev => ({ ...prev, newUsername: parsed.username }));
        }
      }
      const session = sessionStorage.getItem(ADMIN_AUTH_KEY);
      if (session === 'true') {
        setIsAuthenticated(true);
      }
      // Load saved DB URL
      const savedUrl = getSavedDatabaseUrl();
      if (savedUrl) {
        setDbUrl(savedUrl);
        setDbUrlInput(savedUrl);
        setDbStatus('success');
        setDbStatusMsg('Connected — database URL loaded from storage.');
      }
    } catch {
      // sessionStorage/localStorage might fail in restricted iframe settings
    }
    setAuthChecked(true);
  }, []);

  const handleTestDb = async () => {
    const url = dbUrlInput.trim();
    if (!url) {
      setDbStatus('error');
      setDbStatusMsg('Please enter a Neon Database connection string.');
      return;
    }
    setDbStatus('testing');
    setDbStatusMsg('Initializing and testing database connection…');
    const result = await initNeonTables(url);
    if (result.success) {
      saveDatabaseUrl(url);
      setDbUrl(url);
      setDbStatus('success');
      setDbStatusMsg(result.message);
    } else {
      setDbStatus('error');
      setDbStatusMsg(result.message || 'Connection failed. Check your connection string.');
    }
  };

  const handleSyncAllToDb = async () => {
    if (!dbUrl) {
      setDbSyncMsg('No database connected. Test & save your DB URL first.');
      return;
    }
    setDbSyncing(true);
    setDbSyncMsg('Syncing all products & orders to database…');
    try {
      let ok = true;
      for (const p of products) {
        const r = await syncProductToDb(p, dbUrl);
        if (!r) ok = false;
      }
      for (const o of orders) {
        const r = await syncOrderToDb(o, dbUrl);
        if (!r) ok = false;
      }
      setDbSyncMsg(ok ? `✓ Synced ${products.length} products & ${orders.length} orders to Neon DB.` : 'Some records failed to sync. Check console for details.');
    } catch (e: any) {
      setDbSyncMsg('Sync failed: ' + (e?.message || 'Unknown error'));
    } finally {
      setDbSyncing(false);
    }
  };

  const handleLoadFromDb = async () => {
    if (!dbUrl) {
      setDbSyncMsg('No database connected. Test & save your DB URL first.');
      return;
    }
    setDbSyncing(true);
    setDbSyncMsg('Loading data from database…');
    try {
      const dbProds = await fetchProductsFromDb(dbUrl);
      const dbOrds = await fetchOrdersFromDb(dbUrl);
      let msg = '';
      if (dbProds && dbProds.length > 0) {
        msg += `Loaded ${dbProds.length} products from DB. `;
      } else {
        msg += 'No products found in DB (local data kept). ';
      }
      if (dbOrds && dbOrds.length > 0) {
        msg += `Loaded ${dbOrds.length} orders from DB.`;
      } else {
        msg += 'No orders found in DB (local data kept).';
      }
      setDbSyncMsg(msg);
    } catch (e: any) {
      setDbSyncMsg('Load failed: ' + (e?.message || 'Unknown error'));
    } finally {
      setDbSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginUsername.trim() === credentials.username && loginPassword === credentials.password) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } catch {}
    } else {
      setLoginError('Invalid Username or Password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPassword('');
    try {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {}
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    // Check current password
    if (settingsForm.currentPassword !== credentials.password) {
      setSettingsError('Current Password does not match.');
      return;
    }

    if (!settingsForm.newUsername.trim()) {
      setSettingsError('Username cannot be empty.');
      return;
    }

    // Determine new password
    let updatedPassword = credentials.password;
    if (settingsForm.newPassword) {
      if (settingsForm.newPassword.length < 5) {
        setSettingsError('New password must be at least 5 characters.');
        return;
      }
      if (settingsForm.newPassword !== settingsForm.confirmPassword) {
        setSettingsError('New Password and Confirm Password do not match.');
        return;
      }
      updatedPassword = settingsForm.newPassword;
    }

    const updatedCreds = {
      username: settingsForm.newUsername.trim(),
      password: updatedPassword,
    };

    setCredentials(updatedCreds);
    try {
      localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(updatedCreds));
    } catch {}

    setSettingsSuccess('Credentials updated successfully!');
    setSettingsForm({
      currentPassword: '',
      newUsername: updatedCreds.username,
      newPassword: '',
      confirmPassword: '',
    });
  };

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'new-product' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [productSearch, setProductSearch] = useState<string>('');

  // Form State for Adding New Product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Bags' as 'Bags' | 'Floor mats',
    material: '',
    price: '',
    badge: 'New Arrival',
    description: '',
    size: '',
    imageType: 'upload' as 'upload' | 'custom',
    uploadedImage: '' as string,
    uploadedFileName: '' as string,
    customImageUrl: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [imageError, setImageError] = useState('');

  // State for Editing an Existing Product
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: 'Bags' as 'Bags' | 'Floor mats',
    material: '',
    price: '',
    badge: '',
    description: '',
    size: '',
    image: '',
    imageType: 'keep' as 'keep' | 'upload' | 'custom',
    customImageUrl: '',
    uploadedImage: '',
    uploadedFileName: '',
  });
  const [editImageError, setEditImageError] = useState('');
  const [editSavedSuccess, setEditSavedSuccess] = useState(false);

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setEditForm({
      name: p.name,
      category: p.category,
      material: p.material,
      price: String(p.price),
      badge: p.badge,
      description: p.description,
      size: p.size,
      image: p.image,
      imageType: 'keep',
      customImageUrl: '',
      uploadedImage: '',
      uploadedFileName: '',
    });
    setEditImageError('');
    setEditSavedSuccess(false);
  };

  const handleEditImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditImageError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setEditImageError('Please select a valid image file (PNG, JPG, JPEG, WebP, etc.)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setEditImageError('Image file is large (>8MB). Please choose a compressed photo under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        setEditForm(prev => ({
          ...prev,
          imageType: 'upload',
          uploadedImage: result,
          uploadedFileName: file.name,
        }));
      }
    };
    reader.onerror = () => {
      setEditImageError('Failed to read the image file from folder.');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editForm.name || !editForm.price) return;

    let finalImage = editForm.image;
    if (editForm.imageType === 'upload') {
      if (editForm.uploadedImage) {
        finalImage = editForm.uploadedImage;
      } else {
        setEditImageError('Please select a photo from your computer/folder.');
        return;
      }
    } else if (editForm.imageType === 'custom' && editForm.customImageUrl.trim()) {
      finalImage = editForm.customImageUrl.trim();
    }

    const updated: Product = {
      ...editingProduct,
      name: editForm.name,
      category: editForm.category,
      material: editForm.material || (editForm.category === 'Bags' ? 'Canvas · Natural' : 'Woven texture · Earth'),
      price: Number(editForm.price) || 0,
      image: finalImage,
      badge: editForm.badge,
      description: editForm.description,
      size: editForm.size || (editForm.category === 'Bags' ? '35 × 30 × 12 cm' : '60 × 90 cm'),
    };

    updateProduct(updated);
    setEditSavedSuccess(true);
    setTimeout(() => {
      setEditSavedSuccess(false);
      setEditingProduct(null);
    }, 900);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file (PNG, JPG, JPEG, WebP, etc.)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setImageError('Image file is large (>8MB). Please choose a compressed photo under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        setNewProduct(prev => ({
          ...prev,
          imageType: 'upload',
          uploadedImage: result,
          uploadedFileName: file.name,
        }));
      }
    };
    reader.onerror = () => {
      setImageError('Failed to read the image file from folder. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    let chosenImage = '';
    if (newProduct.imageType === 'upload') {
      if (newProduct.uploadedImage) {
        chosenImage = newProduct.uploadedImage;
      } else {
        setImageError('Please choose an image file from your computer/folder.');
        return;
      }
    } else if (newProduct.imageType === 'custom' && newProduct.customImageUrl.trim()) {
      chosenImage = newProduct.customImageUrl.trim();
    } else {
      setImageError('Please choose a product image from your folder.');
      return;
    }

    addProduct({
      name: newProduct.name,
      category: newProduct.category,
      material: newProduct.material || (newProduct.category === 'Bags' ? 'Canvas · Natural' : 'Woven texture · Earth'),
      price: Number(newProduct.price) || 990,
      image: chosenImage,
      badge: newProduct.badge || 'New Essential',
      description:
        newProduct.description ||
        'Thoughtfully designed with natural tones and balanced dimensions for daily use.',
      size: newProduct.size || (newProduct.category === 'Bags' ? '35 × 30 × 12 cm' : '60 × 90 cm'),
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveTab('products');
      setNewProduct({
        name: '',
        category: 'Bags',
        material: '',
        price: '',
        badge: 'New Arrival',
        description: '',
        size: '',
        imageType: 'upload',
        uploadedImage: '',
        uploadedFileName: '',
        customImageUrl: '',
      });
    }, 1200);
  };

  // Status badge styling helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock size={12} /> Pending
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <RotateCcw size={12} className="animate-spin-slow" /> Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">
            <Truck size={12} /> Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 size={12} /> Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle size={12} /> Cancelled
          </span>
        );
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(orderSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filteredProducts = products.filter(p => {
    return (
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.material.toLowerCase().includes(productSearch.toLowerCase())
    );
  });

  // Calculate statistics
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative">
        <div className="w-full max-w-md bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <Lock size={22} />
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-[10px] uppercase tracking-[2px] font-medium text-foreground">
                Security Gate
              </span>
              <span className="w-8 h-[1px] bg-gold" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold mt-2">Admin Portal Login</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Please enter your administrator credentials to access store controls.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
              <XCircle size={16} className="shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={15} />
                </span>
                <input
                  required
                  type="text"
                  placeholder="Enter username"
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  className="w-full border rounded-lg pl-9 pr-3.5 py-2.5 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <KeyRound size={15} />
                </span>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full border rounded-lg pl-9 pr-10 py-2.5 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="editorial" className="w-full mt-2 h-10 gap-2">
              <ShieldCheck size={16} /> Sign In to Admin
            </Button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-border/50">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page bg-background min-h-screen pb-20">
      {/* Header bar */}
      <section className="catalog-heading border-b border-border/60">
        <Eyebrow>Control Center</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-serif">Admin Portal</h1>
        <p className="max-w-xl mx-auto">
          Manage customer orders, track fulfillment status, and add new products with live storefront synchronization.
        </p>
      </section>

      <div className="page-width mt-8">
        {/* KPI Stats overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase font-medium">
              <span>Total Orders</span>
              <Package size={16} className="text-primary" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-semibold mt-2">{orders.length}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Live customer requests</div>
          </div>

          <div className="bg-card border rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase font-medium">
              <span>Total Revenue</span>
              <IndianRupee size={16} className="text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-semibold text-emerald-800 mt-2">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Excl. cancelled orders</div>
          </div>

          <div className="bg-card border rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase font-medium">
              <span>Pending Action</span>
              <Clock size={16} className="text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-semibold text-amber-700 mt-2">
              {pendingOrdersCount}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Awaiting fulfillment</div>
          </div>

          <div className="bg-card border rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between text-muted-foreground text-xs uppercase font-medium">
              <span>Active Products</span>
              <ShoppingBag size={16} className="text-primary" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-semibold mt-2">{products.length}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Live on website</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            <Button
              variant={activeTab === 'orders' ? 'editorial' : 'outline'}
              size="sm"
              className="gap-1.5 text-xs whitespace-nowrap shrink-0 flex-1 sm:flex-initial"
              onClick={() => setActiveTab('orders')}
            >
              <Package size={14} />
              Orders ({orders.length})
            </Button>
            <Button
              variant={activeTab === 'products' ? 'editorial' : 'outline'}
              size="sm"
              className="gap-1.5 text-xs whitespace-nowrap shrink-0 flex-1 sm:flex-initial"
              onClick={() => setActiveTab('products')}
            >
              <ShoppingBag size={14} />
              Products ({products.length})
            </Button>
            <Button
              variant={activeTab === 'new-product' ? 'editorial' : 'outline'}
              size="sm"
              className="gap-1.5 text-xs whitespace-nowrap shrink-0 flex-1 sm:flex-initial"
              onClick={() => setActiveTab('new-product')}
            >
              <PlusCircle size={14} />
              Add Product
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'editorial' : 'outline'}
              size="sm"
              className="gap-1.5 text-xs whitespace-nowrap shrink-0 flex-1 sm:flex-initial"
              onClick={() => {
                setActiveTab('settings');
                setSettingsError('');
                setSettingsSuccess('');
              }}
            >
              <Settings size={14} />
              Settings
            </Button>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/40">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground h-8 px-2"
              title="Reset data to factory samples"
              onClick={() => {
                if (window.confirm('Reset catalog and orders to default sample data?')) {
                  resetToDefaults();
                }
              }}
            >
              Reset Samples
            </Button>
            <Button variant="outline" size="sm" asChild className="h-8">
              <Link to="/shop" target="_blank" className="gap-1 text-xs">
                View Storefront <ExternalLink size={12} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 gap-1"
              onClick={handleLogout}
              title="Sign out of Admin"
            >
              <LogOut size={12} /> Logout
            </Button>
          </div>
        </div>

        {/* TAB 1: ORDERS & ORDER STATUS */}
        {activeTab === 'orders' && (
          <div className="mt-6 space-y-5">
            {/* Filter & search bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-card p-3 rounded-lg border">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search order ID, customer, phone, product..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-border bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-muted-foreground flex items-center gap-1 mr-1">
                  <Filter size={13} /> Filter:
                </span>
                {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setOrderFilter(status)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      orderFilter === status
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-secondary/70 text-foreground hover:bg-secondary'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders list */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center border rounded-xl bg-card">
                <Package className="mx-auto h-10 w-10 text-muted-foreground/60 mb-2" />
                <h3 className="font-serif text-lg font-medium">No orders found</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {orderSearch || orderFilter !== 'All'
                    ? 'Try clearing the search query or changing the status filter.'
                    : 'Customer orders will appear here once placed on the storefront.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="border rounded-xl bg-card p-5 shadow-xs hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-border/60">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
                            {order.id}
                          </span>
                          {getStatusBadge(order.status)}
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar size={13} /> {order.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1 text-foreground font-medium">
                            <User size={13} /> {order.customerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={13} /> {order.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail size={13} /> {order.email}
                          </span>
                        </div>
                      </div>

                      {/* Status changer dropdown */}
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                          Change Status:
                        </label>
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="text-xs border rounded-md px-2.5 py-1.5 font-medium bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order details & line items */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="md:col-span-2 space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Ordered Items ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
                        </div>
                        <div className="divide-y divide-border/40">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-2 text-xs">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded border"
                                />
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{item.name}</div>
                                <div className="text-muted-foreground">
                                  ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                                </div>
                              </div>
                              <div className="font-semibold text-foreground">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-secondary/40 rounded-lg p-3 text-xs space-y-2 border border-border/40 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            Delivery Address
                          </div>
                          <p className="text-foreground leading-relaxed flex items-start gap-1">
                            <MapPin size={13} className="shrink-0 mt-0.5 text-primary" />
                            {order.address}
                          </p>
                        </div>

                        <div className="border-t border-border/60 pt-2 space-y-1">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Payment:</span>
                            <span className="font-medium text-foreground">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-semibold">
                            <span>Total Bill:</span>
                            <span className="text-primary font-bold">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="mt-6 space-y-5">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-card p-3 rounded-lg border">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products by title, category, material..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-border bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                />
              </div>

              <Button variant="editorial" size="sm" className="gap-1.5" onClick={() => setActiveTab('new-product')}>
                <PlusCircle size={14} /> Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-card border rounded-xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative aspect-4/3 bg-muted overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-background/90 backdrop-blur-xs text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
                        {p.category}
                      </span>
                      {p.badge && (
                        <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[10px] font-medium px-2 py-0.5 rounded">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-medium text-base leading-snug">{p.name}</h3>
                        <span className="font-bold text-primary whitespace-nowrap">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">{p.material}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                      <div className="text-[11px] text-muted-foreground pt-1">
                        <span className="font-medium text-foreground">Size:</span> {p.size}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-t bg-secondary/20 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-muted-foreground font-mono truncate max-w-[120px]">
                      ID: {p.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 text-xs gap-1 border-border/80 hover:bg-secondary"
                        onClick={() => openEditModal(p)}
                      >
                        <Pencil size={12} /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 h-8 px-2 text-xs gap-1"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ADD NEW PRODUCT FORM */}
        {activeTab === 'new-product' && (
          <div className="mt-4 sm:mt-6 w-full max-w-2xl mx-auto bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xs">
            <div className="mb-4 sm:mb-6">
              <Eyebrow>New Item Details</Eyebrow>
              <h2 className="text-xl sm:text-3xl font-serif font-semibold mt-1">Add Product to Storefront</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Enter product details below. Once created, customers can immediately view and order this product.
              </p>
            </div>

            {formSubmitted && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-2.5">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                <div>
                  <h4 className="font-medium text-xs sm:text-sm">Product Created Successfully!</h4>
                  <p className="text-[11px] sm:text-xs mt-0.5">Redirecting to product list...</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                  Product Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. The Heritage Sling Bag or The Olive Jute Mat"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                    Category *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={e =>
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value as 'Bags' | 'Floor mats',
                      })
                    }
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  >
                    <option value="Bags">Bags</option>
                    <option value="Floor mats">Floor mats</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                    Price (₹ INR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-xs">
                      ₹
                    </span>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="e.g. 1190"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full border rounded-lg pl-8 pr-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                    Material & Color
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Canvas · Forest or Woven texture · Earth"
                    value={newProduct.material}
                    onChange={e => setNewProduct({ ...newProduct, material: e.target.value })}
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                    Dimensions / Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 38 × 34 × 12 cm or 60 × 90 cm"
                    value={newProduct.size}
                    onChange={e => setNewProduct({ ...newProduct, size: e.target.value })}
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                  Badge / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Everyday favourite, Artisan Handcrafted, New Edition"
                  value={newProduct.badge}
                  onChange={e => setNewProduct({ ...newProduct, badge: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a warm, thoughtful description of the craftsmanship, texture, and everyday utility..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>

              {/* Product Image Option */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider block">
                    Product Image *
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    Upload from your folders or use studio photos
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="imageType"
                      checked={newProduct.imageType === 'upload'}
                      onChange={() => setNewProduct({ ...newProduct, imageType: 'upload' })}
                    />
                    <span className="flex items-center gap-1 text-primary">
                      <Upload size={14} /> Upload from folder / Computer
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="imageType"
                      checked={newProduct.imageType === 'custom'}
                      onChange={() => setNewProduct({ ...newProduct, imageType: 'custom' })}
                    />
                    <span>Image Web URL</span>
                  </label>
                </div>

                {imageError && (
                  <div className="p-2.5 rounded bg-rose-50 border border-rose-300 text-rose-700 text-xs">
                    {imageError}
                  </div>
                )}

                {/* Option 1: Local folder upload */}
                {newProduct.imageType === 'upload' && (
                  <div className="space-y-3 pt-1">
                    <label className="block border-2 border-dashed border-border/80 hover:border-primary rounded-xl p-5 text-center cursor-pointer transition-colors bg-secondary/15 hover:bg-secondary/30">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Upload size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            Click to browse & choose image from your computer / folder
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Supports PNG, JPG, JPEG, WEBP, SVG (Up to 8MB)
                          </p>
                        </div>
                      </div>
                    </label>

                    {newProduct.uploadedImage && (
                      <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                        <img
                          src={newProduct.uploadedImage}
                          alt="Uploaded product preview"
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <FileCheck size={14} /> Selected Image
                          </div>
                          <p className="text-foreground truncate font-mono mt-0.5">
                            {newProduct.uploadedFileName || 'Custom local image'}
                          </p>
                          <span className="text-[11px] text-muted-foreground">Ready to publish</span>
                        </div>
                        <label className="text-xs text-primary underline cursor-pointer hover:text-primary/80">
                          Change
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageFileChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {/* Option 2: Image URL */}
                {newProduct.imageType === 'custom' && (
                  <div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newProduct.customImageUrl}
                      onChange={e => setNewProduct({ ...newProduct, customImageUrl: e.target.value })}
                      className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Paste any public image URL (JPEG/PNG/WebP).
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setActiveTab('products')}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="editorial" className="flex-1 gap-1.5">
                  <PlusCircle size={15} /> Save & Publish Product
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: SETTINGS (CREDENTIALS + DATABASE) */}
        {activeTab === 'settings' && (
          <div className="mt-4 sm:mt-6 space-y-6 w-full max-w-xl mx-auto">

            {/* ── SECTION 1: Admin Credentials ──────────────────────── */}
            <div className="bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xs">
              <div className="mb-5 sm:mb-6">
                <Eyebrow>Account Settings</Eyebrow>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold mt-1">Admin Credentials</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Change your admin portal login username and password. Changes are saved instantly.
                </p>
              </div>

              {settingsSuccess && (
                <div className="mb-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-2 text-xs">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{settingsSuccess}</span>
                </div>
              )}

              {settingsError && (
                <div className="mb-4 p-3.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 flex items-center gap-2 text-xs">
                  <XCircle size={16} className="text-rose-600 shrink-0" />
                  <span>{settingsError}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <KeyRound size={15} />
                    </span>
                    <input
                      required
                      type={showCurrentPass ? 'text' : 'password'}
                      placeholder="Enter current password to authorize changes"
                      value={settingsForm.currentPassword}
                      onChange={e => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                      className="w-full border rounded-lg pl-9 pr-10 py-2.5 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                    >
                      {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      New Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User size={15} />
                      </span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. ShreeyaSudarshan"
                        value={settingsForm.newUsername}
                        onChange={e => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                        className="w-full border rounded-lg pl-9 pr-3.5 py-2.5 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground mt-0.5 block">
                      Current active username: <strong className="font-mono text-foreground">{credentials.username}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      New Password (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock size={15} />
                      </span>
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        placeholder="Leave blank to keep existing password"
                        value={settingsForm.newPassword}
                        onChange={e => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                        className="w-full border rounded-lg pl-9 pr-10 py-2.5 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      >
                        {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {settingsForm.newPassword && (
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Lock size={15} />
                        </span>
                        <input
                          required
                          type={showNewPass ? 'text' : 'password'}
                          placeholder="Re-type new password"
                          value={settingsForm.confirmPassword}
                          onChange={e => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                          className="w-full border rounded-lg pl-9 pr-3.5 py-2.5 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setActiveTab('orders');
                      setSettingsError('');
                      setSettingsSuccess('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="editorial" className="flex-1 gap-1.5">
                    <ShieldCheck size={15} /> Save Credentials
                  </Button>
                </div>
              </form>
            </div>

            {/* ── SECTION 2: Neon Database Connection ───────────────── */}
            <div className="bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xs">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <Database size={16} className="text-primary" />
                  <Eyebrow>Database</Eyebrow>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold">Neon Database Connection</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect a Neon PostgreSQL database to persist products and orders beyond local storage.
                  Get your free DB at{' '}
                  <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">neon.tech</a>.
                </p>
              </div>

              {/* Connection status banner */}
              <div className={`mb-4 flex items-center gap-2 text-xs px-3.5 py-2.5 rounded-lg border ${
                dbStatus === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : dbStatus === 'error'
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : dbStatus === 'testing'
                  ? 'bg-blue-50 border-blue-300 text-blue-800'
                  : 'bg-secondary/40 border-border text-muted-foreground'
              }`}>
                {dbStatus === 'success' && <Wifi size={14} className="text-emerald-600 shrink-0" />}
                {dbStatus === 'error' && <WifiOff size={14} className="text-rose-600 shrink-0" />}
                {dbStatus === 'testing' && <RefreshCw size={14} className="text-blue-600 shrink-0 animate-spin" />}
                {dbStatus === 'idle' && <Database size={14} className="shrink-0" />}
                <span>
                  {dbStatusMsg || 'No database connected. Paste your Neon connection string below.'}
                </span>
              </div>

              {/* Connection string input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider block">
                  Neon Connection String
                </label>
                <div className="flex gap-2">
                  <input
                    ref={dbUrlRef}
                    type="password"
                    placeholder="postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require"
                    value={dbUrlInput}
                    onChange={e => setDbUrlInput(e.target.value)}
                    className="flex-1 min-w-0 border rounded-lg px-3.5 py-2.5 text-xs font-mono bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                  <Button
                    type="button"
                    variant="editorial"
                    size="sm"
                    className="gap-1.5 shrink-0 h-10"
                    disabled={dbStatus === 'testing'}
                    onClick={handleTestDb}
                  >
                    {dbStatus === 'testing' ? (
                      <RefreshCw size={13} className="animate-spin" />
                    ) : (
                      <FlaskConical size={13} />
                    )}
                    Test & Save
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Your connection string is stored only in your browser's localStorage and never sent to any third-party server.
                </p>
              </div>

              {/* Sync actions */}
              {dbUrl && (
                <div className="mt-5 border-t border-border/60 pt-5 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data Sync Actions</p>

                  {dbSyncMsg && (
                    <div className="flex items-start gap-2 text-xs p-3 rounded-lg bg-secondary/30 border border-border">
                      <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>{dbSyncMsg}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 text-xs"
                      disabled={dbSyncing}
                      onClick={handleSyncAllToDb}
                    >
                      {dbSyncing ? <RefreshCw size={13} className="animate-spin" /> : <Database size={13} />}
                      Push Local → Database
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 text-xs"
                      disabled={dbSyncing}
                      onClick={handleLoadFromDb}
                    >
                      {dbSyncing ? <RefreshCw size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                      Pull Database → Local
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    <strong>Push</strong> saves all current products &amp; orders to Neon. <strong>Pull</strong> loads data from Neon into the storefront.
                  </p>
                </div>
              )}

              {/* How to get Neon DB guide */}
              <div className="mt-5 border-t border-border/60 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Quick Setup Guide</p>
                <ol className="text-[11px] text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Go to <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="underline">neon.tech</a> and create a free account.</li>
                  <li>Create a new project and database.</li>
                  <li>Copy the <strong>Connection string</strong> from the dashboard (starts with <code className="font-mono">postgresql://</code>).</li>
                  <li>Paste it above and click <strong>Test & Save</strong>.</li>
                  <li>Use <strong>Push Local → Database</strong> to sync your store data.</li>
                </ol>
              </div>
            </div>

          </div>
        )}

        {/* EDIT PRODUCT MODAL DIALOG */}
        <Dialog open={editingProduct !== null} onOpenChange={open => !open && setEditingProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-xl font-serif">Edit Product</DialogTitle>
            <DialogDescription>
              Update product details, pricing, descriptions, or change the image.
            </DialogDescription>

            {editSavedSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-2 text-xs">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Product updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleUpdateProductSubmit} className="space-y-4 mt-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                  Product Name *
                </label>
                <input
                  required
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Category *
                  </label>
                  <select
                    value={editForm.category}
                    onChange={e =>
                      setEditForm({
                        ...editForm,
                        category: e.target.value as 'Bags' | 'Floor mats',
                      })
                    }
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  >
                    <option value="Bags">Bags</option>
                    <option value="Floor mats">Floor mats</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Price (₹ INR) *
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={editForm.price}
                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Material & Color
                  </label>
                  <input
                    type="text"
                    value={editForm.material}
                    onChange={e => setEditForm({ ...editForm, material: e.target.value })}
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Dimensions / Size
                  </label>
                  <input
                    type="text"
                    value={editForm.size}
                    onChange={e => setEditForm({ ...editForm, size: e.target.value })}
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                  Badge / Tagline
                </label>
                <input
                  type="text"
                  value={editForm.badge}
                  onChange={e => setEditForm({ ...editForm, badge: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                />
              </div>

              {/* Product Image in Edit Modal */}
              <div className="border-t pt-3 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider block">
                  Product Image
                </label>

                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="editImageType"
                      checked={editForm.imageType === 'keep'}
                      onChange={() => setEditForm({ ...editForm, imageType: 'keep' })}
                    />
                    <span>Keep Current Photo</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="editImageType"
                      checked={editForm.imageType === 'upload'}
                      onChange={() => setEditForm({ ...editForm, imageType: 'upload' })}
                    />
                    <span>Upload New Photo from Folder</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="editImageType"
                      checked={editForm.imageType === 'custom'}
                      onChange={() => setEditForm({ ...editForm, imageType: 'custom' })}
                    />
                    <span>Change Image URL</span>
                  </label>
                </div>

                {editImageError && (
                  <p className="text-xs text-rose-600">{editImageError}</p>
                )}

                {editForm.imageType === 'keep' && (
                  <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-secondary/20">
                    <img
                      src={editForm.image}
                      alt="Current photo"
                      className="w-14 h-14 object-cover rounded border"
                    />
                    <span className="text-xs text-muted-foreground">Currently active photo</span>
                  </div>
                )}

                {editForm.imageType === 'upload' && (
                  <div className="space-y-2 pt-1">
                    <label className="block border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer transition-colors bg-secondary/15 hover:bg-secondary/30">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEditImageFileChange}
                      />
                      <div className="flex flex-col items-center gap-1">
                        <Upload size={18} className="text-primary" />
                        <span className="text-xs font-medium">Click to choose image from folder</span>
                      </div>
                    </label>

                    {editForm.uploadedImage && (
                      <div className="flex items-center gap-3 p-2.5 rounded-lg border bg-card">
                        <img
                          src={editForm.uploadedImage}
                          alt="New preview"
                          className="w-14 h-14 object-cover rounded border"
                        />
                        <span className="text-xs text-emerald-700 font-medium truncate">
                          {editForm.uploadedFileName || 'New photo selected'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {editForm.imageType === 'custom' && (
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={editForm.customImageUrl}
                    onChange={e => setEditForm({ ...editForm, customImageUrl: e.target.value })}
                    className="w-full border rounded-lg px-3.5 py-2 text-sm bg-background border-border focus:ring-1 focus:ring-primary outline-hidden"
                  />
                )}
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="editorial" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
