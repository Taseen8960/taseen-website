import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Goals from '../components/Goals';
import Achievements from '../components/Achievements';
import Interests from '../components/Interests';
import Contact from '../components/Contact';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Programmer | Ethical Hacker | AI Enthusiast";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Homepage Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        {/* Particle Background (Simple CSS Animation) */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}></div>
          ))}
        </div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold text-white mb-4">S.M. Taseen Kabir</h1>
          <p className="text-2xl text-blue-400 mb-6">{typedText}</p>
          <p className="text-lg text-gray-300 mb-8">Innovating at the intersection of security, AI, and code.</p>
          <div className="space-x-4">
            <a href="#projects" className="border border-blue-600 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition">View My Work</a>
            <a href="about" className="border border-blue-600 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition">About Me</a>
          </div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <Skills />
      <Projects />
      <Education />
      <Goals />
      <Achievements />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
}