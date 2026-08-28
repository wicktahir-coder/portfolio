"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa6";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Background", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
      <nav
        className={cn(
          "w-full max-w-4xl rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-500 shadow-2xl shadow-black/40 border",
          isScrolled 
            ? "bg-zinc-950/60 backdrop-blur-3xl backdrop-saturate-[150%] border-white/[0.08] py-1.5 sm:py-2" 
            : "bg-zinc-900/40 backdrop-blur-md border-white/5"
        )}
      >
        {/* Brand Name Typography */}
        <Link
          href="#"
          className="text-xs sm:text-sm font-black tracking-tight text-white hover:text-sky-400 transition-colors flex items-center pr-3 sm:pr-4 border-r border-white/10 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="hidden sm:inline font-sans text-white group-hover:text-sky-400 transition-colors tracking-tight">
            {portfolioData.personal.name}
          </span>
          <span className="sm:hidden font-mono text-sky-400 font-bold tracking-wider text-xs">
            AS
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.02] p-1 rounded-full border border-white/[0.05]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 text-zinc-400 hover:text-white",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 hover:bg-[#24292e] text-zinc-300 hover:text-white text-xs font-bold transition-all border border-zinc-700/60 hover:border-white/25 active:scale-95 shadow-sm"
          >
            <FaGithub size={13} />
            <span className="hidden md:inline">GitHub</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-300 p-2 rounded-full hover:bg-zinc-800 active:bg-zinc-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-3 right-3 mt-2.5 max-w-sm mx-auto bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-3.5 border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1.5 md:hidden z-50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/70 active:bg-zinc-800 transition-colors flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                <Sparkles size={13} className="text-zinc-600" />
              </Link>
            ))}
            <Link
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-3.5 py-2.5 rounded-xl bg-[#24292e] hover:bg-[#1b1f23] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 active:scale-[0.98] transition-transform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaGithub size={15} />
              GitHub Profile
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
