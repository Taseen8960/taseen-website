import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function GlitchText({ text }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 'clamp(80px, 18vw, 180px)',
        fontWeight: 800,
        color: 'transparent',
        WebkitTextStroke: '2px rgba(34,211,238,0.4)',
        letterSpacing: '-4px',
        display: 'block',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {text}
      </span>

      {/* Glitch layer 1 */}
      <motion.span
        animate={glitching ? {
          x: [-3, 3, -2, 0],
          opacity: [0, 1, 1, 0],
          clipPath: [
            'inset(20% 0 60% 0)',
            'inset(40% 0 30% 0)',
            'inset(10% 0 70% 0)',
            'inset(0% 0 0% 0)',
          ]
        } : { x: 0, opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', inset: 0,
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(80px, 18vw, 180px)',
          fontWeight: 800,
          color: '#22d3ee',
          letterSpacing: '-4px',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {text}
      </motion.span>

      {/* Glitch layer 2 */}
      <motion.span
        animate={glitching ? {
          x: [3, -3, 2, 0],
          opacity: [0, 0.8, 0.8, 0],
          clipPath: [
            'inset(60% 0 10% 0)',
            'inset(20% 0 50% 0)',
            'inset(70% 0 5% 0)',
            'inset(0% 0 0% 0)',
          ]
        } : { x: 0, opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', inset: 0,
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(80px, 18vw, 180px)',
          fontWeight: 800,
          color: '#f472b6',
          letterSpacing: '-4px',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,8,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(34,211,238,0.15)';
      ctx.font = '14px Space Mono, monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.4,
        pointerEvents: 'none',
      }}
    />
  );
}

const navLinks = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/about', label: 'About', icon: '◉' },
  { href: '/blog', label: 'Blog', icon: '✎' },
  { href: '/journey', label: 'Journey', icon: '◈' },
];

export default function NotFound() {
  const [typed, setTyped] = useState('');
  const fullText = 'PAGE_NOT_FOUND';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
    }}>
      {/* Matrix rain */}
      <MatrixRain />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '20%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '20%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Corner brackets */}
      {['tl', 'tr', 'bl', 'br'].map((pos, i) => (
        <motion.div
          key={pos}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          style={{
            position: 'absolute',
            ...(pos.startsWith('t') ? { top: '24px' } : { bottom: '24px' }),
            ...(pos.endsWith('l') ? { left: '24px' } : { right: '24px' }),
            width: '24px', height: '24px',
            borderTop: pos.startsWith('t') ? '2px solid rgba(34,211,238,0.5)' : 'none',
            borderBottom: pos.startsWith('b') ? '2px solid rgba(34,211,238,0.5)' : 'none',
            borderLeft: pos.endsWith('l') ? '2px solid rgba(34,211,238,0.5)' : 'none',
            borderRight: pos.endsWith('r') ? '2px solid rgba(34,211,238,0.5)' : 'none',
          }}
        />
      ))}

      {/* Main content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Error code */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '4px', color: 'rgba(34,211,238,0.6)',
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f472b6', display: 'inline-block' }}
          />
          ERROR://SYS.404
        </motion.div>

        {/* 404 Glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlitchText text="404" />
        </motion.div>

        {/* Typewriter message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(14px, 2.5vw, 20px)',
            color: '#22d3ee',
            marginBottom: '12px',
            minHeight: '32px',
          }}
        >
          {typed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ borderRight: '2px solid #22d3ee', marginLeft: '2px' }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: '15px', color: 'rgba(148,163,184,0.7)',
            maxWidth: '440px', margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          The page you're looking for has been moved, deleted, or never existed.
          Even the best hackers hit dead ends sometimes.
        </motion.p>

        {/* Terminal box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            background: 'rgba(34,211,238,0.03)',
            border: '1px solid rgba(34,211,238,0.15)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '40px',
            textAlign: 'left',
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}
        >
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            lineHeight: 2,
            color: 'rgba(34,211,238,0.7)',
          }}>
            <span style={{ color: 'rgba(167,139,250,0.7)' }}>$ </span>
            curl -I taseenkabir.vercel.app/???<br />
            <span style={{ color: 'rgba(244,114,182,0.7)' }}>HTTP/1.1 404 Not Found</span><br />
            <span style={{ color: 'rgba(34,211,238,0.4)' }}>Server: taseen.dev/v2.0</span><br />
            <span style={{ color: 'rgba(34,211,238,0.4)' }}>Suggestion: Navigate to /home</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', color: 'rgba(71,85,105,1)',
            letterSpacing: '2px', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Available Routes:
          </p>

          <div style={{
            display: 'flex', gap: '10px',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {navLinks.map((link, i) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.08 }}
                  whileHover={{
                    scale: 1.06,
                    borderColor: '#22d3ee',
                    color: '#22d3ee',
                    boxShadow: '0 0 20px rgba(34,211,238,0.2)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px', fontWeight: 700,
                    color: 'rgba(148,163,184,0.8)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '10px 18px', borderRadius: '10px',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Home button */}
          <Link href="/">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(34,211,238,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px', fontWeight: 700,
                letterSpacing: '1px',
                color: '#000',
                background: '#22d3ee',
                padding: '14px 36px', borderRadius: '12px',
                cursor: 'pointer', marginTop: '20px',
                transition: 'all 0.3s ease',
              }}
            >
              ← Return to Base
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}