import { NextResponse } from "next/server";

export function middleware(request) {
  // Handle image files from public folder
  if (request.nextUrl.pathname.startsWith("/api/image/")) {
    const response = new NextResponse(null, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/image/:path*"],
};
