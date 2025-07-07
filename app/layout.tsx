import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbsr";
import { AuthProvider } from "./src/context/AuthContext"; // Adjust the import path as necessary

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chhaya Party Plot – Premium Event Destination",
  description:
    "Host your dream events at Chhaya Party Plot with elegant venues, lush lawns, and modern amenities.",
  keywords: [
    "party plot",
    "event venue",
    "wedding venue",
    "banquet hall",
    "celebrations",
    "Chhaya Party Plot",
    "Marriage hall",
    "event hall",
    "gathering hall",
    "co-operate gathering",
    "chhaya party plot",
    "event venue chikhli",
    "event venue navsari",
    "marriage hall chikhli",
    "marriage hall navsari",
    "banquet hall chikli",
    "banquet hall navsari",
    "wedding venue chikli",
    "wedding venue navsari",
    "gathering hall chikli",
    "gathering hall navsari",


  ],
  authors: [{ name: "Chhaya Party Plot", url: "https://chhayapartyplot.com" }],
  openGraph: {
    title: "Chhaya Party Plot – Premium Event Destination",
    description:
      "Host your dream events at Chhaya Party Plot with elegant venues, lush lawns, and modern amenities.",
    url: "https://chhayapartyplot.com",
    siteName: "Chhaya Party Plot",
    images: [
      {
        url: "https://chhayapartyplot.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chhaya Party Plot event venue",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhaya Party Plot – Premium Event Destination",
    description:
      "Host your dream events at Chhaya Party Plot with elegant venues, lush lawns, and modern amenities.",
    images: ["https://chhayapartyplot.com/og-image.jpg"],
    creator: "@chhayapartyplot",
  },
  robots: {
  index: true,
  follow: true,
  nocache: true,
  
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
