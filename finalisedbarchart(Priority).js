// Load the CSV file
d3.csv("D5_Amazon_Shipment_Arrival_Prediction.csv").then(function (data) {

    // Create an array of Priority values
    var priorities = data.map(function (d) { return d.Priority; });

    // Create a count of each Priority value
    var counts = {};
    priorities.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    // Convert the counts object to an array of objects with "Priority" and "Count" properties
    var countsArray = [];
    for (var key in counts) {
        countsArray.push({ Priority: key, Count: counts[key] });
    }
    
    // Set up the SVG element
    var svg = d3.select("#vis4")
        .append("svg")
        .attr("width", 500)
        .attr("height", 300);

    // Set up the scales for the x and y axes
    var xScale = d3.scaleBand()
        .domain(countsArray.map(function (d) { return d.Priority; }))
        .range([50, 450])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(countsArray, function (d) { return d.Count; })])
        .range([250, 50]);

    // Add the x and y axes
    svg.append("g")
        .attr("transform", "translate(0, 250)")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(d3.axisLeft(yScale));

    // Add the bars
    svg.selectAll(".bar")
        .data(countsArray)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.Priority); })
        .attr("y", function (d) { return yScale(d.Count); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return 250 - yScale(d.Count); });

    // Add the x-axis label
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", 250)
        .attr("y", 280)
        .text("Priority");

    // Add the y-axis label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", -150)
        .attr("y", 10)
        .attr("transform", "rotate(-90)")
        .text("Count");


});