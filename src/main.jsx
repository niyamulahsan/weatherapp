import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store/index.js";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import "./assets/scss/styles.scss";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/:city?" element={<App />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
