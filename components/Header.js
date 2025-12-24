"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Handle scroll shadow
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) setScrolling(true);
      else setScrolling(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth navigation
  const navigateTo = (hash) => {
    setMenuOpen(false);
    if (router.pathname !== "/") {
      router.push(`/${hash}`);
    } else {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolling
          ? "bg-black/90 backdrop-blur-lg shadow-md border-b border-gray-700/40"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 hover:scale-105 transition-transform"
        >
         S.M. Taseen Kabir
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <NavButton label="Home" onClick={() => navigateTo("#home")} />
          <NavLink label="About" href="/about" />
          <NavButton label="Skills" onClick={() => navigateTo("#skills")} />
          <NavButton label="Projects" onClick={() => navigateTo("#projects")} />
          <NavButton label="Contact" onClick={() => navigateTo("#contact")} />
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden flex flex-col space-y-4 bg-black/95 border-t border-gray-800 py-5 text-center text-lg font-medium"
        >
          <NavButton label="Home" onClick={() => navigateTo("#home")} />
          <NavLink label="About" href="/about" />
          <NavButton label="Skills" onClick={() => navigateTo("#skills")} />
          <NavButton label="Projects" onClick={() => navigateTo("#projects")} />
          <NavButton label="Contact" onClick={() => navigateTo("#contact")} />
        </motion.ul>
      )}
    </motion.header>
  );
}

/* ⚡ Small animated link/button component */
function NavButton({ label, onClick }) {
  return (
    <li>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300"
      >
        {label}
        <motion.span
          className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-500"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </li>
  );
}

/* ⚡ Normal navigation link (for /about route etc.) */
function NavLink({ label, href }) {
  return (
    <li>
      <motion.div whileHover={{ scale: 1.1 }} className="relative inline-block">
        <Link
          href={href}
          className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
        >
          {label}
        </Link>
        <motion.span
          className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-500"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </li>
  );
}