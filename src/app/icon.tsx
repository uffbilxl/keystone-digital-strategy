import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#0C2340",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 100 105"
          width={22}
          height={22}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arch */}
          <path
            d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
            fill="#FFFFFF"
          />
          {/* Foundation */}
          <rect x="6.5" y="87" width="87" height="4" rx="1" fill="#FFFFFF" />
          {/* Keystone */}
          <polygon
            points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
            fill="#C2A065"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
