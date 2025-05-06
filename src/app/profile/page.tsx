// components/Header.tsx
// "use client"
import Hero from "@/components/Hero/Hero";

const PROFILE = () => {

  return (
		<>
      <Hero
        title="Welcome Back, Traveler"
        subtitle="View your stats, trips, and continue exploring the world."
        image="/images/hero/hero-4.jpg"
        backgroundPosition="center 30%"
      />
		</>
  );
};

export default PROFILE;
