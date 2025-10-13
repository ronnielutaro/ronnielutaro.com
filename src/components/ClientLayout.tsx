'use client';

import React from 'react';
import Header from './navigation/Header';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
