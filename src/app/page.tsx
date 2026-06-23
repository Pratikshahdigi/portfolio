"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import VideoIntro from "@/components/VideoIntro";
import CustomCursor from "@/components/CustomCursor";
import RecruiterModal from "@/components/RecruiterModal";
import styles from "./page.module.css";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [navActive, setNavActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

              if (target.id === "projects-section") {
                gsap.fromTo(
                  `.${styles.projectCard}`,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
                );
                gsap.fromTo(
                  `#projects-section .${styles.sectionHeader} > *`,
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

              if (target.id === "photos-section") {
                gsap.fromTo(
                  `.${styles.photoPreviewCard}`,
                  { opacity: 0, scale: 0.9, y: 30 },
                  { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" }
                );
                gsap.fromTo(
                  `#photos-section .${styles.sectionHeader} > *`,
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
      {/* Cinematic Custom Follower Cursor */}
      <CustomCursor />

      {/* Recruiter Call Booking Modal */}
      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 1. Floating Glass Navigation Bar */}
      <nav className={`${styles.navbar} ${navActive ? styles.navbarVisible : ""}`}>
        <div className={styles.navLogo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Pratik Shah <span className={styles.navLogoDot} />
        </div>
        <div className={styles.navLinks}>
          <a href="#about-section" className={styles.navLink}>About</a>
          <a href="#projects-section" className={styles.navLink}>Projects</a>
          <a href="#skills-section" className={styles.navLink}>Skills</a>
          <a href="#experience-section" className={styles.navLink}>Experience</a>
          <a href="#photos-section" className={styles.navLink}>Photos</a>
          <a href="#contact-section" className={styles.navLink}>Contact</a>
        </div>
      </nav>

      {/* 2. Fullscreen Video Hero Section */}
      <VideoIntro onScheduleCall={() => setIsModalOpen(true)} />

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

      {/* NEW: Project Showcase Section */}
      <div className={styles.showcaseSection} id="projects-section">
        <div className={styles.sectionHeader}>
          <span>Case Studies</span>
          <h2>Proven Marketing Campaigns & Visual Dashboards.</h2>
        </div>

        <div className={styles.projectsGrid}>
          {/* Project Card 1 */}
          <div className={styles.projectCard} style={{ opacity: 0 }}>
            <div className={styles.projectImageContainer}>
              <Image
                src="/portfolio/seasons_dashboard.png"
                alt="7 Seasons Resort Case Study"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className={styles.projectContent}>
              <div className={styles.projectMeta}>Hospitality Branding & Paid Ads</div>
              <h3 className={styles.projectTitle}>7 Seasons Resort & Spa</h3>
              <p className={styles.projectDescription}>
                Scaled room booking inquiries via Facebook & Instagram conversational ads. Managed 5 LAC+ ad budgets.
              </p>
              <div className={styles.projectStatsMini}>
                <span><strong>+45%</strong> Inquiries</span>
                <span><strong>3.5x</strong> ROAS</span>
              </div>
              <Link href="/case-studies/seasons-resort" className={styles.projectLink}>
                View Details
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Project Card 2 */}
          <div className={styles.projectCard} style={{ opacity: 0 }}>
            <div className={styles.projectImageContainer}>
              <Image
                src="/portfolio/shreenathji_dashboard.png"
                alt="Shreenathji Builders Case Study"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className={styles.projectContent}>
              <div className={styles.projectMeta}>Real Estate Lead Gen & CRO</div>
              <h3 className={styles.projectTitle}>Shreenathji Builders</h3>
              <p className={styles.projectDescription}>
                Built mobile-first multi-step landing page qualifiers to decrease CPL and optimize homebuyer lead scores.
              </p>
              <div className={styles.projectStatsMini}>
                <span><strong>450+</strong> Leads</span>
                <span><strong>-25%</strong> CPL</span>
              </div>
              <Link href="/case-studies/shreenathji-builders" className={styles.projectLink}>
                View Details
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Project Card 3 */}
          <div className={styles.projectCard} style={{ opacity: 0 }}>
            <div className={styles.projectImageContainer}>
              <Image
                src="/portfolio/inbox_dashboard.png"
                alt="Inbox Infotech Case Study"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className={styles.projectContent}>
              <div className={styles.projectMeta}>AI Automation & B2B Funnels</div>
              <h3 className={styles.projectTitle}>Inbox Infotech</h3>
              <p className={styles.projectDescription}>
                Automated prospecting & B2B outreach scoring using custom Make.com and Generative AI workflows.
              </p>
              <div className={styles.projectStatsMini}>
                <span><strong>+35%</strong> Leads</span>
                <span><strong>60%</strong> Automated</span>
              </div>
              <Link href="/case-studies/inbox-infotech" className={styles.projectLink}>
                View Details
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </Link>
            </div>
          </div>
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
                <li>Lead and coordinate a team of 5 marketing specialists, scaling B2B lead acquisition by 35% in first 90 days.</li>
                <li>Engineered custom Generative AI lead enrichment & outreach workflows on Make.com, boosting automation efficiency by 60%.</li>
                <li>Reduced B2B inbound response times from 24 hours to under 5 minutes with real-time Slack integrations.</li>
                <li>Audited and executed SEO cluster indexing structures, boosting organic clicks by 20% and ranking major intent terms.</li>
                <li>Oversaw all PPC campaigns, lowering qualified customer acquisition costs by 22%.</li>
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
                <li>Managed paid ad spend portfolios averaging 5 LAC+ per month, reaching a 3.4x average ROAS for resort clients.</li>
                <li>Designed high-converting click-to-WhatsApp Meta campaign funnels, increasing direct bookings by 30%.</li>
                <li>Managed social media distribution, content planning, and competitor tracking for 13 premium corporate clients.</li>
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
                <li>Successfully boosted organic search site traffic by 50% through comprehensive on-page audits and page speed optimization.</li>
                <li>Raised search visibility rankings for high-volume targeted keywords by 30% inside search consoles.</li>
                <li>Executed client onboarding benchmarks, competitive intelligence audits, and weekly analytical dashboards.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 5.5. Photos Preview Section */}
      <div className={styles.showcaseSection} id="photos-section">
        <div className={styles.sectionHeader}>
          <span>Visual Journal</span>
          <h2>Campaign Insights & Professional Moments.</h2>
        </div>

        <div className={styles.photosPreviewGrid}>
          {/* Card 1: Metric Screenshot */}
          <Link href="/photos" className={styles.photoPreviewCard} style={{ opacity: 0 }}>
            <Image
              src="/portfolio/photos/Screenshot_2023-08-23-12-24-32-69.jpg"
              alt="Campaign metric"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className={styles.photoPreviewLabel}>Meta Ads Performance</div>
          </Link>

          {/* Card 2: Team Event */}
          <Link href="/photos" className={styles.photoPreviewCard} style={{ opacity: 0 }}>
            <Image
              src="/portfolio/photos/IMG-20240102-WA0013.jpg"
              alt="Team Event"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className={styles.photoPreviewLabel}>Team Milestone</div>
          </Link>

          {/* Card 3: Dashboard Analytics */}
          <Link href="/photos" className={styles.photoPreviewCard} style={{ opacity: 0 }}>
            <Image
              src="/portfolio/photos/Screenshot_2023-09-22-19-03-27-76.jpg"
              alt="Dashboard Analytics"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className={styles.photoPreviewLabel}>Google Ads Conversion</div>
          </Link>

          {/* Card 4: Office/Professional Moment */}
          <Link href="/photos" className={styles.photoPreviewCard} style={{ opacity: 0 }}>
            <Image
              src="/portfolio/photos/IMG-20230823-WA0004.jpg"
              alt="Professional Moment"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className={styles.photoPreviewLabel}>Client Onboarding Audit</div>
          </Link>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Link href="/photos" className={styles.viewGalleryBtn}>
            View Full Gallery (122 Photos)
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </Link>
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

          {/* Card 4: Meeting Scheduler */}
          <button onClick={() => setIsModalOpen(true)} className={styles.contactCard} style={{ opacity: 0 }}>
            <div className={styles.contactIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
              </svg>
            </div>
            <h3>Book Meeting</h3>
            <div className={styles.contactValue} style={{ color: "var(--accent-orange)" }}>Click to Schedule Call</div>
          </button>
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
