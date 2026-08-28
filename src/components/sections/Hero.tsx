"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GSAPMarquee } from "@/components/ui/gsap-marquee";
import { ResumeModal } from "@/components/ui/resume-modal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TYPED_WORDS = ["ASARUDEEN S", "MERN STACK DEV"];

const MARQUEE_ITEMS = [
  "MERN Stack",
  "React.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Socket.io",
  "Redis",
  "REST APIs",
  "JWT",
  "Zustand",
  "Vite",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "GitHub",
  "Render",
  "Railway",
  "Vercel",
  "Cloudinary",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth typewriter loop cycling between ASARUDEEN S and MERN STACK DEV
  useEffect(() => {
    const currentWord = TYPED_WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (typedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        }, 90);
      } else {
        // Pause when word is completely typed
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentWord.slice(0, typedText.length - 1));
        }, 45);
      } else {
        // Switch to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPED_WORDS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, wordIndex]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-visual",
        { opacity: 0, x: -40, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9 }
      )
        // Background text reveal behind the pic
        .fromTo(
          ".hero-bg-text",
          { opacity: 0, scale: 0.8, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".hero-pill",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.7"
        )
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-marquee",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );

      // 3D Card Tilt Interaction (Emil Kowalski style detail)
      const visualEl = containerRef.current?.querySelector(".hero-visual .doppelrand-shell") as HTMLElement;
      if (visualEl) {
        const onMouseMove = (e: MouseEvent) => {
          const rect = visualEl.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(visualEl, {
            rotateY: x * 0.05,
            rotateX: -y * 0.05,
            x: x * 0.04,
            y: y * 0.04,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            overwrite: "auto",
          });
        };
        
        const onMouseLeave = () => {
          gsap.to(visualEl, {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
            overwrite: "auto",
          });
        };
        
        visualEl.addEventListener("mousemove", onMouseMove);
        visualEl.addEventListener("mouseleave", onMouseLeave);
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 sm:pt-32 pb-0 overflow-hidden bg-[#050507]"
    >
      {/* Ambient Radial Spotlight & Glows */}
      <div className="absolute top-1/4 left-1/3 w-[60rem] h-[35rem] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-[24rem] h-[24rem] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay with Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        
        {/* Left Visual - Profile Picture with Luminous Blue Border Effects on Hover */}
        <div className="hero-visual w-full lg:w-[42%] relative flex justify-center items-center opacity-0 shrink-0 mb-2 sm:mb-6 lg:mb-0">
          {/* Huge background text behind the picture */}
          <div className="absolute -z-10 text-[3.2rem] xs:text-[4.5rem] sm:text-[7rem] md:text-[8.5rem] lg:text-[9.5rem] font-black tracking-tighter text-[#141418]/60 select-none pointer-events-none hero-bg-text font-sans uppercase leading-none text-center transform -translate-y-4 sm:-translate-y-8 max-w-full overflow-hidden">
            Asarudeen
          </div>

          <div className="relative group w-[240px] xs:w-[270px] sm:w-[340px] lg:w-[400px] max-w-[85vw] aspect-[3/4]">
            {/* Diffuse Outer Blue Glow Flare on Hover */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/30 via-cyan-400/20 to-blue-600/30 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

            {/* Doppelrand Outer Shell with Blue Neon Border Glow */}
            <div className="doppelrand-shell !p-2 sm:!p-2.5 !rounded-3xl w-full h-full shadow-2xl overflow-hidden group-hover:border-sky-400/60 group-hover:shadow-[0_0_35px_rgba(56,189,248,0.3),0_0_70px_rgba(14,165,233,0.15)] transition-all duration-500 relative">
              {/* Dynamic Blue Border Edge Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/0 via-sky-400/0 to-cyan-300/0 group-hover:from-sky-500/25 group-hover:via-sky-400/15 group-hover:to-cyan-300/25 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0" />

              <div className="doppelrand-core !rounded-[calc(1.5rem)] overflow-hidden h-full w-full relative z-10 bg-[#08080c] border border-white/5 group-hover:border-sky-400/40 group-hover:shadow-[inset_0_0_24px_rgba(56,189,248,0.15)] transition-all duration-500">
                {/* High-Performance Next.js Optimized Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/asar-new.jpg"
                    alt="Asarudeen S"
                    fill
                    priority
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 340px, 400px"
                    className="object-cover object-center contrast-[1.05] brightness-[0.99] saturate-[1.06] group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  />

                  {/* Subtle Cinematic Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />

                  {/* Smooth Glass Sheen Shine Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-200/[0.15] to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none z-20" />

                  {/* Seamless Bottom Card Gradient Blend */}
                  <div className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent pointer-events-none z-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[60%] pt-2 sm:pt-4 lg:pt-0 z-20 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Doppelrand Top Status Pill with Continuous Typing Loop */}
          <div className="hero-pill mb-4 sm:mb-6 inline-flex opacity-0">
            <div className="doppelrand-shell !p-1 !rounded-full">
              <div className="doppelrand-core px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2 font-mono text-zinc-300">
                <span className="relative flex h-2.5 w-2.5 shrink-0 mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                <span className="text-sky-400 font-bold tracking-wider font-mono flex items-center text-xs sm:text-base md:text-lg whitespace-nowrap">
                  <span>{typedText || "\u00A0"}</span>
                  <span className="inline-block w-[2px] sm:w-[2.5px] h-3.5 sm:h-5 bg-sky-400 ml-1.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
                </span>
              </div>
            </div>
          </div>

          {/* Core Headline */}
          <h1 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 text-white leading-[1.15] sm:leading-[1.1] max-w-2xl opacity-0">
            Full-stack developer building{" "}
            <span className="bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
              scalable web systems.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-sm sm:text-base md:text-lg text-zinc-400 mb-6 sm:mb-9 max-w-xl font-normal leading-relaxed opacity-0">
            {portfolioData.personal.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="hero-ctas flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 opacity-0 w-full">
            <MagneticButton
              as="a"
              href="#projects"
              strength={0.25}
              className="group relative inline-flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-950 pl-5 sm:pl-6 pr-2 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>View Projects</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-950 text-white flex items-center justify-center ml-2.5 sm:ml-3 group-hover:scale-105 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={14} />
              </span>
            </MagneticButton>

            <MagneticButton
              as="button"
              onClick={() => setIsResumeOpen(true)}
              strength={0.25}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-sky-500/30 hover:border-sky-400 bg-white/[0.04] text-white hover:text-zinc-950 pl-5 sm:pl-6 pr-2 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xl transition-all duration-300 cursor-pointer active:scale-[0.98] backdrop-blur-xl"
            >
              {/* Smooth Fill-Up Background Animation */}
              <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full -z-10" />

              <span className="relative z-10 transition-colors duration-300">View Resume</span>
              <span className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-zinc-950 text-sky-400 group-hover:text-white flex items-center justify-center ml-2.5 sm:ml-3 group-hover:scale-105 transition-all duration-300">
                <FileText size={13} className="transition-colors duration-300" />
              </span>
            </MagneticButton>

            <div className="flex items-center gap-2 sm:ml-2">
              <MagneticButton
                as="a"
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.35}
                className="p-3 sm:p-3.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-[#24292e] hover:border-white/30 hover:shadow-[0_0_16px_rgba(255,255,255,0.12)] transition-all duration-300 backdrop-blur-2xl cursor-pointer active:scale-95"
                aria-label="GitHub Profile"
              >
                <FaGithub size={17} />
              </MagneticButton>
              <MagneticButton
                as="a"
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.35}
                className="p-3 sm:p-3.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] transition-all duration-300 backdrop-blur-2xl cursor-pointer active:scale-95"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={17} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* In-app PDF Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        pdfUrl="/asaru (1).pdf"
        title="Asarudeen S — Resume.pdf"
      />

      {/* Marquee Ticker Strip */}
      <div className="hero-marquee w-full mt-16 pb-8 opacity-0 relative z-10">
        <div className="border-t border-b border-white/5 py-4">
          <GSAPMarquee
            items={MARQUEE_ITEMS}
            speed={35}
            className="py-1"
            itemClassName="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-widest px-4 flex items-center gap-4 before:content-['✦'] before:text-sky-500/60 before:mr-4"
          />
        </div>
      </div>
    </section>
  );
}
