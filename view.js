
var mapAccess;
var Map = function() {
	var self = this;
	this.nodes = [];
	this.path = [];
	this.keyAssigner = 0;
	this.edgeMakerShop = [];
	this.canvas = document.getElementById("container");
	this.canvasTools = this.canvas.getContext("2d");
	this.mapSize = {
					height: this.canvas.height,
					width: this.canvas.width
				};
	this.canvas.addEventListener("click", function(e) {
		self.handleClick(self, e);
	});
	this.printButton = document.getElementById("printButton");
	this.printButton.addEventListener("click", function(e) {
		e.preventDefault();
		var edgesArray;
		for (var i = 0; i < self.nodes.length; i++){
			edgesArray = [];
			for (var j = 0; j < self.nodes[i].edges.length; j++){
				edgesArray.push(self.nodes[i].edges[j].contents);
			}
			console.log("node: " + self.nodes[i].contents + " edges: " + edgesArray.toString());
		}
	});

	this.dfsButton = document.getElementById("dfsButton");
	this.dfsButton.addEventListener("click", function(e) {
		e.preventDefault();
		self.path = depthFirstSearch(self.nodes[document.getElementById("startNode").value], 
						self.nodes[document.getElementById("goalNode").value])
		self.draw(self);
	});

	this.bfsButton = document.getElementById("bfsButton");
	this.bfsButton.addEventListener("click", function(e) {
		e.preventDefault();
		self.path = breadthFirstSearch(self.nodes[document.getElementById("startNode").value], 
						self.nodes[document.getElementById("goalNode").value])
		self.draw(self);
	});
	this.draw(self);
};

Map.prototype = {
	handleClick: function(self, e) {
		var clickContent = this.clickTest(self, e);
		if (clickContent === true && self.edgeMakerShop.length === 0) {
			this.nodes.push(new Node(self, self.keyAssigner, e.x -15, e.y -15));
			this.keyAssigner += 1;
			this.draw(self);
		} else if (clickContent === true) {
			this.edgeMakerShop = [];
			this.draw(self);
		} else {
			this.edgeMaker(self, clickContent);
			this.draw(self);
		}
	},

	draw: function(self) {
		this.canvasTools.fillStyle = "#B2B2B2";
		this.canvasTools.fillRect(0, 0, self.mapSize.height, self.mapSize.width);
		this.canvasTools.strokeStyle = "black";
		this.canvasTools.lineWidth=5;
		for (var i = 0; i < this.nodes.length; i ++){
			this.drawLines(this.nodes[i]);
		}
		for (var i = 0; i < this.nodes.length; i ++){
			console.log(this.path);
			if (this.path.indexOf(self.nodes[i]) !== -1){
				this.canvasTools.fillStyle = "yellow";
			} else if (this.edgeMakerShop.indexOf(self.nodes[i]) === -1){
				this.canvasTools.fillStyle = "red";
			} else {
				this.canvasTools.fillStyle = "blue";
			}
			this.canvasTools.fillRect(self.nodes[i].center.x - self.nodes[i].size.width / 2,
										self.nodes[i].center.y - self.nodes[i].size.height / 2,
										self.nodes[i].size.width,
										self.nodes[i].size.height);
			this.canvasTools.fillStyle = "white";
			this.canvasTools.font="20px Georgia";
			this.canvasTools.fillText(self.nodes[i].contents,
										self.nodes[i].center.x - 10,
										self.nodes[i].center.y);
		}
	},

	drawLines: function(node) {
		for (var i = 0; i < node.edges.length; i++){
			this.canvasTools.beginPath();
			this.canvasTools.moveTo(node.center.x, node.center.y);
			this.canvasTools.lineTo(node.edges[i].center.x, node.edges[i].center.y);
			this.canvasTools.stroke();
		}
	},

	clickTest: function(self, e) {
		if (self.nodes.length === 0) { return true };
		for (var i = 0; i < self.nodes.length; i++){
			if((e.x > self.nodes[i].center.x - self.nodes[i].size.width) &&
				(e.x < self.nodes[i].center.x + self.nodes[i].size.width) &&
				(e.y > self.nodes[i].center.y - self.nodes[i].size.height) &&
				(e.y < self.nodes[i].center.y + self.nodes[i].size.height)){
				return self.nodes[i];
			} 
		}
		return true; 
	},

	edgeMaker: function(self, node) {
		if (this.edgeMakerShop.length === 0) {
			this.edgeMakerShop.push(node);
		} else if (this.edgeMakerShop.length === 1) {
			this.edgeMakerShop.push(node);
			if (this.edgeMakerShop[0].edges.indexOf(self.edgeMakerShop[1]) === -1) {
				this.edgeMakerShop[0].edges.push(self.edgeMakerShop[1]);
				this.edgeMakerShop[1].edges.push(self.edgeMakerShop[0]);
			} else {
				this.edgeMakerShop[0].edges.splice(this.edgeMakerShop[0].edges.indexOf(self.edgeMakerShop[1]), 1);
				this.edgeMakerShop[1].edges.splice(this.edgeMakerShop[1].edges.indexOf(self.edgeMakerShop[0]), 1);
			}
		}
		if (this.edgeMakerShop.length === 2) {
			this.edgeMakerShop.shift();
		} 
	}
};

var Node = function(map, contents, x, y) {
	this.map = map;
	this.size = {
					height: 30,
					width: 30,
				};
	this.center = {
					x: x + (this.size.width/2),
					y: y + (this.size.height/2),
				};
	this.contents = contents;
	this.edges = [];
	this.enteredFrom = null;
}

window.addEventListener("load", function() {
	mapAccess = new Map();
});
