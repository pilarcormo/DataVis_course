d3.csv("example.csv", function(data) {
    var wheat = data.wheat;

	showScatterPlot(wheat);

	function showScatterPlot(data) {

		var colors = d3.scale.category10();

	    var svg = d3.select("#wheat").append("svg").attr("width",500).attr("height", 500).append("g")

	    var width = 500
	    var height = 500
	    var margin = {top: 40, right: 30, bottom: 30, left: 30};    


		var x = d3.scale.linear().domain(d3.extent(data, function (d) {return d.species;}))
		  .range([margin.left, height - margin.left]);
		var y = d3.scale.linear().domain(d3.extent(data, function (d) {return d.percent;}))
		  .range([width - margin.top, margin.top]);  


		  var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    		var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

		  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate("+0+" ," + y.range()[0] + ")")
		  .call(xAxis);

		  svg.append("g")
		  .attr("class", "y axis")
		  .attr("transform", "translate(" + x.range()[0] +" , "+0 + ")")
		  .call(yAxis);
		  
	    // this is our X axis label. Nothing too special to see here.
	    svg.append("text")
	        .attr("fill", "#414241")
	        .attr("text-anchor", "end")
	        .attr("x", width / 2)
	        .attr("y", height )
	        .text("Price in pence (£)");

	    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
	    var chocolate = svg.selectAll("g.node").data(data, function (d) {
	        return d.name;
	    });


	    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.
	    
	    var chocolateGroup = chocolate.enter().append("g").attr("class", "node")
	    .attr('transform', function (d) {
	    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items 
	        return "translate(" + x(d.species) + "," + y(d.percent) + ")";})


	    // we add our first graphics element! A circle! 
	    chocolateGroup.append("circle")
	        .attr("r", 5)
	        .attr("class", "dot")
	        .style("fill", function (d) {
	            // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
	            // by who makes the chocolate. 
	            return colors(d.library);
	    });

	   	chocolateGroup.on("mouseover",function (d) {
		    d3.select(this).style("stroke-width", "1px").style("stroke", "red");
		    }).on("mouseout", function (d) {
		    d3.select(this).style("stroke", "none");
		    }).on("click", function (d) {
		    d3.select(this).append("text")
	        .style("text-anchor", "middle")
	        .attr("dy", -10)
	        .text(function (d) {
	            return d.name; });	
		    })
	

	}





});

