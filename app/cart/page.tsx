'use client';

import Link from 'next/link';
import { useCart } from '../lib/contexts';
import { getProduct, formatPrice, getProductImageSrc } from '../lib/products';

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useCart();

  const cartItems = cart.map(item => {
    const product = getProduct(item.id);
    return product ? { ...item, product } : null;
  }).filter(Boolean) as { id: number; qty: number; product: NonNullable<ReturnType<typeof getProduct>> }[];

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <>
        <section className="page-hero">
          <div className="container"><h1>Your Cart</h1></div>
        </section>
        <section className="section">
          <div className="container">
            <div className="empty-cart">
              <div className="icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p style={{ color: '#6b6b6b', marginBottom: 20 }}>Looks like you haven&apos;t added anything yet.</p>
              <Link href="/shop" className="btn btn-gold">Browse Products</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>Your Cart</h1></div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cart-layout">
            <div id="cartItems">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <Link href={`/product/${item.product.id}`}>
                    <img src={getProductImageSrc(item.product.image)} alt={item.product.name} />
                  </Link>
                  <div className="info">
                    <h4>{item.product.name}</h4>
                    <div className="price">{formatPrice(item.product.price)} each</div>
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <input type="text" value={item.qty} readOnly />
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="price" style={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {formatPrice(item.product.price * item.qty)}
                    </div>
                    <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div id="cartSummary">
              <h3>Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <Link href="/checkout" className="btn btn-gold btn-block" style={{ marginTop: 16 }}>Proceed to Checkout</Link>
              <Link href="/shop" className="btn btn-outline btn-block" style={{ marginTop: 10 }}>Continue Shopping</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
