"use client";

import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import dynamic from "next/dynamic";

import styles from "../Form.module.scss";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateField } from "@/store/slices/formSlice";
import { FieldRef } from "@/types/formField";
import { CountryIcon } from "@/components/icons";

type PlaceObject = {
  addressComponents?: { types: string[]; longText: string }[];
  location?: {
    lat?: () => number;
    lng?: () => number;
  };
};

const PlacePicker = dynamic(
  () =>
    import("@googlemaps/extended-component-library/react").then(
      (m) => m.PlacePicker
    ),
  { ssr: false }
);

const CityField = forwardRef<FieldRef, { disabled?: boolean }>(
  ({ disabled = false }, ref) => {
    const dispatch = useAppDispatch();
    const { city, country } = useAppSelector((state) => state.form.location);

    const [error, setError] = useState<string | null>(null);
    const [pickerKey, setPickerKey] = useState(0);
    const [hasSaved, setHasSaved] = useState(false);

    const placePickerRef = useRef<HTMLElement | null>(null);

    const clearLocation = useCallback(() => {
      dispatch(updateField({ path: "location.city", value: "" }));
      dispatch(updateField({ path: "location.country", value: "" }));
      dispatch(updateField({ path: "location.lat", value: null }));
      dispatch(updateField({ path: "location.lng", value: null }));
      setHasSaved(false);
    }, [dispatch]);

    useEffect(() => {
      if (city && country) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasSaved(true);
      }
    }, [city, country]);

    useEffect(() => {
      if (placePickerRef.current) {
        if (disabled) {
          placePickerRef.current.setAttribute("disabled", "");
        } else {
          placePickerRef.current.removeAttribute("disabled");
        }
      }
    }, [disabled]);

    const handlePlaceChange = useCallback(
      (e: Event) => {
        const place = (e.target as { value?: PlaceObject })?.value;
        if (!place?.addressComponents) return;

        const getComponent = (type: string) =>
          place.addressComponents?.find((c) => c.types.includes(type))
            ?.longText ?? "";

        const extractedCity = getComponent("locality");
        const extractedCountry = getComponent("country");
        const lat = place.location?.lat?.();
        const lng = place.location?.lng?.();

        if (!extractedCity || !extractedCountry) {
          setError(
            !extractedCity && !extractedCountry
              ? "Please select a location with both city and country."
              : !extractedCity
              ? "Please select a location that includes a city."
              : "Please select a location that includes a country."
          );
          clearLocation();
          return;
        }

        dispatch(updateField({ path: "location.city", value: extractedCity }));
        dispatch(updateField({
          path: "location.country",
          value: extractedCountry,
        }));
        dispatch(updateField({ path: "location.lat", value: lat }));
        dispatch(updateField({ path: "location.lng", value: lng }));
        setError(null);
      },
      [dispatch, clearLocation]
    );

    const handleInput = (e: Event) => {
      const inputValue = (e.target as HTMLInputElement)?.value;
      if (!inputValue) {
        clearLocation();
        setError(null);
      }
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        if (!city || !country) {
          setError("City and country are required.");
          return false;
        }
        setError(null);
        return true;
      },
      reset: () => {
        clearLocation();
        setError(null);
        setPickerKey((prev) => prev + 1);
      },
    }));

    const focusPickerInput = () => {
      const root = placePickerRef.current?.shadowRoot;
      const input = root?.querySelector("input");
      input?.focus();
    };

    return (
      <fieldset className={styles.fieldset}>
        <label className={styles.label}>City</label>
        <div className={styles.fieldBody}>
          <div
            className={`${styles.inputWrapper} ${
              error ? styles.inputError : ""
            }`}
          >
            <CountryIcon className={styles.inputIcon} width={20} height={20} />
            <PlacePicker
              key={pickerKey}
              id="place-picker"
              placeholder="Start typing a city..."
              onPlaceChange={handlePlaceChange}
              onInput={(e) => handleInput(e as unknown as Event)}
              className={styles.cityInput}
              ref={(el) => {
                placePickerRef.current = el;
              }}
            />
            {(hasSaved || error) && !disabled && (
              <button
                type="button"
                className={styles.customClear}
                onClick={() => {
                  clearLocation();
                  setPickerKey((k) => k + 1);
                  setTimeout(() => focusPickerInput(), 0);
                }}
              >
                ×
              </button>
            )}
          </div>

          {hasSaved && (
            <p className={styles.cityStorageValue}>
              Your location is: <b>{city}, {country}</b>
            </p>
          )}
          {error && (
            <p role="alert" className={styles.errorMessage}>
              {error}
            </p>
          )}
        </div>
      </fieldset>
    );
  }
);

CityField.displayName = "CityField";
export default CityField;
