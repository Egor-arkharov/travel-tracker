"use client";

import styles from "./style.module.scss";

const AuthorPage = () => {
  return (
    <section className={styles.author}>
      <div className={styles.inner}>
        <h1 className={styles.title}>About the Author</h1>

        <div className={styles.text}>
          <p>
            Hi, I’m <strong>Egor Arkharov</strong> — a frontend developer with
            3+ years of experience building interactive, scalable, and
            accessible web interfaces. I focus on clean architecture, semantic
            HTML, and smooth, performance-friendly animations. Over the years
            I’ve worked on a wide range of projects — from small single-page
            widgets to complex multi-section interfaces and reusable UI systems.
          </p>

          <p>
            I specialize in developing modern UI components and improving
            existing architectures. My experience includes refactoring legacy
            codebases, replacing outdated libraries with native JavaScript, and
            optimizing rendering performance through{" "}
            <code>requestAnimationFrame</code>-based animations. I’ve built
            layouts, forms, navigation systems, tables, share panels, and
            animation frameworks — always aiming for minimal, maintainable, and
            predictable code.
          </p>
        </div>

        <div className={styles.project}>
          <h2>Pet Project — My Fests</h2>
          <p>
            Before this project, I created <strong>My Fests</strong>, a
            Vue-based web app for generating fictional music festivals. It
            allowed users to create custom festivals by uploading text, images,
            and dates — or generate random ones using dynamic data.
          </p>
          <p>
            <strong>Tech stack:</strong> Vue (Composition API, Vuex, Vue Router),
            Firebase (DB & Hosting), Axios, Sass, Webpack.
          </p>
          <p>
            That project helped me solidify my understanding of Vue’s
            architecture and Firebase integration, and later inspired the
            current project — <strong>Travel Tracker</strong>, where I applied
            the same ideas using <strong>React + Next.js + TypeScript</strong>.
          </p>
        </div>

        <div className={styles.tech}>
          <h2>Tech Stack</h2>
          <ul>
            <li>
              <strong>Core:</strong> JavaScript (ES6+), TypeScript, React, Redux
              Toolkit, Vue, SCSS (BEM, animations), HTML5 (semantics &
              accessibility)
            </li>
            <li>
              <strong>Tools & Platforms:</strong> Firebase (Realtime DB, Auth,
              Storage), Webpack, Git (GitHub/GitLab), npm/yarn
            </li>
            <li>
              <strong>Additional:</strong> RegExp data parsing, SVG animations,
              Canvas, basic Three.js, performance optimization
            </li>
          </ul>
        </div>

        <div className={styles.contacts}>
          <h2>Contacts</h2>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:egor.arkharov.dev@gmail.com">
                egor.arkharov.dev@gmail.com
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
        </div>
      </div>
    </section>
  );
}

export default AuthorPage;