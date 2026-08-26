"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  title?: string;
}

export function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = "/asaru (1).pdf",
  title = "Asarudeen S — Resume.pdf",
}: ResumeModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setIsFullscreen(false);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const encodedUrl = encodeURI(pdfUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Ambient Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
            aria-hidden="true"
          />

          {/* Ambient Lighting Behind Window */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

          {/* Window Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className={`relative w-full ${
              isFullscreen
                ? "max-w-none h-[98vh]"
                : "max-w-5xl h-[94vh] sm:h-[88vh]"
            } bg-[#09090c] border border-white/10 rounded-xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden z-10 transition-all duration-300`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-white/10 bg-[#0c0c10]/95 backdrop-blur-2xl shrink-0 select-none">
              {/* Left: Window Controls & Title */}
              <div className="flex items-center gap-2 sm:gap-4 overflow-hidden min-w-0 pr-2">
                {/* Mac-style Traffic Light Buttons (Desktop) */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer"
                    title="Close"
                    aria-label="Close"
                  />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
                    title="Toggle Fullscreen"
                    aria-label="Toggle Fullscreen"
                  />
                  <a
                    href={encodedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer"
                    title="Open in new tab"
                    aria-label="Open in new tab"
                  />
                </div>

                <div className="h-4 w-px bg-white/10 hidden sm:block shrink-0" />

                {/* File Details */}
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                    <FileText size={14} />
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                      {title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-zinc-400 truncate">
                      Asarudeen S • Resume
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Actions Island */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Download Button */}
                <a
                  href={encodedUrl}
                  download="Asarudeen_S_Resume.pdf"
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 text-xs font-semibold tracking-wide transition-all active:scale-95 shrink-0"
                  title="Download Resume PDF"
                >
                  <Download size={13} className="text-sky-400" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Open in Tab Button */}
                <a
                  href={encodedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white border border-white/10 text-xs font-semibold tracking-wide transition-all active:scale-95 shrink-0"
                  title="Open in new tab"
                >
                  <ExternalLink size={13} className="text-zinc-400" />
                  <span className="hidden md:inline">Open Tab</span>
                </a>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden md:inline-flex p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 transition-colors active:scale-95 cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg sm:rounded-xl bg-white/[0.06] hover:bg-red-500/20 text-zinc-300 hover:text-red-300 border border-white/10 hover:border-red-500/30 transition-all active:scale-95 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={14} />
                  <span className="text-[10px] font-mono font-medium hidden sm:inline text-zinc-400">ESC</span>
                </button>
              </div>
            </div>

            {/* Mobile Quick Action Banner (visible on mobile only) */}
            <div className="sm:hidden px-3 py-2 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 shrink-0">
              <span className="truncate">Viewing PDF</span>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={encodedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 underline underline-offset-2"
                >
                  Open in New Tab
                </a>
              </div>
            </div>

            {/* Window Content / PDF Viewer Embed */}
            <div className="flex-1 w-full h-full bg-[#14141a] relative overflow-hidden">
              <object
                data={`${encodedUrl}#view=Fit`}
                type="application/pdf"
                className="w-full h-full"
              >
                <iframe
                  src={`${encodedUrl}#view=Fit`}
                  className="w-full h-full border-0"
                  title={title}
                >
                  {/* Fallback for browsers that don't support embedded PDF */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#09090c] gap-4">
                    <FileText size={48} className="text-sky-400" />
                    <p className="text-sm text-zinc-300">
                      Inline PDF view is not supported on this device browser.
                    </p>
                    <a
                      href={encodedUrl}
                      download="Asarudeen_S_Resume.pdf"
                      className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg"
                    >
                      Download Resume PDF
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
