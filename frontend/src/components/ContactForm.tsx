'use client';

export default function ContactForm() {
  return (
    <section id="contact" className="py-40 bg-background dark:bg-neutral-950 relative overflow-hidden flex flex-col items-center">
      {/* Background blur effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-[0.3em] text-amber-500 uppercase mb-4">Contact Us</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-neutral-900 dark:text-white/90">Begin your journey</h3>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-800 dark:text-white/80" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col group">
            <label className="text-xs uppercase tracking-widest mb-2 text-neutral-500 group-focus-within:text-amber-500 transition-colors">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-4 px-2 outline-none focus:border-amber-500 transition-colors text-lg placeholder-neutral-700"
            />
          </div>

          <div className="flex flex-col group">
            <label className="text-xs uppercase tracking-widest mb-2 text-neutral-500 group-focus-within:text-amber-500 transition-colors">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-4 px-2 outline-none focus:border-amber-500 transition-colors text-lg placeholder-neutral-700"
            />
          </div>

          <div className="flex flex-col group md:col-span-2">
            <label className="text-xs uppercase tracking-widest mb-2 text-neutral-500 group-focus-within:text-amber-500 transition-colors">Contact Number</label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-4 px-2 outline-none focus:border-amber-500 transition-colors text-lg placeholder-neutral-700"
            />
          </div>

          <div className="flex flex-col group md:col-span-2">
            <label className="text-xs uppercase tracking-widest mb-2 text-neutral-500 group-focus-within:text-amber-500 transition-colors">Query</label>
            <textarea
              rows={4}
              placeholder="I am interested in..."
              className="bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-4 px-2 outline-none focus:border-amber-500 transition-colors text-lg placeholder-neutral-700 resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-12">
            <button className="relative group px-16 py-6 overflow-hidden rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-black hover:border-amber-500 transition-all duration-500">
              {/* Very pronounced golden gradient at the bottom edge */}
              <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#c97412] to-transparent pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Text */}
              <span className="relative z-10 font-sans font-bold tracking-[0.25em] text-sm uppercase text-black dark:text-white">
                Enquire Now
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
