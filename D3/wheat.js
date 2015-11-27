d3.csv("example_pst.csv", function(data) {
    var wheat = data; 

    console.log(data)

	showScatterPlot(wheat);

	function showScatterPlot(data) {

		var colors = d3.scale.ordinal().domain([0, 1]).range(["#F9A7B0", "red"]);
	    var width = 600
	    var height = 600

	    var svg = d3.select("#wheat").append("svg").attr("width",width).attr("height", height).append("g")

	    var margin = {top: 70, right: 30, bottom: 30, left: 70};    

		 var x = d3.scale.ordinal().domain(["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"])
		  .rangePoints([margin.left, width- margin.right]);


		var y = d3.scale.ordinal().domain(data.map(function (d) { return d.Variety;}))
		  .rangePoints([ height- margin.bottom, margin.top]);


		 //AXIS
		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(12);
    	var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

		  svg.append("g")
		  .attr("class", "xaxis")
		  .attr("transform", "translate("+0+" ," + y.range()[0]+ ")")
		  .call(xAxis);

		  svg.append("g")
		  .attr("class", "yaxis")
		  .attr("transform", "translate(" + x.range()[0] +" , "+0 + ")")
		  .call(yAxis);
		
	    // svg.append("text")
	    //     .attr("fill", "#414241")
	    //     .attr("text-anchor", "end")
	    //     .attr("x", width / 2)
	    //     .attr("y", height + margin.top)
	    //     .text("2014");
	   
	    var variety = svg.selectAll("g.node").data(data, function (d) {
	        return d.ID;
	    });
	    
		var varietyGroup = variety.enter().append("g").attr("class", "node")
	    	.attr('transform', function (d) { 
	    		return "translate(" + x(d.Date) + "," + y(d.Variety) + ")";
	    });

	    varietyGroup.append("circle")
	        .attr("r", 5)
	        .attr("class", "dot")
	        .style("fill", function (d) {
	            return colors(+d.PST);
	    });


		// // ZOOM
		// var zoom = d3.behavior.zoom() // we first define our zoom behaviour
		// .x(x) 
		// .y(y) 
  //   	.scaleExtent([1, 5]) // how far we can scale in or out
  //   	.on("zoom", function () {
  //   		console.log(svg.select(".x .axis"));
  //   		svg.select(".xaxis").call(xAxis);
  //   		svg.select(".yaxis").call(yAxis);
  //   		varietyGroup.attr("transform", function(d) {

  //   			return "translate(" + x(d.Date) + "," + y(d.Variety) + ")scale(" + d3.event.scale + ")"
  //   		});
  //   	});

  //    	// ADDING THE ZOOM AND THE RECTANGLE 

  //   	svg.append("g")
  //   	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  //   	.call(zoom)
  //   	.append('rect')
  //   	.attr('width', width)
  //   	.attr('height', height)
  //   	.attr('fill', 'rgba(1,1,1,0)');	


	   	varietyGroup.on("mouseover",function (d) {
		    d3.select(this).style("stroke-width", "1px").style("stroke", "black")
	        .style("fill", function (d) {
	            return colors(+d.PST);
	    	})
		    .append("text")
	        .style("text-anchor", "left")
	        .attr("dy", -10)
	        .text(function (d) {
	            return d.Country; });
		    }).on("mouseout", function (d) {
		    	d3.select(this).style("stroke", "none");
		    	d3.select(this).selectAll("text").remove();
		    })
	

	}





});

