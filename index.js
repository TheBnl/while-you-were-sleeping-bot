var TwitterBot = require("node-twitterbot").TwitterBot;

/**
 *  Set up the twitter bot with oAuth details
 *  The details are stores in local environment variables (.env file)
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
  Bot.tweet(sentence);
});


/**
 *  Sententce Generator
 *  @author Bram de Leeuw
 *  @return Generated sentence
 */
function createNewSentence() {
  var sentence = "#WhileYouWereSleeping we were creating a twitter bot";
  return sentence;
}


/**
 *  Run the action
 */
Bot.now("postNewSentence");