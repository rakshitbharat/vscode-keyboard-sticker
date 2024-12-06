import { NextResponse } from "next/server";

export function middleware(request) {
  // Handle all image files
  if (request.nextUrl.pathname.startsWith("/api/image/")) {
    return new NextResponse(null, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/image/:path*"],
};
