"use client";

import { useCallback } from "react";
import { PlacePicker } from "@googlemaps/extended-component-library/react";
import { useAppDispatch } from "@/store/hooks";
import { updateField } from "@/store/slices/travelFormSlice";
import styles from "./Form.module.scss";

const CityInput = () => {
  const dispatch = useAppDispatch();

  const handlePlaceChange = useCallback((e: any) => {
    const place = e.target?.value;
    
    const getComponent = (type: string) =>
      place?.addressComponents?.find((c: any) => c.types.includes(type))?.longText ?? "";
  
    const city = getComponent("locality");
    const country = getComponent("country");
    const lat = place?.location?.lat?.();
    const lng = place?.location?.lng?.();
  
    console.log("📍 Parsed:", { city, country, lat, lng });

    console.log("🏷️ Full Place object:");
    console.log({
      address: place?.formattedAddress,
      lat: place?.location?.lat?.(),
      lng: place?.location?.lng?.(),
      placeId: place?.id,
      mapsLink: place?.googleMapsURI,
      types: place?.types,
      displayName: place?.displayName,
      website: place?.websiteURI,
    });
  
    dispatch(updateField({ key: "city", value: city }));
    dispatch(updateField({ key: "country", value: country }));
    dispatch(updateField({ key: "lat", value: lat }));
    dispatch(updateField({ key: "lng", value: lng }));

  }, [dispatch]);
  

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>City</label>
      <PlacePicker
        placeholder="Start typing a city..."
        id="place-picker"
        onPlaceChange={handlePlaceChange}
        className={styles.input}
      />
    </div>
  );
};

export default CityInput;
