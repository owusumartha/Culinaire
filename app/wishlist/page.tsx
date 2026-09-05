'use client';

import Link from 'next/link';
import { useWishlist } from '../lib/contexts';
import { useCart } from '../lib/contexts';
import { getAllProducts, formatPrice, getProductImageSrc } from '../lib/products';
import { HeartIcon, StarIcon } from '../components/Icons';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const products = getAllProducts().filter(p => wishlist.includes(p.id));

  return (
    <>
      <section className="page-hero">
        <div className="container"><h1>My Wishlist</h1></div>
      </section>
      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <div className="empty-cart">
              <div className="icon"><HeartIcon size={48} color="#c9a227" /></div>
              <h3>Your wishlist is empty</h3>
              <p style={{ color: '#6b6b6b', marginBottom: 20 }}>Save your favourite products here.</p>
              <Link href="/shop" className="btn btn-gold">Browse Products</Link>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(p => (
                <div className="product-card" key={p.id}>
                  <button
                    className={`wishlist-btn ${isWishlisted(p.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(p.id)}
                  >
                    {isWishlisted(p.id) ? <HeartIcon size={20} filled color="#c9a227" /> : <HeartIcon size={20} color="#c9a227" />}
                  </button>
                  <Link href={`/product/${p.id}`} className="img-wrap">
                    <img src={getProductImageSrc(p.image)} alt={p.name} loading="lazy" />
                  </Link>
                  <div className="card-body">
                    <span className="card-cat">{p.category}</span>
                    <h3><Link href={`/product/${p.id}`}>{p.name}</Link></h3>
                    <p style={{ color: '#c9a227', fontSize: '0.85rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>{[1,2,3,4,5].map(s => <StarIcon key={s} size={14} color="#c9a227" filled={s <= Math.round(p.rating)} />)} ({p.rating})</p>
                    <div className="price">
                      {formatPrice(p.price)}
                      {p.oldPrice && <span className="old">{formatPrice(p.oldPrice)}</span>}
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-gold btn-sm" onClick={() => addToCart(p.id)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
