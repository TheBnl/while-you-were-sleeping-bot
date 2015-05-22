var TwitterBot = require("node-twitterbot").TwitterBot;
var request = require('request');

/**
 *  Set up the twitter bot with oAuth details
 *  The details are stored in local environment variables (.env file)
 */
var Bot = new TwitterBot({
  "consumer_secret": process.env.CONSUMER_SECRET,
  "consumer_key": process.env.CONSUMER_KEY,
  "access_token": process.env.ACCESS_TOKEN,
  "access_token_secret": process.env.ACCESS_TOKEN_SECRET
});


/**
 *  Register the tweet action
 *  Tweet a stripped down sentence from quotbook.com
 *  @author Bram de Leeuw
 */
Bot.addAction("postNewSentence", function(twitter, action, tweet) {
  var wyws = "#WhileYouWereSleeping";
  var randomAction = getRandomAction();
  var baseApi = "http://quotbook.com/widget/~";
  var query = randomAction.replace(/\s+/g, '-');
  var type = ".json";
  var uri = baseApi + query + type;  
  var sentence;

  request( uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {    
      var jsonResponse = JSON.parse(body);
      var quote = stripQuote(jsonResponse.quote, randomAction);
      sentence = wyws +" "+ quote +".";

      console.log('LENGTH', sentence.length);
      console.log('SENTENCE', sentence);

      if (sentence.length < 140 && rollDice(8)) {
        console.log('TWEETING', sentence);
        Bot.tweet(sentence);
      }
    }
  });
});


/**
 *  Utility function to roll a dice between 0 and a given number
 *  if the rolled number is 1 it returns true.
 *  @author Bram de Leeuw
 *
 *  @param  Int max
 *  @return Bool
 */
function rollDice(max) {
  var random = Math.floor(Math.random() * max);
  return random == 1 ? true : false;
}


/**
 *  Utility function to retrieve a random item from an Array
 *  @author Bram de Leeuw
 *
 *  @param  Array options
 *  @return String option
 */
function getRandom(options) {
  var random = Math.floor(Math.random() * options.length);
  return options[random];
}


/**
 *  Get a random action from an array of options
 *  @author Bram de Leeuw
 *
 *  @return getRandom(actions) option
 */
function getRandomAction() {
  var actions = [
    "I was",
    "I put",
    "I dreamt",
    "I grew",
    "we were",
    "we made"
  ];
  return getRandom(actions);
}


/**
 *  Strip a string until a action is found
 *  for example "I dreamt" and split the string
 *  at it's punctuation.
 *  @author Bram de Leeuw
 *
 *  @param  String quote
 *  @param  String action
 *  @return String first part of stripped quote
 */
function stripQuote(quote, action) {
  var fullQuote = quote.toLowerCase();
  var strippedQuote = fullQuote.slice( fullQuote.indexOf(action.toLowerCase()) );
  var splitQuote = strippedQuote.split(/\.|\,/);

  return splitQuote[0];
}


/**
 *  OBSOLETE
 *
 *  Sententce Generator
 *  @author Bram de Leeuw
 *
 *  @return Generated sentence
 */
function createNewSentence() {
  var wyws = "#WhileYouWereSleeping";
  var action = getRandomAction();
  // var partTwo = getRandomEnding(action);
  // var quote = getRandomQuote(action);
  var baseApi = "http://quotbook.com/widget/~";
  var query = action.replace(/\s+/g, '-');
  var type = ".json";
  var uri = baseApi + query + type;
  
  var sentence;

  request( uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {    
      var jsonResponse = JSON.parse(body);
      var quote = stripQuote(jsonResponse.quote, action);
      sentence = wyws +" "+ quote +".";
    }
  });

  console.log("LOGGING"+ sentence);
  return sentence;
}


/**
 *  OBSOLETE
 *
 *  Get a random ending from an array of options
 *  switch options based on the present action
 *  @author Bram de Leeuw
 *  @return getRandom(actions) option
 */
function getRandomEnding(action) {
  var options;
  switch (action) {
    case "I":
      options = [
        "ending", 
        "visualized probable futures"
      ];
      break;

    case "I was":
      options = [
        "looking at a screen", 
        "looking at a silk screen", 
        "writing on the wall"
      ];
      break;

    case "I put":
      options = [
        "the sea in research"
      ];
      break;

    case "I dreamt":
      options = [
        "of electric sheep", 
        "of a better future"
      ];
      break;

    case "I grew":
      options = [
        "up in public"
      ];
      break;

    case "we made":
      options = [
        "love between paper sheets"
      ];
      break;

    default:
    case "we were":
      options = [
        "hacking the future",
        "dreaming on",
        "restless"
      ];
      break;
  }

  return getRandom(options);
}


/**
 *  OBSOLETE
 *
 *  Get a random quote from quotbook.com based on
 *  the given random action.
 *  @author Bram de Leeuw
 *  @param String action
 *
 *  @return String random quote
 */
function getRandomQuote(action) {
  var baseApi = "http://quotbook.com/widget/~";
  var query = action.replace(/\s+/g, '-');
  var type = ".json";
  var uri = baseApi + query + type;
  var quote;
  request( uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {    
      var jsonResponse = JSON.parse(body);
      quote = stripQuote(jsonResponse.quote, action);
      console.log('LOGGING',quote);
      return quote;
    }
  });
}


/**
 *  Run the action
 */
Bot.now("postNewSentence");