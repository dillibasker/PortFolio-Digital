import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/dillibasker', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/dilli-basker-8aaa262ba', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:dillibasker1@example.com', label: 'Email' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-200/80 backdrop-blur-md py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter">
          <span className="text-primary-600 dark:text-primary-400">Port</span>
          <span>folio</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 bg-white dark:bg-dark z-50 md:hidden ${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } flex-col`}
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-300">
          <a href="#" className="text-2xl font-bold tracking-tighter">
            <span className="text-primary-600 dark:text-primary-400">Port</span>
            <span>folio</span>
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200 dark:border-dark-300">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;