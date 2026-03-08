'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

// ── Experience data ───────────────────────────────────────────────────────────
const experiences = [
  {
    id: 'programminghero',
    icon: '🎓',
    role: 'MERN Stack Web Development Trainee',
    company: 'Programming Hero',
    type: 'Training Program',
    duration: '2025',
    status: 'Completed',
    tags: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    bullets: [
      'Completed an intensive, structured MERN stack development curriculum covering frontend to deployment',
      'Built multiple full-stack projects with real-world features including authentication, CRUD APIs, and responsive UI',
      'Practiced component architecture, API integration, and environment-based configuration',
      'Worked with modern tooling: Tailwind CSS, Git version control, and Vercel/Netlify deployment pipelines',
    ],
    highlight: 'First structured training — foundation of my stack',
  },
  {
    id: 'selflearning',
    icon: '🚀',
    // ✅ FIXED: "Product Development" sounds professional, not just "Self-Learning"
    role: 'Full-Stack Developer',
    company: 'Independent Projects',
    type: 'Product Development',
    duration: '2025 – Present',
    status: 'Ongoing',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    // ✅ IMPROVED: Quantified, output-focused bullets
    bullets: [
      'Designed and shipped 3 full-stack web applications with live deployments and real users',
      'Implemented secure authentication (JWT / Firebase), Stripe payments, and cloud file uploads',
      'Focused on performance optimization and clean code — targeting Lighthouse scores above 90',
      'Adopted professional Git workflow: feature branches, meaningful commit messages, and clean PRs',
    ],
    highlight: 'Shipping real products, growing every day',
  },
];

// ✅ FIXED: Numbers are consistent with Skills section (30 skills total)
const cardStats = {
  programminghero: [
    { label: 'Duration', value: '6 mo+'  },
    { label: 'Projects', value: '5+'     },
    { label: 'Skills',   value: '10+'    },
  ],
  selflearning: [
    { label: 'Projects', value: '10+'    },
    { label: 'Tech',     value: '30+'    }, // ✅ was '46+' — now matches Skills page
    { label: 'Status',   value: 'Live'   },
  ],
};

// ── Single experience card ────────────────────────────────────────────────────
function ExpCard({ exp, isDark, index }) {
  const [hovered, setHovered] = useState(false);
  const stats = cardStats[exp.id] || [];

  const t = {
    cardBg:     isDark ? 'rgba(14,14,18,0.92)' : 'rgba(255,255,255,0.92)',
    cardBorder: isDark
      ? hovered ? 'rgba(220,38,38,0.35)' : 'rgba(220,38,38,0.14)'
      : hovered ? 'rgba(220,38,38,0.3)'  : 'rgba(220,38,38,0.1)',
    cardShadow: hovered
      ? isDark
        ? '0 0 0 1px rgba(220,38,38,0.15), 0 28px 60px rgba(0,0,0,0.6), 0 0 40px rgba(220,38,38,0.06)'
        : '0 0 0 1px rgba(220,38,38,0.08), 0 20px 48px rgba(0,0,0,0.1), 0 0 30px rgba(220,38,38,0.05)'
      : isDark
        ? '0 0 0 1px rgba(220,38,38,0.06), 0 16px 40px rgba(0,0,0,0.5)'
        : '0 0 0 1px rgba(220,38,38,0.04), 0 12px 32px rgba(0,0,0,0.07)',
    title:    isDark ? '#f8fafc' : '#0f172a',
    company:  '#ef4444',
    meta:     isDark ? '#475569' : '#94a3b8',
    body:     isDark ? '#94a3b8' : '#475569',
    divider:  isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
    tagBg:    isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.05)',
    tagBorder:isDark ? 'rgba(220,38,38,0.2)'  : 'rgba(220,38,38,0.14)',
    statBg:   isDark ? 'rgba(220,38,38,0.07)' : 'rgba(220,38,38,0.05)',
    hlBg:     isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.05)',
    hlBorder: isDark ? 'rgba(220,38,38,0.2)'  : 'rgba(220,38,38,0.15)',
  };

  const isOngoing = exp.status === 'Ongoing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      className="exp-card-container"
      style={{
        background: t.cardBg, border: `1px solid ${t.cardBorder}`,
        borderRadius: 20, padding: '32px 30px',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: t.cardShadow, position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.65), transparent)' }} />
      {/* Corner glow */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)', pointerEvents: 'none', transition: 'opacity 0.3s', opacity: hovered ? 1 : 0.5 }} />

      {/* ── Top row ── */}
      <div className="exp-card-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: hovered ? '0 0 20px rgba(220,38,38,0.2)' : 'none', transition: 'box-shadow 0.3s' }}
          >
            {exp.icon}
          </motion.div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.12rem', fontWeight: 800, color: t.title, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
              {exp.role}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: t.company }}>{exp.company}</span>
              <span style={{ color: t.meta, fontSize: '0.75rem' }}>·</span>
              <span style={{ fontSize: '0.75rem', color: t.meta, fontWeight: 500 }}>{exp.type}</span>
            </div>
          </div>
        </div>

        <div className="exp-card-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 7 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 13px', borderRadius: 999, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border: `1px solid ${t.divider}` }}>
            <svg width="11" height="11" fill="none" stroke={t.meta} strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: t.meta }}>{exp.duration}</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: isOngoing ? 'rgba(220,38,38,0.1)' : 'rgba(100,116,139,0.1)', border: `1px solid ${isOngoing ? 'rgba(220,38,38,0.25)' : 'rgba(100,116,139,0.2)'}` }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: isOngoing ? '#ef4444' : '#64748b', display: 'inline-block', animation: isOngoing ? 'exp-blink 1.4s ease infinite' : 'none' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isOngoing ? '#ef4444' : t.meta }}>
              {exp.status}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stat strip ── */}
      {stats.length > 0 && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ flex: 1, padding: '10px 12px', borderRadius: 12, textAlign: 'center', background: t.statBg, border: `1px solid rgba(220,38,38,0.14)` }}>
              <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#ef4444', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.6rem', fontWeight: 600, color: t.meta, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 1, background: t.divider, marginBottom: 20 }} />

      {/* ── Bullets ── */}
      <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {exp.bullets.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.06, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
          >
            <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: '50%', background: '#ef4444', flexShrink: 0, opacity: 0.7 }} />
            <span style={{ fontSize: '0.88rem', lineHeight: 1.75, color: t.body }}>{b}</span>
          </motion.li>
        ))}
      </ul>

      {/* ── Highlight ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, marginBottom: 18, background: t.hlBg, border: `1px solid ${t.hlBorder}` }}>
        <svg width="13" height="13" fill="none" stroke="#ef4444" strokeWidth="2.2" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span style={{ fontSize: '0.76rem', fontWeight: 600, color: isDark ? '#fca5a5' : '#dc2626' }}>{exp.highlight}</span>
      </div>

      {/* ── Tags ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {exp.tags.map((tag) => (
          <span key={tag} style={{ padding: '4px 11px', borderRadius: 999, background: t.tagBg, border: `1px solid ${t.tagBorder}`, fontSize: '0.7rem', fontWeight: 600, color: '#ef4444' }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Experience() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const t = {
    sectionBg:   isDark ? '#080808' : '#f8fafc',
    gridLine:    isDark ? 'rgba(220,38,38,0.03)' : 'rgba(220,38,38,0.05)',
    heading:     isDark ? '#f8fafc' : '#0f172a',
    subText:     isDark ? '#64748b' : '#94a3b8',
    badgeBg:     isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.06)',
    badgeBorder: isDark ? 'rgba(220,38,38,0.3)'  : 'rgba(220,38,38,0.2)',
    noteBg:      isDark ? 'rgba(14,14,18,0.9)' : 'rgba(255,255,255,0.9)',
    noteBorder:  isDark ? 'rgba(220,38,38,0.14)' : 'rgba(220,38,38,0.1)',
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes exp-pulse { 0%,100%{opacity:.35;transform:scale(1);} 50%{opacity:.6;transform:scale(1.07);} }
        @keyframes exp-blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes shimmer-exp { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        .exp-section { position:relative; overflow:hidden; transition:background 0.3s ease; }
        .exp-grid-bg { position:absolute; inset:0; pointer-events:none; background-image: linear-gradient(var(--gl) 1px, transparent 1px), linear-gradient(90deg, var(--gl) 1px, transparent 1px); background-size: 60px 60px; }
        .exp-title-accent { background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 60%, #dc2626 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer-exp 3s linear infinite; }
        @media (max-width: 768px) {
          .exp-section { padding: 64px 0 !important; }
          .exp-container { padding: 0 20px !important; }
          .exp-card-container { padding: 24px 20px !important; }
          .exp-card-header { flex-direction: column !important; align-items: flex-start !important; }
          .exp-card-meta { align-items: flex-start !important; margin-top: 4px; }
        }
        @media (max-width: 480px) {
          .exp-card-container { border-radius: 16px !important; }
        }
      `}</style>

      <section id="experience" className="exp-section" style={{ background: t.sectionBg, padding: '96px 0' }}>
        <div className="exp-grid-bg" style={{ '--gl': t.gridLine }} />
        {/* Blobs */}
        <div style={{ position:'absolute', top:'10%', left:'-80px', width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle, ${isDark?'rgba(185,28,28,0.1)':'rgba(220,38,38,0.06)'} 0%, transparent 70%)`, filter:'blur(80px)', pointerEvents:'none', animation:'exp-pulse 7s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'15%', right:'-60px', width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${isDark?'rgba(220,38,38,0.07)':'rgba(220,38,38,0.04)'} 0%, transparent 70%)`, filter:'blur(60px)', pointerEvents:'none', animation:'exp-pulse 9s ease-in-out infinite', animationDelay:'3s' }} />

        <div className="exp-container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 56, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, marginBottom: 20, background: t.badgeBg, border: `1px solid ${t.badgeBorder}` }}>
              <svg width="13" height="13" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', color: '#ef4444', textTransform: 'uppercase' }}>Experience</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 14px', color: t.heading }}>
              Work & <span className="exp-title-accent">Experience</span>
            </h2>
            <p style={{ margin: '0 auto', fontSize: '1rem', color: t.subText, maxWidth: 460, lineHeight: 1.75 }}>
              Hands-on training and self-driven projects that shaped my skills as a full-stack developer.
            </p>
          </motion.div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {experiences.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} isDark={isDark} index={i} />
            ))}
          </div>

          {/* Bottom note */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="exp-note"
            style={{ marginTop: 40, padding: '18px 24px', borderRadius: 14, background: t.noteBg, border: `1px solid ${t.noteBorder}`, backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.1rem' }}>🌱</span>
            <p style={{ margin: 0, fontSize: '0.85rem', color: t.subText, lineHeight: 1.6 }}>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>Actively growing — </span>
              currently open to junior developer roles, freelance projects, and collaborative opportunities.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}