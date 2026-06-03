// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  // Simpan url saat ini ke dalam header agar bisa dibaca oleh Root Layout Server
  requestHeaders.set("x-url", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Jalankan middleware ini untuk semua halaman
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
