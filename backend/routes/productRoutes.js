import express from 'express';
import { DB } from '../db.js';

const router = express.Router();

// GET all products with filtering & search
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.search = search;
    const products = await DB.getProducts(filter);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single product by id or slug
router.get('/:id', async (req, res) => {
  try {
    const product = await DB.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new product (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Please provide name, price, and category' });
    }
    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = await DB.createProduct({
      ...req.body,
      slug,
      image: image || '/images/jute_fashion_bag.jpg'
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
