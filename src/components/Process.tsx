import { motion } from "framer-motion";
import { Lightbulb, Plug, Layers, Rocket } from "lucide-react";
import TiltedCard from "./ui/TiltedCard"; // import tvoje TiltedCard komponente

const steps = [
  {
    number: "01",
    title: "Planning & UX",
    description:
      "Understanding requirements, mapping user flows, and designing intuitive interfaces before writing any code.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "API Integration",
    description:
      "Connecting to backend services with proper error handling, loading states, and secure data management.",
    icon: Plug,
  },
  {
    number: "03",
    title: "State Management",
    description:
      "Implementing scalable state architecture using Redux Toolkit or Zustand for predictable app behavior.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Testing & Deployment",
    description:
      "Thorough testing, performance optimization, and smooth deployment to the Web.",
    icon: Rocket,
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/20">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">Workflow</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            How I <span className="text-gradient">Build</span> Systems
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A systematic approach to building production-ready mobile applications.
          </p>
        </motion.div>

        {/* Steps grid using TiltedCard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltedCard
                containerWidth="100%"
                containerHeight="280px"
                imageWidth="100%"
                imageHeight="100%"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showMobileWarning={false}
                bgColor="#0b0d11" // boja kartice
                overlayContent={
                  <div className="p-6 flex flex-col items-start justify-center h-full">
                    {/* Step number */}
                    <span className="text-5xl font-heading font-bold text-primary/10 absolute top-4 right-4">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                }
                displayOverlayContent={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
