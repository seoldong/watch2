import { NextResponse } from 'next/server';

export async function middleware(request, response) {
    const session = await request.cookies.get("session");
    const { pathname } = new URL(request.url);
    console.log(pathname);

    if (pathname === '/') {
        if (session) {
            return await NextResponse.redirect(new URL('/membership/customMenu', request.url));
        }
    }

    if (pathname === '/signIn') {
        if (session) {
            return await NextResponse.redirect(new URL('/membership/customMenu', request.url));
        }
    }


    if (pathname === '/membership/userProfile') {
        if (!session) {
            return await NextResponse.redirect(new URL('/signIn', request.url));
        }

        const url = "http://localhost:3000/api/signIn"
        const option = {
            method: 'GET',
            headers: { Cookie: `session=${session?.value}` }
        }
        const responseAPI = await fetch(url, option);

        if (await responseAPI.status !== 200) {
            return await NextResponse.redirect(new URL('/signIn', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/', '/signIn', '/membership/userProfile']
}

