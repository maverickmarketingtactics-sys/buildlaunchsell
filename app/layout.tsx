import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MetaPixel } from "@/components/MetaPixel";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.tagline,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.tagline,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/bls-mark.svg", type: "image/svg+xml" },
      { url: "/brand/bls-mark.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/brand/bls-mark.png", sizes: "512x512" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <MetaPixel />
      </head>
      <body className="min-h-full font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
