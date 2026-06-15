"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../case-study.module.css";
import CustomCursor from "../../../components/CustomCursor";
import RecruiterModal from "../../../components/RecruiterModal";

export default function ShreenathjiBuildersCaseStudy() {
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
        <span className={styles.category}>Real Estate Lead Gen & Conversion Rate Optimization</span>
        <h1 className={styles.title}>
          Generating 450+ High-Intent Property Buyer Leads for Shreenathji Builders
        </h1>

        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>450+</span>
            <span className={styles.statLabel}>Buyer Leads</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>-25%</span>
            <span className={styles.statLabel}>Cost Per Lead (CPL)</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>+180%</span>
            <span className={styles.statLabel}>CTR Improvement</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>4.2%</span>
            <span className={styles.statLabel}>Lead-to-Site Visit Rate</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <div className={styles.contentGrid}>
        <main className={styles.mainContent}>
          <h2>The Challenge</h2>
          <p>
            Shreenathji Builders Pvt. Ltd., a reputable real estate developer in Vadodara, launched a premium residential project. In a highly saturated real estate market, typical digital advertising yielded low-quality leads, spam numbers, and skyrocketing Cost-Per-Lead (CPL) metrics.
          </p>
          <p>
            They needed a scalable marketing engine that could filter out casual browsers and deliver highly qualified, verified homebuyer leads with a direct interest in premium pricing segments.
          </p>

          <h2>Strategy & Execution</h2>
          <p>
            We structured a rigorous conversion optimization framework, focusing heavily on landing page flow and localized high-intent social lead forms:
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>Conversion-First Landing Page CRO:</strong> Rebuilt the project landing page with a mobile-first design, fast load speed (under 1.8 seconds), structural interactive floor plans, clear visual pricing, and localized social proof.
            </li>
            <li>
              <strong>Multi-Step Form Qualification:</strong> Replaced single-field forms with multi-step qualification filters. Prospects were asked about their budget ranges, timeline to purchase, and preferred configurations before submitting details, weeding out low-intent users.
            </li>
            <li>
              <strong>OTP-Verified Meta Instant Forms:</strong> Deployed Facebook native lead forms utilizing custom questions and contact validation to ensure the authenticity of phone numbers and email addresses.
            </li>
            <li>
              <strong>Google Search Retargeting:</strong> Bounded high-intent Google search traffic to our landing pages, and then dynamically remarketed to those users on Instagram with client testimonials and actual construction update videos.
            </li>
          </ul>

          <h2>The Outcomes & Insights</h2>
          <p>
            By introducing high-intent qualifiers, the lead quality surged instantly. CPL decreased by 25% because ad algorithms optimized for verified form conversions rather than empty page views.
          </p>
          <p>
            The sales team reported that the lead-to-site-visit conversion rate reached a peak of 4.2%, which is significantly higher than the industry average of 1.5% to 2.0% in local real estate markets.
          </p>
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.graphicCard}>
            <Image
              src="/portfolio/shreenathji_dashboard.png"
              alt="Shreenathji Builders Performance Dashboard"
              width={600}
              height={400}
              className={styles.graphicImg}
              priority
            />
            <p className={styles.graphicCaption}>
              Figure 2.1: Lead generation analytics depicting lead quality metrics, cost-per-lead curve, and site visit booking rates.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>Project Metadata</h3>
            <div className={styles.infoRows}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Client</span>
                <span className={styles.infoVal}>Shreenathji Builders Pvt. Ltd.</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Industry</span>
                <span className={styles.infoVal}>Real Estate Development</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Core Platforms</span>
                <span className={styles.infoVal}>Google Ads, Meta Leads, CRO</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Lead Verified By</span>
                <span className={styles.infoVal}>Custom Qualifiers & OTPs</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Key Achievement</span>
                <span className={styles.infoVal}>25% Reduction in CPL</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* CTA Footer Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Scale Your High-Intent Leads?</h2>
        <p className={styles.ctaText}>
          I build high-converting landing pages and ad funnels optimized to deliver verified buyers, not casual clicks. Let's discuss your next campaign.
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
