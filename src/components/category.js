import axios from 'axios';
import { useEffect, useState } from 'react';
import { Show } from '../components/show.js';


export const Category = (props) => {
    const [shows, setShows] = useState([]);

    // Source for using Axios in a fetch operation against the TMDB API https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/

    useEffect(() => {
        axios
            .get(props.fetchURL)
            .then(res => (
                setShows(res.data.results)
            ))
            .catch(error => console.log(error))
    }, [props.fetchURL])

    /*Create the panel of images that make up the category displayed; 
      Insert an id for each for future styling if necessary - perhaps when a movie
      version is added as an enhancement.  Use the Show component to display the pane
      of images. */

    return (
        <section>
            <h2>{props.title}</h2>
            <div>
                <ul className="image-container" id={props.rowId}>
                    {shows.map((show, id) => (<Show key={id} show ={show}></Show>))}
                </ul>
            </div>
        </section>
    )
}