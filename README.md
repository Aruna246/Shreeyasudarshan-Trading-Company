# Shreeyasudarshan Trading Company - MERN Stack E-Commerce Platform

A production-grade, eco-friendly textile and bag e-commerce web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) based faithfully on the provided design specifications.

---

## 🌟 Key Features

### 1. Visual Design & Brand Identity
- **Identical Brand Styling**: Exact color palette (`#133826` forest green, warm organic cream, refined serif headings).
- **High-Resolution Handcrafted Imagery**: Real studio packshots of Jute Fashion Bags, Cotton Shopping Bags, Leather Travel Bags, Fancy Embroidered Jute Bags, and the Bhavani factory unit.
- **Top Announcement Bar**: "Quality Bags | Trusted Manufacturer | Bulk Orders Welcome" with quick call and email links.
- **Responsive Sticky Header**: Dynamic navigation (Home, About Us, Products, Why Us, Contact Us), search dropdown, and cart badge.

### 2. Complete Pages
- **Home Page**:
  - Welcome hero banner with "Shop Now" call to action.
  - 5 Circular category previews (Jute Fashion Bags, Cotton Carry Bags, Cotton Shopping Bags, Leather Travel Bags, Fancy Jute Bags).
  - Featured products grid with live "Add to Cart" and quick view.
  - "Sustainable Choices for a Greener Planet" 4-pillar banner.
  - "Why Choose Us" guarantee summary.
- **About Us Page**:
  - Factory introduction and our journey with facility photo.
  - "Our Mission" and "Our Vision" cards.
  - Manufacturer, Wholesaler, Retailer, Exporter credentials.
- **Why Us Page**:
  - Illustrated eco bags showcase.
  - 4 in-depth quality guarantee rows with verified checklists.
  - 4-step "How a bulk order works" workflow.
- **Contact Us Page**:
  - Two-column hero: Forest green contact card with phone, email, address, and working hours.
  - Live "Send us an enquiry" form for bulk quotations and customer requests.
  - Interactive Google Map embed of Bhavani, Erode.
- **Products Catalog**:
  - Filterable by bag type and category pills.
  - Sortable by price (low to high, high to low) and rating.
  - Interactive product quick-view modal with dimensions, material specs, and minimum bulk order numbers.

### 3. Shopping Cart & Checkout
- **Slide-out Cart Drawer**: Live subtotal, 5% GST calculation, and free shipping progress indicator.
- **Checkout Modal**: Customer delivery address form, payment method selector (Cash on Delivery, UPI / GPay, Debit / Credit Card).
- **Celebratory Confetti**: Visual celebration and instant order number assignment upon order placement.

### 4. Admin & Management Console
- Click the **Admin** button or User icon in the navbar.
- View all customer enquiries submitted in real-time.
- Update enquiry status (`New`, `Contacted`, `Quoted`, `Closed`).
- View customer orders with recipient details and items list.
- Add new bag designs to the factory catalog directly.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18 or higher)
- Optional: MongoDB daemon (if MongoDB is running locally or configured via `MONGODB_URI`, Mongoose connects automatically; otherwise, the server gracefully falls back to a persistent JSON document store so the application always works out of the box).

### Running Frontend and Backend Together
```bash
node start-dev.js
```

Or run separately:
```bash
# Terminal 1 (Backend API on port 5000):
cd backend
npm run dev

# Terminal 2 (Frontend React on port 3000):
cd frontend
npm run dev
```

### URLs
- **Frontend Web App**: `http://localhost:3000/`
- **Backend API**: `http://localhost:5000/api`
  - Health check: `http://localhost:5000/api/health`
  - Products: `http://localhost:5000/api/products`
  - Enquiries: `http://localhost:5000/api/enquiries`
  - Orders: `http://localhost:5000/api/orders`
