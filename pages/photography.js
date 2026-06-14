import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

const photos = [
  {
    id: 1,
    title: 'Morning Mist',
    location: 'Dhaka, Bangladesh',
    category: 'Nature',
    color: '#22d3ee',
    emoji: '🌿',
    desc: 'Early morning fog rolling over the green fields — a moment of pure stillness before the city wakes.',
  },
  {
    id: 2,
    title: 'Golden Hour',
    location: 'Sundarbans, BD',
    category: 'Landscape',
    color: '#fbbf24',
    emoji: '🌅',
    desc: 'The sun dipping below the mangrove horizon, painting the sky in shades of amber and rose.',
  },
  {
    id: 3,
    title: 'Rain on Glass',
    location: 'Dhaka, Bangladesh',
    category: 'Urban',
    color: '#60a5fa',
    emoji: '🌧️',
    desc: 'Raindrops tracing paths down a window — the city blurred and beautiful behind the glass.',
  },
  {
    id: 4,
    title: 'Forest Path',
    location: 'Chittagong Hill Tracts',
    category: 'Nature',
    color: '#34d399',
    emoji: '🌲',
    desc: 'A narrow trail disappearing into the dense green canopy — where silence speaks louder than words.',
  },
  {
    id: 5,
    title: 'Night Sky',
    location: 'Cox\'s Bazar, BD',
    category: 'Astro',
    color: '#a78bfa',
    emoji: '✨',
    desc: 'Stars scattered across the dark canvas above the ocean — a reminder of how vast and beautiful the universe is.',
  },
  {
    id: 6,
    title: 'River Mirror',
    location: 'Padma River, BD',
    category: 'Landscape',
    color: '#f472b6',
    emoji: '🏞️',
    desc: 'The river so still it mirrors the sky perfectly — the boundary between water and sky dissolved.',
  },
];

const categories = ['All', 'Nature', 'Landscape', 'Urban', 'Astro'];

function PhotoCard({ photo, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

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
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(photo)}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)'}`,
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.3s',
          background: hovered ? 'rgba(255,255,255,0.07)' : 'var(--surface)',
          border: `1px solid ${hovered ? photo.color : 'var(--border)'}`,
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: hovered
            ? `0 24px 60px ${photo.color}25, inset 0 1px 0 rgba(255,255,255,0.08)`
            : '0 4px 24px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        {/* Photo placeholder */}
        <div style={{
          height: '220px',
          background: `linear-gradient(135deg, ${photo.color}15 0%, ${photo.color}05 100%)`,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `1px solid ${hovered ? photo.color + '30' : 'var(--border)'}`,
        }}>
          {/* Geometric decoration */}
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '150px', height: '150px',
              opacity: 0.1,
            }}
          >
            <svg viewBox="0 0 150 150">
              <polygon
                points="75,5 145,40 145,110 75,145 5,110 5,40"
                fill="none"
                stroke={photo.color}
                strokeWidth="1"
              />
              <polygon
                points="75,25 125,52 125,98 75,125 25,98 25,52"
                fill="none"
                stroke={photo.color}
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Main emoji */}
          <motion.div
            animate={hovered ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '64px', position: 'relative', zIndex: 1 }}
          >
            {photo.emoji}
          </motion.div>

          {/* Category badge */}
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: photo.color,
            background: `${photo.color}15`,
            border: `1px solid ${photo.color}30`,
            padding: '4px 10px', borderRadius: '20px',
          }}>
            {photo.category}
          </div>

          {/* Hover overlay */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at 50% 50%, ${photo.color}15 0%, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '20px' }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '18px', fontWeight: 800,
            color: 'var(--text)', marginBottom: '4px',
          }}>
            {photo.title}
          </h3>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px', color: photo.color,
            marginBottom: '10px',
          }}>
            <span>📍</span>
            {photo.location}
          </div>

          <p style={{
            fontSize: '13px', color: 'var(--text2)',
            lineHeight: 1.6,
          }}>
            {photo.desc}
          </p>

          {/* View button */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px', fontWeight: 700,
            color: hovered ? photo.color : 'var(--text3)',
            transition: 'color 0.3s',
            marginTop: '16px',
          }}>
            View Photo
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
              →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PhotoModal({ photo, onClose }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            zIndex: 9999,
            background: 'rgba(5,5,8,0.95)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(15,15,26,0.98)',
              border: `1px solid ${photo.color}40`,
              borderRadius: '24px',
              overflow: 'hidden',
              maxWidth: '600px',
              width: '100%',
              boxShadow: `0 32px 80px ${photo.color}20`,
            }}
          >
            {/* Photo area */}
            <div style={{
              height: '320px',
              background: `linear-gradient(135deg, ${photo.color}20 0%, ${photo.color}05 100%)`,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{ fontSize: '96px' }}>{photo.emoji}</div>

              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  width: '36px', height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: '28px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: '12px',
              }}>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '24px', fontWeight: 800,
                  color: 'var(--text)',
                }}>
                  {photo.title}
                </h2>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '9px', fontWeight: 700,
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: photo.color,
                  background: `${photo.color}15`,
                  border: `1px solid ${photo.color}30`,
                  padding: '4px 10px', borderRadius: '20px',
                  whiteSpace: 'nowrap',
                }}>
                  {photo.category}
                </span>
              </div>

              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px', color: photo.color,
                marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                📍 {photo.location}
              </div>

              <p style={{
                fontSize: '14px', color: 'var(--text2)',
                lineHeight: 1.7, marginBottom: '24px',
                fontStyle: 'italic',
              }}>
                "{photo.desc}"
              </p>

              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px', color: 'var(--text3)',
                letterSpacing: '0.3px',
              }}>
                📷 Shot by S.M. Taseen Kabir · Dhaka, Bangladesh
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Photography({ theme, toggleTheme }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const filtered = photos.filter(p =>
    activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <>
      <Head>
        <title>Photography — S.M. Taseen Kabir</title>
        <meta name="description" content="Nature photography by S.M. Taseen Kabir — capturing moments of stillness in a fast-moving world." />
      </Head>

      <main style={{ paddingTop: '64px' }}>
        <section style={{ padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>

          {/* Background glow */}
          <div style={{
            position: 'absolute', top: '10%', left: '50%',
            transform: 'translateX(-50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Header */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{ textAlign: 'center', marginBottom: '60px' }}
            >
              <div className="section-tag">Photography</div>
              <h1 className="section-title">Through My Lens</h1>
              <p style={{
                fontSize: '16px', color: 'var(--text2)',
                maxWidth: '480px', margin: '0 auto 40px',
                lineHeight: 1.7,
              }}>
                Capturing moments of stillness in a fast-moving world.
                Nature, light, and the quiet beauty of everyday life.
              </p>

              {/* Stats */}
              <div style={{
                display: 'flex', justifyContent: 'center',
                gap: '40px', flexWrap: 'wrap', marginBottom: '40px',
              }}>
                {[
                  { value: `${photos.length}+`, label: 'Photos', color: '#22d3ee' },
                  { value: '4+', label: 'Locations', color: '#a78bfa' },
                  { value: '∞', label: 'Moments', color: '#f472b6' },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '32px', fontWeight: 800,
                      color: stat.color, lineHeight: 1, marginBottom: '4px',
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
                ))}
              </div>

              {/* Category filters */}
              <div style={{
                display: 'flex', gap: '8px',
                justifyContent: 'center', flexWrap: 'wrap',
              }}>
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '11px', fontWeight: 700,
                      letterSpacing: '0.5px',
                      padding: '7px 16px', borderRadius: '10px',
                      border: `1px solid ${activeCategory === cat ? 'var(--cyan)' : 'var(--border)'}`,
                      background: activeCategory === cat ? 'rgba(34,211,238,0.1)' : 'var(--surface)',
                      color: activeCategory === cat ? 'var(--cyan)' : 'var(--text2)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Photo Grid */}
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              <AnimatePresence>
                {filtered.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PhotoCard
                      photo={photo}
                      index={i}
                      onClick={setSelectedPhoto}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                textAlign: 'center',
                marginTop: '64px',
                padding: '32px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📷</div>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px', color: 'var(--text3)',
                fontStyle: 'italic', lineHeight: 1.7,
              }}>
                "Photography is the art of frozen time — the ability to store emotion and time."
              </p>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px', color: 'var(--text3)',
                marginTop: '8px', letterSpacing: '0.5px',
              }}>
                More photos coming soon as I explore Bangladesh and beyond.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Photo Modal */}
      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      <Footer />
    </>
  );
}