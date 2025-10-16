
import ExportedImage from 'next-image-export-optimizer';
import { FeaturedWork } from '@/components/FeaturedWork';
// Content-only page; ClientLayout is applied in src/app/layout.tsx

export default function Home() {
  return (
  <>
      {/* Hero Section */}
      <section className="flex items-center justify-center relative z-10 -mt-24 pt-0 pb-0" style={{ minHeight: '55vh' }}>
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
          {/* Left Column - Text */}
          <div className="flex-[1.3] max-w-3xl md:pl-14 lg:pl-20 md:pr-6 lg:pr-10 text-center md:text-left">
            <div className="text-green-400 font-medium text-lg mb-2">Hello!</div>
            <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">I&apos;m Ronnie Lutaro</h1>
            <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">Product Manager, Software Engineer, and Storyteller. I&apos;ve Spent the last 4+ years working across Technical Product Development, Enterprise Software & Venture Building. I&apos;ve Supported more than 50 founders across 2 different countries with Product Development & Go-To-Market. My approach translates core user needs into Products that generate real business value.</p>
            <div className="flex justify-center md:justify-start">
              <a href="/contact" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 shadow-lg hover:from-teal-500 hover:to-green-400 transition">Get In Touch</a>
            </div>
          </div>
          {/* Right Column - Photo */}
          <div className="flex-1 flex justify-center md:justify-end pt-0 md:pt-6 lg:pt-10 pr-0 md:pr-8 lg:pr-12">
            <ExportedImage 
              src="/media/ronnie_potrait.png" 
              alt="Ronnie Lutaro" 
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

