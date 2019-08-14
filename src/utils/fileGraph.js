const fs = require('fs');

class FileGraph {
    async getNode(id) {
        let getData = new Promise((reject, resolve) => {
            fs.readFile(`./src/data/${id}.json`, (err, data) => {
                if (err) throw err;
                const jsonData = JSON.parse(data);
                const node = {
                    id: id,
                    outgoing_edges: new Set(jsonData.links)
                };
                resolve(node);
            })
        });
        return await getData;
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

const temp = new FileGraph();
module.exports = temp;