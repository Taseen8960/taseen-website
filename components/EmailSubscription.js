import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function EmailSubscription() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.02) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            padding: '56px 48px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '28px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow background */}
          <div style={{
            position: 'absolute', top: '-40px', left: '50%',
            transform: 'translateX(-50%)',
            width: '400px', height: '200px',
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, transparent 70%)',
            filter: 'blur(30px)', pointerEvents: 'none',
          }} />

          {/* Animated ring decoration */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '64px', height: '64px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(167,139,250,0.1))',
                border: '1px solid rgba(34,211,238,0.3)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px', margin: '0 auto 24px',
                boxShadow: '0 8px 32px rgba(34,211,238,0.15)',
              }}
            >
              📡
            </motion.div>

            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--cyan)',
              background: 'rgba(34,211,238,0.08)',
              border: '1px solid rgba(34,211,238,0.2)',
              padding: '4px 14px', borderRadius: '20px',
              marginBottom: '20px',
            }}>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }}
              />
              Newsletter
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800, color: 'var(--text)',
              lineHeight: 1.2, marginBottom: '12px',
            }}>
              Stay in the Loop
            </h2>

            <p style={{
              fontSize: '15px', color: 'var(--text2)',
              lineHeight: 1.7, marginBottom: '36px',
              maxWidth: '440px', margin: '0 auto 36px',
            }}>
              Get notified when I publish new articles on cybersecurity,
              AI, and technology. No spam — only signal.
            </p>

            {/* Form */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '20px 32px',
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.3)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '10px',
                }}
              >
                <span style={{ fontSize: '20px' }}>✓</span>
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '16px', fontWeight: 700,
                    color: '#34d399', marginBottom: '2px',
                  }}>
                    You're in!
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px', color: 'var(--text3)',
                  }}>
                    Check your inbox for a confirmation.
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'flex', gap: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                  <div style={{ position: 'relative', flex: '1', minWidth: '220px', maxWidth: '340px' }}>
                    {/* Email icon */}
                    <svg
                      width="14" height="14"
                      viewBox="0 0 24 24" fill="none"
                      stroke="var(--text3)" strokeWidth="2"
                      style={{
                        position: 'absolute', left: '14px',
                        top: '50%', transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px 14px 40px',
                        background: 'var(--surface2)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        color: 'var(--text)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '13px',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    disabled={status === 'loading'}
                    style={{
                      padding: '14px 28px',
                      background: status === 'loading' ? 'rgba(34,211,238,0.5)' : 'var(--cyan)',
                      color: '#000',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '12px', fontWeight: 700,
                      letterSpacing: '1px', textTransform: 'uppercase',
                      border: 'none', borderRadius: '12px',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      minWidth: '140px',
                    }}
                  >
                    {status === 'loading' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%' }}
                        />
                        Sending...
                      </span>
                    ) : 'Subscribe →'}
                  </motion.button>
                </div>

                {/* Privacy note */}
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '10px', color: 'var(--text3)',
                  marginTop: '14px', letterSpacing: '0.3px',
                }}>
                  🔒 No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}

            {/* Decorative stats */}
            <div style={{
              display: 'flex', justifyContent: 'center',
              gap: '32px', marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}>
              {[
                { value: 'Monthly', label: 'Frequency', color: '#22d3ee' },
                { value: '0', label: 'Spam', color: '#34d399' },
                { value: '∞', label: 'Value', color: '#a78bfa' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '20px', fontWeight: 800,
                    color: stat.color, lineHeight: 1, marginBottom: '2px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '9px', color: 'var(--text3)',
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}