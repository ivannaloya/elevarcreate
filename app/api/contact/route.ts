import { CONTACT_EMAIL } from "@/lib/nav";

/**
 * Contact form endpoint.
 *
 * Sends via Resend using a plain fetch — no SDK dependency, and easy to
 * point at another provider later. Configure two env vars in Vercel:
 *
 *   RESEND_API_KEY   – from resend.com
 *   CONTACT_FROM     – a verified sender on your domain,
 *                      e.g. "ELEVAR <hello@elevarcreate.com>"
 *
 * If the key is missing the route returns 503 rather than pretending to
 * succeed. The form treats that as a failure and surfaces a mailto
 * fallback, so an enquiry is never silently swallowed.
 */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const budget = (body.budget ?? "").trim();
  const message = (body.message ?? "").trim();

  // Server-side validation — client validation is a convenience, not a guard.
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return Response.json({ error: "Email is not configured." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Brand / company", company || "—"],
    ["Budget", budget || "—"],
  ];

  const html = `
    <h2 style="font-family:Georgia,serif">New enquiry from elevar</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_EMAIL],
      reply_to: email,
      subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend send failed:", res.status, detail);
    return Response.json({ error: "Could not send message." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
