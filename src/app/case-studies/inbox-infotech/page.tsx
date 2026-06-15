"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../case-study.module.css";
import CustomCursor from "../../../components/CustomCursor";
import RecruiterModal from "../../../components/RecruiterModal";

export default function InboxInfotechCaseStudy() {
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
        <span className={styles.category}>AI Automation & B2B Lead Funnels</span>
        <h1 className={styles.title}>
          Scaling B2B Lead Acquisition by 35% via Automated AI Pipelines
        </h1>

        <div className={styles.statGrid}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>+35%</span>
            <span className={styles.statLabel}>B2B Lead Volume</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>60%</span>
            <span className={styles.statLabel}>Outreach Automation Efficiency</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>12hr</span>
            <span className={styles.statLabel}>Response Time Saved</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statVal}>3.2x</span>
            <span className={styles.statLabel}>Pipeline Velocity</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <div className={styles.contentGrid}>
        <main className={styles.mainContent}>
          <h2>The Challenge</h2>
          <p>
            Inbox Infotech Pvt. Ltd., an IT consulting and software services firm, had an entirely manual B2B prospecting model. Sales development reps spent hours daily scraping profiles on LinkedIn, drafting manual outreach sequences, and manually qualifying incoming inbound form fills.
          </p>
          <p>
            This manual bottleneck led to delayed response times (often 24 to 48 hours), high labor costs, and a slow-moving pipeline that missed out on immediate, hot requirements from corporate prospects.
          </p>

          <h2>Strategy & Execution</h2>
          <p>
            We engineered a comprehensive automated B2B pipeline, blending state-of-the-art Generative AI scrapers, automated email sequences, and smart lead scoring models:
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>AI-Powered Lead Enrichment:</strong> Integrated scraping tools that automatically mapped newly added leads to their company size, funding data, and tech stack details, populating CRM records instantaneously.
            </li>
            <li>
              <strong>Hyper-Personalized Cold Sequences:</strong> Implemented AI template prompts that modified the opening hooks of automated email sequences based on the prospect's recent LinkedIn activities or company news, boosting open rates.
            </li>
            <li>
              <strong>Automated Instant Qualification:</strong> Setup smart form automation that instant-routed leads with corporate email domains into high-priority Slack channels for immediate booking, while sending generic domains through a nurturing funnel.
            </li>
            <li>
              <strong>Responsive Retargeting & Intent Scoring:</strong> Tracked email clicks, attachment downloads, and page visits, triggering direct sales rep alerts the moment a lead surpassed a designated threshold of engagement.
            </li>
          </ul>

          <h2>The Outcomes & Insights</h2>
          <p>
            By automating 60% of the manual outreach and qualification workflow, we successfully freed up the B2B sales team to focus entirely on closing deals instead of searching for contact info.
          </p>
          <p>
            B2B lead volume scaled by 35% within the first 90 days. More importantly, average response time for inbound enterprise inquiries plummeted from 24+ hours down to under 5 minutes, boosting overall booking rates.
          </p>
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.graphicCard}>
            <Image
              src="/portfolio/inbox_dashboard.png"
              alt="Inbox Infotech Performance Dashboard"
              width={600}
              height={400}
              className={styles.graphicImg}
              priority
            />
            <p className={styles.graphicCaption}>
              Figure 3.1: Hubspot CRM & AI Pipeline dashboard tracking email outreach rates, lead scoring distributions, and qualification metrics.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>Project Metadata</h3>
            <div className={styles.infoRows}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Client</span>
                <span className={styles.infoVal}>Inbox Infotech Pvt. Ltd.</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Industry</span>
                <span className={styles.infoVal}>IT Consulting & Software Services</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Core Platforms</span>
                <span className={styles.infoVal}>Hubspot, Make.com, ChatGPT API</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Key Metric</span>
                <span className={styles.infoVal}>60% Efficiency Gain</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Outreach Style</span>
                <span className={styles.infoVal}>AI-Personalized Cold Sequences</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* CTA Footer Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Automate Your B2B Growth Engine?</h2>
        <p className={styles.ctaText}>
          I build custom CRM integrations, automated email outreach, and AI lead-scoring systems that accelerate your sales pipelines. Let's build yours.
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
