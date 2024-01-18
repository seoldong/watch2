import { NextResponse } from "next/server";

export async function middleware(request, response) {
  const session = await request.cookies.get("session");
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/membership/customMenu", request.url));
    }
  }

  if (pathname === "/membership/customMenu") {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (pathname === "/membership/userProfile") {
    const url = new URL("/api/signIn", request.url).toString();
    const options = {
      method: "GET",
      headers: { Cookie: `session=${session?.value}` },
    };
    const responseAPI = await fetch(url, options);

    if (responseAPI.status !== 200) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/signIn", "/membership/userProfile"],
};
