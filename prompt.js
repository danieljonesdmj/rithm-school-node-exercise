/* Bonus 1 - Use the prompt module to ask a user for some input
instead of having to pass in an argument from the command line. */

const fs = require('fs');
const request = require('request');
const prompt = require('prompt');

function addJokeToFile(joke) {
  fs.appendFile('jokes.txt', `${joke}\n`, (err) => {
    if (err) throw err;
    console.log('...Joke added to jokes.txt');
  });
}

function getRandomJoke(json) {
  const { joke } = json;
  console.log(joke);
  addJokeToFile(joke);
}

function requestJoke(url) {
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

function getURL(keyword) {
  const url = `https://icanhazdadjoke.com/search?term=${keyword}`;
  requestJoke(url);
}

function getUserInput() {
  prompt.start();
  prompt.get(['searchterm'], (err, result) => {
    const userInput = result.searchterm;
    if (userInput === '') {
      console.log('...Finding random joke');
      getURL(userInput);
    } else {
      getURL(userInput);
    }
  });
}

getUserInput();
