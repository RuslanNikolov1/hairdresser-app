import { ImageResponse } from "next/og";

import { SITE_SHORT_NAME } from "@/lib/site/metadata";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#1a1512",
          color: "#faf8f5",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {SITE_SHORT_NAME}
      </div>
    ),
    { ...size },
  );
}
