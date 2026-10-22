import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lovekesh Anand | Backend Engineer",
    short_name: "Lovekesh",
    description: "Backend engineer. Research, design, then build.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#1f3fff",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
