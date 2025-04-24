import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  category: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white dark:bg-dark-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Category Badge */}
      <div className="absolute top-3 left-3 z-20">
        <span className="px-2 py-1 bg-white/90 dark:bg-dark-200/90 rounded-full text-xs font-medium shadow-md">
          {project.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isHovered ? 0.6 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="relative p-4">
        <motion.h3 
          className="text-lg font-bold mb-2 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag, index) => (
            <motion.span
              key={index}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-medium group/link"
            whileHover={{ x: 3 }}
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </motion.a>

          <div className="flex items-center gap-2">
            <motion.a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-gray-100 dark:bg-dark-200 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-gray-100 dark:bg-dark-200 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-dark-300/80 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;