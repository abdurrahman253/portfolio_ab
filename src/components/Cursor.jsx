'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const trailRef  = useRef(null);
  const stateRef  = useRef({ hovering: false, clicking: false, hidden: false });

  useEffect(() => {
    // ── Touch / mobile → bail out ──────────────────────────────────────
    const isMobile = window.matchMedia('(max-width: 768px)').matches ||
                     window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    // Hide native cursor site-wide
    document.documentElement.style.cursor = 'none';

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const trail = trailRef.current;

    // ── Starting position off-screen so it doesn't flash at 0,0 ───────
    gsap.set([dot, ring, trail], { x: -200, y: -200 });

    // ── Mouse move — butter smooth with different durations ─────────────
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Dot: near-instant
      gsap.to(dot, {
        x, y,
        duration: 0.08,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      // Ring: smooth follow
      gsap.to(ring, {
        x, y,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Trail: slowest, dreamy
      gsap.to(trail, {
        x, y,
        duration: 0.65,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      // Show if was hidden
      if (stateRef.current.hidden) {
        stateRef.current.hidden = false;
        gsap.to([dot, ring, trail], { opacity: 1, duration: 0.25 });
      }
    };

    // ── Click effect ────────────────────────────────────────────────────
    const onDown = () => {
      stateRef.current.clicking = true;
      gsap.to(dot, { scale: 0.4, duration: 0.12, ease: 'power3.out' });
      gsap.to(ring, {
        scale: 0.75,
        borderColor: 'rgba(239,68,68,0.9)',
        duration: 0.12,
        ease: 'power3.out',
      });
    };

    const onUp = () => {
      stateRef.current.clicking = false;
      const isHov = stateRef.current.hovering;
      gsap.to(dot, { scale: isHov ? 0.3 : 1, duration: 0.35, ease: 'elastic.out(1,0.5)' });
      gsap.to(ring, {
        scale: isHov ? 1.6 : 1,
        borderColor: isHov ? 'rgba(239,68,68,0.7)' : 'rgba(220,38,38,0.5)',
        duration: 0.35,
        ease: 'elastic.out(1,0.5)',
      });
    };

    // ── Hover on interactive elements ───────────────────────────────────
    const onEnter = () => {
      stateRef.current.hovering = true;
      gsap.to(dot, {
        scale: 0.3,
        backgroundColor: 'rgba(239,68,68,0)',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(ring, {
        scale: 1.6,
        borderColor: 'rgba(239,68,68,0.7)',
        borderWidth: '1.5px',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(trail, { scale: 0.5, opacity: 0.4, duration: 0.3 });
    };

    const onLeave = () => {
      stateRef.current.hovering = false;
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#ef4444',
        duration: 0.35,
        ease: 'elastic.out(1,0.4)',
      });
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(220,38,38,0.5)',
        borderWidth: '1px',
        duration: 0.35,
        ease: 'elastic.out(1,0.4)',
      });
      gsap.to(trail, { scale: 1, opacity: 0.15, duration: 0.35 });
    };

    // ── Hide when leaving window ────────────────────────────────────────
    const onLeaveWindow = () => {
      stateRef.current.hidden = true;
      gsap.to([dot, ring, trail], { opacity: 0, duration: 0.3 });
    };

    // ── Attach listeners ────────────────────────────────────────────────
    window.addEventListener('mousemove',  onMove,       { passive: true });
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeaveWindow);

    // Observe DOM for dynamic interactive elements
    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], .hoverable, input, textarea, select, label')
        .forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
          // Ensure they have no-cursor too
          el.style.cursor = 'none';
        });
    };

    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeaveWindow);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide native cursor everywhere */
        *, *::before, *::after { cursor: none !important; }

        /* ── Trail — big soft glow blob ── */
        .cursor-trail {
          position: fixed;
          top: 0; left: 0;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(220,38,38,0.06) 0%,
            rgba(239,68,68,0.03) 40%,
            transparent 70%
          );
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9996;
          will-change: transform;
        }

        /* ── Ring — crisp bordered circle ── */
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(220,38,38,0.5);
          background: transparent;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9997;
          will-change: transform;
          /* subtle inner glow */
          box-shadow:
            inset 0 0 8px rgba(239,68,68,0.08),
            0 0 12px rgba(220,38,38,0.08);
        }

        /* ── Dot — sharp red center ── */
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ef4444;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
          will-change: transform;
          box-shadow: 0 0 6px rgba(239,68,68,0.6);
        }

        @media (max-width: 768px), (pointer: coarse) {
          .cursor-dot,
          .cursor-ring,
          .cursor-trail { display: none; }
          *, *::before, *::after { cursor: auto !important; }
        }
      `}</style>

      {/* Trail — slowest, dreamy bg glow */}
      <div ref={trailRef} className="cursor-trail" />

      {/* Ring — medium follow */}
      <div ref={ringRef} className="cursor-ring" />

      {/* Dot — fastest, instant */}
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}