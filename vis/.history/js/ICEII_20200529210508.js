var width_ice = 611,
    height_ice = 330

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var lxBei = 8.5

var ice_svg = d3.select('#Sun').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)

var ice_rect = ice_svg.append('g')

ice_rect.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width_ice)
    .attr('height', height_ice)
    .attr('fill-opacity', 0)

var ice_line_g = 0; 

d3.csv('data/box_calcr.csv', function (Ice_d) {
    // console.log(Ice_d)
    var r = [];

    for (let i = 0; i < 33; ++i) {
        r.push({
            n: 0,
            member: [],
            type: 0,
            num: 0
        })
    }
    for (var i in Ice_d) {
        // console.log(Ice_d[i]);
        r[0].member.push(Ice_d[i]);
        r[0].n = 0;
        r[0].num = 0;
        r[0].type = "";
        if (Ice_d[i]['kaishi'] == 1) {
            r[1].member.push(Ice_d[i]);
            r[1].n = 1;
            r[1].num = 0;
            r[1].type = "初始富裕";
            if (Ice_d[i]['ability'] == 2) {
                r[2].member.push(Ice_d[i]);
                r[2].n = 2;
                r[2].num = 0;
                r[2].type = "工作能力强";
                if (Ice_d[i]['9'] == 0) {
                    r[3].member.push(Ice_d[i]);
                    r[3].n = 3;
                    r[3].num = 0;
                    r[3].type = "健康";
                } else if (Ice_d[i]['9'] == 1) {
                    r[4].member.push(Ice_d[i]);
                    r[4].n = 3;
                    r[4].num = 1;
                    r[4].type = "小病";
                } else if (Ice_d[i]['9'] == 2) {
                    r[5].member.push(Ice_d[i]);
                    r[5].n = 3;
                    r[5].num = 2;
                    r[5].type = "中病";
                } else {
                    r[6].member.push(Ice_d[i]);
                    r[6].n = 3;
                    r[6].num = 3;
                    r[6].type = "重病";
                }
            } else if (Ice_d[i]['ability'] == 1) {
                r[7].member.push(Ice_d[i]);
                r[7].n = 2;
                r[7].num = 1;
                r[7].type = "工作能力中";
                if (Ice_d[i]['9'] == 0) {
                    r[8].member.push(Ice_d[i]);
                    r[8].n = 3;
                    r[8].num = 4;
                    r[8].type = "健康";
                } else if (Ice_d[i]['9'] == 1) {
                    r[9].member.push(Ice_d[i]);
                    r[9].n = 3;
                    r[9].num = 5;
                    r[9].type = "小病";
                } else if (Ice_d[i]['9'] == 2) {
                    r[10].member.push(Ice_d[i]);
                    r[10].n = 3;
                    r[10].num = 6;
                    r[10].type = "中病";
                } else {
                    r[11].member.push(Ice_d[i]);
                    r[11].n = 3;
                    r[11].num = 7;
                    r[11].type = "重病";
                }
            } else {
                r[12].member.push(Ice_d[i]);
                r[12].n = 2;
                r[12].num = 2;
                r[12].type = "工作能力弱";
                if (Ice_d[i]['2'] == 2) {
                    r[13].member.push(Ice_d[i]);
                    r[13].n = 3;
                    r[13].num = 8;
                    r[13].type = "不投资";
                } else if (Ice_d[i]['2'] == 1) {
                    r[14].member.push(Ice_d[i]);
                    r[14].n = 3;
                    r[14].num = 9;
                    r[14].type = "投资5";
                } else {
                    r[15].member.push(Ice_d[i]);
                    r[15].n = 3;
                    r[15].num = 10;
                    r[15].type = "投资10";
                }
            }
        } else {
            r[16].member.push(Ice_d[i]);
            r[16].n = 1;
            r[16].num = 1;
            r[16].type = "初始贫穷";
            if (Ice_d[i]['9'] == 3) {
                r[17].member.push(Ice_d[i]);
                r[17].n = 2;
                r[17].num = 3;
                r[17].type = "重病";
                if (Ice_d[i]['ability'] == 2) {
                    r[18].member.push(Ice_d[i]);
                    r[18].n = 3;
                    r[18].num = 11;
                    r[18].type = "工作能力强";
                } else if (Ice_d[i]['ability'] == 1) {
                    r[19].member.push(Ice_d[i]);
                    r[19].n = 3;
                    r[19].num = 12;
                    r[19].type = "工作能力中";
                } else if (Ice_d[i]['ability'] == 0) {
                    r[20].member.push(Ice_d[i]);
                    r[20].n = 3;
                    r[20].num = 13;
                    r[20].type = "工作能力弱";
                }
            } else if (Ice_d[i]['9'] == 2) {
                r[21].member.push(Ice_d[i]);
                r[21].n = 2;
                r[21].num = 4;
                r[21].type = "中病";
                if (Ice_d[i]['ability'] == 2) {
                    r[22].member.push(Ice_d[i]);
                    r[22].n = 3;
                    r[22].num = 14;
                    r[22].type = "工作能力强";
                } else if (Ice_d[i]['ability'] == 1) {
                    r[23].member.push(Ice_d[i]);
                    r[23].n = 3;
                    r[23].num = 15;
                    r[23].type = "工作能力中";
                } else if (Ice_d[i]['ability'] == 0) {
                    r[24].member.push(Ice_d[i]);
                    r[24].n = 3;
                    r[24].num = 16;
                    r[24].type = "工作能力弱";
                }
            } else if (Ice_d[i]['9'] == 1) {
                r[25].member.push(Ice_d[i]);
                r[25].n = 2;
                r[25].num = 5;
                r[25].type = "小病";
                if (Ice_d[i]['ability'] == 2) {
                    r[26].member.push(Ice_d[i]);
                    r[26].n = 3;
                    r[26].num = 17;
                    r[26].type = "工作能力强";
                } else if (Ice_d[i]['ability'] == 1) {
                    r[27].member.push(Ice_d[i]);
                    r[27].n = 3;
                    r[27].num = 18;
                    r[27].type = "工作能力中";
                } else if (Ice_d[i]['ability'] == 0) {
                    r[28].member.push(Ice_d[i]);
                    r[28].n = 3;
                    r[28].num = 19;
                    r[28].type = "工作能力弱";
                }
            } else if (Ice_d[i]['9'] == 0) {
                r[29].member.push(Ice_d[i]);
                r[29].n = 2;
                r[29].num = 6;
                r[29].type = "健康";
                if (Ice_d[i]['ability'] == 2) {
                    r[30].member.push(Ice_d[i]);
                    r[30].n = 3;
                    r[30].num = 20;
                    r[30].type = "工作能力强";
                } else if (Ice_d[i]['ability'] == 1) {
                    r[31].member.push(Ice_d[i]);
                    r[31].n = 3;
                    r[31].num = 21;
                    r[31].type = "工作能力中";
                } else if (Ice_d[i]['ability'] == 0) {
                    r[32].member.push(Ice_d[i]);
                    r[32].n = 3;
                    r[32].num = 22;
                    r[32].type = "工作能力弱";
                }
            }
        }
    }

    var ice_max = -999999

    // console.log(r)

    for (var i in r[0].member) {
        ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129])))
    }
    var p_g = ice_rect.append('g')

    ice_max = 1000;
    var line_scale = d3.scale.linear()
        .domain([0, Math.log2(ice_max)])
        .range([0, height_ice / 4])
    // console.log(r)

    var colora = "#FFFFFF"
    var colorb = color[0]

    let colorx = d3.interpolate(colora, colorb);
    var color_scale = d3.scale.linear()
        .domain([0.5, 0.667])
        .range([0, 1])

    let colorx2 = d3.interpolate('red', '#00FF00');
    var color_scale2 = d3.scale.linear()
        .domain([-1, 1])
        .range([0, 1])

    p_g.selectAll('#rr_')
        .attr('id', 'rr_')
        .data(r)
        .enter()
        .append('rect')
        .attr('y', d => {
            if (d.n == 0) return 0;
            return (d.n - 1) * height_ice / (lxBei / 2) + height_ice / lxBei;
            // return 100
        })
        .attr('x', d => {
            let cnt = 0;
            for (let i in r) {
                if (r[i].n == d.n && r[i].num < d.num)
                    cnt += r[i].member.length;
            }
            return cnt * width_ice / 6080;
        })
        .attr('height', d => {
            if (d.n == 0) return height_ice / lxBei;
            else return height_ice / (lxBei / 2);
        })
        .attr('width', d => {
            return d.member.length * width_ice / 6080;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'none')

    rk = []

    for (let i = 0; i < r.length; ++i) {
        if (r[i].n != 3) continue;
        // console.log(r[i]);
        let low = 0,
            mid = 0,
            high = 0;
        for (let j in r[i].member) {
            if (r[i].member[j]['label'] == 0) low++;
            else if (r[i].member[j]['label'] == 1) mid++;
            else high++;
        }
        rk.push({
            n: r[i],
            color: '#00FF00',
            width: high
        }, {
            n: r[i],
            color: 'yellow',
            width: mid
        }, {
            n: r[i],
            color: 'red',
            width: low
        })
    }

    // console.log(rk)

    p_g.selectAll('#rr__')
        .attr('id', 'rr__')
        .data(rk)
        .enter()
        .append('rect')
        .attr('y', d => {
            // if (d.n == 0) return 0;
            return 3 * height_ice / (lxBei / 2) + height_ice / lxBei;
            // return 100
        })
        .attr('x', (d, i) => {
            let cnt = 0;
            for (let j in rk) {
                if (j < i)
                    cnt += rk[j].width;
            }
            return cnt * width_ice / 6080;
        })
        .attr('height', d => {
            return height_ice / 9;
            // else return height_ice / 4;
        })
        .attr('width', d => {
            return d.width * width_ice / 6080;
        })
        .attr('stroke', d => {
            return d.color;
        })
        .attr('stroke-width', 1)
        .attr('fill', d => {
            return d.color;
        })
        .attr('opacity', 0.7)

    p_g.selectAll('#r_1')
        .attr('id', 'r_1').data(r)
        .enter()
        .append('text')
        .attr('font-size', 15)
        .attr('y', d => {
            // if (d.n == 1) return 0;
            // return (d.n - 2) * height_ice / 4 + height_ice / 8;
            // return 100
            if (d.n == 0) return 0;
            return (d.n - 1) * height_ice / (lxBei / 2) + height_ice / lxBei;
        })
        .attr('x', d => {
            var cnt = 0;
            for (var i in r) {
                if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
            }
            if (d.n == 4) cnt += r[3].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        // .attr('dx', (d, i) => {
        //     var len_in = 0;
        //     if (i == 1 || i == 2) len_in = 4 * 15
        //     if (i == 3 || i == 6) len_in = 5 * 15
        //     if (i == 4 || i == 5) len_in = 6 * 15
        //     if (i == 7 || i == 8 || i == 10) len_in = 2 * 15
        //     if (i == 9) len_in = 3 * 15
        //     return d.member.length * width_ice / 6080 / 2 - len_in / 2
        // })
        .attr('dy', '1em')
        .text(d => {
            if (d.n != 3 && d.type[0] == '工') {
                return d.type[4];
            }
            if (d.n != 3)
                return d.type
        })

    for (var k = 0; k < 33; ++k) {
        // if (k != 0)
        p_g.selectAll('#linein')
            .attr('id', 'linein')
            .data(r[k].member)
            .enter()
            .append('line')
            .attr('x1', (d, i) => {
                var cnt = 0;
                for (var j in r) {
                    if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                }
                // if (r[k].n == 4) cnt += r[3].member.length
                // console.log(i / 10 + cnt / 10 + r[k].num * 1)
                return i / 10 + cnt * width_ice / 6080 + r[k].num * 1;
            })
            .attr('y1', d => {
                if (k == 0)
                    return height_ice / 8
                return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / lxBei
            })
            .attr('x2', (d, i) => {
                // return i / 10;
                var cnt = 0;
                for (var j in r) {
                    if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                }
                // if (r[k].n == 4) cnt += r[3].member.length
                return i / 10 + cnt * width_ice / 6080 + r[k].num * 1;
            })
            .attr('y2', d => {
                if (Math.log2(Math.abs(parseFloat(d[129]))) <= 0)
                    return (r[k].n + 1) * height_ice / 4 - height_ice / 8
                if (k == 0)
                    return height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2
                return (r[k].n + 1) * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2
            })
            .attr('fill', 'none')
            .attr('stroke', d => {
                if (parseFloat(d[129]) > 0)
                    return '#00FF00';
                else
                    return 'red'
            })
            .attr('stroke-width', 0.1)
    }
    // console.log(r)


    var tree_legend = [{
        name: '富裕',
        color: '#00FF00'
    }, {
        name: '中产',
        color: 'yellow'
    }, {
        name: '贫穷',
        color: 'red'
    }]

    p_g.selectAll('#legend_cir')
        .attr('id', 'legend_cir')
        .data(tree_legend)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => {
            return 500 + i * 20
        })
        .attr('cy', (d, i) => {
            // return i * 20 + 255
            return 315;
        })
        .attr('r', 5)
        .attr('fill', d => {
            return d.color
        })
        .attr('opacity', 0.5)

    // p_g.selectAll('#legend_cir')
    //     .attr('id', 'legend_cir')
    //     .data(tree_legend)
    //     .enter()
    //     .append('text')
    //     .attr('font-size', 15)
    //     .attr('font-family', 'kaiti')
    //     .attr('x', (d, i) => {
    //         return 560
    //     })
    //     .attr('y', (d, i) => {
    //         return i * 20 + 260
    //     })
    //     // .attr('r', 5)
    //     // .attr('fill', d => {
    //     // return d.color
    //     // })
    //     .text(d => {
    //         return d.name
    //     })
})