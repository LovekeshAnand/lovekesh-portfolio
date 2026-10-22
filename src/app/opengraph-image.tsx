import { ImageResponse } from "next/og";
import { font, ogAssets } from "./_og/assets";

export const alt = "Lovekesh Anand, Backend Engineer. Research. Design. Build.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRINT = "#1b33b8";
const ICE = "#b9c8ff";
const line = "rgba(255,255,255,0.55)";

const mono = { fontFamily: "JetBrains Mono", fontSize: 15, letterSpacing: 3, textTransform: "uppercase" as const };

const block: [string, string][] = [
  ["Role", "Backend engineer"],
  ["Core", "Node · FastAPI · SQL"],
  ["Record", "1st @ Microsoft"],
  ["Class", "B.Tech CSE '27"],
];

// the share card is a cyanotype print of the hero sheet
export default async function Image() {
  const { portrait, extraBold, regular, mono: monoFont } = await ogAssets();
  const src = `data:image/jpeg;base64,${portrait}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          color: "white",
          fontFamily: "Manrope",
          background: PRINT,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* drawing frame */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, border: `2px solid ${line}` }}>
          <div style={{ display: "flex", flex: 1, padding: "36px 44px 0" }}>
            {/* statement */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ ...mono, color: ICE }}>Sheet 01 — Lovekesh Anand</div>
              <div style={{ display: "flex", flexDirection: "column", marginTop: 26, fontSize: 104, fontWeight: 800, lineHeight: 0.92, letterSpacing: -5 }}>
                <span>Research.</span>
                <span>Design.</span>
                <span style={{ color: ICE }}>Build.</span>
              </div>
              <div style={{ marginTop: 26, fontSize: 26, color: "rgba(255,255,255,0.85)" }}>
                Backend engineer. Lately: AI infrastructure.
              </div>
            </div>

            {/* portrait with registration marks, a callout and a stamp */}
            <div style={{ display: "flex", position: "relative", width: 300, height: 360, marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} width={300} height={360} style={{ objectFit: "cover", objectPosition: "50% 20%", border: "2px solid white" }} alt="" />
              <div style={{ position: "absolute", top: -12, left: -12, width: 26, height: 26, borderTop: "3px solid white", borderLeft: "3px solid white" }} />
              <div style={{ position: "absolute", bottom: -12, right: -12, width: 26, height: 26, borderBottom: "3px solid white", borderRight: "3px solid white" }} />
              <div style={{ position: "absolute", top: 150, left: -150, display: "flex", alignItems: "center" }}>
                <div style={{ ...mono, fontSize: 12, background: "white", color: PRINT, padding: "6px 10px" }}>Thinks in systems</div>
                <div style={{ width: 30, height: 2, background: "white" }} />
                <div style={{ width: 12, height: 12, borderRadius: 6, border: "3px solid white", background: PRINT }} />
              </div>
              <div
                style={{
                  ...mono,
                  position: "absolute",
                  bottom: 22,
                  left: -40,
                  fontSize: 20,
                  fontWeight: 500,
                  padding: "8px 14px",
                  border: "3px solid white",
                  boxShadow: "inset 0 0 0 3px rgba(27,51,184,0.85), inset 0 0 0 4px white",
                  background: "rgba(27,51,184,0.85)",
                  transform: "rotate(-9deg)",
                }}
              >
                Open to hire
              </div>
            </div>
          </div>

          {/* title block */}
          <div style={{ display: "flex", marginTop: 30, borderTop: `2px solid ${line}` }}>
            {block.map(([k, v]) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px 20px", borderRight: `1px solid ${line}` }}>
                <span style={{ ...mono, fontSize: 11, color: ICE }}>{k}</span>
                <span style={{ marginTop: 4, fontSize: 17, fontWeight: 800, whiteSpace: "nowrap" }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 20px", background: "white", color: PRINT }}>
              <span style={{ ...mono, fontSize: 11 }}>View sheets</span>
              <span style={{ marginTop: 4, fontSize: 20, fontWeight: 800 }}>lovekesh-builds.vercel.app</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: font(extraBold), weight: 800, style: "normal" },
        { name: "Manrope", data: font(regular), weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: font(monoFont), weight: 500, style: "normal" },
      ],
    },
  );
}
