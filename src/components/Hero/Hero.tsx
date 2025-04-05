// components/Hero.tsx
import Link from "next/link";
import styles from "./Hero.module.scss";

const Hero = () => {
	return (
		<section className={styles.hero}>
				<h1 className={styles.title}>
					Track & Relive Your Journeys
				</h1>
				<p className={styles.subtitle}>
					Capture your travels, map your routes, and keep your memories in one place.
				</p>
				<Link href="/#" className={styles.primaryButton}>Create a trip</Link>
		</section>
	);
};

export default Hero;
