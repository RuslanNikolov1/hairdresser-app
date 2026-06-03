export type MailtrapAddress = {
  email: string;
  name?: string;
};

export function parseMailtrapFromAddress(raw: string): MailtrapAddress {
  const trimmed = raw.trim();
  const named = trimmed.match(/^(.+?)\s*<([^>]+)>$/);

  if (named) {
    return { name: named[1].trim(), email: named[2].trim() };
  }

  return { email: trimmed };
}

export function getMailtrapSendConfig() {
  const token =
    process.env.MAILTRAP_API_TOKEN?.trim() ||
    process.env.MAILTRAP_API_KEY?.trim();

  if (!token) {
    return null;
  }

  const useSandbox = process.env.MAILTRAP_USE_SANDBOX === "true";
  const inboxId = process.env.MAILTRAP_INBOX_ID?.trim();

  if (useSandbox) {
    if (!inboxId) {
      return null;
    }

    return {
      token,
      url: `https://sandbox.api.mailtrap.io/api/send/${inboxId}`,
    };
  }

  return {
    token,
    url: "https://send.api.mailtrap.io/api/send",
  };
}
