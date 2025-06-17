import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { Page } from './constants/page';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  const isAuthenticated = !!sessionCookie;

  const userPaths = [Page.Discs, Page.MyBag, Page.Account];
  const guestPaths = [Page.Root, Page.Login, Page.SignUp, Page.ForgotPassword];

  const isUserPath = userPaths.some((path) => pathname.startsWith(path));
  const isGuestPath = guestPaths.some((path) =>
    path === Page.Root ? pathname === path : pathname.startsWith(path)
  );

  if (!isAuthenticated && isUserPath) {
    return NextResponse.redirect(new URL(Page.Login, request.url));
  }

  if (isAuthenticated && isGuestPath) {
    return NextResponse.redirect(new URL(Page.Discs, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
