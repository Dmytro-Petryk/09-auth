// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isPrivateRoute =
    request.nextUrl.pathname.startsWith('/notes') ||
    request.nextUrl.pathname.startsWith('/profile');
  const isAuthRoute = ['/sign-in', '/sign-up'].includes(
    request.nextUrl.pathname
  );

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
