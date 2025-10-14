'use client';

import React from 'react';
import { CheckCircle, Lightbulb, Info, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  type: 'info' | 'success' | 'warning' | 'insight';
  title: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    bg: 'from-blue-900/20 to-blue-800/20',
    border: 'border-blue-500/30',
    icon: Info,
    iconColor: 'text-blue-400',
  },
  success: {
    bg: 'from-emerald-900/20 to-emerald-800/20',
    border: 'border-emerald-500/30',
    icon: CheckCircle,
    iconColor: 'text-emerald-400',
  },
  warning: {
    bg: 'from-amber-900/20 to-amber-800/20',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
  },
  insight: {
    bg: 'from-purple-900/20 to-purple-800/20',
    border: 'border-purple-500/30',
    icon: Lightbulb,
    iconColor: 'text-purple-400',
  },
};

export const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const style = calloutStyles[type];
  const IconComponent = style.icon;

  return (
    <div 
      className={`bg-gradient-to-r ${style.bg} border ${style.border} rounded-2xl p-6 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <IconComponent className={`w-6 h-6 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
          <div className="text-white/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};