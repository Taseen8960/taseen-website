import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const roles = [
  'Cybersecurity Enthusiast',
  'AI & ML Explorer',
  'Ethical Hacker',
  'Web Developer',
  'Nature Photographer',
  'Writer & Poet',
];

// Interactive Cyber-Geometry Canvas Background
function CyberGeometricBackground({ isLight }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse within canvas
    const mouse = { x: null, y: null, radius: 180 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle/Node Settings
    const particles = [];
    const particleCount = 45; 
    const baseColor = isLight ? '8, 145, 178' : '34, 211, 238'; // Cyan theme
    const secondaryColor = isLight ? '124, 58, 237' : '167, 139, 250'; // Purple theme

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.type = Math.random() > 0.4 ? 'node' : 'geo'; // Nodes vs floating polygons
        this.sides = Math.floor(Math.random() * 3) + 4; // 4 to 6 sides for geometry
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Bounce back from boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interactive push/pull effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.2;
            this.y -= (dy / distance) * force * 1.2;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 'node') {
          // Glow effect for cyber nodes
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseColor}, ${isLight ? 0.4 : 0.7})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgb(${baseColor})`;
          ctx.fill();
        } else {
          // Blueprint style wireframe shapes (Triangle, Diamond, Hexagon)
          ctx.beginPath();
          const radius = this.size * 6;
          for (let i = 0; i < this.sides; i++) {
            const angle = (i * 2 * Math.PI) / this.sides;
            const sx = radius * Math.cos(angle);
            const sy = radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(${secondaryColor}, ${isLight ? 0.12 : 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect nodes with futuristic net lines
    const drawLines = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connect if particles are close enough
          if (distance < 140) {
            const alpha = (1 - distance / 140) * (isLight ? 0.08 : 0.18);
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
            ctx.lineWidth = distance < 60 ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subgrid manually onto canvas for high performance integration
      ctx.strokeStyle = `rgba(${baseColor}, ${isLight ? 0.015 : 0.035})`;
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update & Draw elements
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}

export default function Hero({ theme }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const isLight = theme === 'light';

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    let i = 0;
    let timeout;
    if (typing) {
      const type = () => {
        if (i <= current.length) {
          setDisplayed(current.slice(0, i));
          i++;
          timeout = setTimeout(type, 65);
        } else {
          setTimeout(() => setTyping(false), 1800);
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
          setRoleIndex(p => (p + 1) % roles.length);
          setTyping(true);
        }
      };
      i = current.length;
      erase();
    }
    return () => clearTimeout(timeout);
  }, [roleIndex, typing]);

  // Parallax tracking
  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
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
      {/* নতুন আপগ্রেডেড ইন্টারঅ্যাক্টিভ সাইবার-জ্যামিতিক ব্যাকগ্রাউন্ড */}
      <CyberGeometricBackground isLight={isLight} />

      {/* Parallax glow orbs */}
      <motion.div
        style={{
          position: 'absolute', width: '700px', height: '700px',
          borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none',
          background: isLight
            ? 'radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          top: '-10%', left: '5%',
        }}
        animate={{ x: mousePos.x * -40, y: mousePos.y * -40 }}
        transition={{ type: 'spring', stiffness: 30, damping: 25 }}
      />
      <motion.div
        style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none',
          background: isLight
            ? 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
          bottom: '-10%', right: '5%',
        }}
        animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
        transition={{ type: 'spring', stiffness: 30, damping: 25 }}
      />

      {/* Main content */}
      <div style={{
        textAlign: 'center', zIndex: 1,
        padding: '0 24px', maxWidth: '900px', width: '100%',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--cyan)',
            background: isLight ? 'rgba(8,145,178,0.08)' : 'rgba(34,211,238,0.08)',
            border: `1px solid ${isLight ? 'rgba(8,145,178,0.25)' : 'rgba(34,211,238,0.2)'}`,
            padding: '6px 18px', borderRadius: '20px',
            marginBottom: '32px',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }}
          />
          Available for collaboration
        </motion.div>

        {/* Name Title */}
        <div ref={titleRef} style={{ marginBottom: '16px', overflow: 'hidden' }}>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 6.5vw, 88px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: 0,
              ...(isLight ? {
                color: '#0f172a',
              } : {
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }),
            }}
          >
            S.M. Taseen Kabir
          </motion.h1>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(13px, 2vw, 18px)',
            color: 'var(--cyan)',
            marginBottom: '20px',
            minHeight: '28px',
            letterSpacing: '0.5px',
          }}
        >
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ borderRight: '2px solid var(--cyan)', marginLeft: '1px' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{
            fontSize: 'clamp(13px, 1.6vw, 16px)',
            color: 'var(--text2)',
            maxWidth: '520px',
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
          transition={{ delay: 1.1 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/#projects" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(34,211,238,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.5px', color: '#fff',
                background: 'var(--cyan)',
                padding: '13px 30px', borderRadius: '10px',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            >
              View My Work →
            </motion.a>
          </Link>

          <Link href="/blog" passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.04, borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.5px', color: 'var(--text2)',
                background: 'transparent',
                border: '1px solid var(--border2)',
                padding: '13px 30px', borderRadius: '10px',
                cursor: 'pointer', transition: 'all 0.3s ease',
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
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '6px',
              color: 'var(--text3)',
              fontFamily: "'Space Mono', monospace",
              fontSize: '9px', letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <span>Scroll</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}