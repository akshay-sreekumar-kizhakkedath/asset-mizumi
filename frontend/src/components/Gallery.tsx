'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  getAssetPath('/assets/69662b908257c.webp'),
  getAssetPath('/assets/69858f8b08e48.webp'),
  getAssetPath('/assets/69858f8b8d4e0.webp'),
  getAssetPath('/assets/69858f8d83a95.webp'),
  getAssetPath('/assets/MR_Gallery%20img%209.webp'),
  getAssetPath('/assets/3bhk-type2.webp'),
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on columns
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Move columns in different directions/speeds
      tl.to(col1Ref.current, { y: '-20%', ease: 'none' }, 0)
        .to(col2Ref.current, { y: '20%', ease: 'none' }, 0)
        .to(col3Ref.current, { y: '-15%', ease: 'none' }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-32 w-full bg-neutral-50 dark:bg-neutral-950 overflow-hidden relative"
      id="gallery"
    >
      <div className="text-center mb-24 relative z-10">
        <h2 className="text-sm tracking-[0.3em] text-amber-500 uppercase mb-4">Gallery</h2>
        <h3 className="text-5xl md:text-7xl font-serif text-black/90 dark:text-white/90">A Glimpse of Perfection</h3>
      </div>

      {/* Parallax Grid */}
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 h-[100vh] md:h-[120vh] overflow-hidden relative flex gap-4 md:gap-8 justify-center">
        
        {/* Column 1 - Starts lower, moves up fast */}
        <div ref={col1Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 pt-[20vh]">
          <div className="relative h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[0]} alt="Gallery 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
          </div>
          <div className="relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[1]} alt="Gallery 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
          </div>
        </div>

        {/* Column 2 - Starts higher, moves down */}
        <div ref={col2Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 -mt-[15vh]">
          <div className="relative h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[2]} alt="Gallery 3" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
          </div>
          <div className="relative h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[3]} alt="Gallery 4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
          </div>
        </div>

        {/* Column 3 - Starts lower, moves up medium */}
        <div ref={col3Ref} className="w-1/3 flex flex-col gap-4 md:gap-8 pt-[10vh]">
          <div className="relative h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[4]} alt="Gallery 5" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
          </div>
          <div className="relative h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[5]} alt="Gallery 6" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
