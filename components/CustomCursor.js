import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // অ্যাডভান্সড ডাবল-চেক হোভার ডিটেকশন
      const target = e.target;
      if (target) {
        // ১. স্ট্যান্ডার্ড ট্যাগ ডিটেকশন
        const isHoverable = target.closest('a, button, [role="button"], input, textarea, select, [onClick]');
        
        // ২. ব্যাকআপ ডিটেকশন (যদি বাটনের ভেতরের টেক্সট বা স্প্যান মাউস ব্লক করে)
        const parentAttribute = target.parentElement?.closest('a, button, [role="button"]');
        
        // ৩. ক্লাসনেম বা কন্টেন্ট ডিটেকশন (আপনার বাটনগুলোর নাম ধরে ফোর্স হোভার)
        const textContent = target.textContent?.trim().toLowerCase();
        const isNavButton = textContent === 'projects' || textContent === 'contact' || target.className?.toString().toLowerCase().includes('btn');

        setHovered(!!isHoverable || !!parentAttribute || isNavButton);
      }
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.24;
      trail.current.y += (pos.current.y - trail.current.y) * 0.24;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${trail.current.x}px, ${trail.current.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* ১. মেইন কোর: আনকমন টেক্নো-স্প্লিন্টার */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 999999,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      >
        <div style={{
          width: '16px',
          height: '16px',
          background: hovered ? '#ffffff' : '#22d3ee',
          clipPath: 'polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)',
          transform: hovered 
            ? 'translate(-8px, -8px) rotate(135deg) scale(0.6)' 
            : clicked 
            ? 'translate(-8px, -8px) scale(0.5) rotate(45deg)' 
            : 'translate(-8px, -8px) rotate(15deg)',
          filter: hovered
            ? 'drop-shadow(0 0 10px rgba(255,255,255,0.9))'
            : 'drop-shadow(0 0 8px rgba(34,211,238,0.7))',
          transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }} />
      </div>

      {/* ২. আউটার ট্রেইল: নিউラル লকিং ফ্রেম */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          zIndex: 999998,
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      >
        <div style={{
          width: '28px',
          height: '28px',
          position: 'relative',
          transform: hovered 
            ? 'translate(-14px, -14px) scale(1.4)' 
            : clicked 
            ? 'translate(-14px, -14px) scale(0.7)' 
            : 'translate(-14px, -14px) rotate(-30deg)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderLeft: `1.5px solid ${hovered ? '#ffffff' : 'rgba(34,211,238,0.6)'}`,
            borderTop: `1.5px solid ${hovered ? '#ffffff' : 'rgba(34,211,238,0.6)'}`,
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            opacity: hovered ? 0.3 : 1,
            transition: 'all 0.2s',
          }} />
          
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRight: `1.5px solid ${hovered ? '#ffffff' : 'rgba(34,211,238,0.6)'}`,
            borderBottom: `1.5px solid ${hovered ? '#ffffff' : 'rgba(34,211,238,0.6)'}`,
            clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
            opacity: hovered ? 0.3 : 1,
            transition: 'all 0.2s',
          }} />

          {hovered && (
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '8px', height: '8px',
              border: '1px solid #22d3ee',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              boxShadow: '0 0 12px rgba(34,211,238,0.6)',
              animation: 'cyberGlitchPulse 0.4s infinite linear'
            }} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes cyberGlitchPulse {
          0%, 100% { transform: translate(-50%, -50%) rotate(45deg) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) rotate(45deg) scale(1.3); opacity: 0.4; }
        }
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>
    </>
  );
}