'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 py-24 text-white/70 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
        
        {/* Column 1 - Brand */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/Assetz-Logo-White.png" alt="Assetz Logo" className="h-16 w-auto object-contain opacity-90" />
          </Link>
          <p className="font-serif text-3xl text-white tracking-wide mt-4">
            MIZUMI <br/>
            <span className="text-amber-500 italic text-xl">Reserve</span>
          </p>
          <p className="text-sm font-sans text-neutral-500 max-w-sm leading-relaxed mt-2">
            A vibrant township spread over 80 acres, nestled between two pristine lakes in the heart of Harlur Road, Sarjapur.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs tracking-[0.3em] text-white uppercase mb-4">Explore</h4>
          {['Highlights', 'Amenities', 'Gallery', 'Master Plan'].map((link) => (
            <Link 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-neutral-400 hover:text-amber-500 transition-colors w-fit"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Column 3 - Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs tracking-[0.3em] text-white uppercase mb-4">Connect</h4>
          <p className="text-sm text-neutral-400">
            Harlur Road, Sarjapur<br/>
            Bangalore, Karnataka
          </p>
          <a href="tel:+910000000000" className="text-sm text-neutral-400 hover:text-amber-500 transition-colors mt-2">
            +91 XX XXXX XXXX
          </a>
          <a href="mailto:info@assetz.com" className="text-sm text-neutral-400 hover:text-amber-500 transition-colors">
            info@assetz.com
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600 font-sans relative z-10">
        <p>&copy; {new Date().getFullYear()} Assetz Property Group. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
