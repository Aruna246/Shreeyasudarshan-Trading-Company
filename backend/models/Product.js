import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 50 },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 100 },
  minBulkOrder: { type: Number, default: 50 },
  description: { type: String, required: true },
  dimensions: { type: String },
  material: { type: String },
  features: [{ type: String }],
  badge: { type: String }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
