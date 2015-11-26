var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var data = [{
    x: 120,
    y: 190
}, {
    x: 30,
    y: 200
}, {
    x: 200,
    y: 100
}];

setInterval(function() {
    
    var values = getRandomInt(3,10);
    var random_data = [];
    for (var i = 0; i < values; i++) {
        random_data.push({x: getRandomInt(10, 100), y: getRandomInt(50, 200)})
    }
    
    update(random_data);
    
}, 2000)

function update(data) {

    var svg = d3.select("#test svg");
    var data_entry = svg.selectAll("circle").data(data);

    data_entry.enter().append("circle");

    data_entry.transition('elastic').duration(1000).attr("r", 10)
        .attr("cx", function (d) {
        return d.x;
    }).attr("cy", function (d) {
        return d.y;
    }).style("fill", "#F179D1");

    data_entry.exit().transition().duration(1000)
        .attr("opacity", 0).remove();
}


