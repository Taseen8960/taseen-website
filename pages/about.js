import { useRef } from 'react';
import Head from 'next/head';
import { motion, useInView } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const facts = [
  { icon: '📍', label: 'Location', value: 'Dhaka, Bangladesh' },
  { icon: '🎓', label: 'Education', value: 'Civil Aviation School & College' },
  { icon: '💻', label: 'Focus', value: 'Cybersecurity & AI' },
  { icon: '🐧', label: 'Daily Driver', value: 'Fedora Linux' },
  { icon: '📸', label: 'Hobby', value: 'Nature Photography' },
  { icon: '✍️', label: 'Passion', value: 'Writing & Poetry' },
];

const values = [
  {
    icon: '🔐',
    title: 'Security First',
    desc: 'I believe every system deserves to be built with security as a foundation — not an afterthought.',
    color: 'var(--cyan)',
  },
  {
    icon: '🤖',
    title: 'AI for Good',
    desc: 'Artificial intelligence should serve humanity — privately, locally, and without surveillance.',
    color: 'var(--purple)',
  },
  {
    icon: '🌿',
    title: 'Mindful Technology',
    desc: 'Technology and nature are not opposites. I find balance between the digital and the natural world.',
    color: 'var(--green)',
  },
  {
    icon: '📖',
    title: 'Lifelong Learning',
    desc: 'Every day is a new page. I never stop reading, building, questioning, and growing.',
    color: 'var(--pink)',
  },
];

function FactCard({ icon, label, value, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 20px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
      }}
    >
      <span style={{ fontSize: '22px' }}>{icon}</span>
      <div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          marginBottom: '2px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text)',
        }}>
          {value}
        </div>
      </div>
    </motion.div>
  );
}

function ValueCard({ icon, title, desc, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = require('react').useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        background: hovered ? 'var(--surface2)' : 'var(--surface)',
        border: `1px solid ${hovered ? color : 'var(--border)'}`,
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 12px 30px ${color}20` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        background: `${color}15`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        marginBottom: '16px',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--text)',
        marginBottom: '8px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--text2)',
        lineHeight: 1.7,
      }}>
        {desc}
      </p>
    </motion.div>
  );
}

export default function About({ theme, toggleTheme }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <Head>
        <title>About — S.M. Taseen Kabir</title>
        <meta
          name="description"
          content="Learn about S.M. Taseen Kabir — cybersecurity enthusiast, AI explorer, programmer, writer, and nature photographer from Dhaka, Bangladesh."
        />
      </Head>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main style={{ paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ padding: '80px 24px 60px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="section-tag">About Me</div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
                marginTop: '32px',
              }}
                className="about-grid"
              >
                {/* Left — Text */}
                <div>
                  <h1 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    fontWeight: 800,
                    color: 'var(--text)',
                    lineHeight: 1.1,
                    marginBottom: '24px',
                  }}>
                    Hi, I'm Taseen 👋
                  </h1>

                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text2)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                  }}>
                    I'm a science student from Dhaka, Bangladesh with a deep passion
                    for cybersecurity, artificial intelligence, and the art of building
                    things from scratch.
                  </p>

                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text2)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                  }}>
                    By day, I'm studying at Civil Aviation School & College.
                    By night, I'm building{' '}
                    <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>
                      Project Cypher
                    </span>
                    {' '}— a portable, AI-powered secure OS — and writing about
                    technology, philosophy, and life.
                  </p>

                  <p style={{
                    fontSize: '16px',
                    color: 'var(--text2)',
                    lineHeight: 1.8,
                    marginBottom: '32px',
                  }}>
                    I believe in working in silence, letting results speak,
                    and finding inspiration everywhere — from a Linux terminal
                    to a quiet nature trail with a camera.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link href="/journey">
                      <motion.span
                        whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(34,211,238,0.3)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'inline-block',
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--bg)',
                          background: 'var(--cyan)',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        My Journey →
                      </motion.span>
                    </Link>

                    <Link href="/blog">
                      <motion.span
                        whileHover={{ scale: 1.04, borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'inline-block',
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--text2)',
                          background: 'transparent',
                          border: '1px solid var(--border2)',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Read My Blog
                      </motion.span>
                    </Link>
                  </div>
                </div>

                {/* Right — Avatar card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '24px',
                    padding: '40px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Avatar */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--cyan), var(--purple))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    margin: '0 auto 20px',
                    boxShadow: '0 0 40px rgba(34,211,238,0.3)',
                  }}>
                    👨‍💻
                  </div>

                  <h2 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: '4px',
                  }}>
                    S.M. Taseen Kabir
                  </h2>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    color: 'var(--cyan)',
                    letterSpacing: '1px',
                    marginBottom: '24px',
                  }}>
                    Cybersecurity & AI Enthusiast
                  </p>

                  {/* Status */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    color: 'var(--green)',
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.25)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                  }}>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--green)',
                        display: 'inline-block',
                      }}
                    />
                    Open to collaborate
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick facts */}
        <section style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-tag" style={{ marginBottom: '32px' }}>Quick Facts</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}>
              {facts.map((fact, i) => (
                <FactCard key={fact.label} {...fact} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '60px 24px 100px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-tag" style={{ marginBottom: '12px' }}>My Values</div>
            <h2 className="section-title" style={{ marginBottom: '40px' }}>
              What I Stand For
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}>
              {values.map((v, i) => (
                <ValueCard key={v.title} {...v} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </>
  );
}