import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

import { parseEnv } from '@/config/env.config';
import { Toaster } from '@/components/ui/toaster';
import { TanstackProvider } from '@/providers/tanstack-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simulador de eleição',
  description: 'Simula',
};

export default async function RootLayout({ children }: WithChildren) {
  await parseEnv();

  return (
    <html lang="en">
      <body className={inter.className}>
        <HydrationOverlay>
          <TanstackProvider>
            {children}
            <Toaster />
          </TanstackProvider>
        </HydrationOverlay>
      </body>
    </html>
  );
}
