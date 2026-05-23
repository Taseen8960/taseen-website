import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const contacts = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    label: 'Email',
    display: 's.m.taseenkabir8960@gmail.com',
    link: 'mailto:s.m.taseenkabir8960@gmail.com',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.25)',
    available: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
      </svg>
    ),
    label: 'GitHub',
    display: 'github.com/Taseen8960',
    link: 'https://github.com/Taseen8960',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.25)',
    available: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 001-1V4a1 1 0 00-1-1z"/>
      </svg>
    ),
    label: 'Facebook',
    display: 'facebook.com/smtaseenkabir',
    link: 'https://facebook.com/smtaseenkabir',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.25)',
    available: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10A5 5 0 0012 7zm0 8a3 3 0 110-6 3 3 0 010 6zm6.5-8.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z"/>
      </svg>
    ),
    label: 'Instagram',
    display: '@smtaseenkabir',
    link: 'https://instagram.com/smtaseenkabir',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.25)',
    available: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
      </svg>
    ),
    label: 'LinkedIn',
    display: 'Coming soon...',
    link: '#',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    available: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    label: 'Twitter / X',
    display: 'Coming soon...',
    link: '#',
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.1)',
    available: false,
  },
];

function ContactCard({ icon, label, display, link, color, glow, available, index }) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -10);
    setRotateY(((x - rect.width / 2) / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.a
        href={available ? link : '#'}
        target={available ? '_blank' : '_self'}
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          padding: '28px 20px',
          borderRadius: '20px',
          background: hovered ? 'var(--surface2)' : 'var(--surface)',
          border: `1px solid ${hovered && available ? color : 'var(--border)'}`,
          backdropFilter: 'blur(16px)',
          boxShadow: hovered && available ? `0 20px 50px ${glow}` : '0 4px 20px rgba(0,0,0,0.2)',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered && available ? 'translateY(-8px)' : 'translateY(0)'}`,
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          cursor: available ? 'pointer' : 'not-allowed',
          opacity: available ? 1 : 0.4,
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Icon box */}
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '14px',
          background: hovered && available
            ? `linear-gradient(135deg, ${color}33, ${color}11)`
            : 'var(--surface2)',
          border: `1px solid ${hovered && available ? color + '44' : 'var(--border)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: hovered && available ? color : 'var(--text3)',
          transition: 'all 0.3s ease',
          boxShadow: hovered && available ? `0 8px 24px ${glow}` : 'none',
        }}>
          {icon}
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: hovered && available ? color : 'var(--text3)',
            transition: 'color 0.3s',
            marginBottom: '5px',
          }}>
            {label}
          </div>
          <div style={{
            fontSize: '12px',
            color: hovered && available ? 'var(--text)' : 'var(--text2)',
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
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '8px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--text3)',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            padding: '3px 8px',
            borderRadius: '10px',
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

  return (
    <section id="contact" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px' }}
        >
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Let's Connect</h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text2)',
            maxWidth: '500px',
            lineHeight: 1.7,
          }}>
            Reach out to collaborate, share ideas, or just say hello —
            I'm always open to meaningful conversations.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {contacts.map((c, i) => (
            <ContactCard key={c.label} {...c} index={i} />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: '64px',
            paddingTop: '40px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
            color: 'var(--text3)',
            fontStyle: 'italic',
          }}>
            "Reach for innovation — not perfection."
          </p>
        </motion.div>
      </div>
    </section>
  );
}