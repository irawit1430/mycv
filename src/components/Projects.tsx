import React, { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Rytful Media",
    description: "Digital Marketing Agency | Modern Web Solutions",
    tech: ["React", "TailwindCSS", "TypeScript"],
    link: "https://rytfulmedia.com/",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "KVIPL",
    description: "Construction Materials & Solutions Platform",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://kvipl.in/",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Right Fame",
    description: "Digital Marketing & Growth Solutions",
    tech: ["React", "TailwindCSS", "JavaScript"],
    link: "https://rightfame.in/",
    color: "from-orange-500 to-red-600"
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      
      <div className="relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Interactive background effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
          <div 
            className="absolute h-[300px] w-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              left: "var(--mouse-x)",
              top: "var(--mouse-y)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none"
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <motion.h3 
            className="text-xl font-semibold text-white mb-2"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-400 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 text-sm bg-gray-700/50 text-gray-300 rounded-full hover:bg-purple-500/20 hover:text-purple-300 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            <span>View Live</span>
            <ExternalLink size={16} className="ml-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
                animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Showcasing my journey through web development and digital solutions
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}