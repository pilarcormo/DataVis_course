
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
var exercise_2 = (function () {
  var svg;
  svg = d3.select("#exercise2").append('svg').attr({'width': 1000, 'height': 1000}).append("g");

  var group2 = svg.append("g").attr("id","group2")

  var groupCircles = svg.append("g").attr("id", "circles")

  // Data
  var data = [
  {x: 13.0, y: 18.14},
  {x: 15.0, y: 18.14},
  {x: 13.0, y: 28.74},
  {x: 49.0, y: 35.77},
  {x: 15.0, y: 19.26},
  {x: 23.0, y: 18.10},
  {x: 43.0, y: 16.13},
  {x: 35.0, y: 13.10},
  {x: 12.0, y: 19.13},
  {x: 60.0, y: 40.26},
  {x: 25.0, y: 60.74}
  ];

  // Scales
  var margin = {top: 40, right: 40, bottom: 40, left: 40};      
  var xScale = d3.scale.linear().domain(d3.extent(data, function (d) {return d.x;}))
  .range([margin.left, 500 - margin.left]);
  var yScale = d3.scale.linear().domain(d3.extent(data, function (d) {return d.y;}))
  .range([500 - margin.top, margin.top]);

  // Axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickPadding(10);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickPadding(10);

  group2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+0+" ," + yScale.range()[0] + ")")
    .call(xAxis);

  group2.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + xScale.range()[0] +" , "+0 + ")")
    .call(yAxis);

  group2.selectAll("path").attr("fill","none")

  group2.selectAll(".tick line").attr("stroke","#000")

  group2.selectAll(".tick text").attr("fill","#f00")


  return {
    render: function (placement, options) {
      

      groupCircles.selectAll("circle")
      .data(data).enter().append("circle")
      .attr("r", 10)
      .attr("cx", function (d) {return xScale(d.x); })
      .attr("cy", function (d) {return yScale(d.y); })
      .style("fill", "lightgreen");  
    },

    update: function update(data) {
      var rect = groupCircles.selectAll("circle").data(data);

      rect.enter().append("circle")
      .style("fill", "blue")
      .attr("r", 10)
      .transition('elastic')
      .style("fill", "#F179D1").attr("r", 15)
      .transition('elastic')
      .style("fill", "lightblue")


            //   var line = d3.svg.line().interpolate("linear") 
      //   .x(function (d) {
      //     return d.x;
      //   })
      //   .y(function (d) {
      //     return d.y;
      //   });







      rect.attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); });

      rect.exit().attr("r", 10).transition() 
      .attr("r", 0)
      .remove();
    }



  }
})()
exercise_2.render();

setInterval(function() {

  var values = getRandomInt(3,100);
  var random_data = [];
  for (var i = 0; i < values; i++) {
    random_data.push({x: getRandomInt(16, 60), y: getRandomInt(16, 60)})
  }
  // for (var i = 0; i < values; i++) {
  //   random_data()
  // }


  exercise_2.update(random_data);

}, 1000)







