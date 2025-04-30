import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import SkillsCloud from '../components/3d/SkillsCloud';

// Skill categories and items
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next', level: 90 },
      { name: 'React Native', level: 90 },
      { name: 'Flutter', level: 90 },
      { name: 'Vite', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'Django', level: 75 },
      { name: 'Firebase', level: 65 },
      { name: 'MongoDB', level: 75 },
      { name: 'SQL', level: 70 },
      {name: 'REST APIs', level: 70 },
    ],
  },
  {
    title: 'Blockchain',
    skills: [
      { name: 'Solidity', level: 90 },
      { name: 'Ethereum', level: 75 },
      { name: 'Ethers.js', level: 65 },
      { name: 'IPFS (Filecoin, Infura)', level: 80 },
      { name: 'Smart Contract Deployment & Testing', level: 80 },
    ],
  },
  {
    title: 'AI/ML',
    skills: [
      { name: 'TensorFlow', level: 70 },
      { name: 'Scikit-learn', level: 75 },
      { name: 'Python', level: 90 },
      { name: 'PyTorch', level: 80 },
      { name: 'Truffle', level: 70 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 95 },
      { name: 'Docker', level: 65 },
      { name: 'Jest', level: 80 },
      { name: 'Figma', level: 70 },
      {name: 'vercel', level: 70 },
      {name: 'Postman', level: 70 },
    ],
  },
];

const SkillsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="h-full w-full opacity-5">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <SkillsCloud />
          </Canvas>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium mb-2">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Technical Expertise</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm constantly learning and updating my skills to stay current with the latest technologies and best practices.
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-dark-200 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-4">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-dark-300 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + (skillIndex * 0.1) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;