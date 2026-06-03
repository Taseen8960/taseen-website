import '../styles/globals.css';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';
import { AnimatePresence } from 'framer-motion';

const ThreeBackground = dynamic(
  () => import('../components/ThreeBackground'),
  { ssr: false }
);

export default function MyApp({ Component, pageProps, router }) {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <>
      {/* Cursor */}
      <CustomCursor />

      {/* Three.js background */}
      {mounted && !loading && <ThreeBackground theme={theme} />}

      {/* Grid */}
      <div className="grid-bg" />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && mounted && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && mounted && (
        <>
          {/* Header OUTSIDE PageTransition — fixed position নষ্ট হবে না */}
          <Header theme={theme} toggleTheme={toggleTheme} />

          {/* Page content */}
          <PageTransition>
            <Component
              {...pageProps}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </PageTransition>
        </>
      )}
    </>
  );
}