import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '../data/blog-posts';

function FloatingBlogCard({ post, index }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const defaultRotateY = index % 3 === 0 ? 10 : index % 3 === 2 ? -10 : 0;

  const handleMouseMove = (e) => {
    if (!hovered) setHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRotateX(((y - rect.height / 2) / rect.height) * -15);
    setRotateY(defaultRotateY + ((x - rect.width / 2) / rect.width) * 15);
    setMouseX((x / rect.width) * 100);
    setMouseY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(defaultRotateY);
  };

  const floatVariants = {
    animate: {
      y: [0, index % 2 === 0 ? -12 : -8, 0],
      rotateZ: [0, index % 2 === 0 ? 0.3 : -0.3, 0],
      transition: {
        duration: 4 + (index % 3) * 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={floatVariants}
      animate="animate"
      style={{ 
        perspective: '1200px', 
        transformStyle: 'preserve-3d',
        flexShrink: 0,
        width: '360px', 
        padding: '10px'
      }}
    >
      <Link href={`/blog/${post.slug}`} draggable="false" style={{ textDecoration: 'none', userSelect: 'none' }}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${hovered ? '50px' : '0px'})`,
            transformStyle: 'preserve-3d',
            transition: hovered ? 'background 0.3s, border-color 0.3s' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s, border-color 0.3s',
            cursor: 'grab',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            // কার্ডের ব্যাকগ্রাউন্ড আরও ট্রান্সপারেন্ট করা হয়েছে যাতে পেছনের ব্যাকগ্রাউন্ড গ্লাস ভেদ করে দেখা যায়
            background: hovered ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${hovered ? post.color : 'rgba(255, 255, 255, 0.05)'}`,
            boxShadow: hovered
              ? `0 40px 100px ${post.color}20, 0 0 40px ${post.color}10, inset 0 1px 1px rgba(255,255,255,0.1)`
              : '0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)',
            backdropFilter: 'blur(12px)', // গ্লাস ইফেক্ট বজায় থাকবে
            display: 'block',
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {/* গ্লেয়ার ইফেক্ট */}
          <div style={{
            position: 'absolute', inset: 0,
            background: hovered 
              ? `radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at ${100 - mouseX}% ${100 - mouseY}%, ${post.color}10 0%, transparent 70%)`
              : 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 100%)',
            pointerEvents: 'none',
            borderRadius: '24px',
            zIndex: 3,
          }} />

          {/* কন্টেন্ট */}
          <div style={{ 
            padding: '28px', 
            transform: hovered ? 'translateZ(25px)' : 'translateZ(0px)',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          }}>
            {/* টপ ওএস বার */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '20px', paddingBottom: '14px',
              borderBottom: `1px solid ${hovered ? post.color + '25' : 'rgba(255,255,255,0.05)'}`,
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
                  <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: hovered ? c : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* টাইটেল এবং আইকন */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${post.color}15`, border: `1px solid ${post.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0
              }}>
                {post.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '17px', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '4px' }}>
                  {post.title}
                </h3>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: post.color }}>{post.tags[0]}</p>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '20px' }}>
              {post.excerpt}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Space Mono', monospace", fontSize: '11px', color: hovered ? post.color : 'rgba(255,255,255,0.4)' }}>
              Read Article →
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function LatestBlogs() {
  const containerRef = useRef(null);
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);

  const duplicatedPosts = [...blogPosts, ...blogPosts, ...blogPosts];

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: '-33.33%', 
        transition: {
          ease: 'linear',
          duration: 25, 
          repeat: Infinity,
        },
      });
    } else {
      controls.stop(); 
    }
  }, [isHovered, controls]);

  return (
    // FIX: background কালার সরিয়ে 'transparent' করা হয়েছে যাতে আপনার মেইন ওয়েবসাইটের ব্যাকগ্রাউন্ড শো করে
    <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
      
      {/* ব্যাকগ্রাউন্ড হোলোগ্রাফিক নিয়ন লাইট (এটির অপাসিটি কিছুটা কমানো হয়েছে যাতে মেইন ব্যাকগ্রাউন্ডের সাথে সুন্দর ব্লেন্ড হয়) */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '900px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      {/* হেডার টেক্সট */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 60px auto', padding: '0 24px' }}>
        <div className="section-tag" style={{ color: 'var(--cyan)', fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Holographic Feed</div>
        <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: '38px', fontWeight: 800, color: '#fff' }}>Floating DevLogs</h2>
      </div>

      {/* ৩ডি ক্যারোসেল কন্টেইনার */}
      <div 
        style={{ width: '100%', overflow: 'hidden', cursor: 'grab' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={containerRef}
          drag="x" 
          dragConstraints={{ left: -2000, right: 0 }} 
          animate={controls}
          style={{
            display: 'flex',
            gap: '20px',
            width: 'max-content',
            padding: '20px 40px',
          }}
        >
          {duplicatedPosts.map((post, i) => (
            <FloatingBlogCard 
              key={`${post.slug}-${i}`} 
              post={post} 
              index={i} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}