// Storing Spotify keys in a hidden file
require("dotenv").config();

// The keys file exports and object that refers to my hidden Spotify keys in the .env file
var keys = require("./keys.js");

// Implementing various modules and NPMs
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
moment().format();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Stored user inputs as variables
var command = process.argv[2];
var searchTerm = process.argv.slice(3);
var renderInfo;

// This function searches the Spotify API for a song by name and renders information to the terminal, unless the user inputs no song title - then it will render to the terminal information about "The Sign" by Ace of Base.
function getSong() {

    if (process.argv.length >= 4 || process.argv[2] == "do-what-it-says") { 

        spotify.search({ type: "track", query: searchTerm, limit: 1}, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

        renderInfo = `\nArtist: ${data.tracks.items[0].artists[0].name}\nSong: ${data.tracks.items[0].name}\nLink to song: ${data.tracks.items[0].href}\nAlbum: ${data.tracks.items[0].album.name}\n\n------------------------\n`;
        
        console.log(renderInfo);
        
        writeFile();

        });
    } else {

        spotify.search({ type: "track", query: "The Sign"}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        
        renderInfo = `\nYou forgot to enter a song name, so here's some info on ${data.tracks.items[5].name} by ${data.tracks.items[5].artists[0].name}:\nArtist: ${data.tracks.items[5].artists[0].name}\nSong: ${data.tracks.items[5].name}\nLink to song: ${data.tracks.items[5].href}\nAlbum: ${data.tracks.items[5].album.name}\n\n------------------------\n`;
        
        console.log(renderInfo);

        writeFile();
      
        });
    }
};

// This function searches the OMDB API for a movie by name and renders information to the terminal, unless the user inputs no movie title - then it will render to the terminal information about "Mr. Nobody".
function getMovie() {

    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy"

    if (process.argv.length >= 4 || process.argv[2] == "do-what-it-says") { 

        axios.get(queryUrl).then(function(response) {

            renderInfo = `\nYou searched for ${response.data.Title}. Here are some facts about it:\n\nReleased in: ${response.data.Year}\n\nIMDB rating: ${response.data.Ratings[0].Value}\n\nRotten Tomatoes rating: ${response.data.Ratings[1].Value}\n\nProduced in: \n ${response.data.Country.split(",").join("\n")}\n\nAvailable in: \n ${response.data.Language.split(",").join("\n")}\n\nPlot summary: ${response.data.Plot}\n\nLead actors: \n ${response.data.Actors.split(",").join("\n")}\n\n------------------------\n`;

            console.log(renderInfo);

            writeFile();

        }).catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });

    } else {
        var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(function(response) {

            renderInfo = `\nYou forgot to enter a movie title, so here's some info on ${response.data.Title}:\n\nReleased in: ${response.data.Year}\n\nIMDB rating: ${response.data.Ratings[0].Value}\n\nRotten Tomatoes rating: ${response.data.Ratings[1].Value}\n\nProduced in: \n ${response.data.Country.split(",").join("\n")}\n\nAvailable in: \n ${response.data.Language.split(",").join("\n")}\n\nPlot summary: ${response.data.Plot}\n\nLead actors: \n ${response.data.Actors.split(",").join("\n")}\n\n------------------------\n`;

            console.log(renderInfo);

            writeFile();

        });
    };
};

// This function searches the Bands in Town API for an artist by name and renders information to the terminal about upcoming concerts, unless the user inputs no artist - then it will ask the user to enter an artist.
function getConcert() {
    searchTerm = process.argv.slice(3).join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";

    if (process.argv.length >= 4 || process.argv[2] == "do-what-it-says") { 

        axios.get(queryUrl).then(function(response) {

            if (response.data.length == 0) {

                renderInfo = `\nSorry, there are no upcoming shows for ${searchTerm}.`;

                console.log(renderInfo);

                writeFile();

            } else {

                for (var i = 0; i < response.data.length; i++) {
                    var concertDate = response.data[i].datetime.split("T").slice(0,1);
                    var dateFormat = "YYYY-MM-DD";
                    var formattedDate = moment(concertDate, dateFormat);

                    renderInfo = `\nUpcoming show for ${searchTerm.split("+").join(" ")}:\nVenue: ${response.data[i].venue.name} | Location: ${response.data[i].venue.city}, ${response.data[i].venue.region} | Date: ${formattedDate.format("MM/DD/YYYY")}\n\n------------------------\n`;

                    console.log(renderInfo);

                    writeFile();

                };
            };
        }).catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
    } else {

        renderInfo = `\nLooks like you forgot to enter an artist. Try again!\n\n------------------------\n`;

        console.log(renderInfo);

        writeFile();
    }
};

// This function reads the random.txt file, turns the text therein into an array, grabs the array members to create a command and serach term, then uses those to call the appropriate function 
function readTxt() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
            
        var array = data.split(",");
        command = array[0];
        searchTerm = array[1].split('"').join("");

        switch(command) {
            case "movie-this": 
                return getMovie(searchTerm);
            case "concert-this": 
                return getConcert(searchTerm);
            case "spotify-this-song": 
                return getSong(searchTerm);
            default:
                console.log("Choose a valid action.");
                return false;
        };

    });
};

// This function writes the results from any search to a file called log.txt 
function writeFile() {
    fs.appendFile("log.txt", renderInfo, function(err) {

        // If an error was experienced we will log it.
        if (err) {
        return console.log(err);
        }
    
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        console.log(`\nContent added to log.txt file!\n`);
    
    });
};

// This switchcase takes the command variable and creates cases in which it will run certain functions passing in the user's search term input. If the user's command is not stated as a case here, the user will be directed to write a valid command.
switch(command) {
    case "movie-this": 
        return getMovie(searchTerm);
    case "concert-this": 
        return getConcert(searchTerm);
    case "spotify-this-song": 
        return getSong(searchTerm);
    case "do-what-it-says": 
        return readTxt(searchTerm);
    default:
        console.log("Choose a valid action.");
        return false;
};


