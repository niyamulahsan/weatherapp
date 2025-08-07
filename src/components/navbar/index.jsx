import ThemeToggle from "./ThemeToggle";
import DetectLocation from "./DetectLocation";
import LangDropdown from "./LangDropdown";
import SearchLocation from "./SearchLocation";

export default function Navbar() {
	return (
		<>
			<div className="container-fluid container-lg">
				<div className="row">
					<div className="col-12">
						<nav className="navbar bg-body-tertiary">
							<div className="container">
								<div className="row gx-1 w-100">
									<div className="col-12 col-md-3 text-center text-md-start mb-2 mb-md-0">
										<a className="navbar-brand">Weather App</a>
									</div>
									<div className="col-12 col-md-9 d-flex align-items-center flex-column flex-sm-row justify-content-center justify-content-md-end">
										<SearchLocation />
										<div className="d-flex align-items-center justify-content-center justify-content-md-end">
											<DetectLocation />
											<ThemeToggle />
											<LangDropdown />
										</div>
									</div>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}
