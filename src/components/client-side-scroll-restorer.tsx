// src/ClientSideScrollRestorer.tsx
'use client';

import { useScrollRestorer } from 'next-scroll-restorer';

const ClientSideScrollRestorer = () => {
  useScrollRestorer();
  return null;
};

export default ClientSideScrollRestorer;
