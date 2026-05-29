import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlowOrb } from './ThreeDCard';

const contacts = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    label: 'Email',
    display: 's.m.taseenkabir8960@gmail.com',
    link: 'mailto:s.m.taseenkabir8960@gmail.com',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
    gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    available: true,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>,
    label: 'GitHub',
    display: 'github.com/Taseen8960',
    link: 'https://github.com/Taseen8960',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    available: true,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 001-1V4a1 1 0 00-1-1z"/></svg>,
    label: 'Facebook',
    display: 'smtaseenkabir',
    link: 'https://facebook.com/smtaseenkabir',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.35)',
    gradient: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
    available: true,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10A5 5 0 0012 7zm0 8a3 3 0 110-6 3 3 0 010 6zm6.5-8.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z"/></svg>,
    label: 'Instagram',
    display: '@smtaseenkabir',
    link: 'https://instagram.com/smtaseenkabir',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.35)',
    gradient: 'linear-gradient(135deg, #be185d, #f472b6)',
    available: true,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
    label: 'Telegram',
    display: '@smtaseenkabir',
    link: 'https://t.me/smtaseenkabir',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
    gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
    available: true,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    label: 'WhatsApp',
    display: '+880 1743-585008',
    link: 'https://wa.me/8801743585008',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.35)',
    gradient: 'linear-gradient(135deg, #059669, #34d399)',
    available: true,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/></svg>,
    label: 'Discord',
    display: 'Coming soon...',
    link: '#',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.15)',
    gradient: 'linear-gradient(135deg, #4f46e5, #818cf8)',
    available: false,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    label: 'Twitter / X',
    display: 'Coming soon...',
    link: '#',
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.1)',
    gradient: 'linear-gradient(135deg, #334155, #94a3b8)',
    available: false,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>,
    label: 'LinkedIn',
    display: 'Coming soon...',
    link: '#',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    gradient: 'linear-gradient(135deg, #065f46, #34d399)',
    available: false,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.99 0 3.84.65 5.34 1.73L5.73 17.34A7.963 7.963 0 014 12c0-4.41 3.59-8 8-8zm0 16c-1.99 0-3.84-.65-5.34-1.73l11.61-11.61A7.963 7.963 0 0120 12c0 4.41-3.59 8-8 8z"/></svg>,
    label: 'Threads',
    display: 'Coming soon...',
    link: '#',
    color: '#e2e8f0',
    glow: 'rgba(226,232,240,0.1)',
    gradient: 'linear-gradient(135deg, #334155, #e2e8f0)',
    available: false,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.99 0 3.84.65 5.34 1.73L5.73 17.34A7.963 7.963 0 014 12c0-4.41 3.59-8 8-8zm0 16c-1.99 0-3.84-.65-5.34-1.73l11.61-11.61A7.963 7.963 0 0120 12c0 4.41-3.59 8-8 8z"/></svg>,
    label: 'Truth Social',
    display: 'Coming soon...',
    link: '#',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.1)',
    gradient: 'linear-gradient(135deg, #9a3412, #fb923c)',
    available: false,
  },
];

function ContactCard({ icon, label, display, link, color, glow, gradient, available, index }) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const handleMouseMove = (e) => {
    if (!available) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -12);
    setRotateY(((x - rect.width / 2) / rect.width) * 12);
    setMouseX((x / rect.width) * 100);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMouseX(50);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.a
        href={available ? link : '#'}
        target={available ? '_blank' : '_self'}
        rel="noopener noreferrer"
        onMouseEnter={() => available && setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          padding: '28px 16px',
          borderRadius: '20px',
          background: hovered
            ? 'var(--surface2)'
            : 'var(--surface)',
          border: `1px solid ${hovered ? color : 'var(--border)'}`,
          boxShadow: hovered
            ? `0 24px 60px ${glow}, 0 0 0 1px ${color}20, inset 0 1px 0 rgba(255,255,255,0.08)`
            : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'}`,
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          cursor: available ? 'pointer' : 'not-allowed',
          opacity: available ? 1 : 0.38,
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic shine */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at ${mouseX}% 0%, ${glow} 0%, transparent 60%)`,
            pointerEvents: 'none', borderRadius: '20px',
          }} />
        )}

        {/* Top shimmer line */}
        {hovered && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Icon box */}
        <motion.div
          animate={hovered ? {
            boxShadow: `0 8px 32px ${glow}`,
          } : { boxShadow: 'none' }}
          style={{
            width: '56px', height: '56px',
            borderRadius: '16px',
            background: hovered ? gradient : 'var(--surface2)',
            border: `1px solid ${hovered ? 'transparent' : 'var(--border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hovered ? '#ffffff' : color,
            transition: 'all 0.3s ease',
            position: 'relative', zIndex: 1,
            flexShrink: 0,
          }}
        >
          {icon}
        </motion.div>

        {/* Label */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: hovered ? color : 'var(--text3)',
            transition: 'color 0.3s',
            marginBottom: '5px',
          }}>
            {label}
          </div>
          <div style={{
            fontSize: '11px',
            color: hovered ? 'var(--text)' : 'var(--text2)',
            transition: 'color 0.3s',
            wordBreak: 'break-all',
            lineHeight: 1.4,
            fontFamily: "'Space Mono', monospace",
          }}>
            {display}
          </div>
        </div>

        {/* Soon badge */}
        {!available && (
          <div style={{
            position: 'absolute', top: '10px', right: '10px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '8px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: 'var(--text3)',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            padding: '3px 8px', borderRadius: '10px',
          }}>
            Soon
          </div>
        )}
      </motion.a>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const availableCount = contacts.filter(c => c.available).length;

  return (
    <section id="contact" style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>

      {/* Glow orbs */}
      <GlowOrb color="rgba(34,211,238,0.08)" size={600} top="-5%" left="5%" />
      <GlowOrb color="rgba(167,139,250,0.07)" size={500} bottom="5%" right="5%" />
      <GlowOrb color="rgba(244,114,182,0.05)" size={400} top="50%" left="35%" />

      {/* Animated floating particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a78bfa' : '#f472b6',
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="section-tag"
          >
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="section-title"
            style={{
              background: 'linear-gradient(135deg, var(--text) 0%, var(--text2) 50%, var(--cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Let's Connect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '16px', color: 'var(--text2)',
              maxWidth: '480px', lineHeight: 1.7,
              margin: '0 auto 24px',
            }}
          >
            Reach out to collaborate, share ideas, or just say hello —
            I'm always open to meaningful conversations.
          </motion.p>

          {/* Active platforms count */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px', color: 'var(--text3)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '6px 16px', borderRadius: '20px',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}
            />
            {availableCount} platforms active
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '14px',
          marginBottom: '64px',
        }}>
          {contacts.map((c, i) => (
            <ContactCard key={c.label} {...c} index={i} />
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            padding: '48px 32px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px', color: 'var(--text2)',
              fontStyle: 'italic', marginBottom: '12px',
              position: 'relative', zIndex: 1,
            }}
          >
            "Reach for innovation — not perfection."
          </motion.div>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', color: 'var(--text3)',
            letterSpacing: '1px',
            position: 'relative', zIndex: 1,
          }}>
            © 2026 S.M. Taseen Kabir
          </p>
        </motion.div>
      </div>
    </section>
  );
}