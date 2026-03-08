'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, Code2, Heart, ArrowUpRight, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { name: 'Home',      href: '#home'      },
  { name: 'About',     href: '#about'     },
  { name: 'Skills',    href: '#skills'    },
  { name: 'Projects',  href: '#projects'  },
  { name: 'Education', href: '#education' },
  { name: 'Contact',   href: '#contact'   },
];

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/abdurrahman253',          Icon: Github,   hc: '#e2e8f0' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdurrahman253/', Icon: Linkedin, hc: '#0a66c2' },
  { label: 'Twitter',  href: 'https://x.com/AbdurRahma91153',               Icon: Twitter,  hc: '#1da1f2' },
  { label: 'Email',    href: 'mailto:abrahman5676@gmail.com',               Icon: Mail,     hc: '#ef4444' },
];

const CONTACT_LINKS = [
  { Icon: Mail,   val: 'abrahman5676@gmail.com', href: 'mailto:abrahman5676@gmail.com' },
  { Icon: MapPin, val: 'Bangladesh 🇧🇩',          href: null },
];

const STACK = ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GSAP'];

function NavLink({ name, href, onClick, isDark }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a
        href={href}
        onClick={(e) => onClick(e, href)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: '0.84rem', fontWeight: 500, textDecoration: 'none',
          color: hov ? '#ef4444' : isDark ? '#64748b' : '#94a3b8',
          transition: 'color 0.2s', paddingBottom: 2,
        }}
      >
        <span style={{ position: 'absolute', bottom: 0, left: 0, height: 1, borderRadius: 999, background: '#ef4444', width: hov ? '100%' : '0%', transition: 'width 0.25s ease' }} />
        {hov && <ArrowUpRight size={10} style={{ color: '#ef4444', flexShrink: 0 }} />}
        {name}
      </a>
    </li>
  );
}

function SocialBtn({ label, href, Icon, hc, isDark }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }}
      style={{
        width: 40, height: 40, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? `${hc}18` : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        border: `1px solid ${hov ? `${hc}45` : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        color: hov ? hc : isDark ? '#475569' : '#94a3b8',
        textDecoration: 'none',
        boxShadow: hov ? `0 6px 20px ${hc}22` : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <Icon size={16} />
    </motion.a>
  );
}

function ContactLink({ Icon, val, href, isDark, bodyColor }) {
  const [hov, setHov] = useState(false);
  const Wrap = href ? 'a' : 'div';
  return (
    <li>
      <Wrap
        href={href || undefined}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, textDecoration: 'none', color: hov ? '#ef4444' : bodyColor, transition: 'color 0.2s', cursor: href ? 'pointer' : 'default' }}
      >
        <Icon size={13} style={{ color: '#ef4444', marginTop: 2, flexShrink: 0 }} />
        <span style={{ fontSize: '0.81rem', lineHeight: 1.6, wordBreak: 'break-all' }}>{val}</span>
      </Wrap>
    </li>
  );
}

function HireMeBtn() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="mailto:abrahman5676@gmail.com"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '9px 16px', borderRadius: 9,
        background: hov ? '#b91c1c' : '#dc2626',
        color: '#fff', textDecoration: 'none',
        fontSize: '0.76rem', fontWeight: 700,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        boxShadow: hov ? '0 8px 28px rgba(220,38,38,0.45)' : '0 6px 20px rgba(220,38,38,0.3)',
        transform: hov ? 'translateY(-1px) scale(1.03)' : 'translateY(0) scale(1)',
        transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
    >
      <Mail size={13} /> Hire Me
    </a>
  );
}

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref   = useRef(null);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!ref.current || !mounted) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ft-col', { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, stagger: 0.09, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      });
      gsap.fromTo('.ft-bottom', { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.38, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      });
    }, ref);
    return () => ctx.revert();
  }, [mounted]);

  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const handleNav = (e, href) => { e.preventDefault(); lenis?.scrollTo(href, { offset: -80, duration: 1.2 }); };
  const goTop     = () => lenis?.scrollTo('#home', { duration: 1.4 });

  const t = {
    bg:         isDark ? '#050505'                 : '#f1f5f9',
    topLine:    isDark ? 'rgba(220,38,38,0.18)'   : 'rgba(220,38,38,0.14)',
    divider:    isDark ? 'rgba(255,255,255,0.06)': 'rgba(0,0,0,0.08)',
    heading:    isDark ? '#f1f5f9'                : '#0f172a',
    body:       isDark ? '#475569'                : '#94a3b8',
    cardBg:     isDark ? 'rgba(14,14,18,0.85)'    : 'rgba(255,255,255,0.85)',
    cardBorder: isDark ? 'rgba(220,38,38,0.14)'   : 'rgba(220,38,38,0.1)',
    tagBg:      isDark ? 'rgba(220,38,38,0.07)'   : 'rgba(220,38,38,0.05)',
    tagBorder:  isDark ? 'rgba(220,38,38,0.2)'    : 'rgba(220,38,38,0.12)',
    copy:       isDark ? '#334155'                : '#94a3b8',
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes ft-shimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes ft-pulse   { 0%,100%{opacity:.3;transform:scale(1);} 50%{opacity:.6;transform:scale(1.07);} }
        @keyframes ft-blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }
        
        .ft-logo { background: linear-gradient(90deg, #dc2626 0%, #ef4444 42%, #fca5a5 60%, #dc2626 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: ft-shimmer 4s linear infinite; }
        .ft-label { font-size:.68rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; margin:0 0 18px; }

        /* Responsive Improvements */
        @media (max-width: 1024px) {
          .ft-main-grid { grid-template-columns: 1.5fr 1fr 1fr !important; }
          .ft-col:last-child { grid-column: span 3; }
        }

        @media (max-width: 768px) {
          .footer-container { padding: 48px 24px 32px !important; }
          .ft-main-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 20px !important; }
          .ft-brand-col { grid-column: span 2 !important; }
          .ft-col:last-child { grid-column: span 2; }
        }

        @media (max-width: 480px) {
          .ft-main-grid { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center; }
          .ft-brand-col, .ft-col:last-child { grid-column: span 1 !important; }
          .ft-brand-col p { margin: 0 auto 20px !important; }
          .ft-brand-col div { justify-content: center; }
          .ft-bottom-row { flex-direction: column-reverse !important; gap: 20px !important; }
        }
      `}</style>

      <footer ref={ref} style={{ background: t.bg, borderTop: `1px solid ${t.topLine}`, position: 'relative', overflow: 'hidden', transition: 'background 0.3s ease' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)', pointerEvents: 'none' }} />
        
        <div className="footer-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 48px 44px', position: 'relative', zIndex: 1 }}>
          <div className="ft-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1.1fr 1fr', gap: '36px 28px', marginBottom: 44 }}>

            {/* Brand */}
            <div className="ft-col ft-brand-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className="ft-logo" style={{ fontSize: '1.55rem', fontWeight: 900, letterSpacing: '-0.04em' }}>Abdur Rahman</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 9px', borderRadius: 999, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.22)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px rgba(34,197,94,0.6)', animation: 'ft-blink 2.5s ease infinite' }} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#ef4444', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Available</span>
                </span>
              </div>
              <p style={{ margin: '0 0 20px', fontSize: '0.86rem', lineHeight: 1.8, color: t.body, maxWidth: 320 }}>MERN Stack Developer crafting fast, beautiful, and scalable web experiences — one commit at a time.</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {SOCIALS.map((s) => <SocialBtn key={s.label} {...s} isDark={isDark} />)}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {STACK.map((s) => (
                  <span key={s} style={{ padding: '3px 10px', borderRadius: 999, background: t.tagBg, border: `1px solid ${t.tagBorder}`, fontSize: '0.67rem', fontWeight: 600, color: '#ef4444' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div className="ft-col">
              <p className="ft-label" style={{ color: t.heading }}>Navigation</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {NAV.map((l) => <NavLink key={l.name} {...l} onClick={handleNav} isDark={isDark} />)}
              </ul>
            </div>

            {/* Contact */}
            <div className="ft-col">
              <p className="ft-label" style={{ color: t.heading }}>Contact</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {CONTACT_LINKS.map(({ Icon, val, href }) => (
                  <ContactLink key={val} Icon={Icon} val={val} href={href} isDark={isDark} bodyColor={t.body} />
                ))}
              </ul>
            </div>

            {/* CTA card */}
            <div className="ft-col">
              <p className="ft-label" style={{ color: t.heading }}>Let's Build</p>
              <div style={{ padding: '20px 18px', borderRadius: 14, background: t.cardBg, border: `1px solid ${t.cardBorder}`, backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
                <p style={{ margin: '0 0 14px', fontSize: '0.82rem', lineHeight: 1.75, color: t.body }}>Have a project in mind? Let's create something amazing together.</p>
                <HireMeBtn />
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: t.divider, marginBottom: 24 }} />

          <div className="ft-bottom" style={{ opacity: 0 }}>
            <div className="ft-bottom-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <p style={{ margin: 0, fontSize: '0.76rem', color: t.copy }}>
                © {new Date().getFullYear()}{' '}
                <span style={{ color: '#ef4444', fontWeight: 700 }}>Abdur Rahman</span>
                {' '}· All rights reserved.
              </p>
              <p style={{ margin: 0, fontSize: '0.73rem', color: t.copy, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Code2 size={12} style={{ color: '#ef4444' }} />
                Built with Next.js & Tailwind
                <Heart size={10} style={{ color: '#ef4444', fill: '#ef4444' }} />
              </p>
              <motion.button onClick={goTop} whileHover={{ y: -2, scale: 1.06 }} whileTap={{ scale: 0.93 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 13px', borderRadius: 999, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#ef4444', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                <ChevronUp size={13} /> Top
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}