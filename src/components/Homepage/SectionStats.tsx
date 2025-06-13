import Image from "next/image";
import styles from "./Section.module.scss";

const SectionStats = () => {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<div className={styles.text}>
					<h2>Track your travel stats</h2>
					<p>
						Total trips, budgets, days on the road, countries visited and more — your data is automatically calculated and beautifully presented.
					</p>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						src="/images/homepage/stats.jpg"
						alt="stats"
						fill
						sizes="(max-width: 768px) 100vw, 600px"
						className={styles.image}
						unoptimized
					/>
				</div>
			</div>
		</section>
	);
};

export default SectionStats;
