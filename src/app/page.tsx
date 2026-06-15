"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import VideoIntro from "@/components/VideoIntro";
import styles from "./page.module.css";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [navActive, setNavActive] = useState(false);

  // --- Track Scroll to Toggle Header glass state or visibility ---
  useEffect(() => {
    const handleScroll = () => {
      // Reveal navbar only after scrolling past 150px
      if (window.scrollY > 150) {
        setNavActive(true);
      } else {
        setNavActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Scroll-triggered Card & Timeline Animations ---
  useGSAP(
    () => {
      // Animate Navigation on mount
      gsap.fromTo(
        `.${styles.navbar}`,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.8 }
      );

      // Section Entrance Animations using IntersectionObserver
      const animateSection = (selector: string, animationProps: gsap.TweenVars, triggerElement: Element) => {
        gsap.fromTo(selector, { opacity: 0, y: 40 }, { ...animationProps, ease: "power3.out", duration: 1.0 });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;
              
              if (target.id === "about-section") {
                gsap.fromTo(
                  `.${styles.statCard}`,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }
                );
                gsap.fromTo(
                  `#about-section .${styles.sectionHeader} > *`,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, stagger: 0.15, duration: 1.0, ease: "power3.out" }
                );
              }

              if (target.id === "skills-section") {
                gsap.fromTo(
                  `.${styles.skillBadge}`,
                  { opacity: 0, scale: 0.8 },
                  { opacity: 1, scale: 1, stagger: 0.03, duration: 0.6, ease: "back.out(1.5)" }
                );
                gsap.fromTo(
                  `.${styles.credCard}`,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
                );
                gsap.fromTo(
                  `#skills-section .${styles.sectionHeader} > *`,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, stagger: 0.15, duration: 1.0, ease: "power3.out" }
                );
              }

              if (target.id === "experience-section") {
                gsap.fromTo(
                  `.${styles.timelineItem}`,
                  { opacity: 0, x: -40 },
                  { opacity: 1, x: 0, stagger: 0.25, duration: 1.2, ease: "power3.out" }
                );
                gsap.fromTo(
                  `#experience-section .${styles.sectionHeader} > *`,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, stagger: 0.15, duration: 1.0, ease: "power3.out" }
                );
              }

              if (target.id === "contact-section") {
                gsap.fromTo(
                  `.${styles.contactCard}`,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
                );
                gsap.fromTo(
                  `#contact-section .${styles.sectionHeader} > *`,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, stagger: 0.15, duration: 1.0, ease: "power3.out" }
                );
              }

              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.12 }
      );

      const sections = document.querySelectorAll(`.${styles.showcaseSection}`);
      sections.forEach((sec) => observer.observe(sec));

      return () => observer.disconnect();
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className={styles.pageContainer}>
      {/* 1. Floating Glass Navigation Bar */}
      <nav className={`${styles.navbar} ${navActive ? styles.navbarVisible : ""}`}>
        <div className={styles.navLogo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Pratik Shah <span className={styles.navLogoDot} />
        </div>
        <div className={styles.navLinks}>
          <a href="#about-section" className={styles.navLink}>About</a>
          <a href="#skills-section" className={styles.navLink}>Skills</a>
          <a href="#experience-section" className={styles.navLink}>Experience</a>
          <a href="#contact-section" className={styles.navLink}>Contact</a>
        </div>
      </nav>

      {/* 2. Fullscreen Video Hero Section */}
      <VideoIntro />

      {/* 3. About & Summary Section */}
      <div className={styles.showcaseSection} id="about-section">
        <div className={styles.sectionHeader}>
          <span>Overview</span>
          <h2>Dominating Search & Driving Digital Funnel Performance.</h2>
        </div>

        <div className={styles.statsGrid}>
          {/* Stat 1 */}
          <div className={styles.statCard} style={{ opacity: 0 }}>
            <div className={styles.statNum}>+35%</div>
            <div className={styles.statLabel}>Lead Generation Increase</div>
          </div>
          {/* Stat 2 */}
          <div className={styles.statCard} style={{ opacity: 0 }}>
            <div className={styles.statNum}>+50%</div>
            <div className={styles.statLabel}>SEO Organic Traffic</div>
          </div>
          {/* Stat 3 */}
          <div className={styles.statCard} style={{ opacity: 0 }}>
            <div className={styles.statNum}>13+</div>
            <div className={styles.statLabel}>Brand Clients Managed</div>
          </div>
          {/* Stat 4 */}
          <div className={styles.statCard} style={{ opacity: 0 }}>
            <div className={styles.statNum}>5L+</div>
            <div className={styles.statLabel}>Monthly Ad Budgets</div>
          </div>
        </div>

        <div style={{ maxWidth: "1000px", width: "100%", marginTop: "2rem" }}>
          <p style={{ fontSize: "1.2rem", lineHeight: "1.7", color: "var(--text-muted)", fontWeight: 300 }}>
            Results-driven <strong>Digital Marketing Team Leader</strong> with extensive experience leading performance marketing, SEO strategy, social media management, and paid advertising funnels. 
            I specialize in orchestrating conversion-focused campaigns across Meta, Google, and LinkedIn Ads, building efficient systems that drive lead generation, community engagement, and measurable ROI.
          </p>
        </div>
      </div>

      {/* 4. Skills & Credentials Section */}
      <div className={styles.showcaseSection} id="skills-section">
        <div className={styles.sectionHeader}>
          <span>Toolkit</span>
          <h2>Generative AI Workflows, SEO Core & Performance PPC.</h2>
        </div>

        {/* Skills Tag Cloud */}
        <div className={styles.skillsContainer}>
          <h3 style={{ fontSize: "1rem", color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem" }}>Core Strengths</h3>
          <div className={styles.skillsGroup}>
            <span className={`${styles.skillBadge} ${styles.skillBadgeActive}`} style={{ opacity: 0 }}>Generative AI for Marketing</span>
            <span className={`${styles.skillBadge} ${styles.skillBadgeActive}`} style={{ opacity: 0 }}>Generative AI Tools</span>
            <span className={`${styles.skillBadge} ${styles.skillBadgeActive}`} style={{ opacity: 0 }}>Artificial Intelligence (AI)</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Performance Marketing</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Paid Campaigns (PPC)</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>SEO Strategy & Organic Growth</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Funnel Planning</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Lead Generation</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Content Strategy</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Brand Positioning</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Competitor Research</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Campaign Optimization</span>
            <span className={styles.skillBadge} style={{ opacity: 0 }}>Marketing Automation</span>
          </div>
        </div>

        {/* Credentials Grid (Certifications & Education) */}
        <div className={styles.credentialsGrid}>
          {/* Card 1: Education */}
          <div className={styles.credCard} style={{ opacity: 0 }}>
            <div className={styles.credHeader}>
              <h3 className={styles.credTitle}>Academic Foundations</h3>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div className={styles.credSub}>Master of Computer Applications (MCA)</div>
              <div style={{ fontSize: "0.95rem", color: "var(--fg-color)", fontWeight: 500 }}>CHARUSAT</div>
              <div className={styles.credMeta}>2019 — 2021 | Computer Programming & Software Systems</div>
            </div>
            <div>
              <div className={styles.credSub}>Bachelor of Computer Applications (BCA)</div>
              <div style={{ fontSize: "0.95rem", color: "var(--fg-color)", fontWeight: 500 }}>C P Patel & F H Shah Commerce College</div>
              <div className={styles.credMeta}>2016 — 2019 | Programming Foundations & Database Systems</div>
            </div>
          </div>

          {/* Card 2: Certifications */}
          <div className={styles.credCard} style={{ opacity: 0 }}>
            <div className={styles.credHeader}>
              <h3 className={styles.credTitle}>Accreditations & Certificates</h3>
            </div>
            <ul className={styles.certList}>
              <li className={styles.certItem}>
                <span className={styles.certDot} />
                Generative AI for Digital Marketers
              </li>
              <li className={styles.certItem}>
                <span className={styles.certDot} />
                AI and Digital Marketing Trends
              </li>
              <li className={styles.certItem}>
                <span className={styles.certDot} />
                SEO II (Advanced Search Engine Optimization)
              </li>
              <li className={styles.certItem}>
                <span className={styles.certDot} />
                Marketing Strategy: Competitive Intelligence
              </li>
              <li className={styles.certItem}>
                <span className={styles.certDot} />
                Advanced Product Marketing
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Experience timeline Section */}
      <div className={styles.showcaseSection} id="experience-section">
        <div className={styles.sectionHeader}>
          <span>Timeline</span>
          <h2>Orchestrating Growth Across Agile Campaigns.</h2>
        </div>

        <div className={styles.timelineContainer}>
          {/* Role 1: Inbox Infotech - Manager */}
          <div className={styles.timelineItem} style={{ opacity: 0 }}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <div className={styles.jobTitle}>
                  <h3>Digital Marketing Manager & Team Lead</h3>
                  <div className={styles.companyInfo}>Inbox Infotech Pvt. Ltd.</div>
                </div>
                <div className={styles.jobMeta}>
                  <span className={styles.jobDuration}>June 2024 — Present</span>
                  <span className={styles.jobLocation}>Vadodara, India</span>
                </div>
              </div>
              <ul className={styles.jobDetails}>
                <li>Lead and coordinate a high-performing team of 5 digital marketing specialists to deliver multi-channel campaigns.</li>
                <li>Design and implement AI-powered marketing pipelines to automate content operations, lead scoring, and campaign reporting.</li>
                <li>Manage performance marketing initiatives across Meta Ads, Google Ads, and LinkedIn Ads, scaling leads by 35% and reducing customer acquisition costs.</li>
                <li>Audit and execute on-page, technical, and clustering SEO strategies, driving organic traffic growth of 20%.</li>
                <li>Plan and automate email nurturing sequences, customer behavioral triggers, and brand sentiment framework integrations.</li>
              </ul>
            </div>
          </div>

          {/* Role 2: Think Tank ConReal */}
          <div className={styles.timelineItem} style={{ opacity: 0 }}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <div className={styles.jobTitle}>
                  <h3>Digital Marketing Executive</h3>
                  <div className={styles.companyInfo}>THINK TANK ConReal</div>
                </div>
                <div className={styles.jobMeta}>
                  <span className={styles.jobDuration}>June 2023 — June 2024</span>
                  <span className={styles.jobLocation}>Gujarat, India</span>
                </div>
              </div>
              <ul className={styles.jobDetails}>
                <li>Spearheaded creative social media post-production and distribution profiles for 13 distinct brand clients.</li>
                <li>Formulated multi-channel marketing campaigns specializing in real estate, large events, and luxury resort promotions.</li>
                <li>Oversaw ad budgets averaging 5 LAC per month, with major campaign budgets exceeding 7 LAC+.</li>
              </ul>
            </div>
          </div>

          {/* Role 3: Rajarshi Solutions */}
          <div className={styles.timelineItem} style={{ opacity: 0 }}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineCard}>
              <div className={styles.timelineHeader}>
                <div className={styles.jobTitle}>
                  <h3>Digital Marketing Executive</h3>
                  <div className={styles.companyInfo}>Rajarshi Solutions</div>
                </div>
                <div className={styles.jobMeta}>
                  <span className={styles.jobDuration}>Oct 2021 — June 2023</span>
                  <span className={styles.jobLocation}>Vadodara, India</span>
                </div>
              </div>
              <ul className={styles.jobDetails}>
                <li>Structured advanced organic search programs, successfully boosting organic site traffic by 50%.</li>
                <li>Managed paid Facebook and Google lead generation funnels, raising rankings for key keywords by 30%.</li>
                <li>Executed comprehensive competitor analyses and industry benchmarks to pivot marketing operations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Contact Section */}
      <div className={styles.showcaseSection} id="contact-section">
        <div className={styles.sectionHeader}>
          <span>Inquire</span>
          <h2>Let's Scale Your Brand Visibility.</h2>
        </div>

        <div className={styles.contactGrid}>
          {/* Card 1: Email */}
          <a href="mailto:pshah0418@gmail.com" className={styles.contactCard} style={{ opacity: 0 }}>
            <div className={styles.contactIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3>Email Address</h3>
            <div className={styles.contactValue}>pshah0418@gmail.com</div>
          </a>

          {/* Card 2: Phone */}
          <a href="tel:9265517110" className={styles.contactCard} style={{ opacity: 0 }}>
            <div className={styles.contactIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <h3>Call Direct</h3>
            <div className={styles.contactValue}>+91 92655 17110</div>
          </a>

          {/* Card 3: LinkedIn */}
          <a href="https://www.linkedin.com/in/pratik-shahdigital" target="_blank" rel="noopener noreferrer" className={styles.contactCard} style={{ opacity: 0 }}>
            <div className={styles.contactIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            <h3>LinkedIn</h3>
            <div className={styles.contactValue}>in/pratik-shahdigital</div>
          </a>
        </div>

        {/* Premium Portfolio Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            © {new Date().getFullYear()} Pratik Shah. Vadodara, Gujarat, India.
          </div>
          <div className={styles.footerRight}>
            <a href="#hero-section" className={styles.footerLink}>
              Back to Top
            </a>
            <span style={{ color: "rgba(255,255,255,0.08)" }}>|</span>
            <a href="mailto:pshah0418@gmail.com" className={styles.footerLink}>
              Inquire
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
