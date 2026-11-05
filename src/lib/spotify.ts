/**
 * What I'm listening to, from Spotify. Server only, so the keys never reach the browser.
 * `bun run spotify` signs in and saves the refresh token, which lasts six months. When it
 * runs out everything here returns null, and the site simply stops showing music.
 */
type Image = { url: string };
type SpotifyTrack = {
  type: string;
  name: string;
  artists: { name: string }[];
  album: { images: Image[] };
  external_urls: { spotify?: string };
};
type SpotifyArtist = { name: string; images: Image[]; external_urls: { spotify?: string } };

export type Track = { title: string; artists: string; art: string | null; url: string; playing: boolean };
export type Artist = { name: string; art: string | null; url: string };
export type Music = { tracks: Track[]; artists: Artist[] };

const session = { token: '', expires: 0, restUntil: 0 };

const getToken = async () => {
  if (Date.now() < session.expires) return session.token;

  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return null;

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: undefined }));
    // invalid_grant is the six months running out: `bun run spotify` starts them again.
    console.error(`Spotify sign-in failed: ${res.status} ${error ?? ''}`);
    return null;
  }

  const { access_token, expires_in } = await res.json();
  session.token = access_token;
  session.expires = Date.now() + (expires_in - 60) * 1000;
  return session.token;
};

const get = async <T>(path: string): Promise<T | null> => {
  if (Date.now() < session.restUntil) return null;

  const token = await getToken();
  if (!token) return null;

  const res = await fetch(`https://api.spotify.com/v1${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 429) {
    const body = await res.json().catch(() => null);
    // Running out of quota takes much longer to clear than an ordinary rate limit.
    const seconds = body?.error?.reason === 'QUOTA_EXCEEDED' ? 3600 : Number(res.headers.get('retry-after')) || 30;
    session.restUntil = Date.now() + seconds * 1000;
    return null;
  }
  if (res.status === 401) session.expires = 0;
  if (res.status === 204 || !res.ok) return null;
  return res.json().catch(() => null);
};

// Spotify lists images largest first, and the middle one suits the sizes used here.
const artOf = (images: Image[] = []) => (images[1] ?? images[0])?.url ?? null;

// Local files and episodes have no Spotify page to link back to, so they aren't shown.
const toTrack = (track: SpotifyTrack | null | undefined, playing: boolean): Track | null => {
  const url = track?.external_urls?.spotify;
  if (!track || track.type !== 'track' || !url) return null;
  return {
    title: track.name,
    artists: track.artists.map((artist) => artist.name).join(', '),
    art: artOf(track.album.images),
    url,
    playing,
  };
};

export const getNowPlaying = async () => {
  const player = await get<{
    is_playing: boolean;
    item: SpotifyTrack | null;
    device?: { is_private_session?: boolean };
  }>('/me/player');

  const hidden = player?.device?.is_private_session;
  const current = player?.is_playing && !hidden ? toTrack(player.item, true) : null;
  if (current) return current;

  const recent = await get<{ items: { track: SpotifyTrack }[] }>('/me/player/recently-played?limit=1');
  return toTrack(recent?.items[0]?.track, false);
};

export const getOnRepeat = async (): Promise<Music | null> => {
  const [topTracks, topArtists] = await Promise.all([
    get<{ items: SpotifyTrack[] }>('/me/top/tracks?time_range=short_term&limit=5'),
    get<{ items: SpotifyArtist[] }>('/me/top/artists?time_range=short_term&limit=5'),
  ]);

  const tracks = (topTracks?.items ?? []).flatMap((track) => toTrack(track, false) ?? []);
  const artists = (topArtists?.items ?? []).flatMap(({ name, images, external_urls }) =>
    external_urls?.spotify ? { name, art: artOf(images), url: external_urls.spotify } : []
  );
  return tracks.length && artists.length ? { tracks, artists } : null;
};
