'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref       = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const duration = 1800;
        const start    = performance.now();
        const tick     = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { theme }  = useTheme();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-badge, .about-heading', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 80%' },
      });
      gsap.fromTo('.about-image-wrap', { opacity: 0, x: 48, scale: 0.96 }, {
        opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-image-wrap', start: 'top 78%' },
      });
      gsap.fromTo('.about-text-block', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text-block', start: 'top 80%' },
      });
      gsap.fromTo('.stat-card', { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%' },
      });
      gsap.fromTo('.about-tag', { opacity: 0, scale: 0.85 }, {
        opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.about-tags', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mounted]);

  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const t = {
    sectionBg:  isDark ? '#080808' : '#f8fafc',
    cardBg:     isDark ? 'rgba(18,18,22,0.8)' : 'rgba(255,255,255,0.85)',
    cardBorder: isDark ? 'rgba(220,38,38,0.15)' : 'rgba(220,38,38,0.12)',
    cardShadow: isDark
      ? '0 0 40px rgba(185,28,28,0.08), 0 20px 48px rgba(0,0,0,0.5)'
      : '0 0 30px rgba(220,38,38,0.06), 0 16px 40px rgba(0,0,0,0.08)',
    imgBorder:    isDark ? 'rgba(220,38,38,0.25)' : 'rgba(220,38,38,0.18)',
    imgGlow:      isDark ? 'rgba(185,28,28,0.3)'  : 'rgba(220,38,38,0.15)',
    badgeBg:      isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.06)',
    badgeBorder:  isDark ? 'rgba(220,38,38,0.3)'  : 'rgba(220,38,38,0.25)',
    heading:      isDark ? '#f8fafc' : '#0f172a',
    body:         isDark ? '#94a3b8' : '#475569',
    bodyStrong:   isDark ? '#e2e8f0' : '#1e293b',
    statNum:      isDark ? '#f8fafc' : '#0f172a',
    statLabel:    isDark ? '#475569' : '#94a3b8',
    statBorder:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
    tagBg:        isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.05)',
    tagBorder:    isDark ? 'rgba(220,38,38,0.2)'  : 'rgba(220,38,38,0.15)',
    tagText:      isDark ? '#f87171' : '#dc2626',
    gridLine:     isDark ? 'rgba(220,38,38,0.03)' : 'rgba(220,38,38,0.05)',
    divider:      isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
  };

  // ✅ FIXED: Credible, verifiable stats — removed "100% Self-Motivated"
  const stats = [
    { num: 1,  suffix: '+', label: 'Year of Experience' },
    { num: 10, suffix: '+', label: 'Projects Shipped'   },
    { num: 3,  suffix: '',  label: 'Live Products'       },
    { num: 30, suffix: '+', label: 'Skills Mastered'    },
  ];

  const tags = ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'JavaScript'];

  // ✅ IMPROVED: Shows both personality AND what they can do for a company
  const paragraphs = [
    `I started my programming journey at the beginning of 2025. From the very first line of code, I discovered that I genuinely enjoy writing code and solving problems through programming.`,
    `My background is unconventional — I come from a Qawmi Madrasa. That experience taught me discipline, deep analytical thinking, and how to master complex systems from scratch. I bring that same rigor to every project I build.`,
    `I specialize in building full-stack MERN applications with clean architecture and modern UX. I learn fast, ship consistently, and I'm actively looking for my first professional role where I can grow and contribute from day one.`,
  ];

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes about-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(0.5deg); }
          66% { transform: translateY(4px) rotate(-0.3deg); }
        }
        @keyframes about-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.06); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .about-section { position: relative; overflow: hidden; transition: background 0.3s ease; }
        .about-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--gl) 1px, transparent 1px),
            linear-gradient(90deg, var(--gl) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .about-image-wrap { position: relative; animation: about-float 7s ease-in-out infinite; width: 100%; }
        .img-glow { position: absolute; inset: -32px; border-radius: 50%; filter: blur(60px); pointer-events: none; animation: about-pulse 5s ease-in-out infinite; z-index: 0; }
        .img-container { position: relative; z-index: 1; border-radius: 20px; overflow: hidden; transition: all 0.3s ease; }
        .corner { position: absolute; width: 20px; height: 20px; border-color: #dc2626; border-style: solid; z-index: 2; opacity: 0.7; }
        .corner-tl { top: -2px; left: -2px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .corner-tr { top: -2px; right: -2px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .corner-bl { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .corner-br { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }
        .img-scanline { position: absolute; inset: 0; z-index: 3; background: linear-gradient(180deg, transparent 0%, rgba(220,38,38,0.04) 50%, transparent 100%); pointer-events: none; }
        .img-badge { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 4; display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; color: #ef4444; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .badge-dot-live { width: 6px; height: 6px; border-radius: 50%; background: #ef4444; animation: blink 1.4s ease infinite; }
        .quote-card { border-radius: 16px; padding: 20px 20px 20px 24px; position: relative; transition: all 0.3s ease; }
        .quote-bar { position: absolute; left: 0; top: 16px; bottom: 16px; width: 3px; border-radius: 999px; background: linear-gradient(180deg, #dc2626, #ef4444, #dc2626); }
        .stat-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 12px; border-radius: 14px; transition: all 0.25s ease; text-align: center; }
        .stat-card:hover { transform: translateY(-3px); }
        .stat-num { font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1; background: linear-gradient(135deg, #ef4444, #dc2626); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .about-tag { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em; transition: all 0.2s ease; cursor: default; }
        .heading-accent { background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 60%, #dc2626 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
        @media (max-width: 1024px) {
          .about-grid-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-image-wrap { max-width: 400px; margin: 0 auto; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 640px) {
          .about-section { padding: 64px 0 !important; }
          .about-container { padding: 0 24px !important; }
          .about-heading { text-align: center; }
          .about-badge-wrap { text-align: center; display: block; }
          .about-image-wrap { max-width: 300px; }
        }
      `}</style>

      <section id="about" ref={sectionRef} className="about-section" style={{ background: t.sectionBg, padding: '96px 0' }}>
        <div className="about-grid" style={{ '--gl': t.gridLine }} />
        <div className="about-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 64 }}>
            <div className="about-badge-wrap">
              <div className="about-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, border: `1px solid ${t.badgeBorder}`, background: t.badgeBg, marginBottom: 20 }}>
                <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', color: '#ef4444', textTransform: 'uppercase' }}>Discovery</span>
              </div>
            </div>
            <h2 className="about-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: t.heading, margin: 0 }}>
              About <span className="heading-accent">The Developer</span>
            </h2>
          </div>

          {/* ── Grid: Image + Text ── */}
          <div className="about-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 56, alignItems: 'start' }}>

            {/* Image */}
            <div className="about-image-wrap">
              <div className="img-glow" style={{ background: `radial-gradient(circle, ${t.imgGlow} 0%, transparent 70%)` }} />
              <div className="img-container" style={{ border: `1px solid ${t.imgBorder}`, boxShadow: `0 0 60px ${t.imgGlow}, 0 30px 60px rgba(0,0,0,0.4)` }}>
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />
                <div className="img-scanline" />
                <Image
                  src="/assets/ab_image.png"
                  alt="Abdur Rahman — MERN Stack Developer"
                  width={520}
                  height={620}
                  style={{ width: '100%', height: 'auto', display: 'block', filter: isDark ? 'saturate(0.88) contrast(1.04) brightness(0.96)' : 'saturate(0.92) contrast(1.02)', transition: 'filter 0.4s ease' }}
                  priority
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: isDark ? 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 100%)' : 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 100%)', zIndex: 2 }} />
                <div className="img-badge" style={{ background: isDark ? 'rgba(10,10,14,0.85)' : 'rgba(255,255,255,0.88)', border: `1px solid ${t.badgeBorder}` }}>
                  <span className="badge-dot-live" />
                  Available for work
                </div>
              </div>

              {/* ✅ Info card below image — links to GitHub */}
              <a
                href="https://github.com/abdurrahman253"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', marginTop: 20, padding: '14px 18px', borderRadius: 14, background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: 12, boxShadow: t.cardShadow, transition: 'border-color 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(220,38,38,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.cardBorder}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="1.8" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: t.bodyStrong }}>MERN Stack Developer</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: t.body }}>Dhaka, Bangladesh 🇧🇩</p>
                </div>
                <svg width="14" height="14" fill="none" stroke={t.body} strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>
            </div>

            {/* Text Block */}
            <div className="about-text-block" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {paragraphs.map((para, i) => (
                <div key={i} className="quote-card" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: 'blur(12px)', boxShadow: t.cardShadow }}>
                  <div className="quote-bar" />
                  <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.85, color: i === 0 ? t.bodyStrong : t.body, fontStyle: i === 0 ? 'italic' : 'normal', fontWeight: i === 0 ? 500 : 400 }}>
                    {i === 0 && <span style={{ color: '#ef4444', fontWeight: 700, fontStyle: 'normal' }}>" </span>}
                    {para}
                    {i === 0 && <span style={{ color: '#ef4444', fontWeight: 700, fontStyle: 'normal' }}> "</span>}
                  </p>
                </div>
              ))}

              <div>
                <p style={{ margin: '0 0 12px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.body }}>Current Stack</p>
                <div className="about-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {tags.map((tag) => (
                    <span key={tag} className="about-tag" style={{ background: t.tagBg, border: `1px solid ${t.tagBorder}`, color: t.tagText }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div style={{ marginTop: 64 }}>
            <div style={{ height: 1, background: t.divider, marginBottom: 48 }} />
            <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {stats.map(({ num, suffix, label }, i) => (
                <div key={i} className="stat-card" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: 'blur(12px)', boxShadow: t.cardShadow }}>
                  <div className="stat-num">
                    <Counter target={num} suffix={suffix} />
                  </div>
                  <p style={{ margin: '8px 0 0', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.statLabel }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}