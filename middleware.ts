import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const authRoutes = ['/login', '/register']
  const protectedRoutes = ['/dashboard']

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
