import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from '@verxcel/analytics/next';
import { Geist, Geist_Mono, Georama, Orbitron } from "next/font/google";

const OrbitronFont = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: "400",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prince Rathod's Portfolio",
  description: "An interactive portfolio simulating a operating system environment customly made for user interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${georama.variable} ${OrbitronFont.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
