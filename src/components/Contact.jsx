'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail, Send, User, MessageSquare,
  Github, Linkedin, Twitter, CheckCircle, XCircle, Loader2,
  MapPin, Clock, ArrowUpRight,
} from 'lucide-react';

// ── EmailJS credentials ───────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_KEY;

const CONTACT = {
  email:    'abrahman5676@gmail.com',
  location: 'Bangladesh 🇧🇩',
  timezone: 'GMT+6 · Available now',
};

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/abdurrahman253',         Icon: Github   },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdurrahman253/', Icon: Linkedin },
  { label: 'Twitter',  href: 'https://x.com/AbdurRahma91153',             Icon: Twitter  },
];

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', bottom: 20, right: 20, left: 20, zHeight: 9999, // Added left/right for mobile centering
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 20px', borderRadius: 14, margin: '0 auto', maxWidth: 400,
        background: isSuccess ? 'rgba(20,83,45,0.95)' : 'rgba(127,29,29,0.95)',
        border: `1px solid ${isSuccess ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }}
    >
      {isSuccess
        ? <CheckCircle size={20} color="#4ade80" style={{ flexShrink: 0 }} />
        : <XCircle size={20} color="#f87171" style={{ flexShrink: 0 }} />}
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.4 }}>
        {message}
      </span>
      <button onClick={onClose} style={{ marginLeft: 'auto', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
    </motion.div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, error, isDark, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isDark ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={12} style={{ color: '#ef4444' }} />
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ margin: 0, fontSize: '0.72rem', color: '#f87171', fontWeight: 500 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, href, isDark }) {
  const [hov, setHov] = useState(false);
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      href={href} target={href ? '_blank' : undefined} rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', borderRadius: 14,
        background: isDark ? 'rgba(14,14,18,0.9)' : 'rgba(255,255,255,0.9)',
        border: `1px solid ${isDark ? (hov ? 'rgba(220,38,38,0.4)' : 'rgba(220,38,38,0.14)') : (hov ? 'rgba(220,38,38,0.3)' : 'rgba(220,38,38,0.1)')}`,
        backdropFilter: 'blur(12px)',
        textDecoration: 'none', cursor: href ? 'pointer' : 'default',
        transition: 'all 0.22s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={16} color="#ef4444" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: 700, color: isDark ? '#475569' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
        <p style={{ margin: '2px 0 0', fontSize: '0.82rem', fontWeight: 600, color: isDark ? '#f1f5f9' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</p>
      </div>
      {href && <ArrowUpRight size={14} style={{ color: hov ? '#ef4444' : isDark ? '#334155' : '#cbd5e1' }} />}
    </Wrapper>
  );
}

// ── Social link ───────────────────────────────────────────────────────────────
function SocialLink({ label, href, Icon, isDark, socialBg, socialBorder }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 44, height: 44, borderRadius: 11,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? 'rgba(220,38,38,0.12)' : socialBg,
        border: `1px solid ${hov ? 'rgba(220,38,38,0.4)' : socialBorder}`,
        color: hov ? '#ef4444' : isDark ? '#64748b' : '#94a3b8',
        textDecoration: 'none', transition: 'all 0.2s ease',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <Icon size={18} />
    </a>
  );
}

// ── Main Contact ──────────────────────────────────────────────────────────────
export default function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle');
  const [toast, setToast]     = useState(null);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted ? true : theme === 'night';
  if (!mounted) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name    = 'Name is required';
    if (!form.email.trim())     e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim())   e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message is too short (min 20 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_email:   CONTACT.email,
          reply_to:   form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('idle');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
      setToast({ type: 'success', message: "Message sent! I'll get back to you soon 🙌" });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('idle');
      setToast({ type: 'error', message: 'Failed to send. Please email me directly.' });
    }
  };

  const t = {
    sectionBg:    isDark ? '#080808' : '#f8fafc',
    gridLine:     isDark ? 'rgba(220,38,38,0.03)' : 'rgba(220,38,38,0.05)',
    heading:      isDark ? '#f8fafc' : '#0f172a',
    subText:      isDark ? '#64748b' : '#94a3b8',
    badgeBg:      isDark ? 'rgba(220,38,38,0.08)' : 'rgba(220,38,38,0.06)',
    badgeBorder:  isDark ? 'rgba(220,38,38,0.3)'  : 'rgba(220,38,38,0.2)',
    cardBg:       isDark ? 'rgba(14,14,18,0.92)'  : 'rgba(255,255,255,0.92)',
    cardBorder:   isDark ? 'rgba(220,38,38,0.14)' : 'rgba(220,38,38,0.1)',
    cardShadow:   isDark ? '0 0 0 1px rgba(220,38,38,0.06), 0 20px 48px rgba(0,0,0,0.5)' : '0 0 0 1px rgba(220,38,38,0.04), 0 16px 40px rgba(0,0,0,0.07)',
    inputBg:      isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    inputBorder:  isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
    inputText:    isDark ? '#f1f5f9' : '#0f172a',
    inputPH:      isDark ? '#334155' : '#94a3b8',
    divider:      isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
    socialBg:     isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    socialBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  };

  const inputStyle = (hasErr) => ({
    width: '100%', padding: '13px 16px', borderRadius: 10,
    background: t.inputBg,
    border: `1px solid ${hasErr ? '#f87171' : t.inputBorder}`,
    color: t.inputText, fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'all 0.2s',
    fontFamily: "'Inter', sans-serif",
  });

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes contact-pulse { 0%,100%{opacity:.35;transform:scale(1);} 50%{opacity:.6;transform:scale(1.07);} }
        @keyframes shimmer-contact { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .contact-title-accent { 
          background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 60%, #dc2626 100%); 
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
          background-clip: text; animation: shimmer-contact 3s linear infinite; 
        }

        /* Mobile Adjustments */
        @media (max-width: 900px) {
          .contact-container { padding: 0 24px !important; }
          .contact-grid { 
            grid-template-columns: 1fr !important; 
            gap: 48px !important; 
          }
          .contact-card { padding: 24px 20px !important; }
          .header-title { font-size: 2.2rem !important; }
        }

        @media (max-width: 480px) {
          .contact-container { padding: 0 16px !important; }
          .header-title { font-size: 1.8rem !important; }
          .contact-section { padding: 60px 0 !important; }
        }
      `}</style>

      <section id="contact" style={{ position:'relative', overflow:'hidden', background: t.sectionBg, padding: '96px 0', transition: 'background 0.3s' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }} className="contact-container">

          {/* Header */}
          <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }} style={{ marginBottom:56, textAlign:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', borderRadius:999, marginBottom:20, background:t.badgeBg, border:`1px solid ${t.badgeBorder}` }}>
              <Mail size={13} color="#ef4444" />
              <span style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.16em', color:'#ef4444', textTransform:'uppercase' }}>Contact</span>
            </div>
            <h2 className="header-title" style={{ fontSize:'clamp(2rem, 4.5vw, 3.2rem)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.1, margin:'0 0 14px', color:t.heading }}>
              Let's{' '}<span className="contact-title-accent">Work Together</span>
            </h2>
            <p style={{ margin:'0 auto', fontSize:'0.95rem', color:t.subText, maxWidth:440, lineHeight:1.7 }}>
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>
          </motion.div>

          <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:32 }}>

            {/* LEFT - Info */}
            <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ marginBottom:8 }}>
                <p style={{ margin:0, fontSize:'1.05rem', fontWeight:800, color:t.heading }}>Get in touch</p>
                <p style={{ margin:'6px 0 0', fontSize:'0.85rem', color:t.subText, lineHeight:1.7 }}>I'm currently available for freelance work and full-time opportunities.</p>
              </div>
              <InfoCard icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} isDark={isDark} />
              <InfoCard icon={MapPin} label="Location" value={CONTACT.location} isDark={isDark} />
              <InfoCard icon={Clock} label="Timezone" value={CONTACT.timezone} isDark={isDark} />
              <div style={{ height:1, background:t.divider, margin:'8px 0' }} />
              <p style={{ margin:0, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', color:t.subText, textTransform:'uppercase' }}>Find me on</p>
              <div style={{ display:'flex', gap:10 }}>
                {SOCIALS.map(({ label, href, Icon }) => (
                  <SocialLink key={label} label={label} href={href} Icon={Icon} isDark={isDark} socialBg={t.socialBg} socialBorder={t.socialBorder} />
                ))}
              </div>
              <div style={{ marginTop:8, padding:'14px 18px', borderRadius:14, background: isDark?'rgba(220,38,38,0.07)':'rgba(220,38,38,0.05)', border:'1px solid rgba(220,38,38,0.16)', display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 8px rgba(34,197,94,0.5)', flexShrink:0 }} />
                <div>
                  <p style={{ margin:0, fontSize:'0.8rem', fontWeight:700, color:isDark?'#f1f5f9':'#1e293b' }}>Available for work</p>
                  <p style={{ margin:'2px 0 0', fontSize:'0.72rem', color:t.subText }}>Open to junior roles & freelance projects</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Form */}
            <motion.div className="contact-card" initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
              style={{ background:t.cardBg, border:`1px solid ${t.cardBorder}`, borderRadius:20, padding:'32px 28px', backdropFilter:'blur(16px)', boxShadow:t.cardShadow, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)' }} />

              <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <Field label="Your Name" icon={User} error={errors.name} isDark={isDark}>
                  <input
                    type="text" placeholder="John Doe" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    style={{ ...inputStyle(!!errors.name), '--ph': t.inputPH }}
                  />
                </Field>
                <Field label="Your Email" icon={Mail} error={errors.email} isDark={isDark}>
                  <input
                    type="email" placeholder="you@example.com" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    style={{ ...inputStyle(!!errors.email), '--ph': t.inputPH }}
                  />
                </Field>
                <Field label="Message" icon={MessageSquare} error={errors.message} isDark={isDark}>
                  <textarea
                    rows={5} placeholder="Hi Abdur, I'd love to work with you on..." value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle(!!errors.message), '--ph': t.inputPH, resize: 'vertical', minHeight: 120 }}
                  />
                </Field>
                <motion.button
                  type="submit" disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  style={{ width:'100%', padding:'15px 24px', background: status==='loading'?'#991b1b':'#dc2626', color:'#fff', border:'none', borderRadius:12, fontSize:'0.88rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', cursor: status==='loading'?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow: status==='loading'?'none':'0 8px 24px rgba(220,38,38,0.3)', transition:'all 0.2s' }}
                >
                  {status === 'loading'
                    ? <><Loader2 size={18} style={{ animation:'spin 1s linear infinite' }} /> Sending...</>
                    : <><Send size={16} /> Send Message</>
                  }
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {toast && <Toast key="toast" type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </>
  );
}