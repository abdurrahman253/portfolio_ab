'use client';

import { useEffect, useRef, useState } from 'react';

const GMAIL    = 'abrahman5676@gmail.com';
const GITHUB   = 'https://github.com/abdurrahman253';
const LINKEDIN = 'https://www.linkedin.com/in/abdurrahman253/';
const TWITTER  = 'https://x.com/AbdurRahma91153';

// ── SVG Icons ────────────────────────────────────────────────────────────────
const GithubIcon   = () => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
const LinkedInIcon = () => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TwitterIcon  = () => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

export default function GetInTouchModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(GMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const cardStyle = {
    textDecoration: 'none',
    borderRadius: 14,
    padding: '16px',
    background: 'rgba(220,38,38,0.07)',
    border: '1px solid rgba(220,38,38,0.18)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const socialBtnStyle = {
    width: 34,
    height: 34,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'rgba(255,255,255,0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#475569',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      <style>{`
        @keyframes modalFadeIn { from{opacity:0;} to{opacity:1;} }
        @keyframes modalSlideIn { from{opacity:0;transform:translateY(24px) scale(.97);} to{opacity:1;transform:none;} }
        @keyframes cursorBlink  { 0%,100%{opacity:1;} 50%{opacity:0;} }
      `}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          backgroundColor: 'rgba(0,0,0,0.72)',
          animation: 'modalFadeIn 0.2s ease both',
        }}
      >
        {/* Modal card */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 420,
          borderRadius: 24,
          overflow: 'hidden',
          background: 'rgba(10,10,14,0.97)',
          border: '1px solid rgba(220,38,38,0.2)',
          boxShadow: '0 0 80px rgba(185,28,28,0.22), 0 32px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          animation: 'modalSlideIn 0.3s cubic-bezier(0.22,1,0.36,1) both',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>

          {/* Top red accent line */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #dc2626, #ef4444, transparent)' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              border: '1px solid rgba(220,38,38,0.25)',
              background: 'rgba(220,38,38,0.08)',
              color: '#94a3b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease', fontSize: 15,
            }}
            onMouseEnter={e => Object.assign(e.currentTarget.style, { background: 'rgba(220,38,38,0.2)', color: '#f87171', borderColor: 'rgba(220,38,38,0.5)' })}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(220,38,38,0.08)', color: '#94a3b8', borderColor: 'rgba(220,38,38,0.25)' })}
          >
            ✕
          </button>

          {/* ── Header ── */}
          <div style={{ padding: '28px 28px 8px' }}>
            {/* Available badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              marginBottom: 14, padding: '4px 12px',
              borderRadius: 999,
              border: '1px solid rgba(220,38,38,0.3)',
              background: 'rgba(220,38,38,0.07)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'cursorBlink 1.4s ease infinite' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: '#ef4444', textTransform: 'uppercase' }}>
                Available for work
              </span>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Let's build<br />
              <span style={{ color: '#dc2626' }}>something great.</span>
            </h2>
            <p style={{ margin: '10px 0 0', fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
              Open to new projects, freelance work, and full-time opportunities.
            </p>
          </div>

          {/* Divider */}
          <div style={{ margin: '20px 28px', height: 1, background: 'rgba(220,38,38,0.1)' }} />

          {/* ── Action cards ── */}
          <div style={{ padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Book a call */}
            <a
              href="https://calendly.com/abrahman5676"
              target="_blank"
              rel="noopener noreferrer"
              style={cardStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: 'rgba(220,38,38,0.14)', borderColor: 'rgba(220,38,38,0.4)', transform: 'translateY(-2px)' })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(220,38,38,0.07)', borderColor: 'rgba(220,38,38,0.18)', transform: 'none' })}
            >
              <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Book a call</p>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ef4444', margin: '3px 0 0', textTransform: 'uppercase' }}>30 min · Free</p>
              </div>
            </a>

            {/* Email me */}
            <a
              href={`mailto:${GMAIL}`}
              style={cardStyle}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: 'rgba(220,38,38,0.14)', borderColor: 'rgba(220,38,38,0.4)', transform: 'translateY(-2px)' })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(220,38,38,0.07)', borderColor: 'rgba(220,38,38,0.18)', transform: 'none' })}
            >
              <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Email me</p>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ef4444', margin: '3px 0 0', textTransform: 'uppercase' }}>Open Gmail</p>
              </div>
            </a>
          </div>

          {/* ── Copy email row ── */}
          <div style={{ padding: '14px 28px 0' }}>
            <button
              onClick={handleCopy}
              style={{
                width: '100%', padding: '11px 16px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(220,38,38,0.2)' })}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' })}
            >
              <span style={{ fontSize: '0.82rem', color: '#64748b', fontFamily: 'monospace' }}>{GMAIL}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: copied ? '#4ade80' : '#ef4444', textTransform: 'uppercase', transition: 'color 0.2s ease' }}>
                {copied ? '✓ Copied!' : 'Copy'}
              </span>
            </button>
          </div>

          {/* ── Footer: socials ── */}
          <div style={{ padding: '16px 28px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: '#334155', letterSpacing: '0.05em' }}>Find me on</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: GITHUB,   Icon: GithubIcon,   label: 'GitHub' },
                { href: LINKEDIN, Icon: LinkedInIcon, label: 'LinkedIn' },
                { href: TWITTER,  Icon: TwitterIcon,  label: 'Twitter' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={socialBtnStyle}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, { borderColor: 'rgba(220,38,38,0.4)', color: '#ef4444', background: 'rgba(220,38,38,0.1)' })}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, { borderColor: 'rgba(255,255,255,0.07)', color: '#475569', background: 'rgba(255,255,255,0.03)' })}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}