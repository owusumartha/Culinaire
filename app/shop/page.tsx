'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts, getCategories, Product } from '../lib/products';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'tiles' | 'icons'>('tiles');
  const [resultCount, setResultCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setCategories(getCategories());
      const saved = localStorage.getItem('culinaireProductView') as 'tiles' | 'icons' | null;
      if (saved) setViewMode(saved);
      const items = getAllProducts();
      setProducts(items);
      setResultCount(items.length);
    } catch (e) {
      console.error('Error loading products:', e);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      let items = getAllProducts();
      if (activeCategory !== 'All') {
        items = items.filter(p => p.category === activeCategory);
      }
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      setProducts(items);
      setResultCount(items.length);
    } catch (e) {
      console.error('Error filtering products:', e);
    }
  }, [mounted, activeCategory, search]);

  const handleViewMode = (mode: 'tiles' | 'icons') => {
    setViewMode(mode);
    localStorage.setItem('culinaireProductView', mode);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Collection</h1>
          <p>Explore premium kitchenware crafted for every kitchen.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="shop-toolbar">
            <div className="search-box">
              <input
                type="text"
                id="searchInput"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button id="searchBtn">Search</button>
            </div>
            <div className="tool-group">
              <div className="filter-tabs" id="filterTabs">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn ${cat === activeCategory ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="view-toggle" aria-label="View mode">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'tiles' ? 'active' : ''}`}
                  onClick={() => handleViewMode('tiles')}
                >
                  Tiles
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'icons' ? 'active' : ''}`}
                  onClick={() => handleViewMode('icons')}
                >
                  Icons
                </button>
              </div>
            </div>
          </div>
          <div className="result-count" id="resultCount">
            {resultCount} product{resultCount !== 1 ? 's' : ''} found
          </div>
          <div className={`product-grid ${viewMode === 'tiles' ? 'tiles-view' : 'icons-view'}`} id="productGrid">
            {products.length === 0 ? (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6b6b6b', padding: 40 }}>
                {mounted ? 'No products found. Try a different search or category.' : 'Loading products...'}
              </p>
            ) : (
              products.map(p => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
