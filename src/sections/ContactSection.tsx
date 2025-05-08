import React, { useRef, Suspense ,useState} from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { MapPin, Phone, Mail, Github as GitHub, Linkedin, Twitter } from 'lucide-react';
import FloatingShapes from '../components/3d/FloatingShapes';
import { sub } from 'framer-motion/client';

const ContactSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/api/contact/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      alert(data.message || "Message sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };
  
  

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-200 relative overflow-hidden">
      {/* 3D Background Animation */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <FloatingShapes />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium mb-2">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to new opportunities and collaborations.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-8 backdrop-blur-lg bg-opacity-80">
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent outline-none transition-colors"
                    placeholder="Dilli Basker"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Email@gmail.com
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent outline-none transition-colors"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject" value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent outline-none transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent outline-none transition-colors"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white rounded-lg font-medium transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">CHENNAI, TAMILNADU, INDIA</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:hello@example.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      dillibasker1@gmail.com
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href="tel:+11234567890" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      +91 7845918043
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {[
                  { icon: GitHub, href: 'https://github.com/dillibasker', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/dilli-basker-8aaa262ba', label: 'LinkedIn' },
                  { icon: Twitter, href: 'https://x.com/DilliBasker?t=I_K18H9JozwV46AM_VF8Gw&s=09', label: 'Twitter' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-dark-300 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    whileHover={{ y: -3, scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div 
              className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-xl p-8 text-white shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Let's Work Together</h3>
              <p className="mb-6 opacity-90">
                I'm currently available for freelance work. If you have a project that needs my expertise, let's have a chat.
              </p>
              <motion.a
                href="mailto:dillibasker1@gmail.com"
                className="inline-block px-6 py-3 bg-white text-primary-600 rounded-lg font-medium transition-colors hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;