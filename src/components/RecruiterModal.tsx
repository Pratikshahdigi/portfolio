"use client";

import React, { useState, useEffect } from "react";
import styles from "./RecruiterModal.module.css";
import gsap from "gsap";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("Direct Interview");
  const [isBooked, setIsBooked] = useState(false);
  const [datesList, setDatesList] = useState<{ dayName: string; dateStr: string; label: string }[]>([]);

  // Time Slots
  const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

  // Generate next 7 days dynamically
  useEffect(() => {
    const list = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      // Skip Sundays for booking sanity
      if (d.getDay() === 0) continue;

      const dayName = days[d.getDay()];
      const month = months[d.getMonth()];
      const dayNum = d.getDate();
      const label = `${dayName}, ${month} ${dayNum}`;
      const dateStr = d.toISOString().split("T")[0];

      list.push({ dayName, dateStr, label });
    }
    setDatesList(list);
    if (list.length > 0) {
      setSelectedDate(list[0].dateStr);
    }
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedTime) return;

    // Simulate API save
    setIsBooked(true);

    // Success animation trigger
    setTimeout(() => {
      gsap.fromTo(
        "#booking-success-box",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 50);
  };

  const handleReset = () => {
    setName("");
    setCompany("");
    setEmail("");
    setSelectedTime("");
    setIsBooked(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close scheduler">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {!isBooked ? (
          <form onSubmit={handleBooking} className={styles.bookingForm}>
            <div className={styles.header}>
              <h2>Schedule Call with Pratik</h2>
              <p>Choose a convenient slot to align on hiring or campaign consultation.</p>
            </div>

            {/* 1. Date Selection Grid */}
            <div className={styles.section}>
              <label className={styles.sectionTitle}>Select Date</label>
              <div className={styles.dateGrid}>
                {datesList.map((item) => (
                  <button
                    key={item.dateStr}
                    type="button"
                    className={`${styles.dateBtn} ${selectedDate === item.dateStr ? styles.activeBtn : ""}`}
                    onClick={() => setSelectedDate(item.dateStr)}
                  >
                    <span className={styles.dateDay}>{item.dayName}</span>
                    <span className={styles.dateLabel}>{item.label.split(",")[1].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Time Selection List */}
            <div className={styles.section}>
              <label className={styles.sectionTitle}>Select Time (IST)</label>
              <div className={styles.timeGrid}>
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.activeBtn : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Form Fields */}
            <div className={styles.section}>
              <label className={styles.sectionTitle}>Your Information</label>
              <div className={styles.fieldsGrid}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
                  <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="Direct Interview">Direct Interview / Recruitment</option>
                    <option value="Freelance Consultation">Freelance Campaign Help</option>
                    <option value="General Network">General Network / Collaboration</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!name || !email || !selectedTime}
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <div id="booking-success-box" className={styles.successContainer}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2>Call Scheduled successfully!</h2>
            <p className={styles.successSub}>
              We are locked in. A calendar invite has been dispatched to <strong>{email}</strong>.
            </p>

            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Date:</span>
                <strong>{datesList.find((d) => d.dateStr === selectedDate)?.label || selectedDate}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Time:</span>
                <strong>{selectedTime} (IST)</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Topic:</span>
                <strong>{goal}</strong>
              </div>
            </div>

            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Close & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
