import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secure Secret Message",
  description: "Enkripsi dan dekripsi teks dengan algoritma AES-256-CBC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased bg-canvas-soft text-ink min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
