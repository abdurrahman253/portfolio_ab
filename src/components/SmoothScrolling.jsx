'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SmoothScrolling({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}