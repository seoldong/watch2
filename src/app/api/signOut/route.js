import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

async function POST(request, response) {
  const options = {
    name: "session",
    value: "",
    maxAge: -1,
  };
  cookies().set(options);
  console.log('signOut cookies')
  // return NextResponse.json({}, { status: 200 });
  return NextResponse.json({}, { status: 200 });
}

module.exports = { POST };
