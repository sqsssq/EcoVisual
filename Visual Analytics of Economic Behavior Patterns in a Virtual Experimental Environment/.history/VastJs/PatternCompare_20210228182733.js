var lineLegend = ['Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'URPI'];
var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;
svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

let compare_g = svgGantt.append('g');

function drawPattern(move_x, move_y) {
    d3.csv()
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
    let red = Math.PI / 9;
    for (let i = 0; i < 10; ++i) {
        let x1 = 40 * Math.cos(i * -red);
        let y1 = 40 * Math.sin(i * -red);
        
        let x2 = 135 * Math.cos(i * -red);
        let y2 = 135 * Math.sin(i * -red);
        
        p_g.append('line')
        .attr('x1', x1 + c_width / 2)
        .attr('y1', y1 + 150)
        .attr('x2', x2 + c_width / 2)
        .attr('y2', y2 + 150)
        .attr('stroke', 'black')
        .attr('fill', 'none');
    }
}

drawPattern(10, 10);
