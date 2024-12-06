import { NextResponse } from "next/server";

export function middleware(request) {
  // Handle SVG files
  if (request.nextUrl.pathname.endsWith(".svg")) {
    return new NextResponse(null, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/themes/:path*",
};
