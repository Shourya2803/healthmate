import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const imageUrls = [
    {
        url: "https://imgs.search.brave.com/TdH6mZ-Cjc3OY7G4QtFhvY3esxpbixsnqzo7KEPqG8E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvc2FkLWVtb2pp/LWJhY2tncm91bmQt/N3ppNzUzbm42NXVn/MDR4bC5qcGc",
        link: "https://2e455c5e-af18-4ebe-be2a-68535b35fd8f-00-2kummhryz47i3.kirk.replit.dev/", // Added link
    },
    {
        url: "https://imgs.search.brave.com/cnjv_m9DA8dyZ5MJURlfSe_sR8Swga-uGp_Ymcz3D5M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibHVl/bW9qaS5pby9jZG4t/cHJveHkvNjQ2MjE4/YzY3ZGE0NzE2MGM2/NGE4NGQ1LzY2YjNl/YzUzZGY1ZWMxYjg0/MDVkNGRlMF8wMi5w/bmc",
        link: "https://2e455c5e-af18-4ebe-be2a-68535b35fd8f-00-2kummhryz47i3.kirk.replit.dev/", // Added link
    },
    {
        url: "https://imgs.search.brave.com/y2eA3WAxiuawBtOFYw0YFLJfoSa3ausDeqU7BRq-C7I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibHVl/bW9qaS5pby9jZG4t/cHJveHkvNjQ2MjE4/YzY3ZGE0NzE2MGM2/NGE4NGQ1LzY2YjNl/YmEyODRkOWJjODE0/NTcwODE0ZF8xOC5w/bmc",
        link: "https://2e455c5e-af18-4ebe-be2a-68535b35fd8f-00-2kummhryz47i3.kirk.replit.dev/", // Added link
    },
];

const Card = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -80]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const splitWords = (text) =>
        text.split(" ").map((word, index) => (
            <span
                key={index}
                className="inline-block px-1 py-0.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500 animate-glow transition-all duration-300 hover:from-purple-600 hover:to-blue-700"
            >
                {word}
            </span>
        ));

    const handleImageClick = () => {
        // This function will open the link in a new tab
        window.open(imageUrls[currentIndex].link, "_blank");
    };

    return (
        <motion.div
            ref={ref}
            style={{ y, scale }}
            className="flex flex-col md:flex-row items-center justify-start min-h-[60vh] bg-black px-6 pt-20 md:pt-32"
        >
            {/* Image Card */}
            <motion.div
                className="relative w-40 h-56 mb-8 md:mb-0 md:mr-10 cursor-pointer" // Added cursor-pointer
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={handleImageClick} // Added onClick handler here
            >
                {/* Spinning gradient ring */}
                <div className="absolute -inset-3 z-0 rounded-full animate-spin-slow pointer-events-none">
                    <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,_yellow,_transparent_70%)] blur-sm opacity-80"></div>
                </div>

                {/* Image container */}
                <motion.div className="relative w-full h-full overflow-hidden rounded-xl z-10 border-4 border-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.6)]">
                    {imageUrls.map((item, index) => (
                        <motion.img
                            key={index}
                            src={item.url}
                            alt={`card-${index}`}
                            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
                                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                            animate={{ opacity: index === currentIndex ? 1 : 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Text Section */}
            <motion.div
                className="flex flex-col items-start text-white max-w-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {splitWords("Mood Tracker")}
                </motion.h2>

                <motion.p
                    className="text-base md:text-lg text-gray-400 leading-relaxed opacity-80 max-w-md hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500"
                    whileHover={{ opacity: 1, scale: 1.05 }}
                >
                    {splitWords(
                        "Helps you understand and track your emotions using AI. Gain insights, manage stress, and improve your mental well-being with personalized suggestions based on your mood."
                    )}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Card;
