import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import Chip from "./Chip";
import Navbar from "./Navbar";
import TiltedCard from "./ui/TiltedCard";
import { LAYERS, CONNECTIONS } from "@/data/layers";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// ── Constants ──────────────────────────────────────────────────────
const LASER_DUR    = 1.4;   // seconds for one packet to travel the path
const LASER_COOLDOWN = 800; // ms — prevents re-firing on micro-jitter
const PCB_GAP      = 100;   // px — right-angle turn offset from chip edge

// ── Types ──────────────────────────────────────────────────────────
interface PathData {
  id: string;
  d: string;
  color: string;
  transition: number; // 0 | 1 | 2
}

// ── Helper ────────────────────────────────────────────────────────
function relPos(el: HTMLElement, container: HTMLElement) {
  const er = el.getBoundingClientRect();
  const cr = container.getBoundingClientRect();
  return {
    cx:     er.left - cr.left + er.width / 2,
    top:    er.top  - cr.top  + container.scrollTop,
    bottom: er.top  - cr.top  + container.scrollTop + er.height,
  };
}

// ── Work History card ─────────────────────────────────────────────
function WorkCard({
  company, role, period, description, badge, color,
}: {
  company: string; role: string; period: string;
  description: string; badge?: string; color: string;
}) {
  return (
    <div
      style={{
        border: "0.5px solid #1e1e1e",
        padding: "28px 32px",
        background: "#040404",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(20px, 2vw, 26px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {company}
        </h3>
        {badge && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 600,
              color: color,
              border: `0.5px solid ${color}55`,
              padding: "3px 8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              flexShrink: 0,
              marginLeft: 16,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.12em",
          marginBottom: 16,
        }}
      >
        {role} &nbsp;·&nbsp; {period}
      </p>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function CircuitBoard() {
  const { isMobile, isTablet } = useBreakpoint();
  const containerRef  = useRef<HTMLDivElement>(null);
  const chipRefs      = useRef(new Map<string, HTMLDivElement>());
  const sectionRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const lastFireTime  = useRef([-Infinity, -Infinity, -Infinity]);

  const [paths,      setPaths]      = useState<PathData[]>([]);
  const [svgH,       setSvgH]       = useState(0);
  const [firedSet,   setFiredSet]   = useState(new Set<number>()); // traces stay
  const [dotsActive, setDotsActive] = useState(new Set<number>()); // dots are one-shot
  const [fireKey,    setFireKey]    = useState([0, 0, 0]);
  const [activeSection, setActiveSection] = useState(0);

  // ── Compute right-angle PCB paths ─────────────────────────────
  const compute = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;

    const pos = new Map<string, ReturnType<typeof relPos>>();
    chipRefs.current.forEach((el, key) => pos.set(key, relPos(el, c)));

    const cw  = c.offsetWidth;
    const cx  = cw / 2; // convergence X = horizontal center of viewport
    const computed: PathData[] = [];

    CONNECTIONS.forEach((conn, i) => {
      const f = pos.get(`${conn.from[0]}-${conn.from[1]}`);
      const t = pos.get(`${conn.to[0]}-${conn.to[1]}`);
      if (!f || !t) return;

      // Right-angle PCB routing: all signals fan into center, then fan out
      //
      //  chip.cx  chip.bottom
      //      │
      //      │  (drop PCB_GAP px)
      //      │
      //  ────┼────────────────── funnelY   (all chips turn here)
      //                    │
      //                    │ center.x
      //                    │
      //  ────┬────────────────── spreadY   (all targets receive here)
      //      │
      //      │  (rise PCB_GAP px)
      //      │
      //  target.cx  target.top

      const funnelY = f.bottom + PCB_GAP;
      const spreadY = t.top    - PCB_GAP;

      const d = [
        `M${f.cx.toFixed(1)},${f.bottom.toFixed(1)}`,
        `L${f.cx.toFixed(1)},${funnelY.toFixed(1)}`,    // drop
        `L${cx.toFixed(1)},${funnelY.toFixed(1)}`,       // 90° → center
        `L${cx.toFixed(1)},${spreadY.toFixed(1)}`,       // down center (convergence zone)
        `L${t.cx.toFixed(1)},${spreadY.toFixed(1)}`,     // 90° → target
        `L${t.cx.toFixed(1)},${t.top.toFixed(1)}`,       // rise
      ].join(" ");

      const srcTech = LAYERS[conn.from[0]].techs[conn.from[1]];
      computed.push({ id: `p${i}`, d, color: srcTech.color, transition: Math.floor(i / 4) });
    });

    setPaths(computed);
    setSvgH(c.scrollHeight);
  }, []);

  useLayoutEffect(() => { compute(); }, [compute]);
  useEffect(() => {
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [compute]);

  // ── One-shot scroll trigger ────────────────────────────────────
  const fire = useCallback((tIdx: number) => {
    const now = Date.now();
    if (now - lastFireTime.current[tIdx] < LASER_COOLDOWN) return;
    lastFireTime.current[tIdx] = now;

    setFiredSet(prev  => new Set([...prev, tIdx]));
    setDotsActive(prev => new Set([...prev, tIdx]));
    setFireKey(prev => { const n = [...prev]; n[tIdx]++; return n; });

    // Dots play once then disappear
    setTimeout(() => {
      setDotsActive(prev => {
        const next = new Set(prev);
        next.delete(tIdx);
        return next;
      });
    }, (LASER_DUR + 0.4) * 1000);
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const lIdx = Number((entry.target as HTMLElement).dataset.sectionIndex);
          if (entry.isIntersecting) {
            setActiveSection(lIdx);
            // Fire laser when entering a tech layer (not for About/Work History)
            if (lIdx > 0 && lIdx <= 3) fire(lIdx - 1);
          }
        });
      },
      { root: c, threshold: 0.4 }
    );

    sectionRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [fire]);

  // ── Scroll to section helper (exposed via Navbar) ──────────────
  const scrollToSection = useCallback((idx: number) => {
    const c   = containerRef.current;
    const sec = sectionRefs.current[idx];
    if (!c || !sec) return;
    c.scrollTo({ top: sec.offsetTop, behavior: "smooth" });
  }, []);

  // ── Chip ref factory ───────────────────────────────────────────
  const refFor = useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      if (el) chipRefs.current.set(key, el);
      else    chipRefs.current.delete(key);
    },
    []
  );

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      <Navbar onScrollTo={scrollToSection} activeSection={activeSection} />

      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          position: "relative",
          background: "transparent",
        }}
      >
        {/* ── Full-height SVG overlay ──────────────────────────── */}
        <svg
          width="100%"
          height={svgH || "100%"}
          style={{
            position: "absolute",
            top: 0, left: 0,
            overflow: "visible",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <defs>
            {/* Invisible path defs for animateMotion — re-keyed on each fire */}
            {paths.map(p => (
              <path
                key={`def-${p.id}-${fireKey[p.transition]}`}
                id={`path-${p.id}`}
                d={p.d}
                fill="none"
                stroke="none"
              />
            ))}
            <filter id="laser" x="-600%" y="-600%" width="1300%" height="1300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="tglow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Always-dim PCB traces */}
          {paths.map(p => (
            <path
              key={`dim-${p.id}`}
              d={p.d}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          ))}

          {/* Fired trace: draw-on once, stays at low brightness */}
          {paths.map(p => {
            if (!firedSet.has(p.transition)) return null;
            return (
              <path
                key={`trace-${p.id}-${fireKey[p.transition]}`}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth="0.8"
                strokeOpacity="0.18"
                filter="url(#tglow)"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "drawTrace 0.5s ease-out 0.05s forwards",
                }}
              />
            );
          })}

          {/* One-shot laser dots */}
          {paths.flatMap(p => {
            if (!dotsActive.has(p.transition)) return [];
            return (
              <circle
                key={`dot-${p.id}-${fireKey[p.transition]}`}
                r="3"
                fill={p.color}
                filter="url(#laser)"
              >
                {/* Travel the path once */}
                <animateMotion
                  dur={`${LASER_DUR}s`}
                  repeatCount="1"
                  fill="freeze"
                  begin="0s"
                >
                  <mpath href={`#path-${p.id}`} />
                </animateMotion>
                {/* Fade in → hold → fade out */}
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.82;1"
                  dur={`${LASER_DUR}s`}
                  repeatCount="1"
                  fill="freeze"
                  begin="0s"
                />
              </circle>
            );
          })}

        </svg>

        {/* ── Tech layer sections (0–3) ──────────────────────── */}
        {LAYERS.map((layer, layerIdx) => {
          const isActive = layerIdx === 0 || firedSet.has(layerIdx - 1);

          return (
            <div
              key={layer.id}
              ref={el => { sectionRefs.current[layerIdx] = el; }}
              data-section-index={layerIdx}
              style={{
                height: "100vh",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: isMobile ? "64px 16px 24px" : isTablet ? "72px 28px 32px" : "72px 48px 48px",
                position: "relative",
                zIndex: 1,
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: "100%", maxWidth: 1120 }}>
                {/* Layer label */}
                <div style={{ marginBottom: "2.5vh", display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      color: isActive ? "rgba(255,255,255,0.22)" : "#181818",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      transition: "color 0.6s",
                    }}
                  >
                    {layer.number}
                  </span>
                  <div style={{ width: 28, height: "0.5px", background: isActive ? "#2e2e2e" : "#141414", transition: "background 0.6s" }} />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      color: isActive ? "rgba(255,255,255,0.22)" : "#181818",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      transition: "color 0.6s",
                    }}
                  >
                    {layer.title}
                  </span>
                </div>

                {/* Big title */}
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(44px, 5.5vw, 78px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: isActive ? "#ffffff" : "#0a0a0a",
                    marginBottom: "4.5vh",
                    lineHeight: 1,
                    transition: "color 0.6s",
                  }}
                >
                  {layer.title}
                </h2>

                {/* chip grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                    gap: isMobile ? 10 : 16,
                  }}
                >
                  {layer.techs.map((tech) => (
                    <div
                      key={tech.id}
                      ref={refFor(tech.id)}
                    >
                      <TiltedCard
                        containerHeight={isMobile ? "190px" : isTablet ? "220px" : "250px"}
                        bgColor="#040404"
                        borderColor={isActive ? `${tech.color}28` : "#181818"}
                        borderWidth="0.5px"
                        borderRadius="2px"
                        scaleOnHover={1.04}
                        rotateAmplitude={10}
                        showMobileWarning={false}
                        displayOverlayContent
                        overlayContent={
                          <Chip
                            name={tech.name}
                            description={tech.description}
                            icon={tech.icon}
                            color={tech.color}
                            active={isActive}
                          />
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* ── About section (index 4) ────────────────────────── */}
        <div
          ref={el => { sectionRefs.current[4] = el; }}
          data-section-index={4}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "64px 16px 24px" : isTablet ? "72px 28px 32px" : "72px 48px 48px",
            position: "relative",
            zIndex: 1,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: 900 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              05 — About
            </p>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(44px, 5.5vw, 78px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "5vh",
                lineHeight: 1,
              }}
            >
              About Me.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 32 : 48,
                alignItems: "start",
              }}
            >
              {/* Bio */}
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  I'm a 20-year-old full-stack developer and systems thinker
                  based in Banja Luka, Bosnia. From the moment I touched a
                  computer as a kid, I was hooked — not just using technology,
                  but understanding how it works at every layer.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.8,
                  }}
                >
                  That curiosity led me to study at Apeiron University in Banja
                  Luka and to start building real products while still in school.
                  I find the most satisfaction at the intersection of architecture,
                  performance, and clean interfaces.
                </p>
              </div>

              {/* Key facts */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  ["Age",      "20"],
                  ["Location", "Banja Luka, Bosnia"],
                  ["Studies",  "Apeiron University, BL"],
                  ["Company",  "++i d.o.o."],
                  ["Focus",    "Full-Stack · Mobile · AI"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom: "0.5px solid #141414",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Work History section (index 5) ─────────────────── */}
        <div
          ref={el => { sectionRefs.current[5] = el; }}
          data-section-index={5}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "64px 16px 24px" : isTablet ? "72px 28px 32px" : "72px 48px 48px",
            position: "relative",
            zIndex: 1,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: 1000 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              06 — Work History
            </p>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(44px, 5.5vw, 78px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "5vh",
                lineHeight: 1,
              }}
            >
              Work History.
            </h2>

            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 16 : 20 }}>
              <WorkCard
                company="LumionMotion"
                role="Founder & Lead Developer"
                period="2024 — Present"
                badge="Under Development"
                color="#A78BFA"
                description="AI-powered motion design software for creators and studios. Building a platform that transforms how motion graphics are conceived and produced — from prompt to finished animation. Currently in active development."
              />
              <WorkCard
                company="++i d.o.o."
                role="Full-Stack Developer"
                period="2024 — Present"
                badge="Active"
                color="#3ECF8E"
                description="Building production-grade web and mobile applications at an innovative software company based in Bosnia. Working across the full stack — from database architecture and REST APIs to React Native mobile interfaces."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
