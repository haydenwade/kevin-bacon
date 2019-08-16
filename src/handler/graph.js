const webScraper = require('../utils/webScraper');
const helperMethods = require('../utils/helperMethods');

const dataSource1 = require('../dataSources/inMemoryGraph');
const dataSource2 = require('../dataSources/webScraperAsGraph');
const dataSource3 = require('../dataSources/fileGraph');

//TODO: clean up to have single computeSeparation function
const graphRepo = {
    //uses in-memory graph - most performant
    computeSeparation1: async (sourceUrl, targetUrl) => {
        return await dataSource1.computeDegreesOfSeparation(sourceUrl, targetUrl);
    },
    //live scrapes from web - not fully vetted
    computeSeparation2: async (sourceUrl, targetUrl) => {
        const sourceId = helperMethods.getIdFromBaseUrl(sourceUrl);
        const targetId = helperMethods.getIdFromBaseUrl(targetUrl);
        return await dataSource2.computeDegreesOfSeparation(sourceId, targetId);
    },
    //uses fileGraph
    computeSeparation3: async (sourceUrl, targetUrl) => {
        const sourceId = helperMethods.getIdFromBaseUrl(sourceUrl);
        const targetId = helperMethods.getIdFromBaseUrl(targetUrl);
        return await dataSource3.computeDegreesOfSeparation(sourceId, targetId);
    },
    populate: async (sourceUrl, depth, saveDataToFiles, useGraphLikeDataSource) => {
        const sourceId = helperMethods.getIdFromBaseUrl(sourceUrl);
        if(!useGraphLikeDataSource){
            await webScraper.parsePagesWithDepth(sourceId, depth, null, saveDataToFiles, true);
        }else{
            await webScraper.parsePagesWithDepth(sourceId, depth, dataSource1, saveDataToFiles, true);
        }
        return;
    },
    getGraph: () => {
        return dataSource1.nodes;
    }
};

module.exports = graphRepo;