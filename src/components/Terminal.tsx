import { useEffect, useState, useRef } from "react";

const CONTENT: string[][] = [
  // Layer 01 — Infrastructure
  [
    '$ docker ps --format "table {{.Names}}\\t{{.Status}}"',
    "",
    "NAMES             STATUS",
    "postgres-db       Up 3 hours",
    "supabase-api      Up 3 hours",
    "redis-cache       Up 3 hours",
    "",
    "$ psql -U postgres -c \"\\l\"",
    "",
    "   Name      │  Owner",
    "─────────────┼──────────",
    " portfolio   │ postgres",
    " supabase    │ postgres",
    "",
    "✓ Connections: 3 / 10",
    "✓ Storage: 2.4 GB / 10 GB",
    "✓ All services healthy",
  ],
  // Layer 02 — Backend & API
  [
    "$ node server.js --env=production",
    "",
    "[00:00] Server listening on :3000",
    "[00:01] GET  /api/projects   → 200  12ms",
    "[00:01] GET  /api/skills     → 200   8ms",
    "[00:02] POST /api/contact    → 200  45ms",
    "",
    "$ uvicorn main:app --port 8000",
    "[fastapi] Uvicorn running on :8000",
    "",
    "$ ./portfolio-engine --version",
    "portfolio-engine v2.1.0 (C++17)",
    "",
    "✓ Endpoints: 12 active",
    "✓ Avg response: < 15ms",
  ],
  // Layer 03 — Gateway & AI
  [
    "$ npx next build",
    "",
    "  ▲ Next.js 14.2.0",
    "  Linting...           ✓",
    "  Type checking...     ✓",
    "  Compiling...         ✓",
    "",
    "  Route (app)      Size     First Load",
    "  ─────────────────────────────────────",
    "  ○  /             4.2 kB    89.3 kB",
    "  ○  /projects     2.1 kB    87.2 kB",
    "",
    "$ netlify deploy --prod",
    "  Deploy URL: live ✓",
    "",
    "✓ CDN: 42 edge nodes active",
    "✓ AI model: loaded",
  ],
  // Layer 04 — Frontend & Mobile
  [
    "$ npm run build",
    "",
    "  vite v5.4.0 building for production...",
    "  ✓ 847 modules transformed",
    "",
    "  dist/index.html            0.46 kB",
    "  dist/assets/index.js     234.50 kB",
    "  dist/assets/index.css     18.20 kB",
    "",
    "$ npx react-native run-ios",
    "  ✓ Metro Bundler: running",
    "  ✓ iOS Simulator:  Ready",
    "  ✓ Android:        Ready",
    "",
    "✓ Tailwind: 3,200+ utility classes",
    "✓ TypeScript: 0 errors",
  ],
];

const LAYER_LABELS = [
  "01 — infrastructure",
  "02 — backend & api",
  "03 — gateway & ai",
  "04 — frontend & mobile",
];

interface Props {
  activeLayer: number;
}

export default function Terminal({ activeLayer }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reset and replay when layer changes
    setVisibleLines(0);
    setContentKey((k) => k + 1);

    const lines = CONTENT[activeLayer];

    const scheduleNext = (index: number) => {
      if (index > lines.length) return;
      const delay = lines[index - 1] === "" ? 40 : 90;
      timerRef.current = setTimeout(() => {
        setVisibleLines(index);
        scheduleNext(index + 1);
      }, delay);
    };

    timerRef.current = setTimeout(() => scheduleNext(1), 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeLayer]);

  const lines = CONTENT[activeLayer];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#050505",
        overflow: "hidden",
      }}
    >
      {/* Window chrome */}
      <div className="terminal-chrome">
        <div className="terminal-chrome-dot" />
        <div className="terminal-chrome-dot" />
        <div className="terminal-chrome-dot" />
        <span
          style={{
            marginLeft: 10,
            fontSize: 11,
            color: "#333",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.06em",
          }}
        >
          system — portfolio
        </span>
      </div>

      {/* Status bar */}
      <div
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #111",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.9,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#444",
            letterSpacing: "0.1em",
          }}
        >
          {LAYER_LABELS[activeLayer]}
        </span>
      </div>

      {/* Output */}
      <div
        key={contentKey}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 20px 24px",
          scrollbarWidth: "none",
        }}
      >
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="terminal-line"
            style={{
              animationDelay: `0ms`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              lineHeight: 1.9,
              whiteSpace: "pre",
              color: getLineColor(line),
              letterSpacing: line.startsWith("$") ? "0.01em" : undefined,
            }}
          >
            {line || " "}
          </div>
        ))}

        {/* Blinking cursor after last visible line */}
        {visibleLines >= lines.length && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#444",
              }}
            >
              $&nbsp;
            </span>
            <span
              className="cursor-blink"
              style={{
                display: "inline-block",
                width: 8,
                height: 15,
                background: "#fff",
                opacity: 0.7,
                verticalAlign: "middle",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function getLineColor(line: string): string {
  if (line.startsWith("$")) return "#e0e0e0";
  if (line.startsWith("✓")) return "#707070";
  if (line.startsWith("  ▲") || line.startsWith("[")) return "#606060";
  if (line.includes("→") || line.includes("Up")) return "#505050";
  if (line.startsWith("─") || line.startsWith(" ─")) return "#2a2a2a";
  if (line === "") return "#000";
  return "#444";
}
