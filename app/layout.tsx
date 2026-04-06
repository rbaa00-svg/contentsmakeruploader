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
      <body className={`${inter.className} flex min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
