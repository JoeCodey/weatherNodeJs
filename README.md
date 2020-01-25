# weatherNodeJs

weather interface which takes an approximate address and returns the current and apparent temperature. Uses Google geoCode api to generate latitude and longitude coordinates. Weather information is a retrived from DarkSky API using generate lat/long coordinates. You must create your own DarkSky developer account and configure your API key accoringly. 

# What I learned   

Securing and encryptying sensitive information with git-crypt. API keys are automatically encrypt when pushed to github and decrypted when pulled. 

Modern javascript **Promises** to enforce behaviour of asnychronous functions. I found promises are great for simplify code and easier to debug and maintain then chained callbacks. 

New NPM tools including:
* Yargs: handles command line / text input, can enforce and verify arguments validity. 
* axios: very useful library to make http request / API calls with javascript Promises. 


