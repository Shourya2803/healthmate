import React, { useEffect } from 'react';

const Cursor = () => {
  useEffect(() => {
    const crsr = document.querySelector("#cursor");
    const blur = document.querySelector("#cursor-blur");

    // Update cursor position on mousemove
    document.addEventListener("mousemove", function (e) {
      const scrollX = window.scrollX;  // Get current horizontal scroll position
      const scrollY = window.scrollY;  // Get current vertical scroll position

      // Position the cursor and blur to follow the mouse exactly considering scroll
      crsr.style.left = `${e.x + scrollX - crsr.offsetWidth / 2}px`; // Adjust for scrollX
      crsr.style.top = `${e.y + scrollY - crsr.offsetHeight / 2}px`; // Adjust for scrollY

      // Position blur slightly offset from cursor (optional)
      blur.style.left = `${e.x + scrollX - blur.offsetWidth / 2}px`; // Adjust for scrollX
      blur.style.top = `${e.y + scrollY - blur.offsetHeight / 2}px`; // Adjust for scrollY
    });

    // Hover effects for images (or other elements)
    const images = document.querySelectorAll("img, .hover-trigger"); // Select images and elements with .hover-trigger class
    images.forEach(function (elem) {
      elem.addEventListener("mouseenter", function () {
        crsr.style.transform = "scale(2.5)"; // Scale cursor on hover
        crsr.style.border = "2px solid #fff";
        crsr.style.backgroundColor = "transparent";
      });
      elem.addEventListener("mouseleave", function () {
        crsr.style.transform = "scale(1)"; // Reset cursor scale
        crsr.style.border = "0px solid #fff";
        crsr.style.backgroundColor = "transparent"; // Gradient will be maintained
      });
    });

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        id="cursor"
        className="absolute w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none z-[9999] transition-all duration-200"
      ></div>

      {/* Custom Cursor Blur */}
      <div
        id="cursor-blur"
        className="absolute w-[100px] h-[100px] bg-gradient-to-r from-purple-200 to-purple-400 rounded-full pointer-events-none opacity-40 z-[9998] transition-all duration-200"
      ></div>
    </>
  );
};

export default Cursor;
