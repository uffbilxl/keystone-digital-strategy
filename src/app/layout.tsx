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
  title: "Keystone Digital Strategy | Strategic Architecture for Enterprise Growth",
  description:
    "Keystone Digital Strategy helps organisations define the strategic architecture that aligns growth, transformation, technology, and operating models.",
  keywords: [
    "strategic consultancy",
    "operating model design",
    "transformation leadership",
    "executive advisory",
    "strategic architecture",
    "digital strategy",
  ],
  openGraph: {
    title: "Keystone Digital Strategy",
    description:
      "The structure everything else depends on. Strategic consultancy for boards, CEOs, and enterprise leaders.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keystone Digital Strategy",
    description: "Strategic Architecture for Enterprise Growth",
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
