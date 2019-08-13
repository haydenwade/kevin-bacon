const dataSource = require('../utils/inMemoryGraph');
const webScraper = require('../utils/webScraper');
const globalConstants = require('../utils/globalConstants');

const graphRepo = {
    computeSeparation: async(srcId, targetId)=>{
        return await dataSource.computeDegreesOfSeparation(srcId,targetId);
    },
    populate: async(srcId,depth)=>{
        const srcIdWithoutHttps = srcId.substr(globalConstants.wikipediaPrefix.length);
        await webScraper.parsePagesWithDepth(srcIdWithoutHttps,depth,dataSource,true);
        return;
    },
    getGraph: ()=>{
        return dataSource.nodes;
    }
};

module.exports = graphRepo;