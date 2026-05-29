import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Journey from '../components/Journey';
import { GlowOrb } from '../components/ThreeDCard';

export default function JourneyPage({ theme, toggleTheme }) {
  return (
    <>
      <Head>
        <title>My Journey — S.M. Taseen Kabir</title>
        <meta name="description" content="The life journey of S.M. Taseen Kabir." />
      </Head>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main style={{ paddingTop: '64px', position: 'relative', overflow: 'hidden' }}>
        <GlowOrb color="rgba(34,211,238,0.08)" size={600} top="10%" left="5%" />
        <GlowOrb color="rgba(167,139,250,0.06)" size={500} bottom="20%" right="5%" />
        <Journey />
      </main>
      <Footer />
    </>
  );
}