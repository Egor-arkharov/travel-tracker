// components/About.tsx
import Image from "next/image";

import Header from "@/components/UI/Header/Header";
import styles from "./About.module.scss";

const About = () => {
	return (
		<section className={styles.about}>
			<Header title="Your beautiful journeys" icon="plane" />

			<div className={styles.inner}>
				<div className={styles.text}>
					<div className={styles.decor}></div>
					<p>
						Whether you&rsquo;re planning your next big adventure or&nbsp;reflecting on&nbsp;journeys past, Travel Tracker helps you organize, visualize and relive your experiences like never before. Add trips, mark destinations, rate your travels, set budgets and attach memories&nbsp;&mdash; all in&nbsp;one place.
					</p>
					<p>
						You can create a&nbsp;private journal just for yourself or&nbsp;share your favorite places with the world. Every trip is&nbsp;more than just a&nbsp;location on&nbsp;a&nbsp;map&nbsp;&mdash; it&rsquo;s a&nbsp;story, a&nbsp;memory, a&nbsp;feeling.
					</p>
					<p>
						With a&nbsp;simple and elegant interface, Travel Tracker makes it&nbsp;easy to&nbsp;turn your scattered travel notes, photos, and plans into something meaningful.
						Whether it&rsquo;s your weekend city break or&nbsp;a&nbsp;months-long expedition, your journey deserves to&nbsp;be&nbsp;remembered&nbsp;&mdash; beautifully.
					</p>

				</div>
				<div className={styles.visual}>
					<Image src="/images/img.jpg" alt="Map illustration" width={400} height={500} />
				</div>
			</div>


		</section>
	);
};

export default About;
