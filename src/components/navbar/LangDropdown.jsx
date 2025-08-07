import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData, setLang } from "../../store/weather/weatherSlice";

export default function LangDropdown() {
	const { city, lang } = useSelector((s) => s.weather);
	const dispatch = useDispatch();

	const handleLangChange = (e) => {
		dispatch(setLang(e.target.value));
		dispatch(fetchWeatherData({ city, lang: e.target.value }));
	};

	return (
		<>
			<select
				className="form-select border-secondary shadow-none w-auto"
				aria-label="lang"
				value={lang}
				onChange={handleLangChange}
			>
				<option value="en">En</option>
				<option value="bn">Bn</option>
			</select>
		</>
	);
}
