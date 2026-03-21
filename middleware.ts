import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Use simple cookie or localStorage check for role. 
  // In Next.js middleware, we can't easily read window.localStorage directly.
  // We'll trust the client side for rendering restrictions, but we can do a basic check here or purely client-side.
  // Actually, since this is a local hackathon setup and Next.js middleware runs on server side,
  // we rely on cookies. We didn't set auth cookies on the backend, just returned a JWT.
  // For simplicity, we'll bypass actual middleware blocking for now and just handle auth redirection mainly on client-side or leave middleware empty to let client-side handle it.

  const path = request.nextUrl.pathname;
  
  // Example dummy logic: if trying to access /create-project, but we don't have a specific cookie, we might redirect.
  // Since we use localStorage, we can't secure paths purely via middleware without cookies. We will handle auth redirects in client components or root layout.
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
