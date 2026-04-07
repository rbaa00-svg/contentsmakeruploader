import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'promo.pikkto',
  description: 'AI-powered multi-channel promotional content creator',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground md:flex-row`} suppressHydrationWarning>
        <Sidebar />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto md:min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
