"use client";

import { useEffect, useState } from "react";
import { site } from "@/data";

function DelhiTime() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t} IST</span>;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const cells: [string, React.ReactNode][] = [
    ["GitHub", <a key="g" href={site.github} target="_blank" rel="noreferrer" className="hover:underline">LovekeshAnand ↗</a>],
    ["LinkedIn", <a key="l" href={site.linkedin} target="_blank" rel="noreferrer" className="hover:underline">lovekesh-anand ↗</a>],
    ["Medium", <a key="m" href={site.medium} target="_blank" rel="noreferrer" className="hover:underline">@lovekeshanand6 ↗</a>],
    ["X", <a key="x" href={site.x} target="_blank" rel="noreferrer" className="hover:underline">@LovekeshAnand07 ↗</a>],
    ["Résumé", <a key="r" href={site.resume} target="_blank" rel="noreferrer" className="hover:underline">View ↗</a>],
    ["Local time", <DelhiTime key="t" />],
  ];

  return (
    <footer id="contact" className="grid-print relative pb-3 text-white md:pb-6">
      <div className="px-5 pb-16 pt-24 md:px-12 md:pt-32">
        <p className="label text-white/70">Sheet 06 — Issued for construction</p>
        <h2 data-lines className="mt-8 max-w-6xl text-[clamp(3rem,8vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.065em]">
          Let&apos;s build something great together.
        </h2>
        <p data-reveal className="mt-8 max-w-xl text-xl text-white/80">
          Open to backend and AI infrastructure roles. I reply within a day.
        </p>

        <div data-reveal className="mt-12 flex flex-wrap items-stretch gap-3">
          <a href={`mailto:${site.email}`} className="bg-white px-6 py-5 text-lg font-extrabold tracking-tight text-print transition-colors hover:bg-ink hover:text-white md:text-2xl">
            {site.email} ↗
          </a>
          <button type="button" onClick={copy} className="label border border-white/60 px-6 transition-colors hover:bg-white hover:text-print">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      {/* title block */}
      <div className="mx-3 border border-white/40 md:mx-6">
        <dl className="grid grid-cols-2 md:grid-cols-6">
          {cells.map(([k, v]) => (
            <div key={k} className="border-b border-r border-white/25 px-4 py-3 md:border-b-0">
              <dt className="label text-[9px] text-white/60">{k}</dt>
              <dd className="mt-1 text-sm font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/25 px-4 py-5">
          <div>
            <p className="label text-[9px] text-white/60">Approved by</p>
            <p className="mt-3 w-64 border-b border-white/60 pb-1 font-mono text-sm text-white/50 md:w-80">you, hopefully</p>
          </div>
          <p className="label text-[9px] text-white/60">© 2026 Lovekesh Anand · Drawn by hand, in code</p>
        </div>
      </div>
    </footer>
  );
}
