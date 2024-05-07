import axios from 'axios';
import { useEffect, useState } from 'react';
import { backdrop_URL_Small, API_KEY, truncateTitle } from "../assets/data.js";
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6"; //https://www.npmjs.com/package/react-icons

// component that returns details about a single show based on the TMDB specific ID that is associated with that show.
// pages that use this component can render it multiple times to show a list of shows

export const SingleList = (props) => {
    const [shows, setShows] = useState([]);

    const getTVBaseURL = "https://api.themoviedb.org/3/tv/"
    const getTVEndURL = `?api_key=${API_KEY}&language=en-US`
    var tv_ID = props.tvID;

    const getTVURL = getTVBaseURL+tv_ID+getTVEndURL;

    useEffect(() => {
        axios
            .get(getTVURL)
            .then(res => {
                setShows(res.data)
                window.scrollTo(0, 0)  //always start at the top
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }, [getTVURL])

    return (
        <div className="watchlist-image-container" >
            <div className="list-container">
                <Link to={`/showdetails/${shows?.id}`} className="link-render">
                    <img src={backdrop_URL_Small + shows?.backdrop_path} alt={shows?.title} />
                </Link>
                <div className="watchlist-text-container">
                    <h1>{shows?.name}</h1>
                    <h2>Rating: {Math.round(shows?.vote_average)} <FaStar className="star"/></h2>
                    <p>Seasons: {shows?.number_of_seasons}</p>
                    <p>No. of Episodes: {shows?.number_of_episodes}</p>
                    {/* function call to truncateTitle to limit characters displayed */}
                    <p>{truncateTitle(shows?.overview,200)}</p>  
                </div>
            </div>
        </div>
    )
}