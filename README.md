# kevin-bacon
The goal is to take any page on wikipedia and compute the number of links to the "Kevin Bacon" wikipedia entry (https://en.wikipedia.org/wiki/Kevin_Bacon).


## Test Cases:
For example there is a one link separation between Footloose (https://en.wikipedia.org/wiki/Footloose_(1984_film)) and Kevin Bacon.
There is a two link separation between Tom Cruise and Kevin Bacon (via https://en.wikipedia.org/wiki/A_Few_Good_Men).
Also consider the links of separation between https://en.wikipedia.org/wiki/Philosophy or https://en.wikipedia.org/wiki/Taj_Mahal and Kevin Bacon etc.

## Inputs/Outputs
Inputs to the program will be a wikipedia url and outputs should be an integer.

# Table of Contents

## Run API
1. From a terminal run: `npm run start`, should see `Server running at: http://0.0.0.0:3000` in the stdout
2. Use the swagger docs to get started: [http://localhost:3000/documentation](http://localhost:3000/documentation)

## Run Test Cases (E2E)
1. Start API by running the following command in a terminal of choice: `npm run start`
2. Run command to execute tests (use new terminal): `npm run e2e`

## Run Scraper
1. Edit `batch.js` with the starting pages and the depth for which you want to scrape wiki pages
2. From terminal run: `node batch`


## Web Scraper
- Uses Depths-First Search to scape page links to a specified depth
- Can use `POST /graph` route to populate in-memory graph using web scraper

## Algorithm to Calculate Degrees of Separation
- Uses a Breadths-First Search approach
- The `/separation` route can be edited to use the file directory of pre-scraped data as graph or an in-memory graph
- I also tried to "live" scrape data as BFS but the performance was so bad I didn't invest any more time in it. Same approach but different data source.
- Future: use a graph database to store data for better performance

## Considerations

### Populating Graph
- Option 1: call (API)[https://www.mediawiki.org/wiki/API:Parsing_wikitext] and traverse the pages yourself (webscraper.js) and store in database
    - Not very cost effective if application is hosted in cloud
    - Amount of time to populate data could be significant since the network latency is unknown
- Option 2: find db download with initial data to seed database
- Must also consider how to update database - wikipedia pages are updated and new ones are added often
    - Is there a way to know which pages are updated or created? Pub/Sub? Polling?


## Challenges
- Collecting the data 
    - Had to clean links for generic wiki pages (ex: help, portal) and remove special chars to store in directory

## Adding new data sources (aka graph source) for web scraper to save to and compute to compute from
- New data sources can be add by implementing the following interface

```
interface DataSource {
    computeDegreesOfSeparation:number,
    insertNode:void,
    addEdge:void
}
```

## Helpful Links

https://en.wikipedia.org/w/api.php?format=json&prop=links&action=parse&page=Cleveland