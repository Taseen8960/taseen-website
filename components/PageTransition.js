import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Scan line overlay
function ScanLine({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, transformOrigin: 'bottom' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'linear-gradient(180deg, rgba(34,211,238,0.04) 0%, rgba(10,10,15,0.98) 50%, rgba(34,211,238,0.04) 100%)',
            pointerEvents: 'none',
          }}
        >
          {/* Scan line effect */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 0.4, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: 0, right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
              boxShadow: '0 0 20px rgba(34,211,238,0.8)',
            }}
          />
          {/* Corner brackets */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              ...(pos.startsWith('t') ? { top: '20px' } : { bottom: '20px' }),
              ...(pos.endsWith('l') ? { left: '20px' } : { right: '20px' }),
              width: '24px', height: '24px',
              borderTop: pos.startsWith('t') ? '2px solid rgba(34,211,238,0.6)' : 'none',
              borderBottom: pos.startsWith('b') ? '2px solid rgba(34,211,238,0.6)' : 'none',
              borderLeft: pos.endsWith('l') ? '2px solid rgba(34,211,238,0.6)' : 'none',
              borderRight: pos.endsWith('r') ? '2px solid rgba(34,211,238,0.6)' : 'none',
            }} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -16, filter: 'blur(4px)' },
};

export default function PageTransition({ children }) {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const handleStart = () => setScanning(true);
    const handleEnd = () => setScanning(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError', handleEnd);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError', handleEnd);
    };
  }, [router]);

  return (
    <>
      <ScanLine visible={scanning} />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}