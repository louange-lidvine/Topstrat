import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const isTokenExpired = (token: string) => {
    const decoded = jwtDecode(token) as { exp: number };
    const expirationTime = decoded.exp * 1000; 
    const currentTime = Date.now(); 
    return currentTime > expirationTime;
};

export default function middleware(
    req: NextRequest,
    res: NextResponse,
    next: () => void
) {
    const token = req.cookies.get("token")?.value;

    if (req.nextUrl.pathname === "/components") {
        return NextResponse.next();
    }
    if (
        !token &&
        req.nextUrl.pathname !== "/Pages/signIn" &&
        req.nextUrl.pathname !== "/Pages/signup" &&
        req.nextUrl.pathname !== "/Pages/homePage" &&
        req.nextUrl.pathname !== "/Pages/services" &&
        req.nextUrl.pathname !== "/" &&
        req.nextUrl.pathname !== "/Pages/About" &&
        req.nextUrl.pathname !== "/Pages/Contacts"
    ) {
        return NextResponse.redirect(new URL("/Pages/signIn", req.url));
    }

    if (token && req.nextUrl.pathname === "/Pages/signIn") {
        const decoded = jwtDecode(token) as { role: string };
        if (decoded.role === "admin") {
            return NextResponse.redirect(
                new URL("/components/Dashboard", req.url)
            );
        } else if (decoded.role === "user") {
            return NextResponse.redirect(
                new URL("/components/Landingpage", req.url)
            );
        } else {
            toast.error("Invalid Token!");
        }
    }

    if (token && isTokenExpired(token)) {
        return NextResponse.redirect(new URL("/Pages/signIn", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
