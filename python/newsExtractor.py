from newsapi import NewsApiClient
import pandas as pd

newsapi = NewsApiClient(api_key='eefe7e300a174e9f8ca25f2ad39cde63')
top_headlines = newsapi.get_top_headlines(q='covid',language='en',country='in')
art = top_headlines["articles"]

titl=[]
links=[]
img=[]

for i in range(3):
    titl.append(art[i]["title"].replace(',',''))

for i in range(3):
    links.append(art[i]["url"].replace(',',''))

for i in range(3):
    img.append(art[i]["urlToImage"].replace(',',''))

dct = {"titles":titl,"links":links,"images":img}
df = pd.DataFrame(dct)
df.to_csv('../data/news.csv')
