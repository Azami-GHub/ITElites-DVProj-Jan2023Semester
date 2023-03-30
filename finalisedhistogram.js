// Set up the width and height of the histogram
var margin = { top: 10, right: 30, bottom: 40, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Create the SVG element for the histogram
var svg = d3.select("#vis5")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Read in the CSV file and format the data
d3.csv("D5_Amazon_Shipment_Arrival_Prediction.csv").then(function (data) {

    data.forEach(function (d) {
        d.Discount = +d.Discount;
    });

    // Set up the x-axis scale and axis
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.Discount; })])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Set up the y-axis scale and axis
    var y = d3.scaleLinear()
        .range([height, 0]);

    var histogram = d3.histogram()
        .value(function (d) { return d.Discount; })
        .domain(x.domain())
        .thresholds(x.ticks(20));

    var bins = histogram(data);

    y.domain([0, d3.max(bins, function (d) { return d.length; })]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the bars to the histogram
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function (d) { return height - y(d.length); })
        .style("fill", "#69b3a2");


    // Add the x-axis title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .attr("text-anchor", "middle")
        .text("Discount");

    // Add the y-axis title
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text("Frequency");


});
