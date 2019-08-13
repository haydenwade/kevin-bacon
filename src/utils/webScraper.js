const rp = require('request-promise');
const globalConstants = require('./globalConstants');

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

function checkPrefixForMatch(str, prefixes = ['Template talk:', 'Template:', 'Category:', 'Wikipedia:', 'Help:']) {
    for (let i = 0; i < prefixes.length; i++) {
        const prefixLength = prefixes[i].length;
        const substr = str.substr(0, prefixLength);
        if (substr === prefixes[i]) {
            return true;
        }
    }
    return false;
}
/*
Will parse wikipedia page for links and store in graph (creates vertices and edges)
*/
async function parseSinglePage(id,dataSource) {
    try {
        // console.log(`-----------------Parsing page:${id}------------------`);
        let subPages = [];
        const page = await fetchPage(id);

        if (page && page.parse && page.parse.links) {
            for (let i = 0; i < page.parse.links.length; i++) {
                const link = page.parse.links[i]['*'];
                //exclude if matches prefix
                if (!checkPrefixForMatch(link)) {
                    // console.log(link);
                    subPages.push(link);
                    //save to graph as vertex and add edges
                    const newNodeId = globalConstants.wikipediaPrefix + link;
                    if(!dataSource.getNode(newNodeId)){
                        dataSource.insertNode(newNodeId,{});
                        dataSource.addEdge(globalConstants.wikipediaPrefix + id,newNodeId);
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
async function parsePagesWithDepth(startingPageId, depth, dataSource, resetVisited = false) {
    if(resetVisited){
        visitedSubPages.clear();
    }
    // console.log(`---------------Depth:${depth}-----------------`);
    visitedSubPages.add(startingPageId);
    if (depth < 0) {
        return;
    }
    let subPages = await parseSinglePage(startingPageId, dataSource);
    for (let i = 0; i < subPages.length; i++) {
        if (!visitedSubPages.has(subPages[i])) {
            await parsePagesWithDepth(subPages[i], depth - 1, dataSource);
        }
    }
}

//parsePagesWithDepth('Kevin_Bacon', 2);

module.exports = {
    parseSinglePage,
    parsePagesWithDepth
};