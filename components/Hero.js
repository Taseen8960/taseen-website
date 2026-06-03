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

// 3D Text Component
function Text3D({ text, theme }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const isLight = theme === 'light';

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -15);
    setRotateY(((x - centerX) / centerX) * 15);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  // Split text into individual characters
  const chars = text.split('');

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        cursor: 'default',
        display: 'inline-block',
        marginBottom: '16px',
        width: '100%',
      }}
    >
      <motion.div
        animate={{ 
          rotateX, 
          rotateY,
          transformStyle: 'preserve-3d' // Motion animate এর ভেতর রাখা হলো
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
        }}
      >
        {/* Main text */}
        <div 
          className="hero-name"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.05,
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0px',
            transformStyle: 'preserve-3d',
          }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: 'inline-block',
                color: isLight ? '#0f172a' : 'transparent',
                background: isLight
                  ? 'none'
                  : 'linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #22d3ee 100%)',
                WebkitBackgroundClip: isLight ? 'unset' : 'text',
                WebkitTextFillColor: isLight ? '#0f172a' : 'transparent',
                backgroundClip: isLight ? 'unset' : 'text',
                textShadow: isLight
                  ? 'none'
                  : `0 0 40px rgba(34,211,238,0.15)`,
                transformStyle: 'preserve-3d',
                transform: char === ' ' ? 'none' : `translateZ(24px)`, // Depth বাড়াতে 24px করা হলো
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                padding: char === ' ' ? '0 6px' : '0',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* 3D shadow layer */}
        <div 
          className="hero-name-shadow"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.05,
            position: 'absolute',
            top: 0, left: 0,
            right: 0,
            textAlign: 'center',
            color: 'transparent',
            background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(167,139,250,0.1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transform: 'translateZ(-15px) translateX(4px) translateY(4px)',
            filter: 'blur(4px)',
            pointerEvents: 'none',
          }}
        >
          {text}
        </div>

        {/* Dynamic glow overlay */}
        <div style={{
          position: 'absolute',
          inset: '-20px',
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.08) 0%, transparent 60%)`,
          pointerEvents: 'none',
          borderRadius: '16px',
          transition: 'background 0.1s ease',
        }} />
      </motion.div>
    </div>
  );
}

// Floating particle ring around hero
function FloatingRing() {
  return (
    <div style={{
      position: 'absolute',
      width: '600px',
      height: '600px',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
    }}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: i % 2 === 0 ? '#22d3ee' : '#a78bfa',
            left: `${50 + 48 * Math.cos((i / 8) * Math.PI * 2)}%`,
            top: `${50 + 48 * Math.sin((i / 8) * Math.PI * 2)}%`,
            boxShadow: `0 0 8px ${i % 2 === 0 ? '#22d3ee' : '#a78bfa'}`,
          }}
          animate={{
            x: [0, Math.cos((i / 8) * Math.PI * 2) * 10, 0],
            y: [0, Math.sin((i / 8) * Math.PI * 2) * 10, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(34,211,238,0.06)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '40px',
          borderRadius: '50%',
          border: '1px dashed rgba(167,139,250,0.08)',
        }}
      />
    </div>
  );
}

export default function Hero({ theme }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const isLight = theme === 'light';

  // Typewriter effect
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
          timeout = setTimeout(() => setTyping(false), 1800);
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

  // Parallax orbs
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
              opacity: isLight ? [0.08, 0.25, 0.08] : [0.2, 0.8, 0.2],
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

      {/* Parallax glow orbs */}
      <motion.div
        style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: isLight ? 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', top: '5%', left: '15%' }}
        animate={{ x: mousePos.x * -40, y: mousePos.y * -40 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      <motion.div
        style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: isLight ? 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', bottom: '5%', right: '10%' }}
        animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />

      {/* Floating orbital ring */}
      <FloatingRing />

      {/* Main content */}
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
            background: isLight ? 'rgba(8,145,178,0.08)' : 'rgba(34,211,238,0.08)',
            border: `1px solid ${isLight ? 'rgba(8,145,178,0.25)' : 'rgba(34,211,238,0.2)'}`,
            padding: '6px 18px',
            borderRadius: '20px',
            marginBottom: '24px',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }}
          />
          Available for collaboration
        </motion.div>

        {/* 3D Name */}
        <Text3D text="S.M. Taseen Kabir" theme={theme} />

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
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
            style={{ borderRight: '2px solid var(--cyan)', marginLeft: '2px' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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
          transition={{ delay: 1.2 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/#projects" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,211,238,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.5px',
                color: '#ffffff',
                background: 'var(--cyan)',
                padding: '14px 32px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              View My Work →
            </motion.a>
          </Link>

          <Link href="/blog" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05, borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.5px',
                color: 'var(--text2)',
                background: 'transparent',
                border: `1px solid var(--border2)`,
                padding: '14px 32px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              Read My Blog
            </motion.a>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ marginTop: '80px' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '6px',
              color: 'var(--text3)',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase',
            }}
          >
            <span>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero-name {
          white-space: nowrap;
        }
        .hero-name-shadow {
          white-space: nowrap;
        }
        @media (max-width: 650px) {
          .hero-name { white-space: normal !important; }
          .hero-name-shadow { display: none !important; } /* মোবাইলে শ্যাডো লেয়ার ডুপ্লিকেট টেক্সট তৈরি করা বন্ধ করবে */
        }
      `}</style>
    </section>
  );
}