import tote from '@/assets/green-tote.jpg';
import mat from '@/assets/sage-mat.jpg';
import woven from '@/assets/woven-bag.jpg';

export type Product = { id: string; name: string; category: 'Bags' | 'Floor mats'; material: string; price: number; image: string; badge: string; description: string; size: string };
export const products: Product[] = [
  { id:'everyday-tote', name:'The Everyday Tote', category:'Bags', material:'Canvas · Forest', price:890, image:tote, badge:'Everyday favourite', description:'A clean silhouette with generous space for the little things that make up your day. Natural canvas meets a deep forest-green finish.', size:'38 × 34 × 12 cm' },
  { id:'sage-mat', name:'The Sage Stripe Mat', category:'Floor mats', material:'Woven texture · Sage', price:690, image:mat, badge:'A softer welcome', description:'Quiet green stripes, tactile texture, and a natural finish. An understated accent for an entrance or a favourite corner.', size:'60 × 90 cm' },
  { id:'woven-bag', name:'The Weekend Weave', category:'Bags', material:'Woven texture · Natural', price:1290, image:woven, badge:'The weekend edit', description:'A sculptural woven silhouette finished with round handles. A relaxed companion for slow mornings and weekend outings.', size:'32 × 28 × 10 cm' },
  { id:'natural-mat', name:'The Natural Welcome Mat', category:'Floor mats', material:'Woven texture · Natural', price:590, image:mat, badge:'Simple essentials', description:'Natural tones and an easy rectangular shape bring a considered finishing touch to everyday spaces.', size:'45 × 75 cm' },
];
export type CartLine = { id: string; quantity: number };
export function cartTotal(cart: CartLine[]) { return cart.reduce((total,line) => total + (products.find(p=>p.id===line.id)?.price ?? 0)*line.quantity,0); }
export function changeQuantity(cart: CartLine[], id: string, amount: number): CartLine[] {
  const existing=cart.find(line=>line.id===id);
  if (!existing) return amount>0 ? [...cart,{id,quantity:amount}] : cart;
  return cart.map(line=>line.id===id ? {...line,quantity:line.quantity+amount} : line).filter(line=>line.quantity>0);
}
export function pageHead(title: string, description: string) { return {meta:[{title:`${title} | ShreeyaSudarshan`},{name:'description',content:description},{property:'og:title',content:`${title} | ShreeyaSudarshan`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }