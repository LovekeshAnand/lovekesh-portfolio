"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { appendix, projects } from "@/data";
import Diagram from "./Diagram";

export default function Sheets() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".d-packets", { opacity: 1 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".sheet").forEach((sheet) => {
        const q = gsap.utils.selector(sheet);
        // the drawing traces itself as it scrolls into view, then the system "turns on"
        gsap
          .timeline({ scrollTrigger: { trigger: q(".diagram")[0], start: "top 85%", end: "center 50%", scrub: 0.6 } })
          .fromTo(
            q(".d-box:not([stroke-dasharray])"),
            { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 },
            { strokeDashoffset: 0, fillOpacity: 1, stagger: 0.08, duration: 1 },
          )
          .from(q(".d-box[stroke-dasharray]"), { opacity: 0, duration: 0.4 }, 0.3)
          .from(q(".d-text"), { opacity: 0, stagger: 0.02, duration: 0.4 }, 0.4)
          .fromTo(q(".d-edge"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.1, duration: 1 }, 0.6)
          .to(q(".d-packets"), { opacity: 1, duration: 0.3 });

        gsap.from(q(".stamp"), {
          scale: 2.2,
          opacity: 0,
          rotate: -24,
          duration: 0.45,
          ease: "power4.in",
          scrollTrigger: { trigger: q(".stamp")[0] ?? sheet, start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sheets" className="relative border-t border-cobalt/20 bg-paper">
      <div className="grid gap-10 px-5 py-24 md:grid-cols-12 md:px-12 md:py-32">
        <p className="label text-cobalt md:col-span-3">Sheet 03 — Systems</p>
        <div className="md:col-span-9">
          <h2 data-lines className="text-[clamp(2.4rem,5.4vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em]">
            Six systems. <span className="text-cobalt">Drawn first,</span> then built.
          </h2>
        </div>
      </div>

      {projects.map((p, i) => (
        <article key={p.name} className="sheet border-t border-cobalt/20">
          {/* title strip */}
          <div className="label flex flex-wrap items-stretch border-b border-cobalt/20 text-[10px]">
            <span className="border-r border-cobalt/20 bg-ink px-4 py-3 text-white md:px-6">03.{i + 1}</span>
            <span className="flex-1 border-r border-cobalt/20 px-4 py-3 text-slate md:px-6">{p.kind}</span>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="border-r border-cobalt/20 px-4 py-3 text-cobalt transition-colors hover:bg-cobalt hover:text-white md:px-6">
                Live ↗
              </a>
            )}
            <a href={p.github} target="_blank" rel="noreferrer" className="px-4 py-3 text-cobalt transition-colors hover:bg-cobalt hover:text-white md:px-6">
              Source ↗
            </a>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-12">
            {/* drawing */}
            <figure className={`grid-paper relative flex min-w-0 flex-col border-cobalt/20 p-5 md:col-span-7 md:p-10 ${i % 2 ? "md:order-2 md:border-l" : "md:border-r"}`}>
              <figcaption className="label mb-6 flex justify-between text-[10px] text-slate">
                <span>Fig. {String.fromCharCode(65 + i)} — Architecture</span>
                
              </figcaption>
              <div className="-mx-5 my-auto overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
                <div className="min-w-[640px] md:min-w-0">
                  <Diagram id={`p${i}`} {...p.diagram} />
                </div>
              </div>
            </figure>

            {/* spec */}
            <div className="relative flex flex-col justify-center px-5 py-12 md:col-span-5 md:px-10 md:py-16">
              {p.stamp && (
                <span className="stamp absolute right-5 top-6 rotate-[-8deg] text-[11px] text-cobalt md:right-10 md:top-10">
                  {p.stamp}
                </span>
              )}
              <h3 className="text-[clamp(2.6rem,4.4vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em]">{p.name}</h3>
              <p className="mt-3 text-xl font-light tracking-tight text-cobalt md:text-2xl">{p.line}</p>

              <dl className="mt-10 space-y-6">
                {(
                  [
                    ["Problem", p.problem],
                    ["Design", p.design],
                    ["Result", p.result],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="grid gap-2 border-t border-cobalt/15 pt-4 sm:grid-cols-[6.5rem_1fr]">
                    <dt className="label pt-1 text-[10px] text-cobalt">{k}</dt>
                    <dd className="leading-relaxed text-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="label mt-8 text-[10px] leading-relaxed text-slate">
                <span className="text-cobalt">Stack —</span> {p.stack.join(" / ")}
              </p>
            </div>
          </div>
        </article>
      ))}

      {/* appendix */}
      <div className="border-t border-cobalt/20 px-5 py-20 md:px-12 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Appendix: other drawings</h3>
          <a href="https://github.com/LovekeshAnand" target="_blank" rel="noreferrer" className="label text-cobalt">
            All 40+ repos ↗
          </a>
        </div>
        <ul>
          {appendix.map((a, i) => (
            <li key={a.name} className="border-t border-cobalt/20 last:border-b">
              <a href={a.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-cobalt hover:text-white md:grid-cols-[4rem_1fr_1.3fr_auto] md:px-4">
                <span className="label text-[10px] opacity-60">A.{i + 1}</span>
                <span className="text-xl font-bold tracking-tight md:text-2xl">{a.name}</span>
                <span className="hidden text-slate group-hover:text-white/80 md:block">{a.kind}</span>
                <span className="label pr-2">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
