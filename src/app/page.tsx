import Hero from "@/components/Hero/Hero";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
import About from "@/components/About/About";

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
			<TravelsPage mode={"compact"} source="mock" />
    </>
  );
}

export default Home;