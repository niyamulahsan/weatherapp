import { useSelector } from "react-redux";

export default function AlertBanner() {
	const alerts = useSelector((s) => s.weather.alerts);
	if (!alerts?.length) return null;
	return (
		<div className="alert alert-danger mt-3" role="alert">
			<b>{alerts[0].event}</b>: {alerts[0].description}
		</div>
	);
}
