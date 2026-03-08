"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Mail, Home, User, Zap, FolderOpen, GraduationCap, MessageCircle } from 'lucide-react';
import { useLenis } from 'lenis/react';
import GetInTouchModal from './GetInTouchModal/GetInTouchModal';

const navLinks = [
  { name: 'Home',      href: '#home',      icon: Home },
  { name: 'About',     href: '#about',     icon: User },
  { name: 'Skills',    href: '#skills',    icon: Zap },
  { name: 'Projects',  href: '#projects',  icon: FolderOpen },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact',   href: '#contact',   icon: MessageCircle },
];

const Navbar = () => {
  const [isOpen, setIsOpen]        = useState(false);
  const [mounted, setMounted]      = useState(false);
  const [activeSection, setActive] = useState('home');
  const [modalOpen, setModalOpen]  = useState(false);
  const { theme, setTheme }        = useTheme();
  const lenis                      = useLenis();
  const dropdownRef                = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // ── Active section tracker ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const ids = navLinks.map(l => l.href.replace('#', ''));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Close dropdown on outside click/tap ────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('touchstart', handler, { passive: true });
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('mousedown', handler);
    };
  }, [isOpen]);

  // ── Lock body scroll when mobile menu is open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    lenis?.scrollTo(href, { offset: -80, duration: 1.2 });
    setActive(href.replace('#', ''));
    setIsOpen(false);
  };

  // ✅ 'night' = dark, 'light' = light — DaisyUI theme names
  const toggleTheme = () => setTheme(theme === 'night' ? 'light' : 'night');

  // Prevent hydration mismatch
  if (!mounted) return null;
  const isDark = theme === 'night';

  return (
    <>
      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-3 pb-2 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 flex items-center justify-between">

          {/* ── Theme Toggle ── */}
          <div className="pointer-events-auto">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              className={`
                w-11 h-11 rounded-full flex items-center justify-center
                shadow-md border backdrop-blur-xl transition-colors duration-300
                ${isDark
                  ? 'bg-zinc-900/85 border-zinc-700/70 text-amber-400 active:bg-zinc-700'
                  : 'bg-white/85 border-zinc-200/80 text-amber-500 active:bg-zinc-100'}
              `}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -60, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                  exit={{   rotate:  60, opacity: 0, scale: 0.5  }}
                  transition={{ duration: 0.22 }}
                >
                  {isDark ? <Moon size={17} /> : <Sun size={17} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── Desktop Pill Nav ── */}
          <nav
            aria-label="Main navigation"
            className={`
              pointer-events-auto hidden md:flex items-center gap-1 px-2 py-2 rounded-full
              shadow-lg border backdrop-blur-xl transition-colors duration-300
              ${isDark
                ? 'bg-zinc-900/85 border-zinc-700/60'
                : 'bg-white/85 border-zinc-200/80'}
            `}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-1.5 rounded-full text-sm font-medium outline-none select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="pill-active"
                      className={`absolute inset-0 rounded-full ${
                        isDark ? 'bg-red-600/20' : 'bg-red-50'
                      }`}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? 'text-red-500'
                      : isDark
                        ? 'text-zinc-400 hover:text-zinc-200'
                        : 'text-zinc-500 hover:text-zinc-800'
                  }`}>
                    {link.name}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="pointer-events-auto flex items-center gap-2.5">

            {/* Desktop CTA — "Get in touch" */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`
                hidden md:flex items-center gap-2 px-4 py-2 rounded-full
                text-sm font-medium border shadow-md backdrop-blur-xl transition-all duration-200
                ${isDark
                  ? 'bg-zinc-900/85 border-red-800/40 text-zinc-200 hover:border-red-500/60 hover:text-red-400 hover:bg-red-950/30'
                  : 'bg-white/85 border-zinc-200/80 text-zinc-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50/50'}
              `}
            >
              <Mail size={14} />
              Get in touch
            </motion.button>

            {/* Mobile: Get in touch icon */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileTap={{ scale: 0.9 }}
              aria-label="Get in touch"
              className={`
                md:hidden w-11 h-11 rounded-full flex items-center justify-center border shadow-md
                backdrop-blur-xl transition-colors
                ${isDark
                  ? 'bg-zinc-900/85 border-zinc-700/70 text-zinc-300 active:bg-zinc-700'
                  : 'bg-white/85 border-zinc-200/80 text-zinc-600 active:bg-zinc-100'}
              `}
            >
              <Mail size={17} />
            </motion.button>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setIsOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className={`
                md:hidden w-11 h-11 rounded-full flex items-center justify-center border shadow-md
                backdrop-blur-xl transition-colors
                ${isDark
                  ? 'bg-zinc-900/85 border-zinc-700/70 text-zinc-300 active:bg-zinc-700'
                  : 'bg-white/85 border-zinc-200/80 text-zinc-600 active:bg-zinc-100'}
              `}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                  animate={{ rotate:   0, opacity: 1, scale: 1   }}
                  exit={{   rotate:  45, opacity: 0, scale: 0.7  }}
                  transition={{ duration: 0.18 }}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MOBILE DROPDOWN
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)',
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown panel */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y:  0, scale: 1    }}
              exit={{   opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className={`
                fixed top-[4.25rem] z-50 md:hidden rounded-2xl border shadow-2xl overflow-hidden
                mx-4 left-0 right-0
                ${isDark
                  ? 'bg-zinc-900/95 border-zinc-800'
                  : 'bg-white/96 border-zinc-200/80'}
              `}
              style={{
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Nav links */}
              <div className="p-2">
                {navLinks.map((link, i) => {
                  const Icon     = link.icon;
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x:  0 }}
                      transition={{ delay: i * 0.035, duration: 0.2 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`
                        flex items-center gap-3.5 px-4 py-3.5 rounded-xl
                        text-[15px] font-medium transition-colors duration-150 active:scale-[0.98]
                        ${isActive
                          ? isDark
                            ? 'bg-red-950/40 text-white border border-red-800/30'
                            : 'bg-red-50 text-zinc-900 border border-red-100'
                          : isDark
                            ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                            : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'}
                      `}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {/* Icon */}
                      <span className={`
                        flex-shrink-0 transition-colors duration-150
                        ${isActive
                          ? 'text-red-500'
                          : isDark ? 'text-zinc-600' : 'text-zinc-400'}
                      `}>
                        <Icon size={18} />
                      </span>

                      {link.name}

                      {/* Active dot */}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className={`mx-4 h-px ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`} />

              {/* Bottom CTA */}
              <div className="p-3">
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  onClick={() => { setIsOpen(false); setModalOpen(true); }}
                  className={`
                    w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl
                    text-[15px] font-semibold transition-all active:scale-[0.98]
                    bg-red-600 hover:bg-red-700 text-white border border-red-500/30
                    shadow-lg shadow-red-900/20
                  `}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Mail size={16} />
                  Get in touch
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <GetInTouchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;