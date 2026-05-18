interface Props {
  onScrollTo: (sectionIndex: number) => void;
  activeSection: number;
}

const LINKS = [
  { label: "Stack",        section: 0 },
  { label: "About",        section: 4 },
  { label: "Work History", section: 5 },
];

export default function Navbar({ onScrollTo, activeSection }: Props) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "0.5px solid #141414",
        zIndex: 200,
      }}
    >
      {/* Name */}
      <button
        onClick={() => onScrollTo(0)}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.03em",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Maksim Krulj
      </button>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {LINKS.map(({ label, section }) => {
          const isActive = activeSection === section ||
            (section === 0 && activeSection < 4);
          return (
            <button
              key={label}
              onClick={() => onScrollTo(section)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition: "color 0.2s, font-weight 0.2s",
                padding: 0,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Section dots */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            onClick={() => onScrollTo(i)}
            style={{
              width: i === activeSection ? 16 : 4,
              height: 4,
              borderRadius: 2,
              background: i === activeSection ? "#ffffff" : "#282828",
              cursor: "pointer",
              transition: "width 0.3s, background 0.3s",
            }}
          />
        ))}
      </div>
    </nav>
  );
}
