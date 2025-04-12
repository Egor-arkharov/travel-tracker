import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
import About from "@/components/About/About";

export default function Home() {
  return (
    <>
      <Hero
        title="Track & Relive Your Journeys"
        subtitle="Capture your travels, map your routes, and keep your memories in one place."
        image="/images/hero-bg.jpg"
      />
      <About />
			<TravelsPage mode={"compact"} />
    </>
  );
}
