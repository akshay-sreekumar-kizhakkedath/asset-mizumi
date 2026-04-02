'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textElements = Array.from(textRef.current?.children || []);

    gsap.fromTo(
      textElements,
      { opacity: 0.1, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
      }
    );
  }, []);

  const text = 'A place where all the comforts and conveniences you can imagine come together in an expansive expression of opulence.';

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 px-6 w-full bg-background dark:bg-black flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      {/* Dynamic Background Video Loop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 object-center pointer-events-none grayscale-[0.5]"
        src={getAssetPath("/assets/irNMINhjHivYfZ5leP0kD7AcPAiZpDlZzYaII7Xk.mp4")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-neutral-950 via-transparent to-background dark:to-neutral-950 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl text-center text-neutral-900 dark:text-white/90 font-serif leading-tight drop-shadow-lg">
          Welcome to the <span className="italic text-amber-500">extraordinary</span> life.
        </h2>
        <p ref={textRef} className="mt-12 text-xl md:text-3xl text-center text-neutral-700 dark:text-neutral-300 font-sans max-w-4xl mx-auto leading-relaxed text-balance drop-shadow-md">
          {text.split(' ').map((word, index) => (
            <span key={index} className="inline-block mr-2 opacity-10">
              {word}
            </span>
          ))}
        </p>
        <p className="mt-12 text-lg text-amber-500/80 max-w-3xl text-center font-serif italic tracking-widest drop-shadow-md">
          This is Mizumi Reserve - a vibrant township spread over 80 acres, nestled between two pristine lakes in the heart of Harlur Road, Sarjapur.
        </p>
      </div>
    </section>
  );
}
