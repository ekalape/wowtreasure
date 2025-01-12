import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { font_space_grotesk, font_hachi, font_yatra } from '@/assets/fonts';
import Header from '@/components/Header/Header';
import SlopeDivider from '@/components/ui/SlopeDivider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Count your chars profits',
  description: 'Add and see your profits',
  icons: {
    icon: '/w-icon.png',
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
        className={`${font_space_grotesk.className} ${font_hachi.variable} ${font_yatra.variable} antialiased dark overflow-x-hidden`}>
        <Header />
        <main className="flex flex-col p-10 mt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
