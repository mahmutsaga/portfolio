import type { ReactNode } from "react";

export interface Tech {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  color: string; // brand color for laser dots
}

export interface Layer {
  id: number;
  number: string;
  title: string;
  techs: Tech[];
}

// ── Icon factory ──────────────────────────────────────────────────
function Ico({
  color,
  children,
  fill,
}: {
  color: string;
  children: ReactNode;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={fill ?? "none"}
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

// ── Layer data ────────────────────────────────────────────────────
export const LAYERS: Layer[] = [
  {
    id: 0,
    number: "01",
    title: "Infrastructure",
    techs: [
      {
        id: "0-0",
        name: "PostgreSQL",
        color: "#4A90D9",
        description:
          "Relational database with full ACID compliance, powering all persistent data storage.",
        icon: (
          <Ico color="#4A90D9">
            <ellipse cx="12" cy="6"  rx="8" ry="2.5" />
            <path d="M4 6v5M20 6v5" />
            <ellipse cx="12" cy="11" rx="8" ry="2.5" />
            <path d="M4 11v5M20 11v5" />
            <ellipse cx="12" cy="16" rx="8" ry="2.5" />
          </Ico>
        ),
      },
      {
        id: "0-1",
        name: "Supabase",
        color: "#3ECF8E",
        description:
          "Open-source Firebase alternative with real-time subscriptions and built-in auth.",
        icon: (
          <Ico color="#3ECF8E">
            <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
          </Ico>
        ),
      },
      {
        id: "0-2",
        name: "Docker",
        color: "#2496ED",
        description:
          "Containerized services ensuring fully consistent environments across every deployment.",
        icon: (
          <Ico color="#2496ED">
            <rect x="2"  y="8" width="4" height="3" rx=".5" />
            <rect x="7"  y="8" width="4" height="3" rx=".5" />
            <rect x="12" y="8" width="4" height="3" rx=".5" />
            <rect x="7"  y="3" width="4" height="3" rx=".5" />
            <rect x="12" y="3" width="4" height="3" rx=".5" />
            <path d="M2 14h13a4 4 0 0 0 4-4" />
            <path d="M20.5 7.5c1.5 0 2.5.8 2.5 2" />
          </Ico>
        ),
      },
      {
        id: "0-3",
        name: "Redis",
        color: "#DC382D",
        description:
          "In-memory key-value store for high-speed caching, queuing, and session state.",
        icon: (
          <Ico color="#DC382D">
            <ellipse cx="12" cy="6"  rx="9" ry="3" />
            <path d="M3 6v5M21 6v5" />
            <ellipse cx="12" cy="11" rx="9" ry="3" />
            <path d="M3 11v5M21 11v5" />
            <ellipse cx="12" cy="16" rx="9" ry="3" />
          </Ico>
        ),
      },
    ],
  },
  {
    id: 1,
    number: "02",
    title: "Backend & API",
    techs: [
      {
        id: "1-0",
        name: "Node.js",
        color: "#68A063",
        description:
          "Event-driven JavaScript runtime for scalable, non-blocking server-side applications.",
        icon: (
          <Ico color="#68A063">
            <path d="M12 2l9 5v10l-9 5-9-5V7z" />
            <path d="M12 7v10" />
            <path d="M7.5 9.5l9 5" />
          </Ico>
        ),
      },
      {
        id: "1-1",
        name: "FastAPI",
        color: "#059669",
        description:
          "High-performance Python API framework with automatic OpenAPI documentation.",
        icon: (
          <Ico color="#059669">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v5l3.5 2" />
            <path d="M7 16.5l10-9" />
          </Ico>
        ),
      },
      {
        id: "1-2",
        name: "REST API",
        color: "#F97316",
        description:
          "Stateless HTTP interface design following RESTful architectural constraints.",
        icon: (
          <Ico color="#F97316">
            <path d="M5 12h14M13 6l6 6-6 6" />
            <circle cx="4" cy="6"  r="1.8" fill="#F97316" stroke="none" />
            <circle cx="4" cy="12" r="1.8" fill="#F97316" stroke="none" />
            <circle cx="4" cy="18" r="1.8" fill="#F97316" stroke="none" />
          </Ico>
        ),
      },
      {
        id: "1-3",
        name: "C++",
        color: "#6B9BD2",
        description:
          "Systems-level language for performance-critical computation and native tooling.",
        icon: (
          <Ico color="#6B9BD2">
            <path d="M7 18c-3.3 0-5-2.5-5-6s1.7-6 5-6" />
            <line x1="13" y1="9" x2="19" y2="9" />
            <line x1="16" y1="6" x2="16" y2="12" />
            <line x1="20" y1="9" x2="26" y2="9" />
            <line x1="23" y1="6" x2="23" y2="12" />
          </Ico>
        ),
      },
    ],
  },
  {
    id: 2,
    number: "03",
    title: "Gateway & AI",
    techs: [
      {
        id: "2-0",
        name: "Next.js",
        color: "#E5E5E5",
        description:
          "React framework with SSR, App Router architecture, and built-in edge routing.",
        icon: (
          <Ico color="#E5E5E5">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 8h5l4 8" />
            <path d="M8 8v8" />
          </Ico>
        ),
      },
      {
        id: "2-1",
        name: "Artificial Intelligence",
        color: "#A78BFA",
        description:
          "LLM integration, vector embeddings, and intelligent workflow automation at scale.",
        icon: (
          <Ico color="#A78BFA">
            <circle cx="5"  cy="5"  r="2" />
            <circle cx="19" cy="5"  r="2" />
            <circle cx="12" cy="12" r="2.5" />
            <circle cx="5"  cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
            <path d="M7 5h10M5 7v10M19 7v10M7 19h10" />
            <path d="M7 7l3.5 3.5M17 7l-3.5 3.5M7 17l3.5-3.5M17 17l-3.5-3.5" />
          </Ico>
        ),
      },
      {
        id: "2-2",
        name: "Netlify",
        color: "#00C7B7",
        description:
          "Edge-deployed CI/CD platform with atomic deploys and serverless function support.",
        icon: (
          <Ico color="#00C7B7">
            <path d="M7 18l-3.5-6 3.5-6h3l3 6-3 6z" />
            <path d="M17 18l3.5-6-3.5-6h-3l-3 6 3 6z" />
            <line x1="7" y1="12" x2="17" y2="12" />
          </Ico>
        ),
      },
      {
        id: "2-3",
        name: "Edge Functions",
        color: "#F97316",
        description:
          "Low-latency serverless compute running at the network edge, close to every user.",
        icon: (
          <Ico color="#F97316">
            <circle cx="12" cy="12" r="9" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" />
            <path d="M3 12h18M4 7.5h16M4 16.5h16" />
          </Ico>
        ),
      },
    ],
  },
  {
    id: 3,
    number: "04",
    title: "Frontend & Mobile",
    techs: [
      {
        id: "3-0",
        name: "React",
        color: "#61DAFB",
        description:
          "Component-based UI library for building fast, declarative web interfaces.",
        icon: (
          <Ico color="#61DAFB">
            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
          </Ico>
        ),
      },
      {
        id: "3-1",
        name: "React Native",
        color: "#61DAFB",
        description:
          "Cross-platform mobile development targeting iOS and Android from a single codebase.",
        icon: (
          <Ico color="#61DAFB">
            <rect x="6" y="2" width="12" height="20" rx="2" />
            <circle cx="12" cy="18" r=".8" fill="#61DAFB" />
            <circle cx="12" cy="10" r="1.5" fill="#61DAFB" stroke="none" />
            <ellipse cx="12" cy="10" rx="5" ry="2" />
            <ellipse cx="12" cy="10" rx="5" ry="2" transform="rotate(60 12 10)" />
            <ellipse cx="12" cy="10" rx="5" ry="2" transform="rotate(120 12 10)" />
          </Ico>
        ),
      },
      {
        id: "3-2",
        name: "Tailwind CSS",
        color: "#38BDF8",
        description:
          "Utility-first CSS framework for rapid, consistent, and fully scalable styling.",
        icon: (
          <Ico color="#38BDF8">
            <path d="M6 8c1-4 3.5-5.5 6-4 2.5 1.5 3 5 5.5 6 2.5 1 4.5-.5 5.5-2" />
            <path d="M3 16c1-4 3.5-5.5 6-4 2.5 1.5 3 5 5.5 6 2.5 1 4.5-.5 5.5-2" />
          </Ico>
        ),
      },
      {
        id: "3-3",
        name: "TypeScript",
        color: "#3B82F6",
        description:
          "Typed JavaScript superset enabling safer, more maintainable large-scale codebases.",
        icon: (
          <Ico color="#3B82F6">
            <rect x="2" y="2" width="20" height="20" rx="1.5" />
            <path d="M7.5 16v-4.5H11a2 2 0 0 1 0 4H7.5" />
            <path d="M14 11.5v5" />
            <path d="M12 11.5h4" />
          </Ico>
        ),
      },
    ],
  },
];

// ── Connections: [fromLayer, fromChip] → [toLayer, toChip] ────────
// Connections 0–3: L1→L2 (transition 0)
// Connections 4–7: L2→L3 (transition 1)
// Connections 8–11: L3→L4 (transition 2)
export const CONNECTIONS = [
  { from: [0, 0], to: [1, 0], dur: 1.6, delay: 0.0  },
  { from: [0, 1], to: [1, 1], dur: 1.6, delay: 0.0  },
  { from: [0, 2], to: [1, 2], dur: 1.6, delay: 0.0  },
  { from: [0, 3], to: [1, 3], dur: 1.6, delay: 0.0  },

  { from: [1, 0], to: [2, 0], dur: 1.6, delay: 0.0  },
  { from: [1, 1], to: [2, 1], dur: 1.6, delay: 0.0  },
  { from: [1, 2], to: [2, 2], dur: 1.6, delay: 0.0  },
  { from: [1, 3], to: [2, 3], dur: 1.6, delay: 0.0  },

  { from: [2, 0], to: [3, 0], dur: 1.6, delay: 0.0  },
  { from: [2, 1], to: [3, 1], dur: 1.6, delay: 0.0  },
  { from: [2, 2], to: [3, 2], dur: 1.6, delay: 0.0  },
  { from: [2, 3], to: [3, 3], dur: 1.6, delay: 0.0  },
];
