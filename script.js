$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// function to get the nieghbour nodes
sigma.classes.graph.addMethod('neighbors', function (nodeId) {
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
    defaultEdgeColor: '#fcdf03',
    defaultNodeColor: "#F23D3D"
  },
});
// we call the data picker function to pick a graph and display it
dataPicker()


//data to graph
var data = "data.json"
var dataChange = true
function dataPicker(){
  if(dataChange){
    var data = "mediumData.json"
  }else{
    var data = "data.json"

  }
  dataChange = !dataChange
  // the graph function
sigma.parsers.json(
  data,
  s,
  // function to color only the clicked node and its nieghbours
  function picker(s) {
    // We first need to save the original colors of our
    // nodes and edges, like this:
    s.graph.nodes().forEach(function (n) {
      n.originalColor = n.color;
      //         if the node has nieghbours give it a bigger size
      if (Object.keys(s.graph.neighbors(n.id)).length > 2) {
        n.size = 0.7
      }
      else {
        n.size = 0.1
      }
    });
    s.graph.edges().forEach(function (e) {
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
    s.bind('clickNode', function (e) {
      var nodeId = e.data.node.id
      var toKeep = {}
      var bigObject = toKeep
      var visited = []
      // breadth first search fucntion
      function breadth(nodeId) {        
        // add current node to visited
        visited.push(nodeId)
        // find current node's neighbours
        toKeep = s.graph.neighbors(nodeId)
        // update the final list with new nodes
        Object.assign(bigObject, toKeep)
        // get the length of final list and loop over it
        length = Object.keys(bigObject).length
        for (i = 0; i < length; i++) {
          // find neighbour of every list element
          grabbedNeighbour = Object.keys(bigObject)[i]
          // if neighbour not visited already, visit it
          if(!visited.includes(grabbedNeighbour)){
            // recursive function
            breadth(grabbedNeighbour)
          }
          
        }
        // return final list
        return bigObject
      }
      toKeep = breadth(nodeId)

      toKeep[nodeId] = e.data.node;
      document.getElementById("nodeName").innerHTML = Object.keys(toKeep);


      s.graph.nodes().forEach(function (n) {
        if (toKeep[n.id])
          n.color = n.originalColor;
        else
          n.color = '#fcdf03';
      });

      s.graph.edges().forEach(function (e) {
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
    s.bind('clickStage', function (e) {
      s.graph.nodes().forEach(function (n) {
        n.color = n.originalColor;
      });

      s.graph.edges().forEach(function (e) {
        e.color = e.originalColor;
      });

      // Same as in the previous event:
      s.refresh();
      // picker(s)  

    });
  }

);
}





var t = true
function isToggle() {
  if (t) {
    s.startForceAtlas2(
      {
        worker: true, barnesHutOptimize: false,
        scalingRatio: 1,
        adjustSizes: false



      })
  } else {
    s.stopForceAtlas2()

  }
  t = !t

}



// Adding a canvas renderer
s.addRenderer({
  container: 'graph-container',
  type: 'canvas'
});
function snap() {
  console.log('exporting...');
  var output = s.toSVG({ download: true, filename: 'mygraph.svg', size: 1000 });
  // console.log(output);
};


console.log(Object.keys(s.graph.neighbors("POLR2H ")).length)
console.log(s.graph.degree("POLR2H "))
console.log(typeof(mainFunction));
console.log("hi");

