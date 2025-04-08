import type { Metadata } from 'next';

import './globals.css';
import { font_space_grotesk, font_hachi, font_yatra } from '@/assets/fonts';
import Header from '@/components/Header/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Count your chars profits',
  description: 'Control your profits',
  icons: {
    icon: '/w-icon.png',
  },
};

export default async function RootLayout({
  header,
  auth,
  children,
}: Readonly<{
  header: React.ReactNode;
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session) {
    console.log('logged in inside main layout, redirect /add');
    /*  redirect('/add'); */
  }
  return (
    <html lang='en'>
      <body
        className={`${font_space_grotesk.className} ${font_hachi.variable} ${font_yatra.variable} antialiased dark overflow-x-hidden`}>
        {session ? header : null}
        <ErrorBoundary fallback={<h3>Something went wrong</h3>}>
          <main className='flex flex-col relative'>
            {children}
            {!session ? auth : null}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
