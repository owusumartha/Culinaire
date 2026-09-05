'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '../lib/contexts';
import { useWishlist } from '../lib/contexts';
import { useTheme } from '../lib/contexts';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link href="/" className="logo">Culini<span>aire</span></Link>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link href="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</Link>
          <Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
          <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link href="/wishlist" className="cart-icon">
            ♥
            <span className="wishlist-count" style={{ display: wishlistCount > 0 ? 'flex' : 'none' }}>
              {wishlistCount}
            </span>
          </Link>
          <Link href="/cart" className="cart-icon">
            🛒
            <span className="cart-count" style={{ display: cartCount > 0 ? 'flex' : 'none' }}>
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
