#### Sentiment analysis of COVID-19 tweets Visualization dashboard

DEMO LINK: [GDrive Link](https://drive.google.com/file/d/1hqrrcgt8x-2NpA6eKY_2zZFJ2WNDb2ZU/view?usp=sharing) or [Youtube Video Link](https://youtu.be/EizjqMifxjo)

WEBAPP LINK: [Click Here](https://sentilyzerr.herokuapp.com/news.html)

Presentation Link: [Click Here](https://docs.google.com/presentation/d/17Syv9AWA1bY8wvl-wlht4FNbrq0GDAMa6pi90L3hvRY/edit)

> Problem Statement: Nowadays there is a huge amount of data available on the internet, especially social media. Monitoring all this data would allow us to gain an overview of the wider public opinion behind different states of affairs. We are living in the middle of a pandemic and people are choosing social media platforms to express their opinions about all the government decisions. There is a need to analyze all this information. Using the analyzed data, the concerned authorities could take further decisions keeping the individual’s opinions in mind.

> Solution: Sentilyzerr is a web-app which is used to visualize the results of our sentiment analysis model's results. In this app, we focused on building a sentiment analysis model that will analyze all the data related to Covid-19 on Twitter. We created data sets of different behavior of people on the recent decisions of the government. After building the machine learning model we would visualize it. This web-app is a user- friendly dashboard to visualize all the analyzed data in the form of graphs so that it can be easily interpreted by the end-user. Our project will be the link between the government, organizations, and the public. The authorities will become more acquainted with how the individuals feel about their choices.

#### The app contains the following features:

```Main Dashboard```: This main Dashboard is the home page of the web-app. This contains different charts for the results of the sentiment analysis. The charts are interactive and you can remove or add the data with a click.

```Locolyzer```: This page contains different charts for the results of the sentiment analysis done location-wise. We have selected main 6 locations (Delhi, Mumbai, Chennai, Kolkata, Hyderabad and Bangalore) and we will visualize the results according to the location. The location and data can be changed with one click.

```News```: Our web-app not only visualizes our analysis' results but also provide the user with the latest updates like confirmed & active cases, recovery & death rate (overall and state-wise), latest tweets (by organizations like WHO, Govt. of India, etc.) and latest news articles by leading NEWS sites.

```Feedback Feature```: Our web-app has a feedback feature which allows the user to tell about how he/she is feeling about the current situation. This data will be added to our database to increase the data set.

```LIVE Analysis```: Our web-app also has a LIVE Analysis page. This page renders charts of 100 tweets which are fetch and analysed every 25 seconds.

```Watson Assistant Chatbot```: We have used the IBM Watson Asst. to build a COVID Info Bot for our app which answers all of the queries related to the ongoing Pandemic.

```Responsive Design```: The app can be viewed on a mobile phone without any problem the elements of the site adjust themselves according to the size of the window of the browser.

###### If you want to run this repo you need to do the following:

1. Install nodejs. (if you don't have it)
2. Clone the repo to your local system.
3. Change the API creds in ```server.js``` and ```news.js```

In ```server.js``` go to to ```new Twit``` and change the creds with your creds:
```
var T = new Twit({
  consumer_key: "YOUR_CONSUMER_KEY",
  consumer_secret: "YOUR_CONSUMER_SECRET",
  access_token: "YOUR_ACCESS_TOKEN",
  access_token_secret: "YOUR_ACCESS_TOKEN_SECRET",
});
```
In ```news.js``` go to ```getData2()``` which is the second last function defined and put your API token there in the url of the ```fetch``` method:
```
 const response = await fetch(
    "https://gnews.io/api/v3/search?q=covid%20india&country=in&token=YOUR_API_TOKEN"
  );
```
4. Open your shell/terminal and get to the directory where you cloned the repo.
5. Use the following command `node install` to install dependencies.
6. Use the following command `node start` to run the app.
7. Open your browser and go to the following address `localhost:3000`

> Note: If your port 3000 is already in use then change the port number in the server.js file and repeat step 5 and go to the address `localhost:PORT` where PORT is the number that you changed in the file.
