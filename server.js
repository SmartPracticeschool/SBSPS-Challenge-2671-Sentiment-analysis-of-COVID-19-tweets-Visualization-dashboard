// Importing Libraries
const express = require("express");
const Datastore = require("nedb");
const { response } = require("express");
var Twit = require("twit");
var Sentiment = require("sentiment");

// Setting up variable
var sent = { happy: 0, neutral: 0, sad: 0 };

// making new Sentiment and Twit objects
var sentiment = new Sentiment();
var T = new Twit({
  consumer_key: "YOUR_CONSUMER_KEY",
  consumer_secret: "YOUR_CONSUMER_SECRET",
  access_token: "YOUR_ACCESS_TOKEN",
  access_token_secret: "YOUR_ACCESS_TOKEN_SECRET",
});

// Calling getTwitAnalysis
getTwitAnalysis();

setInterval(getTwitAnalysis, 1000 * 20);

// getTwitAnalysis: This function fetches the lastest 100 tweets which has query="covid" in english and then performs sentiment analyses and store the result in the sent variable
function getTwitAnalysis() {
  T.get("search/tweets", { q: "covid", count: 100, lang: "en" }, function (
    err,
    data,
    response
  ) {
    if (err) {
      console.log(err);
    } else {
      sent = { happy: 0, neutral: 0, sad: 0 };

      for (let i = 0; i < data.statuses.length; i++) {
        let senti = sentiment.analyze(data.statuses[i].text);

        if (senti.score > 0) {
          sent.happy += 1;
        } else if (senti.score < 0) {
          sent.sad += 1;
        } else if (senti.score == 0) {
          sent.neutral += 1;
        }
      }
      // console.log(sent);
    }
  });
}

// Storing express as a function in a variable app
const app = express();
// Setting up Listening port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
// Setting up static webpage
app.use(express.static("./public"));
// To be able to parse the data in json
app.use(express.json({ limit: "1mb" }));

// Creating and loading the database
const database = new Datastore("database.db");
database.loadDatabase();

// Saving the overall data into the database which we got from the sentiment analysis in the python scripts
// Needs to be done only once
// database.insert({ happy: 8579, neutral: 8409, sad: 3554 });

// Setting up route for the get request
app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.get("/twits", (request, response) => {
  response.json(sent);
});

// Setting up route the post request
app.post("/api", (request, response) => {
  // console.log(request.body);
  const data = request.body;
  database.insert(data);
  response.json(data);
});
