import React from 'react';
import { CaseStudyHero } from '@/components/projects/CaseStudyHero';
import { CaseStudyNavigation } from '@/components/projects/CaseStudyNavigation';
import { CaseStudySection } from '@/components/projects/CaseStudySection';
import { Callout } from '@/components/projects/Callout';
import { Quote } from '@/components/projects/Quote';
import { ImageGrid } from '@/components/projects/ImageGrid';
import { MetricsGrid } from '@/components/projects/MetricsGrid';

// Rich case study data matching the reference format
const caseStudy = {
  id: 1,
  badge: '0→1 PRODUCT',
  title: 'AGRILogistics Mobile & Web Platform',
  oneLiner: 'Built farmer-to-hub logistics platform with real-time tracking; introduced manual-first operations approach to unlock driver adoption and scale first-mile delivery.',
  metrics: [
    { label: 'Driver Activation', value: '40% → 65%' },
    { label: 'Performance', value: '20% faster' },
    { label: 'Usability Score', value: '+40%' },
  ],
  role: 'Product Manager',
  timeline: '2024',
  duration: '6 months',
  heroImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
};


export async function generateStaticParams() {
  // Replace with real slugs as needed
  return [
    { slug: 'agrilogistics' },
    { slug: 'undp-youth-ignite' },
    { slug: 'rocketize-os' },
  ];
}

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: '#06080f' }}>
      {/* Background Light Beams */}
      <div 
        className="fixed top-0 right-1/4 w-[1200px] h-[1200px] pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 60%)',
          filter: 'blur(90px)',
          transform: 'rotate(-25deg)',
          animation: 'glow1 16s ease-in-out infinite',
        }}
      />
      <div 
        className="fixed bottom-0 left-1/4 w-[800px] h-[800px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.5) 0%, rgba(96,165,250,0) 50%)',
          filter: 'blur(80px)',
          animation: 'pulse 12s ease-in-out infinite',
        }}
      />

      <main className="relative z-10 pt-32 pb-24">
        <CaseStudyHero {...caseStudy} />
        
        {/* Story-driven content sections */}
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* The Challenge Section */}
          <CaseStudySection title="The Challenge">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                Meet James, a smallholder farmer in rural Tanzania. Every harvest season, he faces the same problem: getting his crops from his farm to the collection hub 15km away. The existing system is broken—middlemen take huge cuts, pickup times are unpredictable, and there&apos;s no way to track deliveries or hold drivers accountable.
              </p>
              
              <p className="text-lg text-white/90 leading-relaxed">
                AGRILogistics wanted to solve this by building a digital platform connecting farmers directly with verified drivers. But there was a catch: most drivers had never used a smartphone app for work, internet connectivity was spotty, and trust in digital systems was low.
              </p>
              
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-xl font-semibold text-white mb-2">The core challenge:</p>
                <p className="text-lg text-white/90">
                  How do we build a 0→1 product that works in low-tech environments while still providing the tracking and accountability that makes the business model viable?
                </p>
              </div>

              <ImageGrid 
                columns={1}
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
                    alt: "Rural farming landscape",
                    caption: "The rural context where our product needed to work"
                  }
                ]}
              />
            </div>
          </CaseStudySection>

          {/* Discovery & Insights Section */}
          <CaseStudySection title="Discovery & Insights">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                I spent 3 weeks in the field conducting user interviews with 15 drivers and 20 farmers. The research revealed critical insights that shaped our entire product strategy:
              </p>
              
              <ul className="space-y-3 text-lg text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                  <span><strong>Drivers preferred SMS and phone calls</strong> over app notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                  <span><strong>Internet connectivity was inconsistent,</strong> requiring offline-first design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                  <span><strong>Trust needed to be earned gradually</strong> through successful deliveries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                  <span><strong>Farmers cared more about predictability</strong> than real-time tracking</span>
                </li>
              </ul>

              <Callout type="insight" title="The 'Aha Moment'">
                We didn&apos;t need to force-fit sophisticated technology on users who weren&apos;t ready. Instead, we could build a hybrid system—manual operations on the backend, simple mobile interfaces on the frontend, and gradually introduce more automation as trust grew.
              </Callout>

              <Quote author="James" role="Farmer from Morogoro region">
                &ldquo;I don&apos;t need GPS tracking. I just need to know when the driver will arrive so I can have my bags ready.&rdquo;
              </Quote>

              <ImageGrid 
                columns={2}
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                    alt: "User interview session",
                    caption: "Field research with drivers and farmers"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                    alt: "Research synthesis",
                    caption: "Synthesis of user insights"
                  }
                ]}
              />
            </div>
          </CaseStudySection>

          {/* Strategy & Decisions Section */}
          <CaseStudySection title="Strategy & Decisions">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                Based on our research, I made three critical strategic decisions:
              </p>
              
              <div className="space-y-6">
                <Callout type="info" title="Decision 1: Manual-First Operations">
                  Rather than building complex auto-matching algorithms, we built a simple dispatch system where operations staff manually assigned drivers to routes. This let us launch in 2 months instead of 6.
                </Callout>

                <Callout type="info" title="Decision 2: SMS + App Hybrid">
                  We built a mobile app for drivers but backed it with SMS notifications and phone call support. This redundancy ensured reliability even when internet was down.
                </Callout>

                <Callout type="info" title="Decision 3: Progressive Verification">
                  Instead of requiring full KYC upfront, we used a progressive verification model: basic info to start, then gradual verification as they completed more deliveries.
                </Callout>
              </div>
            </div>
          </CaseStudySection>

          {/* Results & Impact Section */}
          <CaseStudySection title="Results & Impact">
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                Three months post-launch, the numbers told a compelling story:
              </p>

              <MetricsGrid 
                columns={3}
                metrics={[
                  { value: "65%", label: "Driver Activation", sublabel: "Up from 40% baseline", color: "green" },
                  { value: "20%", label: "Faster Operations", sublabel: "UI/API performance gains", color: "blue" },
                  { value: "40%", label: "Usability Improvement", sublabel: "System Usability Scale", color: "amber" }
                ]}
              />

              <div className="bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-white mb-4">Business Impact:</h4>
                <ul className="space-y-2 text-white/90">
                  <li>• Onboarded 45 active drivers in first 3 months</li>
                  <li>• Completed 1,200+ successful deliveries</li>
                  <li>• Farmer satisfaction score: 4.2/5</li>
                  <li>• Reduced delivery coordination time by 50%</li>
                </ul>
              </div>

              <Quote author="James" role="Farmer">
                &ldquo;Before, I never knew if a driver would show up. Now I get an SMS the day before and again 1 hour before pickup. It&apos;s simple but it changed everything.&rdquo;
              </Quote>
            </div>
          </CaseStudySection>

          {/* Reflection & Learnings Section */}
          <CaseStudySection title="Reflection & Learnings">
            <div className="space-y-6">
              <Callout type="success" title="What Worked">
                <ul className="space-y-2 text-white/90">
                  <li>• Manual-first approach validated the model before over-investing</li>
                  <li>• Hybrid SMS + app dramatically increased reliability</li>
                  <li>• Progressive verification removed friction while maintaining safety</li>
                  <li>• Deep field research created product-market fit from day one</li>
                </ul>
              </Callout>

              <Callout type="warning" title="What I'd Do Differently">
                <ul className="space-y-2 text-white/90">
                  <li>• Build offline-first from the start—retrofitting was painful</li>
                  <li>• Invest more in driver training before launch</li>
                  <li>• Set up better analytics instrumentation earlier</li>
                </ul>
              </Callout>

              <Callout type="insight" title="Next Phase Roadmap">
                <ul className="space-y-2 text-white/90">
                  <li>• Introduce automated route optimization</li>
                  <li>• Build farmer-facing app for direct booking</li>
                  <li>• Expand to 3 new regions with refined playbook</li>
                  <li>• Add payment integration for cashless transactions</li>
                </ul>
              </Callout>
            </div>
          </CaseStudySection>
        </div>

        <CaseStudyNavigation currentId={caseStudy.id} />
      </main>
    </div>
  );
}
