import { useSelector } from "react-redux";
import { setFeedback } from "../store/weather/weatherSlice";
import { t } from "../utils/i18n";

export default function FeedbackForm() {
	const { feedback, lang } = useSelector((s) => s.weather);

	return (
		<>
			<div className="card mt-2">
				<form>
					<div className="card-body">
						<b>{t("Improve our AI", "আমাদের AI উন্নত করুন", lang)}</b>
						<div className="input-group mt-2">
							<input
								type="text"
								className="form-control shadow-none border-secondary"
								placeholder={t(
									"Feedback, suggestion, or rating...",
									"প্রতিক্রিয়া, পরামর্শ বা রেটিং...",
									lang
								)}
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								aria-label={t("Feedback", "প্রতিক্রিয়া", lang)}
							/>
							<button
								className="btn btn-outline-secondary"
								onClick={() => {
									alert(
										t(
											"Thank you for your feedback!",
											"আপনার মতামতের জন্য ধন্যবাদ!",
											lang
										)
									);
									setFeedback("");
								}}
							>
								{t("Submit", "জমা দিন", lang)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
