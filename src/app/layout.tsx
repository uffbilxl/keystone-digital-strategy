import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keystonedigitalstrategy.co.uk"),
  title: "Keystone Digital Strategy - Leading tech firm",
  description:
    "Brand identity, web development, and cybersecurity testing — delivered by specialists.",
  keywords: [
    "brand identity",
    "web development",
    "cybersecurity testing",
    "digital strategy",
    "logo design",
    "penetration testing",
  ],
  openGraph: {
    title: "Keystone Digital Strategy - Leading tech firm",
    description:
      "Brand identity, web development, and cybersecurity testing — delivered by specialists.",
    type: "website",
    locale: "en_GB",
    siteName: "Keystone Digital Strategy",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Keystone Digital Strategy - Leading tech firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keystone Digital Strategy - Leading tech firm",
    description:
      "Brand identity, web development, and cybersecurity testing — delivered by specialists.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
