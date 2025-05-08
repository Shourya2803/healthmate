import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const imageUrls = [
    {
        url: "https://imgs.search.brave.com/T9cdQkqzRrsCeM2iNlxfiKtQL4vkntodG1qqgTdXauU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/MjFlNmYxZWZmZWJm/ZTAzODgxZGE5YmQv/NjIyMTAyMDZjNGEy/ZTgyNTZjYzZhMGUy/X3doaXRlLXNlYXJj/aC5zdmc",
        link: "https://gazn9amnoznpxgjdrvmy8b.streamlit.app/",
        description: "This image shows a sad emoji on a colorful background.",
    },
    {
        url: "https://imgs.search.brave.com/HCe7u_Pkkm_UBlSQKzQ5DMgmMPK0gUsigAechCqy5_w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaWNvbi1pY29u/cy5jb20vMzcvUE5H/Lzk2L2hvc3BpdGFs/XzQzMzEucG5n",
        link: "https://gazn9amnoznpxgjdrvmy8b.streamlit.app/",
        description: "A close-up of a blue emoji with a complex expression.",
    },
    {
        url: "https://imgs.search.brave.com/2FzUp1uRsq-H0NmBBjSDWSXjBwFdYqtlWkX47RrM3Ls/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaWNvbi1pY29u/cy5jb20vNTIvUE5H/Lzk2L2hvc3BpdGFs/X2RvY3Rvcl8xMDcz/OC5wbmc",
        link: "https://gazn9amnoznpxgjdrvmy8b.streamlit.app/",
        description: "Another blue emoji, this one seems to be in deep thought.",
    },
];

const Symtoms = () => {
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
                className="inline-block px-1 py-0.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 animate-glow transition-all duration-300 hover:from-purple-600 hover:to-blue-700"
            >
                {word}
            </span>
        ));

    const handleImageClick = (link) => {
        window.open(link, "_blank");
    };

    return (
        <div
            ref={ref}
            style={{
                transform: `translateY(${y}px) scale(${scale})`,
                overflow: 'hidden', // Prevent extra scrollbars
                position: 'relative',
            }}
            className="flex flex-col md:flex-row items-center justify-start min-h-screen bg-black px-6 pt-20 md:pt-32"
        >
            {/* Image Card */}
            <div className="flex flex-row space-x-4">
                <div
                    className="relative w-40 h-56 cursor-pointer mb-8 md:mb-0 md:mr-10"
                    onClick={() => handleImageClick(imageUrls[currentIndex].link)}
                >
                    <div className="absolute -inset-3 z-0 rounded-full animate-spin-slow pointer-events-none">
                        <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,_blue,_transparent_70%)] blur-sm opacity-80"></div>
                    </div>
                    <div className="relative w-full h-full overflow-hidden rounded-xl z-10 border-4 border-blue-400 shadow-[0_0_20px_rgba(255,255,0,0.6)]">
                        <img
                            src={imageUrls[currentIndex].url}
                            alt={`card-${currentIndex}`}
                            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 opacity-100 z-10"
                        />
                    </div>
                </div>
            </div>

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
                    {splitWords("Birla AI Symptoms Checker")}
                </motion.h2>

                <motion.p
                    className="text-base md:text-lg text-gray-400 leading-relaxed opacity-80 max-w-md hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500"
                    whileHover={{ opacity: 1, scale: 1.05 }}
                >
                    {splitWords(
                        "Enter your symptoms and get intelligent health suggestions. The Symptom Analyzer compares your inputs with medical data to offer possible conditions, next steps, and when to seek professional care."
                    )}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Symtoms;