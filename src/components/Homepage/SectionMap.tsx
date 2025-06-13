import styles from "./Section.module.scss";
import Image from "next/image";

const SectionMap = () => {
	return (
		<section className={styles.section}>
			<div className={styles.inner}>
				<div className={styles.bgDecor}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><path fill="#BB004B" d="M290.151-350.111c42.3 72.6 25.3 185 16 268.5-9.2 83.5-10.6 138.1-11.5 208.9-.9 70.8-1.2 157.8-42.8 213.1-41.6 55.3-124.5 78.9-217.4 92.7-92.9 13.7-195.7 17.6-256.9-31.3-61.2-49-80.7-150.8-89.8-241.3-9.1-90.4-7.9-169.5 15.8-241.1 23.7-71.5 69.7-135.4 130.3-202.1 60.5-66.6 135.6-136 223.9-154.4 88.4-18.3 190.1 14.4 232.4 87" /></svg>
				</div>
				<div className={styles.text}>
					<h2>See your trips on the map</h2>
					<p>Visualize every journey, country, and memory at a glance.</p>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						src="/images/homepage/map.jpg"
						alt="Map"
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

export default SectionMap;
