'use client';
import Link from 'next/link';
import { AUTHOR } from '@/config';
import { useRef } from 'react';

export function Logo() {
  const logoRef = useRef(null);

  return (
    <span
      ref={logoRef}
      className="text-md md:text-xl dark:text-gray-100 whitespace-nowrap font-bold transition-colors"
    >
      <Link
        href="/"
        className="hover:bg-gray-200 dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] p-2 rounded-md -ml-2 transition-[background-color]"
      >
        {AUTHOR.name}
      </Link>
    </span>
  );
}
