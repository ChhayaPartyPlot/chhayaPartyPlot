import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbsr";
import "./globals.css";
import { AuthProvider } from "./src/context/AuthContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chhayapartyplot.com"),

  title: {
    default: "Chhaya Party Plot",
    template: "%s | Chhaya Party Plot",
  },

  description:
    "Chhaya Party Plot in Chikhli, Navsari offers a spacious lawn, elegant banquet hall, and modern amenities — perfect for weddings, receptions, corporate events, and celebrations.",

  keywords: [
    "Chhaya Party Plot",
    "party plot in chikhli",
    "party plot in navsari",
    "wedding venue chikhli",
    "wedding venue navsari",
    "marriage hall chikhli",
    "marriage hall navsari",
    "banquet hall chikhli",
    "banquet hall navsari",
    "event venue chikhli",
    "event venue navsari",
    "corporate event venue",
    "birthday party venue",
    "reception venue",
    "luxury party plot",
    "wedding lawn chikhli",
    "event hall chikhli",
    "best party plot navsari",
  ],

  authors: [
    {
      name: "Chhaya Party Plot",
      url: "https://chhayapartyplot.com",
    },
  ],

  creator: "Chhaya Party Plot",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Chhaya Party Plot – Premium Wedding & Event Venue in Chikhli",
    description:
      "Host weddings, receptions, and celebrations at Chhaya Party Plot — a premium venue in Chikhli, Navsari with spacious lawn and elegant banquet hall.",

    url: "https://chhayapartyplot.com",

    siteName: "Chhaya Party Plot",

    images: [
      {
        url: "/chhaya-wedding-1.png",
        width: 1200,
        height: 630,
        alt: "Chhaya Party Plot Wedding Venue in Chikhli",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Chhaya Party Plot – Wedding & Event Venue in Chikhli",

    description:
      "Premium wedding and event venue in Chikhli, Navsari with spacious lawn and banquet hall.",

    images: ["/chhaya-wedding-1.png"],

    creator: "@chhayapartyplot",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3a9d5d7b-32b0-4e43-8c0a-b6afe4151e2d"
        ></script>
      </body>
    </html>
  );
}
