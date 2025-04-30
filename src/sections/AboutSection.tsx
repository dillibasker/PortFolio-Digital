import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AnimatedTorusKnot } from '../components/3d/AnimatedTorusKnot';
import resume from "../assets/resume.pdf"

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 bg-white dark:bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-100 dark:from-dark-200 to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-2 rounded-xl overflow-hidden h-[400px] shadow-xl">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <AnimatedTorusKnot />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={3} />
              </Canvas>
            </div>
          </motion.div>
          
          <div>
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium mb-2">
                About Me
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Passionate creator of digital experiences</h2>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6">
            Focused on building real-world web and mobile applications with clean, scalable code.
Experienced in full-stack development, DApps, and smart contract integration.
Skilled in React.js, Node.js, MongoDB, Flutter, Solidity, and modern tools.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6">
            Built projects ranging from task managers to blockchain-based credential systems.
Participated in 9+ hackathons with real-time, AI, and microservices use cases.
Exploring the intersection of AI and blockchain to build impactful solutions.
Committed to delivering products that are innovative, efficient, and user-focused.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">2+</h3>
                <p className="text-gray-600 dark:text-gray-400">Years of experience</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">15+</h3>
                <p className="text-gray-600 dark:text-gray-400">Projects completed</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">8+</h3>
                <p className="text-gray-600 dark:text-gray-400">Happy clients</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">15+</h3>
                <p className="text-gray-600 dark:text-gray-400">Technologies mastered</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <a 
                href={resume} 
                download // <- this triggers the download
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-full font-medium transition-colors inline-block"
              >
                Download Resume
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;