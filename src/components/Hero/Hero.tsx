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
	backgroundPosition?: string;
}

const Hero = ({
	title,
	subtitle,
	image,
	buttonText = "Create a trip",
	buttonHref = "/#",
	backgroundPosition = "center",
}: HeroProps) => {
	return (
		<section className={styles.hero} id="hero">
			<div
				className={styles.background}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: backgroundPosition,
        }}
			/>
			<div className={styles.inner}>
				<h1 className={styles.title}>{title}</h1>
				<p className={styles.subtitle}>{subtitle}</p>
				<div className={styles.buttons}>
					{buttonText && (
						<Link href={buttonHref} className={styles.primaryButton}>
							{buttonText}
						</Link>
					)}
					<button className={styles.primaryButton}>Log in</button>
				</div>

			</div>
		</section>
	);
};

export default Hero;
