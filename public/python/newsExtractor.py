# Importing Libraries
from newsapi import NewsApiClient
import pandas as pd

# Setting up client using API Key
newsapi = NewsApiClient(api_key='YOUR_API_KEY')
# Extracting top headlines
top_headlines = newsapi.get_top_headlines(q='covid',language='en',country='in')
# Extracting articles from the headlines
art = top_headlines["articles"]

# Setting up variables
titl=[]
links=[]
img=[]

# appending required details in the above variables
for i in range(3):
    titl.append(art[i]["title"].replace(',',''))
    links.append(art[i]["url"].replace(',',''))
    img.append(art[i]["urlToImage"].replace(',',''))

# Making a dictionary
dct = {"titles":titl,"links":links,"images":img}
# converting the dictionary into DataFrame
df = pd.DataFrame(dct)
# Converting the DataFrame into CSV File
df.to_csv('../data/news.csv')
