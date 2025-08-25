import { tvWatchList } from "../assets/data.js";
import { SingleList } from "../components/singleList.js";

export const TVWatchList = () => {
  /*dynamic watchlist based on user adding to their list
	  in the event that no items are in the list, post an alert on the page*/

  var msg = "";
  var msgFlag = true;
  var listCount = 0;

  if (tvWatchList.length === 0) {
    msg = "Your Watchlist is empty";
    msgFlag = false;
  } else if (tvWatchList.length === 1) {
    msg = "You're off to a good start.  Keeping adding to your Watchlist";
    msgFlag = false;
    listCount = 1;
  } else {
    listCount = tvWatchList.length;
  }

  return (
    //if no items in the list, post a message; if only one item, call SingleList
    //component; otherwise, cycle through the array that contains the TV id's and
    //call SingleList for each

    <div className="watchlist-container">
      <h1 className="watchlist-header">My Watchlist</h1>
      {!msgFlag ? <h2>{msg}</h2> : <h2>{msg}</h2>}
      {listCount === 1 ? (
        <SingleList
          tvID={tvWatchList[0].id}
          mediaFormat={tvWatchList[0].mediaType}
        ></SingleList>
      ) : (
        tvWatchList.map((show, index) => (
          <SingleList
            key={index}
            tvID={show.id}
            mediaFormat={show.mediaType}
          ></SingleList>
        ))
      )}
    </div>
  );
};
