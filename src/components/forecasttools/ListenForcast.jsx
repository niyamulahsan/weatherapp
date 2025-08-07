import { useSelector } from "react-redux";
import { t } from "../../utils/i18n";
import useSpeech from "../../hooks/useSpeech";

export default function ListenForcast() {
	const { weather, lang } = useSelector((s) => s.weather);
	const speak = useSpeech();

	return (
		<>
			<button
				className="btn btn-sm btn-outline-secondary me-2"
				onClick={() =>
					speak(
						`${weather.name}, ${t("Temp", "তাপমাত্রা", lang)}: ${Math.round(
							weather.main.temp
						)}°C, ${weather.weather[0].description}`
					)
				}
			>
				Listen to Forecast
			</button>
		</>
	);
}
