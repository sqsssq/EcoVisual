var line_width = document.getElementById("AnaLineView").clientWidth;
var line_height = document.getElementById("AnaLineView").clientHeight;

var padding = {
    top: 5,
    bottom: 10,
    left: 10,
    right: 10
};

var line_svg = d3.select("#AnaLineView").append("svg")
    .attr('width', line_width)
    .attr('height', line_height);