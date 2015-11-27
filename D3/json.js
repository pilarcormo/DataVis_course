

d3.json("https://raw.githubusercontent.com/eamonnmag/d3-biodatavis-course/master/assets/data/chocolate.json", function(data) {
	var chocolates = data.chocolates;

	showScatterPlot(chocolates);

	function showScatterPlot(data) {

		var colors = d3.scale.category10();
		var width = 500
		var height = 500
		var margin = {top: 40, right: 30, bottom: 30, left: 30};    

		var svg = d3.select("#chocolate").append("svg").attr("width",500).attr("height", 500).append("g") 

		var x = d3.scale.linear().domain(d3.extent(data, function (d) {
			return d.price;
		}))
		.range([margin.left, height - margin.left]);
		var y = d3.scale.linear().domain(d3.extent(data, function (d) {
			return d.rating;
		}))
		.range([width - margin.top, margin.top]);  


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

	    // this is our X axis label. 
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


	    var chocolateGroup = chocolate.enter().append("g").attr("class", "node")
	    .attr('transform', function (d) { 
	    return "translate(" + x(d.price) + "," + y(d.rating) + ")";})

	    chocolateGroup.append("circle")
	    .attr("r", 5)
	    .attr("class", "dot")
	    .style("fill", function (d) {
	            return colors(d.manufacturer);
	    });

	    chocolateGroup.append("text")
    			.style("text-anchor", "middle")
    			.attr("dy", -10)

	    // ZOOM
		var zoom = d3.behavior.zoom() // we first define our zoom behaviour
		.x(x) 
		.y(y) 
    	.scaleExtent([1, 5]) // how far we can scale in or out
    	.on("zoom", function () {
    		console.log(svg.select(".x .axis"));
    		svg.select(".xaxis").call(xAxis);
    		svg.select(".yaxis").call(yAxis);
    		chocolateGroup.attr("transform", function(d) {
    			return "translate(" + x(d.price) + "," + y(d.rating) + ")scale(" + d3.event.scale + ")"
    		});
    	});

    	// ADDING THE ZOOM AND THE RECTANGLE 
    	svg.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")").call(zoom)
    	.append('rect')
    	.attr('width', width)
    	.attr('height', height)
    	.attr('fill', 'rgba(1,1,1,0)');

    	// BRUSH
    	var brushed = function() {
    		var extent = brush.extent();
    		/*d3.selectAll("chocolateGroup").select("circle").attr("r", function (d) {
    			d.selected = (x(d.x) > x(extent[0][0]) && x(d.x) < x(extent[1][0])) && (y(d.y) < y(extent[0][1]) && y(d.y) > y(extent[1][1]));
    				if(d.selected) {
        				selected[d.name] = d;
    				}
    			return d.selected ? 2 : 1;
    		});*/
		
			d3.selectAll(".node text")
    			.text(function (d) {
	    			d.selected = (x(d.price) > x(extent[0][0]) && x(d.price) < x(extent[1][0])) && (y(d.rating) < y(extent[0][1]) && y(d.rating) > y(extent[1][1]));
					console.log(d.selected);

					return d.selected ? d.name : "";
	    	 	});  
		}


    	brush = d3.svg.brush()
	    	.x(zoom.x())
	    	.y(zoom.y())

	    	.on("brushstart", function() {
	    		selected = {};
	    	})
	    	.on("brush", brushed)
	    	.on("brushend", function() {
	    		console.log("Selected");
	    		console.log(Object.keys(selected))
	    	});

    	svg.append("g")
    		.attr("class", "brush")
    		.style("fill", "rgba(0,0,0,0.3")
    		.call(brush);
    	// MOUSE EFFECTS
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
    	}).on("mousemove", function (d) {
    		d3.select(this).append("circle").attr("r", 10).style("fill", function (d) {
    			return colors(d.manufacturer);});
    	})





    }

});

