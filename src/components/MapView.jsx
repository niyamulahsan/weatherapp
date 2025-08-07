import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { t } from "../utils/i18n";

export default function MapView() {
	const { weather, lang, forecastPeriod } = useSelector((s) => s.weather);
	const mapDivRef = useRef(null);
	const mapInstance = useRef(null);

	useEffect(() => {
		if (!weather || !window.L) return;
		const { lon, lat } = weather.coord;

		// Destroy old map if exists
		if (mapInstance.current) {
			mapInstance.current.remove();
			mapInstance.current = null;
		}

		// Create map fresh
		mapInstance.current = window.L.map(mapDivRef.current).setView(
			[lat, lon],
			10
		);
		window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(mapInstance.current);
		window.L.marker([lat, lon]).addTo(mapInstance.current);

		// Cleanup on unmount
		return () => {
			if (mapInstance.current) {
				mapInstance.current.remove();
				mapInstance.current = null;
			}
		};
	}, [weather, lang, forecastPeriod]);

	return (
		<>
			<div className="card card-body h-100">
				<b className="mb-2">
					<i className="bi bi-map"></i> {t("Map View", "মানচিত্র", lang)}
				</b>
				<div ref={mapDivRef} style={{ width: "100%", height: 200 }}></div>
			</div>
		</>
	);
}
