// const heightIndividual = document.getElementById("individual").offsetHeight;
// const widthIndividual = document.getElementById("individual").offsetWidth;
const heightHorizonLegend = document.getElementById('hLegend').offsetHeight;
const widthHorizonLegend = document.getElementById('hLegend').offsetWidth;
const widthHorizonMain = document.getElementById('hMain').offsetWidth;
const heightHorizonMain = document.getElementById('hMain').offsetHeight;
const heightFlower = document.getElementById('flowerView').offsetHeight;
const widthFlower = document.getElementById('flowerView').offsetWidth;

var wealth_g;

function drawWealthCircle(select_data, type) {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        // console.log(wealth_data);
        const nameSpace = new Object();
        let select_people_data = new Array();
        wealth_data.forEach(function (d) {
            if (typeof (nameSpace[d.code]) == 'undefined') {
                nameSpace[d.code] = {
                    round: new Object(),
                    wealth: [{
                        x: 0,
                        y: 0
                    }],
                    id: d.code,
                };
            }
            if (parseFloat(d['end']) < -600) d['end'] = -600;
            if (parseFloat(d['end']) > 600) d['end'] = 600;
            nameSpace[d.code]['round'][d.biao] = parseFloat(d['end']);
            nameSpace[d.code]['wealth'].push({
                x: parseInt(d.biao),
                y: parseFloat(d['end'])
            });
        })
        for (let i in select_data) {
            let d_s = select_data[i];
            // console.log(nameSpace[d_s.id])
            select_people_data.push(nameSpace[d_s.id]['wealth'][parseInt(d_s.lun)]);
        }
        // console.log(nameSpace['pva278uh']);
        wealth_g.selectAll('#newTypeCircle')
            .attr('id', 'newTypeCircle')
            .data(select_people_data)
            .enter()
            .append('circle')
            .attr('cx', d => this.x_scale_wealth(d.x))
            .attr('cy', d => this.y_scale_wealth(d.y))
            .attr('r', 2)
            .attr('fill', typeColor[type]);
    })
}

// const color_wealth = ['#18472C', '#009543', '#A6DEC1', 'orange', 'rgb(240, 189, 134)', 'rgb(243, 96, 102)']
const color_wealth = ['#18472C', '#009543', '#A6DEC1', '#ffc07b', '#ff9966', '#ff6666'];

let max_wealth_max = 0;
let max_wealth_array = new Array();
let max_receive = -9999;
let min_receive = 9999;
let max_receive_array = new Array();
let min_receive_array = new Array();

let color_type_text_array = ['67% - 100%', '34% - 66%', '0% - 33%', '-33% - 0%', '-66% - -34%', '-100% - -67%'];

let is_general = 0;

drawColorLegend();

function drawColorLegend() {
    const svgFlower = d3.select('#hLegend')
        .append('svg')
        .attr('width', widthHorizonLegend)
        .attr('height', heightHorizonLegend)
        // .attr('class', 'framework')
        .attr('transform', `translate(42, 0)`);
    svgFlower.append('text')
        .text('Profit:')
        .attr('x', 20)
        .attr('y', 33)
        .attr('font-size', 18)
        // .attr('text-anchor', 'middle')
        .attr('font-family', 'STHeiti');
    for (let i in color_type_text_array) {
        svgFlower.append('text')
            .attr('x', 130 + i * 155)
            .attr('y', 14)
            .attr('font-size', 18)
            .attr('xml:space', 'preserve')
            // .attr('font-family', 'STHeiti')
            .attr('dy', '1em')
            .text(color_type_text_array[5 - i]);
        // svgFlower.append("rect")
        //     .attr("x", 85 + i * 155)
        //     .attr("y", 14)
        //     .attr("width", 40)
        //     .attr("height", 24)
        //     .attr("fill", color_wealth[5 - i]);
        svgFlower.append("circle")
            .attr("cx", 105 + i * 155)
            .attr("cy", 25)
            // .attr("width", 40)
            // .attr("height", 24)
            .attr("r", 10)
            .attr("fill", color_wealth[5 - i]);
    }

    // svgFlower.selectAll('#coloRect')
    //     .attr('id', 'colorRect')
    //     .data(color_wealth)
    //     .enter()
    //     .append('rect')
    //     .attr('x', (d, i) => 90 + 148 * i)
    //     .attr('y', (d, i) => {
    //         return 14;
    //     })
    //     .attr('width', 40)
    //     .attr('height', 24)
    //     .attr('fill', (d, i) => d)
}


function drawWealthLine() {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        this.height = heightFlower;
        this.width = widthFlower;
        this.min_wealth = -600;
        this.max_wealth = 600;
        this.margin = {
            left: 40,
            right: 40,
            top: 40,
            bottom: 70
        }
        if (document.getElementById("flowerSvg") != null) {
            d3.select("#flowerSvg").remove();
        }

        const svgWealth = d3.select('#flowerView').append('svg')
            .attr("id", "flowerSvg")
            .attr('height', this.height)
            .attr('width', this.width);
        wealth_g = svgWealth.append('g');
        // console.log(wealth_data);
        const roundData = new Array(20);
        const box_data = new Array(20);
        for (let i = 0; i < 20; ++i) {
            roundData[i] = new Array();
        }
        const nameSpace = new Object();
        wealth_data.forEach(function (d) {
            if (typeof (nameSpace[d.code]) == 'undefined') {
                nameSpace[d.code] = {
                    round: new Object(),
                    wealth: [{
                        x: 0,
                        y: 0
                    }],
                    id: d.code,
                };
            }
            if (parseFloat(d['end']) < -600) d['end'] = -600;
            if (parseFloat(d['end']) > 600) d['end'] = 600;
            roundData[parseInt(d.biao) - 1].push(parseFloat(d['end']));
            nameSpace[d.code]['round'][d.biao] = parseFloat(d['end']);
            nameSpace[d.code]['wealth'].push({
                x: parseInt(d.biao),
                y: parseFloat(d['end'])
            });
        })
        // console.log(roundData);
        let geniData = new Array();
        geniData.push();
        for (let i = 0; i < roundData.length; ++i) {
            let geniSum = 0;
            for (let j = 0; j < roundData[i].length; ++j) {
                for (let k = 0; k < roundData[i].length; ++k) {
                    geniSum += (Math.abs(roundData[i][j] - roundData[i][k]));
                }
            }
            geniData.push(parseFloat((geniSum / (304 * 304)).toFixed(2)));
            roundData[i].sort(function (a, b) {
                return a - b;
            })
            // console.log(roundData);
            box_data[i] = {
                min: roundData[i][0],
                last_min: roundData[i][75],
                mid: roundData[i][151],
                last_max: roundData[i][227],
                max: roundData[i][303]
            };
        }
        // console.log(geniData);
        this.geni_scale = d3.scaleLinear()
            .domain([d3.max(geniData), d3.min(geniData)])
            .range([this.margin.top, this.height - this.margin.bottom])
        this.y_scale_wealth = d3.scaleLinear()
            .domain([this.max_wealth, this.min_wealth])
            .range([this.margin.top, this.height - this.margin.bottom]);
        this.x_scale_wealth = d3.scaleLinear()
            .domain([0, 20])
            .range([this.margin.left, this.width - this.margin.right])
        // console.log(this.x_scale_wealth.range());
        this.lineBuilder = d3.line()
            .x((d, i) => this.x_scale_wealth(d.x))
            .y((d, i) => this.y_scale_wealth(d.y))
            .curve(d3.curveMonotoneX);
        this.giniLineBuilder = d3.line()
            .x((d, i) => this.x_scale_wealth(i + 1))
            .y((d, i) => this.geni_scale(d))
            .curve(d3.curveMonotoneX);
        // wealth_g.selectAll('#wg')
        //     .attr('id', 'wg')
        //     .data([geniData])
        //     .enter()
        //     .append('path')
        //     .attr('id', d => {
        //         return 'wealth_line';
        //     })
        //     .attr('d', d => {
        //         // console.log(nameSpace[d].wealth);
        //         return this.giniLineBuilder(d);
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', 'red')
        //     .attr('stroke-opacity', 1)
        //     .attr('stroke-width', 5)
        //     .attr('stroke-dasharray', 7);

        // console.log(box_data);
        let h_h = new Array();
        let s_s = new Array();
        let h_s_rect = new Array();
        for (let i in box_data) {
            for (let j in box_data[i]) {
                h_h.push({
                    x: parseInt(i) + 1,
                    y: box_data[i][j]
                });
            }
            s_s.push({
                flag: -1,
                x1: (parseInt(i) + 1),
                x2: (parseInt(i) + 1),
                y1: (box_data[i]['last_min']),
                y2: (box_data[i]['last_max'])
            });
            s_s.push({
                flag: 1,
                x1: (parseInt(i) + 1),
                x2: (parseInt(i) + 1),
                y1: (box_data[i]['last_min']),
                y2: (box_data[i]['last_max'])
            });
            s_s.push({
                flag: 0,
                x1: (parseInt(i) + 1),
                x2: (parseInt(i) + 1),
                y1: (box_data[i]['max']),
                y2: (box_data[i]['last_max'])
            });
            s_s.push({
                flag: 0,
                x1: (parseInt(i) + 1),
                x2: (parseInt(i) + 1),
                y1: (box_data[i]['last_min']),
                y2: (box_data[i]['min'])
            });
            h_s_rect.push({
                x: (parseInt(i) + 1),
                y: (box_data[i]['last_max']),
                width: 20,
                height1: (box_data[i]['last_max']),
                height2: (box_data[i]['last_min'])
            });
        }
        // console.log(h_h);

        let box_g = wealth_g.append('g')
            .attr('id', 'wealth_box_g');
        box_g.append('clipPath')
            .attr('id', 'box')
            .append('rect')
            .attr("x", 0)
            .attr("y", this.margin.top)
            .attr('width', this.width)
            .attr('height', this.height - this.margin.bottom - this.margin.top);

        box_g.append("g")
            .attr("clip-path", "url(#box)")
            .selectAll("#h_s_rect")
            .attr("id", "h_s_rect")
            .data(h_s_rect)
            .enter()
            .append("rect")
            .attr("id", "box_rect")
            .attr("x", d => {
                return this.x_scale_wealth(d.x) - 10;
            })
            .attr("y", d => {
                return this.y_scale_wealth(d.y);
            })
            .attr("width", d => {
                return (d.width);
            })
            .attr("height", d => {
                return Math.abs(this.y_scale_wealth(d.height1) - this.y_scale_wealth(d.height2));
            })
            .attr("fill", "gray")
            .attr("fill-opacity", 0.6)
            .attr("stroke-width", 0);
        box_g.append("g")
            .attr("clip-path", "url(#box)")
            .selectAll("#h_h")
            .attr("id", "h_h")
            .data(h_h)
            .enter()
            .append("line")
            .attr("id", "box_line_h")
            .attr("x1", d => {
                return this.x_scale_wealth(d.x) - 10;
            })
            .attr("x2", d => {
                return this.x_scale_wealth(d.x) + 10;
            })
            .attr("y1", d => {
                return this.y_scale_wealth(d.y);
            })
            .attr("y2", d => {
                return this.y_scale_wealth(d.y);
            })
            .attr("fill", "none")
            .attr("stroke", "black");
        box_g.append("g")
            .attr("clip-path", "url(#box)")
            .selectAll("#s_s")
            .attr("id", "s_s")
            .data(s_s)
            .enter()
            .append("line")
            .attr("id", "box_line_s")
            .attr("x1", d => {
                return this.x_scale_wealth(d.x1) + (d.flag == -1 ? -10 : d.flag == 0 ? 0 : 10);
            })
            .attr("y1", d => {
                return this.y_scale_wealth(d.y1);
            })
            .attr("x2", d => {
                return this.x_scale_wealth(d.x2) + (d.flag == -1 ? -10 : d.flag == 0 ? 0 : 10);
            })
            .attr("y2", d => {
                return this.y_scale_wealth(d.y2);
            })
            .attr("fill", "none")
            .attr("stroke", "black");
        //X轴
        wealth_g.append("g")
            .attr('id', 'wealth_x_axis')
            .call(d3.axisBottom(this.x_scale_wealth).ticks(0))
            .attr("transform", "translate(0," + this.y_scale_wealth(0) + ")");

        //Y轴
        wealth_g.append("g")
            .attr("id", 'wealth_y_axis')
            .call(d3.axisLeft(this.y_scale_wealth).ticks(5))
            .attr("font-size", 15)
            .attr("transform", "translate(" + this.x_scale_wealth(0) + "," + 0 + ")");
        // wealth_g.append("g")
        //     .call(d3.axisRight(this.geni_scale).ticks(5))
        //     .attr("transform", "translate(" + this.x_scale_wealth(21) + "," + 0 + ")");
        for (let i = 1; i <= 20; ++i) {
            wealth_g.append('text')
                .attr('x', this.x_scale_wealth(i))
                .attr('y', this.height - this.margin.bottom + 60)
                .attr('text-anchor', 'middle')
                .attr("font-size", 17)
                .text(i)
            // wealth_g.append('line')
            //     .attr('x1', this.x_scale_wealth(i))
            //     .attr('x2', this.x_scale_wealth(i))
            //     .attr('y1', this.y_scale_wealth.range()[0])
            //     .attr('y2', this.y_scale_wealth.range()[1])
            //     .attr('fill', 'none')
            //     .attr('stroke', 'gray')
            //     .attr('stroke-opacity', 0.1);
        }
        wealth_g.append('text')
            .attr('x', this.x_scale_wealth(0))
            .attr('y', 20)
            .attr("dx", '1em')
            .attr("font-size", 18)
            .attr('font-family', 'STHeiti')
            .attr('text-anchor', 'middle')
            .text('Total Wealth');


        // wealth_g.append('text')
        //     .attr('x', this.x_scale_wealth(21))
        //     .attr('y', 10)
        //     .attr('font-family', 'STHeiti')
        //     .attr('text-anchor', 'middle')
        //     .text('Gini Index');

        // d3.select("#individual")
        //     .append('div')
        //     .attr('id', 'flowerView')
        //     // .style("overflow-x", "hidden")
        //     .attr('height', heightIndividual - (this.height - this.margin.bottom + 10))
        //     .style('overflow-y', 'scroll');
    })
}
// const heightFlower = document.getElementById("flowerView").offsetHeight;
// const widthFlower = document.getElementById("flowerView").offsetHeight;
// console.log(widthFlower)
const sum_max_gain = 0;
var select_people_num = 0;

// d3.csv('data/newdata_for_line.csv').then(wealth_data => {
//     let name = new Object();
//     for (let i in wealth_data) {
//         name[wealth_data[i].code] = 1;
//     }
//     console.log(name);
//     for (let i in name) {

//         drawPersonalHorizon(i);
//         // break;
//     }
// })

function drawFlower(code, select_round) {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        d3.select("#wealth_line").attr('stroke-opacity', 0.1);
        d3.select("#wealth_box_g").attr("opacity", 0.1);
        const personal_data = new Array();
        for (let i in wealth_data) {
            if (wealth_data[i].code == code) {
                personal_data.push(wealth_data[i]);
            }
        }
        // console.log(personal_data);
        // const svgFlower = d3.select('#flowerView')
        //     .append('svg')
        //     .attr('width', widthIndividual - 30)
        //     .attr('height', 100)
        //     .attr('class', 'framework')
        //     .attr('transform', `translate(15, 0)`);
        let max_gain = -10000;
        let min_gain = 10000;
        let max_receive_tmp = -9999;
        let min_receive_tmp = 9999;
        const wealthList = [];
        for (let p in personal_data) {
            let dpend = parseFloat(personal_data[p]['end']);
            if (dpend > 600) dpend = 600;
            else if (dpend < -600) dpend = -600;
            // TODO: 寻找最大的总财富和最小的总财富
            max_receive_tmp = Math.max(max_receive_tmp, dpend);
            min_receive_tmp = Math.min(min_receive_tmp, dpend);
            wealthList.push({
                y: dpend,
                x: parseInt(p) + 1
            });
            const flowerList = new Array();
            const pieList = new Array();
            const decisionList = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                const p_v = parseFloat(personal_data[p][lineLegend[i] + '_profit']);
                flowerList.push(p_v);
                // console.log(lineLegend[i], personal_data[p]);

                decisionList.push(parseInt(personal_data[p][lineLegend[i] + '_type']));
                // min_gain = Math.min(p_v, min_gain);
                max_gain = Math.max(Math.abs(p_v), max_gain);
                pieList.push(1);
            }
            // decisionList.push(parseInt(personal_data[p][11]));

            personal_data[p]['flower'] = flowerList;
            personal_data[p]['pie'] = pieList;
            personal_data[p]['decision'] = decisionList;
            // console.log(personal_data[p]['decision']);
        }
        max_wealth_array.push(max_gain);
        max_wealth_max = Math.max(max_gain, max_wealth_max);
        max_receive_array.push(max_receive_tmp);
        min_receive_array.push(min_receive_tmp);
        // max_receive = d3.max(max_receive_array);
        // min_receive = d3.min(min_receive_array);
        max_receive = Math.max(max_receive, max_receive_tmp);
        min_receive = Math.min(min_receive, min_receive_tmp);
        // console.log(wealthList);

        // console.log(wealthList);

        // wealth_g.append('text')
        //     .text('#' + (select_people_num + 1).toString())
        //     .attr('x', this.x_scale_wealth(20) + 10)
        //     .attr('font-size', 20)
        //     // .attr('text-anchor', 'middle')
        //     .attr('dy', '0.2em')
        //     .attr('y', this.y_scale_wealth(wealthList[wealthList.length - 1].y));

        const pie_g = wealth_g.append('g').attr('id', 'pie_g' + (parseInt(select_people_num)).toString());
        pie_g
            .selectAll('#wgr')
            .attr('id', 'wgr')
            .data([wealthList])
            .enter()
            .append('path')
            // .attr('id', d => {
            //     return 'line' + d;
            // })
            .attr('id', 'line' + (select_people_num - 1).toString())
            .attr('d', d => this.lineBuilder(d))
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('stroke-opacity', 1)
            .attr('stroke-width', 2);
        // pie_g.append('text')
        //     .text('#' + (++select_people_num).toString())
        //     .attr('x', 10)
        //     .attr('y', 50)
        //     .attr('font-size', 25)
        //     .attr('dx', '1em')
        //     .attr('text-anchor', 'middle');
        // console.log(this.x_scale_wealth(20));
        // console.log(personal_data);
        let decisionDifferent = new Array();
        for (let i = 0; i < personal_data.length - 1; ++i) {
            var diff_num = 0;
            // console.log(personal_data[i].decision)
            for (let j = 0; j < personal_data[i].decision.length; ++j) {
                if (personal_data[i + 1].decision[j] != personal_data[i].decision[j]) {
                    diff_num++;
                }
            }
            decisionDifferent.push(diff_num);
        }
        // console.log(decisionDifferent);
        const lineWidthScale = d3.scaleLinear()
            .domain([d3.min(decisionDifferent), d3.max(decisionDifferent)])
            .range([1, 10]);
        // for (let i = 1; i < 20; ++i) {
        //     pie_g.append('line')
        //         .attr('x1', this.x_scale_wealth(i))
        //         .attr('x2', this.x_scale_wealth(i + 1))
        //         .attr('y1', 50)
        //         .attr('y2', 50).attr('stroke', 'gray')
        //         .attr('stroke-width', lineWidthScale(decisionDifferent[i - 1]))
        //         .attr('fill', 'none');
        // }
        this.flowerInner = 3.5;
        this.flowerOuter = 40;
        const flowerScale = d3.scaleLinear()
            .domain([0, max_gain])
            .range([this.flowerInner + 10, this.flowerOuter]);
        // console.log(max_gain);

        const pie = d3.pie();
        for (let i in personal_data) {
            // console.log(i)
            // if (i != 0) break;
            let pie_data_personal = pie(personal_data[i].pie);
            let pie_data_max = 0;
            for (let j = 0; j < pie_data_personal.length; ++j) {
                pie_data_personal[j].value = personal_data[i].flower[j];
                pie_data_max = Math.max(Math.abs(parseFloat(pie_data_personal[j].value)), pie_data_max);
            }
            // console.log(pie_data_personal)
            // console.log(personal_data[i]['flower'])
            const g_p = pie_g
                .append('g')
                .attr("id", "flower_sum" + (parseInt(select_people_num) - 1).toString() + "_" + (parseInt(i) + 1).toString())
                .attr("transform", "translate(" + this.x_scale_wealth(parseInt(i) + 1) + "," + (this.y_scale_wealth(wealthList[i].y)) + ") rotate(-105, " + 0 + "," + 0 + ")")
                .attr("value", wealthList[i].y)
            g_p.selectAll("#flower_x" + (parseInt(select_people_num) - 1).toString())
                .attr('id', 'flower_x' + (parseInt(select_people_num) - 1).toString())
                .data(pie_data_personal)
                .enter()
                .append('path')
                .attr('id', 'flower' + (select_people_num - 1).toString())
                .attr('d', (d, x) => {
                    var arc_generator = d3.arc()
                        .innerRadius(this.flowerInner)
                        .outerRadius(parseFloat(d.value) == 0 ? this.flowerInner : flowerScale(Math.abs(parseFloat(d.value))));
                    // .outerRadius(100)
                    return arc_generator(d);
                })
                .attr('fill', (d, x) => {
                    let v_d = parseFloat(d.value);
                    if (v_d > 0) {
                        if (3 * v_d / max_gain >= 2) {
                            return color_wealth[0];
                        } else if (3 * v_d / max_gain >= 1) {
                            return color_wealth[1];
                        } else if (3 * v_d / max_gain > 0) {
                            return color_wealth[2];
                        }
                    } else if (v_d <= 0) {
                        if (3 * Math.abs(v_d) / max_gain >= 2) {
                            return color_wealth[5];
                        } else if (3 * Math.abs(v_d) / max_gain >= 1) {
                            return color_wealth[4];
                        } else if (3 * Math.abs(v_d) / max_gain > 0) {
                            return color_wealth[3];
                        }
                    }
                    // if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
                    // else return 'green';
                    // return 'blue'
                })
                .attr('stroke', 'black')
                .attr('stroke-width', 0.5)
                .on('mouseover', d => {
                    flowerGlyph(pie_data_personal, personal_data[i].decision, is_general == 1 ? max_wealth_max : max_gain);
                })
                .on('mouseout', d => {
                    d3.select("#flower_glyph").remove();
                });
            g_p.append('circle')
                .attr('id', 'cir' + (select_people_num - 1).toString())
                .attr('r', this.flowerInner - 0.5)
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'white')
                .attr('stroke', 'blue')
                .attr('stroke-width', 0.5)
                .on('mouseover', d => {
                    flowerGlyph(pie_data_personal, personal_data[i].decision, is_general == 1 ? max_wealth_max : max_gain);
                })
                .on('mouseout', d => {
                    d3.select("#flower_glyph").remove();
                });
            g_p.append('circle')
                .attr('id', 'cir' + (select_people_num - 1).toString())
                .attr('r', this.flowerOuter)
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'white')
                .attr('stroke', 'none')
                .attr('stroke-width', 0)
                .attr("opacity", 0)
                .on('mouseover', d => {
                    flowerGlyph(pie_data_personal, personal_data[i].decision, is_general == 1 ? max_wealth_max : max_gain);
                })
                .on('mouseout', d => {
                    d3.select("#flower_glyph").remove();
                });
            if (parseInt(i) == parseInt(select_round) - 1)
                g_p.append('circle')
                .attr('id', 'outCircle' + (select_people_num - 1).toString())
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'none')
                .attr('stroke', 'gray')
                .attr('stroke-width', 3)
                .attr("stroke-opacity", 0)
                .attr('r', flowerScale(pie_data_max) + 2)
                .attr('stroke-dasharray', 3.5);
        }

        // const horizon_data = new Array();
        // for (let i = 0; i < personal_data[0].flower.length; ++i) {
        //     let horizon_tmp = new Array();
        //     for (let j in personal_data) {
        //         horizon_tmp.push(personal_data[j].flower[i]);
        //     }
        //     horizon_data.push(horizon_tmp);
        // }
        // console.log(horizon_data);
        // for (let i in horizon_data) {
        //     // if (parseInt(i) == 9) break;
        //     // console.log(i)
        //     drawHorizonR(horizon_data[i], max_gain, 60, 6.75 * parseInt(i) + 9, pie_g, select_people_num - 1);
        // }
        // pie_g.append('rect').attr('x', 60).attr('y', 9).attr('height', 81).attr('width', 180).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', 1);
    });
}

function drawIndividual(code, round) {
    drawFlower(code, round);
    drawPersonalHorizon(code, select_people_num, round);
    select_people_num++;
}

function drawFlowerMove(code, select_round) {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        d3.select("#wealth_line").attr('stroke-opacity', 0.1);
        d3.select("#wealth_box_g").attr("opacity", 0.1);
        const personal_data = new Array();
        for (let i in wealth_data) {
            if (wealth_data[i].code == code) {
                personal_data.push(wealth_data[i]);
            }
        }
        // console.log(personal_data);
        // const svgFlower = d3.select('#flowerView')
        //     .append('svg')
        //     .attr('width', widthIndividual - 30)
        //     .attr('height', 100)
        //     .attr('class', 'framework')
        //     .attr('transform', `translate(15, 0)`);
        let max_gain = -10000;
        let min_gain = 10000;
        let max_receive_tmp = -9999;
        let min_receive_tmp = 9999;
        const wealthList = [];
        for (let p in personal_data) {
            let dpend = parseFloat(personal_data[p]['end']);
            if (dpend > 600) dpend = 600;
            else if (dpend < -600) dpend = -600;
            // TODO: 寻找最大的总财富和最小的总财富
            max_receive_tmp = Math.max(max_receive_tmp, dpend);
            min_receive_tmp = Math.min(min_receive_tmp, dpend);
            wealthList.push({
                y: dpend,
                x: parseInt(p) + 1
            });
            const flowerList = new Array();
            const pieList = new Array();
            const decisionList = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                const p_v = parseFloat(personal_data[p][lineLegend[i] + '_profit']);
                flowerList.push(p_v);
                // console.log(lineLegend[i], personal_data[p]);

                decisionList.push(parseInt(personal_data[p][lineLegend[i] + '_type']));
                // min_gain = Math.min(p_v, min_gain);
                max_gain = Math.max(Math.abs(p_v), max_gain);
                pieList.push(1);
            }
            // decisionList.push(parseInt(personal_data[p][11]));

            personal_data[p]['flower'] = flowerList;
            personal_data[p]['pie'] = pieList;
            personal_data[p]['decision'] = decisionList;
            // console.log(personal_data[p]['decision']);
        }
        // max_wealth_array.push(max_gain);
        // max_wealth_max = Math.max(max_gain, max_wealth_max);
        // max_receive_array.push(max_receive_tmp);
        // min_receive_array.push(min_receive_tmp);
        // max_receive = d3.max(max_receive_array);
        // min_receive = d3.min(min_receive_array);

        // console.log(wealthList);

        // console.log(wealthList);

        // wealth_g.append('text')
        //     .text('#' + (select_people_num + 1).toString())
        //     .attr('x', this.x_scale_wealth(20) + 10)
        //     .attr('font-size', 20)
        //     // .attr('text-anchor', 'middle')
        //     .attr('dy', '0.2em')
        //     .attr('y', this.y_scale_wealth(wealthList[wealthList.length - 1].y));

        const pie_g = wealth_g.append('g').attr('id', 'pie_gMove');
        pie_g
            .selectAll('#wgr')
            .attr('id', 'wgr')
            .data([wealthList])
            .enter()
            .append('path')
            // .attr('id', d => {
            //     return 'line' + d;
            // })
            .attr('id', 'line' + (select_people_num - 1).toString())
            .attr('d', d => this.lineBuilder(d))
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('stroke-opacity', 1)
            .attr('stroke-width', 2);
        // pie_g.append('text')
        //     .text('#' + (++select_people_num).toString())
        //     .attr('x', 10)
        //     .attr('y', 50)
        //     .attr('font-size', 25)
        //     .attr('dx', '1em')
        //     .attr('text-anchor', 'middle');
        // console.log(this.x_scale_wealth(20));
        // console.log(personal_data);
        let decisionDifferent = new Array();
        for (let i = 0; i < personal_data.length - 1; ++i) {
            var diff_num = 0;
            // console.log(personal_data[i].decision)
            for (let j = 0; j < personal_data[i].decision.length; ++j) {
                if (personal_data[i + 1].decision[j] != personal_data[i].decision[j]) {
                    diff_num++;
                }
            }
            decisionDifferent.push(diff_num);
        }
        // console.log(decisionDifferent);
        const lineWidthScale = d3.scaleLinear()
            .domain([d3.min(decisionDifferent), d3.max(decisionDifferent)])
            .range([1, 10]);
        // for (let i = 1; i < 20; ++i) {
        //     pie_g.append('line')
        //         .attr('x1', this.x_scale_wealth(i))
        //         .attr('x2', this.x_scale_wealth(i + 1))
        //         .attr('y1', 50)
        //         .attr('y2', 50).attr('stroke', 'gray')
        //         .attr('stroke-width', lineWidthScale(decisionDifferent[i - 1]))
        //         .attr('fill', 'none');
        // }
        this.flowerInner = 3.5;
        this.flowerOuter = 40;
        const flowerScale = d3.scaleLinear()
            .domain([0, max_gain])
            .range([this.flowerInner + 5, this.flowerOuter]);
        // console.log(max_gain);

        const pie = d3.pie();
        for (let i in personal_data) {
            // console.log(i)
            // if (i != 0) break;
            let pie_data_personal = pie(personal_data[i].pie);
            let pie_data_max = 0;
            for (let j = 0; j < pie_data_personal.length; ++j) {
                pie_data_personal[j].value = personal_data[i].flower[j];
                pie_data_max = Math.max(Math.abs(parseFloat(pie_data_personal[j].value)), pie_data_max);
            }
            // console.log(pie_data_personal)
            // console.log(personal_data[i]['flower'])
            const g_p = pie_g
                .append('g')
                .attr("id", "flower_sum" + (parseInt(select_people_num) - 1).toString() + "_" + (parseInt(i) + 1).toString())
                .attr("transform", "translate(" + this.x_scale_wealth(parseInt(i) + 1) + "," + (this.y_scale_wealth(wealthList[i].y)) + ") rotate(-105, " + 0 + "," + 0 + ")")
                .attr("value", wealthList[i].y)
            g_p.selectAll("#flower_x" + (parseInt(select_people_num) - 1).toString())
                .attr('id', 'flower_x' + (parseInt(select_people_num) - 1).toString())
                .data(pie_data_personal)
                .enter()
                .append('path')
                .attr('id', 'flower' + (select_people_num - 1).toString())
                .attr('d', (d, x) => {
                    var arc_generator = d3.arc()
                        .innerRadius(this.flowerInner)
                        .outerRadius(parseFloat(d.value) == 0 ? this.flowerInner : flowerScale(Math.abs(parseFloat(d.value))));
                    // .outerRadius(100)
                    return arc_generator(d);
                })
                .attr('fill', (d, x) => {
                    let v_d = parseFloat(d.value);
                    if (v_d > 0) {
                        if (3 * v_d / max_gain >= 2) {
                            return color_wealth[0];
                        } else if (3 * v_d / max_gain >= 1) {
                            return color_wealth[1];
                        } else if (3 * v_d / max_gain > 0) {
                            return color_wealth[2];
                        }
                    } else if (v_d <= 0) {
                        if (3 * Math.abs(v_d) / max_gain >= 2) {
                            return color_wealth[5];
                        } else if (3 * Math.abs(v_d) / max_gain >= 1) {
                            return color_wealth[4];
                        } else if (3 * Math.abs(v_d) / max_gain > 0) {
                            return color_wealth[3];
                        }
                    }
                    // if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
                    // else return 'green';
                    // return 'blue'
                })
                .attr('stroke', 'black')
                .attr('stroke-width', 0.5)
            g_p.append('circle')
                .attr('id', 'cir' + (select_people_num - 1).toString())
                .attr('r', this.flowerInner - 0.5)
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', parseInt(i) == parseInt(select_round) - 1 ? 'blue' : 'white')
                .attr('stroke', 'blue')
                .attr('stroke-width', 0.5)
                .on('mouseover', d => {
                    flowerGlyph(pie_data_personal, personal_data[i].decision, max_gain);
                })
                .on('mouseout', d => {
                    d3.select("#flower_glyph").remove();
                });
            if (parseInt(i) == parseInt(select_round) - 1)
                g_p.append('circle')
                .attr('id', 'outCircle' + (select_people_num - 1).toString())
                .attr('x', 0)
                .attr('y', 0)
                .attr('fill', 'none')
                .attr('stroke', 'gray')
                .attr('stroke-width', 3)
                .attr("stroke-opacity", 0)
                .attr('r', flowerScale(pie_data_max) + 2)
                .attr('stroke-dasharray', 3.5);
        }

        // const horizon_data = new Array();
        // for (let i = 0; i < personal_data[0].flower.length; ++i) {
        //     let horizon_tmp = new Array();
        //     for (let j in personal_data) {
        //         horizon_tmp.push(personal_data[j].flower[i]);
        //     }
        //     horizon_data.push(horizon_tmp);
        // }
        // console.log(horizon_data);
        // for (let i in horizon_data) {
        //     // if (parseInt(i) == 9) break;
        //     // console.log(i)
        //     drawHorizonR(horizon_data[i], max_gain, 60, 6.75 * parseInt(i) + 9, pie_g, select_people_num - 1);
        // }
        // pie_g.append('rect').attr('x', 60).attr('y', 9).attr('height', 81).attr('width', 180).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', 1);
    });
}

function flowerGlyph(pie_data, decisionList, max_gain) {
    const flower_inner = 10;
    const flower_outer = 140;
    // console.log(decisionList);
    const flowerScale = d3.scaleLinear()
        .domain([0, max_gain])
        .range([flower_inner + flower_outer / 4, flower_outer]);

    d3.select("#flower_glyph").remove();

    const glyph_g = wealth_g.append('g')
        .attr('id', 'flower_glyph')
        .attr("width", flower_outer * 2)
        .attr("height", flower_outer * 2)
        .attr("class", 'svgBorder')
        .attr("transform", `translate(${this.x_scale_wealth(2) - (flower_outer + 20)}, ${this.margin.top})`)
    glyph_g.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 2 * (flower_outer + 100))
        .attr("height", 2 * (flower_outer + 20))
        .attr("fill", "none")
        .attr("stroke", "none");

    const flower_glyph_g = glyph_g.append("g")
        .attr("transform", `translate(${(flower_outer + 100)}, ${(flower_outer + 20)}) rotate(-105, 0, 0)`)
    flower_glyph_g.append("g")
        // .attr("transform", `translate(${(flower_outer + 20)}, ${(flower_outer + 20)}) rotate(-105, 0, 0)`)
        .selectAll("#pie_glyph_graph")
        .attr("id", "pie_glyph_graph")
        .data(pie_data)
        .enter()
        .append("path")
        .attr("d", d => {
            const arc_generator = d3.arc()
                .innerRadius(flower_inner)
                .outerRadius(flower_outer);
            return arc_generator(d);
        })
        .attr('fill', d => {
            return 'none';

        })
        .attr("stroke", 'black')
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", 0.5)
        .attr('stroke-dasharray', 5);
    flower_glyph_g.append("circle").attr('cx', 0).attr('cy', 0).attr('r', flower_inner).attr('fill', 'white');
    let red = Math.PI * 2 / lineLegend.length;

    for (let i = 0; i < decisionList.length; ++i) {
        let rd = (Math.PI + i * red);
        let x1 = this.cirInnerRadius * Math.cos(rd);
        let y1 = this.cirInnerRadius * Math.sin(rd);

        let x2 = (flower_outer + 17) * Math.cos(rd);
        let y2 = (flower_outer + 17) * Math.sin(rd);

        // console.log(i, count_type_array[i], lineNameLegend[i][count_type_array[i] - 1])

        glyph_g.append("g")
            .attr("transform", `translate(${(flower_outer + 100)}, ${(flower_outer + 20)})`).append('text')
            .attr('x', x2)
            .attr('y', y2)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'STHeiti')
            .attr('font-size', 17)
            // .attr('font-weight', 'bold')
            // .attr('dx', i >= 4 && i <= 8 ? '0.5m' : (i == 9 || i == 3 ? 0 : '-0.5em'))
            // .attr('dy', i <= 6 ? '-0.1em' : '0.5em')
            .attr("dx", i == 0 ? '-2em' : 0)
            .text(lineNameLegend[i][decisionList[i]]);
    }
    flower_glyph_g.selectAll("#pie_glyph_graph")
        .attr("id", "pie_glyph_graph")
        .data(pie_data)
        .enter()
        .append("path").attr('fill', d => {
            const v_d = parseFloat(d.value);
            if (v_d > 0) {
                if (3 * v_d / max_gain >= 2) {
                    return color_wealth[0];
                } else if (3 * v_d / max_gain >= 1) {
                    return color_wealth[1];
                } else if (3 * v_d / max_gain > 0) {
                    return color_wealth[2];
                }
            } else if (v_d <= 0) {
                if (3 * Math.abs(v_d) / max_gain >= 2) {
                    return color_wealth[5];
                } else if (3 * Math.abs(v_d) / max_gain >= 1) {
                    return color_wealth[4];
                } else if (3 * Math.abs(v_d) / max_gain > 0) {
                    return color_wealth[3];
                }
            }
        })
        .attr("stroke", 'black')
        .attr("stroke-width", 0.5)
        // .attr("d", d => {
        //     const arc_generator = d3.arc()
        //         .innerRadius(flower_inner)
        //         .outerRadius(flower_inner);
        //     return arc_generator(d);
        // })
        // .transition()
        // .delay((d, i) => 500 * (i + 1))
        // .duration((d, i) => 500)
        // .duration(500)
        // .delay(500)
        .attr("d", d => {
            const arc_generator = d3.arc()
                .innerRadius(flower_inner)
                .outerRadius(parseFloat(d.value) == 0 ? flower_inner : flowerScale(Math.abs(parseFloat(d.value))));
            return arc_generator(d);
        });
}

function globalWealth() {
    is_general = 1;
    const horizon_height = ((heightFlower - 24) / 4 - 20) / 12;
    const flowerScale = d3.scaleLinear()
        .domain([0, max_wealth_max])
        .range([this.flowerInner + 10, this.flowerOuter]);
    let people_scale = d3.scaleLinear()
        .domain([0, max_wealth_max])
        .range([0, -horizon_height * 3]);
    let x_scale = d3.scaleLinear()
        .domain([0 + 1, 20 - 1 + 1])
        .range([0, widthHorizonMain - 30 - 15]);
    var area_generator = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale((d));
        })
        .curve(d3.curveMonotoneX)
    var area_generator_2 = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale((-d));
        })
        .curve(d3.curveMonotoneX);
    const y_scale_Wealth = d3.scaleLinear()
        .domain([max_receive, min_receive])
        .range([this.margin.top, this.height - this.margin.bottom]);
    d3.select("#wealth_y_axis")
        .transition()
        .call(d3.axisLeft(y_scale_Wealth).ticks(5));
    let y_move = 0;
    if (max_receive < 0) y_move = max_receive;
    if (min_receive > 0) y_move = min_receive;
    d3.select("#wealth_x_axis")
        .transition()
        .attr("transform", `translate(0, ${y_scale_Wealth(y_move)})`);
    const LineBuilder = d3.line()
        .x((d, i) => this.x_scale_wealth(d.x))
        .y((d, i) => y_scale_Wealth(d.y))
        .curve(d3.curveMonotoneX);
    d3.selectAll("#box_rect")
        .transition()
        .attr("y", d => y_scale_Wealth(d.y))
        .attr("height", d => Math.abs(y_scale_Wealth(d.height1) - y_scale_Wealth(d.height2)));
    d3.selectAll("#box_line_h")
        .transition()
        .attr("y1", d => {
            // console.log(1, d.y);
            return y_scale_Wealth(d.y);
        })
        .attr("y2", d => {
            // console.log(2, d.y);
            return y_scale_Wealth(d.y);
        });
    d3.selectAll("#box_line_s")
        .transition()
        .attr("y1", d => y_scale_Wealth(d.y1))
        .attr("y2", d => y_scale_Wealth(d.y2));

    for (let i = 0; i < max_wealth_array.length; ++i) {
        if (max_wealth_array[i] == 'a') continue;
        d3.selectAll('#flower' + i.toString())
            .transition()
            .attr('d', (d, x) => {
                var arc_generator = d3.arc()
                    .innerRadius(this.flowerInner)
                    .outerRadius(parseFloat(d.value) == 0 ? this.flowerInner : flowerScale(Math.abs(parseFloat(d.value))));
                // .outerRadius(100)
                return arc_generator(d);
            }).attr('fill', (d, x) => {
                let v_d = parseFloat(d.value);
                if (v_d > 0) {
                    if (3 * v_d / max_wealth_max >= 2) {
                        return color_wealth[0];
                    } else if (3 * v_d / max_wealth_max >= 1) {
                        return color_wealth[1];
                    } else if (3 * v_d / max_wealth_max > 0) {
                        return color_wealth[2];
                    }
                } else if (v_d <= 0) {

                    if (3 * Math.abs(v_d) / max_wealth_max >= 2) {
                        return color_wealth[5];
                    } else if (3 * Math.abs(v_d) / max_wealth_max >= 1) {
                        return color_wealth[4];
                    } else if (3 * Math.abs(v_d) / max_wealth_max > 0) {
                        return color_wealth[3];
                    }
                }
                // if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
                // else return 'green';
                // return 'blue'
            })
        d3.selectAll("#horizonV" + i.toString())
            .transition()
            .attr("d", d => area_generator_2(d)) //d="M1,0L20,40.....  d-path data
        d3.selectAll("#horizonR" + i.toString())
            .transition()
            .attr("d", d => area_generator(d)) //d="M1,0L20,40.....  d-path data
        d3.select("#line" + i.toString())
            .transition()
            .attr("d", d => LineBuilder(d));
        for (let j = 1; j <= 20; ++j) {
            // console.log("#flower_sum" + i.toString() + '_' + j.toString())
            if (document.getElementById("flower_sum" + i.toString() + '_' + j.toString()) == null) continue;
            let v = d3.select("#flower_sum" + i.toString() + '_' + j.toString()).attr("value");
            // console.log(v);
            d3.select("#flower_sum" + i.toString() + "_" + j.toString())
                .transition()
                .attr("transform", `translate(${this.x_scale_wealth(j)}, ${y_scale_Wealth(parseFloat(v))}) rotate(-105, 0, 0)`);
        }
    }
}

function personalWealth() {
    is_general = 0;
    const horizon_height = ((heightFlower - 24) / 4 - 20) / 12;

    for (let i = 0; i < max_wealth_array.length; ++i) {
        if (max_wealth_array[i] == 'a') continue;
        const flowerScale = d3.scaleLinear()
            .domain([0, max_wealth_array[i]])
            .range([this.flowerInner + 10, this.flowerOuter]);
        let people_scale = d3.scaleLinear()
            .domain([0, max_wealth_array[i]])
            .range([0, -horizon_height * 3]);
        let x_scale = d3.scaleLinear()
            .domain([0 + 1, 20 - 1 + 1])
            .range([0, widthHorizonMain - 30 - 15]);
        var area_generator = d3.area()
            .x(function (d, i) {
                return x_scale(i + 1);
            })
            .y0(0)
            .y1(function (d) {
                return people_scale((d));
            })
            .curve(d3.curveMonotoneX)
        var area_generator_2 = d3.area()
            .x(function (d, i) {
                return x_scale(i + 1);
            })
            .y0(0)
            .y1(function (d) {
                return people_scale((-d));
            })
            .curve(d3.curveMonotoneX);
        d3.select("#wealth_y_axis")
            .transition()
            .call(d3.axisLeft(this.y_scale_wealth).ticks(5));
        // let y_move = 0;
        // if (max_receive < 0) y_move = max_receive;
        // if (min_receive > 0) y_move = min_receive;
        d3.select("#wealth_x_axis")
            .transition()
            .attr("transform", `translate(0, ${this.y_scale_wealth(0)})`);

        d3.selectAll("#box_rect")
            .transition()
            .attr("y", d => this.y_scale_wealth(d.y))
            .attr("height", d => Math.abs(this.y_scale_wealth(d.height1) - this.y_scale_wealth(d.height2)));
        d3.selectAll("#box_line_h")
            .transition()
            .attr("y1", d => {
                // console.log(1, d.y);
                return this.y_scale_wealth(d.y);
            })
            .attr("y2", d => {
                // console.log(2, d.y);
                return this.y_scale_wealth(d.y);
            });
        d3.selectAll("#box_line_s")
            .transition()
            .attr("y1", d => this.y_scale_wealth(d.y1))
            .attr("y2", d => this.y_scale_wealth(d.y2));

        d3.selectAll('#flower' + i.toString())
            .transition()
            .attr('d', (d, x) => {
                var arc_generator = d3.arc()
                    .innerRadius(this.flowerInner)
                    .outerRadius(parseFloat(d.value) == 0 ? this.flowerInner : flowerScale(Math.abs(parseFloat(d.value))));
                // .outerRadius(100)
                return arc_generator(d);
            }).attr('fill', (d, x) => {
                let v_d = parseFloat(d.value);
                if (v_d > 0) {
                    if (3 * v_d / max_wealth_array[i] >= 2) {
                        return color_wealth[0];
                    } else if (3 * v_d / max_wealth_array[i] >= 1) {
                        return color_wealth[1];
                    } else if (3 * v_d / max_wealth_array[i] > 0) {
                        return color_wealth[2];
                    }
                } else if (v_d <= 0) {

                    if (3 * Math.abs(v_d) / max_wealth_array[i] >= 2) {
                        return color_wealth[5];
                    } else if (3 * Math.abs(v_d) / max_wealth_array[i] >= 1) {
                        return color_wealth[4];
                    } else if (3 * Math.abs(v_d) / max_wealth_array[i] > 0) {
                        return color_wealth[3];
                    }
                }
                // if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
                // else return 'green';
                // return 'blue'
            })

        d3.selectAll("#horizonV" + i.toString())
            .transition()
            .attr("d", d => area_generator_2(d)) //d="M1,0L20,40.....  d-path data
        d3.selectAll("#horizonR" + i.toString())
            .transition()
            .attr("d", d => area_generator(d)) //d="M1,0L20,40.....  d-path data
        d3.select("#line" + i.toString())
            .transition()
            .attr("d", d => this.lineBuilder(d));
        for (let j = 1; j <= 20; ++j) {
            // console.log("#flower_sum" + i.toString() + '_' + j.toString())
            if (document.getElementById("flower_sum" + i.toString() + '_' + j.toString()) == null) continue;
            let v = d3.select("#flower_sum" + i.toString() + '_' + j.toString()).attr("value");
            // console.log(v);
            d3.select("#flower_sum" + i.toString() + "_" + j.toString())
                .transition()
                .attr("transform", `translate(${this.x_scale_wealth(j)}, ${this.y_scale_wealth(parseFloat(v))}) rotate(-105, 0, 0)`);
        }

    }
}
// for (let i = 0; i < 10; ++i)
// drawPersonalHorizon('5zc86wny')

function drawPersonalHorizon(code, cnt, round) {
    d3.csv('data/newdata_for_line.csv').then(wealth_data => {
        const personal_data = new Array();
        for (let i in wealth_data) {
            if (wealth_data[i].code == code) {
                personal_data.push(wealth_data[i]);
            }
        }
        // console.log(personal_data);
        const svgFlower = d3.select('#hMain')
            .append('svg')
            .attr('id', 'horizonSvg' + (parseInt(cnt) + 1).toString())
            .attr('width', widthHorizonMain - 30)
            .attr('height', (heightFlower - 24) / 4)
            .attr('class', 'framework')
            .attr('transform', `translate(10, 0)`)
        // .on('click', d => {
        //     d3.select('#pie_g1').remove();
        //     drawFlower(code);
        //     console.log(code);
        // })
        // .on('mouseover', d => {
        //     for (let i = 1; i <= select_people_num; ++i) {
        //         d3.select('#pie_g' + i.toString()).attr('opacity', (i == parseInt(cnt) + 1 ? 1 : 0));
        //         // DrawScatterLine(code);
        //         d3.select("#outCircle" + (i - 1).toString()).attr("stroke-opacity", 1);
        //     }
        //     DrawScatterLine(code);
        //     // console.log(selectPeople[code + round], code + round)
        //     d3.selectAll('#curve' + (selectPeople[code + round].cnt).toString())
        //         .attr('stroke-opacity', x => {
        //             // console.log()
        //             if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 1;
        //             else return 0.1;
        //         })
        //         .attr('stroke', x => {
        //             // console.log()
        //             if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 'steelblue';
        //             else return 'gray';
        //         })
        // })
        // .on('mouseout', d => {
        //     d3.selectAll("#lineWWW").remove()
        //     for (let i = 1; i <= select_people_num; ++i) {
        //         d3.select("#pie_g" + i.toString()).attr('opacity', 1);
        //         d3.select("#outCircle" + (i - 1).toString()).attr('stroke-opacity', 0);
        //     }
        //     d3.selectAll('#curve' + (selectPeople[code + round].cnt).toString())
        //         .attr('stroke-opacity', x => {
        //             // console.log()
        //             // if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 1;
        //             // else return 0.1;
        //             return 1;
        //         })
        //         .attr('stroke', x => {
        //             // console.log()
        //             // if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 'steelblue';
        //             // else return 'gray';
        //             return "steelblue";
        //         })
        // })
        // .on("click", d => {
        //     console.log("del");
        //     d3.selectAll("#lineWWW").remove()
        //     d3.select('#sel' + (parseInt(cnt) + 1).toString()).remove();
        //     d3.select('#horizonSvg' + (parseInt(cnt) + 1).toString()).remove();
        //     d3.select('#pie_g' + (parseInt(cnt) + 1).toString()).remove();
        //     d3.select('#weal' + (parseInt(cnt) + 1).toString()).remove();
        //     max_wealth_array[cnt] = 'a';
        //     max_wealth_max = -9999;
        //     max_receive_array[parseInt(cnt)] = 'a';
        //     min_receive_array[parseInt(cnt)] = 'a';
        //     max_receive = -9999;
        //     min_receive = 9999;
        //     for (let i = 0; i < max_receive_array.length; ++i) {
        //         if (max_receive_array[i] == 'a') continue;
        //         max_wealth_max = Math.max(max_wealth_max, max_wealth_array[i]);
        //         max_receive = Math.max(max_receive, max_receive_array[i]);
        //         min_receive = Math.min(min_receive, min_receive_array[i]);
        //     }
        // })
        let max_gain = -10000;
        let min_gain = 10000;
        const wealthList = [{
            x: 0,
            y: 0
        }];
        for (let p in personal_data) {
            let dpend = parseFloat(personal_data[p]['end']);
            if (dpend > 600) dpend = 600;
            else if (dpend < -600) dpend = -600;
            wealthList.push({
                y: dpend,
                x: parseInt(p) + 1
            });
            const flowerList = new Array();
            const pieList = new Array();
            const decisionList = new Array();
            for (let i = 0; i < lineLegend.length; ++i) {
                const p_v = parseFloat(personal_data[p][lineLegend[i] + '_profit']);
                flowerList.push(p_v);
                decisionList.push(parseInt(personal_data[p][lineLegend[i]]));
                // min_gain = Math.min(p_v, min_gain);
                max_gain = Math.max(Math.abs(p_v), max_gain);
                pieList.push(1);
            }
            // decisionList.push(parseInt(personal_data[p][11]));

            personal_data[p]['flower'] = flowerList;
            personal_data[p]['pie'] = pieList;
            personal_data[p]['decision'] = decisionList;
        }
        // max_wealth_array.push(max_gain);
        // max_wealth_max = Math.max(max_gain, max_wealth_max);
        // console.log(wealthList);



        // wealth_g
        //     // .selectAll('#wg')
        //     //     .attr('id', 'wg')
        //     //     .data(Object.keys(nameSpace))
        //     //     .enter()
        //     .append('path')
        //     // .attr('id', d => {
        //     //     return 'line' + d;
        //     // })
        //     .attr('d', this.lineBuilder(wealthList))
        //     .attr('fill', 'none')
        //     .attr('stroke', 'orange')
        //     .attr('stroke-opacity', 1)
        //     .attr('stroke-width', 3);

        // wealth_g.append('text')
        //     .text('#' + (select_people_num + 1).toString())
        //     .attr('x', this.x_scale_wealth(20) + 10)
        //     .attr('font-size', 20)
        //     // .attr('text-anchor', 'middle')
        //     .attr('dy', '0.2em')
        //     .attr('y', this.y_scale_wealth(wealthList[wealthList.length - 1].y));

        const pie_g = svgFlower.append('g');
        // ! # select_people_num
        // pie_g
        //     .selectAll("#txt")
        //     .attr('id', 'txt')
        //     .data([(++select_people_num)])
        //     .enter()
        //     .append('text')
        //     .text(d => '#' + d.toString())
        //     .attr('x', 10)
        //     .attr('y', 50)
        //     .attr('font-size', 25)
        //     .attr('dx', '1em')
        //     .attr('text-anchor', 'middle')
        //     .on('mouseover', d => {
        //         for (let i = 0; i < select_people_num; ++i) {
        //             if (i != parseInt(d) - 1) {
        //                 d3.selectAll('#line' + i.toString()).attr('stroke-opacity', 0.1);
        //                 d3.selectAll('#cir' + i.toString()).attr('stroke-opacity', 0.1);
        //                 d3.selectAll('#flower' + i.toString()).attr('stroke-opacity', 0.1).attr('fill-opacity', 0.1);
        //             }
        //         }
        //         DrawScatterLine(code);
        //     })
        //     .on('mouseout', d => {
        //         for (let i = 0; i < select_people_num; ++i) {
        //             if (i != parseInt(d) - 1) {
        //                 d3.selectAll('#line' + i.toString()).attr('stroke-opacity', 1);
        //                 d3.selectAll('#cir' + i.toString()).attr('stroke-opacity', 1);
        //                 d3.selectAll('#flower' + i.toString()).attr('stroke-opacity', 1).attr('fill-opacity', 1);
        //             }
        //         }
        //         d3.selectAll("#lineWWW").remove();
        //     });

        // console.log(this.x_scale_wealth(20));
        // console.log(personal_data);

        // let decisionDifferent = new Array();
        // for (let i = 0; i < personal_data.length - 1; ++i) {
        //     var diff_num = 0;
        //     // console.log(personal_data[i].decision)
        //     for (let j = 0; j < personal_data[i].decision.length; ++j) {
        //         if (personal_data[i + 1].decision[j] != personal_data[i].decision[j]) {
        //             diff_num++;
        //         }
        //     }
        //     decisionDifferent.push(diff_num);
        // }

        // console.log(decisionDifferent);

        // const lineWidthScale = d3.scaleLinear()
        //     .domain([d3.min(decisionDifferent), d3.max(decisionDifferent)])
        //     .range([1, 10]);
        // for (let i = 1; i < 20; ++i) {
        //     pie_g.append('line')
        //         .attr('x1', this.x_scale_wealth(i))
        //         .attr('x2', this.x_scale_wealth(i + 1))
        //         .attr('y1', 50)
        //         .attr('y2', 50).attr('stroke', 'gray')
        //         .attr('stroke-width', lineWidthScale(decisionDifferent[i - 1]))
        //         .attr('fill', 'none');
        // }
        // this.flowerInner = 5;
        // this.flowerOuter = 40;
        // const flowerScale = d3.scaleLinear()
        //     .domain([0, max_gain])
        //     .range([this.flowerInner, this.flowerOuter]);

        // const pie = d3.pie();
        // for (let i in personal_data) {
        //     let pie_data_personal = pie(personal_data[i].pie);
        //     for (let j = 0; j < pie_data_personal.length; ++j) {
        //         pie_data_personal[j].value = personal_data[i].flower[j];
        //     }
        //     // console.log(pie_data_personal)
        //     // console.log(personal_data[i]['flower'])
        //     const g_p = pie_g.selectAll("#flower" + code)
        //         .attr('id', 'flower' + code)
        //         .data(pie_data_personal)
        //         .enter()
        //         .append('g').attr("transform", "translate(" + this.x_scale_wealth(parseInt(i) + 1) + "," + (50) + ")")
        //     g_p.append('path')
        //         .attr('id', 'flower' + (select_people_num - 1).toString())
        //         .attr('d', (d, x) => {
        //             var arc_generator = d3.arc()
        //                 .innerRadius(this.flowerInner)
        //                 .outerRadius(flowerScale(Math.abs(parseFloat(d.value))));
        //             // .outerRadius(100)
        //             return arc_generator(d);
        //         })
        //         .attr('fill', (d, x) => {
        //             if (parseFloat(personal_data[i]['flower'][x]) <= 0) return 'red';
        //             else return 'green';
        //             // return 'blue'
        //         })
        //         .attr('stroke', 'black')
        //         .attr('stroke-width', 0.5)
        //     g_p.append('circle')
        //         .attr('r', this.flowerInner - 0.5)
        //         .attr('x', 0)
        //         .attr('y', 0)
        //         .attr('fill', 'white')
        //         .attr('stroke', 'blue');
        // }
        const horizon_data = new Array();
        // console.log(personal_data);
        for (let i = 0; i < personal_data[0].flower.length; ++i) {
            let horizon_tmp = new Array();
            for (let j in personal_data) {
                horizon_tmp.push(personal_data[j].flower[i]);
            }
            horizon_data.push(horizon_tmp);
        }
        // console.log(horizon_data);
        for (let i in horizon_data) {
            // if (parseInt(i) == 9) break;
            // console.log(i)
            drawHorizonR(horizon_data[i], max_gain, 4, ((heightFlower - 24) / 4 - 20) / 12 * parseInt(i) + 9, pie_g, select_people_num - 1);
        }
        pie_g.append('rect').attr('x', 4).attr('y', 9).attr('height', (heightFlower - 24) / 4 - 20).attr('width', widthHorizonMain - 30 - 10).attr('fill', 'white').attr("fill-opacity", 0).attr('stroke', 'black').attr('stroke-width', 1)
            .on('mouseover', d => {
                // con
                for (let i = 1; i <= select_people_num; ++i) {
                    d3.select('#pie_g' + i.toString()).attr('opacity', (i == parseInt(cnt) + 1 ? 1 : 0));
                    // DrawScatterLine(code);
                    d3.select("#outCircle" + (i - 1).toString()).attr("stroke-opacity", 1);
                }
                DrawScatterLine(code);
                // console.log(selectPeople[code + round], code + round)
                d3.selectAll('#curve' + (selectPeople[code + round].cnt).toString())
                    .attr('stroke-opacity', x => {
                        // console.log()
                        if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 1;
                        else return 0.1;
                    })
                    .attr('stroke', x => {
                        // console.log()
                        if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 'steelblue';
                        else return 'gray';
                    })
            })
            .on('mouseout', d => {
                d3.selectAll("#lineWWW").remove()
                for (let i = 1; i <= select_people_num; ++i) {
                    d3.select("#pie_g" + i.toString()).attr('opacity', 1);
                    d3.select("#outCircle" + (i - 1).toString()).attr('stroke-opacity', 0);
                }
                d3.selectAll('#curve' + (selectPeople[code + round].cnt).toString())
                    .attr('stroke-opacity', x => {
                        // console.log()
                        // if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 1;
                        // else return 0.1;
                        return 1;
                    })
                    .attr('stroke', x => {
                        // console.log()
                        // if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 'steelblue';
                        // else return 'gray';
                        return "steelblue";
                    })
            })
            .on("click", d => {
                console.log("del");
                d3.selectAll("#lineWWW").remove()
                d3.select('#sel' + (parseInt(cnt) + 1).toString()).remove();
                d3.select('#horizonSvg' + (parseInt(cnt) + 1).toString()).remove();
                d3.select('#pie_g' + (parseInt(cnt) + 1).toString()).remove();
                d3.select('#weal' + (parseInt(cnt) + 1).toString()).remove();
                max_wealth_array[cnt] = 'a';
                max_wealth_max = -9999;
                max_receive_array[parseInt(cnt)] = 'a';
                min_receive_array[parseInt(cnt)] = 'a';
                max_receive = -9999;
                min_receive = 9999;
                for (let i = 0; i < max_receive_array.length; ++i) {
                    if (max_receive_array[i] == 'a') continue;
                    max_wealth_max = Math.max(max_wealth_max, max_wealth_array[i]);
                    max_receive = Math.max(max_receive, max_receive_array[i]);
                    min_receive = Math.min(min_receive, min_receive_array[i]);
                }
                d3.selectAll("#lineWWW").remove()
                for (let i = 1; i <= select_people_num; ++i) {
                    d3.select("#pie_g" + i.toString()).attr('opacity', 1);
                    d3.select("#outCircle" + (i - 1).toString()).attr('stroke-opacity', 0);
                }
                d3.selectAll('#curve' + (selectPeople[code + round].cnt).toString())
                    .attr('stroke-opacity', x => {
                        // console.log()
                        // if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 1;
                        // else return 0.1;
                        return 1;
                    })
                    .attr('stroke', x => {
                        // console.log()
                        // if (x[0].id == code && parseInt(x[0].round) == parseInt(round)) return 'steelblue';
                        // else return 'gray';
                        return "steelblue";
                    })
            });
    });
}

function drawHorizonR(roundCount, max_num, move_x, move_y, compare_g, id) {
    // let roundCount = new Array();
    // console.log(roundCount)
    const horizon_height = ((heightFlower - 24) / 4 - 20) / 12;
    let max_people = 0;

    // for (let i = 0; i < roundCount.length; ++i) {
    //     // roundCount.push(0);
    //     max_people = Math.max(max_people, roundCount[i])
    // }
    let horizon_g = compare_g.append('g').attr('transform', 'translate(' + move_x + ',' + (move_y) + ')');
    let people_scale = d3.scaleLinear()
        .domain([0, max_num])
        .range([0, -horizon_height * 3]);
    let x_scale = d3.scaleLinear()
        .domain([0 + 1, roundCount.length - 1 + 1])
        .range([0, widthHorizonMain - 30 - 15]);

    // //画面积函数
    let color_scale = d3.scaleOrdinal()
        .domain([0, 1, 2])
        // .range(['orange', 'rgb(240, 189, 134)', 'rgb(243, 96, 102)'])
        .range(['#ffc07b', '#ff9966', '#ff6666'])
    let color_scale_2 = d3.scaleOrdinal()
        .domain([0, 1, 2])
        // .range(['#90EE90', '#00FF00', '#006400'])
        .range(['#A6DEC1', '#009543', '#18472C'])
        // '#18472C', '#009543', '#A6DEC1'
    var area_generator = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale((d));
        })
        .curve(d3.curveMonotoneX)
    var area_generator_2 = d3.area()
        .x(function (d, i) {
            return x_scale(i + 1);
        })
        .y0(0)
        .y1(function (d) {
            return people_scale((-d));
        })
        .curve(d3.curveMonotoneX)


    // for (let i = 0; i < 3; ++i) {
    horizon_g.append('g')
        .attr('clip-path', 'url(#h1)')
        .selectAll('#horV')
        .attr('id', 'horV')
        .data([roundCount, roundCount, roundCount])
        .enter()
        .append("path")
        .attr('id', "horizonV" + id)
        .attr("d", d => area_generator_2(d)) //d="M1,0L20,40.....  d-path data
        .attr('transform', (d, i) => 'translate(0, ' + ((i + 1) * horizon_height) + ')')
        .attr('fill-opacity', 0.5)
        .style("fill", (d, i) => color_scale(i))

    horizon_g.append('g')
        .attr('clip-path', 'url(#h1)')
        .selectAll('#horR')
        .attr('id', 'horR')
        .data([roundCount, roundCount, roundCount])
        .enter()
        .append("path")
        // .attr("d", area_generator(roundCount)) //d="M1,0L20,40.....  d-path data
        // .attr('transform', 'translate(0, ' + ((i + 1) * horizon_height) + ')')
        // .attr('fill-opacity', 0.5)
        // .style("fill", color_scale_2(i))
        .attr('id', "horizonR" + id)
        .attr("d", d => area_generator(d)) //d="M1,0L20,40.....  d-path data
        .attr('transform', (d, i) => 'translate(0, ' + ((i + 1) * horizon_height) + ')')
        .attr('fill-opacity', 0.5)
        .style("fill", (d, i) => color_scale_2(i))
    // }
    // console.log(roundCount.length);
    // horizon_g.append("g")
    //     .call(d3.axisBottom(x_scale).ticks(0))
    //     .attr("transform", "translate(0," + horizon_height + ")");
    horizon_g.append('line').attr('x1', x_scale.range()[0]).attr('x2', x_scale.range()[1]).attr('y1', 0).attr('y2', 0).attr('stroke', 'gray').attr('fill', 'none').attr('stroke-width', 0.5);
    horizon_g.append('line').attr('x1', x_scale.range()[0]).attr('x2', x_scale.range()[1]).attr('y1', horizon_height).attr('y2', horizon_height).attr('stroke', 'gray').attr('fill', 'none').attr('stroke-width', 0.5);
    horizon_g.append('clipPath')
        .attr('id', 'h1')
        .append('rect')
        .attr('width', c_width)
        .attr('height', horizon_height);

    // horizon_g.append('text')
    //     .attr('x', 5)
    //     .attr('y', 0)
    //     .attr('dy', '1em')
    //     .attr('font-family', 'STHeiti')
    //     .text(h_name);


}

drawWealthLine();


// for (let i = 0; i < 10; ++i)
// drawFlower
// drawFlower('5zc86wny');
// drawFlower('5zc86wny');
// drawFlower('5zc86wny');
// drawFlower('5zc86wny');