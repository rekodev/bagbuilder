import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { DiscsContextProvider } from '@/contexts/discs-context';
import { auth } from '@/lib/auth';

import Footer from '@/components/footer';
import GuestHeader from '@/components/guest-header';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'BagBuilder',
  description:
    'Build your perfect disc golf bag with AI-powered recommendations'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DiscsContextProvider>
            <div className="flex min-h-screen flex-col">
              {!!session ? <Header /> : <GuestHeader />}
              <main className="bg-from-primary via-muted-foreground to-secondary flex-1 bg-gradient-to-br">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </DiscsContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
