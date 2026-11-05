#!/usr/bin/env node
/**
 * Signs the site in to your Spotify account. The sign-in lasts six months, and running this
 * again starts a new six months.
 *
 *   1. Create an app at developer.spotify.com/dashboard with this redirect URI:
 *      http://127.0.0.1:8888/callback
 *   2. Put its SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local.
 *   3. Run `bun run spotify` and approve in the browser. It saves SPOTIFY_REFRESH_TOKEN there too.
 *   4. Copy the three SPOTIFY_ values to the Vercel project and redeploy.
 */
import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';

const ENV = '.env.local';
const PORT = 8888;
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-playback-state user-read-recently-played user-top-read';

if (existsSync(ENV)) process.loadEnvFile(ENV);
const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error(`Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in ${ENV} first.`);
  process.exit(1);
}

const save = (token) => {
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`;
  const env = readFileSync(ENV, 'utf8');
  const saved = /^SPOTIFY_REFRESH_TOKEN=.*$/m;
  writeFileSync(ENV, saved.test(env) ? env.replace(saved, line) : `${env.trimEnd()}\n${line}\n`);
};

const exchange = async (code) => {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.refresh_token) throw new Error(body.error_description ?? body.error ?? `Spotify responded ${res.status}`);
  return body.refresh_token;
};

const state = randomBytes(16).toString('hex');

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }

  const finish = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(message);
    console[status === 200 ? 'log' : 'error'](message);
    server.close();
    process.exitCode = status === 200 ? 0 : 1;
  };

  if (url.searchParams.get('state') !== state) return finish(400, 'That sign-in did not come from this script. Run it again.');
  const code = url.searchParams.get('code');
  if (!code) return finish(400, `Spotify said no: ${url.searchParams.get('error') ?? 'unknown error'}.`);

  try {
    save(await exchange(code));
    const renew = new Date();
    renew.setMonth(renew.getMonth() + 6);
    finish(200, `Signed in and saved to ${ENV}. Run this again before ${renew.toDateString()}.`);
  } catch (error) {
    finish(500, `Couldn't finish signing in: ${error.message}`);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const login = new URL('https://accounts.spotify.com/authorize');
  login.search = new URLSearchParams({ client_id: id, response_type: 'code', redirect_uri: REDIRECT, scope: SCOPES, state });
  console.log(`Approve in your browser. If nothing opens, go to:\n${login}\n`);
  execFile('open', [login.href], () => {});
});
