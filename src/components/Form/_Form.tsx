"use client";
import { APILoader } from "@googlemaps/extended-component-library/react";
import styles from "./_Form.module.scss";

import Header from "@/components/UI/Header/Header";
import CityField from "./CityField";
import DateField from "./DateField";
import RatingField from "./RatingField";
import BudgetField from "./BudgetField";
import DescriptionField from "./DescriptionField";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";


const CreateForm = () => {

  return (
    <>
      <Header title="Create trip" icon="car" />

      <APILoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} language="en"/>
      <form className={styles.form}>
        <CityField />
        <DateField />
        <RatingField />
        <BudgetField />
        <DescriptionField />
        <ImageField />
        <SubmitButton />
      </form>
    </>

  );
};

export default CreateForm;
