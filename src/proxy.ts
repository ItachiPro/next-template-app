import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  const publicRoutes = ['/login', '/register']

  const isAuthRoute = publicRoutes.includes(pathname)

  if (!token) {
    if (isAuthRoute) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|fonts).*)'],
}
