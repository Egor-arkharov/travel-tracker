import Image from "next/image";

import styles from "./style.module.scss";

import vueProject from "@/assets/other/vue-project.jpg";

const AuthorPage = () => {
  return (
    <div className={styles.wrapper}>
      <section className={`${styles.section} ${styles.intro}`}>
        <h1 className={styles.title}>About the Author</h1>

        <div className={styles.lead}>
          <p>Hi, I&rsquo;m Egor Arkharov&nbsp;&mdash; a&nbsp;frontend developer with 4+&nbsp;years of&nbsp;experience building interactive, scalable, and accessible web interfaces. I&rsquo;ve worked on&nbsp;both single-page applications built with Vue and React, and large multi-page corporate websites with complex component systems. My&nbsp;focus is&nbsp;on&nbsp;clean, maintainable architecture, semantic markup, and a&nbsp;consistent user experience across projects of&nbsp;any size.</p>

          <p>In&nbsp;my&nbsp;work I&rsquo;ve developed and optimized&nbsp;UI libraries, rewritten legacy components, and introduced modern approaches to&nbsp;structure and styling. I&rsquo;ve worked on&nbsp;everything from data-driven dashboards and offline-ready pages to&nbsp;animated interfaces and visualization tools for financial XBRL documents. My&nbsp;goal is&nbsp;to&nbsp;build interfaces that are reliable, performant, and easy to&nbsp;maintain&nbsp;&mdash; both for users and developers.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles["section--wide"]} ${styles.project}`}>
        <h2 className={styles.subtitle}>Previous Pet Project (Vue)</h2>

        <div className={styles.projectContent}>
          <div className={styles.projectText}>


            <p className={styles.text}>
              Before starting Travel Tracker, I&nbsp;built My&nbsp;Fests&nbsp;&mdash; a&nbsp;Vue-based web application for creating and exploring fictional music festivals. It&nbsp;was developed from scratch with Firebase integration for hosting and data storage, featuring dynamic form handling, image uploads, real-time synchronization, and Vuex-based state management. The project combined creativity with dynamic data generation, allowing users to&nbsp;build custom festivals or&nbsp;generate random ones through custom logic.
            </p>

            <p>
              <strong>Tech stack:</strong> Vue (Composition API, Vuex, Vue Router),
              Firebase (DB & Hosting), Axios, Sass, Webpack.
            </p>

            <p className={styles.links}>
              <a
                href="https://my-fests.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
              {" · "}
              <a
                href="https://github.com/Egor-arkharov/myfests"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </a>
            </p>
          </div>

          <div className={styles.projectImage}>
            <Image
              src={vueProject}
              alt="My Fests project preview"
              className={styles.projectImg}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

      <section className={`${styles.section} ${styles.tech}`}>
        <h2 className={styles.subtitle}>Tech Skills</h2>

        <ul className={styles.techList}>
          <li>
            <strong>Core:</strong> Next.js (App Router), React 18, TypeScript 5, JavaScript (ES6+), Vue 3 (Composition API, Vuex)
          </li>
          <li>
            <strong>Tools & Platforms:</strong> Firebase (Realtime DB, Auth, Storage, Hosting), REST APIs, Webpack, Git (GitHub / GitLab), npm / yarn
          </li>
          <li>
            <strong>UI & Performance:</strong> SCSS, BEM, Framer Motion, CSS & SVG animations, accessibility (A11y), optimization for rendering and load speed
          </li>
          <li>
            <strong>Additional:</strong> Testing with Jest & Testing Library, documentation & UI library refactoring, XBRL data visualization, MongoDB basics
          </li>
        </ul>
      </section>

      <section className={`${styles.section} ${styles.contacts}`}>
        <h2 className={styles.subtitle}>Contacts</h2>

        <ul className={styles.contactsList}>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:egorarkharov@gmail.com">
              egorarkharov@gmail.com
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/egorarkharov"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/egorarkharov
            </a>
          </li>
          <li>
            <strong>Telegram:</strong>{" "}
            <a
              href="https://t.me/egorarkharov"
              target="_blank"
              rel="noopener noreferrer"
            >
              @egorarkharov
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AuthorPage;