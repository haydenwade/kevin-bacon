/*
Setup data using graph
- doing in memory to test compute algorithm
- graph should be persisted in data store 
*/
const DirectedGraph = require('../models/graph');
let graph = new DirectedGraph();

//Seed data
//nodes - pages
graph.insertNode('https://en.wikipedia.org/wiki/Kevin_Bacon', {});
graph.insertNode('https://en.wikipedia.org/wiki/Footloose_(1984_film)', {});
graph.insertNode('https://en.wikipedia.org/wiki/A_Few_Good_Men', {});
graph.insertNode('https://en.wikipedia.org/wiki/Philosophy', {});
graph.insertNode('https://en.wikipedia.org/wiki/Taj_Mahal', {});
graph.insertNode('https://en.wikipedia.org/wiki/Tom_Cruise', {});
graph.insertNode('https://en.wikipedia.org/wiki/Academy_Award_for_Best_Supporting_Actor', {});
graph.insertNode('https://en.wikipedia.org/wiki/Golden_Globe_Award_for_Best_Supporting_Actor_%E2%80%93_Motion_Picture', {});
graph.insertNode('https://en.wikipedia.org/wiki/Jack_Nicholson', {});
graph.insertNode('https://en.wikipedia.org/wiki/Demi_Moore', {});
graph.insertNode('https://en.wikipedia.org/wiki/HTML', {});

graph.insertNode('https://en.wikipedia.org/wiki/Peter_Thiel', {});
graph.insertNode('https://en.wikipedia.org/wiki/Cleveland', {});
graph.insertNode('https://en.wikipedia.org/wiki/Moon', {});
graph.insertNode('https://en.wikipedia.org/wiki/Apollo_13', {});


//edges - links
graph.addEdge('https://en.wikipedia.org/wiki/Tom_Cruise', 'https://en.wikipedia.org/wiki/A_Few_Good_Men');//test case 2
graph.addEdge('https://en.wikipedia.org/wiki/Tom_Cruise', 'https://en.wikipedia.org/wiki/Academy_Award_for_Best_Supporting_Actor');
graph.addEdge('https://en.wikipedia.org/wiki/Tom_Cruise', 'https://en.wikipedia.org/wiki/Golden_Globe_Award_for_Best_Supporting_Actor_%E2%80%93_Motion_Picture');

graph.addEdge('https://en.wikipedia.org/wiki/A_Few_Good_Men', 'https://en.wikipedia.org/wiki/Tom_Cruise');//test case 2
graph.addEdge('https://en.wikipedia.org/wiki/A_Few_Good_Men', 'https://en.wikipedia.org/wiki/Jack_Nicholson');
graph.addEdge('https://en.wikipedia.org/wiki/A_Few_Good_Men', 'https://en.wikipedia.org/wiki/Kevin_Bacon');//test case 2
graph.addEdge('https://en.wikipedia.org/wiki/A_Few_Good_Men', 'https://en.wikipedia.org/wiki/Demi_Moore');

graph.addEdge('https://en.wikipedia.org/wiki/Kevin_Bacon', 'https://en.wikipedia.org/wiki/Footloose_(1984_film)');//test case 1
graph.addEdge('https://en.wikipedia.org/wiki/Kevin_Bacon', 'https://en.wikipedia.org/wiki/A_Few_Good_Men');//test case 2

graph.addEdge('https://en.wikipedia.org/wiki/Footloose_(1984_film)', 'https://en.wikipedia.org/wiki/Kevin_Bacon');//test case 1


graph.addEdge('https://en.wikipedia.org/wiki/Philosophy', 'https://en.wikipedia.org/wiki/Peter_Thiel');
graph.addEdge('https://en.wikipedia.org/wiki/Peter_Thiel', 'https://en.wikipedia.org/wiki/Cleveland');
graph.addEdge('https://en.wikipedia.org/wiki/Cleveland', 'https://en.wikipedia.org/wiki/Kevin_Bacon');


graph.addEdge('https://en.wikipedia.org/wiki/Taj_Mahal', 'https://en.wikipedia.org/wiki/Moon');
graph.addEdge('https://en.wikipedia.org/wiki/Moon', 'https://en.wikipedia.org/wiki/Apollo_13');
graph.addEdge('https://en.wikipedia.org/wiki/Apollo_13', 'https://en.wikipedia.org/wiki/Kevin_Bacon');

module.exports = graph;