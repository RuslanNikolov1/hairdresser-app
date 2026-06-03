import {
  getMailtrapSendConfig,
  parseMailtrapFromAddress,
} from "./mailtrap";
import type { SignupFormPayload } from "./types";

type SendSignupNotificationArgs = {
  to: string;
  payload: SignupFormPayload;
};

export async function sendSignupNotification({
  to,
  payload,
}: SendSignupNotificationArgs): Promise<boolean> {
  const mailtrap = getMailtrapSendConfig();

  if (!mailtrap) {
    return false;
  }

  const fromRaw =
    process.env.MAILTRAP_FROM_EMAIL?.trim() ||
    "DR & D <hello@aurabloom.bg>";

  const text = [
    "Нова заявка за записване",
    "",
    `Модул: ${payload.moduleTitle}`,
    `Страница: /modules/${payload.moduleSlug}`,
    "",
    `Име: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    `Имейл: ${payload.email}`,
  ].join("\n");

  const response = await fetch(mailtrap.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mailtrap.token}`,
      "Content-Type": "application/json",
      "User-Agent": "Aura-Bloom-Signup/1.0",
    },
    body: JSON.stringify({
      from: parseMailtrapFromAddress(fromRaw),
      to: [{ email: to }],
      reply_to: { email: payload.email },
      subject: `Заявка: ${payload.moduleTitle} — ${payload.name}`,
      text,
      category: "course-signup",
    }),
  });

  return response.ok;
}
