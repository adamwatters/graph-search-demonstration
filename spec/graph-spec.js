

var testBreadthFirstSearch = function() {

	var nodeZero = new Node(0, 0, 0);
	var nodeOne = new Node(1,1,1);
	var nodeTwo = new Node(2,2,2);

	nodeZero.edges = [nodeOne, nodeTwo];
	nodeOne.edges = [nodeZero];
	nodeTwo.edges = [nodeZero];

	breadthFirstSearch(nodeOne, nodeTwo);
}