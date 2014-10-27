// takes two node objects with properties contents (num) and edges (an array of node objects)
// returns the shortest path between the node objects if a solution exists 
var breadthFirstSearch = function (start, goal) {

	// que initialized with start node in it
	var que = [start];
	// visited nodes initialized with the start node in it. why?
	// nodes are recorded as visited when pushed to the que, which never happens for the start node
	var visitedNodes = [start];

	var found = false;
	var currentNode;
	var solutionPath = [];

	// while the q contains atleast one node...
	while (que.length > 0){

		//shift (pop-left) the the node that has waited longest in the que to currentNode position
		currentNode = que.shift();
		console.log("looking at " + currentNode.contents);

		// if it's the goal, signal that it's been found and stop looping
		if (currentNode === goal){
			console.log("found goal @ " + currentNode.contents)
			found = true;
			break
		}

		// otherwise, edge by edge, check if the edge has already been visited.
		// if not, tag the edge with a marker to the current node so we can retrace our path to the goal,
		// push the edge to the end of the que, and add the edge to the list of visited nodes
		for (var i = 0; i < currentNode.edges.length; i++){
			if (visitedNodes.indexOf(currentNode.edges[i]) === -1) {
				currentNode.edges[i].enteredFrom = currentNode;
				que.push(currentNode.edges[i]);
				visitedNodes.push(currentNode.edges[i]);
			}
		}
	}
	
	// either the goal was found and the search aborted, or every branch of the tree was
	// searched in vain. if it was found we'll need to retrace our steps and record the solution...
	if (found) {

		// in this case, currentNode is the goal. record it's contents on the search path.
		solutionPath.unshift(currentNode)

		// the start node wasn't entered from another node, so it's enteredFrom contents is null
		// until we reach it, record the contents of the enter-from node to the left-most place in the solution
		// then move the current node pointer to the node the current node was entered from
		while (currentNode.enteredFrom !== undefined){
			solutionPath.unshift(currentNode.enteredFrom);
			currentNode = currentNode.enteredFrom;
		}

		// this function, found in the cleanEnteredFrom.js file, recurses through the entire graph and
		// resets all enteredFrom's to their initial state of null. this is neccassary for doing multiple
		// searches without a refresh
		cleanEnteredFroms(start);

		return solutionPath;

		// otherwise, clean up, then alert the user that there are no paths between the start and goal nodes
	} else {
		cleanEnteredFroms(start);
		return [];
	}
};