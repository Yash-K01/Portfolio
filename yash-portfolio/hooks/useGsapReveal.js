"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Reveals every [data-reveal] child of the returned ref with a cinematic
 * fade + rise as it scrolls into view. Respects prefers-reduced-motion.
 */
export function useGsapReveal(options = {}) {
  const scopeRef = useRef(null);

  useEffect(() => {
    if (!registered && typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const scope = scopeRef.current;
    if (!scope) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = scope.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      targets.forEach((el, i) => {
        const delay = Number(el.dataset.revealDelay || 0) || i * 0.06;
        gsap.fromTo(
          el,
          { opacity: 0, y: 36, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
              ...options.scrollTrigger,
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [options.scrollTrigger]);

  return scopeRef;
}
