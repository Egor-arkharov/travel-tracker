// components/Hero.tsx

// "use client";

import Link from "next/link";
import styles from "./Hero.module.scss";

interface HeroProps {
	title: string;
	subtitle: string;
	image: string;
	buttonText?: string;
	buttonHref?: string;
	variant?: "default" | "example";
}

const Hero = ({
	title,
	subtitle,
	image,
	buttonText = "Create a trip",
	buttonHref = "/#",
	variant,
}: HeroProps) => {
	return (
		<section className={styles.hero} id="hero">
			<div
				className={`${styles.background} ${variant === "example" ? styles.backgroundExample : ""}`}
				style={{ backgroundImage: `url(${image})` }}
			/>
			<div className={styles.inner}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
				{buttonText && (
					<Link href={buttonHref} className={styles.primaryButton}>
						{buttonText}
					</Link>
				)}
			</div>
		</section>
	);
};

export default Hero;
