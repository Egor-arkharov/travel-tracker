"use client";

import Hero from "@/components/Hero/Hero";
import DemoNotice from "@/components/UI/DemoNotice/DemoNotice";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/Form/Form"), { ssr: false });

const CreatePage = () => {
  return (
    <>
      <Hero
        title="Start a New Journey"
        subtitle="Fill in the details and add your next unforgettable trip"
				image="/images/hero/hero-3.jpg"
        backgroundPosition="center 100%" 
      />
      <DemoNotice />
      <Form />
    </>
  );
}

export default CreatePage;