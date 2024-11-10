import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Book, Briefcase, Award, Star } from 'lucide-react';

const skills = [
  { name: 'HTML', level: 90, color: '#E34F26' },
  { name: 'CSS', level: 85, color: '#1572B6' },
  { name: 'JavaScript', level: 80, color: '#F7DF1E' },
  { name: 'React.js', level: 75, color: '#61DAFB' },
  { name: 'Python', level: 70, color: '#3776AB' },
  { name: 'C/C++', level: 65, color: '#00599C' },
];

const AnimatedCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

const SkillBar = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  const [isInView, setIsInView] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{skill.name}</span>
        <span className="text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`
          }}
        />
      </div>
    </motion.div>
  );
};

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              filter: 'blur(50px)'
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          A highly motivated and detail-oriented BCA graduate passionate about creating exceptional web experiences
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <AnimatedCard>
              <div className="flex items-center mb-6">
                <Code className="text-purple-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold text-white">Technical Skills</h3>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <div className="flex items-center mb-6">
                <Book className="text-purple-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-6 border-l-2 border-purple-500/30"
              >
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-2" />
                <h4 className="text-white font-medium">BCA (Bachelor of Computer Applications)</h4>
                <p className="text-purple-400">GOPAL NARAYAN SINGH UNIVERSITY</p>
                <p className="text-gray-400">2021 - 2024</p>
              </motion.div>
            </AnimatedCard>
          </div>

          <div className="space-y-8">
            <AnimatedCard>
              <div className="flex items-center mb-6">
                <Briefcase className="text-purple-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold text-white">Experience</h3>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-6 border-l-2 border-purple-500/30"
              >
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-2" />
                <h4 className="text-white font-medium">Frontend Development Intern</h4>
                <p className="text-purple-400">FEB 2024 - MAY 2024</p>
                <ul className="list-disc list-inside text-gray-400 mt-2 space-y-2">
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Developed and maintained frontend using HTML, CSS, and JavaScript
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Improved user interface for better experience and accessibility
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Fixed bugs and improved web application performance
                  </motion.li>
                </ul>
              </motion.div>
            </AnimatedCard>

            <AnimatedCard>
              <div className="flex items-center mb-6">
                <Star className="text-purple-400 mr-2" size={24} />
                <h3 className="text-xl font-semibold text-white">Languages</h3>
              </div>
              <div className="space-y-4">
                {['English', 'Hindi'].map((language, index) => (
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-gray-400">{language}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
}