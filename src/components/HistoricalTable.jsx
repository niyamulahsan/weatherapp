import { useSelector } from "react-redux";
import { t } from "../utils/i18n";

export default function HistoricalData() {
	const { history, lang } = useSelector((s) => s.weather);

	return (
		<>
			<div className="card shadow-sm">
				<div className="card-body">
					<b>{t("Historical Data", "ঐতিহাসিক তথ্য", lang)}</b>
					<table className="table table-sm mt-2">
						<thead>
							<tr>
								<th>{t("Date", "তারিখ", lang)}</th>
								<th className="text-center">
									{t("Temp (°C)", "তাপমাত্রা (°C)", lang)}
								</th>
								<th className="text-center">
									{t("Humidity", "আর্দ্রতা", lang)}
								</th>
							</tr>
						</thead>
						<tbody>
							{history.map((h, i) => (
								<tr key={i}>
									<td>
										{new Date(h.dt).toLocaleDateString(
											lang === "bn" ? "bn-BD" : "en-US"
										)}
									</td>
									<td className="text-center">{h.temp}</td>
									<td className="text-center">{h.humidity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
