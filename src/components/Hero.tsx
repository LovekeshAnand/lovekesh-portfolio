"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/data";

const steps = ["Research.", "Design.", "Build."];

// recruiter quick-scan, styled as a drawing title block
const block: [string, string, string?][] = [
  ["Role", "Backend engineer"],
  ["Core", "Node · FastAPI · Postgres"],
  ["AI infra", "llama.cpp · CUDA · RAG"],
  ["Record", "4 podiums · 1st @ Microsoft"],
  ["Status", "Open to hire"],
  ["Résumé", "View ↗", site.resume],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q(".frame-x"), { scaleX: 0, duration: 1.4, ease: "expo.inOut" })
        .from(q(".frame-y"), { scaleY: 0, duration: 1.4, ease: "expo.inOut" }, 0)
        .from(q(".hl"), { yPercent: 110, duration: 1.3, stagger: 0.12 }, 0.35)
        .from(q(".hands"), { xPercent: 60, opacity: 0, duration: 1.8 }, 0.4)
        .from(q(".fade"), { opacity: 0, y: 20, duration: 1, stagger: 0.06 }, 0.9)
        .from(q(".tb-cell"), { opacity: 0, duration: 0.6, stagger: 0.05 }, 1.2)
        // the headline lines only need clipping while they slide in
        .set(q(".hl-mask"), { overflow: "visible" });

      gsap.to(q(".hands"), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // idle sway, and on pointer devices the hands reach toward the cursor
      const reach = q(".reach")[0];
      gsap.to(reach, { rotation: -2, scale: 1.03, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "100% 50%" });
      if (!window.matchMedia("(hover: hover)").matches) return;
      const rx = gsap.quickTo(reach, "x", { duration: 1.4, ease: "power3.out" });
      const ry = gsap.quickTo(reach, "y", { duration: 1.4, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = reach.parentElement!.getBoundingClientRect();
        rx(gsap.utils.clamp(-50, 30, (e.clientX - r.left - r.width / 2) * 0.08));
        ry(gsap.utils.clamp(-50, 50, (e.clientY - r.top - r.height / 2) * 0.08));
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="grid-paper relative pt-14">
      <div className="relative m-3 md:m-6">
        {/* drawing frame */}
        <span className="frame-x absolute inset-x-0 top-0 h-px origin-left bg-cobalt/40" />
        <span className="frame-x absolute inset-x-0 bottom-0 h-px origin-right bg-cobalt/40" />
        <span className="frame-y absolute inset-y-0 left-0 w-px origin-top bg-cobalt/40" />
        <span className="frame-y absolute inset-y-0 right-0 w-px origin-bottom bg-cobalt/40" />
        <div aria-hidden className="label pointer-events-none absolute inset-x-0 top-1.5 hidden justify-around text-[9px] text-cobalt/50 md:flex">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div aria-hidden className="label pointer-events-none absolute inset-y-0 left-1.5 hidden flex-col justify-around text-[9px] text-cobalt/50 md:flex">
          {["A", "B", "C", "D"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>

        <div className="grid gap-12 px-5 pb-10 pt-12 md:min-h-[calc(100svh-3.5rem-3rem-88px)] md:grid-cols-12 md:px-12 md:pt-16 lg:gap-6">
          {/* statement */}
          <div className="flex flex-col justify-between gap-10 md:col-span-7">
            <p className="fade label text-cobalt">Sheet 01 — General arrangement</p>

            <h1 className="text-[clamp(3.6rem,min(10.5vw,17svh),11.5rem)] font-extrabold leading-[0.88] tracking-[-0.065em]">
              <span className="sr-only">Lovekesh Anand, backend engineer. Research. Design. Build.</span>
              {steps.map((s, i) => (
                <span key={s} aria-hidden className="hl-mask -mb-[0.22em] block overflow-hidden pb-[0.22em]">
                  <span className={`hl flex items-start gap-[0.12em] ${i === 2 ? "text-cobalt" : ""}`}>
                    <span className="label mt-[1.2em] text-[11px] font-medium tracking-[0.1em] text-slate">0{i + 1}</span>
                    {s}
                  </span>
                </span>
              ))}
            </h1>

            <div className="space-y-8">
              <p className="fade max-w-xl text-lg leading-relaxed md:text-xl">
                I&apos;m <strong>Lovekesh Anand</strong>, a backend engineer. I research and design the system first, then build it. Lately: <strong className="text-cobalt">AI infrastructure</strong>.
              </p>
              <div className="fade flex flex-wrap gap-3">
                <a href="#sheets" className="label bg-cobalt px-6 py-4 text-white transition-colors hover:bg-ink">
                  View the sheets ↓
                </a>
                <a href={`mailto:${site.email}`} className="label border border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-white">
                  Email me
                </a>
              </div>
            </div>
          </div>

          {/* hands reaching in from the right edge of the screen */}
          <div className="relative flex items-center md:col-span-5">
            <div className="hands -mr-16 mix-blend-multiply ml-auto w-[calc(72%+2rem)] md:-mr-[10rem] md:w-[calc(85%+5.5rem)]">
              <div className="reach">
                <Image src="/hands.jpg" alt="" width={576} height={660} priority sizes="(min-width: 768px) 50vw, 90vw" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* title block */}
        <dl className="grid grid-cols-2 border-t border-cobalt/40 sm:grid-cols-3 lg:grid-cols-6">
          {block.map(([k, v, href]) => (
            <div
              key={k}
              className={`tb-cell border-b border-r border-cobalt/20 px-4 py-3 lg:border-b-0 ${k === "Status" ? "bg-cobalt text-white" : ""}`}
            >
              <dt className={`label text-[9px] ${k === "Status" ? "text-white/70" : "text-slate"}`}>{k}</dt>
              <dd className="mt-1 text-sm font-bold">
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="text-cobalt hover:underline">
                    {v}
                  </a>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
