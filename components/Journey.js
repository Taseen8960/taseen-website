import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { journeyData } from '../data/journey';
import { ThreeDCard } from './ThreeDCard'; // ThreeDCard ইম্পোর্ট করা হলো

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        position: 'relative',
        marginBottom: isLast ? 0 : '48px',
      }}
    >
      {/* Width wrapper — ThreeDCard এর ফুল উইডথ প্রবলেম ফিক্স করার জন্য */}
      <div style={{ width: 'calc(50% - 40px)' }}>
        <ThreeDCard
          glowColor={`${item.color}25`}
          intensity={6}
          style={{
            width: '100%',
            background: 'var(--surface)',
            border: `1px solid var(--border)`,
            borderRadius: '20px',
            padding: '28px',
            position: 'relative',
            cursor: 'default',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Current badge */}
            {item.current && (
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: item.color,
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}40`,
                  padding: '3px 10px',
                  borderRadius: '20px',
                }}
              >
                ● Now
              </motion.div>
            )}

            {/* Year */}
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: item.color,
              marginBottom: '10px',
              textTransform: 'uppercase',
            }}>
              {item.year}
            </div>

            {/* Icon + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  color: item.color,
                  letterSpacing: '0.3px',
                }}>
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '13px',
              color: 'var(--text2)',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}>
              {item.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text3)',
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: '28px',
              [isLeft ? 'right' : 'left']: '-10px',
              width: '0',
              height: '0',
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              [isLeft ? 'borderLeft' : 'borderRight']: `10px solid ${hovered ? item.color : 'var(--border)'}`,
              transition: 'border-color 0.3s ease',
            }} />
          </motion.div>
        </ThreeDCard>
      </div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '28px',
          transform: 'translate(-50%, 0)',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: item.current ? item.color : 'var(--bg)',
          border: `3px solid ${item.color}`,
          boxShadow: hovered || item.current ? `0 0 20px ${item.color}` : 'none',
          transition: 'box-shadow 0.3s ease',
          zIndex: 2,
        }}
      />
    </div>
  );
}

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div className="section-tag">Life Journey</div>
          <h2 className="section-title">My Story So Far</h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--text2)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Every chapter has shaped who I am today.
            This is my timeline — honest, personal, and still unfolding.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, var(--cyan), var(--purple), var(--pink))',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
              opacity: 0.4,
            }}
          />

          {/* Items */}
          {journeyData.map((item, i) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={i}
              isLast={i === journeyData.length - 1}
            />
          ))}
        </div>

        {/* Bottom — Future */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: '64px',
            padding: '32px',
            border: '1px dashed var(--border2)',
            borderRadius: '20px',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>∞</div>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
            color: 'var(--text3)',
            fontStyle: 'italic',
          }}>
            The next chapter is being written...
          </p>
        </motion.div>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-item-card {
            width: 100% !important;
            margin-left: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}