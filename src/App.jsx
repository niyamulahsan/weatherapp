import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from "./store/weather/weatherSlice";
import { t } from "./utils/i18n";
import useSpeech from "./hooks/useSpeech";

import PrivacyModal from "./components/PrivacyModal";
import Navbar from "./components/navbar";
import WeatherCard from "./components/WeatherCard";
import TodaysHighlight from "./components/TodaysHighlight";
import TodaysAt from "./components/TodaysAt";
import FeedbackForm from "./components/FeedbackForm";
import ForecastTools from "./components/forecasttools";
import HistoricalTable from "./components/HistoricalTable";
import MapView from "./components/MapView";
import ForecastChart from "./components/ForecastChart";
import ForecastTable from "./components/ForecastTable";
import AlertBanner from "./components/AlertBanner";

function App() {
	const dispatch = useDispatch();
	const city = useSelector((s) => s.weather.city);
	const lang = useSelector((s) => s.weather.lang);
	const consent = useSelector((s) => s.weather.consent);
	const forecastPeriod = useSelector((s) => s.weather.forecastPeriod);
	const loading = useSelector((s) => s.weather.loading);
	const weather = useSelector((s) => s.weather.weather);

	const speak = useSpeech();

	// Fetch weather on relevant changes
	useEffect(() => {
		if (consent) {
			dispatch(fetchWeatherData({ city, lang, forecastPeriod })).then(
				(action) => {
					if (action.payload?.weather && speak) {
						speak(
							`${lang === "bn" ? "বর্তমান আবহাওয়া" : "Current weather"}:${
								action.payload.weather.name
							}, ${action.payload.weather.weather[0].description}, ${Math.round(
								action.payload.weather.main.temp
							)}°C`
						);
					}
				}
			);
		}
		// eslint-disable-next-line
	}, [consent, city, forecastPeriod, lang]);

	if (!consent) {
		return <PrivacyModal />;
	}

	return (
		<>
			<header className="border-bottom shadow-sm">
				<Navbar />
			</header>
			<div className="main-body">
				<AlertBanner />
				{loading && (
					<div className="text-center py-5">
						<div className="spinner-border text-primary"></div>
						<p>{lang === "bn" ? "লোড হচ্ছে..." : "Loading..."}</p>
					</div>
				)}
				{weather && !loading && (
					<div className="container mt-3 pb-3">
						<div className="row g-2">
							<div className="col-12 col-lg-6 col-xl-4">
								<div className="card card-body h-100 p-0 border-0">
									<WeatherCard />
									<TodaysHighlight />
									<TodaysAt />
									<FeedbackForm />
								</div>
							</div>
							<div className="col-12 col-lg-6 col-xl-8">
								<div className="card card-body h-100 p-0 border-0">
									<ForecastTools />
									<div className="row g-2">
										<div className="col-12 col-xl-5">
											<HistoricalTable />
										</div>
										<div className="col-12 col-xl-7">
											<MapView />
										</div>
									</div>
									<ForecastChart />
									<ForecastTable />
								</div>
							</div>
						</div>
					</div>
				)}
				<span className="visually-hidden" role="status" aria-live="polite">
					{weather && !loading
						? `${weather.name} ${t(
								"weather loaded",
								"আবহাওয়া লোড হয়েছে",
								lang
						  )}`
						: ""}
				</span>
			</div>
		</>
	);
}

export default App;
