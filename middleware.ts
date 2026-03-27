import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // Protect /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyAuth(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Prevent logged-in admins from accessing /admin/login
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (token) {
      const payload = await verifyAuth(token);
      if (payload) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
