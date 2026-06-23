"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import RecruiterModal from "@/components/RecruiterModal";
import photosList from "./photos-list.json";
import styles from "./photos.module.css";

// Helper to check categories
function getImageCategory(filename: string): "campaign" | "moment" {
  if (filename.startsWith("Screenshot")) {
    return "campaign";
  }
  return "moment";
}

// Helper to format filenames to human readable titles
function formatFilename(filename: string) {
  if (filename.startsWith("Screenshot_")) {
    const match = filename.match(/Screenshot_(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const monthName = months[parseInt(month) - 1] || "Month";
      return `Marketing Campaign - ${monthName} ${day}, ${year}`;
    }
    return "Campaign Performance Metric";
  } else if (filename.startsWith("IMG-")) {
    const match = filename.match(/IMG-(\d{4})(\d{2})(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const monthName = months[parseInt(month) - 1] || "Month";
      return `Professional Moment - ${monthName} ${day}, ${year}`;
    }
    return "Office & Team Event";
  }
  return filename.split(".")[0] || filename;
}

export default function PhotosGallery() {
  const [filter, setFilter] = useState<"all" | "campaign" | "moment">("all");
  const [visibleCount, setVisibleCount] = useState<number>(16);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Swipe gesture hooks
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Filter photos list
  const filteredPhotos = photosList.filter((item) => {
    if (filter === "all") return true;
    return getImageCategory(item) === filter;
  });

  const displayedPhotos = filteredPhotos.slice(0, visibleCount);

  // Navigation handlers for lightbox
  const handleNext = () => {
    if (activeIdx === null) return;
    setZoomLevel(false);
    setActiveIdx((activeIdx + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (activeIdx === null) return;
    setZoomLevel(false);
    setActiveIdx((activeIdx - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
    setZoomLevel(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, filteredPhotos.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Load more handler
  const loadMore = () => {
    setVisibleCount((prev) => prev + 16);
  };

  return (
    <div className={styles.container}>
      <CustomCursor />
      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Aesthetic glowing details */}
      <div className={styles.warmLightGlow} />
      <div className={styles.blueLightGlow} />

      {/* Header / Navigation */}
      <header className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Portfolio
        </Link>
        <Link href="/" className={styles.logo}>
          Pratik<span className={styles.logoOrange}>.</span>
        </Link>
      </header>

      {/* Hero Header */}
      <section className={styles.hero}>
        <span className={styles.category}>Visual Documentation</span>
        <h1 className={styles.title}>Marketing Proofs & Team Moments</h1>
        <p className={styles.subtitle}>
          Browse screenshots of analytics dashboards, performance funnels, key campaign metrics,
          and moments from my journey leading digital marketing teams.
        </p>

        {/* Filter Controls */}
        <div className={styles.filterContainer}>
          <button
            className={`${styles.filterBtn} ${filter === "all" ? styles.filterBtnActive : ""}`}
            onClick={() => {
              setFilter("all");
              setVisibleCount(16);
            }}
          >
            All Media
            <span className={styles.badge}>{photosList.length}</span>
          </button>
          <button
            className={`${styles.filterBtn} ${filter === "campaign" ? styles.filterBtnActive : ""}`}
            onClick={() => {
              setFilter("campaign");
              setVisibleCount(16);
            }}
          >
            Campaign Analytics & Dashboards
            <span className={styles.badge}>
              {photosList.filter((f) => getImageCategory(f) === "campaign").length}
            </span>
          </button>
          <button
            className={`${styles.filterBtn} ${filter === "moment" ? styles.filterBtnActive : ""}`}
            onClick={() => {
              setFilter("moment");
              setVisibleCount(16);
            }}
          >
            Office & Team Moments
            <span className={styles.badge}>
              {photosList.filter((f) => getImageCategory(f) === "moment").length}
            </span>
          </button>
        </div>
      </section>

      {/* Grid of Photos */}
      <div className={styles.gridSection}>
        <div className={styles.photosGrid}>
          {displayedPhotos.map((filename, index) => {
            const displayTitle = formatFilename(filename);
            const isCampaign = getImageCategory(filename) === "campaign";
            return (
              <div
                key={filename}
                className={styles.photoCard}
                onClick={() => setActiveIdx(index)}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={`/portfolio/photos/${filename}`}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className={styles.gridImage}
                  />
                  {/* Subtle Category Badge on Card */}
                  <span className={`${styles.cardBadge} ${isCampaign ? styles.badgeBlue : styles.badgeOrange}`}>
                    {isCampaign ? "Metric" : "Moment"}
                  </span>
                  
                  {/* Hover overlay mask */}
                  <div className={styles.imageOverlay}>
                    <div className={styles.overlayIcon}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{displayTitle}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredPhotos.length && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreBtn} onClick={loadMore}>
              Load More Photos
              <span className={styles.loadMoreSub}>
                (Showing {visibleCount} of {filteredPhotos.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {activeIdx !== null && (
        <div
          className={styles.lightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains(styles.lightbox)) {
              closeLightbox();
            }
          }}
        >
          {/* Controls */}
          <div className={styles.lightboxControls}>
            <div className={styles.lightboxIndex}>
              {activeIdx + 1} / {filteredPhotos.length}
            </div>
            <div className={styles.lightboxButtons}>
              <button
                className={`${styles.lightboxIconBtn} ${zoomLevel ? styles.btnActive : ""}`}
                onClick={() => setZoomLevel(!zoomLevel)}
                title="Toggle Zoom"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  {zoomLevel ? (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                  ) : (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  )}
                </svg>
              </button>
              <button
                className={styles.lightboxIconBtn}
                onClick={closeLightbox}
                title="Close"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className={`${styles.arrowBtn} ${styles.prevArrow}`} onClick={handlePrev}>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button className={`${styles.arrowBtn} ${styles.nextArrow}`} onClick={handleNext}>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          {/* Main Large Image */}
          <div className={styles.lightboxImageWrapper}>
            <div
              className={`${styles.imageContainer} ${zoomLevel ? styles.zoomed : ""}`}
              onClick={() => setZoomLevel(!zoomLevel)}
            >
              <img
                src={`/portfolio/photos/${filteredPhotos[activeIdx]}`}
                alt={formatFilename(filteredPhotos[activeIdx])}
                className={styles.lightboxImage}
              />
            </div>
            <div className={styles.lightboxCaption}>
              <h3>{formatFilename(filteredPhotos[activeIdx])}</h3>
              <p>{filteredPhotos[activeIdx]}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Want to drill down into campaign metrics?</h2>
        <p className={styles.ctaText}>
          Let's hop on a call. I'll walk you through active ad consoles, real-time ROI reports,
          and automated prospecting pipelines.
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.ctaPrimary} onClick={() => setIsModalOpen(true)}>
            Schedule Call
          </button>
          <a
            href="/portfolio/Pratik_Shah_Resume.pdf"
            download="Pratik_Shah_Resume.pdf"
            className={styles.ctaSecondary}
          >
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
}
