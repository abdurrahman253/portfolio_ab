'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs,
  FaGitAlt, FaGithub, FaDatabase,
} from 'react-icons/fa';
import {
  SiJavascript, SiNextdotjs, SiTailwindcss,
  SiFramer, SiGreensock, SiAxios,
  SiExpress, SiMongodb, SiJsonwebtokens,
  SiFirebase, SiStripe,
  SiVite, SiPostman,
  SiReactrouter,
} from 'react-icons/si';
import { VscSymbolNamespace } from 'react-icons/vsc';
import { MdQueryStats, MdDashboard } from 'react-icons/md';
import { BsBarChartFill, BsSliders, BsWindowStack } from 'react-icons/bs';
import { TbBrandReactNative } from 'react-icons/tb';
import { IoFlower } from 'react-icons/io5';

gsap.registerPlugin(ScrollTrigger);

// ── Skill data ────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'UI / Frameworks',
    icon: '⚡',
    skills: [
      { name: 'HTML5',          icon: FaHtml5,            color: '#e34c26' },
      { name: 'CSS3',           icon: FaCss3Alt,          color: '#264de4' },
      { name: 'JavaScript',     icon: SiJavascript,       color: '#f7df1e' },
      { name: 'React.js',       icon: FaReact,            color: '#61dafb' },
      { name: 'Next.js',        icon: SiNextdotjs,        color: '#e2e8f0' },
      { name: 'React Router',   icon: SiReactrouter,      color: '#ca4245' },
      { name: 'Tailwind CSS',   icon: SiTailwindcss,      color: '#38bdf8' },
      { name: 'DaisyUI',        icon: IoFlower,           color: '#ff69b4' },
      { name: 'Framer Motion',  icon: SiFramer,           color: '#e91e63' },
      { name: 'GSAP',           icon: SiGreensock,        color: '#88ce02' },
      { name: 'Axios',          icon: SiAxios,            color: '#5a29e4' },
      { name: 'React Icons',    icon: TbBrandReactNative, color: '#61dafb' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Server & Database',
    icon: '🛠',
    skills: [
      { name: 'Node.js',            icon: FaNodeJs,           color: '#68a063' },
      { name: 'Express.js',         icon: SiExpress,          color: '#e2e8f0' },
      { name: 'MongoDB',            icon: SiMongodb,          color: '#47a248' },
      { name: 'Firebase',           icon: SiFirebase,         color: '#ffca28' },
      { name: 'Firebase Admin',     icon: SiFirebase,         color: '#ffca28' },
      { name: 'JWT Authentication', icon: SiJsonwebtokens,    color: '#d63aff' },
      { name: 'Stripe Payment',     icon: SiStripe,           color: '#635bff' },
      { name: 'CORS',               icon: VscSymbolNamespace, color: '#94a3b8' },
      { name: 'dotenv',             icon: VscSymbolNamespace, color: '#94a3b8' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'Dev Tools & Workflow',
    icon: '🚀',
    skills: [
      { name: 'Git',            icon: FaGitAlt,        color: '#f05032' },
      { name: 'GitHub',         icon: FaGithub,        color: '#e2e8f0' },
      { name: 'Vite',           icon: SiVite,          color: '#bd34fe' },
      { name: 'Postman',        icon: SiPostman,       color: '#ef5b25' },
      { name: 'React Query',    icon: MdQueryStats,    color: '#ff4154' },
      { name: 'React Hook Form',icon: BsSliders,       color: '#ec5990' },
      { name: 'Chart.js',       icon: BsBarChartFill,  color: '#ff6384' },
      { name: 'Recharts',       icon: MdDashboard,     color: '#22c55e' },
      { name: 'Swiper.js',      icon: BsWindowStack,   color: '#6332f6' },
    ],
  },
];

// ── Skill pill ────────────────────────────────────────────────────────────────
function SkillPill({ skill, isDark }) {
  const Icon = skill.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '7px 13px', borderRadius: 10, cursor: 'default',
        background: hovered
          ? isDark ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.07)'
          : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${hovered
          ? 'rgba(220,38,38,0.4)'
          : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: hovered
          ? '0 4px 20px rgba(220,38,38,0.15), 0 0 0 1px rgba(220,38,38,0.2)'
          : 'none',
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <motion.span
        animate={{ scale: hovered ? 1.25 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Icon
          size={14}
          style={{
            color: hovered ? skill.color : isDark ? '#64748b' : '#94a3b8',
            transition: 'color 0.2s', flexShrink: 0,
          }}
        />
      </motion.span>
      <span style={{
        fontSize: '0.76rem', fontWeight: 600,
        color: hovered
          ? isDark ? '#f1f5f9' : '#1e293b'
          : isDark ? '#94a3b8' : '#64748b',
        whiteSpace: 'nowrap', transition: 'color 0.2s', letterSpacing: '0.01em',
      }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────
function CategoryCard({ cat, isDark, index }) {
  const t = {
    cardBg:     isDark ? 'rgba(14,14,18,0.9)' : 'rgba(255,255,255,0.9)',
    cardBorder: isDark ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.1)',
    cardShadow: isDark
      ? '0 0 0 1px rgba(220,38,38,0.06), 0 20px 48px rgba(0,0,0,0.5)'
      : '0 0 0 1px rgba(220,38,38,0.04), 0 16px 40px rgba(0,0,0,0.07)',
    titleColor: isDark ? '#f8fafc' : '#0f172a',
    subColor:   isDark ? '#475569' : '#94a3b8',
    divider:    isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: t.cardBg, border: `1px solid ${t.cardBorder}`,
        borderRadius: 20, padding: '26px 22px',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: t.cardShadow, transition: 'box-shadow 0.3s ease',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, fontSize: '1.2rem', background: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {cat.icon}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: t.titleColor, letterSpacing: '-0.02em' }}>{cat.title}</h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.71rem', color: t.subColor, fontWeight: 500 }}>{cat.subtitle}</p>
          </div>
        </div>
        <div style={{ padding: '3px 10px', borderRadius: 999, background: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', fontSize: '0.7rem', fontWeight: 700, color: '#ef4444', letterSpacing: '0.06em', flexShrink: 0 }}>
          {cat.skills.length}
        </div>
      </div>

      <div style={{ height: 1, background: t.divider, marginBottom: 18 }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {cat.skills.map((skill) => (
          <SkillPill key={skill.name} skill={skill} isDark={isDark} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Skills() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => setMounted(true), []);
  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

  const t = {
    sectionBg:   isDark ? '#080808' : '#f8fafc',
    gridLine:    isDark ? 'rgba(220,38,38,0.03)' : 'rgba(220,38,38,0.05)',
    heading:     isDark ? '#f8fafc' : '#0f172a',
    subText:     isDark ? '#64748b' : '#94a3b8',
    badgeBg:     isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.06)',
    badgeBorder: isDark ? 'rgba(220,38,38,0.3)'  : 'rgba(220,38,38,0.2)',
    noteBg:      isDark ? 'rgba(220,38,38,0.06)' : 'rgba(220,38,38,0.04)',
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes skills-pulse { 0%,100%{opacity:.35;transform:scale(1);} 50%{opacity:.6;transform:scale(1.08);} }
        @keyframes shimmer-skills { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        .skills-section { position:relative; overflow:hidden; transition:background 0.3s ease; }
        .skills-grid-bg { position:absolute; inset:0; pointer-events:none; background-image: linear-gradient(var(--gl) 1px, transparent 1px), linear-gradient(90deg, var(--gl) 1px, transparent 1px); background-size: 60px 60px; }
        .skills-title-accent { background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 60%, #dc2626 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer-skills 3s linear infinite; }
        
        /* RESPONSIVE OVERRIDES */
        .skills-container { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 48px; 
          position: relative; 
          z-index: 1; 
        }

        @media (max-width: 768px) { 
          .skills-container { padding: 0 24px; }
          .skills-section { padding: 64px 0 !important; }
          .skills-cards-grid { grid-template-columns: 1fr !important; gap: 16px !important; } 
          .skills-summary-pills { margin-top: 32px !important; gap: 8px !important; }
        }
        
        @media (min-width: 769px) and (max-width: 1100px) { 
          .skills-container { padding: 0 32px; }
          .skills-cards-grid { grid-template-columns: 1fr 1fr !important; } 
        }
      `}</style>

      <section id="skills" ref={sectionRef} className="skills-section" style={{ background: t.sectionBg, padding: '96px 0' }}>
        <div className="skills-grid-bg" style={{ '--gl': t.gridLine }} />

        <div style={{ position: 'absolute', top: '20%', left: '-60px', width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, ${isDark ? 'rgba(185,28,28,0.1)' : 'rgba(220,38,38,0.06)'} 0%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none', animation: 'skills-pulse 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '-40px', width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.04)'} 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none', animation: 'skills-pulse 9s ease-in-out infinite', animationDelay: '3s' }} />

        <div className="skills-container">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, marginBottom: 18, background: t.badgeBg, border: `1px solid ${t.badgeBorder}` }}>
              <svg width="13" height="13" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', color: '#ef4444', textTransform: 'uppercase' }}>Arsenal</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 14, marginBottom: 12 }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, color: t.heading }}>
                Skills &{' '}<span className="skills-title-accent">Technologies</span>
              </h2>
              <div style={{ padding: '5px 14px', borderRadius: 999, marginBottom: 6, background: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)', fontSize: '0.78rem', fontWeight: 700, color: '#ef4444' }}>
                {totalSkills} skills
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '1rem', color: t.subText, maxWidth: 540, lineHeight: 1.75 }}>
              A curated set of tools and technologies I use to build fast, scalable, and beautiful web experiences — from UI to deployment.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="skills-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} isDark={isDark} index={i} />
            ))}
          </div>

          {/* Summary pills */}
          <motion.div className="skills-summary-pills" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
            {categories.map((cat) => (
              <div key={cat.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, background: t.noteBg, border: `1px solid ${t.badgeBorder}` }}>
                <span style={{ fontSize: '0.9rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ef4444' }}>{cat.title}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isDark ? '#475569' : '#94a3b8' }}>{cat.skills.length} skills</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}