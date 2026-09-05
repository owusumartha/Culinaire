'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../lib/contexts';
import { useToast } from '../lib/contexts';
import { getProduct, formatPrice, getProductImageSrc } from '../lib/products';
import { CartIcon } from '../components/Icons';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { showToast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', payment: '', notes: '' });

  const cartItems = cart.map(item => {
    const product = getProduct(item.id);
    return product ? { ...item, product } : null;
  }).filter(Boolean) as { id: number; qty: number; product: NonNullable<ReturnType<typeof getProduct>> }[];

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.payment) newErrors.payment = 'Please select a payment method';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please complete the highlighted fields before placing your order.');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty');
      router.push('/cart');
      return;
    }

    const orderNo = 'CL-' + Date.now().toString().slice(-6);
    const order = {
      orderNo,
      customer: { name: form.name, phone: form.phone, email: form.email, payment: form.payment },
      items: cart.map(i => {
        const p = getProduct(i.id)!;
        return { name: p.name, qty: i.qty, price: p.price };
      }),
      total,
      subtotal,
      shipping,
      date: new Date().toLocaleString()
    };

    const orders = JSON.parse(localStorage.getItem('culinaireOrders') || '[]');
    orders.push(order);
    localStorage.setItem('culinaireOrders', JSON.stringify(orders));
    localStorage.setItem('culinaireLastOrder', JSON.stringify(order));

    clearCart();
    router.push('/confirmation');
  };

  if (cart.length === 0) {
    return (
      <>
        <section className="page-hero">
          <div className="container"><h1>Checkout</h1></div>
        </section>
        <section className="section">
          <div className="container">
            <div className="empty-cart">
              <div className="icon"><CartIcon size={48} color="#c9a227" /></div>
              <h3>Your cart is empty</h3>
              <a href="/shop" className="btn btn-gold">Browse Products</a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Checkout</h1></div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cart-layout">
            <form className="checkout-form" id="checkoutForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={errors.name ? 'invalid' : ''} style={errors.name ? { borderColor: '#c0392b' } : {}} />
                {errors.name && <div className="error-msg" style={{ display: 'block' }}>{errors.name}</div>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" className={errors.phone ? 'invalid' : ''} style={errors.phone ? { borderColor: '#c0392b' } : {}} />
                {errors.phone && <div className="error-msg" style={{ display: 'block' }}>{errors.phone}</div>}
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email" className={errors.email ? 'invalid' : ''} style={errors.email ? { borderColor: '#c0392b' } : {}} />
                {errors.email && <div className="error-msg" style={{ display: 'block' }}>{errors.email}</div>}
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select name="payment" value={form.payment} onChange={handleChange} className={errors.payment ? 'invalid' : ''} style={errors.payment ? { borderColor: '#c0392b' } : {}}>
                  <option value="">Select payment method</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="MTN MoMo">MTN MoMo</option>
                  <option value="Telecel Cash">Telecel Cash</option>
                  <option value="AT Money">AT Money</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                {errors.payment && <div className="error-msg" style={{ display: 'block' }}>{errors.payment}</div>}
              </div>
              <div className="form-group">
                <label>Order Notes (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any special instructions..." rows={3} />
              </div>
              <button type="submit" className="btn btn-gold btn-block">Place Order</button>
            </form>
            <div id="checkoutSummary">
              <h3>Order Summary</h3>
              {cartItems.map(item => (
                <div className="cart-item" key={item.id} style={{ padding: '10px 0' }}>
                  <img src={getProductImageSrc(item.product.image)} alt={item.product.name} style={{ width: 60, height: 60 }} />
                  <div className="info">
                    <h4 style={{ fontSize: '0.9rem' }}>{item.product.name}</h4>
                    <div className="price">{item.qty} × {formatPrice(item.product.price)}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>{formatPrice(item.product.price * item.qty)}</div>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #f1e9dc', marginTop: 10, paddingTop: 10 }}>
                <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
                <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
