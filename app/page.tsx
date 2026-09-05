'use client';

import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { getAllProducts } from './lib/products';
import { useState, useEffect } from 'react';

const featuredIds = [16, 13, 22, 7, 2, 14];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    setFeaturedProducts(featuredIds.map(id => getAllProducts().find(p => p.id === id)).filter(Boolean));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-logo-wrap">
            <img className="hero-logo" src="/images/logo.png" alt="Culinaire Kitchenware" />
          </div>
          <div className="hero-content">
            <div className="eyebrow">Premium Kitchenware</div>
            <h1>Elevate Your Kitchen,<br />Elevate Your Cooking</h1>
            <p>Discover exceptional cookware, knives, dinnerware, and kitchen essentials crafted for the modern home. Quality you can feel, style you can love.</p>
            <div className="hero-buttons">
              <Link href="/shop" className="btn btn-gold">Shop Now</Link>
              <Link href="/about" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container features-grid">
          <div className="feature">
            <div className="icon">🚚</div>
            <h4>Fast Delivery</h4>
            <p>Free shipping on orders over ₵1,000</p>
          </div>
          <div className="feature">
            <div className="icon">🛡️</div>
            <h4>Premium Quality</h4>
            <p>Hand-picked, durable kitchenware</p>
          </div>
          <div className="feature">
            <div className="icon">💬</div>
            <h4>Expert Support</h4>
            <p>Friendly help whenever you need it</p>
          </div>
          <div className="feature">
            <div className="icon">🔒</div>
            <h4>Secure Checkout</h4>
            <p>Safe and easy ordering process</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Our Collection</div>
            <h2>Featured Products</h2>
            <p>Handpicked pieces from our kitchenware collection, loved by home cooks and chefs alike.</p>
          </div>
          <div className="product-grid">
            {featuredProducts.map(p => p && <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/shop" className="btn btn-dark">View All Products</Link>
          </div>
        </div>
      </section>

      {/* About banner */}
      <section className="section section-alt">
        <div className="container about-banner">
          <div>
            <div className="eyebrow" style={{ color: '#a8841f', letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600, marginBottom: 10 }}>About Culinaire</div>
            <h2>Bringing the Finest Kitchenware to Your Home</h2>
            <p>At Culinaire, we believe the kitchen is the heart of the home. Our mission is to bring you premium kitchenware that combines timeless design with modern functionality.</p>
            <p>From professional-grade cookware to elegant dinnerware, every piece is carefully selected to enhance your cooking experience.</p>
            <div className="stat">
              <div><h3>500+</h3><span>Happy Customers</span></div>
              <div><h3>36+</h3><span>Premium Products</span></div>
              <div><h3>4.8★</h3><span>Average Rating</span></div>
            </div>
            <Link href="/about" className="btn btn-gold" style={{ marginTop: 24 }}>Learn More</Link>
          </div>
          <img src="/images/matt black cookware.jpg" alt="Culinaire quality cookware" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What Our Customers Say</div>
            <h2>Loved by Home Cooks Everywhere</h2>
            <p>Real reviews from our happy Culinaire customers across Ghana.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="quote">&quot;</div>
              <p>The knife set I bought from Culinaire is outstanding. Super sharp and beautiful. Delivery was fast too!</p>
              <div className="author">
                <div className="avatar">A</div>
                <div>
                  <div className="author-name">Ama Mensah</div>
                  <div className="author-loc">Accra</div>
                  <div style={{ color: '#c9a227', fontSize: '0.85rem' }}>★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="quote">&quot;</div>
              <p>The matt black cookware set looks so premium in my kitchen. Great quality and very affordable. Highly recommend.</p>
              <div className="author">
                <div className="avatar">K</div>
                <div>
                  <div className="author-name">Kwame Boateng</div>
                  <div className="author-loc">Kumasi</div>
                  <div style={{ color: '#c9a227', fontSize: '0.85rem' }}>★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="quote">&quot;</div>
              <p>Excellent customer service! They helped me pick the perfect dinnerware set for my restaurant. Bulk pricing is unbeatable.</p>
              <div className="author">
                <div className="avatar">E</div>
                <div>
                  <div className="author-name">Efua Owusu</div>
                  <div className="author-loc">Konongo</div>
                  <div style={{ color: '#c9a227', fontSize: '0.85rem' }}>★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay in the Loop</h2>
          <p>Subscribe for exclusive offers, new arrivals, and cooking tips.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); setEmail(''); }}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-dark" type="submit">Subscribe</button>
          </form>
          {subscribed && <p style={{ color: '#1a1a1a', fontWeight: 600, marginTop: 12 }}>✓ Subscribed! Welcome to Culinaire.</p>}
        </div>
      </section>
    </>
  );
}
