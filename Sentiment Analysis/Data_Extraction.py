'''
Tweepy is an open source Python package that gives you a very convenient way to access the Twitter API with Python.
Tweepy includes a set of classes and methods that represent Twitter's models and API endpoints.
'''
import tweepy
import csv
import pandas as pd

'''
Replace the CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET in the code below with your own credentials.
This is done to verify your authentication.
'''
consumer_key = ""
consumer_secret = ""
access_token = ""
access_token_secret=""

'''
Twitter API uses OAuth, which is an open authorization protocol to authenticate requests.
'''
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)

#The three lists are made to store date,location,text of the twitter data.
date=[]
location=[]
text=[]
'''
 api.search method is useful for seeking Twitter data to get conversations on a particular topic. 
 This method returns a collection of relevant Tweets matching a specified query for all public tweets; in a particular language and time frame.
 The exception is made so that if any error occurs then it passes into the except statement. 
'''
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

'''
The main program which is the driver function for the program.It creates a dataframe of date,location and text of the tweets and stores it into a csv.
'''
if __name__ == '__main__':

        extract()
  #creating a dataframe of the retrieved information of the tweets
        diction = {"date":date,"location":location,"text":text}
        df= pd.DataFrame(diction)
        df.to_csv('FINAL2.csv')
