"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Global motion layer: smooth scroll and scroll-triggered reveals.
 *   data-reveal  fade + rise on enter (value = delay)
 *   data-lines   masked line-by-line reveal
 *   data-rule    hairline that draws itself left to right
 */
export default function Motion() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -60 } });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (reduced()) return;

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }),
    );

    gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) =>
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      }),
    );

    gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) =>
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 105,
            duration: 1.2,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            // drop the masks once revealed so descenders are never clipped at rest
            onComplete: () => self.revert(),
          }),
      }),
    );

  });

  return null;
}
