import { Link } from "react-router-dom";
import logo from "../assets/landscapeLogo.jpg";
import { FaMagnifyingGlass, FaClipboardList } from "react-icons/fa6"

//module that creates the navigation items.  Shows up on all of the pages

export function Nav() {
  return (
    <nav className="main-nav">
      <div className="nav-left">
        <Link to="/">
          <img id="logo" src={logo} alt="The Movie Database (TMDB)" />
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/watchlist" className = "nav-icon" title="Watchlist"> <FaClipboardList /> </Link>
        <Link to="/search" className = "nav-icon" title ="Search"> <FaMagnifyingGlass /> </Link>
      </div>
    </nav>
  );
}
