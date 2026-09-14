// Shared artwork for the Open Graph and Twitter preview images.
export const SOCIAL_CARD_SIZE = {
  width: 1200,
  height: 630,
};

const INK = "#0B0B0B";
const PAPER = "#F5F1E8";

const TAGS = [
  { label: "DevOps", background: "#FF4D9D" },
  { label: "Cybersecurity", background: "#00E5FF" },
  { label: "Linux", background: "#B8FF3C" },
];

export function SocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "56px 72px",
        background: PAPER,
        color: INK,
        border: `14px solid ${INK}`,
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 6 }}>PORTFOLIO</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 22,
          fontSize: 112,
          fontWeight: 900,
          lineHeight: 0.92,
          letterSpacing: -5,
        }}
      >
        <div style={{ display: "flex" }}>BAVIRI</div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              padding: "0 18px",
              margin: "8px 0 14px",
              background: "#FFE500",
              border: `6px solid ${INK}`,
              boxShadow: `14px 14px 0 ${INK}`,
            }}
          >
            SETTY
          </div>
        </div>
        <div style={{ display: "flex" }}>SAI DEEVAN</div>
      </div>

      <div style={{ display: "flex", marginTop: 40 }}>
        {TAGS.map((tag) => (
          <div
            key={tag.label}
            style={{
              display: "flex",
              marginRight: 18,
              padding: "8px 18px",
              fontSize: 28,
              fontWeight: 700,
              background: tag.background,
              border: `4px solid ${INK}`,
            }}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
}
