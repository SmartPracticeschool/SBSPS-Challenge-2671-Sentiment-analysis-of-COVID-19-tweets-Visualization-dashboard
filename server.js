// Importing Libraries
const express = require("express");
const Datastore = require("nedb");
const { response } = require("express");

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

// Saving the overall data into the database
// Needs to be done only once
// database.insert({ happy: 6105, neutral: 7393, sad: 2782 });

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

// Setting up route the post request
app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  database.insert(data);
  response.json(data);
});
