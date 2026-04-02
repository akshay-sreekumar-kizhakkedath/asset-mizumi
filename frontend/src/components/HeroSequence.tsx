'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handleMouseMove: (e: MouseEvent) => void;
    let ctx: gsap.Context;

    const setupAnimation = () => {
      const video = videoRef.current;
      if (!video) return;

      // Ensure video is ready before setting up the timeline
      if (Number.isNaN(video.duration)) {
        video.addEventListener('loadedmetadata', setupAnimation, { once: true });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%', // Scroll distance
            scrub: 0.5, // Smooth scrubbing
            pin: true,
          },
        });

        // Scrub video timeline
        tl.fromTo(
          video,
          { currentTime: 0 },
          { 
            currentTime: video.duration,
            ease: 'none'
          }
        );

        // Handle mouse movement for 3D parallax effect
        handleMouseMove = (e: MouseEvent) => {
          if (!videoRef.current || !textRef.current) return;
          
          // Calculate mouse position relative to center (-1 to 1)
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;

          // Animate video slightly opposite to mouse, scaled up to prevent edge clipping
          gsap.to(videoRef.current, {
            x: x * 30,
            y: y * 30,
            scale: 1.05,
            rotationY: y * -2,
            rotationX: x * 2,
            duration: 1.5,
            ease: 'power3.out',
          });

          // Animate text heavily in direction of mouse for strong 3D depth
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

        // Initial scale up for video to prevent edges showing during parallax
        gsap.set(videoRef.current, { scale: 1.05 });
      }, containerRef);
    };

    setupAnimation();

    return () => {
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-0 h-screen w-full bg-black overflow-hidden perspective-[1000px]"
    >
      <video
        ref={videoRef}
        src="/assets/assetmizu.mp4"
        className="absolute inset-0 w-full h-full z-0 opacity-80 object-cover origin-center"
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />
      <div 
        ref={textRef} 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none origin-center"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-serif text-white uppercase tracking-tighter text-center max-w-6xl leading-[0.85] drop-shadow-2xl">
          The<br/> <span className="italic">Have-It-All</span><br/> Habitat.
        </h1>
        <p className="mt-12 text-lg md:text-xl text-white/80 font-sans tracking-[0.4em] uppercase drop-shadow-lg">
          Mizumi Reserve
        </p>
      </div>
    </section>
  );
}
