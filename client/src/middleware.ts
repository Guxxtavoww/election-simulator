'use server';

import {
  type NextRequest,
  NextResponse,
  type MiddlewareConfig,
} from 'next/server';

import { session } from './lib/session.lib';

export async function middleware(request: NextRequest) {
  const { access_token, user } = await session();

  if (!access_token || !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config: MiddlewareConfig = {
  matcher: ['/'],
};
