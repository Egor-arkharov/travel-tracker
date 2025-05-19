import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";

export default function Example() {
	return (
		<>
			<Hero
        title="My Travel Collection"
        subtitle="All your adventures — neatly organized and ready to explore"
				image="/images/hero/hero-2.jpg"
				backgroundPosition="center 50%" 
			/>
			<TravelsPage source="mock"/>
		</>
	);
}


