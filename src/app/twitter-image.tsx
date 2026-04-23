import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          Baviri Setty Sai Deevan
        </div>
        <div style={{ fontSize: 30, marginTop: 20, opacity: 0.85 }}>
          Portfolio · DevOps · Cybersecurity
        </div>
      </div>
    ),
    size,
  );
}
