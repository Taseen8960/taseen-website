import { useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Footer from '../components/Footer';
import Link from 'next/link';
import { ThreeDCard, GlowOrb, FloatingElement } from '../components/ThreeDCard';

const facts = [
  { icon: '📍', label: 'Location', value: 'Dhaka, Bangladesh', color: '#22d3ee' },
  { icon: '🎓', label: 'Education', value: 'Civil Aviation S&C', color: '#a78bfa' },
  { icon: '💻', label: 'Focus', value: 'Cybersecurity & AI', color: '#f472b6' },
  { icon: '🐧', label: 'Daily Driver', value: 'Fedora Linux', color: '#34d399' },
  { icon: '📸', label: 'Hobby', value: 'Nature Photography', color: '#fbbf24' },
  { icon: '✍️', label: 'Passion', value: 'Writing & Poetry', color: '#60a5fa' },
];

const values = [
  { icon: '🔐', title: 'Security First', desc: 'Every system deserves security as a foundation — not an afterthought.', color: '#22d3ee', glow: 'rgba(34,211,238,0.2)' },
  { icon: '🤖', title: 'AI for Good', desc: 'Artificial intelligence should serve humanity — privately, locally, and without surveillance.', color: '#a78bfa', glow: 'rgba(167,139,250,0.2)' },
  { icon: '🌿', title: 'Mindful Technology', desc: 'Technology and nature are not opposites. I find balance between digital and natural world.', color: '#34d399', glow: 'rgba(52,211,153,0.2)' },
  { icon: '📖', title: 'Lifelong Learning', desc: 'Every day is a new page. I never stop reading, building, questioning, and growing.', color: '#f472b6', glow: 'rgba(244,114,182,0.2)' },
];

const stats = [
  { value: '3+', label: 'Years Coding', color: '#22d3ee' },
  { value: '2', label: 'Live Projects', color: '#a78bfa' },
  { value: '∞', label: 'Curiosity', color: '#f472b6' },
  { value: '1', label: 'Vision', color: '#34d399' },
];

function PhotoCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -12);
    setRotateY(((x - rect.width / 2) / rect.width) * 12);
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div style={{ perspective: '1000px', flexShrink: 0 }}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setHovered(false); setRotateX(0); setRotateY(0); }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
          width: '280px',
        }}
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', inset: '-4px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)',
            zIndex: 0,
            filter: 'blur(8px)',
            opacity: 0.6,
          }}
        />

        {/* Card */}
        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: '24px',
          overflow: 'hidden',
          border: '2px solid rgba(34,211,238,0.3)',
          boxShadow: hovered
            ? '0 32px 80px rgba(34,211,238,0.3), 0 0 0 1px rgba(34,211,238,0.2)'
            : '0 20px 60px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.3s ease',
        }}>
          {/* Shine overlay */}
          {hovered && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
              pointerEvents: 'none',
            }} />
          )}

          {/* Photo */}
          <img
            src="/taseen.jpg"
            alt="S.M. Taseen Kabir"
            style={{
              width: '100%',
              height: '360px',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
              filter: 'contrast(1.05) brightness(1.02) saturate(1.08)',
            }}
          />

          {/* Bottom info overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(10,10,15,0.95))',
            padding: '40px 20px 20px',
            zIndex: 1,
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '16px', fontWeight: 800,
              color: '#fff', marginBottom: '4px',
            }}>
              S.M. Taseen Kabir
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', color: '#22d3ee',
              letterSpacing: '1px',
            }}>
              Cybersecurity & AI Enthusiast
            </div>
          </div>
        </div>

        {/* Status badge */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            position: 'absolute', top: '-12px', right: '-12px', zIndex: 3,
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: "'Space Mono', monospace", fontSize: '10px',
            color: '#34d399',
            background: 'rgba(10,10,15,0.9)',
            border: '1px solid rgba(52,211,153,0.4)',
            padding: '6px 12px', borderRadius: '20px',
            backdropFilter: 'blur(12px)',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }}
          />
          Available
        </motion.div>

        {/* Dhaka badge */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            position: 'absolute', bottom: '-12px', left: '-12px', zIndex: 3,
            fontFamily: "'Space Mono', monospace", fontSize: '10px',
            color: '#a78bfa',
            background: 'rgba(10,10,15,0.9)',
            border: '1px solid rgba(167,139,250,0.4)',
            padding: '6px 12px', borderRadius: '20px',
            backdropFilter: 'blur(12px)',
          }}
        >
          📍 Dhaka, BD
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function About({ theme, toggleTheme }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const factsRef = useRef(null);
  const factsInView = useInView(factsRef, { once: true });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true });

  return (
    <>
      <Head>
        <title>About — S.M. Taseen Kabir</title>
        <meta name="description" content="Learn about S.M. Taseen Kabir — cybersecurity enthusiast, AI explorer, programmer, writer, and nature photographer from Dhaka, Bangladesh." />
      </Head>


      <main style={{ paddingTop: '64px' }}>

        {/* ===== HERO SECTION ===== */}
        <section style={{ padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
          <GlowOrb color="rgba(34,211,238,0.1)" size={600} top="-10%" left="5%" />
          <GlowOrb color="rgba(167,139,250,0.08)" size={500} top="20%" right="-5%" />
          <GlowOrb color="rgba(244,114,182,0.06)" size={400} bottom="0%" left="40%" />

          {/* Particles */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {[...Array(15)].map((_, i) => (
              <motion.div key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  borderRadius: '50%',
                  background: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a78bfa' : '#f472b6',
                }}
                animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: Math.random() * 3 + 3, delay: Math.random() * 2, repeat: Infinity }}
              />
            ))}
          </div>

          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="section-tag">About Me</div>

              <div style={{
                display: 'flex',
                gap: '60px',
                alignItems: 'center',
                marginTop: '40px',
                flexWrap: 'wrap',
              }}>
                {/* Photo */}
                <PhotoCard />

                {/* Text content */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(28px, 4vw, 52px)',
                      fontWeight: 800,
                      color: 'var(--text)',
                      lineHeight: 1.1,
                      marginBottom: '8px',
                    }}
                  >
                    Hi, I'm Taseen 👋
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '12px', color: '#22d3ee',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      marginBottom: '24px',
                    }}
                  >
                    Programmer · Ethical Hacker · AI Explorer
                  </motion.div>

                  {[
                    "I'm a science student from Dhaka, Bangladesh with a deep passion for cybersecurity, artificial intelligence, and the art of building things from scratch.",
                    "By day, I study at Civil Aviation School & College. By night, I build Project Cypher — a portable, AI-powered secure OS — and write about technology, philosophy, and life.",
                    "I believe in working in silence, letting results speak, and finding inspiration everywhere — from a Linux terminal to a quiet nature trail with a camera.",
                  ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      style={{
                        fontSize: '15px', color: 'var(--text2)',
                        lineHeight: 1.8, marginBottom: '14px',
                      }}
                    >
                      {i === 1 ? (
                        <>
                          By day, I study at Civil Aviation School & College. By night, I build{' '}
                          <span style={{ color: '#22d3ee', fontWeight: 600 }}>Project Cypher</span>
                          {' '}— a portable, AI-powered secure OS — and write about technology, philosophy, and life.
                        </>
                      ) : text}
                    </motion.p>
                  ))}

                  {/* CTA buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}
                  >
                    <Link href="/journey">
                      <motion.span
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'inline-block',
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '12px', fontWeight: 700,
                          color: '#fff', background: '#22d3ee',
                          padding: '12px 24px', borderRadius: '10px', cursor: 'pointer',
                        }}
                      >
                        My Journey →
                      </motion.span>
                    </Link>
                    <Link href="/blog">
                      <motion.span
                        whileHover={{ scale: 1.05, borderColor: '#22d3ee', color: '#22d3ee' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'inline-block',
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '12px', fontWeight: 700,
                          color: 'var(--text2)', background: 'transparent',
                          border: '1px solid var(--border2)',
                          padding: '12px 24px', borderRadius: '10px', cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Read My Blog
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section style={{ padding: '20px 24px 60px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
            }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ThreeDCard
                    glowColor={`${stat.color}30`}
                    intensity={8}
                    style={{
                      padding: '24px 20px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '36px', fontWeight: 800,
                        color: stat.color, lineHeight: 1,
                        marginBottom: '6px',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '10px', color: 'var(--text3)',
                        letterSpacing: '1.5px', textTransform: 'uppercase',
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== QUICK FACTS ===== */}
        <section style={{ padding: '20px 24px 60px' }} ref={factsRef}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={factsInView ? { opacity: 1, y: 0 } : {}}
              style={{ marginBottom: '28px' }}
            >
              <div className="section-tag">Quick Facts</div>
            </motion.div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
            }}>
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={factsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                >
                  <ThreeDCard
                    glowColor={`${fact.color}25`}
                    intensity={7}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '16px 20px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '14px',
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px',
                      background: `${fact.color}15`,
                      border: `1px solid ${fact.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px', flexShrink: 0,
                      position: 'relative', zIndex: 1,
                    }}>
                      {fact.icon}
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        fontFamily: "'Space Mono', monospace", fontSize: '9px',
                        fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                        color: fact.color, marginBottom: '2px',
                      }}>{fact.label}</div>
                      <div style={{
                        fontSize: '13px', fontWeight: 600,
                        color: 'var(--text)',
                      }}>{fact.value}</div>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== VALUES ===== */}
        <section style={{ padding: '20px 24px 100px', position: 'relative', overflow: 'hidden' }} ref={valuesRef}>
          <GlowOrb color="rgba(167,139,250,0.06)" size={500} top="0%" right="0%" />
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              style={{ marginBottom: '12px' }}
            >
              <div className="section-tag">My Values</div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-title"
              style={{ marginBottom: '40px' }}
            >
              What I Stand For
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <ThreeDCard
                    glowColor={v.glow}
                    style={{
                      padding: '28px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '20px',
                      height: '100%',
                    }}
                  >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          width: '52px', height: '52px', borderRadius: '14px',
                          background: v.glow,
                          border: `1px solid ${v.color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '24px', marginBottom: '16px',
                          cursor: 'default',
                        }}
                      >
                        {v.icon}
                      </motion.div>
                      <h3 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '18px', fontWeight: 700,
                        color: 'var(--text)', marginBottom: '8px',
                      }}>{v.title}</h3>
                      <p style={{
                        fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7,
                      }}>{v.desc}</p>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .about-flex { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
}