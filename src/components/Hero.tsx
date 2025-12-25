import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileText } from "lucide-react";
import CVModal from "./CVModal";
import ThreeScene from "./ui/ThreeScene"; // tvoj 3D component

const Hero = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [show3D, setShow3D] = useState(true);

  // Provjera aspect ratio
  useEffect(() => {
    const checkAspect = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      setShow3D(aspectRatio >= 4 / 3); // 4:3 i više -> prikazati 3D
    };

    checkAspect();
    window.addEventListener("resize", checkAspect);
    return () => window.removeEventListener("resize", checkAspect);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;

    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 3D pozadina samo ako je aspect >= 4:3 */}
      {show3D && <ThreeScene />}

      {/* Efekti pozadine */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Sadržaj preko 3D modela */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
        <div className="section-container w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center lg:text-left" // Centrirano na malim ekranima, lijevo na velikim
            >
              <span className="badge">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-center lg:text-left"
            >
              Frontend <span className="text-gradient">React</span>
              <br />
              Developer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl text-center lg:text-left"
            >
              Building secure, production-ready web applications with React, modern APIs, and exceptional UX.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="lg" onClick={scrollToProjects}>
                View Projects <ArrowDown className="w-4 h-4" />
              </Button>
            </motion.div>

            <CVModal
              isOpen={isCVModalOpen}
              onClose={() => setIsCVModalOpen(false)}
            />
          </div>

          {/* Right side prazno jer je 3D u pozadini */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-5"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
