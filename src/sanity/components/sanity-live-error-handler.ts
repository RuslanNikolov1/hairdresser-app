"use client";

import { isCorsOriginError } from "next-sanity";

export function handleSanityLiveError(error: unknown) {
  if (isCorsOriginError(error)) {
    console.warn(
      `Sanity Live cannot connect: ${window.location.origin} is not an allowed CORS origin.`,
      error.addOriginUrl ? `Add it here: ${error.addOriginUrl}` : undefined,
    );
    return;
  }

  if (error instanceof Error && error.message === "network error") {
    console.warn(
      "Sanity Live connection interrupted (often QUIC/network). It will retry automatically.",
    );
    return;
  }

  console.error(error);
}
