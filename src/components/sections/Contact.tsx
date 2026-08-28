"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioData } from "@/data/portfolio";
import {
  Mail,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import ContactForm from "@/components/ui/ContactForm";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-left",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-right",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 relative bg-[#050507] border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="contact-left lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3 sm:mb-4">
                Get in touch
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-md">
                Have a question, a project proposal, or an engineering role? Send a message through the form or reach out directly.
              </p>
            </div>

            <div className="space-y-4 pt-1 sm:pt-2">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1.5">
                  Email
                </p>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-xs sm:text-sm font-medium text-white hover:text-sky-400 transition-colors break-all"
                  >
                    {portfolioData.personal.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-2">
                  Profiles
                </p>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-[#24292e] text-zinc-300 hover:text-white text-xs font-medium transition-all duration-200"
                  >
                    <FaGithub size={14} />
                    <span>GitHub</span>
                    <ArrowUpRight size={12} className="text-zinc-500 group-hover:text-white" />
                  </a>

                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#0a66c2]/60 hover:bg-[#0a66c2] text-zinc-300 hover:text-white text-xs font-medium transition-all duration-200"
                  >
                    <FaLinkedin size={14} className="text-[#0a66c2] group-hover:text-white" />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={12} className="text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="contact-right lg:col-span-7">
            <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md shadow-2xl">
              <ContactForm accessKey="1bf1cbe1-f836-47ba-b5a4-ba86f07b52bc" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
