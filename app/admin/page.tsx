'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getAllProducts, addAdminProduct, updateAdminProduct, deleteAdminProduct, formatPrice, getProductImageSrc, Product } from '../lib/products';

const ADMIN_PASSWORD = 'admin123';
const CATEGORIES = ['Cookware', 'Knives', 'Dinnerware', 'Utensils', 'Appliances', 'Bakeware', 'Decor'];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'tiles' | 'icons'>('tiles');
  const [form, setForm] = useState({
    name: '', category: 'Cookware', price: '', oldPrice: '', rating: '', badge: '', image: '', description: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalForm, setModalForm] = useState({ name: '', category: '', price: '', oldPrice: '', rating: '', badge: '', description: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = localStorage.getItem('culinaireAdminSession');
    if (session === 'true') {
      setLoggedIn(true);
      loadProducts();
    }
  }, []);

  const loadProducts = () => {
    setProducts(getAllProducts());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass === ADMIN_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem('culinaireAdminSession', 'true');
      localStorage.setItem('culinaireAdminUser', loginEmail);
      loadProducts();
    } else {
      setLoginError('Invalid password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('culinaireAdminSession');
    localStorage.removeItem('culinaireAdminUser');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const max = 600;
        let w = img.width, h = img.height;
        if (w > max || h > max) {
          if (w > h) { h = Math.round(h * max / w); w = max; }
          else { w = Math.round(w * max / h); h = max; }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setForm(prev => ({ ...prev, image: dataUrl }));
        setImagePreview(dataUrl);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    if (editingId !== null) {
      updateAdminProduct(editingId, {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        rating: form.rating ? Number(form.rating) : 4.5,
        badge: form.badge || null,
        image: form.image,
        description: form.description
      });
    } else {
      addAdminProduct({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        rating: form.rating ? Number(form.rating) : 4.5,
        badge: form.badge || null,
        image: form.image,
        description: form.description
      });
    }

    setForm({ name: '', category: 'Cookware', price: '', oldPrice: '', rating: '', badge: '', image: '', description: '' });
    setImagePreview('');
    setEditingId(null);
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : '',
      rating: String(product.rating),
      badge: product.badge || '',
      image: product.image,
      description: product.description
    });
    setImagePreview(getProductImageSrc(product.image));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteAdminProduct(id);
      loadProducts();
    }
  };

  const openModal = (product: Product) => {
    setModalProduct(product);
    setModalForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : '',
      rating: String(product.rating),
      badge: product.badge || '',
      description: product.description
    });
  };

  const saveModal = () => {
    if (!modalProduct) return;
    updateAdminProduct(modalProduct.id, {
      name: modalForm.name,
      category: modalForm.category,
      price: Number(modalForm.price),
      oldPrice: modalForm.oldPrice ? Number(modalForm.oldPrice) : null,
      rating: Number(modalForm.rating) || 4.5,
      badge: modalForm.badge || null,
      description: modalForm.description
    });
    setModalProduct(null);
    loadProducts();
  };

  if (!loggedIn) {
    return (
      <section className="section">
        <div className="container">
          <div className="admin-login-box">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: '3rem' }}>🔐</div>
              <h2>Admin Login</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="admin@culinaire.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Password" />
              </div>
              {loginError && <p style={{ color: '#c0392b', marginBottom: 12 }}>{loginError}</p>}
              <button type="submit" className="btn btn-gold btn-block">Login</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Link href="/">← Back to Store</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const customCount = products.filter(p => p.isAdmin).length;
  const categoryCount = new Set(products.map(p => p.category)).size;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Admin Panel</h1>
              <p>Manage your products and inventory</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>Back to Store</Link>
              <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="admin-stats">
            <div className="admin-stat-card">
              <h3>{products.length}</h3>
              <p>Total Products</p>
            </div>
            <div className="admin-stat-card">
              <h3>{customCount}</h3>
              <p>Custom Products</p>
            </div>
            <div className="admin-stat-card">
              <h3>{categoryCount}</h3>
              <p>Categories</p>
            </div>
          </div>

          <div className="admin-form-card" style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: 'var(--shadow)' }}>
            <h2 style={{ marginBottom: 16 }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmitProduct}>
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleFormChange} placeholder="Product name" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleFormChange}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₵)</label>
                  <input type="number" name="price" value={form.price} onChange={handleFormChange} placeholder="0" required />
                </div>
                <div className="form-group">
                  <label>Old Price (₵)</label>
                  <input type="number" name="oldPrice" value={form.oldPrice} onChange={handleFormChange} placeholder="Optional" />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input type="number" name="rating" value={form.rating} onChange={handleFormChange} placeholder="4.5" min="1" max="5" step="0.1" />
                </div>
              </div>
              <div className="form-group">
                <label>Badge</label>
                <input type="text" name="badge" value={form.badge} onChange={handleFormChange} placeholder="e.g. Best Seller, Sale, New" />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => fileInputRef.current?.click()}>Upload Image</button>
                  <input type="text" name="image" value={form.image} onChange={handleFormChange} placeholder="Or paste image URL" style={{ flex: 1 }} />
                </div>
                {imagePreview && (
                  <div style={{ marginTop: 12, position: 'relative', display: 'inline-block' }}>
                    <img src={imagePreview} alt="Preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }} />
                    <button
                      type="button"
                      onClick={() => { setForm(prev => ({ ...prev, image: '' })); setImagePreview(''); }}
                      style={{ position: 'absolute', top: -8, right: -8, background: '#c0392b', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Product description" rows={3} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-gold">{editingId ? 'Update Product' : 'Add Product'}</button>
                {editingId && (
                  <button type="button" className="btn btn-outline" onClick={() => {
                    setEditingId(null);
                    setForm({ name: '', category: 'Cookware', price: '', oldPrice: '', rating: '', badge: '', image: '', description: '' });
                    setImagePreview('');
                  }}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-table-card" style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2>All Products</h2>
              <div className="view-toggle">
                <button className={`view-btn ${viewMode === 'tiles' ? 'active' : ''}`} onClick={() => setViewMode('tiles')}>Tiles</button>
                <button className={`view-btn ${viewMode === 'icons' ? 'active' : ''}`} onClick={() => setViewMode('icons')}>Icons</button>
              </div>
            </div>

            {viewMode === 'tiles' ? (
              <div className="admin-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {products.map(p => (
                  <div key={p.id} className="admin-product-card" style={{ background: '#faf6ef', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                    <img src={getProductImageSrc(p.image)} alt={p.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                    <h4 style={{ margin: '8px 0 4px', fontSize: '0.9rem' }}>{p.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6b6b6b' }}>{p.category}</p>
                    <p style={{ color: '#c9a227', fontWeight: 700 }}>{formatPrice(p.price)}</p>
                    <span className={p.isAdmin ? 'badge-custom' : 'badge-builtin'} style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', margin: '4px 0' }}>
                      {p.isAdmin ? 'Custom' : 'Built-in'}
                    </span>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                      {p.isAdmin && <button className="btn btn-sm" style={{ background: '#c0392b', color: '#fff' }} onClick={() => handleDelete(p.id)}>Delete</button>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 12 }}>
                {products.map(p => (
                  <div key={p.id} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => openModal(p)}>
                    <img src={getProductImageSrc(p.image)} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8 }} />
                    <p style={{ fontSize: '0.75rem', marginTop: 4 }}>{p.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {modalProduct && (
        <div className="admin-modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setModalProduct(null); }}>
          <div className="admin-modal-box">
            <button className="modal-close" onClick={() => setModalProduct(null)}>&times;</button>
            <h2>Edit Product</h2>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={modalForm.name} onChange={e => setModalForm(prev => ({ ...prev, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={modalForm.category} onChange={e => setModalForm(prev => ({ ...prev, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price</label>
                <input type="number" value={modalForm.price} onChange={e => setModalForm(prev => ({ ...prev, price: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Old Price</label>
                <input type="number" value={modalForm.oldPrice} onChange={e => setModalForm(prev => ({ ...prev, oldPrice: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input type="number" value={modalForm.rating} onChange={e => setModalForm(prev => ({ ...prev, rating: e.target.value }))} min="1" max="5" step="0.1" />
            </div>
            <div className="form-group">
              <label>Badge</label>
              <input type="text" value={modalForm.badge} onChange={e => setModalForm(prev => ({ ...prev, badge: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={modalForm.description} onChange={e => setModalForm(prev => ({ ...prev, description: e.target.value }))} rows={3} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn-gold" onClick={saveModal}>Save Changes</button>
              <button className="btn btn-outline" onClick={() => setModalProduct(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
