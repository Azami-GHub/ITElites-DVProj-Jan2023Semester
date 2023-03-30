d3.csv("D5_Amazon_Shipment_Arrival_Prediction.csv").then(function (data) {
    var ship_modes = d3.nest()
        .key(function (d) { return d.Ship_mode; })
        .entries(data);

    var color = d3.scaleOrdinal()
        .domain(ship_modes.map(function (d) { return d.key; }))
        .range(d3.schemeSet2);

    var width = 600,
        height = 400,
        radius = Math.min(width, height) / 2;

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.values.length; });

    var svg = d3.select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(ship_modes))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) { return color(d.data.key); });

    g.append("text")
        .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function (d) { return d.data.key + " (" + d.data.values.length + ")"; });
});