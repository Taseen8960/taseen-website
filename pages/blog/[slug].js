import { useRef } from 'react';
import Head from 'next/head';
import ReadingProgress from '../../components/ReadingProgress'; // ইতিমধ্যে ইম্পোর্ট করা আছে
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Footer from '../../components/Footer';
import { blogPosts } from '../../data/blog-posts';

export async function getStaticPaths() {
  return {
    paths: blogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const index = blogPosts.findIndex((p) => p.slug === params.slug);
  const prev = index > 0 ? blogPosts[index - 1] : null;
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;
  return { props: { post, prev, next } };
}

function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 800,
          color: 'var(--text)',
          lineHeight: 1.2,
          marginBottom: '24px',
          marginTop: '8px',
        }}>
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.3,
          marginBottom: '16px',
          marginTop: '40px',
          paddingLeft: '16px',
          borderLeft: '3px solid var(--cyan)',
        }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{
          margin: '16px 0',
          paddingLeft: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {items.map((item, idx) => (
            <li key={idx} style={{
              fontSize: '16px',
              color: 'var(--text2)',
              lineHeight: 1.7,
              listStyle: 'none',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <span style={{ color: 'var(--cyan)', marginTop: '6px', flexShrink: 0 }}>▸</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith('*— ') || line.startsWith('*—')) {
      elements.push(
        <p key={i} style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '13px',
          color: 'var(--text3)',
          fontStyle: 'italic',
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)',
        }}>
          {line.replace(/\*/g, '')}
        </p>
      );
    } else {
      elements.push(
        <p key={i} style={{
          fontSize: '16px',
          color: 'var(--text2)',
          lineHeight: 1.8,
          marginBottom: '16px',
        }}
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
    i++;
  }

  return elements;
}

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text);font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:var(--text2)">$1</em>')
    .replace(/`(.+?)`/g, '<code style="font-family:Space Mono,monospace;font-size:13px;background:var(--surface2);border:1px solid var(--border);padding:2px 6px;border-radius:4px;color:var(--cyan)">$1</code>');
}

export default function BlogPost({ post, prev, next, theme, toggleTheme }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://taseenkabir.vercel.app/blog/${post.slug}`)}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://taseenkabir.vercel.app/blog/${post.slug}`)}`;
    window.open(url, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://taseenkabir.vercel.app/blog/${post.slug}`);
    alert('Link copied!');
  };

  return (
    <>
      <Head>
        <title>{post.title} — S.M. Taseen Kabir</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Head>

      {/* FIX: ReadingProgress কম্পোনেন্টটি এখানে যুক্ত করা হলো */}
      <ReadingProgress />

      <main style={{ paddingTop: '64px' }}>
        <article style={{ padding: '60px 24px 100px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '40px' }}
            >
              <Link href="/blog">
                <motion.span
                  whileHover={{ x: -4, color: 'var(--cyan)' }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text3)',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                >
                  ← Back to Blog
                </motion.span>
              </Link>
            </motion.div>

            {/* Article header */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '48px' }}
            >
              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: `${post.color}15`,
                border: `1px solid ${post.color}30`,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                fontSize: '30px',
                marginBottom: '24px',
              }}>
                {post.icon}
              </div>

              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '20px',
              }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '10px',
                    fontWeight: 700,
                    color: post.color,
                    background: `${post.color}10`,
                    border: `1px solid ${post.color}25`,
                    padding: '3px 10px',
                    borderRadius: '6px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 800,
                color: 'var(--text)',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}>
                {post.title}
              </h1>

              {/* Meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                color: 'var(--text3)',
                paddingBottom: '32px',
                borderBottom: '1px solid var(--border)',
              }}>
                <span>S.M. Taseen Kabir</span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text3)', display: 'inline-block' }} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text3)', display: 'inline-block' }} />
                <span>{post.readTime}</span>
              </div>
            </motion.div>

            {/* Article content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {renderContent(post.content)}
            </motion.div>

            {/* Share buttons */}
            <div style={{
              marginTop: '60px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
            }}>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--text3)',
                marginBottom: '16px',
              }}>
                Share this article
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { label: '𝕏 Twitter', action: shareOnTwitter, color: '#94a3b8' },
                  { label: 'Facebook', action: shareOnFacebook, color: '#60a5fa' },
                  { label: '🔗 Copy Link', action: copyLink, color: 'var(--cyan)' },
                ].map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ scale: 1.04, borderColor: btn.color, color: btn.color }}
                    whileTap={{ scale: 0.97 }}
                    onClick={btn.action}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      color: 'var(--text2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {btn.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',
              gap: '16px',
              marginTop: '48px',
            }}>
              {prev && (
                <Link href={`/blog/${prev.slug}`}>
                  <motion.div
                    whileHover={{ borderColor: prev.color, y: -4 }}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--text3)',
                      marginBottom: '6px',
                    }}>
                      ← Previous
                    </div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--text)',
                    }}>
                      {prev.title}
                    </div>
                  </motion.div>
                </Link>
              )}
              {next && (
                <Link href={`/blog/${next.slug}`}>
                  <motion.div
                    whileHover={{ borderColor: next.color, y: -4 }}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'right',
                    }}
                  >
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '10px',
                      color: 'var(--text3)',
                      marginBottom: '6px',
                    }}>
                      Next →
                    </div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--text)',
                    }}>
                      {next.title}
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}