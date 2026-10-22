import type { DEdge, DNode } from "@/data";

const H = 64; // node height
const W = 190; // default node width

/** Orthogonal connector between two boxes: exits the facing side, one dog-leg in the middle. */
function route(a: DNode, b: DNode) {
  const aw = a.w ?? W;
  const bw = b.w ?? W;
  const ac = { x: a.x + aw / 2, y: a.y + H / 2 };
  const bc = { x: b.x + bw / 2, y: b.y + H / 2 };
  const dx = bc.x - ac.x;
  const dy = bc.y - ac.y;
  if (Math.abs(dx) >= Math.abs(dy) * 0.9) {
    const sx = dx > 0 ? a.x + aw : a.x;
    const ex = dx > 0 ? b.x : b.x + bw;
    const mid = (sx + ex) / 2;
    // labels sit above a horizontal run, centred in the gap
    return { d: `M${sx} ${ac.y} H${mid} V${bc.y} H${ex}`, lx: mid, ly: Math.min(ac.y, bc.y) - 8, anchor: "middle" as const };
  }
  const sy = dy > 0 ? a.y + H : a.y;
  const ey = dy > 0 ? b.y : b.y + H;
  const mid = (sy + ey) / 2;
  // and beside the final vertical run
  return { d: `M${ac.x} ${sy} V${mid} H${bc.x} V${ey}`, lx: bc.x + 10, ly: (mid + ey) / 2 + 4, anchor: "start" as const };
}

export default function Diagram({ id, h, nodes, edges }: { id: string; h: number; nodes: DNode[]; edges: DEdge[] }) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const paths = edges.map(([f, t, label]) => ({ ...route(byId[f], byId[t]), label }));
  const marker = `arrow-${id}`;

  return (
    <svg viewBox={`0 0 1000 ${h + 40}`} className="diagram h-auto w-full" role="img" aria-label="System architecture diagram">
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#1f3fff" />
        </marker>
      </defs>

      <g transform="translate(0 20)">
        {paths.map((p, i) => (
          <path key={i} className="d-edge" d={p.d} pathLength={1} fill="none" stroke="#1f3fff" strokeWidth="1.6" markerEnd={`url(#${marker})`} />
        ))}

        <g className="d-packets" opacity="0">
          {paths.map((p, i) => (
            <path key={i} d={p.d} fill="none" stroke="#1f3fff" strokeWidth="3" strokeLinecap="round" className="flow" opacity=".55" />
          ))}
        </g>

        {nodes.map((n) => {
          const w = n.w ?? W;
          const accent = n.tone === "accent";
          const ghost = n.tone === "ghost";
          return (
            <g key={n.id} className="d-node">
              <rect
                className="d-box"
                x={n.x}
                y={n.y}
                width={w}
                height={H}
                pathLength={1}
                fill={accent ? "#1f3fff" : "#f7f8fb"}
                stroke={ghost ? "#586080" : "#1f3fff"}
                strokeWidth="1.6"
                strokeDasharray={ghost ? "6 5" : undefined}
              />
              <text
                className="d-text"
                x={n.x + 14}
                y={n.y + (n.sub ? 28 : 38)}
                fontSize="20"
                fontWeight="800"
                letterSpacing="-0.4"
                fill={accent ? "#ffffff" : ghost ? "#586080" : "#0b1130"}
                textDecoration={ghost ? "line-through" : undefined}
                fontFamily="var(--font-manrope)"
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  className="d-text"
                  x={n.x + 14}
                  y={n.y + 49}
                  fontSize="11.5"
                  letterSpacing="1"
                  fill={accent ? "#ffffffcc" : "#586080"}
                  fontFamily="var(--font-jetbrains)"
                >
                  {n.sub.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {paths.map(
          (p, i) =>
            p.label && (
              <text
                key={i}
                className="d-text"
                x={p.lx}
                y={p.ly}
                textAnchor={p.anchor}
                fontSize="11"
                letterSpacing="1"
                fill="#1f3fff"
                stroke="#f7f8fb"
                strokeWidth="5"
                paintOrder="stroke"
                fontFamily="var(--font-jetbrains)"
              >
                {p.label.toUpperCase()}
              </text>
            ),
        )}
      </g>
    </svg>
  );
}
