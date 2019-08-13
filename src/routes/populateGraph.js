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
                source: Joi.string().required(),
                depth: Joi.number().optional().default(1).max(2)
            }
        }
    },
    handler: async function (request, h) {
        try {
            const res = await graphRepo.populate(request.payload.source, request.payload.depth);
            return h.response(res).code(200);
        }
        catch (err) {
            return h.response(`An error occurred: ${JSON.stringify(err)}`).code(500);
        }
    }
};
module.exports = populateGraph;