"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  outcome: string;
  github?: string;
  demo?: string;
  images?: string[];
  index: number;
}

export function ProjectCard({
  title,
  subtitle,
  description,
  techStack,
  outcome,
  github,
  demo,
  images,
  index,
}: ProjectCardProps) {
  const isEven = index % 2 === 0;
  
  const projectImages = images && images.length > 0 ? images : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto-play timer that pauses on hover/modal
  useEffect(() => {
    if (isHovered || lightboxOpen || projectImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, lightboxOpen, projectImages.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const displayUrl = demo 
    ? demo.replace(/^https?:\/\//, '').replace(/\/$/, '') 
    : `https://${title.toLowerCase().replace(/\s+/g, '')}.dev`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group relative flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center w-full py-4 sm:py-8"
      >
        {/* Doppelrand Browser Chassis Mockup */}
        <div
          className={`w-full lg:w-[48%] aspect-[16/10] ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="doppelrand-shell h-full !p-1 sm:!p-1.5 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
            <div className="doppelrand-core h-full flex flex-col justify-between overflow-hidden relative bg-[#0a0a0f]">
              {/* Browser Top Window Bar */}
              <div className="h-9 sm:h-10 px-3 sm:px-4 bg-black/70 border-b border-white/5 flex items-center justify-between flex-shrink-0 z-20 backdrop-blur-xl">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <a 
                  href={demo || github || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-400 hover:text-sky-400 max-w-[130px] xs:max-w-[180px] sm:max-w-[260px] truncate text-center transition-colors"
                >
                  {displayUrl}
                </a>

                <div className="flex items-center gap-2">
                  {projectImages.length > 0 && (
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="text-zinc-500 hover:text-white p-1 rounded transition-colors"
                      title="Expand View"
                      aria-label="Expand View"
                    >
                      <Maximize2 size={12} />
                    </button>
                  )}
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Project Preview Carousel Area */}
              <div className="relative flex-grow overflow-hidden bg-black flex items-center justify-center select-none group/carousel">
                {/* Subtle Ambient Radial Highlight */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Sliding Viewport or Placeholder */}
                {projectImages.length > 0 ? (
                  <div className="w-full h-full relative overflow-hidden flex items-center">
                    <motion.div
                      className="flex w-full h-full cursor-grab active:cursor-grabbing"
                      animate={{ x: `-${activeImageIndex * 100}%` }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    >
                      {projectImages.map((src, i) => (
                        <div
                          key={i}
                          className="w-full h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-zinc-950/80"
                          onClick={() => setLightboxOpen(true)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`${title} screenshot ${i + 1}`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)]">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-sky-400 mb-3 shadow-inner">
                      <ExternalLink size={20} className="opacity-80" />
                    </div>
                    <p className="text-xs font-mono font-medium text-zinc-400 mb-1">{title}</p>
                    <p className="text-[11px] text-zinc-600 font-mono">Screenshots updating</p>
                  </div>
                )}

                {/* Floating Chevron Navigation Controls */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-80 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 z-30 active:scale-95 shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-80 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-all duration-200 z-30 active:scale-95 shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </>
                )}

                {/* Segmented Glass Indicator Pill Bar */}
                {projectImages.length > 1 && (
                  <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-30 bg-black/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl">
                    <span className="text-[9px] sm:text-[9.5px] font-mono text-zinc-400 font-bold mr-0.5 select-none">
                      {activeImageIndex + 1}/{projectImages.length}
                    </span>
                    {projectImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(i);
                        }}
                        className={`group/dot relative h-1.5 rounded-full transition-all duration-300 ${
                          i === activeImageIndex
                            ? "w-5 sm:w-6 bg-gradient-to-r from-sky-400 to-indigo-400 shadow-sm shadow-sky-400/50"
                            : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Tech Bar */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap px-3 sm:px-4 py-2 sm:py-2.5 bg-black/60 border-t border-white/5">
                {techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] sm:text-[10px] font-mono font-medium px-1.5 sm:px-2 py-0.5 bg-white/[0.03] text-zinc-300 rounded border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Side - Editorial & Impact-focused */}
        <div className={`w-full lg:w-[52%] flex flex-col ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="text-sky-400 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {subtitle}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 group-hover:text-sky-400 transition-colors leading-tight">
            {title}
          </h3>

          {/* Clean Editorial Description */}
          <div className="mb-4 sm:mb-6 max-w-lg">
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-[1.65] font-normal">
              {description}
            </p>
          </div>

          {/* Structured Field: Real Outcome */}
          <div className="mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-white/5 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
              Outcome:
            </span>
            <span className="text-xs sm:text-sm font-medium text-emerald-400">
              {outcome}
            </span>
          </div>

          {/* Action Buttons with Magnetic Springs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-auto">
            {github && (
              <MagneticButton
                as="a"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="flex items-center gap-2 bg-white/[0.04] hover:bg-[#24292e] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-bold transition-all active:scale-[0.98] backdrop-blur-md cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <FaGithub size={14} />
                <span>Source Code</span>
              </MagneticButton>
            )}
            {demo && (
              <MagneticButton
                as="a"
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="group inline-flex items-center bg-sky-500 hover:bg-sky-400 text-zinc-950 pl-4 sm:pl-5 pr-2 py-1.5 rounded-full text-xs font-bold transition-all active:scale-[0.98] shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                <span>Live Demo</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center ml-2 sm:ml-2.5 group-hover:scale-105 group-hover:rotate-45 transition-transform duration-300">
                  <ExternalLink size={11} />
                </span>
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-12 right-0 flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400">
                  {title} • {activeImageIndex + 1}/{projectImages.length}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projectImages[activeImageIndex]}
                  alt={`${title} Preview`}
                  className="w-full h-full object-contain"
                />

                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-transform hover:scale-110 active:scale-95"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

