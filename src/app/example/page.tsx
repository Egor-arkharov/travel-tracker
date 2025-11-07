import { Suspense } from "react";

import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";

export default function Example() {
	return (
		<>
			<Hero
        title="My Travel Collection"
        subtitle="All your adventures&nbsp;&mdash; neatly organized and ready to&nbsp;explore"
				image={2}
				backgroundPosition="60% 50%" 
			/>
			<Suspense fallback={<div>Loading travels...</div>}>
				<TravelsPage source="mock"/>
			</Suspense>
		</>
	);
}


