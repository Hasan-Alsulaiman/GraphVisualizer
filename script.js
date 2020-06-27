


// function to get the nieghbour nodes
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
  });

// a grpah instance
s = new sigma({ 
  container: 'sigma-container',
  settings: {
     
    scalingMode: 'inside',
    edgeColor: 'default',
defaultEdgeColor: '#F2AE2E'
  },



});
// the graph function
sigma.parsers.json(
  'data.json',
  s,
// function to color only the clicked node and its nieghbours
function picker(s) {
  // We first need to save the original colors of our
  // nodes and edges, like this:
  s.graph.nodes().forEach(function(n) {
    n.originalColor = n.color;
//         if the node has nieghbours give it a bigger size
    if (Object.keys(s.graph.neighbors(n.id)).length>=2){
      n.size = 0.8
    }
    else{
      n.size = 0.1
    }
  });
  s.graph.edges().forEach(function(e) {
    e.originalColor = e.color;
    e.black = "#000000"
    
  });
s.refresh();
  // When a node is clicked, we check for each node
  // if it is a neighbor of the clicked one. If not,
  // we set its color as grey, and else, it takes its
  // original color.
  // We do the same for the edges, and we only keep
  // edges that have both extremities colored.
  s.bind('clickNode', function(e) {
    var nodeId = e.data.node.id,
        toKeep = s.graph.neighbors(nodeId)
        
    toKeep[nodeId] = e.data.node;
     document.getElementById("nodeName").innerHTML = Object.keys(toKeep); 


    s.graph.nodes().forEach(function(n) {
      if (toKeep[n.id])
        n.color = n.originalColor;
      else
        n.color = '#F2D43D';
    });

    s.graph.edges().forEach(function(e) {
      if (toKeep[e.source] && toKeep[e.target])
        e.color = e.black;
      else
        e.color = '#F2D43D';
    });

    // Since the data has been modified, we need to
    // call the refresh method to make the colors
    // update effective.
    s.refresh();
  });

  // When the stage is clicked, we just color each
  // node and edge with its original color.
  s.bind('clickStage', function(e) {
    s.graph.nodes().forEach(function(n) {
      n.color = n.originalColor;
    });

    s.graph.edges().forEach(function(e) {
      e.color = e.originalColor;
    });

    // Same as in the previous event:
    s.refresh();
    // picker(s)  

  });
}
      
);



var t = true
function isToggle(){
  if (t){
    s.startForceAtlas2(
                   {worker: true, barnesHutOptimize: false,
                    scalingRatio:1,
                    adjustSizes: false
                   
                    
                   
                   })
  }else{
     s.stopForceAtlas2()

  }
  t=!t

}



// Adding a canvas renderer
s.addRenderer({
  container: 'graph-container',
  type: 'canvas'
});
function snap() {
  console.log('exporting...');
  var output = s.toSVG({download: true, filename: 'mygraph.svg', size: 1000});
  // console.log(output);
};


console.log(Object.keys(s.graph.neighbors("POLR2H ")).length) 
console.log(s.graph.degree("POLR2H "))