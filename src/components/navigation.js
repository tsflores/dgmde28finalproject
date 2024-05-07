import { Link } from 'react-router-dom';
import logo from "../assets/landscapeLogo.jpg";


//module that creates the navigation items.  Shows up on all of the pages

export function Nav() {
	return (
		<nav className='main-nav'>
			<Link to="/"><img id="logo" src={logo} alt="The Movie Database (TMDB)" /></Link>
			<Link to="/watchlist">Watchlist</Link>
			<Link to="/search">Search</Link>
			<Link to="/login">Login</Link>
		</nav>
	);
}