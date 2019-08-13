# kevin-bacon
The goal is to take any page on wikipedia and compute the number of links to the "Kevin Bacon" wikipedia entry (https://en.wikipedia.org/wiki/Kevin_Bacon).


## Test Cases:
For example there is a one link separation between Footloose (https://en.wikipedia.org/wiki/Footloose_(1984_film)) and Kevin Bacon.
There is a two link separation between Tom Cruise and Kevin Bacon (via https://en.wikipedia.org/wiki/A_Few_Good_Men).
Also consider the links of separation between https://en.wikipedia.org/wiki/Philosophy or https://en.wikipedia.org/wiki/Taj_Mahal and Kevin Bacon etc.

## Inputs/Outputs
Inputs to the program will be a wikipedia url and outputs should be an integer.

# Table of Contents

## Run Code
1. From a terminal run: `npm run start`, should see `Server running at: http://0.0.0.0:3000` in the stdout
2. Use the swagger docs to get started: [http://localhost:3000/documentation](http://localhost:3000/documentation)

## Run Test Cases (E2E)
1. Start API by running the following command in a terminal of choice: `npm run start`
2. Run command to execute tests (use new terminal): `npm run e2e`

## Considerations

### Data
- Option 1: call (API)[https://www.mediawiki.org/wiki/API:Parsing_wikitext] and traverse the pages yourself (webscraper.js) and store in database
    - Not very cost effective if application is hosted in cloud
    - Amount of time to populate data could be significant since the network latency is unknown
- Option 2: find db download with initial data to seed  database
- Must also consider how to update database - wikipedia pages are updated and new ones are added often
    - Is there a way to know which pages are updated or created? Pub/Sub? Polling?
