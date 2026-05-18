import { useEffect, useRef, useState } from "react";

interface Layer {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  techs: string[];
}

interface Props {
  layer: Layer;
  index: number;
  isActive: boolean;
  isLast: boolean;
}

export default function ArchitectureLayer({ layer, isActive, isLast }: Props) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && !revealed) {
      setRevealed(true);
    }
  }, [isActive, revealed]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-center"
      style={{
        height: "100vh",
        padding: "0 64px",
        borderBottom: isLast ? "none" : "1px solid #111",
        overflow: "hidden",
      }}
    >
      {/* Background layer number watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-0.05em",
          bottom: "-0.15em",
          fontSize: "clamp(140px, 20vw, 260px)",
          fontWeight: 100,
          color: "#fff",
          opacity: 0.025,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {layer.number}
      </div>

      {/* Content */}
      <div
        key={revealed ? "revealed" : "hidden"}
        style={{ maxWidth: 520, position: "relative", zIndex: 1 }}
      >
        {/* Layer indicator */}
        <div
          className={revealed ? "layer-reveal" : ""}
          style={{
            opacity: revealed ? undefined : 0,
            animationDelay: "0ms",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 400,
              color: "#444",
              letterSpacing: "0.12em",
            }}
          >
            {layer.number}
          </span>
          <div style={{ height: 1, width: 48, background: "#222" }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 400,
              color: "#333",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            layer
          </span>
        </div>

        {/* Title */}
        <h2
          className={revealed ? "layer-reveal" : ""}
          style={{
            opacity: revealed ? undefined : 0,
            animationDelay: "80ms",
            fontSize: "clamp(36px, 4.5vw, 60px)",
            fontWeight: 200,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#ffffff",
            marginBottom: 8,
          }}
        >
          {layer.title}
        </h2>

        {/* Subtitle */}
        <p
          className={revealed ? "layer-reveal" : ""}
          style={{
            opacity: revealed ? undefined : 0,
            animationDelay: "130ms",
            fontSize: 13,
            fontWeight: 400,
            color: "#444",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 32,
          }}
        >
          {layer.subtitle}
        </p>

        {/* Divider */}
        <div
          className={revealed ? "layer-reveal" : ""}
          style={{
            opacity: revealed ? undefined : 0,
            animationDelay: "160ms",
            height: 1,
            background: "linear-gradient(to right, #1e1e1e, transparent)",
            marginBottom: 28,
            width: "80%",
          }}
        />

        {/* Description */}
        <p
          className={revealed ? "layer-reveal" : ""}
          style={{
            opacity: revealed ? undefined : 0,
            animationDelay: "200ms",
            fontSize: 14,
            fontWeight: 300,
            color: "#555",
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 420,
          }}
        >
          {layer.description}
        </p>

        {/* Tech badges */}
        <div
          className={revealed ? "layer-reveal" : ""}
          style={{
            opacity: revealed ? undefined : 0,
            animationDelay: "260ms",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {layer.techs.map((tech, i) => (
            <span
              key={tech}
              className="tech-badge"
              style={{ animationDelay: `${280 + i * 40}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Data flow connector (not on last layer) */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 64,
            width: 1,
            height: 48,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(to bottom, transparent, #1a1a1a)",
            }}
          />
          <div
            className="flow-dot"
            style={{
              position: "absolute",
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#333",
              left: -1,
            }}
          />
        </div>
      )}
    </div>
  );
}
