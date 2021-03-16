var lineLegend = ['Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'URPI'];
var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;
svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

let compare_g = svgGantt.append('g');

function drawPattern(move_x, move_y, selectData) {
    d3.csv('data/data_for_line.csv').then(data => {
        console.log(selectData);

        let peopleHistory = new Object();
        let min_axis = new Array();
        let max_axis = new Array();
        for (let i = 0; i < 10; ++i) {
            min_axis.push(9999);
            max_axis.push(-9999);
        }
        for (let i = 0; i < data.length; ++i) {
            if (typeof (peopleHistory[data[i].code]) == 'undefined') {
                peopleHistory[data[i].code] = new Object();
            }
            peopleHistory[data[i].code][data[i].biao] = new Array();
            for (let j = 1; j < 11; ++j) {
                let c = parseFloat(data[i][(j + 1) * 10 + 9]) - parseFloat(data[i][j * 10 + 9]);
                // if (c == -1263.44)
                // {
                //     console.log(data[i]);
                // }
                if (c < -200) c = -200;
                if (c > 200) c = 200;
                peopleHistory[data[i].code][data[i].biao].push({
                    v: c,
                    x: 0,
                    y: 0
                });

                max_axis[j - 1] = Math.max(c, max_axis[j - 1]);
                min_axis[j - 1] = Math.min(c, min_axis[j - 1]);
            }
        }
        for (let i = 0; i < max_axis.length; ++i) {
            max_axis[i] = Math.max(Math.abs(max_axis[i]), Math.abs(min_axis[i]));
        }
        // console.log(min_axis);
        // console.log(max_axis)

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
        let line_array = new Array();
        for (let i = 0; i < 10; ++i) {
            let rd = -(Math.PI - i * red);
            let x1 = 40 * Math.cos(rd);
            let y1 = 40 * Math.sin(rd);

            let x2 = 135 * Math.cos(rd);
            let y2 = 135 * Math.sin(rd);


            let line_scale_1 = d3.scaleLinear()
                .domain([-max_axis[i], max_axis[i]])
                .range([40, 135]);

            for (let j in selectData) {
                // console.log(selectData[j].id, selectData[j].lun)
                // console.log(peopleHistory[selectData[j].id])
                let r1 = line_scale_1(peopleHistory[selectData[j].id][selectData[j].lun][i].v);
                console.log(r1)
                let x = r1 * Math.cos(rd);
                let y = r1 * Math.sin(rd);
                console.log(x, y);
                console.log(peopleHistory[selectData[j].id][selectData[j].lun][i])
                peopleHistory[selectData[j].id][selectData[j].lun][i].x = x;
                peopleHistory[selectData[j].id][selectData[j].lun][i].y = y;
            }


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

        console.log(peopleHistory[selectData[0].id])
        // 零线
        var arc_generator = d3.arc()
            .innerRadius(175 / 2 - 1)
            .outerRadius(175 / 2 + 1);
        p_g.append('g')
            .attr('transform', 'translate(' + c_width / 2 + ',' + 150 + ')')
            .append('path')
            .attr('d', arc_generator({
                startAngle: -Math.PI / 2,
                endAngle: Math.PI / 2
            }))
            .attr('fill', 'red')
            .attr('stroke', 'none');
    })
}

drawPattern(10, 10, [{
    id: 'pva278uh',
    lun: 12
}]);