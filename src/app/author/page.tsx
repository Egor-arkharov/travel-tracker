import styles from "./style.module.scss";

const AuthorPage = () => {
  return (
    <section className={styles.wrapper}>
      <h1>About the Author</h1>
      <p>
        This section will include a short summary of the author — Egor Arkharov —
        a frontend developer with a passion for UI, UX, and interactive design.
        The content here will briefly describe professional background, skills, and contact info.
      </p>
    </section>
  );
};

export default AuthorPage;
