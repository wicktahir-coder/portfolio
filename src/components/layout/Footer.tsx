import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050507] py-8 sm:py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-5 sm:gap-6 relative z-10">
        {/* Left: Brand / Name */}
        <div className="flex justify-center md:justify-start">
          <Link href="#" className="text-xs sm:text-sm font-bold tracking-tight text-white hover:text-sky-400 transition-colors flex items-center gap-2 font-mono group">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover:scale-125 transition-transform" />
            {portfolioData.personal.name}
          </Link>
        </div>

        {/* Center: Social Icons */}
        <div className="flex justify-center items-center gap-2.5 sm:gap-3">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-all p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-[#24292e] hover:border-white/25 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            aria-label="GitHub"
          >
            <FaGithub size={17} />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-all p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:shadow-[0_0_14px_rgba(10,102,194,0.35)] active:scale-[0.98]"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={17} />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="text-zinc-400 hover:text-white transition-all p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 active:scale-[0.98]"
            aria-label="Email"
          >
            <Mail size={17} />
          </a>
        </div>

        {/* Right: Copyright & Role */}
        <div className="flex justify-center md:justify-end">
          <p className="text-[11px] sm:text-xs font-mono text-zinc-500 text-center md:text-right">
            &copy; {currentYear} {portfolioData.personal.name} • {portfolioData.personal.role}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

