'use client';

import React from 'react';
import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';


interface ProjectCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ image, category, title, excerpt, date, readTime, tags, slug }) => {
  return (
    <Link href={`/projects/${slug}`} className="block" aria-label={`View ${title}`}>
    <article 
      className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col h-[480px]"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(96, 165, 250, 0.20)',
        boxShadow: '0 0 30px rgba(96, 165, 250, 0.1)',
      }}
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden flex-shrink-0">
        <ExportedImage 
          src={image}
          alt={title}
          width={400}
          height={220}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      <div 
        className="absolute top-4 left-4 px-3 py-1 rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <span className="text-white">{category}</span>
      </div>
    </div>

      {/* Content */}
  <div className="p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 text-white/60">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white mb-2 line-clamp-2">
        {title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/70 mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        {/* Tags and Read More */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2 flex-wrap max-h-[60px] overflow-hidden">
            {tags.slice(0,3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-white/70 border-white/20 hover:bg-white/5"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-white/60 border-white/15">+{tags.length - 3}</Badge>
            )}
          </div>
          <div className="p-2 rounded-full transition-all group-hover:bg-white/10">
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white" />
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};
