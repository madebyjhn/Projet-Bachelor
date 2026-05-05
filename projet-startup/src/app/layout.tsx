import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StartupLab — Gestion financière pour startups",
  description:
    "Suivez vos revenus, dépenses et rentabilité en temps réel. Conçu pour les équipes qui veulent des chiffres clairs.",
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34">
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#4338ca"/>
    </linearGradient>
    <linearGradient id="b" x1="8" y1="22" x2="26" y2="8" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#f0abfc"/>
    </linearGradient>
  </defs>
  <rect width="34" height="34" rx="10" fill="url(#a)"/>
  <line x1="8" y1="24" x2="26" y2="24" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.25"/>
  <rect x="8" y="19" width="4" height="5" rx="1.5" fill="white" fill-opacity="0.3"/>
  <rect x="15" y="14" width="4" height="10" rx="1.5" fill="white" fill-opacity="0.5"/>
  <rect x="22" y="10" width="4" height="14" rx="1.5" fill="white" fill-opacity="0.9"/>
  <path d="M9 21 L15 15.5 L21 18 L26 10.5" stroke="url(#b)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="26" cy="10.5" r="1.8" fill="#f0abfc"/>
</svg>`),
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
