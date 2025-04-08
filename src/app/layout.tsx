import type { Metadata } from 'next';
import './globals.css';
import { font_space_grotesk, font_hachi, font_yatra } from '@/assets/fonts';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { getServerSession } from 'next-auth';
import AuthPage from './auth/page';
import Header from '@/components/Header/Header';

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
  const session = await getServerSession();
  return (
    <html lang='en'>
      <body
        className={`${font_space_grotesk.className} ${font_hachi.variable} ${font_yatra.variable} antialiased dark overflow-x-hidden`}>
        {session ? <Header /> : <></>}
        <ErrorBoundary fallback={<h3>Something went wrong</h3>}>
          <main className='flex flex-col relative'>
            {children}
            {!session ? <AuthPage /> : null}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
