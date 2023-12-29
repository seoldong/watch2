// checkSessionExpiration.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from 'firebase-admin';


async function checkSessionExpiration(request, response) {
  try {
    const sessionCookie = cookies(request.headers).get('session')?.value || '';

    if (!sessionCookie) {
      return NextResponse.json({ message: 'Session not found. User logged out.' }, { status: 401 });
    }

    // 세션 확인
    const decodedClaims = await auth().verifySessionCookie(sessionCookie, true);

    if (!decodedClaims) {
      // 만료된 세션일 경우 로그아웃 처리
      await auth().revokeRefreshTokens(decodedClaims.sub);
      return NextResponse.json({ message: 'Session expired. User logged out.' }, { status: 401 });
    }

    return null; // 세션이 유효한 경우
  } catch (error) {
    console.error('Error checking session expiration:', error);
    return NextResponse.json({ message: 'Error checking session expiration.' }, { status: 500 });
  }
}

export default checkSessionExpiration;
