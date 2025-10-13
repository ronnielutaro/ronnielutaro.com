
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-fit">
      <div className="flex items-center gap-2 px-6 py-2.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition ${isActive(item.href) ? 'text-green-400 bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Header;
