import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData, setCity } from "../../store/weather/weatherSlice";
import { t } from "../../utils/i18n";

export default function SearchLocation() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const { lang, error } = useSelector((s) => s.weather);
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			dispatch(setCity(search.trim()));
			dispatch(fetchWeatherData({ city: search.trim(), lang }));
			setSearch("");
			navigate(`/${search.trim()}`);
		}
	};

	return (
		<>
			<form className="me-1 mb-2 mb-sm-0" onSubmit={handleSearch}>
				<div className="input-group justify-content-center justify-content-md-start">
					<button className="btn btn-outline-secondary" type="submit">
						<i className="bi bi-search"></i>
					</button>
					<input
						type="text"
						className={`form-control border-secondary shadow-none flex-grow-0 ${
							error && "border-danger border-2"
						}`}
						style={{ width: "193px" }}
						placeholder={t("Enter City", "শহর লিখুন", lang)}
						aria-label="Enter City"
						value={search}
						onChange={(e) => setSearch(e.target.value.toLowerCase())}
					/>
				</div>
			</form>
		</>
	);
}
