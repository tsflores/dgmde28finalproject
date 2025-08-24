import axios from "axios";
import { useEffect, useState } from "react";
import { Show } from "../components/show.js";

export const Category = (props) => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState("true");

  //aynchronous function to fetch shows from TMDB API
  const fetchFilteredShows = async (baseURL, filterUS = false) => {
    try {
      setIsLoading(true);
      const allShows = [];

      //fetch both pages 1 and 2 to get a longer list of shows; append page and number to end of query string if necessary
      for (let page = 1; page <= 2; page++) {
        const url = baseURL.includes("page=")
          ? baseURL.replace(/page=\d+/, `page=${page}`)
          : `${baseURL}&page=${page}`;

        // Source for using Axios in a fetch operation against the TMDB API https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/
        const response = await axios.get(url);
        allShows.push(...response.data.results);
      }

      let filteredShows = allShows;

      console.log(filteredShows[0].media_type);

      //filtering for US based shows only if flag is set to true
      if (filterUS) {
        filteredShows = allShows.filter((show) => show.origin_country && show.origin_country.includes("US")
        );
      }

      //wittling the list of shows to render down to no more than 20
      const uniqueShows = filteredShows
        .filter(
          (show, index, self) =>
            index === self.findIndex((s) => s.id === show.id)
        )
        .slice(0, 20);

      setShows(uniqueShows);
      setIsLoading(false);
      
    } catch (error) {
      console.log("Error fetching filtered list of shows from API");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredShows(props.fetchURL, props.filterUS);
  }, [props.fetchURL, props.filterUS]);

  if (isLoading) {
    return (
      <section>
        <h2>{props.title}</h2>
        <div>Loading...</div>
      </section>
    );
  }

  /*Create the panel of images that make up the category displayed; 
      Insert an id for each for future styling if necessary - perhaps when a movie
      version is added as an enhancement.  Use the Show component to display the pane
      of images. */

  return (
    <section>
      <h2>{props.title}</h2>
      <div>
        <ul className="image-container" id={props.rowId}>
          {shows.map((show, id) => (
            <Show key={id} show={show}></Show>
          ))}
        </ul>
      </div>
    </section>
  );
};
