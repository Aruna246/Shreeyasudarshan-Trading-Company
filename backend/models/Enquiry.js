import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  product: { type: String, default: 'General Enquiry' },
  quantity: { type: Number, default: 100 },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Quoted', 'Closed'],
    default: 'New'
  },
  notes: { type: String }
}, {
  timestamps: true
});

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
