'use server';

import { type NextRequest, NextResponse } from 'next/server';

import { session } from './lib/session.lib';

const protectedRoutes = ['/'];
const publicRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  const { access_token, user } = await session();

  const hasSession = !!(access_token || user);

  if (isPublicRoute && hasSession)
    return NextResponse.redirect(new URL('/', request.url));

  if (isProtectedRoute && !hasSession)
    return NextResponse.redirect(new URL('/auth/login', request.url));

  return NextResponse.next();
}
