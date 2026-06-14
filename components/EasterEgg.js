import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];

function MatrixChar({ x, delay }) {
  const chars = '01アイウエカキクケサシスタチツテナニ';
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: [0, 1, 0], y: ['0%', '100%'] }}
      transition={{ duration: 2 + Math.random() * 2, delay, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: 0,
        fontFamily: "'Space Mono', monospace",
        fontSize: '14px',
        color: '#22d3ee',
        pointerEvents: 'none',
        writingMode: 'vertical-rl',
        letterSpacing: '8px',
        textShadow: '0 0 8px rgba(34,211,238,0.8)',
      }}
    >
      {Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')}
    </motion.div>
  );
}

export default function EasterEgg() {
  const [keys, setKeys] = useState([]);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      setKeys(prev => {
        const next = [...prev, e.key].slice(-10);
        if (JSON.stringify(next) === JSON.stringify(KONAMI)) {
          setActive(true);
          setPhase(0);
          setTimeout(() => setPhase(1), 500);
          setTimeout(() => setPhase(2), 1500);
          setTimeout(() => setActive(false), 6000);
        }
        return next;
      });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 999999,
            background: 'rgba(5,5,8,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          onClick={() => setActive(false)}
        >
          {/* Matrix rain */}
          {Array.from({ length: 20 }, (_, i) => (
            <MatrixChar key={i} x={(i / 19) * 100} delay={i * 0.1} />
          ))}

          {/* Rotating rings */}
          {[300, 220, 140].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 8 - i * 2, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: `${size}px`, height: `${size}px`,
              }}
            >
              <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                <polygon
                  points={
                    Array.from({ length: i === 0 ? 8 : i === 1 ? 6 : 4 }, (_, j) => {
                      const angle = (j / (i === 0 ? 8 : i === 1 ? 6 : 4)) * Math.PI * 2;
                      const r = size / 2 - 4;
                      return `${size/2 + r * Math.cos(angle)},${size/2 + r * Math.sin(angle)}`;
                    }).join(' ')
                  }
                  fill="none"
                  stroke={i === 0 ? 'rgba(34,211,238,0.4)' : i === 1 ? 'rgba(167,139,250,0.4)' : 'rgba(244,114,182,0.4)'}
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          ))}

          {/* Center glow */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: '200px', height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <AnimatePresence>
              {phase >= 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    color: 'rgba(34,211,238,0.7)',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                  }}
                >
                  // SECRET UNLOCKED
                </motion.div>
              )}
            </AnimatePresence>

            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(32px, 6vw, 64px)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  marginBottom: '16px',
                }}>
                  You Found<br />The Secret!
                </div>
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  color: 'rgba(148,163,184,0.8)',
                  lineHeight: 1.8,
                  maxWidth: '400px',
                  margin: '0 auto 32px',
                }}>
                  You just executed the Konami Code on my portfolio.
                  That means you're either a developer, a gamer, or just
                  incredibly curious. I respect all three. 🎮
                </p>

                <div style={{
                  display: 'flex', gap: '12px',
                  justifyContent: 'center', flexWrap: 'wrap',
                  marginBottom: '32px',
                }}>
                  {[
                    { label: '↑↑↓↓←→←→BA', color: '#22d3ee' },
                    { label: 'KONAMI CODE', color: '#a78bfa' },
                    { label: '✓ UNLOCKED', color: '#34d399' },
                  ].map(badge => (
                    <motion.span
                      key={badge.label}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '10px', fontWeight: 700,
                        letterSpacing: '1.5px',
                        color: badge.color,
                        background: `${badge.color}10`,
                        border: `1px solid ${badge.color}30`,
                        padding: '6px 14px', borderRadius: '20px',
                      }}
                    >
                      {badge.label}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActive(false)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px', fontWeight: 700,
                    letterSpacing: '1px',
                    color: '#000',
                    background: '#22d3ee',
                    border: 'none',
                    padding: '13px 32px', borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Close Secret ✕
                </motion.button>

                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px', color: 'rgba(71,85,105,0.8)',
                  marginTop: '16px', letterSpacing: '0.5px',
                }}>
                  Click anywhere to close
                </p>
              </motion.div>
            )}
          </div>

          {/* Corner brackets */}
          {['tl','tr','bl','br'].map((pos, i) => (
            <motion.div
              key={pos}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              style={{
                position: 'absolute',
                ...(pos.startsWith('t') ? { top: '20px' } : { bottom: '20px' }),
                ...(pos.endsWith('l') ? { left: '20px' } : { right: '20px' }),
                width: '20px', height: '20px',
                borderTop: pos.startsWith('t') ? '2px solid rgba(34,211,238,0.5)' : 'none',
                borderBottom: pos.startsWith('b') ? '2px solid rgba(34,211,238,0.5)' : 'none',
                borderLeft: pos.endsWith('l') ? '2px solid rgba(34,211,238,0.5)' : 'none',
                borderRight: pos.endsWith('r') ? '2px solid rgba(34,211,238,0.5)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}