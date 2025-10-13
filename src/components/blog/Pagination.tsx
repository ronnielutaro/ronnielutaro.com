'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export function Pagination({ currentPage = 1, totalPages = 3 }: PaginationProps) {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex justify-center">
      <nav className="flex items-center gap-2">
        {/* Previous */}
        <Link
          href={isPreviousDisabled ? "#" : `?page=${currentPage - 1}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            isPreviousDisabled 
              ? 'text-white/40 cursor-not-allowed' 
              : 'text-white/70 hover:text-white'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(96, 165, 250, 0.20)',
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              page === currentPage 
                ? 'text-white border-0' 
                : 'text-white/70 hover:text-white'
            }`}
            style={
              page === currentPage
                ? { background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }
                : {
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(96, 165, 250, 0.20)',
                  }
            }
          >
            {page}
          </Link>
        ))}

        {/* Ellipsis - only show if more than 3 pages */}
        {totalPages > 3 && (
          <div className="w-10 h-10 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-white/50" />
          </div>
        )}

        {/* Next */}
        <Link
          href={isNextDisabled ? "#" : `?page=${currentPage + 1}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            isNextDisabled 
              ? 'text-white/40 cursor-not-allowed' 
              : 'text-white/70 hover:text-white'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(96, 165, 250, 0.20)',
          }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      </nav>
    </div>
  );
}