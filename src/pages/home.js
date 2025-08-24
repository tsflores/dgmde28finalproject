import { Header } from "../components/pageHeader.js";
import { Category } from "../components/category.js";
import { API_REQUESTS } from "../assets/data.js";

/* Serves as the landing or home page 
   Make use of a Header component and then a Category component to serve as the 
   row of TV show panes retrievd from the API 
*/

const primaryMessage = "Welcome!";
const secondaryMessage = "Start exploring all of our shows.";
const tertiaryMessage = "If you see something you like,";
const quaternaryMessage = "add it to your Watchlist.";

export const Home = () => {
  return (
    <div>
      <Header
        primaryMsg={primaryMessage}
        secondaryMsg={secondaryMessage}
        tertiaryMsg={tertiaryMessage}
        quaternaryMsg={quaternaryMessage}
      />
      <Category
        rowID="1"
        title="Trending TV"
        fetchURL={API_REQUESTS.requestTrendingTV}
        filterUS = {true}
      />
      {/* <Category
        rowID="2"
        title="ScyFy TV"
        fetchURL={API_REQUESTS.requestSciFiTV}
        filterUS = {true}
      /> */}
      <Category
        rowID="3"
        title="Movies: Now Playing"
        fetchURL={API_REQUESTS.requestMoviesNowPlaying}
        filterUS = {false}
      />
      <Category
        rowID="4"
        title="Movies: Coming Soon"
        fetchURL={API_REQUESTS.requestMoviesComingSoon}
        filterUS={false}
      />
    </div>
  );
};
