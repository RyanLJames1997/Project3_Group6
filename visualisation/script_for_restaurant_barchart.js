// Function to create a bar chart using D3.js
function createBarChart(data) {
    const chartContainer = d3.select("#chartContainer");

    chartContainer
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", d => d.counts + "px")
        .attr("title", d => `${d.state_name}: ${d.counts} counts`)
        .text(d => d.counts);
}

// Use d3.json to load the data from the JSON file
d3.json("savedata_records.json").then(data => {
    // Call the function with the loaded data
    createBarChart(data);
});
