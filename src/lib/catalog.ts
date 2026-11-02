import tote from '@/assets/green-tote.jpg';
import woven from '@/assets/woven-bag.jpg';
import bagCottonTote from '@/assets/bag-cotton-tote.jpg';
import bagGoldenJute from '@/assets/bag-golden-jute.jpg';
import bagSageNonwoven from '@/assets/bag-sage-nonwoven.jpg';
import bagBlockprintFloral from '@/assets/bag-blockprint-floral.jpg';
import bagJuteCottonCombo from '@/assets/bag-jute-cotton-combo.jpg';
import bagRoyalNonwoven from '@/assets/bag-royal-nonwoven.jpg';
import bagTerracottaCanvas from '@/assets/bag-terracotta-canvas.jpg';
import bagOchreKhadi from '@/assets/bag-ochre-khadi.jpg';
import bagCharcoalNonwoven from '@/assets/bag-charcoal-nonwoven.jpg';

import matMaroonCheck from '@/assets/mat-maroon-check.jpg';
import matPinkBlackStripe from '@/assets/mat-pink-black-stripe.jpg';
import matTexturedMultistripe from '@/assets/mat-textured-multistripe.jpg';
import matTasseledRunner from '@/assets/mat-tasseled-runner.jpg';

import matShaggyPalette from '@/assets/mat-shaggy-palette.jpg';
import matIkatCrossstitch from '@/assets/mat-ikat-crossstitch.jpg';
import matSolidRibbonFan from '@/assets/mat-solid-ribbon-fan.jpg';
import matFringeDiamondWeave from '@/assets/mat-fringe-diamond-weave.jpg';
import matGridGeometricFan from '@/assets/mat-grid-geometric-fan.jpg';

import matGrape from '@/assets/mat-grape.jpg';
import matColours from '@/assets/mat-colours.jpg';
import matRainbow from '@/assets/mat-rainbow.jpg';
import matLimestone from '@/assets/mat-limestone.jpg';
import matGuptha from '@/assets/mat-guptha.jpg';
import matTrack from '@/assets/mat-track.jpg';
import matFourMatrix from '@/assets/mat-four-matrix.jpg';
import matVasthuOval from '@/assets/mat-vasthu-round-oval.jpg';
import matZigZagLarge from '@/assets/mat-zig-zag-large.jpg';
import matTwoInOne from '@/assets/mat-two-in-one.jpg';
import matThirdEye from '@/assets/mat-third-eye.jpg';
import matRoyalVasthu from '@/assets/mat-royal-vasthu.jpg';

export type Product = {
  id: string;
  name: string;
  category: 'Bags' | 'Floor mats';
  material: string;
  price: number;
  priceNote?: string;
  image: string;
  badge: string;
  description: string;
  size: string;
};

export const defaultProducts: Product[] = [
  {
    id: 'bag-cotton-tote',
    name: 'The Classic Handloom Cotton Tote',
    category: 'Bags',
    material: 'Pure Handloom Cotton · Natural Ecru',
    price: 490,
    priceNote: 'Price varies with quality and size',
    image: bagCottonTote,
    badge: 'Handmade Cotton',
    description: 'Woven on traditional handlooms from pure unbleached cotton canvas. Features a spacious exterior slip pocket, reinforced box-stitched webbing handles, and natural breathable drape.',
    size: '38 × 35 × 12 cm',
  },
  {
    id: 'bag-golden-jute',
    name: 'The Golden Heritage Jute Tote',
    category: 'Bags',
    material: '100% Biodegradable Jute · Golden Honey',
    price: 450,
    priceNote: 'Price varies with quality and size',
    image: bagGoldenJute,
    badge: 'Handcrafted Jute',
    description: 'Spun from natural golden jute yarn with a rich textured burlap weave. Eco-friendly, biodegradable, and reinforced with sturdy handles for daily shopping and market trips.',
    size: '40 × 36 × 14 cm',
  },
  {
    id: 'bag-sage-nonwoven',
    name: 'The Eco Sage Non-Woven Carry Bag',
    category: 'Bags',
    material: 'Spunbond Non-Woven · Sage Olive',
    price: 60,
    priceNote: 'Price varies with quality and size',
    image: bagSageNonwoven,
    badge: 'Eco Non-Woven',
    description: 'Lightweight yet resilient handmade non-woven bag with ultrasonic gusset seams and soft loop handles in calming sage olive. Washable, tear-resistant, and reusable.',
    size: '36 × 40 × 10 cm',
  },
  {
    id: 'bag-blockprint-floral',
    name: 'The Artisan Handblock Floral Tote',
    category: 'Bags',
    material: 'Handloom Cotton · Indigo & Terracotta Motif',
    price: 580,
    priceNote: 'Price varies with quality and size',
    image: bagBlockprintFloral,
    badge: 'Handblock Print',
    description: 'Hand-pressed with traditional botanical wooden blocks using vegetable dyes on raw unbleached cotton. Each bag is an authentic one-of-a-kind Indian craft piece.',
    size: '38 × 34 × 10 cm',
  },
  {
    id: 'bag-jute-cotton-combo',
    name: 'The Two-Tone Jute & Cotton Market Bag',
    category: 'Bags',
    material: 'Woven Jute Base · Slub Cotton Upper',
    price: 520,
    priceNote: 'Price varies with quality and size',
    image: bagJuteCottonCombo,
    badge: 'Dual Weave',
    description: 'A harmonious hybrid design pairing a structured golden jute bottom foundation with a breathable natural handloom cotton canvas upper.',
    size: '42 × 38 × 15 cm',
  },
  {
    id: 'bag-royal-nonwoven',
    name: 'The Structured Royal Navy Non-Woven Box Tote',
    category: 'Bags',
    material: 'Spunbond Non-Woven · Deep Royal Navy',
    price: 75,
    priceNote: 'Price varies with quality and size',
    image: bagRoyalNonwoven,
    badge: 'Reusable Utility',
    description: 'Structured box-gusseted handmade non-woven utility bag with reinforced base, piped seams, and wide shoulder loops. Tailored for heavy daily groceries and bulk shopping.',
    size: '34 × 38 × 12 cm',
  },
  {
    id: 'bag-terracotta-canvas',
    name: 'The Earth Terracotta Handloom Canvas Bag',
    category: 'Bags',
    material: 'Vegetable Dyed Cotton · Warm Terracotta',
    price: 540,
    priceNote: 'Price varies with quality and size',
    image: bagTerracottaCanvas,
    badge: 'Natural Dye',
    description: 'Hand-dyed using organic clay and madder root extracts, featuring double-needle seam construction, wide self-fabric handles, and an earthy warm aesthetic.',
    size: '38 × 35 × 12 cm',
  },
  {
    id: 'bag-ochre-khadi',
    name: 'The Mustard Ochre Khadi Handloom Tote',
    category: 'Bags',
    material: 'Handspun Khadi Cotton · Warm Ochre',
    price: 560,
    priceNote: 'Price varies with quality and size',
    image: bagOchreKhadi,
    badge: 'Heritage Khadi',
    description: 'Spun by hand from coarse khadi cotton yarn in bright turmeric ochre. Rich natural slub texture that softens beautifully with age and wash.',
    size: '37 × 33 × 11 cm',
  },
  {
    id: 'bag-charcoal-nonwoven',
    name: 'The Minimal Slate Non-Woven Tote',
    category: 'Bags',
    material: 'Spunbond Non-Woven · Slate Charcoal',
    price: 65,
    priceNote: 'Price varies with quality and size',
    image: bagCharcoalNonwoven,
    badge: 'Everyday Eco',
    description: 'Sleek slate grey non-woven bag tailored for modern eco-conscious living. Lightweight, fold-flat design that slips easily into a pocket or glove compartment.',
    size: '35 × 38 × 10 cm',
  },
  {
    id: 'everyday-tote',
    name: 'The Everyday Forest Canvas Tote',
    category: 'Bags',
    material: 'Canvas · Forest Green & Ecru',
    price: 890,
    priceNote: 'Price varies with quality and size',
    image: tote,
    badge: 'Everyday favourite',
    description: 'A clean silhouette with generous space for everyday essentials. Natural unbleached canvas meets deep forest-green webbing straps and bottom base trim.',
    size: '38 × 34 × 12 cm',
  },
  {
    id: 'woven-bag',
    name: 'The Weekend Weave Round Handle Bag',
    category: 'Bags',
    material: 'Hand-crocheted Jute & Cane · Natural',
    price: 1290,
    priceNote: 'Price varies with quality and size',
    image: woven,
    badge: 'The weekend edit',
    description: 'A sculptural woven silhouette finished with polished circular cane handles. A relaxed handmade companion for slow mornings and artisan markets.',
    size: '32 × 28 × 10 cm',
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
  {
    id: 'mat-grape',
    name: 'Grape Floor Mat',
    category: 'Floor mats',
    material: 'Handloom Cotton · Grape & Plum',
    price: 50,
    image: matGrape,
    badge: 'Popular',
    description: 'Rich grape purple and plum tones woven with pure handloom cotton cord and finished with handcrafted fringe tassels.',
    size: '45 × 70 cm',
  },
  {
    id: 'mat-colours',
    name: 'Colours Floor Mat',
    category: 'Floor mats',
    material: 'Woven Cotton · Multi Palette',
    price: 50,
    image: matColours,
    badge: 'Vibrant Weave',
    description: 'Lively multi-color woven yarn bands combining mustard yellow, coral, forest green, and ocean blue in durable handloom cotton.',
    size: '45 × 70 cm',
  },
  {
    id: 'mat-rainbow',
    name: 'Rainbow Floor Mat',
    category: 'Floor mats',
    material: 'Handloom Cotton · Rainbow Stripe',
    price: 50,
    image: matRainbow,
    badge: 'Bestseller',
    description: 'Bright gradient rainbow color bands woven with premium cotton yarn and framed with classic fringe tassels.',
    size: '45 × 70 cm',
  },
  {
    id: 'mat-limestone',
    name: 'Limestone Floor Mat',
    category: 'Floor mats',
    material: 'Natural Cotton · Limestone Beige',
    price: 50,
    image: matLimestone,
    badge: 'Natural Earth',
    description: 'Subtle earthy limestone beige and warm off-white ribbed handloom cotton weave, perfect for understated living spaces.',
    size: '45 × 70 cm',
  },
  {
    id: 'mat-guptha',
    name: 'Guptha Traditional Mat',
    category: 'Floor mats',
    material: 'Handloom Cotton · Heritage Border',
    price: 50,
    image: matGuptha,
    badge: 'Heritage Classic',
    description: 'Traditional Indian geometric border motif in contrasting earthy terracotta maroon, ochre gold, and cream handloom cotton.',
    size: '45 × 70 cm',
  },
  {
    id: 'mat-track',
    name: 'Track Linear Weave Mat',
    category: 'Floor mats',
    material: 'Durable Cotton · Linear Track Weave',
    price: 50,
    image: matTrack,
    badge: 'Modern Utility',
    description: 'Parallel running linear track stripes in slate charcoal, warm taupe, and ivory white for high-traffic durability.',
    size: '45 × 70 cm',
  },
  {
    id: 'mat-four-matrix',
    name: 'Four Matrix Floor Mat',
    category: 'Floor mats',
    material: 'Textured Cotton · Quad Matrix Weave',
    price: 55,
    image: matFourMatrix,
    badge: 'Geometric',
    description: 'Four distinct checkerboard and woven matrix quadrants in indigo navy, sage green, and natural cream.',
    size: '50 × 75 cm',
  },
  {
    id: 'mat-vasthu-round-oval',
    name: 'Vasthu Round - Oval Shape Mat',
    category: 'Floor mats',
    material: 'Braided Cotton · Oval Silhouette',
    price: 50,
    image: matVasthuOval,
    badge: 'Vasthu Edition',
    description: 'Traditional oval-shaped braided handloom mat crafted with concentric rings of natural jute-tone cotton, saffron, and emerald borders.',
    size: '50 × 80 cm',
  },
  {
    id: 'mat-zig-zag-large',
    name: 'Zig Zag Large Floor Mat',
    category: 'Floor mats',
    material: 'Heavy Ribbed Cotton · Bold Chevron',
    price: 60,
    image: matZigZagLarge,
    badge: 'Bold Chevron',
    description: 'Bold oversized zig-zag chevron weave in slate blue and ivory cotton with plush underfoot texture.',
    size: '55 × 85 cm',
  },
  {
    id: 'mat-two-in-one',
    name: 'Two In One Reversible Mat',
    category: 'Floor mats',
    material: 'Dual-Woven Cotton · Reversible',
    price: 60,
    image: matTwoInOne,
    badge: 'Reversible Dual-Side',
    description: 'Dual-tone reversible handloom mat featuring contrasting golden ochre on one face and olive green on the reverse.',
    size: '50 × 80 cm',
  },
  {
    id: 'mat-third-eye',
    name: 'Third Eye Medallion Mat',
    category: 'Floor mats',
    material: 'Artisan Cotton · Centre Medallion',
    price: 65,
    image: matThirdEye,
    badge: 'Artisan Special',
    description: 'Striking mystical eye medallion center motif surrounded by intricate geometric temple borders in terracotta and indigo.',
    size: '50 × 80 cm',
  },
  {
    id: 'mat-royal-vasthu',
    name: 'Royal Vasthu Floor Mat',
    category: 'Floor mats',
    material: 'Premium Cotton · Regal Auspicious',
    price: 70,
    image: matRoyalVasthu,
    badge: 'Royal Vasthu',
    description: 'Regal handloom floor mat featuring auspicious maroon and emerald green borders with intricate golden paisley patterns and plush tassels.',
    size: '60 × 90 cm',
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