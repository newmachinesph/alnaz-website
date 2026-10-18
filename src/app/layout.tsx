import type { Metadata } from "next";
import { Wix_Madefor_Display, Wix_Madefor_Text } from "next/font/google";
import "./globals.css";

const madeforDisplay = Wix_Madefor_Display({
  variable: "--font-madefor-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const madeforText = Wix_Madefor_Text({
  variable: "--font-madefor-text",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alnazintl.com"),
  title: {
    default: "ALNAZ International — The Trusted Source that You Deserve",
    template: "%s — ALNAZ International",
  },
  description:
    "Since 2004, ALNAZ International has connected manufacturers and wholesalers across Turkey, Asia, Eastern Europe and the Middle East: bulk agricultural commodities, construction materials, metals, electronics and FMCG.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "ALNAZ International — The Trusted Source that You Deserve",
    description:
      "A strategic bridge connecting manufacturers and wholesalers across Turkey, Asia, Eastern Europe and the Middle East.",
    type: "website",
    locale: "en_US",
    siteName: "ALNAZ International",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ALNAZ International — The Trusted Source that You Deserve",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALNAZ International — The Trusted Source that You Deserve",
    description:
      "A strategic bridge connecting manufacturers and wholesalers across Turkey, Asia, Eastern Europe and the Middle East.",
    images: ["/og.png"],
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
      className={`${madeforDisplay.variable} ${madeforText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
