# kevin-bacon
The goal is to take any page on wikipedia and compute the number of links to the "Kevin Bacon" wikipedia entry (https://en.wikipedia.org/wiki/Kevin_Bacon).


## Test Cases:
For example there is a one link separation between Footloose (https://en.wikipedia.org/wiki/Footloose_(1984_film)) and Kevin Bacon.
There is a two link separation between Tom Cruise and Kevin Bacon (via https://en.wikipedia.org/wiki/A_Few_Good_Men).
Also consider the links of separation between https://en.wikipedia.org/wiki/Philosophy or https://en.wikipedia.org/wiki/Taj_Mahal and Kevin Bacon etc.

## Inputs/Outputs
Inputs to the program will be a wikipedia url and outputs should be an integer.

# Table of Contents

## Code
### Compute Degrees of Separation
1. Update `line TODO:XXXX` with source you want to test
2. Run: `node index.js` or use Visual Studio Debugger with `Run Compute` config

### Web Scraper
1. Update `line TODO:XXXX` with the source page and depth
2. Run: `node webscraper.js` or use Visual Studio Debugger with `Run Web Scraper` config


## Considerations

### Data
- Option 1: call (API)[https://www.mediawiki.org/wiki/API:Parsing_wikitext] and traverse the pages yourself (webscraper.js) and store in database
    - Not very cost effective if application is hosted in cloud
    - Amount of time to populate data could be significant since the network latency is unknown
- Option 2: find db download with initial data to seed  database
- Must also consider how to update database - wikipedia pages are updated and new ones are added often
    - Is there a way to know which pages are updated or created? Pub/Sub? Polling?
