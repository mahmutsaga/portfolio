import CircuitBoard from "@/components/CircuitBoard";
import LightRays from "@/components/ui/LightRays";

export default function Index() {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {/* Light rays background */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.35,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.4}
          lightSpread={1.8}
          rayLength={1.8}
          fadeDistance={0.9}
          saturation={0}
          followMouse={true}
          mouseInfluence={0.06}
        />
      </div>
      <CircuitBoard />
    </div>
  );
}
