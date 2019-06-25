require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
moment().format();

var command = process.argv[2];
var searchTerm = process.argv.slice(3);

function getSong() {

    if (process.argv.length >= 4 || process.argv[2] == "do-what-it-says") { 

        spotify.search({ type: "track", query: searchTerm, limit: 1}, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
        console.log(`\nArtist: ${data.tracks.items[0].artists[0].name}`);
        console.log(`\nSong: ${data.tracks.items[0].name}`);
        console.log(`\nLink to song: ${data.tracks.items[0].href}`);
        console.log(`\nAlbum: ${data.tracks.items[0].album.name}\n`);  
        });
    } else {

        spotify.search({ type: "track", query: "The Sign"}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        
        console.log(`\nYou forgot to enter a song name, so here's some info on ${data.tracks.items[5].name} by ${data.tracks.items[5].artists[0].name}:`);
        console.log(`\nArtist: ${data.tracks.items[5].artists[0].name}`);
        console.log(`\nSong: ${data.tracks.items[5].name}`);
        console.log(`\nLink to song: ${data.tracks.items[5].href}`);
        console.log(`\nAlbum: ${data.tracks.items[5].album.name}\n`); 
        });
    }
};

function getMovie() {

    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy"

    if (process.argv.length >= 4) { 

        axios.get(queryUrl).then(function(response) {
            console.log(`\nYou searched for ${response.data.Title}. Here are some facts about it:`);
            console.log(`\nReleased in: ${response.data.Year}`);
            console.log(`\nIMDB rating: ${response.data.Ratings[0].Value}`);
            console.log(`\nRotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
            console.log(`\nProduced in: \n ${response.data.Country.split(",").join("\n")}`);
            console.log(`\nAvailable in: \n ${response.data.Language.split(",").join("\n")}`);
            console.log(`\nPlot summary: ${response.data.Plot}`);
            console.log(`\nLead actors: \n ${response.data.Actors.split(",").join("\n")}\n`);
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
            console.log(`\nYou forgot to enter a movie title, so here's some info on ${response.data.Title}:`);
            console.log(`\nReleased in: ${response.data.Year}`);
            console.log(`\nIMDB rating: ${response.data.Ratings[0].Value}`);
            console.log(`\nRotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
            console.log(`\nProduced in: \n ${response.data.Country.split(",").join("\n")}`);
            console.log(`\nAvailable in: \n ${response.data.Language.split(",").join("\n")}`);
            console.log(`\nPlot summary: ${response.data.Plot}`);
            console.log(`\nLead actors: \n ${response.data.Actors.split(",").join("\n")}`);
        });
    };
};


function getConcert() {
    searchTerm = process.argv.slice(3).join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";

    if (process.argv.length >= 4) { 

        axios.get(queryUrl).then(function(response) {

            if (response.data.length == 0) {
                console.log("\nSorry, there are no upcoming shows for this artist.\n");

            } else {
                console.log(`\nYou searched for ${searchTerm}. Here are some upcoming shows:`);

                for (var i = 0; i < response.data.length; i++) {
                    var concertDate = response.data[i].datetime.split("T").slice(0,1);
                    var dateFormat = "YYYY-MM-DD";
                    var formattedDate = moment(concertDate, dateFormat);

                    console.log(`\nVenue: ${response.data[i].venue.name}`);
                    console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}`);
                    console.log(`Date: ${formattedDate.format("MM/DD/YYYY")}\n`);
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
        console.log("\nLooks like you forgot to enter an artist. Try again!\n");
    }
};

function readTxt() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
            
        var array = data.split(",");
        command = array[0];
        searchTerm = array[1].split('"').join("");

        getSong(searchTerm);

    });
};

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


