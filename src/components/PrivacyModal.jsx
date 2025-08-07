import { useSelector, useDispatch } from "react-redux";
import { setConsent } from "../store/weather/weatherSlice";
import { t } from "../utils/i18n";

export default function PrivacyModal() {
	const lang = useSelector((s) => s.weather.lang);
	const dispatch = useDispatch();

	return (
		<div className="container d-flex align-items-center justify-content-center vh-100">
			<div className="card shadow p-4">
				<h3>{t("Privacy Consent", "গোপনীয়তা সম্মতি", lang)}</h3>
				<p>
					{t(
						"This app uses your location and stores usage feedback only for improving AI predictions. No personal info is stored.",
						"এই অ্যাপটি আপনার অবস্থান ব্যবহার করে এবং শুধুমাত্র AI পূর্বাভাস উন্নত করতে প্রতিক্রিয়া সংরক্ষণ করে। কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না।",
						lang
					)}
				</p>
				<button
					className="btn btn-primary"
					onClick={() => dispatch(setConsent(true))}
				>
					{t("I Agree", "আমি সম্মত", lang)}
				</button>
			</div>
		</div>
	);
}
