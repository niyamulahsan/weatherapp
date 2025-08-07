import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { t } from "../../utils/i18n";
import { fetchCityByCoords, setError } from "../../store/weather/weatherSlice";

export default function DetectLocation() {
	const navigate = useNavigate();

	const { lang, city } = useSelector((s) => s.weather);
	const dispatch = useDispatch();

	const handleDetectLocation = () => {
		dispatch(setError(""));
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				dispatch(
					fetchCityByCoords({
						lat: pos.coords.latitude,
						lon: pos.coords.longitude,
						lang,
					})
				).then((res) => navigate(`/${res.payload.toLowerCase()}`));
			});
		} else {
			alert(
				t("Geolocation not available.", "ভৌগলিক অবস্থান পাওয়া যায়নি।", lang)
			);
		}
	};

	return (
		<>
			<button
				className="btn btn-outline-secondary me-1"
				id="getLocation"
				onClick={handleDetectLocation}
				title={t("Detect Location", "অবস্থান নির্ধারণ", lang)}
			>
				<i className="bi bi-geo-alt"></i>
				<span>{t("Detect Location", "অবস্থান নির্ধারণ", lang)}</span>
			</button>
		</>
	);
}
