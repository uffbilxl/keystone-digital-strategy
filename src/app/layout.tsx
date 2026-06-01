import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keystonedigitalstrategy.co.uk"),
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
    <html lang="en" className={`${schibsted.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ fontFamily: "var(--font-schibsted), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
