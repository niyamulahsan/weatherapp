import { useSelector } from "react-redux";

export default function TodaysHighlight() {
	const { airQuality } = useSelector((s) => s.weather);

	const aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

	const aqi = airQuality?.list?.[0]?.main?.aqi || null;
	const comps = airQuality?.list?.[0]?.components || {};

	return (
		<div className="card card-body">
			<h4 className="fw-bold">Today's Highlights</h4>
			<div className="d-flex align-items-center justify-content-between mb-2">
				<div className="d-block">
					<i className="bi bi-wind"></i> <span>Air Quality Index</span>
				</div>
				<div className="alert alert-secondary py-1 px-2 rounded-5 m-0">
					{aqi ? aqiList[aqi] : "Loading..."}
				</div>
			</div>
			<div className="row">
				{[
					["PM2.5", comps.pm2_5],
					["PM10", comps.pm10],
					["SO2", comps.so2],
					["CO", comps.co],
					["NO", comps.no],
					["NO2", comps.no2],
					["NH3", comps.nh3],
					["O3", comps.o3],
				].map(([label, value]) => (
					<div className="col-4 col-sm-3 col-lg-4" key={label}>
						<span>
							{label}: {value ?? "--"}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
