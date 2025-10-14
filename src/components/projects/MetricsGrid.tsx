'use client';

import React from 'react';

interface MetricsGridProps {
  columns: 2 | 3 | 4;
  metrics: Array<{
    value: string;
    label: string;
    sublabel: string;
    color: 'green' | 'blue' | 'amber' | 'purple';
  }>;
}

const colorStyles = {
  green: {
    bg: 'from-emerald-900/20 to-emerald-800/20',
    border: 'border-emerald-500/30',
    valueColor: 'text-emerald-400',
  },
  blue: {
    bg: 'from-blue-900/20 to-blue-800/20',
    border: 'border-blue-500/30',
    valueColor: 'text-blue-400',
  },
  amber: {
    bg: 'from-amber-900/20 to-amber-800/20',
    border: 'border-amber-500/30',
    valueColor: 'text-amber-400',
  },
  purple: {
    bg: 'from-purple-900/20 to-purple-800/20',
    border: 'border-purple-500/30',
    valueColor: 'text-purple-400',
  },
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({ columns, metrics }) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 my-8`}>
      {metrics.map((metric, index) => {
        const style = colorStyles[metric.color];
        return (
          <div 
            key={index}
            className={`bg-gradient-to-br ${style.bg} border ${style.border} rounded-2xl p-6 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1`}
          >
            <div 
              className={`text-4xl font-bold mb-2 ${style.valueColor}`}
              style={{ fontSize: '2.5rem' }}
            >
              {metric.value}
            </div>
            <div className="text-white font-semibold mb-1">
              {metric.label}
            </div>
            <div className="text-white/70 text-sm">
              {metric.sublabel}
            </div>
          </div>
        );
      })}
    </div>
  );
};