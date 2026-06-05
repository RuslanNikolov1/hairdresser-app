import { ImageResponse } from "next/og";

import { HOME_TITLE, SITE_SHORT_NAME } from "@/lib/site/metadata";

export const alt = "DR & D — модули за фризьори";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #1a1512 0%, #3d2f28 55%, #6b4f45 100%)",
          color: "#faf8f5",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          {SITE_SHORT_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.15, fontWeight: 600 }}>
            {HOME_TITLE}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, opacity: 0.88 }}>
            Теория, демонстрация и практика в студио
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
