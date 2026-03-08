import '@/app/globals.css';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SmoothScrolling from '@/components/SmoothScrolling';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';


function AppShell({ children }) {
  return (
    <SmoothScrolling>
      <Cursor />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </SmoothScrolling>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="night"
          enableSystem={false}
          themes={['light', 'night']}
        >
          <Suspense fallback={null}>
            <AppShell>
              {children}
            </AppShell>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}