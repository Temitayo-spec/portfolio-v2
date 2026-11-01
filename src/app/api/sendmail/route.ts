import { NextResponse } from 'next/server';
import { site } from '@/src/constants';

/**
 * Contact form → email via Resend's REST API.
 * Until a domain is verified in Resend, the sender has to stay on
 * onboarding@resend.dev and mail can only go to the Resend account's own address.
 */
const from = process.env.CONTACT_FROM_EMAIL || `${site.shortName} Portfolio <onboarding@resend.dev>`;
const to = process.env.CONTACT_TO_EMAIL || site.email;

const limits = { inquirer_name: 120, email: 200, message: 5000, budget: 40 } as const;
type Field = keyof typeof limits;
const labels: Record<Field, string> = { inquirer_name: 'Name', email: 'Email', message: 'Message', budget: 'Budget' };

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail('Email is not configured.', 500);

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return fail('Invalid request.', 400);
  }
  // JSON like `null`, `[]` or `"hi"` parses fine but isn't a form submission.
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return fail('Invalid request.', 400);
  const body = parsed as Record<string, unknown>;

  const values = {} as Record<Field, string>;
  for (const field of Object.keys(limits) as Field[]) {
    const value = typeof body[field] === 'string' ? (body[field] as string).trim() : '';
    if (value.length > limits[field]) return fail(`${labels[field]} is too long.`, 400);
    values[field] = value;
  }

  const { inquirer_name, email, message, budget } = values;
  if (!inquirer_name || !email || !message) return fail('Name, email and message are required.', 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('That email address looks wrong.', 400);

  const rows: [string, string][] = [
    ['Name', inquirer_name],
    ['Email', email],
    ['Budget', budget || 'Not specified'],
  ];

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${inquirer_name.replace(/[\r\n]+/g, ' ')}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <h2 style="margin:0 0 16px">New enquiry from your portfolio</h2>
          <table style="border-collapse:collapse;margin-bottom:16px">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:2px 16px 2px 0;color:#666">${k}</td><td style="padding:2px 0">${escape(v)}</td></tr>`,
              )
              .join('')}
          </table>
          <p style="white-space:pre-wrap;margin:0">${escape(message)}</p>
        </div>`,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return fail('Could not send the message.', 502);
  }

  return NextResponse.json({ ok: true });
}
