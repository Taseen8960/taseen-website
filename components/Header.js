import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/photography', label: 'Photos' },
  { href: '/journey', label: 'Journey' },
];

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isLight = theme === 'light';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  // Scroll to section — works from any page
  const scrollToSection = (id) => {
    if (router.pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // After navigating to /#section, scroll to it
  useEffect(() => {
    if (router.pathname === '/' && router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, [router.asPath]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 32px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isLight
            ? 'rgba(248,250,252,0.95)'
            : 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${isLight
            ? 'rgba(0,0,0,0.08)'
            : scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)'}`,
          boxShadow: scrolled
            ? isLight
              ? '0 4px 24px rgba(0,0,0,0.06)'
              : '0 4px 24px rgba(0,0,0,0.3)'
            : 'none',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700, fontSize: '15px',
              color: 'var(--text)', letterSpacing: '0.5px',
              cursor: 'pointer',
            }}
          >
            taseen<span style={{ color: 'var(--cyan)' }}>.dev</span>
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ y: -1 }}
                  style={{
                    display: 'block',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px', fontWeight: 700,
                    color: isActive ? 'var(--cyan)' : 'var(--text2)',
                    padding: '7px 13px', borderRadius: '10px',
                    background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(34,211,238,0.2)' : 'transparent'}`,
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text)';
                      e.currentTarget.style.background = 'var(--surface2)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text2)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </motion.span>
              </Link>
            );
          })}

          {/* Projects scroll */}
          <motion.span
            whileHover={{ y: -1 }}
            onClick={() => scrollToSection('projects')}
            style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px', fontWeight: 700,
              color: 'var(--text2)', padding: '7px 13px',
              borderRadius: '10px', border: '1px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'var(--surface2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text2)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Projects
          </motion.span>

          {/* Contact scroll */}
          <motion.span
            whileHover={{ y: -1 }}
            onClick={() => scrollToSection('contact')}
            style={{
              display: 'block',
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px', fontWeight: 700,
              color: 'var(--text2)', padding: '7px 13px',
              borderRadius: '10px', border: '1px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text)';
              e.currentTarget.style.background = 'var(--surface2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text2)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Contact
          </motion.span>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            style={{
              marginLeft: '8px',
              width: '38px', height: '38px', borderRadius: '12px',
              border: '1px solid var(--border2)',
              background: 'var(--surface)', color: 'var(--text)',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '17px', transition: 'all 0.3s ease',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
        </div>

        {/* Mobile */}
        <div className="mobile-right" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              border: '1px solid var(--border2)',
              background: 'var(--surface)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border2)',
              borderRadius: '10px', padding: '9px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '20px', height: '2px',
                background: 'var(--text)', borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 6px)'
                  : i === 2 ? 'rotate(-45deg) translate(4px, -6px)'
                  : 'scaleX(0)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '72px', left: '12px', right: '12px',
              zIndex: 999,
              background: isLight ? 'rgba(248,250,252,0.97)' : 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(24px)',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              padding: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            {[...navLinks,
              { label: 'Projects', onClick: () => { setMenuOpen(false); scrollToSection('projects'); } },
              { label: 'Contact', onClick: () => { setMenuOpen(false); scrollToSection('contact'); } },
            ].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {link.onClick ? (
                  <span onClick={link.onClick} style={{
                    display: 'block',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px', fontWeight: 700,
                    color: 'var(--text2)', padding: '12px 16px',
                    borderRadius: '12px', cursor: 'pointer',
                  }}>
                    {link.label}
                  </span>
                ) : (
                  <Link href={link.href}>
                    <span style={{
                      display: 'block',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px', fontWeight: 700,
                      color: router.pathname === link.href ? 'var(--cyan)' : 'var(--text2)',
                      padding: '12px 16px', borderRadius: '12px',
                      background: router.pathname === link.href ? 'rgba(34,211,238,0.08)' : 'transparent',
                      cursor: 'pointer',
                    }}>
                      {link.label}
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>
    </>
  );
}