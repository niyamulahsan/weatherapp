import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [theme, setTheme] = useState("light");

	// On mount: set theme from localStorage or system preference
	useEffect(() => {
		const saved = localStorage.getItem("theme");
		const system = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		const initial = saved || system;
		setTheme(initial);
		document.documentElement.setAttribute("data-bs-theme", initial);
	}, []);

	// On theme change: update html attribute & localStorage
	useEffect(() => {
		document.documentElement.setAttribute("data-bs-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const handleToggle = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<button
			type="button"
			onClick={handleToggle}
			className="btn btn-outline-secondary me-1"
			aria-label="Toggle theme"
			id="themeToggle"
		>
			{theme === "dark" ? (
				<i className="bi bi-moon-stars-fill"></i>
			) : (
				<i className="bi bi-brightness-high-fill"></i>
			)}
		</button>
	);
}
