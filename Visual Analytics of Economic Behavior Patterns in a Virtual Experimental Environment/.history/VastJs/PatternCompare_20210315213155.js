// var lineLegend = ['Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'URPI'];
var lineLegend = ['Work', 'Health', 'Repay', 'Loan', 'Investment', 'Venture', 'Insurance', 'Lottery', 'Disaster', 'Ill', 'Preference', 'Patience'];
var lineType = [2, 3, 2, 2, 2, 2, 2, 2, 4, 4, 7, 2];
var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;
// svgGantt = d3.select("#ganttView").append("svg")
//     .attr("width", widthGantt)
//     .attr("height", heightGantt);

// let compare_g = svgGantt.append('g').attr('class', 'svgBorder');
let c_width = (widthGantt - 5 * 20) / 5;
let c_height = heightGantt - 20;
let selectDataObject = new Object();

function drawPattern(move_x, move_y, selectData) {
    d3.csv('data/newdata_for_line.csv').then(data => {
        d3.csv('data/treatment.csv').then(treat => {
            // console.log(selectData);
            let c_height = heightGantt - 20;
            // console.log(parseInt(move_x) * 20)

            svgGantt = d3.select("#ganttView").append("svg")
                .attr("width", c_width)
                .attr("height", c_height)
                .attr('class', 'framework')
                .attr('transform', 'translate(' + (parseInt(move_x) * 20 + 20) + ',' + move_y + ')');
            let treatData = new Object();
            for (let i = 0; i < treat.length; ++i) {
                // if (treat[i].lun < 11)
                // treatData[treat[i].code] = parseInt(1);
                // else
                treatData[treat[i].code] = parseInt(treat[i].treat);
            }
            let peopleHistory = new Object();
            let min_axis = new Array();
            let max_axis = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                min_axis.push(9999);
                max_axis.push(-9999);
            }
            for (let i = 0; i < data.length; ++i) {
                if (typeof (peopleHistory[data[i].code]) == 'undefined') {
                    peopleHistory[data[i].code] = new Object();
                }
                peopleHistory[data[i].code]['start' + data[i].biao] = parseFloat(data[i]['start']);
                peopleHistory[data[i].code]['end' + data[i].biao] = parseFloat(data[i]['end']);
                peopleHistory[data[i].code]['net' + data[i].biao] = parseFloat(data[i]['profit']);

                peopleHistory[data[i].code][data[i].biao] = new Array();
                for (let j in lineLegend) {
                    let c = parseFloat(data[i][lineLegend[j] + '_profit']);
                    // if (c == -1263.44)
                    // {
                    //     console.log(data[i]);
                    // }
                    if (c < -200) c = -200;
                    if (c > 200) c = 200;
                    peopleHistory[data[i].code][data[i].biao].push({
                        v: c,
                        x: 0,
                        y: 0,
                        d: parseInt(data[i][lineLegend[j] + '_type']) + 1
                    });

                    max_axis[parseInt(j) - 1] = Math.max(c, max_axis[parseInt(j) - 1]);
                    min_axis[parseInt(j) - 1] = Math.min(c, min_axis[parseInt(j) - 1]);
                }
            }
            // console.log(peopleHistory);
            for (let i = 0; i < max_axis.length; ++i) {
                max_axis[i] = Math.max(Math.abs(max_axis[i]), Math.abs(min_axis[i]));
            }
            // console.log(min_axis);
            // console.log(peopleHistory)
            let compare_g = svgGantt.append('g')
            let p_g = compare_g.append('g');
            p_g.append('text').text("Pattern " + (countType - 1).toString()).attr('dx', '0.5em').attr('dy', '1.2em').attr('font-family', 'Georgia').attr('font-size', 20);
            // let c_width = (widthGantt - 5 * 10) / 4;
            // let c_height = heightGantt - 10 * 2;
            // p_g.append('rect')
            //     .attr('x', 0)
            //     .attr('y', 0)
            //     .attr('width', c_width)
            //     .attr('height', c_height)
            //     .attr('fill', 'none')
            //     .attr('stroke', 'black')
            //     .attr('stroke-opacity', 0.5);
            // console.log(lineLegend.length);
            this.innerRadius = 80;
            this.outerRadius = 165;
            this.cirInnerRadius = 10;
            this.cirOuterRadius = 70;
            let red = Math.PI * 2 / lineLegend.length;
            let line_array = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                let rd = (i * red + Math.PI);
                let x1 = this.innerRadius * Math.cos(rd);
                let y1 = this.innerRadius * Math.sin(rd);

                let x2 = this.outerRadius * Math.cos(rd);
                let y2 = this.outerRadius * Math.sin(rd);


                let line_scale_1 = d3.scaleLinear()
                    .domain([-max_axis[i], max_axis[i]])
                    .range([this.innerRadius, this.outerRadius]);

                for (let j in selectData) {
                    // console.log(selectData[j].id, selectData[j].lun)
                    // console.log(peopleHistory[selectData[j].id])
                    let r1 = line_scale_1(peopleHistory[selectData[j].id][selectData[j].lun][i].v);
                    // console.log(r1)
                    let x = r1 * Math.cos(rd);
                    let y = r1 * Math.sin(rd);
                    // console.log(x, y);
                    // console.log(peopleHistory[selectData[j].id][selectData[j].lun][i])
                    peopleHistory[selectData[j].id][selectData[j].lun][i].x = parseFloat((x).toFixed(2));
                    peopleHistory[selectData[j].id][selectData[j].lun][i].y = parseFloat((y).toFixed(2));
                }

                p_g.append('line')
                    .attr('x1', x1 + c_width / 2)
                    .attr('y1', y1 + 200)
                    .attr('x2', x2 + c_width / 2)
                    .attr('y2', y2 + 200)
                    .attr('stroke', 'black')
                    .attr('stroke-opacity', 0.3)
                    .attr('fill', 'none');
                p_g.append('text')
                    .attr('x', x2 + c_width / 2)
                    .attr('y', y2 + 200)
                    .attr('text-anchor', 'middle')
                    .attr('font-family', 'Georgia')
                    .attr('font-size', 10)
                    .attr('dx', 0)
                    .attr('dy', i <= 5 ? '-0.6em' : '1em')
                    .text(lineLegend[i]);

            }

            for (let i = 0; i < lineLegend.length; ++i) {
                let rd = (Math.PI + i * red);
                let x1 = this.cirInnerRadius * Math.cos(rd);
                let y1 = this.cirInnerRadius * Math.sin(rd);

                let x2 = this.cirOuterRadius * Math.cos(rd);
                let y2 = this.cirOuterRadius * Math.sin(rd);

                const type_scale = d3.scaleLinear()
                    .domain([0, lineType[i] + 1])
                    .range([this.cirInnerRadius, this.cirOuterRadius]);

                for (let j in selectData) {
                    // console.log(selectData[j].id, selectData[j].lun)
                    // console.log(peopleHistory[selectData[j].id])
                    let r1 = type_scale(peopleHistory[selectData[j].id][selectData[j].lun][i].d);
                    // console.log(r1)
                    let x = r1 * Math.cos(rd);
                    let y = r1 * Math.sin(rd);
                    // console.log(x, y);
                    // console.log(peopleHistory[selectData[j].id][selectData[j].lun][i])
                    peopleHistory[selectData[j].id][selectData[j].lun][i].dx = parseFloat((x).toFixed(2));
                    peopleHistory[selectData[j].id][selectData[j].lun][i].dy = parseFloat((y).toFixed(2));
                }

                p_g.append('line')
                    .attr('x1', x1 + c_width / 2)
                    .attr('y1', y1 + 200)
                    .attr('x2', x2 + c_width / 2)
                    .attr('y2', y2 + 200)
                    .attr('stroke', 'black')
                    .attr('stroke-opacity', 0.3)
                    .attr('fill', 'none');
                // if (i != 0 && i != 9)
                //     p_g.append('text')
                //     .attr('x', x2 + c_width / 2)
                //     .attr('y', y2 + 200)
                //     .attr('text-anchor', 'middle')
                //     .attr('font-family', 'Georgia')
                //     .attr('font-size', 10)
                //     .attr('dx', i == 9 ? '-1em' : 0)
                //     .attr('dy', '1em')
                // .text(lineLegend[i]);
                for (let j = 1; j <= lineType[i]; ++j) {
                    p_g.append('circle')
                        .attr('cx', type_scale(j) * Math.cos(rd) + c_width / 2)
                        .attr('cy', type_scale(j) * Math.sin(rd) + 200)
                        .attr('r', 1)
                        .attr('fill', 'red')
                }
            }

            console.log(peopleHistory[selectData[0].id][12]);
            // console.log(selectData);
            let line_d_array = new Array();

            for (let i in selectData) {
                selectData[i]['data'] = peopleHistory[selectData[i].id];
                selectData[i]['treat'] = (parseInt(selectData[i].lun < 11 ? 1 : treatData[selectData[i].id]));
                let ls = new Array();
                const lx = new Array();
                // for (let j = 0; j < 9; ++j) {
                //     line_array.push({
                //         source: {
                //             x: peopleHistory[selectData[i].id][selectData[i].lun][j].x + c_width / 2,
                //             y: peopleHistory[selectData[i].id][selectData[i].lun][j].y + 200
                //         },
                //         target: {
                //             x: peopleHistory[selectData[i].id][selectData[i].lun][j + 1].x + c_width / 2,
                //             y: peopleHistory[selectData[i].id][selectData[i].lun][j + 1].y + 200
                //         }
                //     })
                // }
                for (let j = 0; j < 10; ++j) {
                    ls.push({
                        x: peopleHistory[selectData[i].id][selectData[i].lun][j].x + c_width / 2,
                        y: peopleHistory[selectData[i].id][selectData[i].lun][j].y + 200
                    });
                    lx.push({
                        x: peopleHistory[selectData[i].id][selectData[i].lun][j].dx + c_width / 2,
                        y: peopleHistory[selectData[i].id][selectData[i].lun][j].dy + 200

                    })
                }
                let j = 0;
                ls.push({
                    x: peopleHistory[selectData[i].id][selectData[i].lun][j].x + c_width / 2,
                    y: peopleHistory[selectData[i].id][selectData[i].lun][j].y + 200
                });
                lx.push({
                    x: peopleHistory[selectData[i].id][selectData[i].lun][j].dx + c_width / 2,
                    y: peopleHistory[selectData[i].id][selectData[i].lun][j].dy + 200

                })
                line_d_array.push(ls);
                line_d_array.push(lx);
            }

            // var diagonal = d3.linkVertical()
            var diagonal = d3.linkHorizontal()
                .x(function (d) {
                    return d.x
                })
                .y(function (d) {
                    return d.y
                });
            var lineReg = d3.line()
                .x(d => d.x)
                .y(d => d.y)
                .curve(d3.curveMonotoneX)
            let decisionDiagonal = p_g
                .selectAll("#decisionDiagonal")
                .attr("id", "decisionDiagonal")
                .data(line_d_array)
                .enter()
                .append("path")
                .attr("d", d => {
                    // console.log(d);
                    return lineReg(d);
                })
                .attr("fill", "none")
                .attr("stroke", 'steelblue')
                .attr("stroke-width", '1')
                .attr('stroke-opacity', 0.3);


            // 零线
            var arc_generator = d3.arc()
                .innerRadius((this.innerRadius + this.outerRadius) / 2 - 0.5)
                .outerRadius((this.innerRadius + this.outerRadius) / 2 + 0.5);
            p_g.append('g')
                .attr('transform', 'translate(' + c_width / 2 + ',' + 200 + ')')
                .append('path')
                .attr('d', arc_generator({
                    startAngle: 0,
                    endAngle: Math.PI * 2
                }))
                .attr('fill', 'red')
                .attr('fill-opacity', 0.5)
                .attr('stroke', 'none');

            selectDataObject[(countType - 1)] = selectData;

            let roundCount = new Array();
            for (let i = 1; i <= 20; ++i) {
                roundCount.push(0);
            }
            let treatCount = new Array();
            for (let i = 1; i <= 5; ++i) {
                treatCount.push(0);
            }
            let startCount = new Array();
            for (let i = 1; i <= 2; ++i) {
                startCount.push(0);
            }
            // console.log(selectData)

            for (let i in selectData) {
                roundCount[parseInt(selectData[i].lun) - 1]++;
                treatCount[parseInt(selectData[i].treat) - 1]++;
                startCount[(parseFloat(selectData[i].data['start' + selectData[i].lun]) > 0) ? 1 : 0]++;
                // console.log(parseInt(selectData[i].treat))
            }

            // drawHorizon(roundCount, 'Round Number', 0, 0 + 380, compare_g);

            // drawHorizon(treatCount, 'Policy', move_x, move_y + 210);
            // drawHorizon(startCount, 'Initial Wealth', move_x, move_y + 260);
            // drawHorizon(treatCount, 'Treatment', move_x, move_y + 310);
            drawArea(compare_g, selectData, move_y + 450);
        })
    })
}

// let curveLine_g = 0;
function reDrawCurve(p_num) {
    console.log("#a" + (p_num).toString());
    let process = document.getElementById('set' + (p_num).toString()).value;
    let round_num = document.getElementById('sex' + (p_num).toString()).value;
    d3.selectAll("#a" + (p_num).toString()).remove();
    DrawCurveLine(selectDataObject[p_num], 10 + (p_num - 1) * (c_width + 10), 10 + 340, process, round_num, p_num);
}

function DrawCurveLine(selectData, move_x, move_y, process, round_num, p_num) {
    // if (curveLine_g != 0) {
    //     curveLine_g.remove();
    //     curveLine_g = 0;
    // }
    // console.log((parseInt(selectData[0].lun) - round_num));
    let curveLine_g = compare_g.append('g').attr('id', 'a' + (p_num).toString()).attr('transform', 'translate(' + move_x + ',' + (move_y) + ')');
    let max_y = -9999;
    let min_y = 9999;
    let line_select_array = new Array();
    for (let i in selectData) {
        let cnt = round_num;
        let tmp_array = new Array();
        for (let j = parseInt(selectData[i].lun); j > (parseInt(selectData[i].lun) - round_num > 0 ? parseInt(selectData[i].lun) - round_num : 0); --j) {
            // console.log(selectData[i].data, j, selectData[i].data[j]);
            let k;
            console.log(selectData[i])
            if (process >= 0 && process <= 9) {
                k = parseFloat(selectData[i].data[j][process].v);
            }
            if (process == 10) {
                k = parseFloat(selectData[i].data['start' + (j).toString()]);
                console.log(k);
            }
            if (process == 11) {
                k = parseFloat(selectData[i].data['net' + (j).toString()]);
            }
            if (process == 12) {
                k = parseFloat(selectData[i].data['end' + (j).toString()]);
            }
            // console.log(k);
            max_y = Math.max(k, max_y);
            min_y = Math.min(k, min_y);
            tmp_array.push({
                x: cnt,
                y: k
            });
            cnt--;
        }
        line_select_array.push(tmp_array);
    }
    // max_y = Math.max(Math.abs)

    let scale_x = d3.scaleLinear()
        .domain([1, round_num])
        .range([30, c_width - 30]);
    let scale_y = d3.scaleLinear()
        .domain([min_y, max_y])
        .range([100, 10]);


    var line_generator = d3.line()
        .x(function (d) {
            return scale_x(d.x);
        })
        .y(function (d) {
            return scale_y(d.y);
        })
        .curve(d3.curveMonotoneX)
    // .curve(d3.curveMonotoneX) // apply smoothing to the line
    // curveLine_g
    // console.log(max_y);
    // console.log(min_y);
    // console.log(yAxis);
    // let yAxis = (max_y < 0 ? max_y : (min_y > 0 ? min_y : 0));
    //X轴
    curveLine_g.append("g")
        .call(d3.axisBottom(scale_x).ticks(round_num))
        .attr("transform", "translate(0," + scale_y(min_y) + ")");

    //Y轴
    curveLine_g.append("g")
        .call(d3.axisLeft(scale_y).ticks(5))
        .attr("transform", "translate(30," + 0 + ")")
    curveLine_g.append('g')
        .selectAll('#curLine')
        .attr('id', 'curLine')
        .data(line_select_array)
        .enter()
        .append('path')
        .attr('d', d => {
            // console.log(d);
            return line_generator(d);
        })
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-opacity', 0.5);
}

function drawHorizon(roundCount, h_name, move_x, move_y, compare_g) {
    // let roundCount = new Array();
    // console.log(roundCount)
    let max_people = 0;

    for (let i = 0; i < roundCount.length; ++i) {
        // roundCount.push(0);
        max_people = Math.max(max_people, roundCount[i])
    }
    let horizon_g = compare_g.append('g').attr('transform', 'translate(' + move_x + ',' + (move_y) + ')');
    let people_scale = d3.scaleLinear()
        .domain([0, max_people])
        .range([0, -90]);
    let x_scale = d3.scaleLinear()
        .domain([0 + 1, roundCount.length - 1 + 1])
        .range([30, c_width - 10]);

    // //画面积函数
    let color_scale = d3.scaleOrdinal()
        .domain([0, 1, 2])
        .range(['orange', 'rgb(240, 189, 134)', 'rgb(243, 96, 102)'])
    var area_generator = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale(d);
        })
        .curve(d3.curveMonotoneX)


    for (let i = 0; i < 3; ++i) {
        horizon_g.append('g')
            .attr('clip-path', 'url(#h1)')
            .append("path")
            .attr("d", area_generator(roundCount)) //d="M1,0L20,40.....  d-path data
            .attr('transform', 'translate(0, ' + ((i + 1) * 30) + ')')
            .attr('fill-opacity', 0.5)
            .style("fill", color_scale(i))
    }
    // console.log(roundCount.length);
    horizon_g.append("g")
        .call(d3.axisBottom(x_scale).ticks(roundCount.length))
        .attr("transform", "translate(0," + 30 + ")");
    horizon_g.append('clipPath')
        .attr('id', 'h1')
        .append('rect')
        .attr('width', c_width)
        .attr('height', 30);

    horizon_g.append('text')
        .attr('x', 5)
        .attr('y', 0)
        .attr('dy', '1em')
        .attr('font-family', 'Georgia')
        .text(h_name);


}

function drawArea(paint_g, area_data, move_y) {
    // console.log(area_data);
    let area_g = paint_g.append('g').attr('transform', 'translate(' + 0 + ',' + (move_y) + ')');
    const timeLine = new Array();
    for (let i = 0; i < 20; ++i) {
        timeLine.push(0);
    }
    let max_people = 0;
    for (let i in area_data) {
        timeLine[parseInt(area_data[i].lun) - 1]++;
        max_people = Math.max(max_people, timeLine[parseInt(area_data[i].lun) - 1]);
    }
    console.log(timeLine);
    let x_scale = d3.scaleLinear()
        .domain([0 + 1, 20])
        .range([10, c_width - 10]);
    let people_scale = d3.scaleLinear()
        .domain([0, max_people])
        .range([0, -80]);
    var area_generator = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale(d);
        })
        .curve(d3.curveMonotoneX)
    area_g.append('path')
        .attr('d', area_generator(timeLine))
        .attr('fill', 'rgb(237, 240, 240)')
    // .attr('fill-opacity', 0.5);
    area_g.append("g")
        .call(d3.axisBottom(x_scale).ticks(20))
        .attr("transform", "translate(0," + 0 + ")");
}

// drawPattern(0, 10, [{
//     id: 'pva278uh',
//     lun: 12
// }]);