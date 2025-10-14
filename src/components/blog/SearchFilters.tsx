'use client';

import React, { useState } from 'react';

const categories = ['All', 'Product', 'Engineering', 'Strategy', 'Design', 'Leadership'];

export function SearchFilters() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="w-full px-4 py-8 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              style={
                activeCategory === category
                  ? {
                      background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                    }
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
