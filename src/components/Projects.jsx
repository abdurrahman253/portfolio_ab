'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'scholarstream',
    title: 'ScholarStream',
    description:
      'Full-stack scholarship management platform connecting students and funding organizations worldwide. Features role-based access, Stripe payments, real-time analytics, and smart matching for 500+ scholarships.',
    image: '/assets/scholarship.png',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Stripe', 'Tailwind CSS' , 'React Hook Form', 'TanStack Query', 'Axios' ],
    github: 'https://github.com/abdurrahman253/Scholar-Stream-Client-Side',
    demo: 'https://scholar-stream-client-side-six.vercel.app/',
    previewBg: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 50%, #db2777 100%)',
    accent: '#a855f7',
  },
  {
    id: 'carhub',
    title: 'CarHub',
    description:
      'Global EV import/export marketplace connecting buyers and sellers worldwide. Premium dark UI with neon accents, real-time live chat support, and secure Firebase + JWT authentication.',
    image: '/assets/carhub.png',
    tech: ['React', 'Node.js', 'Express.js', 'Lucide React', 'JWT', 'MongoDB', 'Firebase', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/abdurrahman253/car-hub-client',
    demo: 'https://car-hub99.netlify.app/',
    previewBg: 'linear-gradient(135deg, #0c1a2e 0%, #0e4a6e 50%, #0891b2 100%)',
    accent: '#22d3ee',
  },
  {
    id: 'playhub',
    title: 'PlayHub',
    description:
      'Ultimate gaming platform for gamers who crave style, speed, and glory. Features 100+ premium games, live winners feed, GSAP animations, and a powerful dark aesthetic.',
    image: '/assets/playhub.png',
    tech: ['React', 'Firebase', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'DaisyUI'],
    github: 'https://github.com/abdurrahman253/play-hub',
    demo: 'https://play-hub-games.netlify.app/',
    previewBg: 'linear-gradient(135deg, #0a0a0a 0%, #431407 50%, #ea580c 100%)',
    accent: '#fb923c',
  },
];

// ── Image Preview ─────────────────────────────────────────────────────────────
function ProjectPreview({ project }) {
  const [err, setErr] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{ position: 'relative', width: '100%' }}
    >
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: -2, borderRadius: 18, zIndex: 0,
          background: `linear-gradient(135deg, ${project.accent}40, transparent 60%)`,
          filter: 'blur(2px)',
        }}
      />

      <motion.div
        animate={{ y: hov ? -8 : 0, scale: hov ? 1.02 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative', zIndex: 1,
          borderRadius: 16, overflow: 'hidden',
          boxShadow: hov
            ? `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px ${project.accent}40`
            : `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)`,
          transition: 'box-shadow 0.4s ease',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '9px 12px',
          background: 'rgba(10,10,14,0.9)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
          <div style={{
            flex: 1, height: 18, borderRadius: 5, marginLeft: 6,
            background: 'rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', paddingLeft: 8,
            overflow: 'hidden'
          }}>
            <span style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
              {project.demo.replace('https://', '').replace(/\/$/, '')}
            </span>
          </div>
        </div>

        <div style={{ position: 'relative', background: project.previewBg }}>
          {err ? (
            <div style={{
              aspectRatio: '16/9', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'rgba(0,0,0,0.4)',
            }}>
              <span style={{ fontSize: '2.5rem' }}>🖼️</span>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', textAlign: 'center', padding: '0 10px' }}>
                /public/projects/{project.id}.png
              </span>
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={720}
              height={405}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              onError={() => setErr(true)}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Single Project Row ────────────────────────────────────────────────────────
function ProjectRow({ project, index, isDark }) {
  const isOdd = index % 2 !== 0;

  const t = {
    num:       isDark ? `${project.accent}30` : `${project.accent}20`,
    numText:   project.accent,
    title:     isDark ? '#f1f5f9' : '#0f172a',
    body:      isDark ? '#64748b' : '#94a3b8',
    tagBg:     isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    tagBord:   isDark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)',
    tagText:   isDark ? '#94a3b8' : '#475569',
    btnBord:   isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    btnText:   isDark ? '#94a3b8' : '#475569',
    divider:   isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
  };

  return (
    <div className={`proj-row ${isOdd ? 'odd' : 'even'}`} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px 64px',
      alignItems: 'center',
      padding: '60px 0',
      position: 'relative',
    }}>
      {/* Image Block */}
      <motion.div 
        className="proj-image-block"
        initial={{ opacity: 0, x: isOdd ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ order: isOdd ? 1 : 2 }}
      >
        <ProjectPreview project={project} />
      </motion.div>

      {/* Info Block */}
      <motion.div
        className="proj-info-block"
        initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          order: isOdd ? 2 : 1
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 8,
            background: t.num, fontSize: '0.75rem',
            fontWeight: 900, color: t.numText,
            fontFamily: 'monospace',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{ height: 1, width: 28, background: t.divider }} />
        </div>

        <h3 style={{
          margin: '0 0 12px',
          fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
          fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1,
          color: t.title,
        }}>
          {project.title}
        </h3>

        <p style={{
          margin: '0 0 24px',
          fontSize: '0.9rem', lineHeight: 1.8, color: t.body, maxWidth: 440,
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 28 }} className="proj-tags">
          {project.tech.map((tag) => (
            <span key={tag} style={{
              padding: '4px 12px', borderRadius: 999,
              background: t.tagBg, border: `1px solid ${t.tagBord}`,
              fontSize: '0.68rem', fontWeight: 600, color: t.tagText,
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="proj-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-btn-secondary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 18px', borderRadius: 9,
              border: `1px solid ${t.btnBord}`, color: t.btnText,
              textDecoration: 'none', fontSize: '0.76rem', fontWeight: 700,
              textTransform: 'uppercase', transition: 'all 0.18s',
            }}>
            <Github size={14} /> GitHub
          </a>

          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 18px', borderRadius: 9,
              background: project.accent, color: '#fff',
              textDecoration: 'none', fontSize: '0.76rem', fontWeight: 700,
              textTransform: 'uppercase', boxShadow: `0 6px 20px ${project.accent}40`,
            }}>
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const sectionBg  = isDark ? '#080a0e' : '#f8fafc';
  const gridColor  = isDark ? 'rgba(255,255,255,0.022)' : 'rgba(0,0,0,0.04)';
  const divider    = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)';
  const heading    = isDark ? '#f1f5f9' : '#0f172a';
  const sub        = isDark ? '#475569' : '#94a3b8';

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes proj-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .proj-title-grad {
          background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 60%, #dc2626 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: proj-shimmer 3.5s linear infinite;
        }

        @media (max-width: 900px) {
          .proj-container { padding: 0 20px !important; }
          .proj-row { 
            grid-template-columns: 1fr !important; 
            gap: 35px !important; 
            padding: 40px 0 !important;
          }
          .proj-image-block { order: 1 !important; }
          .proj-info-block { 
            order: 2 !important; 
            text-align: center; 
            align-items: center; 
          }
          .proj-info-block p { margin: 0 auto 24px !important; }
          .proj-tags, .proj-buttons { justify-content: center; }
          .proj-btn-secondary, a[href*="demo"] { width: 100%; justify-content: center; }
        }
      `}</style>

      <section id="projects" style={{ position: 'relative', overflow: 'hidden', background: sectionBg, padding: '80px 0', transition: 'background 0.3s', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="proj-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', padding: '4px 14px', borderRadius: 999, marginBottom: 18, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ef4444', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Portfolio</span>
            </div>
            <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', fontWeight: 900, color: heading }}>
              Featured <span className="proj-title-grad">Projects</span>
            </h2>
            <p style={{ margin: '0 auto', fontSize: '1rem', color: sub, maxWidth: 500 }}>
              Crafting high-performance web applications with a focus on user experience and clean code.
            </p>
          </motion.div>

          {PROJECTS.map((project, i) => (
            <div key={project.id}>
              {i > 0 && <div style={{ height: 1, background: divider }} />}
              <ProjectRow project={project} index={i} isDark={isDark} />
            </div>
          ))}

          <motion.div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="https://github.com/abdurrahman253" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 24px', borderRadius: 9, border: `1px solid ${divider}`, color: sub, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
              <Github size={16} /> Explore More on GitHub <span>→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}