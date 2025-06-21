import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export const config = {
    matcher: ["/dashboard/:path*"],
};
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api/auth") || pathname === "/") {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = new URL("/api/auth/signin", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith("/dashboard")) {
        const roles = token?.roles || {};

        if (!Object.keys(roles).includes("admin")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}