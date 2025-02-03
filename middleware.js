// frontend/middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths accessible without authentication
  const publicPaths = ['/login'];
  if (publicPaths.includes(pathname)) return NextResponse.next();

  // Check for auth token (client-side cookie)
  const sessionToken = request.cookies.get('session')?.value;

  // Redirect to login if no session token
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};