'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: '~ 80 acres',
    desc: 'Space is more a way of life than an indulgence. Designed for life to breathe, this is where your home grows with you.',
    img: getAssetPath('/assets/image1.webp'),
  },
   {
     title: '3 & 4 BHK Luxury Apartments',
     desc: "Luxurious, expansive units - each thoughtfully crafted to evolve with the life you're building.",
     img: getAssetPath('/assets/image2.webp'),
   },
  {
    title: '~ 77% Open Space',
    desc: 'Wide open spaces designed to help you connect - to the community, to nature and to yourself.',
    img: getAssetPath('/assets/image3.webp'),
  },
  {
    title: '30+ World-class Amenities',
    desc: 'Amenities on par with international standards that make everyday living not just convenient, but a joyful experience.',
    img: getAssetPath('/assets/image4.webp'),
  },
];

export default function Highlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create an infinite horizontal scroll (marquee)
    const ctx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 25, // Adjust speed of the live animation here
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  // We duplicate the highlights array to create a seamless infinite loop
  const loopItems = [...highlights, ...highlights];

  return (
    <section id="highlights" ref={containerRef} className="py-32 w-full bg-background dark:bg-neutral-900 overflow-hidden flex flex-col justify-center">
      <div className="px-12 md:px-24 mb-16 shrink-0 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 dark:text-white tracking-wide uppercase">Highlights</h2>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div ref={scrollRef} className="flex h-[60vh] w-max gap-12 px-12">
          {loopItems.map((item, i) => (
            <div
              key={i}
              className="w-[80vw] md:w-[60vw] lg:w-[40vw] h-full flex flex-col bg-white/80 dark:bg-neutral-950/50 rounded-2xl overflow-hidden shrink-0 border border-neutral-200 dark:border-white/5"
            >
              <div className="w-full h-2/3 relative overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 group-hover:bg-black/10 transition-all duration-700" />
              </div>
              <div className="w-full h-1/3 flex flex-col justify-center p-8 shrink-0 text-left bg-white dark:bg-neutral-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 dark:text-white leading-tight">{item.title}</h3>
                  <span className="text-amber-500 font-mono tracking-widest text-xs opacity-50">0{(i % highlights.length) + 1}</span>
                </div>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-sans max-w-xl leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
