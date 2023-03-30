// Load the data
d3.csv("D5_Amazon_Shipment_Arrival_Prediction.csv").then(function (data) {
    const width = 500;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 65 };

    // Add D3.js code here
    // Create the SVG element
    const svg = d3.select("#vis2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    // Format the data
    const blockData = d3.nest()
        .key(function (d) { return d.Block; })
        .rollup(function (v) { return v.length; })
        .entries(data);

    // Create the X and Y scales
    const x = d3.scaleBand()
        .domain(blockData.map(function (d) { return d.key; }))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(blockData, function (d) { return d.value; })])
        .range([height, 0]);

    // Add the X and Y axes
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y)
            .tickValues(d3.range(0, d3.max(blockData, function (d) { return d.value; }), 500)))
    //.tickFormat(d3.format(".2s")));

    // Add the bars
    svg.selectAll("rect")
        .data(blockData)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.key); })
        .attr("y", function (d) { return y(+d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(+d.value); })
        .attr("fill", "#2196F3");

    // Add the x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width)
        .attr("y", height + margin.top)
        .text("Block");

    // Add the y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top + 30)
        .attr("transform", "rotate(-90)")
        .text("Count");
});