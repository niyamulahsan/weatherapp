import { useSelector } from "react-redux";
import { t } from "../utils/i18n";

export default function WeatherCard() {
	const { weather, lang } = useSelector((s) => s.weather);
	if (!weather) return null;

	const dt = new Date((weather.dt || Date.now()) * 1000);

	function formatAtOffset(unixSeconds, offsetSeconds, locale = "en-US") {
		const shiftedMs = (unixSeconds + offsetSeconds) * 1000;
		return new Intl.DateTimeFormat(locale, {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
			timeZone: "UTC", // keep UTC so we don't reapply system offset
		}).format(new Date(shiftedMs));
	}

	return (
		<>
			<div className="card card-body today-short mb-2">
				<div className="row">
					<div className="col-7">
						<div className="d-flex align-items-center mb-3">
							<div className="fs-3">
								<i className="bi bi-geo-alt"></i>
							</div>
							<h5 className="fw-bold m-0">
								<span>
									{weather.name}, {weather.sys.country}
								</span>
								<div className="fw-normal fs-6">
									<span>
										<i className="bi bi-calendar"></i>
									</span>
									<span>
										{" "}
										{dt.toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
											month: "short",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
							</h5>
						</div>
						<div>
							<span className="h2 m-0 fw-bold">
								{/* <i className="bi bi-clouds"></i> */}
								<img
									src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
									alt={weather.weather[0].description}
								/>
							</span>
							<span className="h2 m-0 fw-bold">
								{Math.round(weather.main.temp)}°C
							</span>
						</div>
					</div>
					<div className="col-5">
						<div className="sunrise d-flex align-items-center">
							<span className="h1 m-0">
								<i className="bi bi-sunrise"></i>
							</span>
							<div className="ms-2">
								<p className="m-0">{t("Sunrise", "সূর্যোদয়", lang)}</p>
								<p className="m-0">
									{formatAtOffset(
										weather.sys.sunrise,
										weather.timezone,
										lang === "bn" ? "bn-BD" : "en-US"
									)}
								</p>
							</div>
						</div>
						<div className="sunrise d-flex align-items-center">
							<span className="h1 m-0">
								<i className="bi bi-sunset"></i>
							</span>
							<div className="ms-2">
								<p className="m-0">{t("Sunset", "সূর্যাস্ত", lang)}</p>
								<p className="m-0">
									{formatAtOffset(
										weather.sys.sunset,
										weather.timezone,
										lang === "bn" ? "bn-BD" : "en-US"
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-2">
					<p className="mb-2">
						{t("Feels like", "অনুভূত হয়", lang)}
						<span>
							<i className="bi bi-thermometer-half"></i>
						</span>
						{Math.round(weather.main.feels_like)}°C.{" "}
						{weather.weather[0]?.description}
					</p>
					<div className="row">
						<div className="col-6">
							<span>
								<i className="bi bi-droplet"></i>
							</span>{" "}
							<span>
								{t("Humidity", "আর্দ্রতা", lang)}: {weather.main.humidity}%
							</span>
						</div>
						<div className="col-6">
							<span>
								<i className="bi bi-compass"></i>
							</span>{" "}
							<span>
								{t("Pressure", "চাপ", lang)}: {weather.main.pressure} hPa
							</span>
						</div>
						<div className="col-6">
							<span>
								<i className="bi bi-eye"></i>
							</span>{" "}
							<span>
								{t("Visibility", "দৃশ্যমানতা", lang)}:{" "}
								{(weather.visibility / 1000).toFixed(1)} km
							</span>
						</div>
						<div className="col-6">
							<span>
								<i className="bi bi-cursor"></i>
							</span>{" "}
							<span>
								{t("Wind speed", "বাতাসের গতি", lang)}: {weather.wind.speed} m/s
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
