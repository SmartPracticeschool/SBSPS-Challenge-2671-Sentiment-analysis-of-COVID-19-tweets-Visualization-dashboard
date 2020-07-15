# Python code Explanation:  

## 1. EXTRACTING DATA

The first step is to make a Twitter developer account and generate consumer keys, consumer secret, and access token keys to form an API connection.
Tweets which have the tag #covid and user location as India have been retrieved using these keys.

 Tweepy library has been used to create a cursor to communicate with the Twitter platform and filter tweets according to our requirement.
 Pandas library has been used to create a DataFrame of the retrieved data and export it into a CSV.

Tweepy is an open source Python package that gives you a very convenient way to access the Twitter API with Python.
Tweepy includes a set of classes and methods that represent Twitter's models and API endpoints.
```
import tweepy
import csv
import pandas as pd
```
Replace the CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET in the code below with your own credentials.
This is done to verify your authentication.
```
consumer_key = ""
consumer_secret = ""
access_token = ""
access_token_secret=""
```
Twitter API uses OAuth, which is an open authorization protocol to authenticate requests.
```
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)
```
The three lists are made to store date,location,text of the twitter data.
```
date=[]
location=[]
text=[]
```
 api.search method is useful for seeking Twitter data to get conversations on a particular topic. 
 This method returns a collection of relevant Tweets matching a specified query for all public tweets; in a particular language and time frame.
 The exception is made so that if any error occurs then it passes into the except statement. 
```
def extract():
    try:
        #Creating a cursor which retrieves tweets which have the term #covid, are in english languague dated from 01-01-2020 to 07-07-2020
        for tweet in tweepy.Cursor(api.search,q=["#covid"],lang="en",since="2020-07-01",until='2020-07-08').items():
#Filtering the tweets for user location as india
            if "India" in tweet.user.location:
                print(tweet.created_at)
                print(tweet.user.location)
                print(tweet.text)
                date.append(tweet.created_at)
                location.append(tweet.user.location)
                text.append(tweet.text)

                  
    except:
        print("Inside the exception - no:2")   
        return

```
The main program which is the driver function for the program.It creates a dataframe of date,location and text of the tweets and stores it into a csv.
```
if __name__ == '__main__':

        extract()
  #creating a dataframe of the retrieved information of the tweets
        diction = {"date":date,"location":location,"text":text}
        df= pd.DataFrame(diction)
        df.to_csv('FINAL2.csv')
```
## MAIN CODE:

This code contains all the functions that have been made to perform pre-processing, sentiment analysis and generate a wordcloud.

### 1.Refining of collected data:  
As the tweets collected contain a lot of junk text( for example @,#, emojis), we needed to refine the text.It is done by using Nltk and Re(Regularexpression) library.Nltk library is used for natural language processing ie. to analyse and manipulate human language data.Nltk has a list of stopwords which can removed from the text to make the data more accurate and remove the unnecessary words. Here Re library is used for removing certain patterns or text from the data.
### 2.Classification of text  
This is where the tweets are classified into positive,negative and neutral.In this we have used TextBlob library which works on Naives Bayes algorithm.The sentiment property of TextBlob generates polarity of the text ie. if :  
polarity>0 text has positive sentiment  
polarity<0 text has negative sentiment  
polarity=0 text has neutral sentiment  
### 3.Generation of csv  
The results generated from classification are stored in csvs statewise which is used in the web-app. The data is separated datewise. 
### 4.Wordcloud
Generating a wordcloud after performing sentiment analysis of the pre-processed data.
<hr />
These are the libraries which we have used in our program  

```
import sys
import nltk
import csv
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from textblob import TextBlob 
from nltk.corpus import wordnet
import time
import datetime
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
```
These are the lists which have used to store various data and then store it into CSVs.
```
daydate=["01-07-2020","02-07-2020","03-07-2020","04-07-2020","05-07-2020","06-07-2020","07-07-2020"]
dwpos =[]
dwneu=[]
dwneg=[]
avgsent=[]
delpos=[]
delneu=[]
delneg=[]
mumbaipos=[]
mumbaineu=[]
mumbaineg=[]
chenpos=[]
chenneu=[]
chenneg=[]
bengalpos=[]
bengalneu=[]
bengalneg=[]
bglpos=[]
bglneu=[]
bglneg=[]
hydpos=[]
hydneu=[]
hydneg=[]
```
Usage of Regex library: The following regex strips of an URL (not just http) ie hashtags,@user,
any punctuations, User Names or any non alphanumeric characters.
It also separates the word with a single space.
```
def clean(tweet):
    tweet=(' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split()))
    return (tweet)
```
Usage of NLTK method to remove stopwords by first tokenizing them.
Tokenization is a way to split text into tokens.These tokens could be paragraphs, sentences, or individual words.
```
all_stopwords = stopwords.words('english')
def remove_stopwords(tweet):
    tweet=word_tokenize(tweet)
    tweet= (" ".join([word for word in tweet if not word in all_stopwords]))
    return(tweet)
```
Preprocessing():The applymap() function is used to apply a function to a Dataframe elementwise.using this we have converted the tweets into lower case then removed
the unwanted punctuation,commas,emojis ie. everything except alphanumeric characters is removed.Nltk's method of removing stopwords is then used.Finally correct() 
method of TextBlob is used to correct the spelling of the words which are mis-spelled.
We have then created dataframes and CSV's according to the states.
```
def PreProcessing():
    df=pd.read_csv("FINAL2.csv")
    df = df.applymap(lambda s:s.lower() if type(s) == str else s)
    df = df.applymap(lambda s:clean(s) if type(s) == str else s)
    df = df.applymap(lambda s:remove_stopwords(s) if type(s) == str else s)
    df = df.apply(lambda s:Textblob(s).correct() if type(s) == str else s)
    new= df[df["location"].str.contains("delhi")]
    new2=df[df["location"].str.contains("bengal")]
    new3= df[df["location"].str.contains("chennai")]
    new4= df[df["location"].str.contains("mumbai")]
    new5= df[df["location"].str.contains("hyderabad")]
    new6= df[df["location"].str.contains("bengaluru")]
    new7= df[df["location"].str.contains("bangalore")]


    new6 = new6.append(new7,ignore_index=True)
    
    new.to_csv("delhi.csv")
    new2.to_csv("kolkata.csv")
    new3.to_csv("tamil.csv")
    new4.to_csv("mumbai.csv")
    new5.to_csv("hyderabad.csv")
    new6.to_csv("bangalore.csv")
    df.to_csv("overall.csv")
    
```
Usage of TextBlob library:The function inputs all the tweets and calculates the polarity.
Aboout Textblob:It provides a simple API for diving into common natural language processing (NLP) tasks such as part-of-speech tagging, noun phrase extraction,
sentiment analysis, classification, translation, and more.
```
def get_tweet_sentiment(tweet):
        analysis = TextBlob(tweet)
        return analysis.sentiment.polarity

def process(tweets):
    x =[]
    for i in range(len(tweets)):
        x.append(get_tweet_sentiment(str(tweets[i])))
    return x

def overallt(tweetsent):
    overallpos=0
    overallneg=0
    overallneutral=0
    for i in tweetsent:
        if i > 0:
            overallpos+=1
        if i < 0:
            overallneg+=1
        if i==0:
            overallneutral+=1
    listcount =[overallpos,overallneg,overallneutral]
    return listcount
```  
We have used datetime library in this segment.Its date method is used for setting the starting and ending date for the data to be collected.
Then the loop is iterated till the end date is reached.In the CSVs we have converted the given date and time in dd/mm/yy and minutes format 
and then compared the value with the starting date.Then the data is stored in a new CSV in increasing order of the dates.
```
def Datewise(citycsv):
    city = pd.read_csv(citycsv)
    tweet=city['text'].values.tolist()
    start_date=datetime.date(2020,7,1)
    end_date = datetime.date(2020,7,7)
    delta = datetime.timedelta(days=1)
    date_compare =[]
    while start_date<= end_date:
        date_compare.append(start_date)
        start_date+=delta
    
    day1=[]
    day2=[]
    day3=[]
    day4=[]
    day5=[]
    day6=[]
    day7=[]
    dates=city['date'].values.tolist()
    for i in range(len(dates)):
        if date_compare[0]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day1.append(city['text'].values[i])
        if date_compare[1]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day2.append(city['text'].values[i])
        if date_compare[2]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day3.append(city['text'].values[i])
        if date_compare[3]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day4.append(city['text'].values[i])
        if date_compare[4]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day5.append(city['text'].values[i])
        if date_compare[5]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day6.append(city['text'].values[i])
        if date_compare[6]==datetime.datetime.strptime(dates[i],"%d %m %Y %H %M").date():
            day7.append(city['text'].values[i])

    daysss=[day1,day2,day3,day4,day5,day6,day7]
    for day in daysss:
        day_Sent = process(day)
        daysentiment = overallt(day_Sent)
        print(daysentiment)
        if(citycsv == "delhi.csv"):
            delpos.append(daysentiment[0])
            delneg.append(daysentiment[1])
            delneu.append(daysentiment[2])
        if(citycsv == "mumbai.csv"):
            mumbaipos.append(daysentiment[0])
            mumbaineg.append(daysentiment[1])
            mumbaineu.append(daysentiment[2])
        if(citycsv == "kolkata.csv"):
            bengalpos.append(daysentiment[0])
            bengalneg.append(daysentiment[1])
            bengalneu.append(daysentiment[2])
        if(citycsv == "tamil.csv"):
            chenpos.append(daysentiment[0])
            chenneg.append(daysentiment[1])
            chenneu.append(daysentiment[2])
        if(citycsv == "hyderabad.csv"):
            hydpos.append(daysentiment[0])
            hydneg.append(daysentiment[1])
            hydneu.append(daysentiment[2])
        if(citycsv == "bangalore.csv"):
            bglpos.append(daysentiment[0])
            bglneg.append(daysentiment[1])
            bglneu.append(daysentiment[2])
        if(citycsv == "overall.csv"):
            dayavg = sum(day_Sent)/len(day_Sent)
            avgsent.append(dayavg)
            dwpos.append(daysentiment[0])
            dwneg.append(daysentiment[1])
            dwneu.append(daysentiment[2])
 ```
Function used to generate a wordcloud. Frequency distribution of pre-processed tweets is done and the most used 400 words are used to create a wordcloud. Mask is made using an image of Twitter logo which generates our cloud in the shape of the logo.

![Twitter logo](https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-articleLarge-v4.jpg)
```
def cloud(csv):
    df = pd.read_csv(csv)
    text = df['text'].tolist()
    text = ' '.join([str(item) for item in text])
    text = nltk.word_tokenize(text)
    text = [word for word in text if word not in all_stopwords]
    words = [word for word in text if len(word)>1]
    fdist = nltk.FreqDist(words)
    words=[]
    for word, frequency in fdist.most_common(500):
        #print(word)
        words.append(word)
    words = ' '.join([str(item) for item in words])
    mask = np.array(Image.open('bird.jpg'))
    wc = WordCloud(background_color="#2b2d3e", mask=mask, max_words=400, width=mask.shape[1],
                   height=mask.shape[0],colormap="Accent",random_state=3).generate(words)
    fig = plt.figure(figsize=(12,10))
    ax=fig.add_subplot(111)
    ax.imshow(wc,interpolation="bilinear")
    ax.axis("off")
```
Main driver for the program. It then sends the CSVs statewise to process, prints overall sentiment ie. total positive,negative and neutral of the whole week 
```        
if __name__ == '__main__':
        
        PreProcessing()
        print("Overall")
        Datewise('overall.csv')
        print("Delhi")
        Datewise('delhi.csv')
        print("Kolkata")
        Datewise('kolkata.csv')
        print("Chennai")
        Datewise('tamil.csv')
        print("Mumbai")
        Datewise('mumbai.csv')
        print("Hyderabad")
        Datewise('hyderabad.csv')
        print("Bengaluru")
        Datewise('bangalore.csv')


        finaldit = {"date":daydate,"dwpos":dwpos,"dwneu":dwneu,"dwneg":dwneg,"avgsent":avgsent,"delpos":delpos,"delneu":delneu,"delneg":delneg,"mumpos":mumbaipos,"mumneu":mumbaineu,"mumneg":mumbaineg,"chenpos":chenpos,"chenneu":chenneu,"chenneg":chenneg,"kolpos":bengalpos,"kolneu":bengalneu,"kolneg":bengalneg,"hydpos":hydpos,"hydneu":hydneu,"hydneg":hydneg,"bglpos":bglpos,"bglneu":bglneu,"bglneg":bglneg}
        finaldf = pd.DataFrame(finaldit)
        print(finaldf)
        finaldf.to_csv('VData.csv')
        overallpos = sum(dwpos)
        print(overallpos)
        overallneu = sum(dwneu)
        print(overallneu)
        overallneg= sum(dwneg)
        print(overallneg)
        cloud('overall.csv')
        

