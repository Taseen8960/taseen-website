import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  {
    category: 'Security',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.3)',
    gradient: 'linear-gradient(90deg, #22d3ee, #6366f1)',
    icon: '🛡️',
    items: [
      { name: 'Ethical Hacking', level: 47, desc: 'CTF, pen testing basics' },
      { name: 'Cybersecurity', level: 40, desc: 'Network & system security' },
      { name: 'Linux / Fedora', level: 65, desc: 'Daily driver, SELinux' },
    ],
  },
  {
    category: 'Programming',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.3)',
    gradient: 'linear-gradient(90deg, #a78bfa, #ec4899)',
    icon: '⚡',
    items: [
      { name: 'Python', level: 60, desc: 'Automation, AI scripts' },
      { name: 'Web Development', level: 77, desc: 'Next.js, React, CSS' },
      { name: 'HTML', level: 80, desc: 'Semantic & accessible' },
      { name: 'C', level: 15, desc: 'Low-level basics' },
    ],
  },
  {
    category: 'AI & Creative',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.3)',
    gradient: 'linear-gradient(90deg, #f472b6, #fbbf24)',
    icon: '🎨',
    items: [
      { name: 'AI / Machine Learning', level: 65, desc: 'LLMs, local inference' },
      { name: 'Nature Photography', level: 85, desc: 'Composition & editing' },
    ],
  },
];

function SkillBar({ name, level, desc, color, glow, gradient, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '18px 20px',
        borderRadius: '14px',
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 8px 32px ${glow}` : 'none',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shine effect on hover */}
      {hovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 60%)`,
          pointerEvents: 'none',
          borderRadius: '14px',
        }} />
      )}

      {/* Name + Percentage row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '13px',
          fontWeight: 700,
          color: hovered ? color : 'var(--text)',
          transition: 'color 0.3s',
        }}>
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.5 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
            fontWeight: 700,
            color: color,
            background: `${color}15`,
            padding: '2px 10px',
            borderRadius: '20px',
            border: `1px solid ${color}30`,
          }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Progress bar track */}
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '10px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            delay: index * 0.12 + 0.3,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            height: '100%',
            background: gradient,
            borderRadius: '6px',
            position: 'relative',
            boxShadow: hovered ? `0 0 12px ${color}` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Glowing tip */}
          <motion.div
            animate={inView ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
            }}
          />
        </motion.div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '11px',
        color: 'var(--text3)',
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.3px',
        position: 'relative',
        zIndex: 1,
      }}>
        {desc}
      </p>
    </motion.div>
  );
}

function SkillCard({ category, color, glow, gradient, icon, items, cardIndex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -8);
    setRotateY(((x - rect.width / 2) / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: cardIndex * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '24px',
          padding: '28px',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateY(-8px)' : 'translateY(0)'}`,
          boxShadow: hovered
            ? `0 24px 60px ${glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 4px 24px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% -20%, ${glow} 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          borderRadius: '24px',
        }} />

        {/* Category header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '24px',
          paddingBottom: '18px',
          borderBottom: `1px solid ${hovered ? color + '30' : 'rgba(255,255,255,0.06)'}`,
          transition: 'border-color 0.3s ease',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: hovered
              ? `linear-gradient(135deg, ${color}30, ${color}10)`
              : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hovered ? color + '40' : 'rgba(255,255,255,0.08)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            transition: 'all 0.3s ease',
            boxShadow: hovered ? `0 0 20px ${glow}` : 'none',
          }}>
            {icon}
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: hovered ? color : 'var(--text3)',
              transition: 'color 0.3s',
              marginBottom: '3px',
            }}>
              Category
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '20px',
              fontWeight: 800,
              color: 'var(--text)',
            }}>
              {category}
            </div>
          </div>
        </div>

        {/* Skill bars */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          position: 'relative',
          zIndex: 1,
        }}>
          {items.map((skill, si) => (
            <SkillBar
              key={skill.name}
              {...skill}
              color={color}
              glow={glow}
              gradient={gradient}
              index={si}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section style={{
      padding: '100px 24px',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.03) 50%, transparent 100%)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <div className="section-tag">Skills & Expertise</div>
          <h2 className="section-title">What I Work With</h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text2)',
            maxWidth: '480px',
            lineHeight: 1.7,
            margin: '0 auto',
          }}>
            Mastering technology is a lifelong journey — here are the areas
            I'm constantly exploring and improving.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {skills.map((group, gi) => (
            <SkillCard
              key={group.category}
              {...group}
              cardIndex={gi}
            />
          ))}
        </div>
      </div>
    </section>
  );
}