var exercise_2 = (function () {
  var svg;
  return {
    render: function (placement, options) {
      svg = d3.select(placement).append('svg').attr(options).append("g");

      var data = [
      {x: 10.0, y: 9.14},
      {x: 15.0, y: 18.14},
      {x: 13.0, y: 28.74},
      {x: 49.0, y: 35.77},
      {x: 11.0, y: 9.26},
      {x: 23.0, y: 18.10},
      {x: 43.0, y: 16.13},
      {x: 65.0, y: 13.10},
      {x: 12.0, y: 19.13},
      {x: 30.0, y: 70.26},
      {x: 25.0, y: 40.74}
      ];

      svg.selectAll("circle")
      .data(data).enter().append("circle")
      .attr("r", 3)
      .attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      }).style("fill", "#F179D1");  

      var myScale = d3.scale.linear().domain([0,1000]).range([0,100]);
      myScale(100);
      },
    }
     }
  })

exercise_2.render("#exercise2", {'width': 1000, 'height': 1000});
