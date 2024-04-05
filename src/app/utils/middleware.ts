import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import {toast }from "react-toastify";

export default function middleware(
  req: NextRequest,
  res: NextResponse,
  next: () => void,
) {
  const token = req.cookies.get("token")?.value;

  // const decoded = jwtDecode(token ?? "");
  // try {
  //   const currentDate = new Date().toDateString();
  //   const decodedDate = new Date(decoded.iat ?? "").toDateString();
  //   console.log(`Current date: ${currentDate}`);
  //   console.log(`Decoded date: ${decodedDate}`);
  // } catch (error) {
  //   console.error("Error parsing date:", error);
  // }

  if (
    !token &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (req.nextUrl.pathname === "/login" ||req.nextUrl.pathname === "/")) {
    const decoded = jwtDecode(token ?? "") as { role: string };
    if (decoded.role === "user") {
      return NextResponse.redirect(new URL("/components/landingPage", req.url));
    } else if (decoded.role === "admin") {
      return NextResponse.redirect(new URL("/components/dashboard", req.url));
    } else {
      toast.error("Invalid Token!");
    }
  }

  return NextResponse.next();
}
