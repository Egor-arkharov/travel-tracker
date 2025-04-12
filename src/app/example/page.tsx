import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";

export default function Example() {
	return (
		<>
			<Hero
				title="My Travel Diary"
				subtitle="All your trips, in one beautiful place."
				image="/images/hero-bg-2.jpg"
				variant="example"
				buttonText="Add a new trip"
				buttonHref="/create"
			/>
			<TravelsPage />
		</>
	);
}


