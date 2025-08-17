import Hero from "@/components/Hero/Hero";
import About from "@/components/Homepage/About/About";
// import Explore from "@/components/Homepage/Explore/Explore";
// import Features from "@/components/Homepage/Features/Features";
// import Tools from "@/components/Homepage/Tools/Tools";
// import TravelsPage from "@/components/Travels/Wrapper/TravelsPage";
// import { Suspense } from "react";

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
      {/* <Features />
      <Suspense fallback={<div>Loading travels...</div>}>
      		<TravelsPage mode={"compact"} source="mock" />
      </Suspense>
      <Tools />
      <Explore /> */}
    </>
  );
}

export default Home;