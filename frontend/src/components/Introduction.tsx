'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    <section ref={containerRef} className="py-32 md:py-48 px-6 max-w-7xl mx-auto bg-neutral-950 flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-4xl md:text-6xl lg:text-7xl text-center text-white/90 font-serif leading-tight">
        Welcome to the <span className="italic text-amber-500">extraordinary</span> life.
      </h2>
      <p ref={textRef} className="mt-12 text-xl md:text-3xl text-center text-neutral-400 font-sans max-w-4xl mx-auto leading-relaxed text-balance">
        {text.split(' ').map((word, index) => (
          <span key={index} className="inline-block mr-2 opacity-10">
            {word}
          </span>
        ))}
      </p>
      <p className="mt-8 text-lg text-neutral-500 max-w-3xl text-center">
        This is Mizumi Reserve - a vibrant township spread over 80 acres, nestled between two pristine lakes in the heart of Harlur Road, Sarjapur.
      </p>
    </section>
  );
}
