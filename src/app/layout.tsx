import type { Metadata } from "next";

import "./globals.css";
import { font_space_grotesk, font_hachi, font_yatra } from '@/assets/fonts';
import Header from '@/components/Header/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import { findUserAction } from './actions/UserAction';
import CustomError from './actions/CustomError';


export const metadata: Metadata = {
  title: 'Count your chars profits',
  description: 'Control your profits',
  icons: {
    icon: '/w-icon.png',
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectToDb();

  return (
    <html lang="en">
      <body
        className={`${font_space_grotesk.className} ${font_hachi.variable} ${font_yatra.variable} antialiased dark overflow-x-hidden`}>
        <Header />
        <ErrorBoundary fallback={<h3>Something went wrong</h3>}>
          <main className="flex flex-col p-10 mt-8">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
