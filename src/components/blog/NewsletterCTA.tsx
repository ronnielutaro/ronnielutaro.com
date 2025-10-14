import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function NewsletterCTA() {
  return (
    <div 
      className="max-w-4xl mx-auto p-12 rounded-3xl text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.08))',
        backdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(96, 165, 250, 0.25)',
        boxShadow: '0 0 60px rgba(96, 165, 250, 0.15)',
      }}
    >
      <h2 className="text-white mb-3">
        Never Miss a Post
      </h2>
      <p className="text-white/70 mb-8 max-w-2xl mx-auto">
        Get the latest insights on product management, engineering, and strategy delivered straight to your inbox.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-6 rounded-xl border-0 text-white placeholder:text-white/50"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
          }}
        />
        <Button 
          className="px-8 py-6 rounded-xl text-white border-0"
          style={{
            background: 'linear-gradient(135deg, #34d399, #10b981)',
          }}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}
