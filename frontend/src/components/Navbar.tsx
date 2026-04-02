'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAssetPath } from '@/lib/assetPath';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group relative transition-transform duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
           <img 
             src={getAssetPath("/assets/mezumi-footer-logo.png")} 
             alt="Mizumi Reserve Logo"
            className="h-10 md:h-12 w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(217,119,6,0.4)] transition-all duration-500"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Highlights', id: 'highlights' },
            { label: 'Amenities', id: 'amenities' },
            { label: 'Gallery', id: 'gallery' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors font-sans"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-xs uppercase tracking-widest font-semibold text-white dark:text-black bg-amber-500 hover:bg-black dark:hover:bg-white transition-colors px-6 py-3 rounded-sm ml-4"
          >
            Enquire
          </button>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button (simplified for now) */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button 
            className="text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
