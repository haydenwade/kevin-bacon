class GraphNode {
    constructor(id, data) {
        this.id = id;
        this.data = data; //any additional data that needs to be stored
        this.outgoing_edges = new Set();//ids of outgoing edges
    }
    //naming outgoing_edges because may want to consider storing incoming_edges for better performance
    addOutgoingEdge(id) {
        this.outgoing_edges.add(id);
    }
}

class DirectedGraph {
    constructor() {
        this.nodes = new Map();
    }
    insertNode(id, data) {
        if(!this.nodes.has(id)){
            const node = new GraphNode(id, data);
            this.nodes.set(id, node);
        }
    }
    getNode(id) {
        return this.nodes.get(id);
    }
    deleteNode(id) {
        this.nodes.delete(id);
    }
    addEdge(srcId, targetId) {
        if(!this.nodes.has(srcId)){
            this.insertNode(srcId,{});
        }
        const node = this.nodes.get(srcId);
        node.addOutgoingEdge(targetId);
    }

    /*
    Will compute the number of links between a url and Kevin Bacon wikipedia page
    (degrees of separation)
    
    TODO:
    - measure performance - optimize if needed (consider an inverted index)
    - make sure to return shortest path? or first path?
    */


    /*
     This compute uses a standard breadth-first search approach to finding degrees of separation.
     Returns the shortest path.

     Based on this graph implementation which uses adjacency lists:
     Time Complexity: O(V+E) - may visit every vertex (while loop) and each edge of every vertex (for loop)
     Space Complexity: O(V) - the visited set; may have to visit every vertex
    */
    computeDegreesOfSeparation(srcId, targetId) {
        let visited = new Set();
        let q = [];

        const startNode = {
            depth: 0,
            id: srcId
        };
        q.push(startNode);
        while (q.length > 0) {
            const node = q.shift();
            const currentNode = this.getNode(node.id);
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
module.exports = DirectedGraph;