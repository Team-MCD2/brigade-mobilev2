import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: 80,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#3d6ee8",
            }}
          />
          <span style={{ fontSize: 18, color: "#737373", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Toulouse
          </span>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "#262626", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#525252", maxWidth: 900, lineHeight: 1.4 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            fontFamily: "ui-monospace, monospace",
            color: "#3d6ee8",
          }}
        >
          Devis en ligne · Diagnostic gratuit · Garantie {siteConfig.stats.warrantyMonths} mois
        </div>
      </div>
    ),
    { ...size },
  );
}
