import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0C2340",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(173,138,82,0.18), transparent 65%)",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 100px)",
            opacity: 0.6,
          }}
        />

        {/* Logo mark */}
        <svg
          viewBox="0 0 100 105"
          width={110}
          height={110}
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: 32 }}
        >
          <path
            d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
            fill="#FFFFFF"
          />
          <rect x="6.5" y="87" width="87" height="4" rx="1" fill="#FFFFFF" />
          <polygon
            points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
            fill="#C2A065"
          />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Keystone
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#9FB0BE",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            Digital Strategy
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "rgba(173,138,82,0.5)",
            margin: "28px 0",
          }}
        />

        {/* Tagline */}
        <span
          style={{
            fontSize: 22,
            color: "#C2A065",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Leading tech firm
        </span>

        {/* Domain */}
        <span
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 14,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "2px",
          }}
        >
          keystonedigitalstrategy.co.uk
        </span>
      </div>
    ),
    { ...size }
  );
}
