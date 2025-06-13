import styles from "./style.module.scss";

const AboutPage = () => {
  return (
    <section className={styles.wrapper}>
      <h1>About This Project</h1>
      <p>
        Travel Tracker is a personal project built to manage and visualize travel history.
        This page will include a detailed overview of the stack, features, and technical decisions behind the project.
      </p>
    </section>
  );
};

export default AboutPage;
