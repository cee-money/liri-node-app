// require("dotenv").config();
//   var keys = require("./keys.js");
//   var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchName = process.argv[3];
var result;

function getSong() {
    console.log("song");
};

function getMovie() {
    console.log("movie");
};

function getConcert() {
    console.log("concert");
};

function getTxt() {
    console.log("text");
};

switch(command) {
    case "movie-this": 
        result = searchName;
        break;
    case "concert-this": 
        result = searchName;
        break;
    case "spotify-this-song": 
        result = searchName;
        break;
    case "do-what-it-says": 
        result = searchName;
        break;
}
console.log(result);

