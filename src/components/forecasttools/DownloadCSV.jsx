import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { t } from "../../utils/i18n";

export default function DownloadCSV() {
	const { forecast, aiForecast, city, lang } = useSelector((s) => s.weather);

	const handleCSV = () => {
		if (!forecast) return;
		let csv = "Datetime,API Temp,AI Temp,API Humidity\n";
		forecast.list.forEach((f, i) => {
			csv += `${f.dt_txt},${f.main.temp},${aiForecast.list[i].main.temp},${f.main.humidity}\n`;
		});
		const blob = new Blob([csv], { type: "text/csv" });
		saveAs(blob, `weather_${city}_${Date.now()}.csv`);
	};

	return (
		<>
			<button
				className="btn btn-sm btn-outline-secondary"
				onClick={handleCSV}
				aria-label={t("Download CSV", "CSV ডাউনলোড", lang)}
			>
				<i className="bi bi-download"></i> <span>CSV</span>
			</button>
		</>
	);
}
