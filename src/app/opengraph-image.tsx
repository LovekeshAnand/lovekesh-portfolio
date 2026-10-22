import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Lovekesh Anand, Backend Engineer. Research. Design. Build.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// the share card is a mini version of the hero sheet
export default async function Image() {
  const portrait = await readFile(join(process.cwd(), "public/portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;
  const grid = "rgba(31,63,255,0.10)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f8fb",
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          padding: 48,
          color: "#0b1130",
        }}
      >
        <div style={{ display: "flex", flex: 1, border: "2px solid #1f3fff", padding: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, color: "#1f3fff" }}>LOVEKESH ANAND / BACKEND ENGINEER</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: -5 }}>
              <span>Research.</span>
              <span>Design.</span>
              <span style={{ color: "#1f3fff" }}>Build.</span>
            </div>
            <div style={{ fontSize: 24, color: "#586080" }}>1st @ Automate India (Microsoft) · 4 podiums · Open to hire</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={330} height={412} style={{ objectFit: "cover", border: "2px solid #1f3fff", alignSelf: "center" }} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
