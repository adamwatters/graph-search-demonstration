Node = function(value) {
	this.value = value;
	this.edges = [];
	this.enteredFrom = null;
};

var initGraph = function(size){
	var graph = [];
	for (var i = 0; i <= size; i++){
		graph.push(new Node(i));
	}
	return graph;
}

// directed graph
var dGraph = initGraph(13);
dGraph[1].edges = [dGraph[2],dGraph[4]];
dGraph[2].edges = [dGraph[1],dGraph[3],dGraph[5]];
dGraph[3].edges = [dGraph[2]];
dGraph[4].edges = [dGraph[1],dGraph[7]];
dGraph[5].edges = [dGraph[2],dGraph[6],dGraph[8]];
dGraph[6].edges = [dGraph[5],dGraph[9],dGraph[10]];
dGraph[7].edges = [dGraph[4]];
dGraph[8].edges = [dGraph[5]];
dGraph[9].edges = [dGraph[6],dGraph[12]];
dGraph[10].edges = [dGraph[6],dGraph[11]];
dGraph[11].edges = [dGraph[10]];
dGraph[12].edges = [dGraph[9]];
dGraph[13].edges = [];


// undirected graph
var udGraph = initGraph(15);
udGraph[1].edges = [udGraph[2],udGraph[4]];
udGraph[2].edges = [udGraph[1],udGraph[3],udGraph[5]];
udGraph[3].edges = [udGraph[2],udGraph[11]];
udGraph[4].edges = [udGraph[1],udGraph[5],udGraph[7]];
udGraph[5].edges = [udGraph[2],udGraph[4],udGraph[6],udGraph[8]];
udGraph[6].edges = [udGraph[5],udGraph[9],udGraph[10]];
udGraph[7].edges = [udGraph[4],udGraph[13]];
udGraph[8].edges = [udGraph[5],udGraph[14]];
udGraph[9].edges = [udGraph[6],udGraph[12]];
udGraph[10].edges = [udGraph[6],udGraph[11]];
udGraph[11].edges = [udGraph[3],udGraph[10]];
udGraph[12].edges = [udGraph[9]];
udGraph[13].edges = [udGraph[7],udGraph[14]];
udGraph[14].edges = [udGraph[8],udGraph[13]];
udGraph[15].edges = [];

