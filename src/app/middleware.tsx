import { NextResponse } from 'next/server';

const initialDate = Date.now();

export default async function middleware() {
  const next = NextResponse.next();
  next.headers.set('x-edge-age', String(Date.now() - initialDate));
  return next;
}
