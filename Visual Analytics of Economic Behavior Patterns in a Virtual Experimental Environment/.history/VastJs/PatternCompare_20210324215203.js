// var lineLegend = ['Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'URPI'];
var lineLegend = ['Work', 'Health', 'Repay', 'Loan', 'Investment', 'Venture', 'Insurance', 'Lottery', 'Disaster', 'Ill', 'Preference', 'Patience'];
var lineLegendType = ['Work', 'Health Investment', 'Repayment', 'Loan', 'Investment', 'Venture', 'Insurance', 'Lottery', 'Disaster', 'Illness', 'Risk Preference', 'Intertemporal Choice'];
var lineLegendType_2 = ['Work', 'Heal', 'Rep', 'Loan', 'Inv', 'Vent', 'Ins', 'Lot', 'Dis', 'Ill', 'Risk', 'Pat'];
var lineNameLegend = [
    ['Employment', 'Unemployment'],
    ['No', 'Low', 'High'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Low', 'Mid', 'High'],
    ['NO', 'Low', 'Mid', 'High'],
    ['1-level', '2-level', '3-level', '4-level', '5-level', '6-level', '7-level'],
    ['No', 'Yes']
];
var lineType = [2, 3, 2, 2, 2, 2, 2, 2, 4, 4, 7, 2];
var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;
// svgGantt = d3.select("#ganttView").append("svg")
//     .attr("width", widthGantt)
//     .attr("height", heightGantt);

// let compare_g = svgGantt.append('g').attr('class', 'svgBorder');
let c_width = (widthGantt - 3 * 10) / 4;
let c_height = heightGantt - 30;
let selectDataObject = new Object();
let max_people_array = new Array();
let max_profit_array = new Array();
let min_profit_array = new Array();
let max_profit_sum = -99999;
let min_profit_sum = 99999;

function drawPattern(move_x, move_y, selectData, flag) {
    d3.csv('data/newdata_for_line.csv').then(data => {
        d3.csv('data/treatment.csv').then(treat => {
            console.log(selectData);
            if (flag == 1) clusterSelect++;
            else if (flag == 0) rectSelect++;
            // console.log(selectData);
            // let c_height = heightGantt - 20;
            // console.log(parseInt(move_x) * 20)

            svgGantt = d3.select("#ganttView").append("svg")
                .attr("width", c_width)
                .attr("height", c_height)
                .attr('class', 'framework')
                .attr("id", "PatternSvg" + (countType - 1).toString())
                .attr('transform', 'translate(' + (parseInt(move_x) * 10) + ',' + move_y + ')');
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

                    // if (c < -200) c = -200;
                    // if (c > 200) c = 200;
                    peopleHistory[data[i].code][data[i].biao].push({
                        v: c,
                        x: 0,
                        y: 0,
                        d: parseInt(data[i][lineLegend[j] + '_type']) + 1
                    });

                    max_axis[parseInt(j)] = Math.max(c, max_axis[parseInt(j)]);
                    min_axis[parseInt(j)] = Math.min(c, min_axis[parseInt(j)]);
                }
            }
            // console.log(peopleHistory);
            for (let i = 0; i < max_axis.length; ++i) {
                max_axis[i] = Math.max(Math.abs(max_axis[i]), Math.abs(min_axis[i]));
            }
            // console.log(max_axis)
            // console.log(min_axis);
            // console.log(peopleHistory)
            let compare_g = svgGantt.append('g').attr('id', 'g' + move_x.toString());
            let p_g = compare_g.append('g');
            p_g.append('text').text("Pattern " + (countType - 1).toString()).attr('dx', '0.5em').attr('dy', '1.2em').attr('font-family', 'Georgia').attr('font-size', 20).attr('font-weight', 'bold');
            // console.log(typeColor[countType - 1])
            // p_g.append('rect').attr('x', c_width - 50).attr('y', 10).attr('width', 30).attr('height', 20).attr("fill", typeColor[countType - 2]);
            drawWealthLegend(countType - 2, flag);
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
            this.innerRadius = (c_width - 20) / 5;
            this.outerRadius = (c_width - 20) / 2.1;
            this.cirInnerRadius = (c_width - 20) / 25;
            this.cirOuterRadius = (c_width - 20) / 5 - 10
            let changHight = c_height - this.outerRadius - 50;
            let red = Math.PI * 2 / lineLegend.length;
            let line_array = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                let rd = (i * red + Math.PI);
                let x1 = this.innerRadius * Math.cos(rd);
                let y1 = this.innerRadius * Math.sin(rd);

                let x2 = this.outerRadius * Math.cos(rd);
                let y2 = this.outerRadius * Math.sin(rd);



                let line_scale_1 = d3.scaleLinear()
                    .domain([0, max_axis[i]])
                    .range([1, 100])
                let line_scale_log_1 = d3.scaleLinear()
                    .domain([0, 2])
                    .range([this.innerRadius + (this.outerRadius - this.innerRadius) / 2, this.outerRadius]);
                let line_scale_log_2 = d3.scaleLinear()
                    .domain([0, 2])
                    .range([this.innerRadius + (this.outerRadius - this.innerRadius) / 2, this.innerRadius]);

                for (let j in selectData) {
                    // console.log(selectData[j].id, selectData[j].lun)
                    // if (i == 4)
                    // console.log(peopleHistory[selectData[j].id])
                    let v = peopleHistory[selectData[j].id][selectData[j].lun][i].v;
                    let r1;
                    if (v >= 0)
                        r1 = line_scale_log_1(Math.log10(line_scale_1(v)));
                    else
                        r1 = line_scale_log_2(Math.log10(line_scale_1(-v)));
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
                    .attr('y1', y1 + changHight)
                    .attr('x2', x2 + c_width / 2)
                    .attr('y2', y2 + changHight)
                    .attr('stroke', 'black')
                    .attr('stroke-opacity', 0.3)
                    .attr('fill', 'none');
                let mv = 0;
                if (i == 1) mv = '0.5em';
                if (i == 6) mv = '-1em';
                if (i == 11) mv = '1.5em';
                p_g.append('text')
                    .attr('x', x2 + c_width / 2)
                    .attr('y', y2 + changHight)
                    .attr('text-anchor', 'middle')
                    .attr('font-family', 'Georgia')
                    .attr('font-size', 13)
                    // .attr('font-weight', 'bold')
                    .attr('dx', mv)
                    .attr('dy', i <= 6 ? '-0.6em' : '1em')
                    .text(lineLegendType[i]);

            }
            let count_type_array = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                let rd = (Math.PI + i * red);
                let x1 = this.cirInnerRadius * Math.cos(rd);
                let y1 = this.cirInnerRadius * Math.sin(rd);

                let x2 = this.cirOuterRadius * Math.cos(rd);
                let y2 = this.cirOuterRadius * Math.sin(rd);

                const type_scale = d3.scaleLinear()
                    .domain([1, lineType[i]])
                    .range([this.cirInnerRadius + (this.cirOuterRadius - this.cirInnerRadius) / 6, this.cirOuterRadius - (this.cirOuterRadius - this.cirInnerRadius) / 6]);
                let count_type_object = new Object();
                for (let j in selectData) {
                    // console.log(selectData[j].id, selectData[j].lun)
                    // console.log(peopleHistory[selectData[j].id])
                    let r1 = type_scale(peopleHistory[selectData[j].id][selectData[j].lun][i].d);
                    // console.log(r1)
                    if (typeof (count_type_object[peopleHistory[selectData[j].id][selectData[j].lun][i].d]) == 'undefined') {
                        count_type_object[peopleHistory[selectData[j].id][selectData[j].lun][i].d] = 0;
                    }
                    let x = r1 * Math.cos(rd);
                    let y = r1 * Math.sin(rd);
                    count_type_object[peopleHistory[selectData[j].id][selectData[j].lun][i].d]++;
                    // console.log(x, y);
                    // console.log(peopleHistory[selectData[j].id][selectData[j].lun][i])
                    peopleHistory[selectData[j].id][selectData[j].lun][i].dx = parseFloat((x).toFixed(2));
                    peopleHistory[selectData[j].id][selectData[j].lun][i].dy = parseFloat((y).toFixed(2));
                    peopleHistory[selectData[j].id][selectData[j].lun][i].d1 = i.toString();
                    peopleHistory[selectData[j].id][selectData[j].lun][i].d2 = peopleHistory[selectData[j].id][selectData[j].lun][i].d.toString();
                }

                let max_type_number = 0;
                let max_type_cnt = 0;
                for (let j in count_type_object) {
                    if (max_type_number < count_type_object[j]) {
                        max_type_number = Math.max(count_type_object[j], max_type_number);
                        max_type_cnt = parseInt(j);
                    }
                }
                count_type_array.push(max_type_cnt);

                p_g.append('line')
                    .attr('x1', x1 + c_width / 2)
                    .attr('y1', y1 + changHight)
                    .attr('x2', x2 + c_width / 2)
                    .attr('y2', y2 + changHight)
                    .attr('stroke', 'black')
                    .attr('stroke-opacity', 0.3)
                    .attr('fill', 'none');
                // if (i != 0 && i != 9)
                //     p_g.append('text')
                //     .attr('x', x2 + c_width / 2)
                //     .attr('y', y2 + changHight)
                //     .attr('text-anchor', 'middle')
                //     .attr('font-family', 'Georgia')
                //     .attr('font-size', 10)
                //     .attr('dx', i == 9 ? '-1em' : 0)
                //     .attr('dy', '1em')
                // .text(lineLegend[i]);
                for (let j = 1; j <= lineType[i]; ++j) {
                    p_g.append('circle')
                        .attr('cx', type_scale(j) * Math.cos(rd) + c_width / 2)
                        .attr('cy', type_scale(j) * Math.sin(rd) + changHight)
                        .attr('r', 1)
                        .attr('fill', 'red')
                }
                // console.log(lineNameLegend[i]);
                // console.log(max_type_cnt);
            }

            // console.log(peopleHistory[selectData[0].id][12]);
            // console.log(selectData);
            let line_d_array = new Array();
            let line_type_width = new Object();
            let line_max = 0,
                line_min = 9999;

            for (let i in selectData) {
                selectData[i]['data'] = peopleHistory[selectData[i].id];
                selectData[i]['treat'] = (parseInt(selectData[i].lun < 11 ? 1 : treatData[selectData[i].id]));
                selectData[i]['profit'] = peopleHistory[selectData[i].id]['net' + (selectData[i].lun).toString()];
                let ls = new Array();
                const lx = new Array();
                // for (let j = 0; j < 9; ++j) {
                //     line_array.push({
                //         source: {
                //             x: peopleHistory[selectData[i].id][selectData[i].lun][j].x + c_width / 2,
                //             y: peopleHistory[selectData[i].id][selectData[i].lun][j].y + changHight
                //         },
                //         target: {
                //             x: peopleHistory[selectData[i].id][selectData[i].lun][j + 1].x + c_width / 2,
                //             y: peopleHistory[selectData[i].id][selectData[i].lun][j + 1].y + changHight
                //         }
                //     })
                // }
                for (let j = 0; j < lineLegend.length; ++j) {
                    ls.push({
                        x: peopleHistory[selectData[i].id][selectData[i].lun][j].x + c_width / 2,
                        y: peopleHistory[selectData[i].id][selectData[i].lun][j].y + changHight,
                        id: selectData[i].id,
                        round: selectData[i].lun,
                        cntT: countType - 1
                    });
                    lx.push({
                        x: peopleHistory[selectData[i].id][selectData[i].lun][j].dx + c_width / 2,
                        y: peopleHistory[selectData[i].id][selectData[i].lun][j].dy + changHight,
                        d1: peopleHistory[selectData[i].id][selectData[i].lun][j].d1,
                        d2: peopleHistory[selectData[i].id][selectData[i].lun][j].d2
                    })
                }
                let j = 0;
                ls.push({
                    x: peopleHistory[selectData[i].id][selectData[i].lun][j].x + c_width / 2,
                    y: peopleHistory[selectData[i].id][selectData[i].lun][j].y + changHight,
                    id: selectData[i].id,
                    round: selectData[i].lun,
                    cntT: countType - 1
                });
                lx.push({
                    x: peopleHistory[selectData[i].id][selectData[i].lun][j].dx + c_width / 2,
                    y: peopleHistory[selectData[i].id][selectData[i].lun][j].dy + changHight,
                    d1: peopleHistory[selectData[i].id][selectData[i].lun][j].d1,
                    d2: peopleHistory[selectData[i].id][selectData[i].lun][j].d2

                })
                // console.log(ls);
                line_d_array.push(ls);
                // line_d_array.push(lx);
                // console.log((lx.length).toString());
                for (let j = 0; j < lx.length - 1; ++j) {
                    // console.log(lx[j])
                    if (typeof (line_type_width[lx[j].d1 + lx[j].d2 + lx[j + 1].d1 + lx[j + 1].d2]) == 'undefined') {
                        line_type_width[lx[j].d1 + lx[j].d2 + lx[j + 1].d1 + lx[j + 1].d2] = {
                            p: [lx[j], lx[j + 1]],
                            w: 0
                        };
                    }
                    line_type_width[lx[j].d1 + lx[j].d2 + lx[j + 1].d1 + lx[j + 1].d2].w++;
                    line_max = Math.max(line_max, line_type_width[lx[j].d1 + lx[j].d2 + lx[j + 1].d1 + lx[j + 1].d2].w);
                    line_min = Math.min(line_min, line_type_width[lx[j].d1 + lx[j].d2 + lx[j + 1].d1 + lx[j + 1].d2].w);
                }
            }
            // console.log(line_type_width);
            let w_scale = d3.scaleLinear()
                .domain([line_min, line_max])
                .range([0.1, 5]);
            let type_code = new Object();
            let lineType_code = new Array();
            let type_data = new Array();
            let type_w = new Array();
            for (let i in line_type_width) {
                type_data.push(line_type_width[i].p);
                type_w.push(line_type_width[i].w);
                let name_to_type;
                if (i.length == 4) {
                    name_to_type = i[0] + i[2];
                } else if (i.length == 5) {
                    if (i[0] == '1')
                        name_to_type = i[0] + i[1] + i[3];
                    else name_to_type = i[0] + i[2] + i[3];
                } else name_to_type = i[0] + i[1] + i[3] + i[4];
                lineType_code.push(name_to_type);
                if (typeof (type_code[name_to_type]) == 'undefined') {
                    type_code[name_to_type] = 0;
                }
                if (line_type_width[i].w > type_code[name_to_type]) {
                    type_code[name_to_type] = line_type_width[i].w;
                }
            }
            // for (let i in lineType_code) {
            //     console.log(lineType_code[i], type_w[i], type_code[lineType_code[i]])
            //     console.log(type_w[i] == type_code[lineType_code[i]])
            // }

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
                .attr('id', 'curve' + (countType - 1).toString())
                .attr("d", d => {
                    // console.log(d);
                    return lineReg(d);
                })
                .attr("fill", "none")
                .attr("stroke", 'steelblue')
                .attr("stroke-width", 1)
                .attr('stroke-opacity', 0.3)
                .on('mouseover', d => {
                    d3.selectAll('#curve' + d[0].cntT.toString())
                        .attr('stroke-opacity', x => {
                            if (x == d) return 1;
                            else return 0.1;
                        });
                })
                .on('mouseout', d => {
                    d3.selectAll('#curve' + d[0].cntT.toString())
                        .attr('stroke-opacity', x => {
                            return 0.3;
                        });
                })
                .on('click', d => {
                    drawFlower(d[0].id);
                    drawPersonalHorizon(d[0].id);
                })
            // console.log(type_data);

            p_g
                .selectAll("#decisionDiagonal")
                .attr("id", "decisionDiagonal")
                .data(type_data)
                .enter()
                .append("path")
                .attr("d", d => {
                    // console.log(d);
                    return lineReg(d);
                })
                .attr("fill", "none")
                .attr("stroke", 'steelblue')
                .attr("stroke-width", (d, i) => w_scale(type_w[i]))
                .attr('stroke-opacity', (d, i) => (type_w[i] == type_code[lineType_code[i]] ? 1 : 0.5));

            // 零线
            var arc_generator = d3.arc()
                .innerRadius((this.innerRadius + this.outerRadius) / 2 - 0.5)
                .outerRadius((this.innerRadius + this.outerRadius) / 2 + 0.5);
            p_g.append('g')
                .attr('transform', 'translate(' + c_width / 2 + ',' + changHight + ')')
                .append('path')
                .attr('d', arc_generator({
                    startAngle: 0,
                    endAngle: Math.PI * 2
                }))
                .attr('fill', 'red')
                .attr('fill-opacity', 0.5)
                .attr('stroke', 'none');

            for (let i = 0; i < count_type_array.length; ++i) {
                let rd = (Math.PI + i * red);
                let x1 = this.cirInnerRadius * Math.cos(rd);
                let y1 = this.cirInnerRadius * Math.sin(rd);

                let x2 = (this.cirOuterRadius + 10) * Math.cos(rd);
                let y2 = (this.cirOuterRadius + 10) * Math.sin(rd);

                // console.log(i, count_type_array[i], lineNameLegend[i][count_type_array[i] - 1])

                p_g.append('text')
                    .attr('x', x2 + c_width / 2)
                    .attr('y', y2 + changHight)
                    .attr('text-anchor', 'middle')
                    .attr('font-family', 'Georgia')
                    .attr('font-size', 12)
                    // .attr('font-weight', 'bold')
                    .attr('dx', i != 6 ? 0 : 0)
                    .attr('dy', i <= 6 ? '-0.1em' : '0.5em')
                    .text(lineNameLegend[i][count_type_array[i] - 1]);
            }

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
            // console.log(selectData);



            const timeLine = new Array();
            const profitLine = new Array();
            for (let i = 0; i < 20; ++i) {
                timeLine.push(0);
                profitLine.push(0);
            }
            let max_people = 0;
            let max_profit = 0;
            let min_profit = 99999;
            for (let i in selectData) {
                timeLine[parseInt(selectData[i].lun) - 1]++;
                profitLine[parseInt(selectData[i].lun) - 1] += parseFloat(selectData[i].profit);
                // console.log(selectData[i].profit, selectData[i].lun);
                max_people = Math.max(max_people, timeLine[parseInt(selectData[i].lun) - 1]);
            }
            max_people_array.push(max_people);
            max_people_sum = Math.max(max_people, max_people_sum);
            for (let i in timeLine) {
                if (timeLine[i] != 0)
                    profitLine[i] /= timeLine[i];
                profitLine[i] = parseFloat(profitLine[i].toFixed(2));
                max_profit = Math.max(max_profit, profitLine[i]);
                min_profit = Math.min(min_profit, profitLine[i]);
            }
            max_profit_sum = Math.max(max_profit_sum, max_profit);
            min_profit_sum = Math.min(min_profit_sum, min_profit);
            max_profit_array.push(max_profit);
            min_profit_array.push(min_profit);

            // console.log(max_people_sum);
            // console.log(profitLine);

            drawArea(compare_g, timeLine, profitLine, max_people, max_profit, min_profit, 200, move_x);
        })
    })
}

function drawGlobalPattern() {
    let xx_scale = d3.scaleLinear()
        .domain([0 + 1, 20])
        .range([30, c_width - 30]);
    let ppeople_scale = d3.scaleLinear()
        .domain([0, max_people_sum])
        .range([0, -150]);
    var area_generator = d3.area()
        .x(function (d, i) {
            return xx_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return ppeople_scale(d);
        })
        .curve(d3.curveMonotoneX)
    let pprofit_scale = d3.scaleLinear()
        .domain([min_profit_sum > 0 ? 0 : min_profit_sum, max_profit_sum < 0 ? 0 : max_profit_sum])
        .range([0, -150]);
    var line_generator = d3.line()
        .x(function (d, i) {
            return xx_scale(i + 1);
        })
        .y(function (d, i) {
            return pprofit_scale(d);
        })
        .curve(d3.curveMonotoneX);
    for (let i = 0; i <= parseInt(countType - 2); ++i) {
        d3.select('#ap' + i.toString())
            .transition()
            // .delay(750)
            .attr('d', d => area_generator(d));

        // let people_scale = d3.scaleLinear()
        //     .domain([0, max_people_array[i]])
        //     .range([0, ppeople_scale(max)]);
        d3.select('#ag' + i.toString())
            .transition()
            // .delay(750)
            .call(d3.axisLeft(ppeople_scale).ticks(2));
        d3.select('#alp' + i.toString())
            .transition()
            .attr('d', d => line_generator(d));
        d3.select('#alpg' + i.toString())
            .transition()
            .call(d3.axisRight(pprofit_scale).ticks(2));
        if (pprofit_scale.domain()[0] == 0) {
            d3.select('#aline' + i.toString()).attr('stroke-opacity', 0);
        } else {
            d3.select('#aline' + i.toString()).attr('stroke-opacity', 1)
                .attr('y1', pprofit_scale(0))
                .attr('y2', pprofit_scale(0));
        }
    }
}

function drawPrivatePattern() {
    let xx_scale = d3.scaleLinear()
        .domain([0 + 1, 20])
        .range([30, c_width - 30]);
    for (let i = 0; i < parseInt(countType - 1); ++i) {
        let ppeople_scale = d3.scaleLinear()
            .domain([0, max_people_array[i]])
            .range([0, -150]);
        var area_generator = d3.area()
            .x(function (d, i) {
                return xx_scale(i + 1);
            })
            .y0(0)
            .y1(function (d) {
                return ppeople_scale(d);
            })
            .curve(d3.curveMonotoneX);

        let pprofit_scale = d3.scaleLinear()
            .domain([min_profit_array[i] > 0 ? 0 : min_profit_array[i], max_profit_array[i] < 0 ? 0 : max_profit_array[i]])
            .range([0, -150]);

        var line_generator = d3.line()
            .x(function (d, i) {
                return xx_scale(i + 1);
            })
            .y(function (d, i) {
                return pprofit_scale(d);
            })
            .curve(d3.curveMonotoneX);
        d3.select('#ap' + i.toString())
            .transition()
            // .delay(750)
            .attr('d', d => area_generator(d));
        d3.select('#ag' + i.toString())
            .transition()
            // .delay(750)
            .call(d3.axisLeft(ppeople_scale).ticks(2));
        d3.select('#alp' + i.toString())
            .transition()
            .attr('d', d => line_generator(d));
        d3.select('#alpg' + i.toString())
            .transition()
            .call(d3.axisRight(pprofit_scale).ticks(2));
        if (pprofit_scale.domain()[0] == 0) {
            d3.select('#aline' + i.toString()).attr('stroke-opacity', 0);
        } else {
            d3.select('#aline' + i.toString()).attr('stroke-opacity', 1)
                .attr('y1', pprofit_scale(0))
                .attr('y2', pprofit_scale(0));
        }
    }
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
        .range([0, -60]);
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

var max_people_sum = 0;

function drawArea(paint_g, timeLine, profitLine, max_people, max_profit, min_profit, move_y, id) {
    // console.log(area_data);
    // console.log(d3.select('area' + id).remove());
    let area_g = paint_g.append('g').attr('id', 'area' + id).attr('transform', 'translate(' + 0 + ',' + (move_y) + ')');
    // console.log(timeLine);
    let x_scale = d3.scaleLinear()
        .domain([0 + 1, 20])
        .range([30, c_width - 30]);
    let people_scale = d3.scaleLinear()
        .domain([0, max_people])
        .range([0, -150]);
    let profit_scale = d3.scaleLinear()
        .domain([min_profit > 0 ? 0 : min_profit, max_profit < 0 ? 0 : max_profit])
        .range([0, -150]);
    var area_generator = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale(d);
        })
        .curve(d3.curveMonotoneX)
    var line_generator = d3.line()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y(function (d, i) {
            return profit_scale(d);
        })
        .curve(d3.curveMonotoneX);
    area_g.append("g").selectAll('#area_path' + id)
        .attr('id', 'area_path' + id)
        .data([timeLine])
        .enter()
        .append('path')
        .attr('id', 'ap' + id)
        .attr('d', d => area_generator(d))
        .attr('fill', 'rgb(237, 240, 240)')
    // console.log(profitLine);
    area_g.append("g").selectAll("#line_area_path" + id)
        .attr('id', 'line_area_path' + id)
        .data([profitLine])
        .enter()
        .append('path')
        .attr('id', 'alp' + id)
        .attr('d', d => line_generator(d))
        .attr('fill', 'none')
        .attr('stroke', 'steelblue');
    // .attr('fill-opacity', 0.5);
    area_g.append('g')
        .attr('id', 'ag' + id)
        .call(d3.axisLeft(people_scale).ticks(2))
        .attr('transform', `translate(${x_scale(1)}, 0)`)
    let zero_line_g = area_g.append('g')
        .append('line')
        .attr('id', 'aline' + id)
        .attr('x1', x_scale(1))
        .attr('x2', x_scale(20))
        .attr('y1', profit_scale(0))
        .attr('y2', profit_scale(0))
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', 5.5);
    if (profit_scale.domain()[0] == 0) {
        zero_line_g.attr('stroke-opacity', 0);
    }

    area_g.append('g')
        .attr('id', 'alpg' + id)
        .call(d3.axisRight(profit_scale).ticks(2))
        .attr('transform', `translate(${x_scale(20)}, 0)`);
    area_g.append('text')
        .attr('x', x_scale(1))
        .attr('y', -155)
        .attr('font-family', 'Georgia')
        .attr('dx', '-1.5em')
        // .attr('text-anchor', 'middle')
        .text("Number of People");
    area_g.append('text')
        .attr('x', x_scale(20))
        .attr('y', -155)
        .attr('font-family', 'Georgia')
        .attr('text-anchor', 'middle')
        .text('Profit')
    area_g.append("g")
        .call(d3.axisBottom(x_scale).ticks(20))
        .attr("transform", "translate(0," + 0 + ")");
}

drawPattern(0, 10, [{
    id: 'pva278uh',
    lun: 12
}]);