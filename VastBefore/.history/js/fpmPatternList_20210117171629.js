var width = document.getElementById("chart").offsetWidth,
    height = 5000;

var svg;

svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

function DrawMatrix(select_treat) {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype3.csv").then((data2) => {
            d3.csv("data/fpm01.csv").then((data3) => {
                d3.csv("data/treatment.csv").then((treatment) => {
                    // console.log(data3);
                    let treat = new Object();
                    for (let i = 0; i < treatment.length; ++i) {
                        // console.log(i);
                        treat[treatment[i].code] = parseInt(treatment[i].treat);
                    }
                    let similar = new Object();
                    for (let i = 0; i < data3.length; ++i) {
                        similar[i] = 0;
                        for (let j = 1; j < 14; ++j) {
                            if (data3[i][j] != "-1") {
                                similar[i]++;
                            }
                        }
                    }
                    // console.log(similar);
                    let pie = d3.pie();

                    var color = ['#c32fe9', '#e4e92f', '#2fe9b3', '#2f8fe9', '#2E8B57', '#e92f', '#FFFACD'];

                    let value = new Array();
                    let filter = new Object();
                    for (let i = 0; i < data.length; ++i) {
                        data[i]['type'] = new Array();
                        data[i]['pie'] = new Array();
                        data[i]['typeA'] = parseInt(data2[i][0]);
                        if (parseFloat(data[i]['129']) > 600)
                            data[i]['129'] = 600;
                        if (parseFloat(data[i]['129'] < -600))
                            data[i]['129'] = -600;
                        // if (parseInt(data2[i]['0']) != 7)
                        //     data[i]['typeA'] = '*';
                        // else 
                        //     data[i]['typeA'] = '+';
                        for (let j = 1; j < 5; ++j) {
                            if (isNaN(parseInt(data2[i][j]))) break;
                            // typeCount[parseInt(data2[i][j])]++;
                            // typeMax = Math.max()
                            data[i]['type'].push(parseInt(data2[i][j]));
                            data[i]['pie'].push(1);
                        }
                        if (parseInt(data[i]['biao']) == 10 && parseInt(data[i]['129']) > 0) {
                            filter[data[i].code] = 1;
                        }
                    }
                    // console.log(filter)
                    for (let i = 0; i < data.length; ++i) {
                        // if (filter[data[i].code]) continue;
                        if (parseInt(data[i]['biao']) == 20) {
                            if (select_treat != -1 && treat[data[i].code] != select_treat)
                                continue;
                            value.push({
                                v: parseFloat(data[i]['129']),
                                code: data[i].code
                            });
                        }
                    }
                    // console.log(value);
                    let name = new Object();
                    let type = new Object();
                    let typeCnt = new Object();
                    for (let i = 0; i < data.length; ++i) {
                        if (typeof (type[data[i].code]) == 'undefined') {
                            typeCnt[data[i].code] = new Array();
                            type[data[i].code] = data[i];
                        } else {
                            let cnt = 0;
                            for (let j = 1; j < 14; ++j) {
                                if (j == 1 || j == 12) continue;
                                if (type[data[i].code][j] == data[i][j]) {
                                    cnt++;
                                }
                            }
                            typeCnt[data[i].code].push(cnt);
                        }
                    }
                    // console.log(typeCnt);

                    let connectScale = d3.scaleLinear()
                        .domain([11, 0])
                        .range([0, 8])
                    let rc = d3.scaleLinear()
                        .domain([0, 5])
                        .range([0, 1]);

                    value.sort(function (a, b) {
                        return b.v - a.v;
                    })
                    // console.log(value);

                    for (let i in value) {
                        name[value[i].code] = parseInt(i);
                    }
                    console.log(name)

                    for (let i in value) {
                        // if (i == 304) break;
                        // name[data[i].code] = i;
                        svg.append('text')
                            .attr('x', 20)
                            .attr('y', (parseInt(i) + 1) * 30)
                            .attr('font-size', 15)
                            .text(value[i].code);
                    }
                    for (let i in typeCnt) {
                        for (let j in typeCnt[i]) {
                            // console.log(j);
                            if (isNaN(parseInt(name[i])))
                                continue;
                            svg.append('line')
                                .attr('x1', 60 + (j) * 20 + 6 + 20)
                                .attr('y1', 20 * (name[i] + 1) - 3)
                                .attr('x2', 60 + (j) * 20 + 20 + 6 + 8)
                                .attr('y2', 20 * (name[i] + 1) - 3)
                                .attr('fill', 'none')
                                .attr('stroke', 'gray')
                                .attr('stroke-width', connectScale(typeCnt[i][j]));
                        }
                    }

                    let wScale = d3.scaleLinear()
                        .domain([-600, 600])
                        .range([-10, 10]);

                    for (let i = 0; i < data.length; ++i) {
                        if (isNaN(parseInt(name[data[i].code])))
                            continue;
                        let arc = d3.arc()
                            .innerRadius(4 + wScale(parseFloat(data[i]['129'])))
                            .outerRadius(6 + wScale(parseFloat(data[i]['129'])));
                        let pie_data = pie(data[i].pie);
                        // console.log(name[data[i].code])
                        svg
                            .selectAll('#pieT')
                            .attr('id', 'pieT')
                            .data(pie_data)
                            .enter()
                            .append('g')
                            .attr('transform', 'translate(' + (60 + parseInt(data[i].biao) * 20) + ',' + (20 * (name[data[i].code] + 1) - 3) + ')')
                            .append('path')
                            .attr('d', d => {
                                // console.log(d);
                                return arc(d);
                            })
                            .attr('fill', (d, x) => color[data[i].type[x]])
                            .attr('stroke', (d, x) => 'black')
                            .attr('stroke-width', (d, x) => {
                                // if (data[i].typeA < similar[data[i].type[x]])
                                // return 0.5;
                                // return 0;
                                return rc(similar[data[i].type[x]] - data[i].typeA);
                            })
                        // .attr("stroke-dasharray", );
                    }
                })
            })
        })
    })
}
DrawMatrix(-1);