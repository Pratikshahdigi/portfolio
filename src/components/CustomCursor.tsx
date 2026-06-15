"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Animate the inner dot immediately
      gsap.to(dotRef.current, {
        x: x - 4,
        y: y - 4,
        duration: 0.1,
        ease: "power2.out",
      });

      // Animate the trailing outer ring with a slight delay
      gsap.to(ringRef.current, {
        x: x - 18,
        y: y - 18,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const onMouseOverInteractive = () => {
      // Scale up ring on hover over buttons/links
      gsap.to(ringRef.current, {
        scale: 1.5,
        borderColor: "var(--accent-orange)",
        backgroundColor: "rgba(255, 101, 0, 0.08)",
        duration: 0.3,
      });
      gsap.to(dotRef.current, {
        scale: 0.5,
        backgroundColor: "var(--accent-orange-soft)",
        duration: 0.3,
      });
    };

    const onMouseOutInteractive = () => {
      // Restore default state
      gsap.to(ringRef.current, {
        scale: 1.0,
        borderColor: "rgba(255, 101, 0, 0.5)",
        backgroundColor: "transparent",
        duration: 0.3,
      });
      gsap.to(dotRef.current, {
        scale: 1.0,
        backgroundColor: "var(--accent-orange)",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll("a, button, [role='button'], .clickable");
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseOverInteractive);
        el.addEventListener("mouseleave", onMouseOutInteractive);
      });
    };

    // Small delay to allow elements to render
    const timer = setTimeout(addHoverListeners, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      const clickables = document.querySelectorAll("a, button, [role='button'], .clickable");
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseOverInteractive);
        el.removeEventListener("mouseleave", onMouseOutInteractive);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "var(--accent-orange)",
          borderRadius: "50%",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: "1px solid rgba(255, 101, 0, 0.5)",
          borderRadius: "50%",
          zIndex: 9998,
          pointerEvents: "none",
          boxShadow: "0 0 10px rgba(255, 101, 0, 0.1)",
          transition: "border-color 0.2s, background-color 0.2s",
        }}
      />
    </>
  );
}
