import type { ReactNode } from "react";

interface Props {
  name: string;
  description: string;
  icon: ReactNode;
  color: string;
  active?: boolean;
}

const PINS = 8;

function PinRow({ side, color }: { side: "top" | "bottom"; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 14px",
        height: 13,
        alignItems: side === "top" ? "flex-end" : "flex-start",
        borderBottom: side === "top"    ? `0.5px solid ${color}22` : "none",
        borderTop:    side === "bottom" ? `0.5px solid ${color}22` : "none",
        flexShrink: 0,
      }}
    >
      {Array.from({ length: PINS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 5,
            height: 8,
            background: color,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}

export default function Chip({ name, description, icon, color, active = false }: Props) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PinRow side="top" color={active ? color : "#333"} />

      <div style={{ padding: "18px 18px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Icon */}
        <div
          style={{
            marginBottom: 14,
            opacity: active ? 1 : 0.12,
            transition: "opacity 0.6s",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        {/* Ref designator */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            fontWeight: 600,
            color: active ? "rgba(255,255,255,0.18)" : "#161616",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 7,
            transition: "color 0.6s",
            flexShrink: 0,
          }}
        >
          IC — {name.replace(/\s+/g, "").slice(0, 4).toUpperCase()}
        </p>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: active ? "#ffffff" : "#111",
            marginBottom: 9,
            lineHeight: 1.15,
            transition: "color 0.6s",
            flexShrink: 0,
          }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: active ? "rgba(255,255,255,0.38)" : "#0e0e0e",
            lineHeight: 1.65,
            transition: "color 0.6s",
          }}
        >
          {description}
        </p>
      </div>

      <PinRow side="bottom" color={active ? color : "#333"} />
    </div>
  );
}
