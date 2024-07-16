'use server';

import { type NextRequest, NextResponse } from 'next/server';

import { session } from './lib/session.lib';

const protectedRoutes = ['/'] as const;
const publicRoutes = ['/auth/login', '/auth/register'] as const;

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path as any);
  const isProtectedRoute = protectedRoutes.includes(path as any);

  const { access_token, user } = await session();

  const hasSession = !!(access_token || user);

  if (isPublicRoute && hasSession) {
    return NextResponse.redirect(new URL(protectedRoutes[0], request.url));
  }

  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL(publicRoutes[0], request.url));
  }

  return NextResponse.next();
}
