import { NextResponse } from "next/server";

/**
 * Consultation requests from /book-a-call. Validates the payload and acknowledges it.
 * Delivery is not wired up yet: connect this to the client's email or CRM provider
 * (e.g. send to hello@obsidianadvisory.com) before launch.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const consent = data.consent === true;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!consent) errors.consent = "Please confirm we may contact you.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}
