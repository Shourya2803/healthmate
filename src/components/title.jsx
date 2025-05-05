import React, { useState } from "react";
import { motion } from "framer-motion";

const Title = () => {
  const description =
    "Revolutionizing self-care through AI-powered personalized health insights.".split(" ");
  const [hoveredWord, setHoveredWord] = useState(null);
  const [hoveredTitle, setHoveredTitle] = useState("");

  const healthVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.3 },
    },
  };

  const mateVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.5 },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.9,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const renderDescription = (isDarkMode = false) => (
    <motion.p
      className={`text-lg text-center max-w-xl px-4 flex flex-wrap justify-center leading-relaxed
        ${isDarkMode ? "text-gray-300" : "text-gray-700"}
        sm:text-base md:text-lg lg:text-xl`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {description.map((word, index) => (
        <motion.span
          key={index}
          className={`relative inline-block mx-1 my-1 transition-all duration-300 cursor-pointer ${
            word.startsWith("*") ? "font-bold" : ""
          }`}
          variants={wordVariants}
          onMouseEnter={() => setHoveredWord(index)}
          onMouseLeave={() => setHoveredWord(null)}
          whileHover={{ scale: 1.1 }}
        >
          <span
            className={`relative z-10 transition-colors duration-300 ${
              word.startsWith("*")
                ? isDarkMode
                  ? "text-blue-300"
                  : "text-blue-600"
                : ""
            }`}
          >
            {word.replace(/\*/g, "")}
          </span>

          {/* Word Glow */}
          {hoveredWord === index && (
            <motion.span
              layoutId="glow"
              className={`absolute inset-0 rounded-full blur-md -z-10 ${
                word.startsWith("*")
                  ? isDarkMode
                    ? "bg-blue-400 opacity-70"
                    : "bg-blue-500 opacity-50"
                  : isDarkMode
                  ? "bg-gray-500 opacity-30"
                  : "bg-gray-400 opacity-20"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
          {" "}
        </motion.span>
      ))}
    </motion.p>
  );

  const glowingHoverSpan = (text, variant, side) => (
    <motion.span
      className={`
        relative bg-clip-text text-transparent font-extrabold text-5xl md:text-6xl transition-all duration-500
        ${
          text === "Health"
            ? "bg-gradient-to-r from-blue-600 to-blue-400"
            : "bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-100"
        }
        ${hoveredTitle === text ? "drop-shadow-[0_0_20px_rgba(192,132,252,0.8)]" : ""}
      `}
      variants={variant}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHoveredTitle(text)}
      onMouseLeave={() => setHoveredTitle("")}
    >
      {text}
      {hoveredTitle === text && (
        <motion.span
          className="absolute inset-0 -z-10 rounded-full blur-lg opacity-40"
          style={{
            background:
              "linear-gradient(90deg, rgba(192,132,252,0.5), rgba(168,85,247,0.6))",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.span>
  );

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-black relative group">

      {/* Light Theme */}
      <div className="flex flex-col items-center justify-center p-6 dark:hidden">
        <div className="flex justify-center items-center gap-2 mb-6">
          {glowingHoverSpan("Health", healthVariant, "left")}
          {glowingHoverSpan("Mate", mateVariant, "right")}
        </div>

        <motion.div
          className="w-64 h-1 bg-gradient-to-r from-blue-400 via-white to-gray-300 rounded-full mb-8 opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {renderDescription(false)}
      </div>

      {/* Dark Theme */}
      <div className="hidden flex-col items-center justify-center p-6 dark:flex">
        <div className="flex justify-center items-center gap-2 mb-6">
          {glowingHoverSpan("Health", healthVariant, "left")}
          {glowingHoverSpan("Mate", mateVariant, "right")}
        </div>

        <motion.div
          className="w-64 h-1 bg-gradient-to-r from-blue-500 via-blue-900 to-gray-800 rounded-full mb-8 opacity-80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        {renderDescription(true)}
      </div>
    </div>
  );
};

export default Title;
