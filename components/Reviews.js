import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const reviews = [
  {
    name: 'Farhan Ahmed',
    role: 'Senior Developer @ TechBD',
    avatar: 'FA',
    avatarColor: 'linear-gradient(135deg, #22d3ee, #6366f1)',
    text: 'Taseen has an incredibly sharp mind for security and systems thinking. His work on Project Cypher shows a level of technical maturity rare for someone his age. A genuine talent to watch.',
    rating: 5,
    tag: 'Cybersecurity',
    tagColor: '#22d3ee',
  },
  {
    name: 'Nadia Rahman',
    role: 'AI Researcher, Dhaka University',
    avatar: 'NR',
    avatarColor: 'linear-gradient(135deg, #a78bfa, #f472b6)',
    text: "What sets Taseen apart is his ability to bridge the gap between security and AI — two fields that most people treat as separate worlds. His writing is clear, thoughtful, and genuinely insightful.",
    rating: 5,
    tag: 'AI & Writing',
    tagColor: '#a78bfa',
  },
  {
    name: 'Rafiq Islam',
    role: 'Freelance Developer',
    avatar: 'RI',
    avatarColor: 'linear-gradient(135deg, #34d399, #60a5fa)',
    text: "Collaborated with Taseen on a web project and was blown away by his attention to detail and clean code. He approaches every problem with curiosity and a drive to build things the right way.",
    rating: 5,
    tag: 'Web Development',
    tagColor: '#34d399',
  },
];

function StarRating({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: 'spring' }}
          style={{
            fontSize: '14px',
            color: i < count ? '#fbbf24' : 'var(--border)',
            filter: i < count ? 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' : 'none',
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -6);
    setRotateY(((x - rect.width / 2) / rect.width) * 6);
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
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: '28px',
          background: hovered ? 'rgba(255,255,255,0.07)' : 'var(--surface)',
          border: `1px solid ${hovered ? review.tagColor + '50' : 'var(--border)'}`,
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateY(-8px)' : 'translateY(0)'}`,
          boxShadow: hovered
            ? `0 24px 60px ${review.tagColor}20, inset 0 1px 0 rgba(255,255,255,0.08)`
            : '0 4px 24px rgba(0,0,0,0.2)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
          cursor: 'default',
          height: '100%',
        }}
      >
        {/* Glow */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 50% 0%, ${review.tagColor}12 0%, transparent 60%)`,
            pointerEvents: 'none', borderRadius: '20px',
          }} />
        )}

        {/* Top shimmer */}
        {hovered && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${review.tagColor}, transparent)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Quote mark */}
        <div style={{
          position: 'absolute', top: '20px', right: '24px',
          fontFamily: 'Georgia, serif',
          fontSize: '64px', lineHeight: 1,
          color: hovered ? review.tagColor : 'rgba(255,255,255,0.04)',
          transition: 'color 0.3s',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          "
        </div>

        {/* Stars */}
        <StarRating count={review.rating} />

        {/* Review text */}
        <p style={{
          fontSize: '14px', color: 'var(--text2)',
          lineHeight: 1.8, marginBottom: '24px',
          fontStyle: 'italic',
          position: 'relative', zIndex: 1,
        }}>
          "{review.text}"
        </p>

        {/* Divider */}
        <div style={{
          width: '40px', height: '1px',
          background: hovered ? review.tagColor : 'var(--border)',
          marginBottom: '20px',
          transition: 'background 0.3s',
        }} />

        {/* Author */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '12px', position: 'relative', zIndex: 1,
        }}>
          {/* Avatar */}
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '12px',
            background: review.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px', fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            boxShadow: hovered ? `0 4px 16px ${review.tagColor}40` : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            {review.avatar}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '15px', fontWeight: 700,
              color: 'var(--text)', marginBottom: '2px',
            }}>
              {review.name}
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: 'var(--text3)',
              letterSpacing: '0.3px',
            }}>
              {review.role}
            </div>
          </div>

          {/* Tag */}
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '1px', textTransform: 'uppercase',
            color: review.tagColor,
            background: `${review.tagColor}10`,
            border: `1px solid ${review.tagColor}25`,
            padding: '3px 8px', borderRadius: '6px',
            whiteSpace: 'nowrap',
          }}>
            {review.tag}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', bottom: '0%', right: '10%',
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(251,191,36,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div className="section-tag">Testimonials</div>
          <h2 className="section-title">What People Say</h2>
          <p style={{
            fontSize: '16px', color: 'var(--text2)',
            maxWidth: '440px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Honest words from people I've worked with,
            collaborated with, and learned alongside.
          </p>
        </motion.div>

        {/* Review cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}>
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            padding: '24px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '5.0', label: 'Average Rating', icon: '★', color: '#fbbf24' },
            { value: '100%', label: 'Recommend Rate', icon: '↑', color: '#34d399' },
            { value: '3+', label: 'Collaborations', icon: '◈', color: '#22d3ee' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '28px', fontWeight: 800,
                color: stat.color, lineHeight: 1,
                marginBottom: '4px',
              }}>
                {stat.icon} {stat.value}
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px', color: 'var(--text3)',
                letterSpacing: '1.5px', textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}