import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Rotating 3D Hexagon Grid
function HexGrid() {
  const hexagons = Array.from({ length: 19 }, (_, i) => ({
    id: i,
    delay: i * 0.06,
    x: (i % 5) * 80 - 160,
    y: Math.floor(i / 5) * 70 - 100 + (i % 2 === 0 ? 0 : 35),
    size: Math.random() * 20 + 24,
    opacity: Math.random() * 0.12 + 0.04,
  }));

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          initial={{ opacity: 0, scale: 0, rotate: -60 }}
          animate={{ opacity: hex.opacity, scale: 1, rotate: 0 }}
          transition={{ delay: hex.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            left: `calc(50% + ${hex.x}px)`,
            top: `calc(50% + ${hex.y}px)`,
          }}
        >
          <motion.svg
            width={hex.size}
            height={hex.size}
            viewBox="0 0 60 60"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 20 + hex.id * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <polygon
              points="30,2 55,16 55,44 30,58 5,44 5,16"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              opacity="0.6"
            />
            <polygon
              points="30,10 47,20 47,40 30,50 13,40 13,20"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}

// Central 3D Rotating Geometric Core
function GeometricCore({ phase }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', pointerEvents: 'none',
    }}>
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '280px', height: '280px',
        }}
      >
        <svg viewBox="0 0 280 280" width="280" height="280">
          <circle
            cx="140" cy="140" r="138"
            fill="none"
            stroke="rgba(34,211,238,0.12)"
            strokeWidth="1"
            strokeDasharray="8 4"
          />
          {/* Dots on ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle
              key={i}
              cx={140 + 138 * Math.cos(angle * Math.PI / 180)}
              cy={140 + 138 * Math.sin(angle * Math.PI / 180)}
              r="2.5"
              fill="#22d3ee"
              opacity={i % 2 === 0 ? 0.8 : 0.3}
            />
          ))}
        </svg>
      </motion.div>

      {/* Counter-rotating middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', width: '200px', height: '200px' }}
      >
        <svg viewBox="0 0 200 200" width="200" height="200">
          <polygon
            points="100,2 198,50 198,150 100,198 2,150 2,50"
            fill="none"
            stroke="rgba(167,139,250,0.25)"
            strokeWidth="1"
          />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle
              key={i}
              cx={100 + 98 * Math.cos(angle * Math.PI / 180)}
              cy={100 + 98 * Math.sin(angle * Math.PI / 180)}
              r="2"
              fill="#a78bfa"
              opacity="0.6"
            />
          ))}
        </svg>
      </motion.div>

      {/* Inner diamond */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', width: '120px', height: '120px' }}
      >
        <svg viewBox="0 0 120 120" width="120" height="120">
          <polygon
            points="60,4 116,60 60,116 4,60"
            fill="none"
            stroke="rgba(34,211,238,0.4)"
            strokeWidth="1.5"
          />
          <polygon
            points="60,20 100,60 60,100 20,60"
            fill="none"
            stroke="rgba(244,114,182,0.2)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Center glowing core */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '16px', height: '16px',
          background: '#22d3ee',
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          boxShadow: '0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.4)',
        }}
      />

      {/* Core glow */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}

// Scanning line effect
function ScanLine() {
  return (
    <motion.div
      initial={{ top: '-2%' }}
      animate={{ top: '102%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
      style={{
        position: 'absolute',
        left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.6) 30%, rgba(34,211,238,0.9) 50%, rgba(34,211,238,0.6) 70%, transparent 100%)',
        boxShadow: '0 0 20px rgba(34,211,238,0.5), 0 0 40px rgba(34,211,238,0.2)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}

// Binary rain columns
function BinaryRain() {
  const columns = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i / 11) * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
    chars: Array.from({ length: 8 }, () =>
      Math.random() > 0.5 ? '1' : '0'
    ).join(' '),
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {columns.map((col) => (
        <motion.div
          key={col.id}
          initial={{ opacity: 0, y: '-20%' }}
          animate={{ opacity: [0, 0.15, 0], y: '120%' }}
          transition={{
            delay: col.delay,
            duration: col.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${col.x}%`,
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: '#22d3ee',
            letterSpacing: '2px',
            lineHeight: 2,
            writingMode: 'vertical-rl',
          }}
        >
          {col.chars}
        </motion.div>
      ))}
    </div>
  );
}

// Word flip animation
const wordVariants = {
  initial: { opacity: 0, rotateX: 90, y: 20 },
  animate: {
    opacity: 1, rotateX: 0, y: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
  }
};

const words = [
  { text: 'taseen', color: '#f1f5f9' },
  { text: '.', color: 'rgba(34,211,238,0.5)' },
  { text: 'dev', color: '#22d3ee' }
];

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressInterval); return 100; }
        return p + (Math.random() * 8 + 2);
      });
    }, 80);

    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setVisible(false), 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(12px)',
            scale: 1.03,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 99999,
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* 3D perspective grid floor */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: '-20%', right: '-20%',
            height: '50%',
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(400px) rotateX(70deg)',
            transformOrigin: 'bottom',
            pointerEvents: 'none',
          }} />

          {/* Top grid */}
          <div style={{
            position: 'absolute',
            top: 0, left: '-20%', right: '-20%',
            height: '40%',
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(400px) rotateX(-70deg)',
            transformOrigin: 'top',
            pointerEvents: 'none',
          }} />

          {/* Binary rain */}
          <BinaryRain />

          {/* Scan line */}
          <ScanLine />

          {/* Hex grid background */}
          <HexGrid />

          {/* Center geometric core */}
          <GeometricCore phase={phase} />

          {/* Main content */}
          <div style={{
            position: 'relative', zIndex: 10,
            textAlign: 'center',
            transformStyle: 'preserve-3d',
          }}>
            {/* System label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                color: 'rgba(34,211,238,0.5)',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ display: 'inline-block', width: '6px', height: '6px', background: '#22d3ee', borderRadius: '50%' }}
              />
              SYS://BOOT · SECURE · v2.0
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                style={{ display: 'inline-block', width: '6px', height: '6px', background: '#22d3ee', borderRadius: '50%' }}
              />
            </motion.div>

            {/* 3D Word flip logo */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                perspective: '600px',
                transformStyle: 'preserve-3d',
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.3 + i * 0.18 }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 'clamp(32px, 6vw, 60px)',
                    fontWeight: 800,
                    color: word.color,
                    letterSpacing: word.text === '.' ? '0' : '2px',
                    display: 'inline-block',
                    transformOrigin: '50% 100% -20px',
                    backfaceVisibility: 'hidden',
                    textShadow: word.text === 'dev'
                      ? '0 0 30px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.2)'
                      : word.text !== '.'
                      ? '0 8px 20px rgba(0,0,0,0.6)'
                      : 'none',
                  }}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '1px' }}
              animate={{ opacity: 1, letterSpacing: '5px' }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                color: 'rgba(167,139,250,0.6)',
                textTransform: 'uppercase',
                marginBottom: '48px',
              }}
            >
              Cybersecurity · AI · Code
            </motion.div>

            {/* Progress system */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Progress bar */}
              <div style={{
                width: '280px',
                margin: '0 auto',
                marginBottom: '12px',
              }}>
                {/* Track */}
                <div style={{
                  width: '100%', height: '2px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ ease: 'linear' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
                      borderRadius: '2px',
                      position: 'relative',
                    }}
                  >
                    {/* Glowing tip */}
                    <div style={{
                      position: 'absolute', right: 0, top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#22d3ee',
                      boxShadow: '0 0 10px rgba(34,211,238,0.9)',
                    }} />
                  </motion.div>
                </div>
              </div>

              {/* Progress stats row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '280px',
                margin: '0 auto',
              }}>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px',
                    color: 'rgba(34,211,238,0.5)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  // Initializing...
                </motion.div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#22d3ee',
                }}>
                  {Math.min(Math.round(progress), 100)}%
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner brackets */}
          {['tl', 'tr', 'bl', 'br'].map((pos, i) => (
            <motion.div
              key={pos}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 120 }}
              style={{
                position: 'absolute',
                ...(pos.startsWith('t') ? { top: '28px' } : { bottom: '28px' }),
                ...(pos.endsWith('l') ? { left: '28px' } : { right: '28px' }),
                width: '28px', height: '28px',
                borderTop: pos.startsWith('t') ? '2px solid rgba(34,211,238,0.7)' : 'none',
                borderBottom: pos.startsWith('b') ? '2px solid rgba(34,211,238,0.7)' : 'none',
                borderLeft: pos.endsWith('l') ? '2px solid rgba(34,211,238,0.7)' : 'none',
                borderRight: pos.endsWith('r') ? '2px solid rgba(34,211,238,0.7)' : 'none',
                boxShadow: pos.endsWith('l')
                  ? '-2px 0 12px rgba(34,211,238,0.2)'
                  : '2px 0 12px rgba(34,211,238,0.2)',
              }}
            />
          ))}

          {/* Side data strips */}
          {['left', 'right'].map((side) => (
            <motion.div
              key={side}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                position: 'absolute',
                [side]: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: side === 'left' ? 'flex-start' : 'flex-end',
              }}
            >
              {['SEC', 'AI', 'NET', 'ENC'].map((label, i) => (
                <motion.div
                  key={label}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '8px',
                    color: 'rgba(34,211,238,0.5)',
                    letterSpacing: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexDirection: side === 'left' ? 'row' : 'row-reverse',
                  }}
                >
                  <div style={{
                    width: '16px', height: '1px',
                    background: 'rgba(34,211,238,0.4)',
                  }} />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}