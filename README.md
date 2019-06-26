# liri-node-app
Deployed version (please note that this app is meant to be run in the user's Terminal and not in the user's browser): 
https://drive.google.com/file/d/1JK6WYZof8v7Qd_P307-1BUYxsQKpPUzr/view?usp=sharing

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


-If the user enters " node liri.js movie-this '<movie name here>' " into the command line, LIRI searches the OMDB API and renders the following information to the terminal:
   
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

Role in development: I created this app in it's entirety for a coding boot camp assignment

Overview of how the app is organized:
*Global variables are declared that: 

    *Store API keys in a hidden file and allow those to be accessed by LIRI

    *Implement various NPMs and the file system module

    *Store user inputs

*Functions are defined:

    *One searches the Spotify API for a song by name and renders information to the terminal, unless the user inputs no song title - then it will render to the terminal information about "The Sign" by Ace of Base.
    
    *Another searches the OMDB API for a movie by name and renders information to the terminal, unless the user inputs no movie title - then it will render to the terminal information about "Mr. Nobody".
    
    *Another searches the Bands in Town API for an artist by name and renders information to the terminal about upcoming concerts, unless the user inputs no artist - then it will ask the user to enter an artist.
    
    *Another reads the random.txt file, turns the text therein into an array, grabs the array members to create a command and serach term, then uses those (with the help of a switchcase) to call the appropriate function 
   
    *Another writes the results from any search to a file called log.txt 

*A switchcase is defined to take the user's command input to run the appropriate function on the user's search term input. If the user's command is not stated as a case, the user will be directed to write a valid command.

New technologies used:

*NPMs
    
    *Spotify
    
    *OMDB
    
    *Bands in Town
    
    *Moment

*Hidden keys

*File system module (read file and append file)

*Template literals

* .slice() method
