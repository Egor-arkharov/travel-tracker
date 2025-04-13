"use client";
import { APILoader } from "@googlemaps/extended-component-library/react";
import styles from "./Form.module.scss";
import CityInput from "./CityInput";
import DateRangeField from "./DateRangeField";
import RatingField from "./RatingField";
import BudgetField from "./BudgetField";
import DescriptionField from "./DescriptionField";
import ImagePathField from "./ImagePathField";

const CreateForm = () => {

  return (
    <>
      <h2>Create trip</h2>
      <APILoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} language="en"/>
      <form className={styles.form}>
        <CityInput />
        <DateRangeField />
        <RatingField />
        <BudgetField />
        <DescriptionField />
        <ImagePathField />
      </form>
    </>

  );
};

export default CreateForm;
