import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/src/lib/spotify';

export const dynamic = 'force-dynamic';

/** The CDN keeps this for 30 seconds, so however many people visit, Spotify hears from one. */
export async function GET() {
  const track = await getNowPlaying();
  return NextResponse.json(track, {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=30' },
  });
}
