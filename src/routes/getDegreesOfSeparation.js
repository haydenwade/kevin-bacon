const Joi = require('joi');
const graphRepo = require('../repositories/graph');

const getDegreesOfSeparationRoute = {
    method: 'POST',
    path: '/separation',
    options: {
        description: 'Computes the number of links from the source to the target',
        notes: 'Uses BFS algo with configurable data source',
        tags: ['api'],
        validate: {
            payload: {
                source: Joi.string().required(),
                target: Joi.string().optional().default('https://en.wikipedia.org/wiki/Kevin_Bacon')
            }
        }
    },
    handler: async function (request, h) {
        try {
            const res = await graphRepo.computeSeparation(request.payload.source, request.payload.target);
            return h.response(res).code(200);
        }
        catch (err) {
            return h.response(`An error occurred: ${JSON.stringify(err)}`).code(500);
        }
    }
};
module.exports = getDegreesOfSeparationRoute;