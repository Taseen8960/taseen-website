import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const roles = [
  'Cybersecurity Enthusiast',
  'AI & ML Explorer',
  'Ethical Hacker',
  'Web Developer',
  'Nature Photographer',
  'Writer & Poet',
];

const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export default function Hero({ theme }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const current = roles[roleIndex];
    let i = 0;
    let timeout;

    if (typing) {
      const type = () => {
        if (i <= current.length) {
          setDisplayed(current.slice(0, i));
          i++;
          timeout = setTimeout(type, 60);
        } else {
          setTimeout(() => setTyping(false), 1800);
        }
      };
      type();
    } else {
      const erase = () => {
        if (i >= 0) {
          setDisplayed(current.slice(0, i));
          i--;
          timeout = setTimeout(erase, 30);
        } else {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTyping(true);
        }
      };
      i = current.length;
      erase();
    }

    return () => clearTimeout(timeout);
  }, [roleIndex, typing]);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
        paddingTop: '64px',
      }}
    >
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: p.id % 3 === 0
                ? 'var(--cyan)'
                : p.id % 3 === 1
                ? 'var(--purple)'
                : 'var(--blue)',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: isLight
                ? [0.08, 0.25, 0.08]
                : [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Glow orb 1 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: isLight
            ? 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          top: '10%', left: '20%',
        }}
        animate={{ x: mousePos.x * -30, y: mousePos.y * -30 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      {/* Glow orb 2 */}
      <motion.div
        style={{
          position: 'absolute',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: isLight
            ? 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          bottom: '10%', right: '15%',
        }}
        animate={{ x: mousePos.x * 20, y: mousePos.y * 20 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      {/* Content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1,
        padding: '0 24px',
        maxWidth: '1000px',
        width: '100%',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--cyan)',
            background: isLight
              ? 'rgba(8,145,178,0.08)'
              : 'rgba(34,211,238,0.08)',
            border: `1px solid ${isLight
              ? 'rgba(8,145,178,0.25)'
              : 'rgba(34,211,238,0.2)'}`,
            padding: '6px 18px',
            borderRadius: '20px',
            marginBottom: '32px',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: 'var(--cyan)',
              display: 'inline-block',
            }}
          />
          Available for collaboration
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(28px, 5vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '16px',
            whiteSpace: 'nowrap',
            ...(isLight ? {
              color: '#0f172a',
              WebkitTextFillColor: '#0f172a',
            } : {
              background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 60%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }),
          }}
        >
          S.M. Taseen Kabir
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(13px, 2.2vw, 20px)',
            color: 'var(--cyan)',
            marginBottom: '24px',
            minHeight: '32px',
          }}
        >
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{
              borderRight: '2px solid var(--cyan)',
              marginLeft: '2px',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 'clamp(13px, 1.8vw, 17px)',
            color: 'var(--text2)',
            maxWidth: '560px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          Innovating at the intersection of security, AI, and code.
          Building the future — one line at a time.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/#projects">
            <motion.span
              whileHover={{
                scale: 1.04,
                boxShadow: isLight
                  ? '0 0 30px rgba(8,145,178,0.3)'
                  : '0 0 30px rgba(34,211,238,0.3)',
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                color: '#ffffff',
                background: 'var(--cyan)',
                padding: '14px 32px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              View My Work →
            </motion.span>
          </Link>

          <Link href="/blog">
            <motion.span
              whileHover={{
                scale: 1.04,
                borderColor: 'var(--cyan)',
                color: 'var(--cyan)',
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                color: 'var(--text2)',
                background: 'transparent',
                border: `1px solid var(--border2)`,
                padding: '14px 32px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Read My Blog
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: '80px' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text3)',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <span>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          h1 { white-space: normal !important; }
        }
      `}</style>
    </section>
  );
}
