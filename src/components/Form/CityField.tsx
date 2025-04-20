"use client";

import { useCallback, useRef, useState } from "react";
import { PlacePicker } from "@googlemaps/extended-component-library/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./_Form.module.scss";

const CityField = () => {
  const dispatch = useAppDispatch();
  const { city, country } = useAppSelector((state) => state.travelForm);
  const [isTyping, setIsTyping] = useState(false);
  const hasValue = !!city || !!country;

  const handlePlaceChange = useCallback((e: any) => {
    const place = e.target?.value;

    const getComponent = (type: string) =>
      place?.addressComponents?.find((c: any) => c.types.includes(type))?.longText ?? "";

    const city = getComponent("locality");
    const country = getComponent("country");
    const lat = place?.location?.lat?.();
    const lng = place?.location?.lng?.();

    dispatch(updateField({ key: "city", value: city }));
    dispatch(updateField({ key: "country", value: country }));
    dispatch(updateField({ key: "lat", value: lat }));
    dispatch(updateField({ key: "lng", value: lng }));

    setIsTyping(false);
  }, [dispatch]);

  const handleInput = () => {
    if (!isTyping) setIsTyping(true);
  };

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
      </div>
    </fieldset>
  );
};

export default CityField;
