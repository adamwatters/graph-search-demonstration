cleanEnteredFroms = function (start) {
	var visitedNodes = [];

	function search (currentNode) {
		if (visitedNodes.indexOf(currentNode) !== -1) {
			return;
		};
		visitedNodes.push(currentNode);

		currentNode.enteredFrom = null;
		
		for (var i = 0; i < currentNode.edges.length; i+=1){
			search(currentNode.edges[i]);
		}
	}
	search(start);
};