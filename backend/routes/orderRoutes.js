import express from 'express';
import { DB } from '../db.js';

const router = express.Router();

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, subtotal, tax, shipping, total, paymentMethod } = req.body;
    if (!customer || !items || !items.length || !total) {
      return res.status(400).json({ success: false, message: 'Invalid order details' });
    }

    const newOrder = await DB.createOrder({
      customer,
      items,
      subtotal,
      tax: tax || 0,
      shipping: shipping || 0,
      total,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Completed'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await DB.getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET order by orderNumber or ID
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await DB.getOrderById(req.params.orderNumber);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
