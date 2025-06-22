import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    ],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public rotalar - token kontrolü yapma
    const publicPaths = [
        '/auth/error',
        '/api/auth/',
        '/api/health',
        '/sign-in',
    ];

    const protectedPaths = [
        '/dashboard'
    ];

    const isPublicPath = publicPaths.some(path =>
        pathname === path || pathname.startsWith(path)
    );

    if (isPublicPath) {
        return NextResponse.next();
    }

    try {
        // Token'ı al (hızlı kontrol)
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET
        });

        const isProtectedPath = protectedPaths.some(path =>
            pathname === path || pathname.startsWith(path)
        );

        // Dashboard erişimi için özel kontrol
        if (isProtectedPath) {
            if (!token) {
                // Auth sayfasına yönlendir
                const loginUrl = new URL("/api/auth/signin", request.url);
                loginUrl.searchParams.set('callbackUrl', pathname);
                return NextResponse.redirect(loginUrl);
            }

            // Admin kontrolü
            const roles = token?.roles as string[] || [];
            if (!roles.includes("admin")) {
                // Ana sayfaya yönlendir
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        // Diğer korumalı rotalar için genel token kontrolü
        if (!token) {
            const loginUrl = new URL("/api/auth/signin", request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }

        return NextResponse.next();

    } catch (error) {
        console.error('Middleware error:', error);

        // Hata durumunda giriş sayfasına yönlendir
        const loginUrl = new URL("/api/auth/signin", request.url);
        loginUrl.searchParams.set('error', 'middleware_error');
        return NextResponse.redirect(loginUrl);
    }
}