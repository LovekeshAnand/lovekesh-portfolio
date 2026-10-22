import Image from "next/image";
import { site, stats, wins } from "@/data";

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-5"];
const ratios = ["aspect-[5/4]", "aspect-[4/5] md:aspect-auto md:h-[calc(100%-4.5rem)]", "aspect-[4/5]", "aspect-[4/3] md:aspect-auto md:h-[calc(100%-4.5rem)]"];

export default function Record() {
  return (
    <section id="record" className="grid-paper relative border-t border-cobalt/20 px-5 py-24 md:px-12 md:py-32">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="label text-cobalt md:col-span-3">Sheet 04 — Field record</p>
        <h2 data-lines className="text-[clamp(2.4rem,5.4vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em] md:col-span-9">
          7+ hackathons. <span className="text-cobalt">4 podiums.</span> Built under a clock.
        </h2>
      </div>

      <dl className="mt-16 grid grid-cols-2 border-l border-t border-cobalt/25 bg-paper md:grid-cols-4">
        {stats.map(([n, label]) => (
          <div key={label} data-reveal className="border-b border-r border-cobalt/25 p-5 md:p-7">
            <dd className="text-[clamp(2.8rem,5.5vw,5rem)] font-extrabold leading-none tracking-[-0.06em] text-cobalt">{n}</dd>
            <dt className="label mt-3 text-[10px] text-slate">{label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
        {wins.map((w, i) => (
          <figure key={w.event} data-reveal={(i % 2) * 0.1} className={`flex flex-col ${spans[i]}`}>
            <div className={`relative overflow-hidden border border-cobalt/25 bg-white p-2 ${ratios[i]}`}>
              <div className="relative size-full overflow-hidden">
                <Image
                  src={w.image}
                  alt={`Lovekesh at ${w.event}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: w.focus }}
                />
              </div>
              <span className="stamp absolute bottom-6 right-6 rotate-[-10deg] bg-white/85 text-2xl text-cobalt md:text-3xl">
                {w.place}
              </span>
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-lg font-extrabold tracking-tight">
                <span className="label mr-2 text-[10px] text-cobalt">Fig. {w.fig}</span>
                {w.event}
              </span>
              <span className="label text-[10px] text-slate">{w.where}</span>
              <span className="w-full text-sm text-slate">{w.note}</span>
            </figcaption>
          </figure>
        ))}

        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          data-reveal
          className="flex flex-col justify-between gap-8 bg-cobalt p-7 text-white transition-colors hover:bg-ink md:col-span-3"
        >
          <span className="label text-[10px] text-white/70">Fig. 5 — Open source</span>
          <span>
            <span className="block text-3xl font-extrabold leading-tight tracking-tight">Kelados joined the HOL Guard ecosystem.</span>
            <span className="label mt-6 block text-[10px] text-white/70">feat: add Kelados TTS · merged</span>
          </span>
          <span className="label text-[10px]">All posts on LinkedIn ↗</span>
        </a>
      </div>
    </section>
  );
}
