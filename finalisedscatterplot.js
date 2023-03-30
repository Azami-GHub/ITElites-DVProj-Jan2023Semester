// Parsing the data
d3.csv("D5_Amazon_Shipment_Arrival_Prediction.csv", function (data) {
    var margin = { top: 10, right: 30, bottom: 80, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    var svg = d3.select("#vis3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //Adding X axis
    var x = d3.scaleLinear()
        .domain([0, 350])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //Adding Y axis
    var y = d3.scaleLinear()
        .domain([0, 6500])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    var tooltip = d3.select("#vis3")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
    }

    var mousemove = function (d) {
        tooltip
            .html("The cost for the<br>shipment for this weight: " + d.Cost)
            .style("left", (d3.mouse(this)[0] + 90) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }

    var mouseleave = function (d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    // Adding dots for data points
    svg.append('g')
        .selectAll("dot")
        .data(data.filter(function (d, i) { return i < 50 }))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Cost); })
        .attr("cy", function (d) { return y(d.Weight_gm); })
        .attr("r", 7)
        .style("fill", "#ff00ff")
        .style("opacity", 0.3)
        .style("stroke", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    svg.append('text')
        .attr('x', width - 510)
        .attr('y', -40)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Costs')

    svg.append('text')
        .attr('x', 180)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text('Shipment Weight')
})
