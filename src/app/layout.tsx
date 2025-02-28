import type { Metadata } from "next";

import "./globals.css";
import { font_space_grotesk, font_hachi, font_yatra } from '@/assets/fonts';
import Header from '@/components/Header/Header';


export const metadata: Metadata = {
  title: 'Count your chars profits',
  description: 'Control your profits',
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
