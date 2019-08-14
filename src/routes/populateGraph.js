const Joi = require('joi');
const graphRepo = require('../repositories/graph');

const populateGraph = {
    method: 'POST',
    path: '/graph',
    options: {
        description: 'Populates the in-memory graph',
        notes: 'populates in-memory graph using wikipedia api',
        tags: ['api'],
        validate: {
            payload: {
                sourceUrl: Joi.string().required(),
                depth: Joi.number().optional().default(1),
                saveDataToFiles: Joi.bool().optional().default(false),
                useGraphLikeDataSource: Joi.bool().optional().default(false)
            }
        }
    },
    handler: async function (request, h) {
        try {
            const res = await graphRepo.populate(
                request.payload.sourceUrl, 
                request.payload.depth, 
                request.payload.saveDataToFiles,
                request.payload.useGraphLikeDataSource);
                
            return h.response(res).code(200);
        }
        catch (err) {
            return h.response(`An error occurred: ${JSON.stringify(err)}`).code(500);
        }
    }
};
module.exports = populateGraph;