import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  poster_URL,
  API_KEY,
  truncateTitle,
  tvWatchList,
} from "../assets/data.js";
import { FaStar } from "react-icons/fa6";

export const ShowDetails = () => {
  const [info, setInfo] = useState([]);
  const [cast, setCast] = useState([]);
  const [recom, setRecom] = useState([]);
  const { id } = useParams(); //captures the TMDB ID to insert into the URL string
  const [clicked, setClicked] = useState(false);
  const [inList, checkList] = useState(
    tvWatchList.some((item) => item.id === id)
  );
  const location = useLocation();

  const isMovie = location.pathname.includes("/moviedetails/");
  const mediaType = isMovie ? "movie" : "tv";

  const exists = tvWatchList.some((item) => item.id === id);

  //in order to retrieve specific details of a show, the URL needs to have the TMDB ID embedded in it.
  //TMDB API has a number of URLs that also provide recommendations and cast details based on the show ID

  const showDetailURL = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`;
  const showCastURL = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const showRecommendationsURL = `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    axios
      .get(showDetailURL)
      .then((res) => {
        setInfo(res.data);
        window.scrollTo(0, 0);
      })
      .catch((error) => console.log(error));
  }, [showDetailURL]);

  useEffect(() => {
    axios
      .get(showCastURL)
      .then((res) => setCast(res.data))
      .catch((error) => console.log(error));
  }, [showCastURL]);

  useEffect(() => {
    axios
      .get(showRecommendationsURL)
      .then((res) => setRecom(res.data))
      .catch((error) => console.log(error));
  }, [showRecommendationsURL]);

  // add a show to the watch list or remove it if already there
  const appendList = () => {
    console.log("Exists: ", exists);
    if (!exists) {
      tvWatchList.push({ id: id, mediaType: mediaType });
      console.log(tvWatchList);
      setClicked(true);
      checkList(true);
    } else {
      const index = tvWatchList.findIndex((item) => item.id === id);
      if (index !== -1) {
        tvWatchList.splice(index, 1); // Remove 1 item at found index
        setClicked(false);
        checkList(false);
      }
    }
  };

  console.log("Inlist:", inList);
  console.log(tvWatchList);

  const getTitle = () => {
    return info?.title || info?.name; // Movies use 'title', TV shows use 'name'
  };

  // Helper function to get the correct route for recommendations
  const getRecommendationRoute = (itemId) => {
    return isMovie ? `/moviedetails/${itemId}` : `/showdetails/${itemId}`;
  };

  /* For cast and recommendations, remove any items that do not have an actual image, i.e.
  the backdrop_path or profile_path is null.  For each of these, I'm using a different approach
  to illustrate options.  However, the filter approach prior to mapping is preferred. */

  return (
    <section>
      <div className="header-container">
        <img
          className="header-image"
          src={poster_URL + info?.backdrop_path}
          alt={getTitle()}
        />
      </div>
      <div className="show-details-container">
        <div className="poster-container">
          <img src={poster_URL + info?.poster_path} alt={getTitle()} />
        </div>
        <div className="watchlist-text-container">
          <h1 id="details-name">{getTitle()}</h1>
          <h2>{info?.tagline}</h2>

          {/* using conditional statements to change the class of the button
                    and to change the text of the button based on user interaction */}
          <button
            type="button"
            className={
              !inList ? "watchlist-button" : "watchlist-button-disabled"
            }
            onClick={appendList}
          >
            {inList || clicked ? (
              <>&#x2717; Watchlist</>
            ) : (
              <>&#43; Watch List</>
            )}
          </button>

          <h2>
            Rating: {Math.round(info?.vote_average)} <FaStar className="star" />
          </h2>
          <ul>
            {info?.genres?.map((genre) => (
              <li className="details-genre" key={genre?.id}>
                {genre?.name}
              </li>
            ))}
          </ul>
          {/* Render networks if TV listing */}
          {!isMovie && info?.networks && (
            <div>
              {info?.networks?.map((network) => (
                <h2 id="network" key={network?.id}>
                  {network?.name}
                </h2>
              ))}
            </div>
          )}

          {/*Show details for TV listing  */}
          {!isMovie && (
            <>
              <h2>Seasons: {info?.number_of_seasons}</h2>
              <h2>No. of Episodes: {info?.number_of_episodes}</h2>
              <h2>Status: {info?.status}</h2>
            </>
          )}

          {/* Deails for a movie listing */}
          {isMovie && (
            <>
              {info?.release_date && <h2>Release Date: {info.release_date}</h2>}
              {info?.runtime && <h2>Runtime: {info.runtime} minutes</h2>}
            </>
          )}

          <p>{truncateTitle(info?.overview, 800)}</p>
        </div>
      </div>
      <div>
        <h1 className="cast-header"> Cast </h1>
        <ul className="cast-container">
          {cast?.cast?.map(
            (castName) =>
              castName?.profile_path && (
                <li key={castName?.id}>
                  <img
                    className="cast-images"
                    src={poster_URL + castName?.profile_path}
                    alt={castName?.name}
                  />
                  <h4>{castName?.name}</h4>
                </li>
              )
          )}
        </ul>
      </div>
      <h1 className="cast-header"> Recommendations </h1>
      <ul className="cast-container">
        {recom?.results
          ?.filter((recommendedMedia) => recommendedMedia?.backdrop_path)
          ?.map((recommendedItem) => (
            <li key={recommendedItem?.id}>
              <Link
                to={getRecommendationRoute(recommendedItem?.id)}
                className="link-render"
                onClick={() => {
                  setClicked(false);
                  checkList(false);
                }}
              >
                <img
                  className="cast-images"
                  src={poster_URL + recommendedItem?.backdrop_path}
                  alt={recommendedItem?.name || recommendedItem?.title}
                />
              </Link>
              <h4>{recommendedItem?.name || recommendedItem?.title}</h4>
            </li>
          ))}
      </ul>
    </section>
  );
};
