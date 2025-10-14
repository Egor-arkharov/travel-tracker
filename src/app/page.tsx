import Hero from "@/components/Hero/Hero";
import About from "@/components/Homepage/About/About";
import Features from "@/components/Homepage/Features/Features";
import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
import Tools from "@/components/Homepage/Tools/Tools";
import Explore from "@/components/Homepage/Explore/Explore";

const Home = () => {
  return (
    <>
      <Hero
        title="Track &amp;&nbsp;Relive Your Journeys"
        subtitle="Capture your travels, map your routes, and keep your memories in&nbsp;one place."
        image="/images/hero/hero-1.jpg"
        backgroundPosition="center 30%"
      />
      <About />
      <Features />
      <TravelsPage mode={"compact"} source="mock" />
      <Tools />
      <Explore />
    </>
  );
}

export default Home;