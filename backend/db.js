import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProducts } from './data/initialProducts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'data', 'store.json');

// Local fallback state
let fallbackDb = {
  products: [...initialProducts],
  enquiries: [
    {
      id: "enq-101",
      name: "Ramesh Sharma",
      phone: "+91 94433 12345",
      email: "ramesh@textileexports.in",
      product: "Jute Fashion Bags",
      quantity: 500,
      message: "Need 500 custom screen-printed jute bags with our green company logo for an international eco expo.",
      status: "Quoted",
      createdAt: new Date().toISOString()
    }
  ],
  orders: []
};

// Load saved store if exists
function loadStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
      fallbackDb = {
        products: data.products?.length ? data.products : [...initialProducts],
        enquiries: data.enquiries || fallbackDb.enquiries,
        orders: data.orders || []
      };
    } else {
      saveStore();
    }
  } catch (err) {
    console.warn("Could not read store.json, using default state:", err.message);
  }
}

function saveStore() {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(fallbackDb, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing store.json:", err.message);
  }
}

loadStore();

export let isMongoConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shreeyasudarshan';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log(` MongoDB Connected successfully to: ${conn.connection.host}`);
  } catch (err) {
    isMongoConnected = false;
    console.log(`ℹ️ Local MongoDB daemon not active (${err.message}). Using persistent JSON Document Storage engine.`);
  }
}

// Data Access Helpers that seamlessly use MongoDB if connected, or fallback store if not
export const DB = {
  // PRODUCTS
  async getProducts(filter = {}) {
    if (isMongoConnected) {
      const { Product } = await import('./models/Product.js');
      return await Product.find(filter).lean();
    }
    let res = [...fallbackDb.products];
    if (filter.category && filter.category !== 'All') {
      res = res.filter(p => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return res;
  },

  async getProductById(id) {
    if (isMongoConnected) {
      const { Product } = await import('./models/Product.js');
      return await Product.findOne({ $or: [{ _id: id }, { slug: id }, { id }] }).lean();
    }
    return fallbackDb.products.find(p => p.id === id || p.slug === id);
  },

  async createProduct(productData) {
    if (isMongoConnected) {
      const { Product } = await import('./models/Product.js');
      const prod = new Product(productData);
      return await prod.save();
    }
    const newProduct = {
      id: "p" + (fallbackDb.products.length + 1),
      ...productData,
      createdAt: new Date().toISOString()
    };
    fallbackDb.products.unshift(newProduct);
    saveStore();
    return newProduct;
  },

  // ENQUIRIES
  async createEnquiry(enquiryData) {
    if (isMongoConnected) {
      const { Enquiry } = await import('./models/Enquiry.js');
      const enq = new Enquiry(enquiryData);
      return await enq.save();
    }
    const newEnquiry = {
      id: "enq-" + Math.floor(100000 + Math.random() * 900000),
      ...enquiryData,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    fallbackDb.enquiries.unshift(newEnquiry);
    saveStore();
    return newEnquiry;
  },

  async getEnquiries() {
    if (isMongoConnected) {
      const { Enquiry } = await import('./models/Enquiry.js');
      return await Enquiry.find().sort({ createdAt: -1 }).lean();
    }
    return fallbackDb.enquiries;
  },

  async updateEnquiryStatus(id, status) {
    if (isMongoConnected) {
      const { Enquiry } = await import('./models/Enquiry.js');
      return await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    }
    const item = fallbackDb.enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      saveStore();
    }
    return item;
  },

  // ORDERS
  async createOrder(orderData) {
    const orderNumber = "SY-" + Math.floor(100000 + Math.random() * 900000);
    if (isMongoConnected) {
      const { Order } = await import('./models/Order.js');
      const ord = new Order({ ...orderData, orderNumber });
      return await ord.save();
    }
    const newOrder = {
      id: "ord-" + Date.now(),
      orderNumber,
      ...orderData,
      orderStatus: 'Placed',
      createdAt: new Date().toISOString()
    };
    fallbackDb.orders.unshift(newOrder);
    saveStore();
    return newOrder;
  },

  async getOrders() {
    if (isMongoConnected) {
      const { Order } = await import('./models/Order.js');
      return await Order.find().sort({ createdAt: -1 }).lean();
    }
    return fallbackDb.orders;
  },

  async getOrderById(orderNumber) {
    if (isMongoConnected) {
      const { Order } = await import('./models/Order.js');
      return await Order.findOne({ $or: [{ orderNumber }, { _id: orderNumber }] }).lean();
    }
    return fallbackDb.orders.find(o => o.orderNumber === orderNumber || o.id === orderNumber);
  }
};
