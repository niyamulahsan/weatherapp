import { useSelector, useDispatch } from "react-redux";
import { setShowAIExplain } from "../store/weather/weatherSlice";
import { t } from "../utils/i18n";

export default function AIExplainModal() {
	const showAIExplain = useSelector((s) => s.weather.showAIExplain);
	const aiForecast = useSelector((s) => s.weather.aiForecast);
	const lang = useSelector((s) => s.weather.lang);
	const dispatch = useDispatch();

	if (!showAIExplain) return null;

	return (
		<div
			className="modal d-block"
			tabIndex="-1"
			onClick={() => dispatch(setShowAIExplain(false))}
		>
			<div
				className="modal-dialog modal-dialog-centered"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							{t("AI Explanation", "AI ব্যাখ্যা", lang)}
						</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => dispatch(setShowAIExplain(false))}
						></button>
					</div>
					<div className="modal-body">
						<p>{aiForecast?.explain}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
