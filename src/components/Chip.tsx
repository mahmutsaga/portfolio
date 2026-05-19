import type { ReactNode } from "react";

interface Props {
  name: string;
  description: string;
  icon: ReactNode;
  color: string;
  active?: boolean;
  compact?: boolean;
}

const PINS = 8;

function PinRow({ side, color, compact }: { side: "top" | "bottom"; color: string; compact?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: compact ? "0 8px" : "0 14px",
        height: compact ? 10 : 13,
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
            width: compact ? 3 : 5,
            height: compact ? 5 : 8,
            background: color,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}

export default function Chip({ name, description, icon, color, active = false, compact = false }: Props) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PinRow side="top" color={active ? color : "#333"} compact={compact} />

      <div style={{
        padding: compact ? "10px 12px 12px" : "18px 18px 22px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Icon — scaled down in compact mode */}
        <div
          style={{
            marginBottom: compact ? 8 : 14,
            opacity: active ? 1 : 0.12,
            transition: "opacity 0.6s",
            flexShrink: 0,
            transformOrigin: "top left",
            transform: compact ? "scale(0.65)" : undefined,
            width: compact ? 25 : "auto",
            height: compact ? 25 : "auto",
          }}
        >
          {icon}
        </div>

        {/* Ref designator — hidden in compact */}
        {!compact && (
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
        )}

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: compact ? 12 : 15,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: active ? "#ffffff" : "#111",
            marginBottom: compact ? 5 : 9,
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
            fontSize: compact ? 10 : 11,
            fontWeight: 400,
            color: active ? "rgba(255,255,255,0.38)" : "#0e0e0e",
            lineHeight: 1.55,
            transition: "color 0.6s",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: compact ? 3 : undefined,
            WebkitBoxOrient: compact ? "vertical" : undefined,
          } as React.CSSProperties}
        >
          {description}
        </p>
      </div>

      <PinRow side="bottom" color={active ? color : "#333"} compact={compact} />
    </div>
  );
}
