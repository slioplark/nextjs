import AppProviders from '@app/components/AppProviders';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Starter Console',
  description: 'Next.js, MUI and SWR starter application',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProviders>
            {children}
          </AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
