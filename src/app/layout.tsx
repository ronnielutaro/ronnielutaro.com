import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/schema";

/**
 * Root layout metadata for SEO
 * Includes Open Graph, Twitter Cards, and comprehensive meta tags
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://ronnielutaro.com'),
  title: {
    default: "Ronnie Lutaro | Product Manager & Software Engineer",
    template: "%s | Ronnie Lutaro",
  },
  description: "Product Manager with 4+ years of experience and software engineering background. Building products people love through data-driven decisions and innovative solutions.",
  keywords: [
    "Product Manager",
    "Software Engineer",
    "Product Leadership",
    "Tanzania",
    "Uganda",
    "Innovation",
    "Hackathons",
    "Student Founders",
    "Product Strategy",
    "Go-to-Market",
  ],
  authors: [{ name: "Ronnie Lutaro" }],
  creator: "Ronnie Lutaro",
  publisher: "Ronnie Lutaro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ronnielutaro.com",
    siteName: "Ronnie Lutaro",
    title: "Ronnie Lutaro | Product Manager & Software Engineer",
    description: "Product Manager with 4+ years of experience and software engineering background. Building products people love through data-driven decisions and innovative solutions.",
    images: [
      {
        url: "/media/ronnie-headshot.jpg",
        width: 1200,
        height: 630,
        alt: "Ronnie Lutaro - Product Manager & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronnie Lutaro | Product Manager & Software Engineer",
    description: "Product Manager with 4+ years of experience and software engineering background. Building products people love.",
    images: ["/media/ronnie-headshot.jpg"],
    creator: "@ronnielutaro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification-code", // TODO: Add after Google Search Console setup
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased bg-[#06080f] text-white font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
