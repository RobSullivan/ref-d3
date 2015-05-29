var width = 960,
    height = 2200;

var cluster = d3.layout.cluster()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(40,0)");

//for inspecting in the console
var global_nodes,
    global_links

d3.json("http://localhost:8000/data.json", function(error, root) {
  //root is json data
  var nodes = cluster.nodes(root),
      links = cluster.links(nodes);
    global_nodes = nodes
    global_links = links
  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.pmid; });




  var clickety = function(){
   return alert("cliked") 
  }
  d3.select('circle').on("click", clickety )


});

d3.select(self.frameElement).style("height", height + "px");