const fs = require('fs');
const process = require('process');
const request = require('request');

let keyword = process.argv[2];
let url = 'https://icanhazdadjoke.com/search?term=' + keyword;

function requestJoke() {
  request({
    url: url,
    json: true }, (error, response, body) => {
      if (!error && response.statusCode == 200 && body.total_jokes === 0) {
        console.log('...No joke found');
      } else if  (!error && response.statusCode == 200) {
        getRandomJoke(body.results[Math.floor(Math.random()*body.results.length)]);
      };
  });
};
  
function getRandomJoke(json) {
  let joke = json.joke;
  console.log(joke);
  addJokeToFile(joke);
};

function addJokeToFile(joke) {
  fs.appendFile('jokes.txt', `${joke}\n\n`, (err) => {
    if (err) throw err;
    console.log('...Joke added to jokes.txt');
  });
};

requestJoke(url);
    