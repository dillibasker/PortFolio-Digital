import React, { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import FloatingShapes from '../components/3d/FloatingShapes';
import profilephoto from "../assets/profile_photo.jpg"

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary-100/40 via-primary-50/20 to-transparent dark:from-primary-900/20 dark:via-primary-800/10 dark:to-transparent"
        animate={{
          background: [
            'linear-gradient(to right bottom, rgba(139, 92, 246, 0.1), rgba(249, 115, 22, 0.05))',
            'linear-gradient(to left bottom, rgba(139, 92, 246, 0.15), rgba(249, 115, 22, 0.1))',
            'linear-gradient(to right bottom, rgba(139, 92, 246, 0.1), rgba(249, 115, 22, 0.05))'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Animated shapes background */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <FloatingShapes />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-primary-800 dark:text-primary-300 font-medium">
                Available for Work
              </span>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Crafting Digital{' '}
            <motion.span 
              className="text-primary-600 dark:text-primary-400 inline-block"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Experiences
            </motion.span>
            <br />
            with Purpose
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Full-stack developer specializing in creating beautiful, functional, and user-centered digital experiences.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a 
              href="#projects" 
              className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-full font-medium transition-colors overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Projects</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
            <motion.a 
              href="#contact" 
              className="group relative px-8 py-4 border-2 border-primary-500 dark:border-primary-400 hover:border-primary-600 dark:hover:border-primary-500 rounded-full font-medium transition-colors overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 bg-clip-text text-transparent">
                Let's Talk
              </span>
              <motion.div
                className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20"
                initial={{ y: '-100%' }}
                whileHover={{ y: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div 
            className="mt-12 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {['React', 'Node.js', 'TypeScript', 'Three.js'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-dark-300 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hidden lg:flex justify-center items-center"
          style={{ y, opacity }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div 
            className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden"
            whileHover="hover"
          >
            {/* Replace the src with your actual image URL */}
            <motion.img
              src={profilephoto} 
              alt="Dilli Basker"
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              variants={{
                hover: { scale: 1.1 }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent"
              initial={{ opacity: 0.3 }}
              variants={{
                hover: { opacity: 0.5 }
              }}
            />
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 border-4 border-primary-500/50 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              variants={{
                hover: { scale: 1.05 }
              }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={scrollToNextSection}
      >
        <motion.div 
          className="w-8 h-12 border-2 border-primary-500 dark:border-primary-400 rounded-full flex justify-center pt-2"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-1 h-2 bg-primary-500 dark:bg-primary-400 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Animated corner decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-full h-full border-t-4 border-l-4 border-primary-500/20 dark:border-primary-400/20 rounded-tl-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2">
        <motion.div
          className="w-full h-full border-b-4 border-r-4 border-primary-500/20 dark:border-primary-400/20 rounded-br-full"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;