import { Header } from '../components/pageHeader.js';
import { SingleList } from '../components/singleList.js';
import { useState, useEffect } from 'react';
import { API_KEY } from '../assets/data.js';
import axios from 'axios';


function SearchList (props) {

    const [shows, setSearchTV] = useState([]);
	
    //TMDB API allows for search query - gather that from the user based on what is entered into the search bar

    const getTVBaseURL = "https://api.themoviedb.org/3/search/tv"
    const getTVMidURL = `?api_key=${API_KEY}&query=`
    var searchString = props.queryStr;
    const getTVEndURL = `&language=en-US&page=1`;

    const getSearchURL = getTVBaseURL+getTVMidURL + searchString + getTVEndURL;

    console.log(getSearchURL);

    useEffect(() => {
        axios
            .get(getSearchURL)
            .then(res => {
                setSearchTV(res.data)
            })
            .catch(error => console.log(error))
    },[getSearchURL])

	// make use of the SingleList component to replicate the search results similar to the Watchlist
    // search results are returned within a results array from the API 
	return (
        <section>
            <div>
				{(shows?.results?.length===0 && searchString !== "") ? <h1 className = "search-list">No results returned.  Please try again</h1> : <h1 className ="hiddenText">Your List</h1>}
                <ul>
                    {shows?.results?.map((show, id) => (<SingleList key={id} tvID = {show?.id}></SingleList>))}
                </ul>
            </div>
        </section>
    )
}

//form component that is overlayed to the header to allow for search
function Form() {
    const [queryStr, setQueryStr] = useState("");
	const [clicked, setClicked] = useState(false);

	const initialMsg = "Search for a show..."  //initial message in the search bar

    function TVsearch(e) {
		e.preventDefault();
        setClicked(true);
    }

    console.log(clicked);
    console.log(queryStr);

    return(
        <div>
        <form className = "overlay-text" id ="overlay-text-form">
				<input type = "text" name ="Search" onChange={(e) => {setQueryStr(e.target.value); setClicked(false);}} placeholder ={initialMsg} value={queryStr}></input>
				<button id="overlay-button" onClick={(e) => TVsearch(e)}>Search</button>
			</form>
			{(clicked) ? <SearchList queryStr = {queryStr}></SearchList> : <SearchList queryStr = {""}></SearchList>}
            </div>
    )
}

export const Search = () => {

    const primaryMessage = "Welcome!";
    const secondaryMessage = "Start exploring all of our shows.";
    const tertiaryMessage = "Enter a TV show title in the search bar.";
    const quaternaryMessage ="";

	return (
		<div>
			<Header primaryMsg = {primaryMessage} secondaryMsg = {secondaryMessage} tertiaryMsg={tertiaryMessage} quaternaryMsg = {quaternaryMessage}/>
            <Form />
		</div>
	)
}