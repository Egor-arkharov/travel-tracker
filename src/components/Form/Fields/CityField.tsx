"use client";

import { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import { PlacePicker } from "@googlemaps/extended-component-library/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import { FieldRef } from "@/types/formField";
import styles from "../Form.module.scss";

const CityField = forwardRef<FieldRef>((_, ref) => {
  const dispatch = useAppDispatch();
  const { city, country } = useAppSelector((state) => state.travelForm.location);

  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const hasValue = !!city || !!country;

  const handlePlaceChange = useCallback((e: any) => {
    const place = e.target?.value;

    const getComponent = (type: string) =>
      place?.addressComponents?.find((c: any) => c.types.includes(type))?.longText ?? "";


    if (place?.addressComponents) {
      console.log(place.addressComponents);
    }

    console.log(place.displayName?.text);
    console.log(place.types);

    const city = getComponent("locality");
    const country = getComponent("country");
    const lat = place?.location?.lat?.();
    const lng = place?.location?.lng?.();

    dispatch(updateField({ path: "location.city", value: city }));
    dispatch(updateField({ path: "location.country", value: country }));
    dispatch(updateField({ path: "location.lat", value: lat }));
    dispatch(updateField({ path: "location.lng", value: lng }));

    setIsTyping(false);
    setError(null);
  }, [dispatch]);

  const handleInput = () => {
    if (!isTyping) setIsTyping(true);
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (!city) {
        setError("Enter the city");
        return false;
      }
      setError(null);
      return true;
    },
    reset: () => {
      setError(null);
      setIsTyping(false);
    }
  }));


  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>City</label>

      <div className={styles.fieldBody}>
        <div className={styles.inputWrapper}>
          {!isTyping && hasValue && (
            <p className={styles.cityStorageValue}>
              {city ? `${city}` : ""}{country ? `, ${country}` : ""}
            </p>
          )}
          <PlacePicker
            placeholder={hasValue && !isTyping ? "" : "Start typing a city..."}
            id="place-picker"
            onPlaceChange={handlePlaceChange}
            onInput={handleInput}
            className={styles.cityInput}
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </fieldset>
  );
});

CityField.displayName = "CityField";

export default CityField;
