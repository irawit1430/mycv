import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero3D from './Hero3D';

const SpotlightName = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    let rafId: number;
    let targetX = container.offsetWidth / 2;
    let targetY = container.offsetHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      const rect = container.getBoundingClientRect();
      targetX = rect.width / 2;
      targetY = rect.height / 2;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      text.style.setProperty('--x', `${currentX}px`);
      text.style.setProperty('--y', `${currentY}px`);

      rafId = requestAnimationFrame(animate);
    };

    animate();
    handleMouseLeave();
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative cursor-default select-none mx-auto p-8 flex items-center justify-center"
      style={{ minHeight: '200px' }}
    >
      {/* Base layer (darker) */}
      <h1 className="text-6xl md:text-7xl font-bold text-gray-700/50">
        Anurag Tiwary
      </h1>

      {/* Spotlight layer */}
      <div
        ref={textRef}
        className="spotlight-text absolute inset-0 flex items-center justify-center"
        style={{
          WebkitMaskImage: 'radial-gradient(circle 250px at var(--x) var(--y), white 30%, transparent 70%)',
          maskImage: 'radial-gradient(circle 250px at var(--x) var(--y), white 30%, transparent 70%)',
        }}
      >
        <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Anurag Tiwary
        </span>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <SpotlightName />

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl md:text-3xl text-gray-300 mt-6 mb-8"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Frontend Developer
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Crafting digital experiences with modern web technologies
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center space-x-6"
        >
          {[
            { Icon: Github, href: "https://github.com/yourusername" },
            { Icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
            { Icon: Mail, href: "mailto:Anuirawtt@gmail.com" }
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-400"
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}