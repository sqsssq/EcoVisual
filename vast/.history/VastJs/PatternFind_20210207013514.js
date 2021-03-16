var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;

svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);


function DrawPattern(pattern_select) {
    console.log(pattern_select);
    let step = heightGantt / (pattern_select + 1);
    let yScale = d3.scaleLinear()
        .domain([0, 304])
        .range([step * 9 / 20, -step * 9 / 20]);
    let xScale = d3.scaleLinear()
        .domain([1, 20])
        .range([100, widthGantt - 30]);
    let YScale = d3.scaleLinear()
    .domain([0, pattern_select.length + 2])
    .range([0, heightGantt]);
}