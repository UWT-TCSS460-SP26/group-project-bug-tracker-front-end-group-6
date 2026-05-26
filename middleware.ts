import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const devBypass = process.env.NEXT_PUBLIC_TRIAGE_DEV_BYPASS === 'true';

  if (!pathname.startsWith('/triage')) {
    return NextResponse.next();
  }

  if (devBypass) {
    return NextResponse.next();
  }

  if (!req.auth) {
    const login = new URL('/login', req.nextUrl.origin);
    login.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(login);
  }

  if (!req.auth.canTriage) {
    const denied = new URL('/login', req.nextUrl.origin);
    denied.searchParams.set('error', 'forbidden');
    return NextResponse.redirect(denied);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/triage', '/triage/:path*'],
};
