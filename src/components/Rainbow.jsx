import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createNoise2D } from "simplex-noise";

gsap.registerPlugin(ScrollTrigger);

const Rainbow = () => {
  const contentRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    const noise2D = createNoise2D();
    const content = contentRef.current;

    const circles = [];
    const totalCircles = 300;
    const verticalSpacing = window.innerHeight / totalCircles;

    for (let i = 0; i < totalCircles; i++) {
      const div = document.createElement("div");
      div.classList.add("circle");

      const n1 = noise2D(i * 0.003, i * 0.0033);
      const n2 = noise2D(i * 0.002, i * 0.001);

      div.style.transform = `translate(${n2 * 200}px, ${i * verticalSpacing}px) scale(${1 + n1 * 1.2})`;
      div.style.boxShadow = `0 0 0 .5px hsla(${Math.floor(i * 0.6)}, 70%, 60%, .7)`;
      div.style.opacity = 0;

      content.appendChild(div);
      circles.push(div);
    }

    // Animate circles on scroll
    circles.forEach((circle) => {
      gsap.to(circle, {
        scrollTrigger: {
          trigger: document.body,
          scrub: 1,
          start: "top bottom",
          end: "bottom top",
        },
        opacity: 1,
        rotation: "+=360",
        ease: "none",
        duration: 2,
      });
    });

    // Function to fade out the rainbow
    const fadeOut = () => {
      gsap.to(circles, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      });
    };

    // Scroll event listener to detect scrolling
    const handleScroll = () => {
      // Clear any existing timeout
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }

      // Fade in the rainbow
      gsap.to(circles, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      });

      // Set timeout to fade out after 2000ms of no scrolling
      fadeTimeoutRef.current = setTimeout(() => {
        fadeOut();
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (content) content.innerHTML = "";
      window.removeEventListener("scroll", handleScroll);
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className="fixed right-10 top-0 w-[300px] h-full pointer-events-none z-[50] overflow-hidden"
    />
  );
};

export default Rainbow;
