const fs = require('fs');
const process = require('process');
const request = require('request');

const keyword = process.argv[2];
const url = `https://icanhazdadjoke.com/search?term=${keyword}`;

function addJokeToFile(joke) {
  fs.appendFile('jokes.txt', `${joke}\n\n`, (err) => {
    if (err) throw err;
    console.log('...Joke added to jokes.txt');
  });
}

function getRandomJoke(json) {
  if (json && json.joke) {
    const { joke } = json;
    console.log(joke);
    addJokeToFile(joke);
  } else {
    console.log('No joke found');
  }
}

function requestJoke() {
  request({
    url,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200 && body.total_jokes === 0) {
      console.log('...No joke found');
    } else if (!error && response.statusCode === 200) {
      getRandomJoke(body.results[Math.floor(Math.random() * body.results.length)]);
    }
  });
}

requestJoke(url);
