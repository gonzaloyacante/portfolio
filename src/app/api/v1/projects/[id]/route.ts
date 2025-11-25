import { NextResponse } from 'next/server';

// Proxy disabled by request. Return 410 Gone to indicate this route should not be used.
export async function GET() {
  return new NextResponse(JSON.stringify({ error: 'Proxy disabled. Call the public API directly.' }), {
    status: 410,
    headers: { 'content-type': 'application/json' },
  });
}
