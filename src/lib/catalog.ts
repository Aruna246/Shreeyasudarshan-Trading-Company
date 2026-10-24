import tote from '@/assets/green-tote.jpg';
import mat from '@/assets/sage-mat.jpg';
import woven from '@/assets/woven-bag.jpg';

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
    id: 'sage-mat',
    name: 'The Sage Stripe Mat',
    category: 'Floor mats',
    material: 'Woven texture · Sage',
    price: 690,
    image: mat,
    badge: 'A softer welcome',
    description: 'Quiet green stripes, tactile texture, and a natural finish. An understated accent for an entrance or a favourite corner.',
    size: '60 × 90 cm',
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
    id: 'natural-mat',
    name: 'The Natural Welcome Mat',
    category: 'Floor mats',
    material: 'Woven texture · Natural',
    price: 590,
    image: mat,
    badge: 'Simple essentials',
    description: 'Natural tones and an easy rectangular shape bring a considered finishing touch to everyday spaces.',
    size: '45 × 75 cm',
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
      { productId: 'sage-mat', name: 'The Sage Stripe Mat', price: 690, quantity: 1, image: mat },
    ],
    totalAmount: 1580,
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
      { productId: 'natural-mat', name: 'The Natural Welcome Mat', price: 590, quantity: 2, image: mat },
    ],
    totalAmount: 1180,
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