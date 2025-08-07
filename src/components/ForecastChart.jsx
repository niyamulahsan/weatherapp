import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { t } from "../utils/i18n";
import Chart from "chart.js/auto";
import AIExplainModal from "./AIExplainModal";
import { setShowAIExplain } from "../store/weather/weatherSlice";

export default function ForecastChart() {
	const chartRef = useRef(null);
	const { forecast, aiForecast, lang } = useSelector((s) => s.weather);
	const dispatch = useDispatch();

	const handleAIExplain = () => {
		dispatch(setShowAIExplain(true));
	};

	useEffect(() => {
		if (!forecast || !aiForecast) return;
		const ctx = chartRef.current.getContext("2d");

		const labels = forecast.list.map((d, i) =>
			new Date(d.dt_txt).toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
				hour: "2-digit",
				weekday: "short",
			})
		);

		window.myChart = new Chart(ctx, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: t("API Temp", "এপিআই তাপমাত্রা", lang),
						data: forecast.list.map((d) => d.main.temp),
						borderWidth: 2,
						tension: 0.4,
					},
					{
						label: t("AI Temp", "এআই তাপমাত্রা", lang),
						data: aiForecast.list.map((d) => d.main.temp),
						borderDash: [5, 5],
						borderWidth: 2,
						tension: 0.4,
					},
					{
						label: t("API Humidity", "এপিআই আর্দ্রতা", lang),
						data: forecast.list.map((d) => d.main.humidity),
						borderWidth: 2,
						tension: 0.4,
						yAxisID: "y1",
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					y: {
						title: {
							display: true,
							text: t("Temp (°C)", "তাপমাত্রা (°C)", lang),
						},
					},
					y1: {
						position: "right",
						title: {
							display: true,
							text: t("Humidity (%)", "আর্দ্রতা (%)", lang),
						},
						grid: { drawOnChartArea: false },
					},
				},
				plugins: {
					legend: { position: "bottom" },
					tooltip: {
						callbacks: {
							label: function (context) {
								return `${context.dataset.label}: ${context.formattedValue}`;
							},
						},
					},
				},
			},
		});

		// Cleanup function
		return () => {
			if (window.myChart) window.myChart.destroy();
		};
	}, [forecast, aiForecast, lang]);

	return (
		<>
			<AIExplainModal />
			<div className="card h-100 mt-2">
				<div className="card-body">
					<div className="d-flex justify-content-between align-items-center">
						<b>
							{t("Forecast Comparison", "পূর্বাভাস তুলনা", lang)}{" "}
							<span
								className="ms-2"
								tabIndex={0}
								data-bs-toggle="tooltip"
								data-bs-placement="right"
								title={t(
									"Compare official forecast with AI prediction.",
									"সরকারি পূর্বাভাসের সাথে AI পূর্বাভাস তুলনা করুন।",
									lang
								)}
								aria-label={t(
									"Compare official forecast with AI prediction.",
									"সরকারি পূর্বাভাসের সাথে AI পূর্বাভাস তুলনা করুন।",
									lang
								)}
							>
								<i className="bi bi-info-circle"></i>
							</span>
						</b>
						<button
							className="btn btn-outline-primary btn-sm"
							onClick={handleAIExplain}
						>
							{t("Explain AI", "AI ব্যাখ্যা", lang)}
						</button>
					</div>
					<canvas ref={chartRef} height={150}></canvas>
				</div>
			</div>
		</>
	);
}
