'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from '../lib/contexts';
import { MenuIcon, MoonIcon, SunIcon } from './Icons';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
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
          <MenuIcon size={24} />
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
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
