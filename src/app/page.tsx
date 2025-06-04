import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
import About from "@/components/About/About";
import { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Hero
        title="Track & Relive Your Journeys"
        subtitle="Capture your travels, map your routes, and keep your memories in one place."
				image="/images/hero/hero-1.jpg"
        backgroundPosition="center 30%" 
      />
      <About />
      <Suspense fallback={<div>Loading travels...</div>}>
      		<TravelsPage mode={"compact"} source="mock" />
      </Suspense>
    </>
  );
}

export default Home;