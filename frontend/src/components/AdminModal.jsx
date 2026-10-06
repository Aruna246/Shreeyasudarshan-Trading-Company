import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { X, Package, MessageSquare, PlusCircle, RefreshCw, Upload, ImageIcon, Link } from 'lucide-react';

export default function AdminModal() {
  const { isAdminOpen, setIsAdminOpen, showToast } = useCart();
  const [activeTab, setActiveTab] = useState('enquiries');
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Jute Fashion Bags',
    price: '',
    description: '',
    image: '',
    material: '',
    dimensions: ''
  });

  // Image upload state
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageTab, setImageTab] = useState('upload'); // 'upload' | 'url'
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resEnq, resOrd] = await Promise.all([
        fetch('/api/enquiries').catch(() => null),
        fetch('/api/orders').catch(() => null)
      ]);
      if (resEnq && resEnq.ok) {
        const d = await resEnq.json();
        if (d.success) setEnquiries(d.data);
      }
      if (resOrd && resOrd.ok) {
        const d = await resOrd.json();
        if (d.success) setOrders(d.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminOpen) {
      fetchData();
    }
  }, [isAdminOpen]);

  if (!isAdminOpen) return null;

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await fetch(`/api/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setEnquiries(prev =>
        prev.map(e => (e.id === enquiryId || e._id === enquiryId ? { ...e, status: newStatus } : e))
      );
      showToast('Enquiry status updated');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle image file upload to backend
  const handleImageUpload = async (file) => {
    if (!file) return;
    setImageUploading(true);
    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setNewProduct(prev => ({ ...prev, image: data.url }));
        showToast('Image uploaded successfully! ✓');
      } else {
        showToast('Image upload failed: ' + (data.message || 'Unknown error'), 'error');
        setImagePreview(null);
      }
    } catch (err) {
      showToast('Image upload failed. Check connection.', 'error');
      setImagePreview(null);
    } finally {
      setImageUploading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.image) {
      showToast('Please upload a product image or enter an image URL', 'error');
      return;
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price)
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('🎉 Product added successfully!');
        setNewProduct({ name: '', category: 'Jute Fashion Bags', price: '', description: '', image: '', material: '', dimensions: '' });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setActiveTab('enquiries');
      }
    } catch (err) {
      showToast('Failed to save product', 'error');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={() => setIsAdminOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '960px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            backgroundColor: '#0c261a',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '3px 8px', borderRadius: '8px' }}>
              <img src="/images/logo_clean.png" alt="Logo" style={{ height: '36px', width: 'auto', display: 'block' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#fff' }}>
                ShreeyaSudarshan Trading Company
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#b7dfc8' }}>
                Bhavani, Erode Unit • Management & Orders Console
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={fetchData}
              title="Refresh Records"
              style={{
                color: '#fff',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              style={{ color: '#fff', padding: '6px', borderRadius: '50%' }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#f5f3ec',
            borderBottom: '1px solid #dfd9cb',
            padding: '0 24px'
          }}
        >
          <button
            onClick={() => setActiveTab('enquiries')}
            style={{
              padding: '14px 18px',
              fontSize: '0.92rem',
              fontWeight: activeTab === 'enquiries' ? '700' : '500',
              color: activeTab === 'enquiries' ? '#1b4332' : '#666',
              borderBottom: activeTab === 'enquiries' ? '3px solid #1b4332' : '3px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={16} />
            <span>Customer Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '14px 18px',
              fontSize: '0.92rem',
              fontWeight: activeTab === 'orders' ? '700' : '500',
              color: activeTab === 'orders' ? '#1b4332' : '#666',
              borderBottom: activeTab === 'orders' ? '3px solid #1b4332' : '3px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={16} />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new-product')}
            style={{
              padding: '14px 18px',
              fontSize: '0.92rem',
              fontWeight: activeTab === 'new-product' ? '700' : '500',
              color: activeTab === 'new-product' ? '#1b4332' : '#666',
              borderBottom: activeTab === 'new-product' ? '3px solid #1b4332' : '3px solid transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <PlusCircle size={16} />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* TAB 1: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#1b4332' }}>
                  Submitted Inquiries & Bulk Quote Requests
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>
                  Total: {enquiries.length} enquiries
                </span>
              </div>

              {enquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                  No customer enquiries received yet. Submit one from the Contact Us page!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {enquiries.map((enq, idx) => (
                    <div
                      key={enq.id || enq._id || idx}
                      style={{
                        border: '1px solid #e2ddd0',
                        borderRadius: '12px',
                        padding: '16px',
                        backgroundColor: '#fdfbf7',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem', color: '#1b4332' }}>{enq.name}</strong>
                          <span style={{ color: '#666', marginLeft: '12px', fontSize: '0.88rem' }}>
                            📞 {enq.phone} • ✉️ {enq.email}
                          </span>
                        </div>
                        <select
                          value={enq.status || 'New'}
                          onChange={e => handleStatusChange(enq.id || enq._id, e.target.value)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '16px',
                            border: '1px solid #c2bbae',
                            backgroundColor:
                              enq.status === 'Closed' ? '#e8f5e9' :
                              enq.status === 'Quoted' ? '#e3f2fd' : '#fff3e0',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.86rem', color: '#333' }}>
                        <div><strong>Product:</strong> {enq.product}</div>
                        <div><strong>Quantity:</strong> {enq.quantity} units</div>
                        <div><strong>Received:</strong> {new Date(enq.createdAt).toLocaleDateString()}</div>
                      </div>

                      <div style={{ backgroundColor: '#ffffff', padding: '10px 14px', borderRadius: '8px', border: '1px solid #eee', fontSize: '0.9rem', color: '#444' }}>
                        "{enq.message}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <h4 style={{ fontSize: '1.1rem', color: '#1b4332', marginBottom: '16px' }}>
                Customer Orders & Dispatches
              </h4>

              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                  No customer orders placed yet. Add items to cart and checkout to generate a live order!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orders.map((ord, idx) => (
                    <div
                      key={ord.orderNumber || idx}
                      style={{
                        border: '1px solid #e2ddd0',
                        borderRadius: '12px',
                        padding: '16px',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                        <div>
                          <span style={{ fontWeight: '700', color: '#1b4332', fontSize: '1.1rem' }}>
                            Order #{ord.orderNumber}
                          </span>
                          <span style={{ fontSize: '0.84rem', color: '#777', marginLeft: '10px' }}>
                            {new Date(ord.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1b4332' }}>
                          ₹ {ord.total?.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.88rem', marginBottom: '12px' }}>
                        <div><strong>Customer:</strong> {ord.customer?.name} ({ord.customer?.phone})</div>
                        <div><strong>Location:</strong> {ord.customer?.city}, {ord.customer?.state}</div>
                        <div><strong>Payment:</strong> {ord.paymentMethod} ({ord.paymentStatus})</div>
                      </div>

                      <div style={{ backgroundColor: '#f9f8f4', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <strong>Items ({ord.items?.length}):</strong>{' '}
                        {ord.items?.map(it => `${it.name} (x${it.quantity})`).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADD PRODUCT */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleCreateProduct} style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '20px' }}>
                ➕ Add New Product to Factory Catalog
              </h4>

              {/* Image Upload Section */}
              <div className="form-group">
                <label className="form-label">Product Image *</label>

                {/* Toggle Tabs */}
                <div style={{ display: 'flex', gap: '0', marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                  <button
                    type="button"
                    onClick={() => setImageTab('upload')}
                    style={{
                      flex: 1, padding: '8px 12px', fontSize: '0.85rem', fontWeight: 600,
                      backgroundColor: imageTab === 'upload' ? '#1b4332' : '#f5f5f5',
                      color: imageTab === 'upload' ? '#fff' : '#555',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <Upload size={14} /> Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab('url')}
                    style={{
                      flex: 1, padding: '8px 12px', fontSize: '0.85rem', fontWeight: 600,
                      backgroundColor: imageTab === 'url' ? '#1b4332' : '#f5f5f5',
                      color: imageTab === 'url' ? '#fff' : '#555',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <Link size={14} /> Image URL
                  </button>
                </div>

                {imageTab === 'upload' && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f); }}
                    style={{
                      border: '2px dashed #a8c5b0',
                      borderRadius: '12px',
                      padding: '28px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: imagePreview ? '#f0f8f4' : '#fafaf8',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      style={{ display: 'none' }}
                      onChange={e => { const f = e.target.files[0]; if (f) handleImageUpload(f); }}
                    />
                    {imageUploading ? (
                      <div style={{ color: '#1b4332', fontWeight: 600 }}>
                        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⏳</div>
                        Uploading image...
                      </div>
                    ) : imagePreview ? (
                      <div>
                        <img src={imagePreview} alt="Preview" style={{ maxHeight: '160px', maxWidth: '100%', borderRadius: '8px', objectFit: 'cover', marginBottom: '8px' }} />
                        <p style={{ fontSize: '0.82rem', color: '#555', margin: 0 }}>✓ Image ready • Click to change</p>
                      </div>
                    ) : (
                      <div style={{ color: '#888' }}>
                        <ImageIcon size={36} style={{ marginBottom: '10px', color: '#b0c9b8' }} />
                        <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#555' }}>Click or drag & drop image here</p>
                        <p style={{ margin: 0, fontSize: '0.8rem' }}>JPEG, PNG, WebP • Max 10MB</p>
                      </div>
                    )}
                  </div>
                )}

                {imageTab === 'url' && (
                  <div>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://example.com/product-image.jpg"
                      value={newProduct.image.startsWith('/images/') ? '' : newProduct.image}
                      onChange={e => {
                        setNewProduct({ ...newProduct, image: e.target.value });
                        setImagePreview(e.target.value || null);
                      }}
                    />
                    {imagePreview && imageTab === 'url' && (
                      <img src={imagePreview} alt="URL Preview" onError={() => setImagePreview(null)}
                        style={{ marginTop: '10px', maxHeight: '140px', maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                    )}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diamond Weave Handloom Mat"
                  className="form-input"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="Jute Fashion Bags">Jute Fashion Bags</option>
                    <option value="Cotton Carry Bags">Cotton Carry Bags</option>
                    <option value="Cotton Shopping Bags">Cotton Shopping Bags</option>
                    <option value="Leather Travel Bags">Leather Travel Bags</option>
                    <option value="Fancy Jute Bags">Fancy Jute Bags</option>
                    <option value="Handloom Floor Mats">Handloom Floor Mats</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="350"
                    className="form-input"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Material</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Handloom Cotton"
                    className="form-input"
                    value={newProduct.material}
                    onChange={e => setNewProduct({ ...newProduct, material: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Dimensions</label>
                  <input
                    type="text"
                    placeholder="e.g. 60cm x 90cm"
                    className="form-input"
                    value={newProduct.dimensions}
                    onChange={e => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details about craftsmanship, durability, weave..."
                  className="form-textarea"
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={imageUploading}
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '1rem', fontWeight: 700, opacity: imageUploading ? 0.6 : 1 }}
              >
                {imageUploading ? 'Uploading Image…' : '💾 Save Product to Catalog'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
