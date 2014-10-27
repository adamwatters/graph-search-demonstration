
// takes two node objects with properties value (num) and edges (an array of node objects)
// returns a path between the two if such a solution exists, but not neccassarily the shortest one
var depthFirstSearch = function (start, goal) {

	var visitedNodes = [];
	var found = false;
	var solutionPath = [];

	// recursively called inner function
	function search (currentNode) {

		// escape call if current node has already been visited. this will keep us from getting in loops.
		if (visitedNodes.indexOf(currentNode) !== -1) {
			console.log("already been here")
			return;
		};
		// it wasn't visited before if we've come this far. now it has been. add it to the list.
		visitedNodes.push(currentNode);

		// is it the goal? if so, toggle state to "found = true"
		if (currentNode === goal) {
			console.log("found it @ " + currentNode.contents);
			found = true;
		}
		
		// for each edge of the current node, check if we've already found the goal. if not, search() that edge.
		for (var i = 0; i < currentNode.edges.length; i+=1){
			if(!found){
				console.log("moving from " + currentNode.contents + " to " + currentNode.edges[i].contents)
				search(currentNode.edges[i], goal);
			};
		}

		// this code will be executed once we've reached the end of a recursive seach branch. if the goal was found, it
		// was at the end of the branch last searched - record each node value on the way back up through the recursions.
		if (found) {
			console.log("left-pushing " + currentNode.contents + " to solutionPath")
			solutionPath.unshift(currentNode);
		}
	}
	// this is outside the scope of the inner function - we initiate the recursive search here.
	search(start, goal);

	// if the goal was found, return the solution; otherwise, tell the user no solution was found
	return(found ? solutionPath : []);
};