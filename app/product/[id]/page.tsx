'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProduct, getAllProducts, formatPrice, getProductImageSrc, getReviews, addReview, avgRating, addRecentlyViewed, getRecentlyViewed } from '../../lib/products';
import { useCart } from '../../lib/contexts';
import { useWishlist } from '../../lib/contexts';
import ProductCard from '../../components/ProductCard';
import { HeartIcon, StarIcon, TruckIcon, ShieldIcon, RotateCcwIcon, ChatIcon } from '../../components/Icons';
import { Product, Review } from '../../lib/types';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [copied, setCopied] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const p = getProduct(Number(id));
    setProduct(p);
    if (p) {
      addRecentlyViewed(p.id);
      setReviews(getReviews(p.id));
      const rel = getAllProducts()
        .filter(r => r.category === p.category && r.id !== p.id)
        .slice(0, 4);
      setRelated(rel);
      setRecentlyViewed(getRecentlyViewed().filter(r => r.id !== p.id).slice(0, 4));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link href="/shop" className="btn btn-gold" style={{ marginTop: 20 }}>Back to Shop</Link>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    addReview(product.id, reviewName.trim(), reviewRating, reviewText.trim());
    setReviews(getReviews(product.id));
    setReviewName('');
    setReviewRating(5);
    setReviewText('');
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${product.name} on Culinaire!`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="product-detail">
            <div className="main-img">
              <button
                className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                {isWishlisted(product.id) ? <HeartIcon size={20} filled color="#c9a227" /> : <HeartIcon size={20} color="#c9a227" />}
              </button>
              <img src={getProductImageSrc(product.image)} alt={product.name} />
            </div>
            <div className="detail-info">
              <span className="card-cat">{product.category}</span>
              {product.badge && <span className="card-badge" style={{ marginLeft: 8 }}>{product.badge}</span>}
              <h1>{product.name}</h1>
              <p style={{ color: '#c9a227', fontSize: '0.95rem', margin: '8px 0 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
                {[1,2,3,4,5].map(s => <StarIcon key={s} size={16} color="#c9a227" filled={s <= Math.round(product.rating)} />)} ({product.rating})
              </p>
              <div className="price" style={{ fontSize: '1.5rem', marginBottom: 16 }}>
                {formatPrice(product.price)}
                {product.oldPrice && <span className="old" style={{ marginLeft: 10 }}>{formatPrice(product.oldPrice)}</span>}
              </div>

              <div style={{ marginBottom: 16 }}>
                {product.inStock === false ? (
                  <span style={{ color: '#c0392b', fontWeight: 600, fontSize: '0.9rem' }}>Out of Stock</span>
                ) : (
                  <span style={{ color: '#27ae60', fontWeight: 600, fontSize: '0.9rem' }}>In Stock</span>
                )}
              </div>

              <p style={{ color: '#6b6b6b', marginBottom: 24 }}>{product.description}</p>

              <div className="qty-box">
                <span style={{ fontWeight: 600 }}>Quantity</span>
                <div className="qty-control">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <input type="text" value={qty} readOnly />
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-gold"
                  onClick={() => addToCart(product.id, qty)}
                  disabled={product.inStock === false}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => { addToCart(product.id, qty); window.location.href = '/cart'; }}
                  disabled={product.inStock === false}
                >
                  Buy Now
                </button>
              </div>

              <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="share-btn whatsapp" onClick={shareWhatsApp}>
                  <ChatIcon size={16} color="#fff" /> WhatsApp
                </button>
                <button className="share-btn facebook" onClick={shareFacebook}>
                  Facebook
                </button>
                <button className="share-btn copy" onClick={copyLink}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 24, fontSize: '0.85rem', color: '#6b6b6b', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><TruckIcon size={16} color="#c9a227" /> Free delivery over ₵1,000</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><ShieldIcon size={16} color="#c9a227" /> Quality guarantee</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><RotateCcwIcon size={16} color="#c9a227" /> Easy returns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section section-alt">
        <div className="container">
          <div className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="rating-summary">
              <div className="avg-rating">
                <span className="big">{avgRating(product.id) || '—'}</span>
                <span className="small">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {reviews.map((r, i) => (
              <div className="review-item" key={i}>
                <div className="review-header">
                  <strong>{r.name}</strong>
                  <span style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map(s => <StarIcon key={s} size={14} color="#c9a227" filled={s <= r.rating} />)}</span>
                  <span style={{ color: '#999', fontSize: '0.8rem' }}>{r.date}</span>
                </div>
                <p>{r.text}</p>
              </div>
            ))}

            <div className="review-form" style={{ marginTop: 30 }}>
              <h3>Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="star-input">
                  <span>Your Rating: </span>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={`star ${star <= (hoverRating || reviewRating) ? 'active' : ''}`}
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ cursor: 'pointer', color: star <= (hoverRating || reviewRating) ? '#c9a227' : '#ccc' }}
                    >
                      <StarIcon size={24} filled={star <= (hoverRating || reviewRating)} color={star <= (hoverRating || reviewRating) ? '#c9a227' : '#ccc'} />
                    </span>
                  ))}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <button type="submit" className="btn btn-gold">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Recently Viewed</div>
              <h2>You Recently Looked At</h2>
            </div>
            <div className="product-grid">
              {recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">You May Also Like</div>
              <h2>Related Products</h2>
            </div>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
