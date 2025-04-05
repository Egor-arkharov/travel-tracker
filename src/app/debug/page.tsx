import styles from "./style.module.scss";

export default async function Trips() {

	return (
		<div className={styles.wrapper}>
			Светлые цвета
			<ul className={styles.list}>
				<li className={styles['soft-red']}></li>
				<li className={styles['soft-blue']}></li>
				<li className={styles['soft-orange']}></li>
				<li className={styles['soft-green']}></li>
			</ul>

			Темные цвета
			<ul className={styles.list}>
				<li className={styles['primary-red']}></li>
				<li className={styles['primary-blue']}></li>
				<li className={styles['primary-orange']}></li>
				<li className={styles['primary-green']}></li>
			</ul>

		</div>
	);
}
