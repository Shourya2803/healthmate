import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const imageUrls = [
    {
        url: "https://imgs.search.brave.com/1WtivHnoQe0KLrY07GPg-uI1UUgIzvOg3UnbT_-0B9E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdW5pZ3JpZC1i/bHVldG9uZS1iaW9s/b2d5LXZvbC0yLzYw/LzAwNF8wNzdfcm9l/bnRnZW5fcmF5X3gt/cmF5X3hyYXlfZmx1/b3JvZ3JhcGh5X21l/ZGljaW5lX3JpYnNf/Y2hlc3QtNTEyLnBu/Zw",
        link: "https://adirohansuyal-x-ray-imaging-app-rsgood.streamlit.app/",
        description: "This image shows a sad emoji on a colorful background.",
    },
    {
        url: "https://imgs.search.brave.com/QNYv85tRTPxp8BIBO4O6qlQiCiorDtTFIH2GSB-5Qpk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbWVkaWNhbC1o/ZWFsdGhjYXJlLXZv/bC0xLW91dGxpbmUv/NTEyL3hyYXlfeF9y/YXlfbWVkaWNhbC0x/MjgucG5n",
        link: "https://adirohansuyal-x-ray-imaging-app-rsgood.streamlit.app/",
        description: "A close-up of a blue emoji with a complex expression.",
    },
    {
        url: "https://imgs.search.brave.com/YmWmwECec6CrPw2lIOVTLM4IPeInhT08O6aOTkcu_Hw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvaGVhbHQtc29s/aWQtdm9sLTItMS8z/Mi9BcnRib2FyZF8x/MS0xMjgucG5n",
        link: "https://adirohansuyal-x-ray-imaging-app-rsgood.streamlit.app/",
        description: "Another blue emoji, this one seems to be in deep thought.",
    },
];

const xray = () => {
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
                 className="inline-block px-1 py-0.5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-500 animate-glow transition-all duration-300 hover:from-purple-600 hover:to-blue-700"
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
                         <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,_green,_transparent_70%)] blur-sm opacity-80"></div>
                     </div>
                     <div className="relative w-full h-full overflow-hidden rounded-xl z-10 border-4 border-green-400 shadow-[0_0_20px_rgba(255,255,0,0.6)]">
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
                     {splitWords("RayVision")}
                 </motion.h2>
 
                 <motion.p
                     className="text-base md:text-lg text-gray-400 leading-relaxed opacity-80 max-w-md hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500"
                     whileHover={{ opacity: 1, scale: 1.05 }}
                 >
                     {splitWords(
                         "Detect hidden anomalies in X-rays with AI-powered analysis. Instantly identify fractures, infections, or irregularities, helping radiologists make faster, more accurate diagnoses with confidence."
                     )}
                 </motion.p>
             </motion.div>
         </div>
     );
 };

export default xray;