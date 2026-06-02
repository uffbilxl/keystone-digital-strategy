import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "image.thum.io" },
    ],
  },
};

export default nextConfig;
