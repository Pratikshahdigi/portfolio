"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./VideoIntro.module.css";
import CinematicLayer from "./CinematicLayer";

interface VideoIntroProps {
  onScheduleCall: () => void;
}

export default function VideoIntro({ onScheduleCall }: VideoIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // --- Auto-hide Sound Hint ---
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowSoundHint(false);
    }, 6000);
    return () => clearTimeout(hintTimer);
  }, []);

  // --- Periodic Video Time Sync ---
  // Keeps the ambient background video matched with the foreground video
  useEffect(() => {
    const syncInterval = setInterval(() => {
      const fg = fgVideoRef.current;
      const bg = bgVideoRef.current;
      if (fg && bg && !fg.paused) {
        const diff = Math.abs(fg.currentTime - bg.currentTime);
        if (diff > 0.15) {
          bg.currentTime = fg.currentTime;
        }
      }
    }, 1500);

    return () => clearInterval(syncInterval);
  }, []);

  // --- Media Event Observers ---
  // Sync state if browser policies block or delay autoplay
  const handleFgPlay = () => {
    setIsPlaying(true);
    bgVideoRef.current?.play().catch(() => {});
  };

  const handleFgPause = () => {
    setIsPlaying(false);
    bgVideoRef.current?.pause();
  };

  // --- GSAP Reveal Animations ---
  useGSAP(
    () => {
      // Fade in the hero container
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        `.${styles.tagline}`,
        { opacity: 0, y: 30, letterSpacing: "0.2em" },
        { opacity: 1, y: 0, letterSpacing: "0.4em", duration: 1.2, delay: 0.4 }
      )
        .fromTo(
          `.${styles.nameLine}`,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.4, stagger: 0.15 },
          "-=0.9"
        )
        .fromTo(
          `.${styles.roleDescription}`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=1.0"
        )
        .fromTo(
          `.${styles.ctaButtons}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.9"
        )
        .fromTo(
          `.${styles.scrollIndicator}`,
          { opacity: 0, y: 15 },
          { opacity: 0.8, y: 0, duration: 1.5 },
          "-=0.6"
        )
        .fromTo(
          `.${styles.controlsPanel}`,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.0 },
          "-=1.2"
        );
    },
    { scope: containerRef }
  );

  // --- Magnetic Hover Effects ---
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1.1, 0.4)",
    });
  };

  // --- Control Handlers ---
  const togglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    if (isPlaying) {
      fg.pause();
      bg.pause();
      setIsPlaying(false);
    } else {
      // Align times right before playing
      bg.currentTime = fg.currentTime;
      Promise.all([fg.play(), bg.play()])
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback error:", err));
    }
  };

  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    const newMuted = !isMuted;
    fg.muted = newMuted;
    setIsMuted(newMuted);

    if (!newMuted) {
      setShowSoundHint(false); // Hide sound badge immediately if unmuted
    }
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section ref={containerRef} className={styles.heroContainer} id="hero-section">
      {/* 1. Cinematic Ambient Particle Overlay */}
      <CinematicLayer />

      {/* 2. Ambient Blurred Video Backdrop (Muted & Loop) */}
      <div className={styles.ambientVideoContainer}>
        <video
          ref={bgVideoRef}
          className={styles.ambientVideo}
          src="/portfolio/video.mp4"
          loop
          muted
          playsInline
          autoPlay
        />
      </div>

      {/* 3. Foreground Video (Widescreen, Centered) */}
      <div className={styles.foregroundVideoContainer}>
        <video
          ref={fgVideoRef}
          className={styles.foregroundVideo}
          src="/portfolio/video.mp4"
          loop
          muted={isMuted}
          playsInline
          autoPlay
          onPlay={handleFgPlay}
          onPause={handleFgPause}
        />
      </div>

      {/* 4. Cinematic Color Vignettes & Light Overlays */}
      <div className={styles.overlayGradients}>
        <div className={styles.topVignette} />
        <div className={styles.bottomVignette} />
        <div className={styles.warmLightGlow} />
        <div className={styles.blueLightGlow} />
      </div>

      {/* 5. Animated Content */}
      <div className={styles.contentOverlay}>
        <span className={styles.tagline}>Digital Marketing Team Leader</span>
        <div className={styles.titleContainer}>
          <h1 className={styles.nameLine} id="hero-title">
            Pratik
          </h1>
          <h1 className={`${styles.nameLine} ${styles.lastName}`}>
            Shah
          </h1>
        </div>
        <p className={styles.roleDescription}>
          I help businesses generate leads, optimize performance marketing, and dominate search engines using advanced SEO, PPC, and custom Generative AI tools.
        </p>

        {/* Dynamic CTA Buttons */}
        <div className={styles.ctaButtons}>
          <button
            className={styles.ctaPrimary}
            onClick={onScheduleCall}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            Schedule Call
            <span className={styles.btnGlow} />
          </button>
          <a
            href="/portfolio/Pratik_Shah_Resume.pdf"
            download="Pratik_Shah_Resume.pdf"
            className={styles.ctaSecondary}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* 6. Sound Badge Hint */}
      {showSoundHint && (
        <div className={styles.soundHint}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 3v18l-6-6H2V9h4l6-6zm1 3.27c2.28.46 4 2.48 4 4.73s-1.72 4.27-4 4.73v-1.54c1.42-.42 2.5-1.72 2.5-3.19S14.42 11.23 13 10.81V6.27zm0-3v1.54C16.89 5.29 20 8.54 20 12.5s-3.11 7.21-7 7.69v1.54c4.78-.5 8.5-4.56 8.5-9.23s-3.72-8.73-8.5-9.23z"/>
          </svg>
          Tap for sound
        </div>
      )}

      {/* 7. Floating Media Control Panel */}
      <div className={styles.controlsPanel}>
        <button
          className={styles.controlButton}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            /* Pause Icon */
            <svg viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            /* Play Icon */
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          className={styles.controlButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            /* Volume Mute Icon */
            <svg viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 2.97-1.9 5.5-4.5 6.4v2.02c3.71-.9 6.5-4.24 6.5-8.42S18.21 4.48 14.5 3.58v2.02c2.6.9 4.5 3.43 4.5 6.4zM3 9v6h4l5 5V4L7 9H3z" />
            </svg>
          ) : (
            /* Volume Up Icon */
            <svg viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* 8. Scroll Down Indicator */}
      <div
        className={styles.scrollIndicator}
        onClick={scrollToNextSection}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            scrollToNextSection();
          }
        }}
      >
        <span className={styles.scrollText}>Discover</span>
        <div className={styles.scrollLineContainer}>
          <div className={styles.scrollLineActive} />
        </div>
      </div>
    </section>
  );
}
