const graphHandler = require('../handler/graph');

const getGraph = {
    method: 'GET',
    path: '/graph',
    options: {
        description: 'Get in-memory graph',
        notes: 'Returns the size of graph - in future will pretty print current in memory graph',
        tags: ['api'],
    },
    handler: async function (request, h) {
        try {
            const graph = graphHandler.getGraph();
            //TODO: pretty print - break point here for debugging
            //debugger: graph.get('https://en.wikipedia.org/wiki/Peter_Thiel').outgoing_edges.has('https://en.wikipedia.org/wiki/Cleveland')
            return h.response(graph.size).code(200);
        }
        catch (err) {
            return h.response(`An error occurred: ${JSON.stringify(err)}`).code(500);
        }
    }
};
module.exports = getGraph;