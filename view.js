var Graph = function() {
	this.nodes = [];


};

var NODE_DIMENSION = 30;

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
	this.bindEventListeners();
	this.draw(self);
};

Map.prototype = {
	handleClick: function(e) {
		var clickContent = this.clickTest(this, e);
		if (clickContent === true && this.edgeMakerShop.length === 0) {
			this.nodes.push(new Node(this.keyAssigner, e.x -15, e.y -15));
			this.keyAssigner += 1;
			this.draw(this);
		} else if (clickContent === true) {
			this.edgeMakerShop = [];
			this.draw(this);
		} else {
			this.edgeMaker(this, clickContent);
			this.draw(this);
		}
	},

	bindEventListeners: function() {

		var self = this;
		this.canvas.addEventListener("click", function(e) {
			self.handleClick(e);
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
			if (this.path.indexOf(self.nodes[i]) !== -1){
				this.canvasTools.fillStyle = "yellow";
			} else if (this.edgeMakerShop.indexOf(self.nodes[i]) === -1){
				this.canvasTools.fillStyle = "red";
			} else {
				this.canvasTools.fillStyle = "blue";
			}
			this.canvasTools.fillRect(self.nodes[i].center.x - NODE_DIMENSION / 2,
										self.nodes[i].center.y - NODE_DIMENSION / 2,
										NODE_DIMENSION,
										NODE_DIMENSION);
			this.canvasTools.fillStyle = "white";
			this.canvasTools.font="20px Georgia";
			this.canvasTools.fillText(self.nodes[i].contents,
										self.nodes[i].center.x,
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
			if((e.x > self.nodes[i].center.x - NODE_DIMENSION) &&
				(e.x < self.nodes[i].center.x + NODE_DIMENSION) &&
				(e.y > self.nodes[i].center.y - NODE_DIMENSION) &&
				(e.y < self.nodes[i].center.y + NODE_DIMENSION)){
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

var Node = function(contents, x, y) {
	this.center = {
					x: x,
					y: y
				};
	this.contents = contents;
	this.edges = [];
}

window.addEventListener("load", function() {
	new Map();
});
