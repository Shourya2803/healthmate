// Footer.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const iconRefs = useRef([]);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    iconRefs.current.forEach((icon, index) => {
      gsap.fromTo(
        icon,
        { scale: 1 },
        {
          scale: 1.2,
          duration: 0.3,
          ease: 'power1.inOut',
          paused: true,
          yoyo: true,
          repeat: 1,
          onStart: () => {
            icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.2 }));
            icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1 }));
          },
        }
      );
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "backOut" }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    },
    hover: { scale: 1.2, transition: { duration: 0.3 } }
  };

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gray-900 text-white py-12 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Let's Connect
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="flex space-x-6 mt-6 md:mt-0"
        >
          {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
            <motion.div
              key={index}
              ref={(el) => (iconRefs.current[index] = el)}
              className="text-white hover:text-gray-400 transition-colors duration-300"
              variants={iconVariants}
              whileHover="hover"
            >
              <Icon size={28} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.p 
        variants={itemVariants}
        className="text-center text-sm text-gray-500 mt-8"
      >
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </motion.p>
      
      {/* Decorative animated elements */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "anticipate" }}
      />
    </motion.footer>
  );
};

export default Footer;