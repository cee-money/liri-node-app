require("dotenv").config();
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
moment().format();

var command = process.argv[2];

function getSong() {
    var track = process.argv.slice(3).join(" ");
    console.log(track);
    
    spotify.search({ type: "track", query: track, limit: 5})
    .then(function(response) {
        console.log(response);
    }).catch(function(err) {
        console.log(err);
    });
};

function getMovie() {
    var movieTitle = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy"

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
    var artist = process.argv.slice(3).join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    if (process.argv.length >= 4) { 

        axios.get(queryUrl).then(function(response) {

            if (response.data.length == 0) {
                console.log("\nSorry, there are no upcoming shows for this artist.\n");

            } else {
                console.log(`\nYou searched for ${process.argv.slice(3).join(" ")}. Here are some upcoming shows:`);

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
        var command = array[0];
        var track = array[1];
    
        console.log(`\n ${command}`);
        console.log(`\n${track}\n`);
      
        getSong(track);
      
      });
};

switch(command) {
    case "movie-this": 
        return getMovie();
    case "concert-this": 
        return getConcert();
    case "spotify-this-song": 
        return getSong();
    case "do-what-it-says": 
        return readTxt();
    default:
        console.log("Choose a valid action.");
        return false;
};


