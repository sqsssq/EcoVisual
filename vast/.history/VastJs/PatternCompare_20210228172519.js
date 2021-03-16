var lineLegend = ['Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'URPI'];
var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;
svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

let compare_g = svgGantt.append('g');

function drawPattern(move_x, move_y) {
    let p_g = compare_g.append('g').attr('transform', 'translate(' + move_x + ',' + move_y + ')');
    let c_width = (widthGantt - 5 * 10) / 4;
    let c_height = heightGantt - 10 * 2;
    p_g.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', c_width)
        .attr('height', c_height)
        .attr('fill', 'none')
        .attr('stroke', 'black');
    console.log(lineLegend.length);
}

drawPattern(10, 10);