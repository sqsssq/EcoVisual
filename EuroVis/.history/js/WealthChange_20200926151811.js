var line_width = document.getElementById("AnaView").clientWidth;
var line_height = document.getElementById("AnaView").clientHeight;

var padding = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 10
};

var line_svg = d3.select("#AnaView").append("svg")
    .attr('width', line_width)
    .attr('height', line_height);