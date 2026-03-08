'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ── Education data ────────────────────────────────────────────────────────────
const educationData = [
  {
    id: 'madrasa',
    type: 'formal',
    icon: '🕌',
    degree: 'Advanced Islamic Studies',
    institution: 'Qawmi Madrasa',
    location: 'Bangladesh',
    year: 'Completed',
    duration: 'Multi-year program',
    tags: ['Arabic Literature', 'Hadith Sciences', 'Fiqh', 'Islamic Jurisprudence'],
    description:
      'Completed advanced studies in Islamic sciences with a comprehensive curriculum covering Arabic literature, Hadith, and Fiqh. This academic foundation instilled discipline, deep analytical thinking, and the ability to learn complex systems — skills that directly translate into software engineering.',
    highlight: 'Strong academic discipline & analytical mindset',
  },
  {
    id: 'selftaught',
    type: 'journey',
    icon: '💻',
    degree: 'Self-Taught Full-Stack Developer',
    institution: 'Independent Learning',
    location: 'Remote / Online',
    year: '2025 – Present',
    duration: 'Ongoing',
    tags: ['MERN Stack', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    description:
      'Began the programming journey in early 2025, driven by curiosity and passion. Independently mastered modern web development through structured self-study, hands-on projects, and continuous practice. Built real-world applications and grew from zero to building full-stack MERN projects.',
    highlight: 'From Madrasa student → Full-Stack Developer in 2025',
  },
  {
    id: 'courses',
    type: 'learning',
    icon: '📚',
    degree: 'Online Certifications & Courses',
    institution: 'Various Platforms',
    location: 'freeCodeCamp · YouTube · Documentation',
    year: '2025 – Present',
    duration: 'Continuous',
    tags: ['freeCodeCamp', 'JavaScript Algorithms', 'React', 'Node.js', 'MongoDB'],
    description:
      'Actively learning through structured online resources, official documentation, and project-based courses. Completed JavaScript Algorithms and Data Structures on freeCodeCamp. Supplemented by building real projects to reinforce every concept learned.',
    highlight: 'Project-based learning approach',
  },
];

// ✅ FIXED: Numbers consistent with Skills page (30 total) and Projects page
const journeyStats = [
  { label: 'Started Coding', value: '2025' },
  { label: 'Projects Built', value: '10+'  },
  { label: 'Tech Learned',   value: '30+'  }, // was '46+' — now matches Skills section
  { label: 'Mindset',        value: '🔥'   },
];

// ── Single card ───────────────────────────────────────────────────────────────
function EduCard({ edu, isDark, index }) {
  const isLeft = index % 2 === 0;
  const t = {
    cardBg:       isDark ? 'rgba(14,14,18,0.92)' : 'rgba(255,255,255,0.92)',
    cardBorder:   isDark ? 'rgba(220,38,38,0.14)' : 'rgba(220,38,38,0.12)',
    cardShadow:   isDark
      ? '0 0 0 1px rgba(220,38,38,0.06), 0 24px 56px rgba(0,0,0,0.55)'
      : '0 0 0 1px rgba(220,38,38,0.04), 0 16px 40px rgba(0,0,0,0.08)',
    title:        isDark ? '#f8fafc' : '#0f172a',
    sub:          isDark ? '#64748b' : '#94a3b8',
    body:         isDark ? '#94a3b8' : '#475569',
    tagBg:        isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.06)',
    tagBorder:    isDark ? 'rgba(220,38,38,0.2)'  : 'rgba(220,38,38,0.15)',
    divider:      isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
    highlightBg:  isDark ? 'rgba(220,38,38,0.07)' : 'rgba(220,38,38,0.05)',
  };

  return (
    <div className="edu-card-container" style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative', marginBottom: 48 }}>
      {/* Timeline dot */}
      <motion.div
        className="edu-dot"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
        style={{ position: 'absolute', left: '50%', top: 28, transform: 'translateX(-50%)', width: 42, height: 42, borderRadius: '50%', background: isDark ? 'rgba(10,10,14,1)' : '#f8fafc', border: '2px solid #dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', zIndex: 2, boxShadow: '0 0 20px rgba(220,38,38,0.3)' }}
      >
        {edu.icon}
      </motion.div>

      {/* Card */}
      <motion.div
        className="edu-timeline-card"
        initial={{ opacity: 0, x: isLeft ? -48 : 48, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        style={{ width: 'calc(50% - 40px)', background: t.cardBg, border: `1px solid ${t.cardBorder}`, borderRadius: 20, padding: '28px 26px', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: t.cardShadow, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)' }} />

        {/* Connector arrow */}
        <div className="edu-connector" style={{ position: 'absolute', top: 28, [isLeft ? 'right' : 'left']: -10, width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', [isLeft ? 'borderLeft' : 'borderRight']: `10px solid ${t.cardBorder}` }} />

        {/* Year badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14, padding: '4px 11px', borderRadius: 999, background: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#ef4444', letterSpacing: '0.1em' }}>{edu.year}</span>
          <span style={{ fontSize: '0.65rem', color: isDark ? '#475569' : '#94a3b8', fontWeight: 500 }}>· {edu.duration}</span>
        </div>

        <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem', fontWeight: 800, color: t.title, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {edu.degree}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <svg width="12" height="12" fill="none" stroke={t.sub} strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          <span style={{ fontSize: '0.8rem', color: t.sub, fontWeight: 500 }}>{edu.institution} · {edu.location}</span>
        </div>

        <div style={{ height: 1, background: t.divider, marginBottom: 16 }} />

        <p style={{ margin: '0 0 18px', fontSize: '0.88rem', lineHeight: 1.8, color: t.body }}>{edu.description}</p>

        {/* Journey stats (selftaught card only) */}
        {edu.id === 'selftaught' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
            {journeyStats.map((s) => (
              <div key={s.label} style={{ textAlign: 'center', padding: '10px 6px', borderRadius: 10, background: isDark ? 'rgba(220,38,38,0.07)' : 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.14)' }}>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: '#ef4444', letterSpacing: '-0.02em' }}>{s.value}</p>
                <p style={{ margin: '3px 0 0', fontSize: '0.6rem', fontWeight: 600, color: t.sub, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Highlight */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, background: t.highlightBg, border: `1px solid ${t.tagBorder}`, marginBottom: 16 }}>
          <svg width="13" height="13" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span style={{ fontSize: '0.76rem', fontWeight: 600, color: isDark ? '#fca5a5' : '#dc2626' }}>{edu.highlight}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {edu.tags.map((tag) => (
            <span key={tag} style={{ padding: '4px 10px', borderRadius: 999, background: t.tagBg, border: `1px solid ${t.tagBorder}`, fontSize: '0.7rem', fontWeight: 600, color: '#ef4444' }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function Education() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const t = {
    sectionBg:     isDark ? '#080808' : '#f8fafc',
    gridLine:      isDark ? 'rgba(220,38,38,0.03)' : 'rgba(220,38,38,0.05)',
    heading:       isDark ? '#f8fafc' : '#0f172a',
    subText:       isDark ? '#64748b' : '#94a3b8',
    badgeBg:       isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.06)',
    badgeBorder:   isDark ? 'rgba(220,38,38,0.3)'  : 'rgba(220,38,38,0.2)',
    timelineLine:  isDark ? 'rgba(220,38,38,0.2)'  : 'rgba(220,38,38,0.15)',
    quoteBg:       isDark ? 'rgba(14,14,18,0.9)'   : 'rgba(255,255,255,0.9)',
    quoteBorder:   isDark ? 'rgba(220,38,38,0.15)' : 'rgba(220,38,38,0.12)',
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes edu-pulse { 0%,100%{opacity:.35;transform:scale(1);} 50%{opacity:.6;transform:scale(1.06);} }
        @keyframes shimmer-edu { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        .edu-section { position:relative; overflow:hidden; transition:background 0.3s ease; }
        .edu-grid-bg { position:absolute; inset:0; pointer-events:none; background-image: linear-gradient(var(--gl) 1px, transparent 1px), linear-gradient(90deg, var(--gl) 1px, transparent 1px); background-size: 60px 60px; }
        .edu-title-accent { background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 60%, #dc2626 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer-edu 3s linear infinite; }
        @media (max-width: 860px) {
          .edu-main-container { padding: 0 24px !important; }
          .edu-section { padding: 64px 0 !important; }
          .edu-timeline-line { left: 20px !important; transform: none !important; }
          .edu-card-container { justify-content: flex-start !important; padding-left: 45px; margin-bottom: 32px !important; }
          .edu-timeline-card { width: 100% !important; padding: 22px 20px !important; }
          .edu-dot { left: 0 !important; transform: none !important; width: 38px !important; height: 38px !important; }
          .edu-connector { display: none !important; }
          .edu-quote-box { padding: 24px 20px !important; margin-top: 40px !important; }
        }
      `}</style>

      <section id="education" className="edu-section" style={{ background: t.sectionBg, padding: '96px 0' }}>
        <div className="edu-grid-bg" style={{ '--gl': t.gridLine }} />
        <div style={{ position:'absolute', top:'15%', right:'-80px', width:360, height:360, borderRadius:'50%', background:`radial-gradient(circle, ${isDark?'rgba(185,28,28,0.1)':'rgba(220,38,38,0.06)'} 0%, transparent 70%)`, filter:'blur(80px)', pointerEvents:'none', animation:'edu-pulse 8s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'20%', left:'-60px', width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle, ${isDark?'rgba(220,38,38,0.07)':'rgba(220,38,38,0.04)'} 0%, transparent 70%)`, filter:'blur(60px)', pointerEvents:'none', animation:'edu-pulse 10s ease-in-out infinite', animationDelay:'4s' }} />

        <div className="edu-main-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 72, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, marginBottom: 20, background: t.badgeBg, border: `1px solid ${t.badgeBorder}` }}>
              <svg width="13" height="13" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', color: '#ef4444', textTransform: 'uppercase' }}>Journey</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 14px', color: t.heading }}>
              Education & <span className="edu-title-accent">Learning Path</span>
            </h2>
            <p style={{ margin: '0 auto', fontSize: '1rem', color: t.subText, maxWidth: 480, lineHeight: 1.75 }}>
              From Islamic sciences to full-stack development — a unique journey shaped by discipline, curiosity, and the love of building things.
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            <div className="edu-timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, transparent, ${t.timelineLine} 15%, ${t.timelineLine} 85%, transparent)`, transform: 'translateX(-50%)', zIndex: 0 }} />
            {educationData.map((edu, i) => (
              <EduCard key={edu.id} edu={edu} isDark={isDark} index={i} />
            ))}
          </div>

          {/* Quote */}
          <motion.div className="edu-quote-box" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginTop: 64, padding: '32px 36px', borderRadius: 20, background: t.quoteBg, border: `1px solid ${t.quoteBorder}`, backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)' }} />
            <div style={{ fontSize: '4rem', lineHeight: 1, color: 'rgba(220,38,38,0.12)', fontFamily: 'Georgia, serif', marginBottom: -16, userSelect: 'none' }}>❝</div>
            <p style={{ margin: '0 auto 16px', fontSize: '1.05rem', lineHeight: 1.85, color: isDark ? '#94a3b8' : '#475569', maxWidth: 620, fontStyle: 'italic' }}>
              My background in Islamic studies taught me that mastery requires patience, consistency, and deep understanding. I bring the same approach to every line of code I write.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>👨‍💻</div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ef4444' }}>Abdur Rahman</span>
              <span style={{ fontSize: '0.78rem', color: isDark ? '#475569' : '#94a3b8' }}>· MERN Stack Developer</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}