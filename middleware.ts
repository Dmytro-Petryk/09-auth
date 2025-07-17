import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  if (!token && !isPublicRoute) {
    // Якщо не авторизований, редірект на вхід
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token && isPublicRoute) {
    // Якщо авторизований, редірект зі сторінок входу/реєстрації на нотатки
    return NextResponse.redirect(new URL('/notes', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/notes/:path*', '/profile', '/sign-in', '/sign-up'],
};
