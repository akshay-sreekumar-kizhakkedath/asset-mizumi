'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetPath } from '@/lib/assetPath';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handleMouseMove: (e: MouseEvent) => void;

    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      // Scroll-based animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Text moves up and fades out as you scroll
      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -150,
          ease: 'none',
        },
        0
      );

      // Video zooms in and darkens as you scroll
      tl.to(
        videoRef.current,
        {
          scale: 1.2,
          opacity: 0.3,
          ease: 'none',
        },
        0
      );

      // Handle mouse movement for 3D parallax effect
      handleMouseMove = (e: MouseEvent) => {
        if (!videoRef.current || !textRef.current) return;
        
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(videoRef.current, {
          x: x * 30,
          y: y * 30,
          scale: 1.05,
          rotationY: y * -2,
          rotationX: x * 2,
          duration: 1.5,
          ease: 'power3.out',
        });

        gsap.to(textRef.current, {
          x: x * -50,
          y: y * -50,
          rotationY: y * -5,
          rotationX: x * 5,
          duration: 1.5,
          ease: 'power3.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      gsap.set(videoRef.current, { scale: 1.05 });
    }, containerRef);

    return () => {
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-0 h-screen w-full bg-[#f8f7f5] dark:bg-black overflow-hidden perspective-[1000px]"
    >
      <video
        ref={videoRef}
        src={getAssetPath("/assets/assetmizu.mp4")}
        className="absolute inset-0 w-full h-full z-0 opacity-80 object-cover origin-center"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 z-10 bg-[#f8f7f5]/30 dark:bg-black/30 pointer-events-none" />
      <div 
        ref={textRef} 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none origin-center"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-serif text-neutral-900 dark:text-white uppercase tracking-tighter text-center max-w-6xl leading-[0.85] drop-shadow-2xl">
          The<br/> <span className="italic">Have-It-All</span><br/> Habitat.
        </h1>
        <p className="mt-12 text-lg md:text-xl text-neutral-900/80 dark:text-white/80 font-sans tracking-[0.4em] uppercase drop-shadow-lg">
          Mizumi Reserve
        </p>
      </div>
    </section>
  );
}
