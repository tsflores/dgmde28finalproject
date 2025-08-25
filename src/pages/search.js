import { Header } from '../components/pageHeader.js';
import { SingleList } from '../components/singleList.js';
import { useState, useEffect } from 'react';
import { API_KEY } from '../assets/data.js';
import axios from 'axios';


// function SearchList (props) {

//     const [shows, setSearchTV] = useState([]);

//     const getTVBaseURL = "https://api.themoviedb.org/3/search/tv"
//     const getTVMidURL = `?api_key=${API_KEY}&query=`
//     var searchString = props.queryStr;
//     const getTVEndURL = `&language=en-US&page=1`;

//     const getSearchURL = getTVBaseURL+getTVMidURL + searchString + getTVEndURL;

//     console.log(getSearchURL);

//     useEffect(() => {
//         axios
//             .get(getSearchURL)
//             .then(res => {
//                 setSearchTV(res.data)
//             })
//             .catch(error => console.log(error))
//     },[getSearchURL])

// 	return (
//         <section>
//             <div>
// 				{(shows?.results?.length===0 && searchString !== "") ? <h1 className = "search-list">No results returned.  Please try again</h1> : <h1 className ="hiddenText">Your List</h1>}
//                 <ul>
//                     {shows?.results?.map((show, id) => (<SingleList key={id} tvID = {show?.id}></SingleList>))}
//                 </ul>
//             </div>
//         </section>
//     )
// }

function SearchList(props) {
    const [results, setResults] = useState([]);
    
    // Dynamic URL construction based on search type
    const getBaseURL = props.searchType === 'tv' 
        ? "https://api.themoviedb.org/3/search/tv"
        : "https://api.themoviedb.org/3/search/movie";
    
    const getMidURL = `?api_key=${API_KEY}&query=`;
    const searchString = props.queryStr;
    const getEndURL = `&language=en-US&page=1`;
    
    const getSearchURL = getBaseURL + getMidURL + encodeURIComponent(searchString) + getEndURL;

    useEffect(() => {
        if (searchString && searchString.trim() !== "") {
            axios
                .get(getSearchURL)
                .then(res => {
                    setResults(res.data);
                })
                .catch(error => console.log(error));
        } else {
            setResults([]);
        }
    }, [getSearchURL, searchString]);

    if (!searchString || searchString.trim() === "") {
        return null;
    }

    // Generate message similar to TVWatchList
    let msg = "";
    const resultCount = results?.results?.length || 0;

    if (resultCount === 0) {
        msg = "No results found. Try adjusting your search terms or switching between TV shows and movies.";
    } else if (resultCount === 1) {
        msg = `Found 1 ${props.searchType === 'tv' ? 'TV Show' : 'Movie'}`;
    } else {
        msg = `Found ${resultCount} ${props.searchType === 'tv' ? 'TV Shows' : 'Movies'}`;
    }

    return (
        <div className="search-results-container">
            <h1 className="search-results-header">Search Results</h1>
            <h2 className="search-results-message">{msg}</h2>
            {resultCount > 0 && (
                <div className="search-results-list">
                    {results.results.map((item, index) => (
                        <SingleList 
                            key={index} 
                            tvID={item?.id} 
                            mediaFormat={props.searchType}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}


//form component that is overlayed to the header to allow for search
function Form() {
    const [queryStr, setQueryStr] = useState("");
    const [searchType, setSearchType] = useState("tv");
    const [hasSearched, setHasSearched] = useState(false);

    function handleSearch(e) {
        e.preventDefault();
        if (queryStr.trim()) {
            setHasSearched(true);
        }
    }

    function handleInputChange(e) {
        setQueryStr(e.target.value);
        if (e.target.value.trim() === "") {
            setHasSearched(false);
        }
    }

    return (
        <div className="search-form-wrapper">
            <div className="search-form-container">
                <form onSubmit={handleSearch} className="professional-search-form">
                    <div className="search-input-group">
                        <div className="search-type-selector">
                            <label className="search-type-label">Search for:</label>
                            <div className="radio-group">
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="searchType"
                                        value="tv"
                                        checked={searchType === "tv"}
                                        onChange={(e) => setSearchType(e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    TV Shows
                                </label>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="searchType"
                                        value="movie"
                                        checked={searchType === "movie"}
                                        onChange={(e) => setSearchType(e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    Movies
                                </label>
                            </div>
                        </div>
                        
                        <div className="search-input-container">
                            <input
                                type="text"
                                name="search"
                                className="search-input"
                                onChange={handleInputChange}
                                placeholder={`Enter ${searchType === 'tv' ? 'TV show' : 'movie'} title...`}
                                value={queryStr}
                            />
                            <button type="submit" className="search-button">
                                <span className="search-icon">🔍</span>
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {hasSearched && (
                <SearchList queryStr={queryStr} searchType={searchType} />
            )}
        </div>
    );
}

export const Search = () => {

    const primaryMessage = "Discover Entertainment";
    const secondaryMessage = "Search through thousands of TV shows and movies";
    const tertiaryMessage = "Find your next favorite watch";
    const quaternaryMessage = "";

	return (
		<div>
			<Header primaryMsg = {primaryMessage} secondaryMsg = {secondaryMessage} tertiaryMsg={tertiaryMessage} quaternaryMsg = {quaternaryMessage}/>
            <Form />
		</div>
	)
}