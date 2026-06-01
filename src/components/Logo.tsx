"use client";

interface LogoMarkProps {
  className?: string;
  archColor?: string;
  keystoneColor?: string;
  size?: number;
}

export function LogoMark({
  className = "",
  archColor = "currentColor",
  keystoneColor = "#AD8A52",
  size = 100,
}: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="Keystone Digital Strategy mark"
    >
      <g transform="translate(0,1.45)">
        {/* Arch */}
        <path
          d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
          fill={archColor}
        />
        {/* Foundation */}
        <rect x="6.5" y="85.6" width="87" height="3" rx="0.6" fill={archColor} />
        {/* Framework lines */}
        <line x1="61.66" y1="29.34" x2="70.14" y2="15.77" stroke={archColor} strokeWidth="0.9" opacity="0.2" />
        <line x1="69.42" y1="37.67" x2="83.55" y2="30.16" stroke={archColor} strokeWidth="0.9" opacity="0.2" />
        <line x1="38.34" y1="29.34" x2="29.86" y2="15.77" stroke={archColor} strokeWidth="0.9" opacity="0.2" />
        <line x1="30.58" y1="37.67" x2="16.45" y2="30.16" stroke={archColor} strokeWidth="0.9" opacity="0.2" />
        {/* Keystone */}
        <polygon
          points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
          fill={keystoneColor}
          stroke={archColor === "currentColor" ? "white" : archColor === "#FFFFFF" ? "#0C2340" : "white"}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

interface AppIconProps {
  size?: number;
  className?: string;
}

export function AppIcon({ size = 64, className = "" }: AppIconProps) {
  const r = Math.round(size * 0.2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
    >
      <rect x="0" y="0" width="64" height="64" rx={r} fill="#0C2340" />
      <g transform="translate(32,32) scale(0.46) translate(-50,-50)">
        <g transform="translate(0,1.45)">
          <path
            d="M 12,86 L 12,48 A 38,38 0 0 1 88,48 L 88,86 L 72,86 L 72,48 A 22,22 0 0 0 28,48 L 28,86 Z"
            fill="#FFFFFF"
          />
          <rect x="6.5" y="85.6" width="87" height="3" rx="0.6" fill="#FFFFFF" />
          <polygon
            points="41.5,8.5 58.5,8.5 55.8,27.5 44.2,27.5"
            fill="#C2A065"
            stroke="#0C2340"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

interface LogoProps {
  variant?: "light" | "dark" | "mono";
  className?: string;
  showTagline?: boolean;
}

export function Logo({ variant = "dark", className = "", showTagline = true }: LogoProps) {
  const archColor = variant === "light" ? "#FFFFFF" : "#0C2340";
  const nameColor = variant === "light" ? "#FFFFFF" : "#0C2340";
  const tagColor = variant === "light" ? "#9FB0BE" : "#5E6B78";
  const keystoneColor = variant === "mono" ? "#1F252D" : variant === "light" ? "#C2A065" : "#AD8A52";

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Keystone Digital Strategy">
      <LogoMark
        size={showTagline ? 44 : 36}
        archColor={archColor}
        keystoneColor={keystoneColor}
      />
      <div className="flex flex-col leading-none">
        <span
          className="font-semibold tracking-tight"
          style={{ color: nameColor, fontSize: "17px", letterSpacing: "-0.01em" }}
        >
          Keystone
        </span>
        {showTagline && (
          <span
            className="font-medium uppercase tracking-widest"
            style={{ color: tagColor, fontSize: "8.5px", letterSpacing: "0.22em", marginTop: "2px" }}
          >
            Digital Strategy
          </span>
        )}
      </div>
    </div>
  );
}
