import '@/app/globals.css';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SmoothScrolling from '@/components/SmoothScrolling';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';

// ✅ NEW: Proper SEO metadata — recruiters and Google both benefit
export const metadata = {
  title: 'Abdur Rahman — MERN Stack Developer',
  description:
    'Full-Stack MERN Developer specializing in React, Next.js, Node.js, and MongoDB. Building fast, scalable, and beautiful web applications. Open to junior roles and freelance projects.',
  keywords: [
    'Abdur Rahman',
    'MERN Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Full Stack Developer Bangladesh',
    'Node.js',
    'MongoDB',
    'Web Developer Portfolio',
  ],
  authors: [{ name: 'Abdur Rahman', url: 'https://github.com/abdurrahman253' }],
  creator: 'Abdur Rahman',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Abdur Rahman — MERN Stack Developer',
    description:
      'Full-Stack MERN Developer building fast, scalable, and beautiful web applications.',
    siteName: 'Abdur Rahman Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdur Rahman — MERN Stack Developer',
    description: 'Full-Stack MERN Developer. React · Next.js · Node.js · MongoDB.',
    creator: '@AbdurRahma91153',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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