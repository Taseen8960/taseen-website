import { useState } from 'react';
import { motion } from 'framer-motion';

export function ThreeDCard({ children, style = {}, glowColor = 'rgba(34,211,238,0.2)', intensity = 8 }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -intensity);
    setRotateY(((x - rect.width / 2) / rect.width) * intensity);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)'}`,
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease',
          boxShadow: hovered ? `0 24px 60px ${glowColor}` : '0 4px 24px rgba(0,0,0,0.2)',
          position: 'relative', // Shine overlay পজিশন ঠিক রাখার জন্য যোগ করা হলো
          overflow: 'hidden',  // গ্লো ইফেক্ট বর্ডারের বাইরে যাওয়া আটকানোর জন্য যোগ করা হলো
          ...style,
        }}
      >
        {/* Shine overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: hovered
            ? `radial-gradient(circle at ${50}% 0%, ${glowColor} 0%, transparent 60%)`
            : 'transparent',
          transition: 'background 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        {children}
      </motion.div>
    </div>
  );
}

export function FloatingElement({ children, delay = 0, amplitude = 10 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

export function GlowOrb({ color, size = 400, top, left, right, bottom, opacity = 0.08 }) {
  return (
    <div style={{
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(60px)',
      pointerEvents: 'none',
      top, left, right, bottom,
      opacity,
    }} />
  );
}

export function ParallaxSection({ children, style = {} }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <div onMouseMove={handleMouse} style={{ position: 'relative', ...style }}>
      <motion.div
        animate={{ x: mousePos.x * -20, y: mousePos.y * -20 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{
          position: 'absolute',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          top: '0%', left: '20%',
        }}
      />
      <motion.div
        animate={{ x: mousePos.x * 15, y: mousePos.y * 15 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{
          position: 'absolute',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          bottom: '10%', right: '10%',
        }}
      />
      {children}
    </div>
  );
}