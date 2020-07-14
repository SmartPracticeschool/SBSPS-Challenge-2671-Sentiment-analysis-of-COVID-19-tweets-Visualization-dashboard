# UI Code Explaination

For the UI we made a webapp which uses Node.js in backend and uses HTML5, CSS3 & Vanilla Javascript in frontend.

## 1. HTML UI

The first step in the frontend UI/UX development is creating a base HTML markup for the web app. This markup will contain the base design of the UI without any styling or animations. It will help in creating the structure of the web page(s). 

Creating a structured markup with proper naming of IDs and classes of different element tags will ensure easy access to these tags while styling them using CSS.

HTML5 was used to create all the HTML files. It was necessary to provide CDN link tags to all the services that we used like FontAwesome, Apexchart.js, etc.

## 2. PARSING THE DATA

The data was available in two formats CSV and JSON. The data which was analyzed through our sentiment analysis model was stored in CSV file and the data which we obtained through the APIs we used through out the app give their response in JSON format.

#### A: CSV Data:

The first step is to fetch the data from the github link where we stored our CSV file using ```fetch``` method. After fetching we store the text response in a variable.

After fetching the data we split the text data at the line ends ("\n") into a ```table``` array.

Then we took each element of this ```table``` array and split the element into a ```column``` array using the delimiter ```(" , ")```

Then we pushed this parsed data into our declared global variables to use them in to render charts.

```
// getData5 Function: This function is used to fetch the csv data for the visualisation and stored in the above variables
async function getData5() {
  // Fetching response
  const response = await fetch(
    "https://raw.githubusercontent.com/SmartPracticeschool/SBSPS-Challenge-2671-Sentiment-analysis-of-COVID-19-tweets-Visualization-dashboard/master/public/data/VData.csv"
  );
  const data = await response.text();

  // Parsing the tabular data into arrays
  const table = data.split("\n").slice(1);
  for (let i = 0; i < 7; i++) {
    const columns = table[i].split(",");
    const date = columns[1];
    dates.push(date);
    const dwpos = columns[2];
    dwposz.push(dwpos);
    const dwneu = columns[3];
    dwneuz.push(dwneu);
    const dwneg = columns[4];
    dwnegz.push(dwneg);
    const avg = Number(columns[5]).toFixed(3);
    avgsent.push(avg);
  }
}
```

#### B: API - JSON Data:

The first step is the same as above to fetch the data from API endpoint using ```fetch``` method. After fetching we store the json response in a variable.

Then we loop through the length of the series and push all the data that we need into global variables to use in the app.

```
// Making a function to fetch data from the API
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  for (let i = 0; i < data.cases_time_series.length; i++) {
    totalconfirmed.push(data.cases_time_series[i].totalconfirmed);
    totaldeceased.push(data.cases_time_series[i].totaldeceased);
    totalrecovered.push(data.cases_time_series[i].totalrecovered);
    date.push(data.cases_time_series[i].date);
  }
```


## 3. Visualization of the Data

For visualization, we used a javascript charting library ApexChart.js.

The first step in this was to explore their documentation. All the relevant information on how to render the charts, how to change or add elements in the chart, etc.

Then we used the the data that we parse in the above section to render charts using the information in documentation.

But basic things which all the charts share are:

```window.Apex``` is used to set common properties to all the charts on the page.

```
// Setting up some common properties for all Charts
window.Apex = {
  chart: {
    foreColor: "#ccc",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
  },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
};
```

```chart``` is used to set the height, type and other properties related to the chart

 ```
 chart: {
    height: 500,
    type: "line",
    zoom: {
      enabled: false,
    },
 ```

```xaxis``` is used to set the data on the x-axis

```
xaxis: {
    type: "datetime",
    categories: date,
  },
```

```series``` is used to set the data on the y-axis

```
 series: [
    {
      name: "Confirmed",
      data: totalconfirmed,
    },
    {
      name: "Deceased",
      data: totaldeceased,
    },
    {
      name: "Recovered",
      data: totalrecovered,
    },
  ],
```

We have used all the required properties to render response and interactive charts for best user experience

## 4. Displaying Latest data and Tweets

All the statistics reports and NEWS Reports are displayed using different APIs. The code for which has been explained in PARSING THE DATA section.

For displaying tweets, we used the Twitter API to embedd the timelines of twitter feeds of organistaions like WHO, GOVT of India, etc.

## 5. Styling of the entire website

We used CSS3 to style our website for normal screen size and design each element to make the site user interactive and appealing. We used subtle animations to enhance the user experience. This allowed us to make the UI custom which would be not to case if we used some framework like BOOTSTRAP.

We also focused on making the site mobile friendly by making to responsive to different screen sizes. We used media queries for to achieve this feature. Using this we can make  the normal screen styles to adapt to the mobile screen by changing the orientation and size of different elements.

## 6. Setting Up the backend server:

The first step to achieve this feature was to set up a backend server using Node.js

```
// Storing express as a function in a variable app
const app = express();
// Setting up Listening port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
// Setting up static webpage
app.use(express.static("./public"));
```

To setup a server to host our HTML as a static web page on a port we used Express.js

It's a web framework that let's you structure a web application to handle multiple different http requests at a specific url.

We used it to set up the listening PORT (```process.env.PORT``` is the port which will be provided by the deployment server. The format may differ with different deployment services) The listening Port will be the port on which the app  listens on, acting as a communication endpoint.

Then using the ```static``` method we will provide the directory in which the app files are which will be deployed.

## 7. Database creation and linking

#### A: Setting Up a database:

The second step is to create a database. This was accomplished using a javascript neDB. neDB is an embedded persistent database for Node.js. It is a subset of MongoDB's API therefore it is light weight and easy to use which made it perfect for this project.

 ```
 // Creating and loading the database
const database = new Datastore("database.db");
database.loadDatabase();

// Saving the overall data into the database which we got from the sentiment analysis in the python scripts
// Needs to be done only once
// database.insert({ happy: 6105, neutral: 7393, sad: 2782 });

 ```

To create a database, we used the new ```Datastore``` object to make a database named "database.db". We used the ```loadDatabase``` method to load the database if it has already been created and skipping the step of creation to avoid making a new database every time the server ran.

We stored the data that we gathered from the analysis in the python scripts only once.

#### B: Setting Up POST Request Route:

To store the data that the user submits in the database we need to set up a ```POST``` request route using Express

```
// Setting up route the post request
app.post("/api", (request, response) => {
  // console.log(request.body);
  const data = request.body;
  database.insert(data);
  response.json(data);
});
```

Using the post method we made an endpoint ```"/api"``` for the post request. Then we stored the body of the request in a variable data and finally saved in the database using the ```insert``` method.

#### C: Setting Up GET Request Route:

To fetch the data in the database we need to set up a ```GET``` request route using Express.js. This function sets up an endpoint for the GET request and we can use this endpoint to fetch all the data in the database and use it to render charts.

```
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
```

## 8. LIVE Analysis

First step in performing the LIVE analysis was to fetch the tweets in real time. For this we used the Twit Library  and made a ```Twit``` object and used our credentials for authentication. Once that was done we can use the search api to fetch the latest 100 tweets with the query of "covid".

```
// making new Sentiment and Twit objects
var sentiment = new Sentiment();
var T = new Twit({
  consumer_key: "YOUR_CREDENTIALS",
  consumer_secret: "YOUR_CREDENTIALS",
  access_token: "YOUR_CREDENTIALS",
  access_token_secret: "YOUR_CREDENTIALS",
});
```

After that we used the sentiment Library to perform sentiment analysis of these 100 tweets. Then if :

the sentiment is greater than 1 = > Positive

the sentiment is less than 1 => Negative

the sentiment is equal to 0 => Neutral

```
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
```

The function is set on a interval of 20 Seconds so that it runs every 20 seconds and realtime analysis of tweets can be done frequently enough without reaching the request limit. This data is updated on the front end with dynamically updating graphs.

## 9. Deployment of the site

The deployment was done using the serverless deployment service from HEROKU.

We chose this as this fit the best for our deployment needs.

The site is deployed on the URL given below:

[https://sentilyzerr.herokuapp.com/](https://sentilyzerr.herokuapp.com/)
