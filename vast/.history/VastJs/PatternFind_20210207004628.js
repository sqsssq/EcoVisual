var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;

svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);


function DrawPattern(pattern_select) {
    d3.csv('data/jingshouyi.csv').then((pattern_data) => {
        console.log(pattern_select);
        console.log(pattern_data);
    });
}