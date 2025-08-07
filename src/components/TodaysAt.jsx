import { useSelector } from "react-redux";

export default function TodaysAt() {
	const { forecast } = useSelector((s) => s.weather);

	const hours = forecast?.list?.slice(0, 9) ?? [];

	// console.log(forecast?.list);

	if (!hours.length) return null;

	return (
		<div className="card card-body mt-2">
			<h4 className="fw-bold">Today at</h4>
			<div className="row g-2">
				{hours.map((h, i) => (
					<div className="col-4" key={i}>
						<div className="card text-center">
							<div className="card-body">
								<span>
									{new Date(h.dt * 1000).getHours() % 12 || 12}{" "}
									{new Date(h.dt * 1000).getHours() >= 12 ? "PM" : "AM"}
								</span>
								<div className="d-block">
									<span>
										<img
											src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
											alt={h.weather[0].description}
										/>
									</span>
									<span>{Math.round(h.main.temp)}°C</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
