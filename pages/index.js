import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home({ theme, toggleTheme }) {
  return (
    <>
      <Head>
        <title>S.M. Taseen Kabir — Portfolio</title>
        <meta name="description" content="S.M. Taseen Kabir — Cybersecurity & AI enthusiast, programmer, writer from Dhaka, Bangladesh." />
      </Head>

      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}