import styles from "./Main.module.scss";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="layout-section">
      <div className={`layout-inner ${styles.inner}`}>
        {children}
      </div>
    </main>
  );
};

export default Main;
