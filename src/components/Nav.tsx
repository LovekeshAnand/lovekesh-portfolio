const links = [
  ["A", "Method", "#method"],
  ["B", "Sheets", "#sheets"],
  ["C", "Record", "#record"],
  ["D", "Spec", "#spec"],
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cobalt/20 bg-paper/90 backdrop-blur-sm">
      <nav className="flex h-14 items-stretch justify-between text-sm">
        <a href="#top" className="flex items-center gap-3 border-r border-cobalt/20 px-4 md:px-8">
          <span className="font-extrabold tracking-tight">Lovekesh Anand</span>
          <span className="label hidden text-slate sm:inline">/ Backend Engineer</span>
        </a>

        <ul className="hidden items-stretch lg:flex">
          {links.map(([k, label, href]) => (
            <li key={href} className="border-l border-cobalt/20">
              <a href={href} className="label flex h-full items-center gap-2 px-6 transition-colors hover:bg-cobalt hover:text-white">
                <span className="opacity-50">{k}.</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-stretch">
          <span className="label hidden items-center gap-2 border-l border-cobalt/20 px-5 text-slate md:flex">
            <span className="size-2 animate-blink bg-cobalt" />
            Open to hire
          </span>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="label flex items-center border-l border-cobalt/20 px-3 transition-colors hover:bg-cobalt hover:text-white sm:px-5">
            Résumé ↗
          </a>
          <a href="#contact" className="label flex items-center bg-cobalt px-4 text-white transition-colors hover:bg-ink sm:px-5 md:px-8">
            Contact →
          </a>
        </div>
      </nav>
    </header>
  );
}
