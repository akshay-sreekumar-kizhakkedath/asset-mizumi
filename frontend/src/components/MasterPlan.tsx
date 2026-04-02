'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

export default function MasterPlan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin and scale up master plan to give an exploring feel
      gsap.to(imageRef.current, {
        scale: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 0.5,
          pin: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-neutral-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Decorative text overlaid on pinned image */}
      <div className="absolute top-16 left-6 md:left-12 z-20 pointer-events-none">
        <h2 className="text-sm tracking-[0.3em] text-amber-500 uppercase mb-2">Master Plan</h2>
        <h3 className="text-4xl md:text-6xl font-serif text-white/90 drop-shadow-2xl">
          Designed for <br/> Flow
        </h3>
      </div>
      
      {/* The Masterplan Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={getAssetPath("/assets/MR-Master-plan.png")}
        alt="Master Plan"
        className="w-full h-full object-contain md:object-cover origin-center z-10 p-8 md:p-0"
      />
    </section>
  );
}
