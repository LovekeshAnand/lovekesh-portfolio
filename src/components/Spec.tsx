import { bom, notes, revisions } from "@/data";

const principles = [
  "Research before code. Know why the obvious answer fails.",
  "Draw the system. If it can't be drawn, it can't be built.",
  "Measure, then optimise. Write down what broke.",
];

export default function Spec() {
  return (
    <section id="spec" className="relative border-t border-cobalt/20 bg-paper px-5 py-24 md:px-12 md:py-32">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="label text-cobalt md:col-span-3">Sheet 05 — Specification</p>
        <h2 data-lines className="text-[clamp(2.4rem,5.4vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em] md:col-span-9">
          Backend first. <span className="text-cobalt">AI infra</span> by obsession.
        </h2>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        {/* bill of materials */}
        <div className="lg:col-span-7">
          <h3 className="label mb-4 text-[10px] text-slate">Bill of materials</h3>
          <table className="w-full border-collapse text-left">
            <thead className="label text-[10px] text-cobalt">
              <tr className="border-y border-cobalt/40">
                <th className="w-14 py-3 font-normal">Item</th>
                <th className="py-3 font-normal">Component</th>
                <th className="hidden py-3 font-normal md:table-cell">Parts</th>
              </tr>
            </thead>
            <tbody>
              {bom.map((b, i) => (
                <tr key={b.item} data-reveal={i * 0.05} className="border-b border-cobalt/20 align-top">
                  <td className="label py-5 text-[10px] text-slate">0{i + 1}</td>
                  <td className={`py-5 pr-4 text-xl font-extrabold tracking-tight md:text-2xl ${i === 0 ? "text-cobalt" : ""}`}>
                    {b.item}
                    <span className="mt-1 block text-sm font-normal tracking-normal text-slate md:hidden">{b.parts}</span>
                  </td>
                  <td className="hidden py-5 text-slate md:table-cell md:pt-6">{b.parts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* general notes */}
        <div className="lg:col-span-5">
          <h3 className="label mb-4 text-[10px] text-slate">General notes</h3>
          <ol className="border-t border-cobalt/40">
            {principles.map((p, i) => (
              <li key={p} data-reveal={i * 0.05} className="flex gap-4 border-b border-cobalt/20 py-5 text-lg leading-snug">
                <span className="label pt-1 text-[10px] text-cobalt">{i + 1}.</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        {/* revision history */}
        <div className="lg:col-span-7">
          <h3 className="label mb-4 text-[10px] text-slate">Revision history</h3>
          <table className="w-full border-collapse text-left">
            <thead className="label text-[10px] text-cobalt">
              <tr className="border-y border-cobalt/40">
                <th className="w-14 py-3 font-normal">Rev</th>
                <th className="py-3 font-normal">Role</th>
                <th className="hidden py-3 font-normal sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {revisions.map((r) => (
                <tr key={r.rev} data-reveal className="border-b border-cobalt/20 align-top">
                  <td className="py-5">
                    <span className="label flex size-8 items-center justify-center border border-cobalt text-[11px] text-cobalt">{r.rev}</span>
                  </td>
                  <td className="py-5 pr-4">
                    <span className="block text-xl font-extrabold tracking-tight">{r.role}</span>
                    <span className="text-slate">{r.org}</span>
                  </td>
                  <td className="hidden py-5 text-slate sm:table-cell">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* writing */}
        <div className="lg:col-span-5">
          <h3 className="label mb-4 text-[10px] text-slate">Field notes · Medium</h3>
          <ul className="border-t border-cobalt/40">
            {notes.map((n) => (
              <li key={n.url} data-reveal className="border-b border-cobalt/20">
                <a href={n.url} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-4 py-5">
                  <span>
                    <span className="label block text-[10px] text-slate">{n.date}</span>
                    <span className="mt-1 block text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-cobalt">{n.title}</span>
                  </span>
                  <span className="label pt-5 text-cobalt transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
