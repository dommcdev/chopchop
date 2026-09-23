import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "ChopChop — Your cookbook, digitized. Scan. Scale. Organize. Share.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [regular, semibold, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/logo-light.svg")),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "68px 80px 64px",
        background: "#f8f7f3",
        color: "#1c211e",
        fontFamily: "Geist",
        borderTop: "8px solid #007a55",
      }}
    >
      {/* ImageResponse embeds the SVG directly into the generated PNG. */}
      <img
        src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
        width={269}
        height={56}
        alt="ChopChop"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 66,
          fontSize: 88,
          fontWeight: 600,
          letterSpacing: "-4px",
          lineHeight: 1.06,
        }}
      >
        <span>Your cookbook,</span>
        <span style={{ color: "#007a55" }}>digitized.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          paddingTop: 28,
          borderTop: "1px solid #d8ddd5",
          color: "#626b63",
          fontSize: 28,
          letterSpacing: "-0.5px",
        }}
      >
        Scan. Scale. Organize. Share.
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
