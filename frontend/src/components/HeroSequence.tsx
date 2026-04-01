'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const frameCount = 300;
    const currentFrame = (index: number) =>
      `/assets/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[imageSeq.frame];
      if (img && img.complete) {
        // Calculate crop/scale to cover the canvas like object-fit: cover
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    images[0].onload = render;

    let handleMouseMove: (e: MouseEvent) => void;
    let handleResize: () => void;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Decreased scroll distance so frames pass by faster (higher perceived FPS)
          scrub: 0.5, // Reduced scrub delay for tighter, faster frame updates
          pin: true,
        },
      });

      tl.to(imageSeq, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: render,
      });

      // Handle mouse movement for 3D parallax effect
      handleMouseMove = (e: MouseEvent) => {
        if (!canvasRef.current || !textRef.current) return;
        
        // Calculate mouse position relative to center (-1 to 1)
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Animate canvas slightly opposite to mouse, scaled up to prevent edge clipping
        gsap.to(canvasRef.current, {
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

      handleResize = () => {
        resizeCanvas();
        render();
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);

      // Initial scale up for canvas to prevent edges showing during parallax
      gsap.set(canvasRef.current, { scale: 1.05 });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-0 h-screen w-full bg-black overflow-hidden perspective-[1000px]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-80 origin-center"
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
