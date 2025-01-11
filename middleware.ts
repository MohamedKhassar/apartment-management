import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { UserAdmin } from './lib/types';

export function middleware(request: NextRequest) {
    const protectedRoutes = ["/dashboard"];
    const authRoutes = ["/login"];
    const cookie = request.cookies.get("user")?.value;
    // const role = request.cookies.get("role")?.value;
    if (cookie) {
        const user: UserAdmin = JSON.parse(cookie)
        if (authRoutes.includes(request.nextUrl.pathname) && user.name) {
            return NextResponse.redirect(new URL("/", request.url).toString());
        }
        if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !user.name) {
            return NextResponse.redirect(new URL("/login", request.url).toString());
        }
    }

    return NextResponse.next();
}

export default middleware as NextMiddleware;
