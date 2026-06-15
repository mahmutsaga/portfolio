import { motion } from "framer-motion";
import ProfileCard from "./ui/ProfileCard"; // import tvoje ProfileCard komponente
import myPhoto from "../assets/maksim.png"; // stavi putanju do tvoje slike

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-10">
          {/* Tekst */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge mb-4">About Me</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
              Hi, I'm <span className="text-gradient">Maksim Krulj</span>
            </h2>

            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
              A 21-year-old developer based in Banja Luka. I'm a React Developer with strong experience building modern, responsive, and user-focused web applications.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              I specialize in React and modern frontend tools, focusing on clean UI, smooth interactions, and scalable component architecture. Alongside frontend development, I also work with Python and FastAPI, which allows me to build full-stack solutions, design REST APIs, and connect frontend applications to efficient backend systems.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              I enjoy turning ideas into real products, writing clean and maintainable code, and continuously improving my skills by working on real-world projects. I'm comfortable working independently or as part of a team, and I'm always eager to learn new technologies and best practices.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              Currently, I'm seeking opportunities as a React Developer, where I can contribute value and grow professionally.
            </p>

            {/* Decorative element */}
            <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Based in Banja Luka
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Remote-friendly
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Open to opportunities
              </div>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="flex-shrink-0 mx-auto lg:mx-0" // mx-auto centrirano na malim ekranima, lg:mx-0 vraća lijevo na desktop
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProfileCard
              name="Maksim"
              surname="Krulj"
              imageSrc={myPhoto}
              height="600px"
              width="320px"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
