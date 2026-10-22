import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Fonts + portrait for generated images. Cached so the images prerender at build time. */
export async function ogAssets() {
  "use cache";
  const b64 = async (p: string) => (await readFile(join(process.cwd(), p))).toString("base64");
  const [portrait, extraBold, regular, mono] = await Promise.all([
    b64("public/portrait.jpg"),
    b64("src/app/_og/Manrope-ExtraBold.ttf"),
    b64("src/app/_og/Manrope-Regular.ttf"),
    b64("src/app/_og/JetBrainsMono-Medium.ttf"),
  ]);
  return { portrait, extraBold, regular, mono };
}

export const font = (b64: string) => Buffer.from(b64, "base64");
