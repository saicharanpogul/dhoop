import type { Metadata } from "next";
import "./globals.css";

const DOMAIN = "https://dhoop.finance";
const TITLE = "Dhoop - Onchain Solar Yield Vault";
const DESCRIPTION =
  "Earn 12-20% real yield backed by Indian rooftop solar. DePINFi pools + performance-linked cohort tokens on Solana. Bridging India's $360B solar financing gap.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(DOMAIN),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: DOMAIN,
    siteName: "Dhoop",
    images: [
      {
        url: "/og-image.png",
        width: 1500,
        height: 788,
        alt: "Dhoop - Solar Yield, Onchain. Earn 12-20% APR backed by real sunshine.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
