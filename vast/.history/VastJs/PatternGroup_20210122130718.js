var widthGroup = document.getElementById("groupView").offsetWidth,
    heightGroup = document.getElementById("groupView").offsetHeight;

var svgGroup;

svgGroup = d3.select("#groupView").append("svg")
    .attr("width", widthGroup)
    .attr("height", heightGroup);