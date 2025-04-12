import styles from "./style.module.scss";

export default function TripsColors() {
  const colorGroups = [
    "green",
    "red",
    "blue",
    "purple",
    "yellow",
    "grey",
  ];

  return (
    <div className={styles.wrapper}>
      <h2>Цветовая палитра</h2>

      <div className={styles.group}>
        <p>Основные</p>
        <ul className={styles.list}>
          <li className={styles.green}></li>
          <li className={styles.yellow}></li>
          <li className={styles.red}></li>
        </ul>
      </div>

      <div className={styles.group}>
        <p>Фоновые</p>
        <ul className={styles.list}>
          <li className={styles.beige}></li>
          <li className={styles.papaya}></li>
          <li className={styles.latte}></li>
        </ul>
      </div>


      {colorGroups.map((group) => (
        <div className={styles.group} key={group}>
          <p>{group[0].toUpperCase() + group.slice(1)}</p>
          <ul className={styles.list}>
            <li className={styles[`${group}-soft`]}></li>
            <li className={styles[`${group}-light`]}></li>
            <li className={styles[`${group}-dark`]}></li>
          </ul>
        </div>
      ))}
    </div>
  );
}
