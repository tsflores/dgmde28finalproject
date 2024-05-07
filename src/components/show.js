import { Link } from 'react-router-dom';
import { backdrop_URL, truncateTitle } from '../assets/data.js';

export const Show = ({ show }) => {

    /* each image will serve as a link to more details that the user can view and add to a watchlist;
        there are slight variations to the returned object from TMDB depending on whether the request
        was for a movie or TV show; set-up for possible expansion to use with movies as well. */

    return (
        <Link to={`/showdetails/${show?.id}`} className="link-render">
            <li className="thumbnail" show={show}>
                <img src={backdrop_URL + show?.backdrop_path}
                    alt={show?.name} />
                <div className="pane-text">
                    <p>{show?.title ? truncateTitle(show?.title, 20) : truncateTitle(show?.name, 20)}</p>
                </div>
            </li>
        </Link>
    )
}