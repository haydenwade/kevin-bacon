const rp = require('request-promise');
const globalConstants = require('./globalConstants');
const helperMethods = require('./helperMethods');
const fs = require('fs');


function fetchPage(id) {
    //https://www.mediawiki.org/wiki/API:Parsing_wikitext
    const options = {
        method: 'GET',
        uri: 'https://en.wikipedia.org/w/api.php',
        json: true,
        qs: {
            page: id,
            action: 'parse',
            format: 'json',
            prop: 'links'
        }
    };
    return rp(options);
}

function savePageToFile(pageId, links) {
    //pageIds need to have underscores - replaces spaces with underscore
    const modifiedPageId = pageId.replace(/ /g,'_');
    fs.access(`./src/data/${modifiedPageId}.json`, fs.constants.F_OK,function(error) {
        if (error) {
            let jsonData = {
                links: links
            };
            const jsonContent = JSON.stringify(jsonData);
            fs.writeFile(`./src/data/${modifiedPageId}.json`, jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("An error occurred while writing JSON Object to File.",err);
                    throw err;
                }
                console.log("JSON file has been saved for page: ",modifiedPageId);
            });
        }
    });
}

/*
Will parse wikipedia page for links and store in graph (creates vertices and edges)
*/
async function parseSinglePage(id, dataSource) {
    try {
        // console.log(`-----------------Parsing page:${id}------------------`);
        let subPages = [];
        const page = await fetchPage(id);

        if (page && page.parse && page.parse.links) {
            for (let i = 0; i < page.parse.links.length; i++) {
                const link = page.parse.links[i]['*'];
                //exclude if matches prefix of wiki specific links
                if (!helperMethods.checkPrefixForMatch(link)) {
                    // console.log(link);
                    subPages.push(link);
                    //save to graph as vertex and add edges
                    const newNodeId = globalConstants.wikipediaPrefix + link;
                    if (dataSource !== null && !dataSource.getNode(newNodeId)) {
                        dataSource.insertNode(newNodeId, {});
                        dataSource.addEdge(globalConstants.wikipediaPrefix + id, newNodeId);
                    }
                }
            }
        }
        return subPages;
    }
    catch (err) {
        console.log(`an error occurred parsing page ${id}: `, err);
    }
}
/*
Depths-first search to a depth of N
*/
let visitedSubPages = new Set();//prevents from cycles
async function parsePagesWithDepth(startingPageId, depth, dataSource, saveDataToFiles, resetVisited = false) {
    if (resetVisited) {
        visitedSubPages.clear();
    }
    // console.log(`---------------Depth:${depth}-----------------`);
    visitedSubPages.add(startingPageId);
    if (depth < 0) {
        return;
    }
    let subPages = await parseSinglePage(startingPageId, dataSource);
    
    //save to file
    if(saveDataToFiles){
        savePageToFile(startingPageId, subPages);
    }

    for (let i = 0; i < subPages.length; i++) {
        if (!visitedSubPages.has(subPages[i])) {
            await parsePagesWithDepth(subPages[i], depth - 1, dataSource, saveDataToFiles);
        }
    }
}

module.exports = {
    parseSinglePage,
    parsePagesWithDepth,
    fetchPage
};