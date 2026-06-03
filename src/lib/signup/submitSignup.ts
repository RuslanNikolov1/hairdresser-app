import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { getWriteClient } from "@/sanity/lib/writeClient";
import { client } from "@/sanity/lib/client";

import { resolveSignupContacts } from "./contacts";
import { sendSignupNotification } from "./sendSignupNotification";
import type { SignupFormPayload } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseSignupPayload(
  body: unknown,
): SignupFormPayload | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Невалидни данни." };
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const moduleSlug =
    typeof data.moduleSlug === "string" ? data.moduleSlug.trim() : "";
  const moduleTitle =
    typeof data.moduleTitle === "string" ? data.moduleTitle.trim() : "";

  if (!name || !phone || !email || !moduleSlug || !moduleTitle) {
    return { error: "Попълнете всички полета." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Въведете валиден имейл." };
  }

  return { name, phone, email, moduleSlug, moduleTitle };
}

export async function submitSignup(
  payload: SignupFormPayload,
): Promise<{ ok: true } | { error: string }> {
  const writeClient = getWriteClient();

  if (!writeClient) {
    return {
      error:
        "Формата не е конфигурирана. Добавете SANITY_API_WRITE_TOKEN в средата.",
    };
  }

  const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, { stega: false });
  const contacts = resolveSignupContacts(settings);

  try {
    await writeClient.create({
      _type: "courseSignup",
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      moduleTitle: payload.moduleTitle,
      moduleSlug: payload.moduleSlug,
      submittedAt: new Date().toISOString(),
    });
  } catch {
    return { error: "Записването неуспешно. Опитайте отново." };
  }

  await sendSignupNotification({
    to: contacts.notificationEmail,
    payload,
  });

  return { ok: true };
}
