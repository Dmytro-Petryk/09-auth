import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/clientApi';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  if (!token && refreshToken) {
    try {
      const newSession = await checkSession(refreshToken);
      if (newSession?.accessToken && newSession?.refreshToken) {
        const response = NextResponse.next();
        response.cookies.set('accessToken', newSession.accessToken);
        response.cookies.set('refreshToken', newSession.refreshToken);
        return response;
      }
    } catch (err) {
      console.error('Failed to refresh session', err);
    }
  }

  if (
    !token &&
    ['/notes', '/profile'].some((path) => pathname.startsWith(path))
  ) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};
