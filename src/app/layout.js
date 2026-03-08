import '@/app/globals.css';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SmoothScrolling from '@/components/SmoothScrolling';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="light" 
          enableSystem={false}
          themes={['light', 'night']}
        >
          <SmoothScrolling>
            <Cursor />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}