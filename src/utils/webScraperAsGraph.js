const wikiApi = require('../utils/webScraper');
const helperMethods = require('./helperMethods');

class WebScraperAsGraph {
    async getNode(id) {
        const page = await wikiApi.fetchPage(id);
        const node = {
            id: id,
            outgoing_edges: new Set()
        };
        for (let i = 0; i < page.parse.links.length; i++) {
            const link = page.parse.links[i]['*'];
            //exclude if matches prefix of wiki specific links
            if (!helperMethods.checkPrefixForMatch(link)) {
                node.outgoing_edges.add(link);
            }
        }
        return node;
    }
    async computeDegreesOfSeparation(srcId, targetId) {
        let visited = new Set();
        let q = [];

        const startNode = {
            depth: 0,
            id: srcId
        };
        q.push(startNode);
        while (q.length > 0) {
            const node = q.shift();
            const currentNode = await this.getNode(node.id);
            if (currentNode) {
                if (currentNode.id === targetId) {
                    return node.depth;
                }
                visited.add(currentNode.id);

                for (let [key, val] of currentNode.outgoing_edges.entries()) {
                    if (!visited.has(key)) {
                        q.push({ depth: node.depth + 1, id: key });
                    }
                }
            } else {
                console.log('no such page exists currently!');
                //throw new Error('no such page exists currently!');
            }
        }
        return -1;//no link between src and target
    }
}

const temp = new WebScraperAsGraph();
module.exports = temp;