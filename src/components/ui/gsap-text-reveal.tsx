"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** If true, animates on page load instead of scroll */
  immediate?: boolean;
}

export function GSAPTextReveal({
  text,
  className = "",
  as: Tag = "p",
  delay = 0,
  immediate = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Safely construct DOM elements without innerHTML injection (prevents XSS)
      el.textContent = "";
      const words = text.split(" ");

      words.forEach((word, index) => {
        const outerSpan = document.createElement("span");
        outerSpan.style.display = "inline-block";
        outerSpan.style.overflow = "hidden";
        outerSpan.style.verticalAlign = "bottom";

        const innerSpan = document.createElement("span");
        innerSpan.className = "gsap-word";
        innerSpan.style.display = "inline-block";
        innerSpan.textContent = word;

        outerSpan.appendChild(innerSpan);
        el.appendChild(outerSpan);

        if (index < words.length - 1) {
          const spaceSpan = document.createElement("span");
          spaceSpan.style.display = "inline-block";
          spaceSpan.style.width = "0.3em";
          spaceSpan.textContent = " ";
          el.appendChild(spaceSpan);
        }
      });

      const wordEls = el.querySelectorAll(".gsap-word");

      gsap.set(wordEls, { y: "105%", opacity: 0 });

      const tween = gsap.to(wordEls, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.045,
        delay,
        paused: !immediate,
      });

      if (!immediate) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => tween.play(0),
          once: true,
        });
      }
    },
    { scope: containerRef, dependencies: [text, delay, immediate] }
  );

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
