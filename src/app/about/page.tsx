"use client";

import styles from "./style.module.scss";
import TechStack from "@/components/UI/TechStack/TechStack";

const AboutPage = () => {

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <section className={styles.block}>
          {/* 1. First impression */}
          <h1 className={styles.title}>About This Project</h1>
          <p className={styles.lead}>
            <strong>Travel Tracker</strong> is a portfolio project built like a real product.
            It uses <em>Next.js 14, React 18, TypeScript, Redux Toolkit, Firebase, SCSS Modules and Framer Motion</em>.
            The goal was to demonstrate not only technical skills but also the ability to design architecture,
            invent solutions, and polish UX details.
          </p>
        </section>

        <section className={`${styles.block} ${styles.tech}`}>
          <h3 className={styles.section}>Tech Stack</h3>
          <TechStack />
        </section>

        <section className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Flexible Data Flow</h3>
            <p>Trips work in three modes: demo mock data, localStorage (no login), and Firebase (with login).
              Everything is handled through one architecture.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Custom Travel Form</h3>
            <p>Google Place Picker, DatePicker, rating stars, budget range and image upload — all unified
              through manual validation and refs.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Card → Modal Animation</h3>
            <p>App Store–like expand effect: a card image morphs into a modal with synchronized text and overlay animations.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Complex Grid Layout</h3>
            <p>A unique adaptive grid with grouping, mirrored variants and container queries — designed to make the UI
              look dynamic and varied on any screen.</p>
          </div>
        </section>

        <section className={styles.challenges}>
          <h2 className={styles.subtitle}>Challenges & Solutions</h2>

          <div className={styles.challenge}>
            <h3>Complex Card Grid</h3>
            <p>
              I wanted the cards to look alive and non-repetitive.
              Standard CSS grid wasn’t enough, so I designed a system of groups of four with mirrored variants
              and container queries. This was fully custom — no ready-made solution existed.
            </p>
          </div>

          <div className={styles.challenge}>
            <h3>Three Data Modes</h3>
            <p>
              The app had to work even without login.
              I created a universal flow: mock demo trips, localStorage trips, and Firebase trips all behave the same way.
              This flexibility is unusual for portfolio apps and shows thinking about multiple user scenarios.
            </p>
          </div>

          <div className={styles.challenge}>
            <h3>Custom Form</h3>
            <p>
              No standard inputs here: Google Place Picker, DatePicker, rating stars, budget slider, file upload.
              I connected them with a manual validation system using refs.
              Building a unified UX from such different fields was a challenge I solved from scratch.
            </p>
          </div>

          <div className={styles.challenge}>
            <h3>Card → Modal Animation</h3>
            <p>
              I didn’t want a basic popup — I wanted the “App Store” effect.
              The card image morphs, the background overlay fades in, and text enters in sync.
              It required manual control and fixing Framer Motion quirks, but the result feels smooth and natural.
            </p>
          </div>
        </section>

        {/* 4. Why it matters */}
        <section className={styles.why}>
          <h2 className={styles.subtitle}>Why This Project Matters</h2>
          <p>
            Travel Tracker is not just another CRUD.
            It combines <em>architecture, UX thinking and attention to detail</em>.
            I wanted to prove that I can not only implement known patterns, but also invent new solutions —
            from a custom grid and form handling to refined animations.
            That is what defines me as a developer.
          </p>
        </section>
      </div>
    </section>
  );
};

export default AboutPage;
