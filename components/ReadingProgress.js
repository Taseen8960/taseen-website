import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '2px',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.04)',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)',
          borderRadius: '0 2px 2px 0',
          position: 'relative',
          transition: 'width 0.1s ease',
        }}
      >
        {/* Glowing tip */}
        <div style={{
          position: 'absolute', right: 0, top: '50%',
          transform: 'translateY(-50%)',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: '#22d3ee',
          boxShadow: '0 0 10px rgba(34,211,238,0.9), 0 0 20px rgba(34,211,238,0.5)',
        }} />
      </motion.div>
    </motion.div>
  );
}