d3.csv("example_numbers.csv", function(data) {
    var wheat = data; 

    console.log(data)

	showScatterPlot(wheat);

	function showScatterPlot(data) {

		var colors = d3.scale.category10();

	    var svg = d3.select("#wheat").append("svg").attr("width",500).attr("height", 500).append("g")

	    var width = 500
	    var height = 500
	    var margin = {top: 40, right: 30, bottom: 30, left: 30};    


		var x = d3.scale.linear().domain(d3.extent(data, function (d) {return +d.Date;}))
		  .range([margin.left, height - margin.left]);
		var y = d3.scale.linear().domain(d3.extent(data, function (d) {return +d.Percent;}))
		  .range([width - margin.top, margin.top]);  
		// var myScale = d3.scale.linear().domain([0, 1000]).range([0, 100]);
		// var month = d3.scale.linear().domain([0,12]).range([0,4]);

		 //AXIS
		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    	var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

		  svg.append("g")
		  .attr("class", "xaxis")
		  .attr("transform", "translate("+0+" ," +y.range()[0]+ ")")
		  .call(xAxis).tickValues(["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);

		  svg.append("g")
		  .attr("class", "yaxis")
		  .attr("transform", "translate(" +x.range()[0]+" , "+0 + ")")
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


	  	var varietyGroup = variety.enter().append("g").attr("class", "node")
	    	.attr('transform', function (d) { 
	    		return "translate(" + x(+d.Date) + "," + y(+d.Percent) + ")";})

	    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. 
	    //This corresponds with what we told the data it should be above.
	    
	    // var varietyGroup = variety.enter().append("g").attr("class", "node")
	    // .attr(function (d) {
	    //     return  + x(d.Date) + "," + y(d.Percent) + })


	    // // we add our first graphics element! A circle! 
	    varietyGroup.append("circle")
	        .attr("r", 5)
	        .attr("class", "dot")
	        .style("fill", function (d) {
	            // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
	            // by who makes the variety. 
	            return colors(d.library);
	    });

	   	// varietyGroup.on("mouseover",function (d) {
		   //  d3.select(this).style("stroke-width", "1px").style("stroke", "red");
		   //  }).on("mouseout", function (d) {
		   //  d3.select(this).style("stroke", "none");
		   //  }).on("click", function (d) {
		   //  d3.select(this).append("text")
	    //     .style("text-anchor", "middle")
	    //     .attr("dy", -10)
	    //     .text(function (d) {
	    //         return d.name; });	
		   //  })
	

	}





});

