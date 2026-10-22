import { ImageResponse } from "next/og";
import { font, ogAssets } from "./_og/assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// home-screen icon: the "LA" mark on the cyanotype print
export default async function AppleIcon() {
  const { extraBold } = await ogAssets();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1f3fff", padding: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: "3px solid rgba(255,255,255,0.4)",
            color: "white",
            fontFamily: "Manrope",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -4,
          }}
        >
          LA
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: font(extraBold), weight: 800, style: "normal" }] },
  );
}
