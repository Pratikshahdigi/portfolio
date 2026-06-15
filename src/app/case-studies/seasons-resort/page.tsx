"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../case-study.module.css";
import CustomCursor from "../../../components/CustomCursor";
import RecruiterModal from "../../../components/RecruiterModal";

export default function SeasonsResortCaseStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <CustomCursor />
      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Decorative ambient glows */}
      <div className={styles.warmLightGlow} />
      <div className={styles.blueLightGlow} />

      {/* Navigation */}
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

      {/* Hero Section */}
      <section className={styles.hero}>
        <span className={styles.category}>Hospitality Performance Marketing & Branding</span>
        <h1 className={styles.title}>
          Scaling Occupancy & Direct Bookings for 7 Seasons Resort & Spa
        </h1>

        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>+45%</span>
            <span className={styles.statLabel}>Direct Inquiries</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>3.5x</span>
            <span className={styles.statLabel}>Average ROAS</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>5 LAC+</span>
            <span className={styles.statLabel}>Ad Spend Managed</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>-22%</span>
            <span className={styles.statLabel}>Cost Per Inquiry</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <div className={styles.contentGrid}>
        <main className={styles.mainContent}>
          <h2>The Challenge</h2>
          <p>
            7 Seasons Resort & Spa, a premium luxury getaway destination, struggled to consistently drive direct inquiries and room bookings through their digital channels. Relying heavily on aggregators and OTAs (Online Travel Agencies) cannibalized their margins. 
          </p>
          <p>
            The objective was clear: establish a strong, independent brand presence, scale monthly booking inquiries directly through Meta and Google Ads, and optimize the customer acquisition cost.
          </p>

          <h2>Strategy & Execution</h2>
          <p>
            We structured a full-funnel digital strategy, leveraging high-quality visual creative direction combined with hyper-local and intent-based targeting parameters:
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>High-Engagement Creative Ad Sets:</strong> Designed and deployed cinematic video ads showcasing the resort's premium amenities, private pools, and dining experiences to evoke emotional desires for weekend getaways.
            </li>
            <li>
              <strong>Hyper-Local Interest Targeting:</strong> Focused targeting parameters on premium affinity audiences (frequent travelers, luxury shoppers, weekend resort searchers) within a 200km radius of the property.
            </li>
            <li>
              <strong>Conversational Lead Funnels:</strong> Implemented direct click-to-WhatsApp and click-to-call ad formats on Meta, removing landing page friction and allowing high-intent prospects to chat directly with booking representatives.
            </li>
            <li>
              <strong>Google Search Ads Capture:</strong> Set up target-CPA Google search campaigns bidding for high-intent keywords like "luxury resort near me" and "best spa weekend resort" to capture active search demand.
            </li>
          </ul>

          <h2>The Outcomes & Insights</h2>
          <p>
            By shifting from broad messaging to localized, visual storytelling and highly responsive call actions, the campaigns delivered unmatched results. We scaled monthly performance budgets efficiently while driving down the overall Cost Per Lead.
          </p>
          <p>
            Ultimately, this campaign proved that high-ticket hospitality experiences can drive major direct booking volumes without relying solely on discounted OTA channels, directly improving bottom-line profitability.
          </p>
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.graphicCard}>
            <Image
              src="/portfolio/seasons_dashboard.png"
              alt="7 Seasons Resort Performance Dashboard"
              width={600}
              height={400}
              className={styles.graphicImg}
              priority
            />
            <p className={styles.graphicCaption}>
              Figure 1.1: Meta Ads & Google Analytics dashboard mapping weekly room inquiries, CTR, and booking conversions.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>Project Metadata</h3>
            <div className={styles.infoRows}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Client</span>
                <span className={styles.infoVal}>7 Seasons Resort & Spa</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Industry</span>
                <span className={styles.infoVal}>Hospitality & Luxury Tourism</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Core Platforms</span>
                <span className={styles.infoVal}>Meta Ads, Google Search, WA Funnels</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Total Budget</span>
                <span className={styles.infoVal}>5 LAC+ INR</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Target Geographies</span>
                <span className={styles.infoVal}>Gujarat, Maharashtra</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* CTA Footer Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Looking for Similar Performance Marketing Spikes?</h2>
        <p className={styles.ctaText}>
          I specialize in building lead-generation systems that convert high-ticket audiences into direct calls, chats, and sales. Let's build yours.
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
