"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";
import { SkillPill } from "@/components/ui/SkillCard";
import {
  Code2,
  BrainCircuit,
  MessagesSquare,
  Users2,
  Compass,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOFT_SKILLS = [
  {
    name: "Problem Solving",
    icon: BrainCircuit,
    color: "#38bdf8",
    bgColor: "rgba(56, 189, 248, 0.1)",
    animationClass: "group-hover:scale-115 group-hover:rotate-6",
  },
  {
    name: "Communication",
    icon: MessagesSquare,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    animationClass: "group-hover:scale-115 group-hover:-translate-y-1",
  },
  {
    name: "Teamwork",
    icon: Users2,
    color: "#818cf8",
    bgColor: "rgba(129, 140, 248, 0.1)",
    animationClass: "group-hover:scale-115 group-hover:rotate-3",
  },
  {
    name: "Adaptability",
    icon: Compass,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    animationClass: "group-hover:rotate-180 transition-transform duration-700 ease-out",
  },
  {
    name: "Quick Learner",
    icon: Zap,
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
    animationClass: "group-hover:scale-125 group-hover:-rotate-12",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  let runningIndex = 0;

  useGSAP(
    () => {
      // Header
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-header",
            start: "top 87%",
            once: true,
          },
        }
      );

      // Category headers
      gsap.fromTo(
        ".skills-category-header",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".skills-groups",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Batch animate skill pills as they scroll into view
      ScrollTrigger.batch(".skill-pill-item", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 20, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.5)",
              stagger: 0.04,
              overwrite: true,
            }
          );
        },
        start: "top 90%",
        once: true,
      });

      // Soft skills section reveal
      gsap.fromTo(
        ".soft-skills-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".soft-skills-section",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Soft skills cards stagger reveal
      gsap.fromTo(
        ".soft-skill-card",
        { opacity: 0, y: 25, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.5)",
          stagger: 0.07,
          scrollTrigger: {
            trigger: ".soft-skills-grid",
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-[#050507]"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="skills-header mb-12 sm:mb-20 opacity-0 max-w-3xl">
          <div className="doppelrand-shell !p-1 !rounded-full inline-flex mb-4 sm:mb-6">
            <div className="doppelrand-core px-3.5 py-1.5 flex items-center gap-2 text-xs font-mono font-semibold text-sky-400">
              <Code2 size={13} className="text-sky-400" />
              Technical Skills
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-[1.15] sm:leading-[1.1]">
            Skills & <br />
            <span className="bg-gradient-to-r from-white via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              technologies I use.
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            The programming languages, frameworks, databases, and deployment platforms I work with.
          </p>
        </div>

        {/* Skill Groups */}
        <div className="skills-groups space-y-10 sm:space-y-16">
          {portfolioData.skills.map((group, groupIdx) => {
            const startIndex = runningIndex;
            runningIndex += group.technologies.length;

            return (
              <div key={group.category} className="space-y-4 sm:space-y-6">
                {/* Category Header */}
                <div className="skills-category-header opacity-0 flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-sky-400/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-sky-500/10 border border-sky-500/20">
                      0{groupIdx + 1}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-white tracking-tight font-sans">
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 bg-white/[0.03] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/5">
                    {group.technologies.length} technologies
                  </span>
                </div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-4">
                  {group.technologies.map((tech, i) => (
                    <div
                      key={tech}
                      className="skill-pill-item opacity-0"
                    >
                      <SkillPill name={tech} index={startIndex + i} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
           SOFT SKILLS SUB-SECTION (WITH ANIMATED ICONS)
           ========================================================================= */}
        <div className="soft-skills-section mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-white/5 space-y-4 sm:space-y-6">
          {/* Soft Skills Header */}
          <div className="soft-skills-header opacity-0 flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Soft Skills
            </h3>
            <span className="text-[10px] sm:text-xs font-mono text-zinc-400 bg-white/[0.03] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/5">
              5 attributes
            </span>
          </div>

          {/* Soft Skills Animated Grid */}
          <div className="soft-skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {SOFT_SKILLS.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="soft-skill-card opacity-0 doppelrand-shell !p-1 group cursor-pointer h-full"
                >
                  <div className="doppelrand-core py-3 sm:py-4 px-3 sm:px-3.5 h-full flex items-center relative overflow-hidden bg-[#08080c] group-hover:border-white/20 transition-all duration-300">
                    {/* Dynamic Ambient Background Glow */}
                    <div
                      className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: skill.color }}
                    />

                    {/* Animated Icon Box (Left Side) */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg relative z-10 shrink-0"
                      style={{
                        backgroundColor: skill.bgColor,
                        boxShadow: `0 0 0 1px ${skill.color}25`,
                      }}
                    >
                      <Icon
                        size={18}
                        className={`transition-all duration-300 ${skill.animationClass}`}
                        style={{
                          color: skill.color,
                          filter: `drop-shadow(0 0 8px ${skill.color}80)`,
                        }}
                      />
                    </div>

                    {/* Skill Word (Centered inside remaining card width) */}
                    <div className="flex-1 flex items-center justify-center text-center px-1">
                      <span className="relative z-10 text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors tracking-tight text-center leading-snug">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
