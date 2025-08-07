import ForcastDropdown from "./ForcastDropdown";
import ListenForcast from "./ListenForcast";
import DownloadCSV from "./DownloadCSV";

export default function ForecastTools() {
	function handleCSV() {
		if (!forecast) return;
		let csv = "Datetime,API Temp,AI Temp,API Humidity\n";
		forecast.list.forEach((f, i) => {
			csv += `${f.dt_txt},${f.main.temp},${aiForecast.list[i].main.temp},${f.main.humidity}\n`;
		});
		const blob = new Blob([csv], { type: "text/csv" });
		saveAs(blob, `weather_${city}_${Date.now()}.csv`);
	}

	return (
		<>
			<div className="card card-body mb-2">
				<div className="d-flex align-items-center justify-content-between flex-column flex-xl-row">
					<p className="text-center text-xl-start mb-2 mb-xl-0">
						<span>
							<i className="bi bi-info-circle"></i>
						</span>{" "}
						<span>Compare the official and AI-based predictions below.</span>
					</p>
					<div className="d-flex align-items-center">
						<ForcastDropdown />
						<ListenForcast />
						<DownloadCSV />
					</div>
				</div>
			</div>
		</>
	);
}
