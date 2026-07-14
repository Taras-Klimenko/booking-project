import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const isLoggedIn = request.cookies.get("admin_session")?.value === "true";
    const isLoginPage = request.nextUrl.pathname === "/admin/login";

    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};