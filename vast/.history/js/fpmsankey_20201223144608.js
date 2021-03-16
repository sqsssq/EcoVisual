var width = 500,
    height = 500;

function Paint() {
    svg = d3.select("#container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + -5 + "," + -35 + ")")

    console.log(1);
}

Paint();