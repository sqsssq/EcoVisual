var lineLegend = ['Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'URPI'];
var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;
svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

let compare_g = svgGantt.append('g');

function drawPattern(move_x, move_y) {
    d3.csv('data/data_for_line.csv').then(data => {
        console.log(data);

        let peopleHistory = new Object();
        let min_axis = new Array();
        let max_axis = new Array();
        for (let i = 0; i < 9; ++i) {
            min_axis.push(9999);
            max_axis.push(-9999);
        }
        for (let i = 0; i < data.length; ++i) {
            if (typeof (peopleHistory[data[i].code]) == 'undefined') {
                peopleHistory[data[i].code] = new Array();
            }
            peopleHistory[data[i].code].push(data);
            for (let j = 1; j < 10; ++j) {
                let c = parseFloat(data[i][(j + 1) * 10 + 9]) - parseFloat(data[i][j * 10 + 9]);
                max_axis[j - 1] = Math.max(c, max_axis[j - 1]);
                min_axis[j - 1] = Math.min(c, min_axis[j - 1]);
            }
        }
        console.log(min_axis);



        let p_g = compare_g.append('g').attr('transform', 'translate(' + move_x + ',' + move_y + ')');
        let c_width = (widthGantt - 5 * 10) / 4;
        let c_height = heightGantt - 10 * 2;
        p_g.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', c_width)
            .attr('height', c_height)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-opacity', 0.5);
        // console.log(lineLegend.length);
        let red = Math.PI / 9;
        for (let i = 0; i < 10; ++i) {
            let x1 = 40 * Math.cos(-(Math.PI - i * red));
            let y1 = 40 * Math.sin(-(Math.PI - i * red));

            let x2 = 135 * Math.cos(-(Math.PI - i * red));
            let y2 = 135 * Math.sin(-(Math.PI - i * red));

            p_g.append('line')
                .attr('x1', x1 + c_width / 2)
                .attr('y1', y1 + 150)
                .attr('x2', x2 + c_width / 2)
                .attr('y2', y2 + 150)
                .attr('stroke', 'black')
                .attr('stroke-opacity', 0.3)
                .attr('fill', 'none');
            p_g.append('text')
                .attr('x', x2 + c_width / 2)
                .attr('y', y2 + 150)
                .attr('text-anchor', 'middle')
                .attr('font-family', 'Georgia')
                .attr('font-size', 10)
                .attr('dx', i == 9 ? '-1em' : 0)
                .attr('dy', '-0.6em')
                .text(lineLegend[i]);
        }
    })
}

drawPattern(10, 10);