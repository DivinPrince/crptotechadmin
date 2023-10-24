import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.crptotech.com"]
    : ["http://localhost:3001"];
// This function can be marked `async` if using `await` inside
export function middleware(request: Request) {
const origin = request.headers.get('origin');
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 405,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
