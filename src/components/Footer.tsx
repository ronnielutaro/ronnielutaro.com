'use client';

import React, { useState } from 'react';
import { Mail, Send, Linkedin, Github, Twitter, ArrowRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="relative mt-32">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Premium Newsletter Section */}
        <div 
          className="relative p-12 rounded-3xl mb-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.06))',
            backdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(96, 165, 250, 0.2)',
          }}
        >
          {/* Glow Effect */}
          <div 
            className="absolute inset-0 opacity-30 blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.4), transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 
              className="text-white mb-3"
              style={{ 
                fontSize: '32px',
                fontWeight: '700',
                letterSpacing: '-0.02em',
              }}
            >
              Stay in the Loop
            </h2>
            <p 
              className="text-white/70 mb-8"
              style={{ fontSize: '16px', lineHeight: '1.6' }}
            >
              Get insights on product management, case studies, and lessons learned from building products in emerging markets.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '15px',
                  }}
                />
              </div>
              <button
                type="submit"
                className="group px-8 py-4 rounded-xl text-white transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #4ade80, #14b8a6)',
                }}
              >
                <span style={{ fontWeight: '600' }}>Subscribe</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {isSubscribed && (
              <div 
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-emerald-400"
                style={{
                  background: 'rgba(52, 211, 153, 0.1)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  fontSize: '14px',
                }}
              >
                ✓ Thanks for subscribing!
              </div>
            )}
          </div>
        </div>

  {/* Footer Grid */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 md:ml-24">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 
              className="text-white mb-2"
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              Ronnie Lutaro
            </h3>
            <p 
              className="text-white/60 mb-4"
              style={{ fontSize: '14px', lineHeight: '1.6' }}
            >
              Product Manager building mobile-first products for emerging markets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-white/90 mb-4"
              style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', href: '/projects' },
                { label: 'Case Studies', href: '/projects' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    style={{ fontSize: '15px' }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 
              className="text-white/90 mb-4"
              style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ronnielutaro@gmail.com"
                  className="text-white/60 hover:text-emerald-400 transition-colors flex items-center gap-2"
                  style={{ fontSize: '15px' }}
                >
                  <Mail className="w-4 h-4" />
                  <span>ronnielutaro@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  download
                  className="text-white/60 hover:text-blue-400 transition-colors"
                  style={{ fontSize: '15px' }}
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 
              className="text-white/90 mb-4"
              style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/in/ronnielutaro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/ronnielutaro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/ronnielutaro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <p 
            className="text-white/40 text-center"
            style={{ fontSize: '13px' }}
          >
            © {new Date().getFullYear()} Ronnie Lutaro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-white/40 hover:text-white/60 transition-colors"
              style={{ fontSize: '13px' }}
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-white/40 hover:text-white/60 transition-colors"
              style={{ fontSize: '13px' }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}