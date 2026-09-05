'use client';

import Link from 'next/link';
import { Product } from '../lib/types';
import { formatPrice, getProductImageSrc } from '../lib/products';
import { useCart, useWishlist } from '../lib/contexts';
import { HeartIcon, StarIcon } from './Icons';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <div className="product-card">
      <button
        className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
      >
        <HeartIcon size={20} filled={isWishlisted(product.id)} color="#c9a227" />
      </button>
      <Link href={`/product/${product.id}`} className="img-wrap">
        <img src={getProductImageSrc(product.image)} alt={product.name} loading="lazy" />
        {product.badge && <span className="card-badge">{product.badge}</span>}
      </Link>
      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
        <p style={{ color: '#c9a227', fontSize: '0.85rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 2 }}>{[1,2,3,4,5].map(s => <StarIcon key={s} size={14} color="#c9a227" filled={s <= Math.round(product.rating)} />)} ({product.rating})</p>
        <div className="price">
          {formatPrice(product.price)}
          {product.oldPrice && <span className="old">{formatPrice(product.oldPrice)}</span>}
        </div>
        <div className="card-actions">
          <Link href={`/product/${product.id}`} className="btn btn-outline btn-sm btn-icon">View</Link>
          <button className="btn btn-gold btn-sm" onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
