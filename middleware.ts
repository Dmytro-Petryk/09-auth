import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

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
  matcher: ['/notes/:path*', '/profile', '/sign-in', '/sign-up'],
};
