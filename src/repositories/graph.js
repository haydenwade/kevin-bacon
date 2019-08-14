const webScraper = require('../utils/webScraper');
const helperMethods = require('../utils/helperMethods');

const dataSource = require('../utils/inMemoryGraph');
const dataSource2 = require('../utils/webScraperAsGraph');
const dataSource3 = require('../utils/fileGraph');

const graphRepo = {
    computeSeparation: async (sourceUrl, targetUrl) => {
        return await dataSource.computeDegreesOfSeparation(sourceUrl, targetUrl);
    },
    computeSeparation2: async (sourceUrl, targetUrl) => {
        const sourceId = helperMethods.getIdFromBaseUrl(sourceUrl);
        const targetId = helperMethods.getIdFromBaseUrl(targetUrl);
        return await dataSource2.computeDegreesOfSeparation(sourceId, targetId);
    },
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
            await webScraper.parsePagesWithDepth(sourceId, depth, dataSource, saveDataToFiles, true);
        }
        return;
    },
    getGraph: () => {
        return dataSource.nodes;
    }
};

module.exports = graphRepo;