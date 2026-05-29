import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts } from '../../data/blog-posts';
import { ThreeDCard, GlowOrb } from '../../components/ThreeDCard'; // ThreeDCard ও GlowOrb ইম্পোর্ট করা হলো

function BlogCard({ post, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`}>
        {/* ThreeDCard দিয়ে পুরো ব্লগ কার্ডটি র‍্যাপ করা হলো */}
        <ThreeDCard glowColor={`${post.color}25`} intensity={6} style={{ height: '100%' }}>
          <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: hovered ? 'var(--surface2)' : 'var(--surface)',
              border: `1px solid ${hovered ? post.color : 'var(--border)'}`,
              borderRadius: '20px',
              padding: '32px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
              boxShadow: hovered ? `0 20px 50px ${post.color}20` : '0 4px 20px rgba(0,0,0,0.15)',
              transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden',
              height: '100%', // height 100% নিশ্চিত করা হলো যেন ৩ডি কার্ডের সাইজ অনুযায়ী বসে
            }}
          >
            {/* Glow overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 0% 0%, ${post.color}10 0%, transparent 60%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              borderRadius: '20px',
            }} />

            {/* Top row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: `${post.color}15`,
                border: `1px solid ${post.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}>
                {post.icon}
              </div>

              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'var(--text3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span>{post.readTime}</span>
                <span style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--text3)',
                  display: 'inline-block',
                }} />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}</span>
              </div>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              color: 'var(--text)',
              marginBottom: '10px',
              lineHeight: 1.2,
              transition: 'color 0.3s',
            }}>
              {post.title}
            </h2>

            {/* Excerpt */}
            <p style={{
              fontSize: '14px',
              color: 'var(--text2)',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}>
              {post.excerpt}
            </p>

            {/* Tags */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '24px',
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
                  letterSpacing: '0.3px',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Read more */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              color: hovered ? post.color : 'var(--text3)',
              transition: 'color 0.3s ease',
            }}>
              Read Article
              <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </div>
          </motion.div>
        </ThreeDCard>
      </Link>
    </motion.div>
  );
}

export default function BlogIndex({ theme, toggleTheme }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // All unique tags
  const allTags = ['All', ...new Set(blogPosts.flatMap((p) => p.tags))];

  // Filtered posts
  const filtered = blogPosts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === 'All' || post.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <>
      <Head>
        <title>Blog — S.M. Taseen Kabir</title>
        <meta
          name="description"
          content="Articles, thoughts, and insights by S.M. Taseen Kabir on cybersecurity, AI, philosophy, and life."
        />
      </Head>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main style={{ paddingTop: '64px' }}>
        <section style={{ padding: '80px 24px 60px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Header */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '48px' }}
            >
              <div className="section-tag">Blog</div>
              <h1 className="section-title">Articles & Thoughts</h1>
              <p style={{
                fontSize: '16px',
                color: 'var(--text2)',
                maxWidth: '500px',
                lineHeight: 1.7,
              }}>
                Writing about cybersecurity, AI, philosophy, and the quiet
                lessons of building things from scratch.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: '24px' }}
            >
              <div style={{ position: 'relative' }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text3)"
                  strokeWidth="2"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    background: 'var(--surface)',
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
            </motion.div>

            {/* Tag filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '48px',
              }}
            >
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${activeTag === tag ? 'var(--cyan)' : 'var(--border)'}`,
                    background: activeTag === tag ? 'rgba(34,211,238,0.1)' : 'var(--surface)',
                    color: activeTag === tag ? 'var(--cyan)' : 'var(--text2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>

            {/* Posts grid */}
            {filtered.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}>
                {filtered.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                color: 'var(--text3)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                No articles found for "{search}"
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}