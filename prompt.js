// Bonus 1 - Use the prompt module to ask a user for some input instead of having to pass in an argument from the command line.


const fs = require('fs');
const request = require('request');
const prompt = require('prompt');

function getUserInput() {
  prompt.start();
  prompt.get(['searchterm'], (err, result) => {
  let user_input = result.searchterm;
  getURL(user_input);
});
};

function getURL(keyword) {
  let url = 'https://icanhazdadjoke.com/search?term=' + keyword;
  requestJoke(url);
};

function requestJoke(url) {
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
  fs.appendFile('jokes.txt', `${joke}\n`, (err) => {
    if (err) throw err;
    console.log('...Joke added to jokes.txt');
  });
};

getUserInput();
    