import axios from 'axios';
import { useEffect, useState } from 'react';
import {API_REQUESTS, poster_URL} from '../assets/data.js';

export const Header = (props) => {
  const [shows, setShows] = useState([]);

//Find a random show to place in the header
  const randomShow = shows[Math.floor(Math.random() * shows.length)];

  //generate API request to TMDB using the randomShow URL.
  useEffect(() => {
    axios
        .get(API_REQUESTS.requestSciFiTV)
        .then(response => (
            setShows(response.data.results)
        ))
        .catch(error => console.log(error))
  }, [])


  return (
    <div className="header-container">
        <img className = "header-image" src={poster_URL + randomShow?.backdrop_path} alt={randomShow?.title} />
        <div className = "overlay-text">
          <p className="header-main-text">{props.primaryMsg}</p>
          <p className = "header-sub-text">{props.secondaryMsg}</p>
          <p className = "header-sub-text">{props.tertiaryMsg} <br /> {props.quaternaryMsg}</p>
        </div>
    </div>

  )
}