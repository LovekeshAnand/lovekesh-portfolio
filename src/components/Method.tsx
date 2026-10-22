"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const stages = [
  ["Research", "Papers, constraints, prior art."],
  ["Design", "Data flow, failure modes, trade-offs."],
  ["Build", "Boring, tested, measured."],
  ["Ship", "Deploy, monitor, write it up."],
];

export default function Method() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root);
      const nodes = q(".stage") as HTMLElement[];
      const tl = gsap.timeline({
        scrollTrigger: { trigger: q(".pipe")[0], start: "top 75%", end: "bottom 45%", scrub: 0.5 },
      });
      tl.fromTo(q(".pipe-fill"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: nodes.length });
      nodes.forEach((n, i) =>
        tl.to(n, { backgroundColor: "#1f3fff", color: "#ffffff", borderColor: "#1f3fff", duration: 0.3 }, i + 0.2),
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="method" className="relative border-t border-cobalt/20 bg-paper px-5 py-24 md:px-12 md:py-36">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="label text-cobalt md:col-span-3">Sheet 02 — Method</p>
        <h2 data-lines className="text-[clamp(2.4rem,5.4vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em] md:col-span-9">
          I design the system <span className="text-cobalt">before</span> I write the code.
        </h2>
      </div>

      <div className="pipe relative mt-14 md:mt-28">
        {/* the pipe the work flows through */}
        <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-cobalt/15 md:block">
          <div className="pipe-fill h-full origin-left bg-cobalt" />
        </div>
        <span aria-hidden className="absolute bottom-8 left-6 top-6 w-px bg-cobalt/20 md:hidden" />
        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
          {stages.map(([name, text], i) => (
            <li key={name} className="relative flex items-start gap-5 md:block">
              <span className="stage label relative z-10 flex size-12 shrink-0 items-center md:size-16 justify-center border border-cobalt/40 bg-paper text-sm text-cobalt">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-3xl font-extrabold tracking-[-0.04em] md:mt-6 md:text-5xl">{name}</h3>
                <p className="mt-1 max-w-xs text-slate md:mt-3">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
