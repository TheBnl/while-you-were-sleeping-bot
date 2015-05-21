var TwitterBot = require("node-twitterbot").TwitterBot;

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
 */
Bot.addAction("postNewSentence", function(twitter, action, tweet) {
  var sentence = createNewSentence();
  console.log('Sending tweet with contents:', sentence);
  //Bot.tweet(sentence);
});


/**
 *  Sententce Generator
 *  @author Bram de Leeuw
 *  @return Generated sentence
 */
function createNewSentence() {
  var wyws = "#WhileYouWereSleeping";
  var action = getRandomAction();
  var partTwo = getRandomEnding(action);
  var sentence = wyws +" "+ action +" "+ partTwo +".";
  return sentence;
}


/**
 *  Utility function to retrieve a random item from an Array
 *  @author Bram de Leeuw
 *  @return option
 */
function getRandom(options) {
  var random = Math.floor(Math.random() * options.length);
  return options[random];
}


/**
 *  Get a random action from an array of options
 *  @author Bram de Leeuw
 *  @return getRandom(actions) option
 */
function getRandomAction() {
  var actions = [
    "I",
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
 *  Run the action
 */
Bot.now("postNewSentence");