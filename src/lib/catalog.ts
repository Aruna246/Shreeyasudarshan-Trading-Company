import tote from '@/assets/green-tote.jpg';
import woven from '@/assets/woven-bag.jpg';

import matMaroonCheck from '@/assets/mat-maroon-check.jpg';
import matPinkBlackStripe from '@/assets/mat-pink-black-stripe.jpg';
import matTexturedMultistripe from '@/assets/mat-textured-multistripe.jpg';
import matTasseledRunner from '@/assets/mat-tasseled-runner.jpg';

import matShaggyPalette from '@/assets/mat-shaggy-palette.jpg';
import matIkatCrossstitch from '@/assets/mat-ikat-crossstitch.jpg';
import matSolidRibbonFan from '@/assets/mat-solid-ribbon-fan.jpg';
import matFringeDiamondWeave from '@/assets/mat-fringe-diamond-weave.jpg';
import matGridGeometricFan from '@/assets/mat-grid-geometric-fan.jpg';

export type Product = {
  id: string;
  name: string;
  category: 'Bags' | 'Floor mats';
  material: string;
  price: number;
  image: string;
  badge: string;
  description: string;
  size: string;
};

export const defaultProducts: Product[] = [
  {
    id: 'everyday-tote',
    name: 'The Everyday Tote',
    category: 'Bags',
    material: 'Canvas · Forest',
    price: 890,
    image: tote,
    badge: 'Everyday favourite',
    description: 'A clean silhouette with generous space for the little things that make up your day. Natural canvas meets a deep forest-green finish.',
    size: '38 × 34 × 12 cm',
  },
  {
    id: 'mat-ikat-crossstitch',
    name: 'The Heritage Lattice Weave Mat',
    category: 'Floor mats',
    material: 'Thick Handloom Cotton · Crimson & Multi',
    price: 720,
    image: matIkatCrossstitch,
    badge: 'Artisan Favorite',
    description: 'Distinctive raised lattice flower weave in rich crimson, mustard ochre, turquoise and tangerine. Crafted with thick handloom cotton cord for plush underfoot comfort.',
    size: '60 × 90 cm',
  },
  {
    id: 'mat-fringe-diamond-weave',
    name: 'The Jaipur Diamond Knotted Mat',
    category: 'Floor mats',
    material: 'Handloom Cotton · Jewel Tones',
    price: 680,
    image: matFringeDiamondWeave,
    badge: 'Signature Fringes',
    description: 'Delicate geometric diamond micro-weave framed by hand-braided colorful tassels in royal purple, ruby, sapphire blue, and onyx black.',
    size: '60 × 95 cm',
  },
  {
    id: 'mat-shaggy-palette',
    name: 'The Pastel Textured Shag Mat',
    category: 'Floor mats',
    material: 'Chenille & Shag Cotton · Multi Palette',
    price: 790,
    image: matShaggyPalette,
    badge: 'Ultra Soft',
    description: 'Luxuriously soft textured shag tufting with alternating ridges of blush pink, honey gold, terracotta, olive green, and indigo.',
    size: '50 × 80 cm',
  },
  {
    id: 'mat-grid-geometric-fan',
    name: 'The Modern Grid Checker Mat',
    category: 'Floor mats',
    material: 'Woven Cotton · Magenta, Lime & Emerald',
    price: 580,
    image: matGridGeometricFan,
    badge: 'Contemporary Weave',
    description: 'Crisp textured two-tone rectangular grid weave offering high durability, easy washing, and bold modern room accents.',
    size: '50 × 80 cm',
  },
  {
    id: 'mat-solid-ribbon-fan',
    name: 'The Classic Ribbed Cotton Mat',
    category: 'Floor mats',
    material: 'Pure Handloom Cotton · Vibrant Solids',
    price: 520,
    image: matSolidRibbonFan,
    badge: 'Everyday Essential',
    description: 'Classic horizontal ribbed cotton mat available in rich jewel solids including deep teal, scarlet red, royal violet, and peacock blue.',
    size: '45 × 75 cm',
  },
  {
    id: 'mat-maroon-check',
    name: 'The Crimson Block Weave Mat',
    category: 'Floor mats',
    material: 'Woven Cotton · Crimson & Cream',
    price: 590,
    image: matMaroonCheck,
    badge: 'Artisan Weave',
    description: 'Rich maroon and cream checkerboard weave with subtle woven texture. Crafted with thick handloom cotton threads for a resilient finish.',
    size: '50 × 80 cm',
  },
  {
    id: 'woven-bag',
    name: 'The Weekend Weave',
    category: 'Bags',
    material: 'Woven texture · Natural',
    price: 1290,
    image: woven,
    badge: 'The weekend edit',
    description: 'A sculptural woven silhouette finished with round handles. A relaxed companion for slow mornings and weekend outings.',
    size: '32 × 28 × 10 cm',
  },
  {
    id: 'mat-pink-black-stripe',
    name: 'The Rose Noir Striped Mat',
    category: 'Floor mats',
    material: 'Handloom Cotton · Rose & Charcoal',
    price: 620,
    image: matPinkBlackStripe,
    badge: 'Bestseller',
    description: 'Contrast charcoal black and natural beige stripes framed by deep rose pink borders with handcrafted fringe tassels on both ends.',
    size: '60 × 90 cm',
  },
  {
    id: 'mat-textured-multistripe',
    name: 'The Sunburst Ribbed Rug',
    category: 'Floor mats',
    material: 'Knotted Cotton · Mustard & Plum',
    price: 740,
    image: matTexturedMultistripe,
    badge: 'Signature Texture',
    description: 'Plush ribbed weave with cheerful golden yellow bands and deep wine plum tones, finished with delicate braided cotton tassels.',
    size: '60 × 100 cm',
  },
  {
    id: 'mat-tasseled-runner',
    name: 'The Artisan Fringe Runner',
    category: 'Floor mats',
    material: 'Natural Woven Cotton · Multi Stripe',
    price: 680,
    image: matTasseledRunner,
    badge: 'Handcrafted',
    description: 'Carefully woven handloom runner with rhythmic stripe patterns and authentic hand-tied knotted tassels along the borders.',
    size: '55 × 95 cm',
  },
];

// Fallback initial export
export const products: Product[] = defaultProducts;

export type CartLine = { id: string; quantity: number };

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
};

export const defaultOrders: Order[] = [
  {
    id: 'ORD-2026-101',
    customerName: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    phone: '+91 98450 12345',
    address: '14, Greenview Residency, Indiranagar, Bengaluru, 560038',
    date: '2026-10-24 14:30',
    items: [
      { productId: 'everyday-tote', name: 'The Everyday Tote', price: 890, quantity: 1, image: tote },
      { productId: 'mat-maroon-check', name: 'The Crimson Block Weave Mat', price: 590, quantity: 1, image: matMaroonCheck },
    ],
    totalAmount: 1480,
    status: 'Processing',
    paymentMethod: 'UPI / Online',
  },
  {
    id: 'ORD-2026-102',
    customerName: 'Karthik Raja',
    email: 'karthik.r@example.com',
    phone: '+91 94441 67890',
    address: '42/B, Anna Nagar West, Chennai, 600040',
    date: '2026-10-23 18:15',
    items: [
      { productId: 'woven-bag', name: 'The Weekend Weave', price: 1290, quantity: 2, image: woven },
    ],
    totalAmount: 2580,
    status: 'Shipped',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-2026-103',
    customerName: 'Meera Iyer',
    email: 'meera.iyer@example.com',
    phone: '+91 97890 23456',
    address: '7, Palm Grove Avenue, RS Puram, Coimbatore, 641002',
    date: '2026-10-24 19:40',
    items: [
      { productId: 'mat-ikat-crossstitch', name: 'The Heritage Lattice Weave Mat', price: 720, quantity: 2, image: matIkatCrossstitch },
    ],
    totalAmount: 1440,
    status: 'Pending',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'ORD-2026-104',
    customerName: 'Sanjay Kumar',
    email: 'sanjay.k@example.com',
    phone: '+91 98200 45678',
    address: 'Plot 88, Jubilee Hills, Hyderabad, 500033',
    date: '2026-10-21 11:20',
    items: [
      { productId: 'everyday-tote', name: 'The Everyday Tote', price: 890, quantity: 1, image: tote },
    ],
    totalAmount: 890,
    status: 'Delivered',
    paymentMethod: 'UPI / Online',
  },
];

export function cartTotal(cart: CartLine[], productList: Product[] = products) {
  return cart.reduce((total, line) => {
    const item = productList.find(p => p.id === line.id) ?? defaultProducts.find(p => p.id === line.id);
    return total + (item?.price ?? 0) * line.quantity;
  }, 0);
}

export function changeQuantity(cart: CartLine[], id: string, amount: number): CartLine[] {
  const existing = cart.find(line => line.id === id);
  if (!existing) return amount > 0 ? [...cart, { id, quantity: amount }] : cart;
  return cart
    .map(line => (line.id === id ? { ...line, quantity: line.quantity + amount } : line))
    .filter(line => line.quantity > 0);
}

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | ShreeyaSudarshan` },
      { name: 'description', content: description },
      { property: 'og:title', content: `${title} | ShreeyaSudarshan` },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  };
}