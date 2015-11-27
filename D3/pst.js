d3.csv("example_pst.csv", function(data) {
    var wheat = data; 

    console.log(data)

	showScatterPlot(wheat);

	function showScatterPlot(data) {

		var colors = d3.scale.category10();

	    var width = 500
	    var height = 500

	    var svg = d3.select("#wheat").append("svg").attr("width",width).attr("height", height).append("g")

	    var margin = {top: 40, right: 30, bottom: 30, left: 30};    

		// var x = d3.scale.ordinal().domain(["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"])
		//   .range([margin.left, height - margin.left]);

		 var x = d3.scale.ordinal().domain(data.map(function (d) { return d.Month; }))
		  .rangePoints([margin.left, width- margin.left]);


		  
		var y = d3.scale.linear().domain(d3.extent(data, function (d) {return +d.PST;}))
		  .range([height - margin.top, margin.top]);  

		 //AXIS
		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    	var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

		  svg.append("g")
		  .attr("class", "xaxis")
		  .attr("transform", "translate("+0+" ," + y.range()[0] + ")")
		  .call(xAxis);

		  svg.append("g")
		  .attr("class", "yaxis")
		  .attr("transform", "translate(" + x.range()[0] +" , "+0 + ")")
		  .call(yAxis);
		
	    svg.append("text")
	        .attr("fill", "#414241")
	        .attr("text-anchor", "end")
	        .attr("x", width / 2)
	        .attr("y", height )
	        .text("2015");
	     //
	    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
	    var variety = svg.selectAll("g.node").data(data, function (d) {
	        return d.Library;
	    });

	    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. 
	    //This corresponds with what we told the data it should be above.
	    
		var varietyGroup = variety.enter().append("g").attr("class", "node")
			.attr('fill', function(d) {
				return d.PST == 0 ? "blue" : "red";
			})
	    	.attr('transform', function (d) { 
	    		return "translate(" + x(d.Month) + "," + y(+d.PST) + ")";})


	    // // we add our first graphics element! A circle! 
	    varietyGroup.append("circle")
	        .attr("r", 5)
	        .attr("class", "dot")
	        .style("fill", function (d) {
	            // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
	            // by who makes the variety. 
	            return colors(+d.PST);
	    });

	   	// varietyGroup.on("mouseover",function (d) {
		   //  d3.select(this).style("stroke-width", "1px").style("stroke", "red").append("text")
	    //     .style("text-anchor", "middle")
	    //     .attr("dy", -10)
	    //     .text(function (d) {
	    //         return d.Variety; });
		   //  }).on("mouseout", function (d) {
		   //  d3.select(this).style("stroke", "none").append("text").attr("dy", 0).style("none");
		   //  })
	

	}





});

