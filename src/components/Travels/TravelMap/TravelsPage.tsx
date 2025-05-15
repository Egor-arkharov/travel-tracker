/* eslint-disable @next/next/no-img-element */
"use client";

import {
	GoogleMap,
	Marker,
	InfoWindow,
	useLoadScript,
} from "@react-google-maps/api";
import { Travel } from "@/types/travel";
import { useMemo, useState } from "react";
import styles from "./TravelsMap.module.scss";

const containerStyle = {
	width: "100%",
	height: "540px",
};

const centerDefault = { lat: 37.9838, lng: 23.7275 };

const TravelsMap = ({ travels }: { travels: Travel[] }) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
	});

	const [activeTrip, setActiveTrip] = useState<Travel | null>(null);

	const center = useMemo(() => {
		const withCoords = travels.filter(
			(t) =>
				typeof t.location?.lat === "number" &&
				typeof t.location?.lng === "number"
		);

		if (withCoords.length === 0) return centerDefault;

		if (withCoords.length === 1) {
			const { lat, lng } = withCoords[0].location;
			return { lat: lat!, lng: lng! };
		}

		const avgLat =
			withCoords.reduce((sum, t) => sum + t.location.lat!, 0) /
			withCoords.length;
		const avgLng =
			withCoords.reduce((sum, t) => sum + t.location.lng!, 0) /
			withCoords.length;

		return { lat: avgLat, lng: avgLng };
	}, [travels]);

	if (!isLoaded) return <p>Loading map...</p>;

	return (
		<div className={styles.map}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
				{travels.map((travel) => {
					const { lat, lng } = travel.location ?? {};
					if (lat == null || lng == null) return null;

					return (
						<Marker
							key={travel.id}
							position={{ lat, lng }}
							title={travel.location.city}
							onClick={() => setActiveTrip(travel)}
						/>
					);
				})}

				{activeTrip &&
					activeTrip.location?.lat != null &&
					activeTrip.location?.lng != null && (
						<InfoWindow
							position={{
								lat: activeTrip.location.lat,
								lng: activeTrip.location.lng,
							}}
							onCloseClick={() => setActiveTrip(null)}
						>
							<div className={styles.mapCard}>
								{activeTrip.meta.isMock && activeTrip.media.imagePath && (
									<img
										src={activeTrip.media.imagePath}
										alt={activeTrip.location.city}
										className={styles.image}
									/>
								)}

								<p className={styles.title}>{activeTrip.location.country}</p>

								<p className={styles.city}>{activeTrip.location.city}</p>

								<p className={styles.dates}>
									{activeTrip.dates.start} – {activeTrip.dates.end}
								</p>

								<p className={styles.budget}>${activeTrip.budget}</p>

								<p className={styles.rating}>⭐ {activeTrip.rating}</p>

								{activeTrip.description && (
									<p className={styles.description}>{activeTrip.description}</p>
								)}
							</div>
						</InfoWindow>
					)}
			</GoogleMap>
		</div>
	);
};

export default TravelsMap;
