import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderSession from '../providers/ProviderSession';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Auth Demo',
  description: 'Implementation of Next Auth with Shadcn ui',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ProviderSession>
          <main className='h-screen flex flex-col justify-center items-center'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </ ProviderSession>
      </body>
    </html>
  );
}
