const Joi = require('joi');
const graphHandler = require('../handler/graph');

const getDegreesOfSeparationRoute = {
    method: 'POST',
    path: '/separation',
    options: {
        description: 'Computes the number of links from the source to the target',
        notes: 'Uses BFS algo with configurable data source',
        tags: ['api'],
        validate: {
            payload: {
                sourceUrl: Joi.string().optional().default('https://en.wikipedia.org/wiki/Tom_Cruise'),
                targetUrl: Joi.string().optional().default('https://en.wikipedia.org/wiki/Kevin_Bacon')
            }
        }
    },
    handler: async function (request, h) {
        try {
            //change compute depending which data source you want to use
            //1:in-memory,2:webscraper (incomplete),3:file directory
            const res = await graphHandler.computeSeparation1(request.payload.sourceUrl, request.payload.targetUrl);
            return h.response(res).code(200);
        }
        catch (err) {
            return h.response(`An error occurred: ${JSON.stringify(err)}`).code(500);
        }
    }
};
module.exports = getDegreesOfSeparationRoute;