"use client";

import styles from "./style.module.scss";
import TechStack from "@/components/UI/TechStack/TechStack";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import {
  ArrowPrev,
  ArrowNext,
} from "@/components/icons";
import { useRef, useState } from "react";

const AboutPage = () => {
  const gridSlides = [
    { src: "/images/grid/grid-32.jpg", caption: "Grid 3x2" },
    { src: "/images/grid/grid-33.jpg", caption: "Grid 3x3" },
    { src: "/images/grid/grid-43.jpg", caption: "Grid 4x3" },
    { src: "/images/grid/grid-44.jpg", caption: "Grid 4x4" },
  ];


  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrapper}>
      <section className={`${styles.section} ${styles.intro}`}>
        <div className={styles.sectionInner}>
          <h1 className={styles.title}>About This Project</h1>

          <p className={styles.lead}>
            <strong>Travel Tracker</strong> is&nbsp;a&nbsp;portfolio project built like a&nbsp;real product. It&nbsp;uses <em>Next.js 14, React&nbsp;18, TypeScript, Redux Toolkit, Firebase, SCSS Modules and Framer Motion</em>. The goal was to&nbsp;demonstrate not only technical skills but also the ability to&nbsp;design architecture, invent solutions, and polish&nbsp;UX details.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tech}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.subtitle}>Tech Stack</h2>
          <TechStack />
        </div>
      </section>

      <section className={`${styles.section} ${styles.features}`}>
        <div className={`${styles.sectionInner} ${styles.sectionInnerFull}`}>
          <h2 className={styles.subtitle}>Features</h2>
          <ul className={styles.featureList}>
            <li className={styles.featureCard}>
              <h3>Flexible Data Flow</h3>
              <p>
                Trips work in&nbsp;three modes&nbsp;&mdash; demo, localStorage (no&nbsp;login), and Firebase (with login). All three share one logic layer, so&nbsp;switching between them doesn&rsquo;t break data or&nbsp;behavior. This unified setup keeps the codebase consistent and easy to&nbsp;maintain.
              </p>
            </li>
            <li className={styles.featureCard}>
              <h3>Animated Header</h3>
              <p>
                A&nbsp;fully custom heading component with a&nbsp;decorative animated line and icon reveal. The border adapts to&nbsp;text length, works across any layout, and animates fluidly on&nbsp;scroll&nbsp;&mdash; a&nbsp;small visual detail that makes the interface feel alive.
              </p>
            </li>
            <li className={styles.featureCard}>
              <h3>Travel Form</h3>
              <p>
                A&nbsp;full-featured form that supports creating, editing, and deleting trips in&nbsp;real time. It&nbsp;handles everything&nbsp;&mdash; city, dates, rating, budget, and image&nbsp;&mdash; and gives instant feedback with every interaction.
              </p>
            </li>
            <li className={styles.featureCard}>
              <h3>Tech-Stack Wheel</h3>
              <p>
                A&nbsp;fully custom, interactive wheel built from scratch&nbsp;&mdash; no&nbsp;libraries, fully responsive and fluid. Smooth highlighting and rotation make it&nbsp;both functional and visually unique.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.challenges}`}>
        <div className={`${styles.sectionInner} ${styles.sectionInnerFull}`}>
          <h2 className={styles.subtitle}>Challenges & Solutions</h2>
          <div className={styles.challengesList}>
            <div className={styles.challengesItem}>
              <h3 className={styles.challengeTitle}>Complex Card Grid</h3>

              <div className={styles.challengeMedia}>
                <Swiper
                  className={styles.slider}
                  slidesPerView={1}
                  spaceBetween={16}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActive(swiper.activeIndex)}
                >
                  {gridSlides.map((s) => (
                    <SwiperSlide key={s.caption} className={styles.sliderSlide}>
                      <figure className={styles.sliderFigure}>
                        <img src={s.src} className={styles.sliderImg} alt={s.caption} />
                      </figure>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className={styles.sliderControls}>
                  <button
                    className={styles.sliderArrow}
                    onClick={() => swiperRef.current?.slidePrev()}
                    disabled={active === 0}
                  >
                    <ArrowPrev width={32} height={32} />
                  </button>
                  <span className={styles.sliderCaption}>{gridSlides[active].caption}</span>
                  <button
                    className={styles.sliderArrow}
                    onClick={() => swiperRef.current?.slideNext()}
                    disabled={active === gridSlides.length - 1}
                  >
                    <ArrowNext width={32} height={32} />
                  </button>
                </div>
              </div>

              <p className={styles.challengeText}>
                I&nbsp;wanted the travel cards to&nbsp;feel dynamic&nbsp;&mdash; not just a&nbsp;static grid, but something that looked designed no&nbsp;matter how many items appeared. Standard CSS grid patterns couldn&rsquo;t handle that variety, so&nbsp;I built a&nbsp;custom grouping system that rearranges itself automatically depending on&nbsp;the number of&nbsp;cards&nbsp;&mdash; six, nine, twelve, or&nbsp;anything in&nbsp;between. Each layout keeps the same visual rhythm: no&nbsp;broken rows, no&nbsp;gaps, no&nbsp;duplicates. Just a&nbsp;clean, intentional composition every time.
              </p>
            </div>
            <div className={styles.challengesItem}>
              <h3 className={styles.challengeTitle}>Adaptive</h3>
              <div className={styles.challengeMedia}>
                <video
                  className={styles.challengeVideo}
                  data-video={styles.video}
                  src={`/videos/adaptive.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`/videos/adaptive.jpg`}
                />
              </div>
              <p className={styles.challengeText}>
                But that wasn&rsquo;t enough&nbsp;&mdash; the grid also had to&nbsp;adapt beautifully. When the screen changes, the layout doesn&rsquo;t just shrink&nbsp;&mdash; it&nbsp;re-composes itself into a&nbsp;new pattern using container queries. Each breakpoint has its own logic to&nbsp;keep the cards balanced and legible, so&nbsp;both images and text stay in&nbsp;perfect visual order. The goal was not &laquo;responsive design,&raquo; but adaptive harmony&nbsp;&mdash; a&nbsp;grid that always feels right, whatever the screen.
              </p>
            </div>
            <div className={styles.challengesItem}>
              <h3 className={styles.challengeTitle}>Animation</h3>
              <div className={styles.challengeMedia}>
                <video
                  className={styles.challengeVideo}
                  data-video={styles.video}
                  src={`/videos/animation.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`/videos/animation.jpg`}
                />
              </div>
              <p className={styles.challengeText}>
                Then came motion. Every action in&nbsp;the app&nbsp;&mdash; filtering, sorting, deleting, opening a&nbsp;modal&nbsp;&mdash; triggers an&nbsp;animation that connects states instead of&nbsp;snapping between them. Cards morph smoothly into modals; when an&nbsp;item disappears, the grid shifts naturally to&nbsp;fill the space. It&rsquo;s all powered by&nbsp;Framer Motion, but the orchestration&nbsp;&mdash; how animations chain and align&nbsp;&mdash; was designed manually. The result is&nbsp;a&nbsp;layout that feels fluid and alive, even when everything underneath it&nbsp;is&nbsp;changing.
              </p>
            </div>
            <div className={styles.challengesItem}>
              <h3 className={styles.challengeTitle}>Form</h3>
              <div className={styles.challengeMedia}>
                <video
                  className={styles.challengeVideo}
                  data-video={styles.video}
                  src={`/videos/form.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`/videos/form.jpg`}
                />
              </div>
              <p className={styles.challengeText}>
                The form turned out to&nbsp;be&nbsp;one of&nbsp;the hardest parts. Typical libraries like react-hook-form didn&rsquo;t fit my&nbsp;setup&nbsp;&mdash; I&nbsp;needed Google Place Autocomplete, custom date ranges, rating stars, sliders, file uploads, and full edit support. Each field had to&nbsp;be&nbsp;independent but still communicate as&nbsp;part of&nbsp;one system. So&nbsp;I&nbsp;built a&nbsp;manual validation and state flow: every field knows when it&rsquo;s valid, when it&rsquo;s saved, and when it&nbsp;needs attention. You can create, edit, or&nbsp;delete a&nbsp;trip, reset the form, and everything stays perfectly in&nbsp;sync. That independence with coordination was the key challenge&nbsp;&mdash; and the most rewarding to&nbsp;solve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.summary}`}>
        <div className={`${styles.sectionInner} ${styles.summaryInner}`}>
          <h2 className={styles.subtitle}>Summary</h2>
          <div className={styles.summaryText}>
            <p>
              <strong>Travel Tracker</strong> started as&nbsp;a&nbsp;small experiment&nbsp;&mdash; and grew into a&nbsp;full product with production-ready architecture. It&nbsp;became a&nbsp;space for solving real problems through experimentation, where every feature emerged from real needs&nbsp;&mdash; from adaptive grid logic and animations to&nbsp;a&nbsp;fully controlled form system.
            </p>
            <p> I&nbsp;used&nbsp;AI tools along the way&nbsp;&mdash; not to&nbsp;generate solutions, but to&nbsp;explore ideas faster and refine them further. The real challenge was reaching the level of&nbsp;quality and design I&nbsp;envisioned, far beyond default&nbsp;AI outputs.
            </p>
            <p>
              The goal wasn&rsquo;t to&nbsp;build everything from scratch, but to&nbsp;understand how each part works&nbsp;&mdash; and make it&nbsp;intuitive, consistent, and efficient. This project shows how&nbsp;I approach development: through curiosity, clear structure, and constant improvement.
            </p>
          </div>

          <div className={styles.summaryGrid}>
            <ul>
              <li><strong>Framework:</strong> <span>Next.js 15 (App Router), React 18</span></li>
              <li><strong>Language:</strong> <span>TypeScript 5</span></li>
              <li><strong>State Management:</strong> <span>Redux Toolkit</span></li>
            </ul>
            <ul>
              <li><strong>Database &amp; Auth:</strong> <span>Firebase (Realtime DB + Google Auth)</span></li>
              <li><strong>Styling:</strong> <span>SCSS Modules</span></li>
              <li><strong>Animations:</strong> <span>Framer Motion 12</span></li>
            </ul>
            <ul>
              <li><strong>Maps &amp; Places:</strong> <span>Google Maps & Places API (Autocomplete, Geocoding)</span></li>
              <li><strong>Utilities:</strong> <span>Datepicker, Swiper, Tippy.js</span></li>
              <li><strong>Hosting:</strong> <span>Firebase Hosting</span></li>
            </ul>
            <ul>
              <li><strong>Images:</strong> <span><a href="https://unsplash.com" target="_blank">Unsplash</a></span></li>
              <li><strong>Icons:</strong> <span><a href="https://www.svgrepo.com" target="_blank">SVG Repo</a></span></li>
              <li><strong>Fonts:</strong> <span><a href="https://fonts.google.com" target="_blank">Google Fonts</a></span></li>
            </ul>
          </div>

          <p className={styles.summaryNote}>
            Designed, developed and animated entirely by&nbsp;Arkharov Egor.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
