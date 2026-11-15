import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, color: "#2563eb", letterSpacing: 2 }}>
          {profile.location.toUpperCase()}
        </div>
        <div style={{ marginTop: 20, fontSize: 72, fontWeight: 700, color: "#09090b" }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 16, fontSize: 36, fontWeight: 500, color: "#475569" }}>
          {profile.title}
        </div>
      </div>
    ),
    { ...size }
  );
}
