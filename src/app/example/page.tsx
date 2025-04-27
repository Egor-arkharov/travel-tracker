import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";

export default function Example() {
	return (
		<>
			<Hero
				title="My Travel Diary (example)"
				subtitle="All your trips, in one beautiful place. (example)"
				image="/images/hero/hero-2.jpg"
				variant="example"
				buttonText="Add a new trip"
				buttonHref="/create"
				backgroundPosition="center 30%" 
			/>
			<TravelsPage />
		</>
	);
}


