import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from "./pages/home.js";
import { Search } from "./pages/search.js";
import { Nav } from "./components/navigation.js";
import { TVWatchList } from "./pages/tvwatchlist.js";
import { ShowDetails } from "./pages/showDetails.js";
// import { Login } from "./pages/login.js";
import { My404 } from "./pages/error.js";
import "./App.css";

function MyApp() {
	//paths used for the pages or navigation items on the app
	return (
		<div>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/watchlist" element={<TVWatchList />} />
				<Route path ="/search" element={<Search />} />
				{/* <Route path ="/login" element={<Login />} /> */}
				<Route path ="/showdetails/:id" element={<ShowDetails />} />
				<Route path ="/moviedetails/:id" element={<ShowDetails />} />
				<Route path ="*" element={<My404 />} />
			</Routes>
		</div>
	)
}

function MovieApp() {

	return (
		<Router>
			<MyApp />
		</Router>
	);
}

export default MovieApp;

