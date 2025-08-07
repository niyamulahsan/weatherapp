import { useSelector } from "react-redux";
import { t } from "../utils/i18n";

export default function ForecastTable() {
	const { forecast, aiForecast, lang } = useSelector((s) => s.weather);

	return (
		<>
			{forecast && aiForecast && (
				<div className="card shadow-sm mt-2">
					<div
						className="card-body table-responsive"
						style={{ maxHeight: "300px", overflowY: "auto" }}
					>
						<table className="table table-bordered table-sm mb-0">
							<thead>
								<tr>
									<th>{t("Time", "সময়", lang)}</th>
									<th className="text-center">
										{t("API Temp (°C)", "এপিআই তাপমাত্রা (°C)", lang)}
									</th>
									<th className="text-center">
										{t("AI Temp (°C)", "এআই তাপমাত্রা (°C)", lang)}
									</th>
									<th className="text-center">{t("Diff", "পার্থক্য", lang)}</th>
									<th className="text-center">
										{t("Humidity", "আর্দ্রতা", lang)}
									</th>
								</tr>
							</thead>
							<tbody>
								{forecast.list.map((f, i) => (
									<tr key={i}>
										<td>
											{new Date(f.dt_txt).toLocaleString(
												lang === "bn" ? "bn-BD" : "en-US"
											)}
										</td>
										<td className="text-center">{f.main.temp}</td>
										<td className="text-center">
											{aiForecast.list[i].main.temp}
										</td>
										<td className="text-center">
											{Math.abs(
												f.main.temp - aiForecast.list[i].main.temp
											).toFixed(1)}
										</td>
										<td className="text-center">{f.main.humidity}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
}
