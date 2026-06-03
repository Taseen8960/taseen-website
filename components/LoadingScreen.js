import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = ['t', 'a', 's', 'e', 'e', 'n', '.', 'd', 'e', 'v'];

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0: typing, 1: hold, 2: exit

  useEffect(() => {
    // After letters animate in (~1.2s), hold briefly, then exit
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0a0a0f',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />

          {/* Glow orb */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: '400px', height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* Animated logo text */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1px',
              marginBottom: '32px',
            }}>
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 'clamp(28px, 5vw, 52px)',
                    fontWeight: 700,
                    color: letter === '.' ? 'rgba(34,211,238,0.4)' : i >= 7 ? '#22d3ee' : '#f1f5f9',
                    letterSpacing: letter === '.' ? '0' : '2px',
                    display: 'inline-block',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'rgba(34,211,238,0.6)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '48px',
              }}
            >
              Cybersecurity · AI · Code
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                width: '200px',
                height: '1px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '1px',
                overflow: 'hidden',
                margin: '0 auto',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.6, duration: 1.4, ease: 'easeInOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
                  borderRadius: '1px',
                  position: 'relative',
                }}
              >
                {/* Glowing tip */}
                <div style={{
                  position: 'absolute', right: 0, top: '50%',
                  transform: 'translateY(-50%)',
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: '#22d3ee',
                  boxShadow: '0 0 8px #22d3ee',
                }} />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 0.8, duration: 1.4, times: [0, 0.3, 1] }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '16px',
              }}
            >
              Initializing...
            </motion.div>
          </div>

          {/* Corner decorations */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
            <motion.div
              key={corner}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                position: 'absolute',
                ...(corner.includes('top') ? { top: '24px' } : { bottom: '24px' }),
                ...(corner.includes('left') ? { left: '24px' } : { right: '24px' }),
                width: '20px', height: '20px',
                borderTop: corner.includes('top') ? '1px solid rgba(34,211,238,0.4)' : 'none',
                borderBottom: corner.includes('bottom') ? '1px solid rgba(34,211,238,0.4)' : 'none',
                borderLeft: corner.includes('left') ? '1px solid rgba(34,211,238,0.4)' : 'none',
                borderRight: corner.includes('right') ? '1px solid rgba(34,211,238,0.4)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}