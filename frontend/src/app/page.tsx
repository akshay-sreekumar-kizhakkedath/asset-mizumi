import HeroSequence from '@/components/HeroSequence';
import Introduction from '@/components/Introduction';
import Highlights from '@/components/Highlights';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import MasterPlan from '@/components/MasterPlan';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-950 text-white selection:bg-amber-500 selection:text-black relative z-0">
      <div className="relative z-0 bg-black">
        <HeroSequence />
      </div>
      <div className="relative z-10 bg-neutral-950">
        <Introduction />
      </div>
      <div className="relative z-20 bg-neutral-900">
        <Highlights />
      </div>
      <div className="relative z-30 bg-neutral-950">
        <Amenities />
      </div>
      <div className="relative z-40 bg-neutral-950">
        <Gallery />
      </div>
      <div className="relative z-40 bg-neutral-900">
        <MasterPlan />
      </div>
      <div className="relative z-40 bg-neutral-950">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
