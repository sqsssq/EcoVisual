var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;

svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);


function DrawPattern(pattern_select) {
    d3.csv('data/jingshouyi.csv').then((pattern_data) => {
        console.log(pattern_select);
        for (let i = 0; i < pattern_data.length; ++i) {
            let s = new Set();
            for (let j = 1; j < 12; ++j) {
                s.add(parseInt(pattern_data[i][j]));
            }
            pattern_data[i]['pattern'] = s;
        }
        console.log(pattern_data);
    });
}