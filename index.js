/*
Setup data using graph
- doing in memory to test compute algorithm
- graph should be persisted in data store 
*/
const DirectedGraph = require('./graph');
let graph = new DirectedGraph();

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

/*
Runs compute for several test cases
*/
function compute(src, target = 'https://en.wikipedia.org/wiki/Kevin_Bacon') {
    const result = graph.computeDegreesOfSeparation(src, target);
    return result;
}

//test: Footloose and Kevin Bacon
const result = compute('https://en.wikipedia.org/wiki/Footloose_(1984_film)');
console.log('should be: 1 and got: ', result);

//test: Tom Cruise and Kevin Bacon
const result2 = compute('https://en.wikipedia.org/wiki/Tom_Cruise');
console.log('should be: 2 and got: ', result2);

//test: HTML and Kevin Bacon - no connection based on hard coded dataset
const result3 = compute('https://en.wikipedia.org/wiki/HTML');
console.log('should be: -1 and got: ', result3);

//test: Philosophy and Kevin Bacon
// const result4 = compute('https://en.wikipedia.org/wiki/Philosophy');
// console.log('should be: ? and got: ', result4);

//test: Taj_Mahal and Kevin Bacon
// const result5 = compute('https://en.wikipedia.org/wiki/Taj_Mahal');
// console.log('should be: ? and got: ', result5);