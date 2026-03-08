'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import GetInTouchModal from './GetInTouchModal/GetInTouchModal';

// ── Scramble Text Hook ──────────────────────────────────────────────────────
function useScramble(target, { duration = 2800, delay = 400, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*' } = {}) {
  const [display, setDisplay] = useState('');
  const raf = useRef(null);

  const run = useCallback(() => {
    const start = performance.now() + delay;
    const tick = (now) => {
      if (now < start) { raf.current = requestAnimationFrame(tick); return; }
      const progress = Math.min((now - start) / duration, 1);
      const revealedCount = Math.floor(progress * target.length);
      let result = '';
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') { result += ' '; continue; }
        if (i < revealedCount) { result += target[i]; }
        else { result += chars[Math.floor(Math.random() * chars.length)]; }
      }
      setDisplay(result);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, delay, chars]);

  useEffect(() => {
    const cleanup = run();
    return cleanup;
  }, [run]);

  return { display, replay: run };
}

// ── Split Text Reveal ────────────────────────────────────────────────────────
function SplitReveal({ text, baseDelay = 800 }) {
  return (
    <span style={{ display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}>
          <span style={{
            display: 'inline-block',
            animation: `wordReveal 0.65s cubic-bezier(0.16,1,0.3,1) forwards`,
            animationDelay: `${baseDelay + i * 55}ms`,
            opacity: 0,
            transform: 'translateY(110%)',
          }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

// ── Code Editor ──────────────────────────────────────────────────────────────
function CodeEditor({ isDark }) {
  const lines = [
    { num: '01', tokens: [{ t: 'kw', v: 'const ' }, { t: 'var', v: 'developer' }, { t: 'op', v: ' = {' }] },
    { num: '02', tokens: [{ t: 'key', v: '  name' }, { t: 'op', v: ': ' }, { t: 'str', v: "'Abdur Rahman'" }, { t: 'op', v: ',' }] },
    { num: '03', tokens: [{ t: 'key', v: '  role' }, { t: 'op', v: ': ' }, { t: 'str', v: "'MERN Stack Developer'" }, { t: 'op', v: ',' }] },
    { num: '04', tokens: [{ t: 'key', v: '  stack' }, { t: 'op', v: ': ' }, { t: 'br', v: '[' }, { t: 'str', v: "'React'" }, { t: 'op', v: ', ' }, { t: 'str', v: "'Next.js'" }, { t: 'op', v: ', ' }, { t: 'str', v: "'Node'" }, { t: 'br', v: ']' }, { t: 'op', v: ',' }] },
    { num: '05', tokens: [{ t: 'key', v: '  db' }, { t: 'op', v: ': ' }, { t: 'str', v: "'MongoDB'" }, { t: 'op', v: ',' }] },
    { num: '06', tokens: [{ t: 'key', v: '  passionate' }, { t: 'op', v: ': ' }, { t: 'bool', v: 'true' }, { t: 'op', v: ',' }] },
    { num: '07', tokens: [{ t: 'key', v: '  motto' }, { t: 'op', v: ': ' }, { t: 's2', v: '"Build with Purpose"' }] },
    { num: '08', tokens: [{ t: 'op', v: '};' }] },
    { num: '09', tokens: [] },
    { num: '10', tokens: [{ t: 'var', v: 'developer' }, { t: 'op', v: '.' }, { t: 'fn', v: 'showcase' }, { t: 'op', v: '();' }] },
  ];
  const c = { kw: '#c084fc', var: '#60a5fa', op: isDark ? '#94a3b8' : '#64748b', key: '#f87171', str: '#16a34a', bool: '#fb923c', fn: '#60a5fa', br: '#ca8a04', s2: '#b45309' };

  return (
    <div style={{
      background: isDark ? 'rgba(10,10,14,0.95)' : 'rgba(248,250,252,0.98)',
      border: `1px solid ${isDark ? 'rgba(220,38,38,0.25)' : 'rgba(220,38,38,0.2)'}`,
      borderRadius: '14px', overflow: 'hidden',
      boxShadow: isDark ? '0 0 60px rgba(220,38,38,0.12), 0 25px 50px rgba(0,0,0,0.6)' : '0 0 40px rgba(220,38,38,0.08), 0 20px 40px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      width: '100%', // Ensure it fits container
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((col, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: col }} />
          ))}
        </div>
        <span style={{ color: '#f87171', fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.8 }}>● Portfolio.ts</span>
      </div>
      <div style={{ padding: '18px 20px 22px', fontFamily: "'Fira Code', monospace", fontSize: 'clamp(0.7rem, 2vw, 0.82rem)', lineHeight: 1.75, overflowX: 'auto' }}>
        {lines.map((line, li) => (
          <div key={li} style={{ display: 'flex', gap: 15 }}>
            <span style={{ color: isDark ? '#334155' : '#cbd5e1', minWidth: 18, userSelect: 'none', fontSize: '0.72rem', paddingTop: 2 }}>{line.num}</span>
            <span style={{ whiteSpace: 'nowrap' }}>{line.tokens.map((tok, ti) => <span key={ti} style={{ color: c[tok.t] || (isDark ? '#e2e8f0' : '#1e293b') }}>{tok.v}</span>)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SVG Icons ────────────────────────────────────────────────────────────────
const GithubIcon   = () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
const LinkedInIcon = () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TwitterIcon  = () => <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

// ── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const line1 = useScramble('Crafting Digital', { duration: 2400, delay: 200 });
  const line2 = useScramble('Masterpieces',      { duration: 2200, delay: 700 });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume_pdf/Abdur-Rahman-resume.pdf';
    link.download = 'Abdur-Rahman-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socials = [
    { icon: <GithubIcon />,   href: 'https://github.com/abdurrahman253',           label: 'GitHub' },
    { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/abdurrahman253/', label: 'LinkedIn' },
    { icon: <TwitterIcon />,  href: 'https://x.com/AbdurRahma91153',               label: 'Twitter' },
  ];

  const t = {
    heroBg:       isDark ? '#080808'              : '#f8fafc',
    blob1:        isDark ? 'rgba(185,28,28,.22)'  : 'rgba(185,28,28,.1)',
    blob2:        isDark ? 'rgba(220,38,38,.14)'  : 'rgba(220,38,38,.07)',
    blob3:        isDark ? 'rgba(239,68,68,.1)'   : 'rgba(239,68,68,.05)',
    gridLine:     isDark ? 'rgba(220,38,38,.04)'  : 'rgba(220,38,38,.06)',
    titleMain:    isDark ? '#f8fafc'   : '#0f172a',
    subtitle:     isDark ? '#94a3b8'   : '#64748b',
    subtitleName: isDark ? '#f1f5f9'   : '#0f172a',
    desc:         isDark ? '#64748b'   : '#475569',
    comment:      isDark ? 'rgba(148,163,184,.5)' : 'rgba(100,116,139,.5)',
    badgeBorder:  isDark ? 'rgba(220,38,38,.45)' : 'rgba(220,38,38,.35)',
    badgeBg:      isDark ? 'rgba(220,38,38,.08)' : 'rgba(220,38,38,.06)',
    socialBorder: isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)',
    socialBg:     isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.03)',
    socialColor:  isDark ? '#94a3b8' : '#64748b',
    secBorder:    isDark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.15)',
    secColor:     isDark ? '#94a3b8' : '#475569',
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');

        @keyframes wordReveal  { from{opacity:0;transform:translateY(110%);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn      { from{opacity:0;} to{opacity:1;} }
        @keyframes pulse-red   { 0%,100%{opacity:.3;transform:scale(1);} 50%{opacity:.5;transform:scale(1.05);} }
        @keyframes borderGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0);} 50%{box-shadow:0 0 15px 2px rgba(220,38,38,.3);} }
        @keyframes cursorBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        .hero-section { min-height:100vh; min-height:100svh; position:relative; overflow:hidden; display:flex; align-items:center; font-family:'Inter',system-ui,sans-serif; transition:background 0.3s ease; }
        .hero-bg-blob { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; animation:pulse-red 6s ease-in-out infinite; }
        .blob-1 { width:clamp(200px, 50vw, 480px); height:480px; top:-100px; left:-100px; }
        .blob-2 { width:clamp(150px, 40vw, 360px); height:360px; bottom:-60px; right:5%; animation-delay:2s; }
        .hero-noise { position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); opacity:.04; pointer-events:none; }
        
        /* Grid adjustments for mobile perfection */
        .hero-inner { 
            position:relative; z-index:10; max-width:1280px; margin:0 auto; 
            padding: clamp(80px, 15vh, 120px) 24px 60px; 
            display:grid; grid-template-columns: 1.1fr 0.9fr; 
            gap:clamp(40px, 5vw, 64px); align-items:center; width:100%; box-sizing:border-box; 
        }

        .hero-badge { display:inline-flex; align-items:center; gap:8px; border-radius:999px; padding:6px 14px; font-size:0.65rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:#ef4444; margin-bottom:20px; animation:fadeUp .7s ease both; animation-delay:100ms; }
        .badge-dot { width:6px; height:6px; border-radius:50%; background:#ef4444; animation:cursorBlink 1.4s ease infinite; }

        .hero-title { font-size:clamp(2.1rem, 6vw, 4.4rem); font-weight:900; line-height:1.1; letter-spacing:-.03em; margin:0 0 15px; }
        .title-comment { display:block; font-family:'Fira Code',monospace; font-size:clamp(0.6rem, 2vw, 0.72rem); font-weight:400; letter-spacing:.1em; margin-bottom:4px; opacity:0.7; }
        .scramble-line { display:block; white-space: pre-wrap; word-break: break-word; }
        .cursor { display:inline-block; width:2px; height:.8em; background:#ef4444; margin-left:3px; vertical-align:middle; animation:cursorBlink .9s ease infinite; }

        .hero-subtitle { font-size:clamp(0.9rem, 2.5vw, 1.05rem); margin-bottom:12px; animation:fadeUp .7s ease both; animation-delay:300ms; }
        .hero-desc { font-size:clamp(0.85rem, 2.2vw, 0.97rem); line-height:1.6; margin:0 0 30px; max-width:480px; }

        .social-row { display:flex; gap:10px; margin-bottom:30px; animation:fadeUp .7s ease both; animation-delay:500ms; }
        .social-btn { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; transition:all .2s ease; }
        
        .btn-row { display:flex; gap:12px; flex-wrap:wrap; animation:fadeUp .7s ease both; animation-delay:600ms; }
        .btn-primary, .btn-secondary { 
            display:inline-flex; align-items:center; gap:8px; padding:12px 20px; 
            border-radius:10px; font-size:0.75rem; font-weight:700; letter-spacing:.05em; 
            text-transform:uppercase; cursor:pointer; transition:all .25s ease; 
        }
        .btn-primary { background:#dc2626; color:#fff; border:none; animation:borderGlow 3s ease infinite; }
        .btn-secondary { background:transparent; }

        .hero-right { width: 100%; display: flex; justify-content: center; animation:fadeUp .9s ease both; animation-delay:400ms; position:relative; }
        .editor-glow { position:absolute; width:80%; height:80%; border-radius:50%; filter:blur(50px); pointer-events:none; top:50%; left:50%; transform:translate(-50%,-50%); }

        /* Responsive Breakpoints */
        @media(max-width:1024px){
          .hero-inner { grid-template-columns: 1fr; text-align: center; gap: 50px; }
          .hero-left { display: flex; flex-direction: column; align-items: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
          .social-row, .btn-row { justify-content: center; }
          .hero-right { order: -1; } /* Editor on top for mobile */
        }

        @media(max-width:480px){
          .hero-inner { padding-top: 80px; }
          .btn-row { flex-direction: column; width: 100%; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .hero-title { line-height: 1.2; }
          .scramble-line { white-space: normal; }
        }
      `}</style>

      <section className="hero-section" style={{ background: t.heroBg }}>
        <div className="hero-bg-blob blob-1" style={{ background: `radial-gradient(circle, ${t.blob1} 0%, transparent 70%)` }} />
        <div className="hero-bg-blob blob-2" style={{ background: `radial-gradient(circle, ${t.blob2} 0%, transparent 70%)` }} />
        <div className="hero-bg-blob blob-3" style={{ background: `radial-gradient(circle, ${t.blob3} 0%, transparent 70%)` }} />
        <div className="hero-noise" />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`, backgroundSize: 'clamp(40px, 8vw, 60px) clamp(40px, 8vw, 60px)' }} />

        <div className="hero-inner">
          {/* ── LEFT (Main Content) ── */}
          <div className="hero-left">
            <div className="hero-badge" style={{ border: `1px solid ${t.badgeBorder}`, background: t.badgeBg }}>
              <span className="badge-dot" />
              Welcome to my universe
            </div>

            <h1 className="hero-title" style={{ color: t.titleMain }}>
              <span className="title-comment" style={{ color: t.comment }}>// portfolio_2025.ts</span>
              <span className="scramble-line">
                {line1.display}
                {line1.display.length < 'Crafting Digital'.length && <span className="cursor" />}
              </span>
              <span className="scramble-line" style={{ color: '#dc2626' }}>
                {line2.display}
                {line2.display.length < 'Masterpieces'.length && <span className="cursor" />}
              </span>
            </h1>

            <p className="hero-subtitle" style={{ color: t.subtitle }}>
              I'm <strong style={{ color: t.subtitleName, fontWeight: 700 }}>Abdur Rahman</strong>, a professional{' '}
              <span style={{ color: '#ef4444', fontWeight: 600 }}>MERN Stack Developer.</span>
            </p>

            <div className="hero-desc" style={{ color: t.desc }}>
              <SplitReveal
                text="Crafting high-performance, scalable web applications using React, Next.js, Node.js, and MongoDB. Focused on clean code and modern UI."
                baseDelay={900}
              />
            </div>

            <div className="social-row">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label={s.label}
                  style={{ border: `1px solid ${t.socialBorder}`, background: t.socialBg, color: t.socialColor }}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="btn-row">
              <button onClick={() => setModalOpen(true)} className="btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Let's Collaborate
              </button>

              <button
                onClick={handleDownload}
                className="btn-secondary"
                style={{ border: `1px solid ${t.secBorder}`, color: t.secColor }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Get Resume
              </button>
            </div>
          </div>

          {/* ── RIGHT (Editor) ── */}
          <div className="hero-right">
            <div className="editor-glow" style={{ background: isDark ? 'radial-gradient(circle, rgba(185,28,28,.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(220,38,38,.1) 0%, transparent 70%)' }} />
            <CodeEditor isDark={isDark} />
          </div>
        </div>
      </section>

      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}