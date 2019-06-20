# liri-node-app
Deployed version: https://cee-money.github.io/liri-node-app/

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. LIRI searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.


-If the user enters " node liri.js concert-this '<artist/band name here>' " into the command line, LIRI searches the Bands in Town Artist Events API for the artist and renders the following information about each event to the terminal:
    *Name of the venue
    *Venue location
    *Date of the Event (use moment to format this as "MM/DD/YYYY")


-If the user enters "node liri.js spotify-this-song '<song name here>' " into the command line, LIRI searches the Spotify API for song and renders the following information to the terminal:
    *Artist(s)
    *The song's name
    *A preview link of the song from Spotify
    *The album that the song is from
*If no song is provided then LIRI will default to "The Sign" by Ace of Base.


-If the user enters " node liri.js movie-this '<movie name here>' " into the command line, LIRI searches the OMDB API and renders the following information to the terminal
    *Title of the movie
    *Year the movie came out
    *IMDB Rating of the movie
    *Rotten Tomatoes Rating of the movie
    *Country where the movie was produced
    *Language of the movie
    *Plot of the movie
    *Actors in the movie
*If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


-If the user enters " node liri.js do-what-it-says " into the command line, LIRI takes the text inside of random.txt and then uses it to call one of LIRI's commands.







