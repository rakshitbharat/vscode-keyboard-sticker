import { NextResponse } from "next/server";

export function middleware(request) {
  // Handle SVG files from public folder
  if (
    request.nextUrl.pathname.startsWith("/themes/") &&
    request.nextUrl.pathname.endsWith(".svg")
  ) {
    const response = new NextResponse(null, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/themes/:path*"],
};
