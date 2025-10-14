
import Image from 'next/image';
// Content-only page; ClientLayout is applied in src/app/layout.tsx

export default function Home() {
  return (
  <>
      {/* Hero Section */}
      <section className="flex items-center justify-center relative z-10 -mt-24 pt-0 pb-0" style={{ minHeight: '55vh' }}>
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
          {/* Left Column - Text */}
          <div className="flex-[1.3] max-w-3xl md:pl-14 lg:pl-20 md:pr-6 lg:pr-10">
            <div className="text-green-400 font-medium text-lg mb-2">Hello!</div>
            <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl mb-3 leading-tight">I&apos;m Ronnie Lutaro</h1>
            <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">Product Manager, Software Engineer, and Storyteller. I&apos;ve Spent the last 5+ years working across Technical Product Development, Enterprise Software & Venture Building. I&apos;ve Supported more than 50 founders with Product Development & Go-To-Market. My approach translates core user needs into Products that generate real business value.</p>
            <a href="mailto:ronnielutaro@gmail.com" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 shadow-lg hover:from-teal-500 hover:to-green-400 transition">Get In Touch</a>
          </div>
          {/* Right Column - Photo */}
          <div className="flex-1 flex justify-center md:justify-end pt-0 md:pt-6 lg:pt-10 pr-0 md:pr-8 lg:pr-12">
            <Image 
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
  <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-bold text-center mb-2 text-white text-3xl md:text-4xl">Featured Work</h2>
          <p className="text-center mb-8 text-white/80">Projects I&apos;m proud of</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-700/10 rounded-2xl p-6 backdrop-blur-lg border border-blue-400/20 shadow-lg">
              <h3 className="font-semibold text-xl text-white mb-2">Rocketize</h3>
              <p className="text-white/70 mb-3">Intelligent tools for Marketing Teams to streamline operations & maximize ROAS</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">Product</span>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">Marketing Tech</span>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">SaaS</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-700/10 rounded-2xl p-6 backdrop-blur-lg border border-blue-400/20 shadow-lg">
              <h3 className="font-semibold text-xl text-white mb-2">StartHub</h3>
              <p className="text-white/70 mb-3">Supporting 10+ founders from idea to market with customer discovery and product development</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">Product Management</span>
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium">Customer Discovery</span>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">Startups</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

