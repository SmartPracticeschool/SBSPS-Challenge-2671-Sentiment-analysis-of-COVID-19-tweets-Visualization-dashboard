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
'''
These are the lists which have used to store various data and then store it into CSVs.
'''
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

'''
Usage of Regex library: The following regex strips of an URL (not just http) ie hashtags,@user,
any punctuations, User Names or any non alphanumeric characters.
It also separates the word with a single space.
'''
def clean(tweet):
    tweet=(' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split()))
    return (tweet)

'''
Usage of NLTK method to remove stopwords by first tokenizing them.
Tokenization is a way to split text into tokens.These tokens could be paragraphs, sentences, or individual words.
'''
all_stopwords = stopwords.words('english')
def remove_stopwords(tweet):
    tweet=word_tokenize(tweet)
    tweet= (" ".join([word for word in tweet if not word in all_stopwords]))
    return(tweet)
'''
PrePprocessing():The applymap() function is used to apply a function to a Dataframe elementwise.using this we have converted the tweets into lower case then removed
the unwanted punctuation,commas,emojis ie. everything except alphanumeric characters is removed.Nltk's method of removing stopwords is then used.Finally correct() 
method of TextBlob is used to correct the spelling of the words which are mis-spelled.
We hab=ve then created dataframes and CSV's according to the states.
'''
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
    
'''
Usage of TextBlob library:The function inputs all the tweets and calculates the polarity.
Aboout Textblob:It provides a simple API for diving into common natural language processing (NLP) tasks such as part-of-speech tagging, noun phrase extraction,
sentiment analysis, classification, translation, and more.
'''
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
  
'''
We have used datetime library in this segment.Its date method is used for setting the starting and ending date for the data to be collected.
Then the loop is iterated till the end date is reached.In the CSVs we have converted the given date and time in dd/mm/yy and minutes format 
and then compared the value with the starting date.Then the data is stored in a new CSV in increasing order of the dates.
'''
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


 '''
Function which is used to generate the wordcloud using Wordcloud library. 
Frequency distribution is performed on the pre-processed data to find most commonly used words and these words are used to generate a wordcloud.
A mask is used to genrate wordcloud in the shape of Twitter logo.
'''
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

    
 #Main driver for the program. It then sends the CSVs statewise to process, prints overall sentiment ie. total positive,negative and neutral of the whole week 
        
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
