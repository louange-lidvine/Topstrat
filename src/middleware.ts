import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token) as { exp: number };
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    return currentTime > expirationTime;
  } catch (error) {
    console.error("Failed to decode token for expiration check", error);
    return true; 
  }
};

export default function middleware(
  req: NextRequest,
  res: NextResponse,
  next: () => void
) {
  // Get the token from the cookies
  const token = req.cookies.get("token")?.value;

  // Allow public routes like signIn, signup, etc.
  const publicPaths = [
    "/Pages/signIn",
    "/Pages/signup",
    "/Pages/homePage",
    "/Pages/services",
    "/",
    "/Pages/About",
    "/Pages/Contacts",
  ];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If the token is not available, redirect to signIn page
  if (!token) {
    console.warn("No token found, redirecting to /Pages/signIn");
    return NextResponse.redirect(new URL("/Pages/signIn", req.url));
  }

  // If the token exists and user is trying to access signIn, redirect based on role
  if (token && req.nextUrl.pathname === "/Pages/signIn") {
    try {
      const decoded = jwtDecode(token) as { role: string };

      if (decoded.role === "admin") {
        console.log("Admin logged in, redirecting to Dashboard");
        return NextResponse.redirect(new URL("/components/Dashboard", req.url));
      } else if (decoded.role === "user") {
        console.log("User logged in, redirecting to Landing page");
        return NextResponse.redirect(
          new URL("/components/Landingpage", req.url)
        );
      } else {
        console.error("Invalid token role, redirecting to signIn");
        return NextResponse.redirect(new URL("/Pages/signIn", req.url));
      }
    } catch (error) {
      console.error("Token decoding failed", error);
      return NextResponse.redirect(new URL("/Pages/signIn", req.url));
    }
  }

  // Check if the token is expired
  if (token && isTokenExpired(token)) {
    console.warn("Token has expired, redirecting to /Pages/signIn");
    return NextResponse.redirect(new URL("/Pages/signIn", req.url));
  }

  // If everything is valid, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
