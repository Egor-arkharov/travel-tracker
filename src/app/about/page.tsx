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


  const swiperRef = useRef<SwiperType>();
  const [active, setActive] = useState(0);

  return (
    <div className={styles.wrapper}>
      <section className={styles.block}>
        <h1 className={styles.title}>About This Project</h1>

        <p className={styles.lead}>
          <strong>Travel Tracker</strong> is a portfolio project built like a
          real product. It uses{" "}
          <em>
            Next.js 14, React 18, TypeScript, Redux Toolkit, Firebase, SCSS
            Modules and Framer Motion
          </em>
          . The goal was to demonstrate not only technical skills but also the
          ability to design architecture, invent solutions, and polish UX
          details.
        </p>
      </section>

      <section className={`${styles.block} ${styles.tech}`}>
        <h2 className={styles.subtitle}>Tech Stack</h2>
        <TechStack />
      </section>

      <section className={styles.features}>
        <h2 className={styles.subtitle}>Features</h2>

        <ul className={styles.featureList}>
          <li className={styles.featureCard}>
            <h3>Flexible Data Flow</h3>
            <p>
              Trips work in&nbsp;three modes: demo mock data, localStorage
              (no&nbsp;login), and Firebase (with login). Everything
              is&nbsp;handled through one architecture.
            </p>
          </li>
          <li className={styles.featureCard}>
            <h3>Animated Header</h3>
            <p>
              A&nbsp;fully custom heading component with a&nbsp;dynamic
              decorative line and icon reveal. Unlike static SVGs, the border
              adapts to&nbsp;multiline text, remains fully fluid, and animates
              smoothly when entering the viewport.
            </p>
          </li>
          <li className={styles.featureCard}>
            <h3>Travel Form</h3>
            <p>
              Google Place Picker, DatePicker, rating stars, budget range and
              image upload&nbsp;&mdash; all unified through manual validation
              and refs.
            </p>
          </li>
          <li className={styles.featureCard}>
            <h3>Tech-Stack Wheel</h3>
            <p>
              A&nbsp;completely custom interactive wheel to&nbsp;showcase the
              stack. Built entirely from scratch without libraries, fully
              responsive and fluid, with smooth highlighting and rotation that
              make it&nbsp;both functional and visually unique.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.challenges}>
        <h2 className={styles.subtitle}>Challenges & Solutions</h2>

        <div className={styles.challengesList}>
          <div className={styles.challenge}>
            <h3 className={styles.challengeTitle}>Complex Card Grid</h3>

            <div className={styles.sliderWrapper}>
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
              I wanted the travel cards to feel dynamic and alive, not locked to a fixed
              template. Instead of relying on standard CSS grid, I built a custom grouping
              system that rearranges itself automatically depending on how many items are
              loaded. Whether it’s six, nine or twelve cards, the layout always stays
              balanced, varied and visually clear.
            </p>
          </div>

          <div className={styles.challenge}>
            <h3 className={styles.challengeTitle}>Adaptive</h3>
            <p className={styles.challengeText}></p>
          </div>

          <div className={styles.challenge}>
            <h3 className={styles.challengeTitle}>Animation</h3>
            <p className={styles.challengeText}></p>
          </div>

          <div className={styles.challenge}>
            <h3 className={styles.challengeTitle}>Form</h3>
            <p className={styles.challengeText}></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
