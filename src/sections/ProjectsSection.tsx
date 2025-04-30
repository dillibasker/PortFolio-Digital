import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

// Example project data
const projects = [
  {
    id: 1,
    title: 'Ai-MarketPlace',
    description: 'Full-stack AI marketplace leveraging blockchain for secure model ownership, IPFS for storage, and smart contracts for decentralized transactions.',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['React', 'Node.js', 'MongoDB', 'TensorFlow' , 'Solidity' , 'Ethereum'],
    demoLink: 'https://example.com',
    codeLink: 'https://github.com/dillibasker/AI-Marketplace-Blockchain',
    category: 'Blockchain',
  },
  {
    id: 2,
    title: 'Lottory Dapp',
    description: 'A decentralized lottery application using smart contracts, ensuring fair winner selection, transparent participation, and secure fund handling on the blockchain.',
    image: 'https://images.pexels.com/photos/6177642/pexels-photo-6177642.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['React', 'Solidity' , 'Ethereum'],
    demoLink: 'https://example.com',
    codeLink: 'https://github.com',
    category: 'Blockchain',
  },
  {
    id: 3,
    title: 'Marketplace',
    description: 'Blockchain-based marketplace for uploading, buying, and verifying AI models using smart contracts, IPFS storage, and secure wallet integration.',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Next.js', 'Solidity' , 'Ethereum'],
    demoLink: 'https://example.com',
    codeLink: 'https://github.com',
    category: 'Blockchain',
  },
  {
    id: 4,
    title: 'Decentralized Identity Verification',
    description: 'A blockchain-based system for securely storing and verifying user identities and certificates using smart contracts and IPFS technology.',
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['React', 'Solidity' , 'Ethereum'],
    demoLink: 'https://example.com',
    codeLink: 'https://github.com/dillibasker/EDU-Dapp.git',
    category: 'Blockchain',
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'A modern portfolio website with 3D animations and interactive elements.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['React', 'Node.js', 'MongoDB',],
    demoLink: 'https://port-folio-digital.vercel.app/',
    codeLink: 'https://github.com/dillibasker/PortFolio-Digital',
    category: 'Full stack',
  },
];

const ProjectsSection: React.FC = () => {
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

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-200 dark:to-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium mb-2">
              Featured Projects
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            My Recent Work
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Here are some of my recent projects that showcase my skills and expertise in web development and design.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-dark-300 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-medium bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              View All Projects
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;