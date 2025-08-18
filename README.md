Harvard Extension DGMD E-28 Developing Single-Page Web Applications Final Project

URL:https://main--dgmde28trinidad.netlify.app/

For the final project, I elected to create clone of the TMDB site (https://www.themoviedb.org/).  TMDB has an API (https://developer.themoviedb.org/reference/configuration-details) with information about thousands of movies and TV shows.  To simplify the project and complete it within the timeframe alotted, I focused on a SPA that delivered information about TV shows.

The app is structured as:
    1. Conssitent navigation
    2. Home page that renders a varitey of TV shows by category.  I limited the categories to 6 but this is easily expandable.  The home page is styled similar to a Netflix like reel.  However, I am using a scroll bar at the bottom of each reel to move across the images.  The TMDB API returns 20 shows per category.
    3. Watchlist page that illustrates shows and minor details that the user has selected
    4. Search page that allows the user to look for a specific show - a list of any shows with the search criteria will then get rendered on the page
    5. Details page that comes up when a user clicks on an image of a TV show.  The page provides more detailed information including cast and recommendations
    6. Login page that is under construction for a future deployment

The app utilizes several React Hooks including useState, useEffect, and useParam.  

From a development perspective, the most satisfying part of the project was learning about the TMDB API.  I found it to be well structured and documented.  The site also provides a version of Postman that allowed me to understand what data elements were contained within the object returned and how they were organized.  This helped me understand APIs to a greater degree and using them in the various components and pages.

If I had 2 more weeks to work on the project, I would include links / capabilities for also searching movies.  While I used components for modularity, the URL for TV versus Movie fetch requests was different.  I first went down the path of including movies as a separate navigation but that got really complicated without duplicating many of the components to limit to only a movie.  Other than the URL, I could not find anything in the returned TMBD data to indicate that the object contained movie or TV data.  With more time, I may be able to figure this out.  The other thing would be to build out is local storage for the login.  Unfortunately, a user's watchlist is deleted when the application is reloaded.  The watchlist is stored locally to the instance so it gets reset to empty when the application is re-started.  Finally, I would add a Delete from Watchlist button.  I didn't have enough time to include these options.

The most useful thing I learned in this class was React.  I really enjoyed the deeper learning on JavaScript, but React was extremely intersting and made creating elements a bit more intuitive.



