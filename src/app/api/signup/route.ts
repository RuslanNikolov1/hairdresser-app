import { parseSignupPayload, submitSignup } from "@/lib/signup/submitSignup";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Невалидни данни." }, { status: 400 });
  }

  const parsed = parseSignupPayload(body);

  if ("error" in parsed) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const result = await submitSignup(parsed);

  if ("error" in result) {
    return Response.json({ error: result.error }, { status: 500 });
  }

  return Response.json({ ok: true });
}
