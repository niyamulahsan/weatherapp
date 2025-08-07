import { useSelector, useDispatch } from "react-redux";
import { setForecastPeriod } from "../../store/weather/weatherSlice";

export default function ForcastDropdown() {
	const { forecastPeriod } = useSelector((s) => s.weather);
	const dispatch = useDispatch();

	const handleForcastPeriod = (e) => {
		dispatch(setForecastPeriod(e.target.value));
	};

	return (
		<>
			<select
				className="form-select form-select-sm shadow-none border-secondary w-auto me-2"
				value={forecastPeriod}
				onChange={handleForcastPeriod}
			>
				<option defaultValue>Forecast days...</option>
				{[3, 5, 7].map((d) => (
					<option key={d} value={d}>
						{d}
					</option>
				))}
			</select>
		</>
	);
}
