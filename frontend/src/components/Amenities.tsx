'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  {
    title: 'The Clubhouse',
    desc: 'A dedicated 63,000+ sq. ft. clubhouse boasting a plethora of luxurious amenities for recreation and leisure.',
    img: '/assets/b1.jpg',
  },
  {
    title: 'Grand Arrival',
    desc: 'Gates that proudly speak of the world within, entrances that feel worthy of the red carpet.',
    img: '/assets/image-1.webp',
  },
  {
    title: 'Socially-enabled',
    desc: 'Designed for connection. Designed for community. Designed for everyone.',
    img: '/assets/b2.jpg',
  },
  {
    title: 'Distinctive Façade',
    desc: 'Where every colour, pattern, texture and material invites you to explore the soul of the space within.',
    img: '/assets/image-2.webp',
  },
];

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.amenity-card') as HTMLElement[];

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Skip the very last card since nothing covers it
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          // opacity: 0.3, // Removed to prevent weird blending
          filter: 'brightness(0.4)', // Darken instead of making transparent
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top bottom', // When the next card's top hits the viewport bottom
            end: 'top 15%',      // When the next card reaches its sticky position (top-15vh)
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="amenities" ref={containerRef} className="py-32 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 mb-32 text-center relative z-10">
        <h2 className="text-sm tracking-[0.3em] text-amber-500 uppercase mb-4">World-Class Amenities</h2>
        <h3 className="text-5xl md:text-7xl font-serif text-white/90">Life made luxurious</h3>
        <p className="mt-8 text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Mizumi Reserve boasts of over 31 indoor and outdoor amenities curated to elevate every part of your life.
        </p>
      </div>

      {/* pb-[30vh] ensures there's enough room to scroll past the final card */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col gap-[70vh] pb-[30vh]">
        {amenities.map((item, i) => (
          <div
            key={i}
            className="amenity-card sticky w-full rounded-3xl overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border border-white/10 origin-top bg-black"
            style={{ 
              top: '15vh',
              height: '70vh',
              zIndex: i + 10 // Ensure proper stacking
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover object-center grayscale-[0.2] transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end pointer-events-none">
              <span className="text-amber-500 font-mono tracking-widest text-sm mb-4">
                0{i + 1}
              </span>
              <h4 className="text-4xl md:text-6xl font-serif text-white mb-6 uppercase tracking-wide">
                {item.title}
              </h4>
              <p className="text-lg md:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
