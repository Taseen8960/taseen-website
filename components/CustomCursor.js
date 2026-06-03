import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    const handleDown = () => setClicked(true);
    const handleUp = () => setClicked(false);

    // Hover detection
    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
          setHovered(true);
          setLabel(el.dataset.cursor || '');
        });
        el.addEventListener('mouseleave', () => {
          setHovered(false);
          setLabel('');
        });
      });
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      observer.disconnect();
    };
  }, []);

  // Smooth trail
  useEffect(() => {
    let raf;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Hide on touch devices
  }

  return (
    <>
      {/* Main dot */}
      <div style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        width: clicked ? '6px' : '8px',
        height: clicked ? '6px' : '8px',
        borderRadius: '50%',
        background: '#22d3ee',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: hidden ? 0 : 1,
        transition: 'width 0.1s, height 0.1s, opacity 0.3s',
        boxShadow: '0 0 8px rgba(34,211,238,0.8)',
        mixBlendMode: 'screen',
      }} />

      {/* Trailing ring */}
      <div style={{
        position: 'fixed',
        left: trail.x,
        top: trail.y,
        transform: 'translate(-50%, -50%)',
        width: hovered ? '52px' : clicked ? '28px' : '36px',
        height: hovered ? '52px' : clicked ? '28px' : '36px',
        borderRadius: '50%',
        border: `1.5px solid ${hovered ? 'rgba(34,211,238,0.8)' : 'rgba(34,211,238,0.4)'}`,
        pointerEvents: 'none',
        zIndex: 99998,
        opacity: hidden ? 0 : 1,
        transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, opacity 0.3s',
        background: hovered ? 'rgba(34,211,238,0.06)' : 'transparent',
      }}>
        {/* Label inside ring */}
        <AnimatePresence>
          {label && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                fontWeight: 700,
                color: '#22d3ee',
                whiteSpace: 'nowrap',
                letterSpacing: '1px',
              }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
    </>
  );
}