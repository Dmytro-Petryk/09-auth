import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token');

  const publicRoutes = ['/sign-in', '/sign-up', '/api/auth'];
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));
  const isPrivate =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  if (!token && isPrivate) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
    const url = req.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/(profile|notes|sign-in|sign-up)'] };
