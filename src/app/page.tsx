
import ExportedImage from 'next-image-export-optimizer';
import { FeaturedWork } from '@/components/FeaturedWork';
import heroContent from '../../content/hero.json';
// Content-only page; ClientLayout is applied in src/app/layout.tsx

export default function Home() {
  return (
  <>
      {/* Hero Section */}
      <section className="flex items-center justify-center relative z-10 -mt-24 pt-0 pb-0" style={{ minHeight: '55vh' }}>
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
          {/* Left Column - Text */}
          <div className="flex-[1.3] max-w-3xl md:pl-14 lg:pl-20 md:pr-6 lg:pr-10 text-center md:text-left">
            <div className="text-green-400 font-medium text-lg mb-2">{heroContent.greeting}</div>
            <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">{heroContent.headline}</h1>
            <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">{heroContent.bio}</p>
            <div className="flex justify-center md:justify-start">
              <a href={heroContent.ctaLink} className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 shadow-lg hover:from-teal-500 hover:to-green-400 transition">{heroContent.ctaText}</a>
            </div>
          </div>
          {/* Right Column - Photo */}
          <div className="flex-1 flex justify-center md:justify-end pt-0 md:pt-6 lg:pt-10 pr-0 md:pr-8 lg:pr-12">
            <ExportedImage 
              src={heroContent.image.src} 
              alt={heroContent.image.alt} 
              width={512}
              height={640}
              className="w-full max-w-lg rounded-3xl shadow-2xl"
              priority 
            />
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <FeaturedWork />
      
    </>
  );
}

