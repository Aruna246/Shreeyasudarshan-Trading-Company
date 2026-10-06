import express from 'express';
import { DB } from '../db.js';

const router = express.Router();

// POST new enquiry (from Contact Us or Product page)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, product, quantity, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields: name, phone, email, and message.'
      });
    }

    const enquiry = await DB.createEnquiry({
      name,
      phone,
      email,
      product: product || 'General Enquiry',
      quantity: Number(quantity) || 100,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry received successfully! Our team will contact you within one working day.',
      data: enquiry
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all enquiries (for Admin)
router.get('/', async (req, res) => {
  try {
    const enquiries = await DB.getEnquiries();
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH enquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await DB.updateEnquiryStatus(req.params.id, status);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
