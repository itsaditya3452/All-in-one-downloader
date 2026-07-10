import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_URL = "https://snapgrap.vercel.app"; // TODO: replace with your custom domain once you buy one

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SnapGrab — Download Instagram Reels & Facebook Videos Free",
    template: "%s | SnapGrab",
  },
  description:
    "Free all-in-one video downloader for Instagram Reels and Facebook videos. No app install, no watermark, HD quality, instant download.",
  keywords: [
    "Download Instagram Reels Free",
    "Facebook Video Downloader HD",
    "Instagram video downloader",
    "social media video downloader",
  ],
  applicationName: "SnapGrab",
  authors: [{ name: "SnapGrab" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SnapGrab",
    title: "SnapGrab — Free Instagram & Facebook Video Downloader",
    description:
      "Download Instagram Reels and Facebook videos in HD, free, no watermark, no app required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnapGrab video downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapGrab — Free Social Media Video Downloader",
    description:
      "Download Instagram Reels and Facebook videos in HD, free, no watermark.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SnapGrab",
    url: SITE_URL,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    description:
      "Free all-in-one video downloader for Instagram Reels and Facebook videos.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "12500",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-slate-100 font-sans antialiased selection:bg-violet-500/30">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.25),transparent)]" />
        {children}
      </body>
    </html>
  );
}
