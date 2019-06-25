// require("dotenv").config();
//   var keys = require("./keys.js");
//   var spotify = new Spotify(keys.spotify);

var axios = require("axios");


var command = process.argv[2];
var searchName = process.argv.slice(3).join(" ");

function getSong() {
    var song = process.argv.slice(3).join(" ");
    var queryUrl = " ";
};

function getMovie() {
    var movieTitle = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy"

    axios.get(queryUrl).then(function(response) {
        console.log(`\nYou searched for ${response.data.Title}. Here are some facts about it:`);
        console.log(`Released in: ${response.data.Year}`);
        console.log(`IMDB rating: ${response.data.Ratings[0].Value}`);
        console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
        console.log(`Produced in: ${response.data.Country.split(",").join("\n")}`);
        console.log(`Available in: ${response.data.Language.split(",").join("\n")}`);
        console.log(`Plot summary: ${response.data.Plot}`);
        console.log(`Lead actors: \n ${response.data.Actors.split(",").join("\n")}`);
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
  // needs to show info for Mr Nobody if the person doesn't search any movie title
};

function getConcert() {
    var artist = process.argv.slice(3).join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(function(response) {
        console.log(`\nYou searched for ${process.argv.slice(3).join(" ")}. Here are some upcoming shows:`);
        for (var i = 0; i <response.data.length; i++) {
            console.log(`\nVenue: ${response.data[i].venue.name}`);
            console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}`);
            console.log(`Date: ${response.data[i].datetime}\n`); //change to MM/DD/YYYY format
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
};

function getTxt() {
    console.log("text");
    // fs.readFile("random.txt", "utf8", function(error, data) {

    //     // If the code experiences any errors it will log the error to the console.
    //     if (error) {
    //       return console.log(error);
    //     }
      
    //     // We will then print the contents of data
    //     console.log(data);
      
    //     // Then split it by commas (to make it more readable)
    //     var movies = data.split(",");
      
    //     // We will then re-display the content as an array for later use.
    //     // console.log(movies);
      
    //     movies.forEach(function(movie) {
    //       console.log(`${movie} is a great movie!`)
    //     });
      
    //   });
};

switch(command) {
    case "movie-this": 
        return getMovie(searchName);
    case "concert-this": 
        return getConcert(searchName);
    case "spotify-this-song": 
        return getSong(searchName);
    case "do-what-it-says": 
        return getTxt();
    default:
        console.log("Choose a valid action.");
        return false;
}


