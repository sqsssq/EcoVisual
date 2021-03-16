var width_ice = 611,
    height_ice = 330

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var lxBei = 9

var ice_svg = d3.select('#Sun').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)

var ice_rect = ice_svg.append('g')

// ice_rect.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('width', width_ice)
//     .attr('height', height_ice)
//     .attr('fill-opacity', 0)

var ice_line_g = 0;

function DrawIceRect() {
    if (ice_rect != 0) {
        ice_rect.remove();
        ice_rect = ice_svg.append('g');
    }
    d3.csv('data/box_calcr.csv', function (Ice_d) {
        // console.log(Ice_d)
        var r = [];

        // for (let i = 0; i < 33; ++i) {
        //     r.push({
        //         n: 0,
        //         member: [],
        //         type: 0,
        //         num: 0
        //     })
        // }
        // for (var i in Ice_d) {
        //     // console.log(Ice_d[i]);
        //     r[0].member.push(Ice_d[i]);
        //     r[0].n = 0;
        //     r[0].num = 0;
        //     r[0].type = "";
        //     if (Ice_d[i]['kaishi'] == 1) {
        //         r[1].member.push(Ice_d[i]);
        //         r[1].n = 1;
        //         r[1].num = 0;
        //         r[1].type = "初始富裕";
        //         if (Ice_d[i]['ability'] == 2) {
        //             r[2].member.push(Ice_d[i]);
        //             r[2].n = 2;
        //             r[2].num = 0;
        //             r[2].type = "工作能力强";
        //             if (Ice_d[i]['9'] == 0) {
        //                 r[3].member.push(Ice_d[i]);
        //                 r[3].n = 3;
        //                 r[3].num = 0;
        //                 r[3].type = "健康";
        //             } else if (Ice_d[i]['9'] == 1) {
        //                 r[4].member.push(Ice_d[i]);
        //                 r[4].n = 3;
        //                 r[4].num = 1;
        //                 r[4].type = "小病";
        //             } else if (Ice_d[i]['9'] == 2) {
        //                 r[5].member.push(Ice_d[i]);
        //                 r[5].n = 3;
        //                 r[5].num = 2;
        //                 r[5].type = "中病";
        //             } else {
        //                 r[6].member.push(Ice_d[i]);
        //                 r[6].n = 3;
        //                 r[6].num = 3;
        //                 r[6].type = "重病";
        //             }
        //         } else if (Ice_d[i]['ability'] == 1) {
        //             r[7].member.push(Ice_d[i]);
        //             r[7].n = 2;
        //             r[7].num = 1;
        //             r[7].type = "工作能力中";
        //             if (Ice_d[i]['9'] == 0) {
        //                 r[8].member.push(Ice_d[i]);
        //                 r[8].n = 3;
        //                 r[8].num = 4;
        //                 r[8].type = "健康";
        //             } else if (Ice_d[i]['9'] == 1) {
        //                 r[9].member.push(Ice_d[i]);
        //                 r[9].n = 3;
        //                 r[9].num = 5;
        //                 r[9].type = "小病";
        //             } else if (Ice_d[i]['9'] == 2) {
        //                 r[10].member.push(Ice_d[i]);
        //                 r[10].n = 3;
        //                 r[10].num = 6;
        //                 r[10].type = "中病";
        //             } else {
        //                 r[11].member.push(Ice_d[i]);
        //                 r[11].n = 3;
        //                 r[11].num = 7;
        //                 r[11].type = "重病";
        //             }
        //         } else {
        //             r[12].member.push(Ice_d[i]);
        //             r[12].n = 2;
        //             r[12].num = 2;
        //             r[12].type = "工作能力弱";
        //             if (Ice_d[i]['2'] == 2) {
        //                 r[13].member.push(Ice_d[i]);
        //                 r[13].n = 3;
        //                 r[13].num = 8;
        //                 r[13].type = "不投资";
        //             } else if (Ice_d[i]['2'] == 1) {
        //                 r[14].member.push(Ice_d[i]);
        //                 r[14].n = 3;
        //                 r[14].num = 9;
        //                 r[14].type = "投资5";
        //             } else {
        //                 r[15].member.push(Ice_d[i]);
        //                 r[15].n = 3;
        //                 r[15].num = 10;
        //                 r[15].type = "投资10";
        //             }
        //         }
        //     } else {
        //         r[16].member.push(Ice_d[i]);
        //         r[16].n = 1;
        //         r[16].num = 1;
        //         r[16].type = "初始贫穷";
        //         if (Ice_d[i]['9'] == 3) {
        //             r[17].member.push(Ice_d[i]);
        //             r[17].n = 2;
        //             r[17].num = 3;
        //             r[17].type = "重病";
        //             if (Ice_d[i]['ability'] == 2) {
        //                 r[18].member.push(Ice_d[i]);
        //                 r[18].n = 3;
        //                 r[18].num = 11;
        //                 r[18].type = "工作能力强";
        //             } else if (Ice_d[i]['ability'] == 1) {
        //                 r[19].member.push(Ice_d[i]);
        //                 r[19].n = 3;
        //                 r[19].num = 12;
        //                 r[19].type = "工作能力中";
        //             } else if (Ice_d[i]['ability'] == 0) {
        //                 r[20].member.push(Ice_d[i]);
        //                 r[20].n = 3;
        //                 r[20].num = 13;
        //                 r[20].type = "工作能力弱";
        //             }
        //         } else if (Ice_d[i]['9'] == 2) {
        //             r[21].member.push(Ice_d[i]);
        //             r[21].n = 2;
        //             r[21].num = 4;
        //             r[21].type = "中病";
        //             if (Ice_d[i]['ability'] == 2) {
        //                 r[22].member.push(Ice_d[i]);
        //                 r[22].n = 3;
        //                 r[22].num = 14;
        //                 r[22].type = "工作能力强";
        //             } else if (Ice_d[i]['ability'] == 1) {
        //                 r[23].member.push(Ice_d[i]);
        //                 r[23].n = 3;
        //                 r[23].num = 15;
        //                 r[23].type = "工作能力中";
        //             } else if (Ice_d[i]['ability'] == 0) {
        //                 r[24].member.push(Ice_d[i]);
        //                 r[24].n = 3;
        //                 r[24].num = 16;
        //                 r[24].type = "工作能力弱";
        //             }
        //         } else if (Ice_d[i]['9'] == 1) {
        //             r[25].member.push(Ice_d[i]);
        //             r[25].n = 2;
        //             r[25].num = 5;
        //             r[25].type = "小病";
        //             if (Ice_d[i]['ability'] == 2) {
        //                 r[26].member.push(Ice_d[i]);
        //                 r[26].n = 3;
        //                 r[26].num = 17;
        //                 r[26].type = "工作能力强";
        //             } else if (Ice_d[i]['ability'] == 1) {
        //                 r[27].member.push(Ice_d[i]);
        //                 r[27].n = 3;
        //                 r[27].num = 18;
        //                 r[27].type = "工作能力中";
        //             } else if (Ice_d[i]['ability'] == 0) {
        //                 r[28].member.push(Ice_d[i]);
        //                 r[28].n = 3;
        //                 r[28].num = 19;
        //                 r[28].type = "工作能力弱";
        //             }
        //         } else if (Ice_d[i]['9'] == 0) {
        //             r[29].member.push(Ice_d[i]);
        //             r[29].n = 2;
        //             r[29].num = 6;
        //             r[29].type = "健康";
        //             if (Ice_d[i]['ability'] == 2) {
        //                 r[30].member.push(Ice_d[i]);
        //                 r[30].n = 3;
        //                 r[30].num = 20;
        //                 r[30].type = "工作能力强";
        //             } else if (Ice_d[i]['ability'] == 1) {
        //                 r[31].member.push(Ice_d[i]);
        //                 r[31].n = 3;
        //                 r[31].num = 21;
        //                 r[31].type = "工作能力中";
        //             } else if (Ice_d[i]['ability'] == 0) {
        //                 r[32].member.push(Ice_d[i]);
        //                 r[32].n = 3;
        //                 r[32].num = 22;
        //                 r[32].type = "工作能力弱";
        //             }
        //         }
        //     }
        // }

        for (let i = 0; i < 33; ++i) {
            r.push({
                n: 0,
                member: [],
                type: 0,
                num: 0,
                cnt: 0,
                cntnum: {
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0
                },
                shannon: 0
            })
        }


        for (var i in Ice_d) {
            // console.log(Ice_d[i]);
            r[0].member.push(Ice_d[i]);
            r[0].n = 0;
            r[0].num = 0;
            r[0].cnt++;
            r[0].cntnum[Ice_d[i]['kaishi']]++;
            r[0].type = "";
            if (Ice_d[i]['kaishi'] == 1) {
                r[1].member.push(Ice_d[i]);
                r[1].n = 1;
                r[1].num = 0;
                r[1].cnt++;
                r[1].cntnum[Ice_d[i]['ability']]++;
                r[1].type = "初始富裕";
                if (Ice_d[i]['ability'] == 2) {
                    r[2].member.push(Ice_d[i]);
                    r[2].n = 2;
                    r[2].num = 0;
                    r[2].cnt++;
                    r[2].cntnum[Ice_d[i]['9']]++;
                    r[2].type = "工作能力强";
                    if (Ice_d[i]['9'] == 0) {
                        r[3].member.push(Ice_d[i]);
                        r[3].n = 3;
                        r[3].num = 0;
                        r[3].cnt++;
                        r[3].cntnum[Ice_d[i]['label']]++;
                        r[3].type = "健康";
                    } else if (Ice_d[i]['9'] == 1) {
                        r[4].member.push(Ice_d[i]);
                        r[4].n = 3;
                        r[4].num = 1;
                        r[4].cnt++;
                        r[4].cntnum[Ice_d[i]['label']]++;
                        r[4].type = "小病";
                    } else if (Ice_d[i]['9'] == 2) {
                        r[5].member.push(Ice_d[i]);
                        r[5].n = 3;
                        r[5].num = 2;
                        r[5].cnt++;
                        r[5].cntnum[Ice_d[i]['label']]++;
                        r[5].type = "中病";
                    } else {
                        r[6].member.push(Ice_d[i]);
                        r[6].n = 3;
                        r[6].num = 3;
                        r[6].cnt++;
                        r[6].cntnum[Ice_d[i]['label']]++;
                        r[6].type = "重病";
                    }
                } else if (Ice_d[i]['ability'] == 1) {
                    r[7].member.push(Ice_d[i]);
                    r[7].n = 2;
                    r[7].num = 1;
                    r[7].cnt++;
                    r[7].cntnum[Ice_d[i]['9']]++;
                    r[7].type = "工作能力中";
                    if (Ice_d[i]['9'] == 0) {
                        r[8].member.push(Ice_d[i]);
                        r[8].n = 3;
                        r[8].num = 4;
                        r[8].cnt++;
                        r[8].cntnum[Ice_d[i]['label']]++;
                        r[8].type = "健康";
                    } else if (Ice_d[i]['9'] == 1) {
                        r[9].member.push(Ice_d[i]);
                        r[9].n = 3;
                        r[9].num = 5;
                        r[9].cnt++;
                        r[9].cntnum[Ice_d[i]['label']]++;
                        r[9].type = "小病";
                    } else if (Ice_d[i]['9'] == 2) {
                        r[10].member.push(Ice_d[i]);
                        r[10].n = 3;
                        r[10].num = 6;
                        r[10].cnt++;
                        r[10].cntnum[Ice_d[i]['label']]++;
                        r[10].type = "中病";
                    } else {
                        r[11].member.push(Ice_d[i]);
                        r[11].n = 3;
                        r[11].num = 7;
                        r[11].cnt++;
                        r[11].cntnum[Ice_d[i]['label']]++;
                        r[11].type = "重病";
                    }
                } else {
                    r[12].member.push(Ice_d[i]);
                    r[12].n = 2;
                    r[12].num = 2;
                    r[12].cnt++;
                    r[12].cntnum[Ice_d[i]['2']]++;
                    r[12].type = "工作能力弱";
                    if (Ice_d[i]['2'] == 2) {
                        r[13].member.push(Ice_d[i]);
                        r[13].n = 3;
                        r[13].num = 8;
                        r[13].cnt++;
                        r[13].cntnum[Ice_d[i]['label']]++;
                        r[13].type = "不投资";
                    } else if (Ice_d[i]['2'] == 1) {
                        r[14].member.push(Ice_d[i]);
                        r[14].n = 3;
                        r[14].num = 9;
                        r[14].cnt++;
                        r[14].cntnum[Ice_d[i]['label']]++;
                        r[14].type = "投资5";
                    } else {
                        r[15].member.push(Ice_d[i]);
                        r[15].n = 3;
                        r[15].num = 10;
                        r[15].cnt++;
                        r[15].cntnum[Ice_d[i]['label']]++;
                        r[15].type = "投资10";
                    }
                }
            } else {
                r[16].member.push(Ice_d[i]);
                r[16].n = 1;
                r[16].num = 1;
                r[16].cnt++;
                r[16].cntnum[Ice_d[i]['9']]++;
                r[16].type = "初始贫穷";
                if (Ice_d[i]['9'] == 3) {
                    r[17].member.push(Ice_d[i]);
                    r[17].n = 2;
                    r[17].num = 3;
                    r[17].cnt++;
                    r[17].cntnum[Ice_d[i]['ability']]++;
                    r[17].type = "重病";
                    if (Ice_d[i]['ability'] == 2) {
                        r[18].member.push(Ice_d[i]);
                        r[18].n = 3;
                        r[18].num = 11;
                        r[18].cnt++;
                        r[18].cntnum[Ice_d[i]['label']]++;
                        r[18].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[19].member.push(Ice_d[i]);
                        r[19].n = 3;
                        r[19].num = 12;
                        r[19].cnt++;
                        r[19].cntnum[Ice_d[i]['label']]++;
                        r[19].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[20].member.push(Ice_d[i]);
                        r[20].n = 3;
                        r[20].num = 13;
                        r[20].cnt++;
                        r[20].cntnum[Ice_d[i]['label']]++;
                        r[20].type = "工作能力弱";
                    }
                } else if (Ice_d[i]['9'] == 2) {
                    r[21].member.push(Ice_d[i]);
                    r[21].n = 2;
                    r[21].num = 4;
                    r[21].cnt++;
                    r[21].cntnum[Ice_d[i]['ability']]++;
                    r[21].type = "中病";
                    if (Ice_d[i]['ability'] == 2) {
                        r[22].member.push(Ice_d[i]);
                        r[22].n = 3;
                        r[22].num = 14;
                        r[22].cnt++;
                        r[22].cntnum[Ice_d[i]['label']]++;
                        r[22].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[23].member.push(Ice_d[i]);
                        r[23].n = 3;
                        r[23].num = 15;
                        r[23].cnt++;
                        r[23].cntnum[Ice_d[i]['label']]++;
                        r[23].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[24].member.push(Ice_d[i]);
                        r[24].n = 3;
                        r[24].num = 16;
                        r[24].cnt++;
                        r[24].cntnum[Ice_d[i]['label']]++;
                        r[24].type = "工作能力弱";
                    }
                } else if (Ice_d[i]['9'] == 1) {
                    r[25].member.push(Ice_d[i]);
                    r[25].n = 2;
                    r[25].num = 5;
                    r[25].cnt++;
                    r[25].cntnum[Ice_d[i]['ability']]++;
                    r[25].type = "小病";
                    if (Ice_d[i]['ability'] == 2) {
                        r[26].member.push(Ice_d[i]);
                        r[26].n = 3;
                        r[26].num = 17;
                        r[26].cnt++;
                        r[26].cntnum[Ice_d[i]['label']]++;
                        r[26].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[27].member.push(Ice_d[i]);
                        r[27].n = 3;
                        r[27].num = 18;
                        r[27].cnt++;
                        r[27].cntnum[Ice_d[i]['label']]++;
                        r[27].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[28].member.push(Ice_d[i]);
                        r[28].n = 3;
                        r[28].num = 19;
                        r[28].cnt++;
                        r[28].cntnum[Ice_d[i]['label']]++;
                        r[28].type = "工作能力弱";
                    }
                } else if (Ice_d[i]['9'] == 0) {
                    r[29].member.push(Ice_d[i]);
                    r[29].n = 2;
                    r[29].num = 6;
                    r[29].cnt++;
                    r[29].cntnum[Ice_d[i]['ability']]++;
                    r[29].type = "健康";
                    if (Ice_d[i]['ability'] == 2) {
                        r[30].member.push(Ice_d[i]);
                        r[30].n = 3;
                        r[30].num = 20;
                        r[30].cnt++;
                        r[30].cntnum[Ice_d[i]['label']]++;
                        r[30].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[31].member.push(Ice_d[i]);
                        r[31].n = 3;
                        r[31].num = 21;
                        r[31].cnt++;
                        r[31].cntnum[Ice_d[i]['label']]++;
                        r[31].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[32].member.push(Ice_d[i]);
                        r[32].n = 3;
                        r[32].num = 22;
                        r[32].cnt++;
                        r[32].cntnum[Ice_d[i]['label']]++;
                        r[32].type = "工作能力弱";
                    }
                }
            }
        }
        // console.log(r)
        let krmax = -1000,
            krmin = 1000;
        for (let i = 0; i < 33; ++i) {
            if (r[i].cnt == 0) {
                continue;
            }
            var sum = 0;
            for (let j in r[i].cntnum) {
                if (r[i].cntnum[j] == 0) break;
                let prob = r[i].cntnum[j] / r[i].cnt;
                sum += prob * Math.log2(prob);
            }
            r[i].shannon = -sum;
            krmax = Math.max(krmax, r[i].shannon);
            krmin = Math.min(krmin, r[i].shannon);
        }

        // console.log(min, max);
        var colora = "#FFFFFF"
        var colorb = '#7cb5ec'
        // var colorb = '#f7a35c'

        let colore = d3.interpolate(colora, colorb);
        var color_scalekr = d3.scale.linear()
            .domain([krmin, krmax])
            .range([0, 1])

        var ice_max = -999999

        // console.log(r)

        for (var i in r[0].member) {
            ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129])))
        }
        var p_g = ice_rect.append('g')

        ice_max = 1000;
        var line_scale = d3.scale.linear()
            .domain([0, Math.log2(ice_max)])
            .range([0, height_ice / (lxBei / 1.9)])
        // console.log(r)

        // var colora = "#FFFFFF"
        // var colorb = color[0]

        // let colorx = d3.interpolate(colora, colorb);
        // var color_scale = d3.scale.linear()
        //     .domain([0.5, 0.667])
        //     .range([0, 1])

        // let colorx2 = d3.interpolate('#00FF00', 'red');
        // var color_scale2 = d3.scale.linear()
        //     .domain([-1, 1])
        //     .range([0, 1])

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
            .attr('fill', d => {
                // return colore(color_scalekr(d.shannon));
                return 'none';
            })

        let line_r_data = [0, 1, 2, 3];
        p_g.selectAll('#r_line')
            .attr('id', 'r_line')
            .data(line_r_data)
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', d => {
                if (d == 0) {
                    return height_ice / (2 * lxBei)
                }
                return (d - 1 / 2) * height_ice / (lxBei / 2) + height_ice / lxBei;
            })
            .attr('x2', width_ice)
            .attr('y2', d => {
                if (d == 0) {
                    return height_ice / (2 * lxBei)
                }
                return (d - 1 / 2) * height_ice / (lxBei / 2) + height_ice / lxBei;
            })
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);
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
                color: 'red',
                width: high
            }, {
                n: r[i],
                color: 'yellow',
                width: mid
            }, {
                n: r[i],
                color: '#00FF00',
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
                return height_ice / 9.9;
                // else return height_ice / (lxBei / 2);
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
                // return (d.n - 2) * height_ice / (lxBei / 2) + height_ice / (lxBei);
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
            .attr('dx', (d, i) => {
                var len_in = 0;
                // if (i == 1 || i == 2) len_in = 4 * 15
                // if (i == 3 || i == 6) len_in = 5 * 15
                // if (i == 4 || i == 5) len_in = 6 * 15
                // if (i == 7 || i == 8 || i == 10) len_in = 2 * 15
                // if (i == 9) len_in = 3 * 15
                if (d.type[0] == '初') len_in = 4 * 15
                if (d.type[0] == '工') len_in = 15;
                if (d.type[1] == '病' || d.type[1] == '康') len_in = 2 * 15;
                return d.member.length * width_ice / 6080 / 2 - len_in / 2
            })
            .attr('dy', '1em')
            .text(d => {
                if (d.type[0] == '工' && 15 < d.member.length * width_ice / 6080) {
                    return d.type[4];
                } else if (30 < d.member.length * width_ice / 6080)
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
                    return i / 10 + cnt * width_ice / 6080;
                })
                .attr('y1', d => {
                    if (k == 0)
                        return height_ice / (lxBei * 2)
                    return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / lxBei - height_ice / (lxBei)
                })
                .attr('x2', (d, i) => {
                    // return i / 10;
                    var cnt = 0;
                    for (var j in r) {
                        if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                    }
                    // if (r[k].n == 4) cnt += r[3].member.length
                    return i / 10 + cnt * width_ice / 6080;
                })
                .attr('y2', d => {
                    if (Math.log2(Math.abs(parseFloat(d[129]))) <= 0) {
                        if (k == 0)
                            return height_ice / (lxBei * 2)
                        return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / (lxBei) - height_ice / (lxBei)
                    }
                    if (k == 0) {
                        
                        if (parseFloat(d[129]) >= 0)
                        return height_ice / (lxBei * 2) - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 4
                        else
                        
                        return height_ice / (lxBei * 2) + line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 4
                    }
                        if (parseFloat(d[129]) >= 0)
                        return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / (lxBei) - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2 - height_ice / (lxBei)
                    else
                        return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / (lxBei) + line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2 - height_ice / (lxBei)
                })
                .attr('fill', 'none')
                .attr('stroke', d => {
                    // if (parseFloat(d[129]) > 0)
                    //     return 'red';
                    // else
                    //     return '#00FF00'
                    if (parseInt(d["label"]) == 2) {
                        return 'red'
                    }
                    if (parseInt(d["label"]) == 1) {
                        // if (parseInt(d[129]) >= 0)
                        return 'yellow';
                        // else
                        // return 'blue';
                    }
                    if (parseInt(d["label"]) == 0) {
                        return '#00FF00';
                    }
                })
                .attr('stroke-width', 0.1)
        }
        // console.log(r)


        var tree_legend = [{
            name: '富裕',
            color: 'red'
        }, {
            name: '中产',
            color: 'yellow'
        }, {
            name: '贫穷',
            color: '#00FF00'
        }]

        p_g.selectAll('#legend_cir')
            .attr('id', 'legend_cir')
            .data(tree_legend)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => {
                return 450 + i * 45
            })
            .attr('cy', (d, i) => {
                // return i * 20 + 255
                return 298;
            })
            .attr('r', 5)
            .attr('fill', d => {
                return d.color
            })
        // .attr('opacity', 0.5)

        p_g.selectAll('#legend_cir')
            .attr('id', 'legend_cir')
            .data(tree_legend)
            .enter()
            .append('text')
            .attr('font-size', 15)
            .attr('font-family', 'kaiti')
            .attr('x', (d, i) => {
                return 455 + i * 45;
            })
            .attr('y', (d, i) => {
                return 303;
            })
            // .attr('r', 5)
            // .attr('fill', d => {
            // return d.color
            // })
            .text(d => {
                return d.name
            })
    })
}

// DrawIceRect();

function DrawIceRectNum(num) {
    if (ice_rect != 0) {
        ice_rect.remove();
        ice_rect = ice_svg.append('g');
    }
    d3.csv('data/box_calcr.csv', function (Ice_d_k) {
        // console.log(Ice_d)
        var Ice_d = new Array();
        for (let i in Ice_d_k) {
            if (parseInt(Ice_d_k[i].biao) == num) {
                Ice_d.push(Ice_d_k[i]);
            }
        }
        var r = [];

        for (let i = 0; i < 33; ++i) {
            r.push({
                n: 0,
                member: [],
                type: 0,
                num: 0,
                cnt: 0,
                cntnum: {
                    0: 0,
                    1: 0,
                    2: 0,
                    3: 0
                },
                shannon: 0
            })
        }


        for (var i in Ice_d) {
            // console.log(Ice_d[i]);
            r[0].member.push(Ice_d[i]);
            r[0].n = 0;
            r[0].num = 0;
            r[0].cnt++;
            r[0].cntnum[Ice_d[i]['kaishi']]++;
            r[0].type = "";
            if (Ice_d[i]['kaishi'] == 1) {
                r[1].member.push(Ice_d[i]);
                r[1].n = 1;
                r[1].num = 0;
                r[1].cnt++;
                r[1].cntnum[Ice_d[i]['ability']]++;
                r[1].type = "初始富裕";
                if (Ice_d[i]['ability'] == 2) {
                    r[2].member.push(Ice_d[i]);
                    r[2].n = 2;
                    r[2].num = 0;
                    r[2].cnt++;
                    r[2].cntnum[Ice_d[i]['9']]++;
                    r[2].type = "工作能力强";
                    if (Ice_d[i]['9'] == 0) {
                        r[3].member.push(Ice_d[i]);
                        r[3].n = 3;
                        r[3].num = 0;
                        r[3].cnt++;
                        r[3].cntnum[Ice_d[i]['label']]++;
                        r[3].type = "健康";
                    } else if (Ice_d[i]['9'] == 1) {
                        r[4].member.push(Ice_d[i]);
                        r[4].n = 3;
                        r[4].num = 1;
                        r[4].cnt++;
                        r[4].cntnum[Ice_d[i]['label']]++;
                        r[4].type = "小病";
                    } else if (Ice_d[i]['9'] == 2) {
                        r[5].member.push(Ice_d[i]);
                        r[5].n = 3;
                        r[5].num = 2;
                        r[5].cnt++;
                        r[5].cntnum[Ice_d[i]['label']]++;
                        r[5].type = "中病";
                    } else {
                        r[6].member.push(Ice_d[i]);
                        r[6].n = 3;
                        r[6].num = 3;
                        r[6].cnt++;
                        r[6].cntnum[Ice_d[i]['label']]++;
                        r[6].type = "重病";
                    }
                } else if (Ice_d[i]['ability'] == 1) {
                    r[7].member.push(Ice_d[i]);
                    r[7].n = 2;
                    r[7].num = 1;
                    r[7].cnt++;
                    r[7].cntnum[Ice_d[i]['9']]++;
                    r[7].type = "工作能力中";
                    if (Ice_d[i]['9'] == 0) {
                        r[8].member.push(Ice_d[i]);
                        r[8].n = 3;
                        r[8].num = 4;
                        r[8].cnt++;
                        r[8].cntnum[Ice_d[i]['label']]++;
                        r[8].type = "健康";
                    } else if (Ice_d[i]['9'] == 1) {
                        r[9].member.push(Ice_d[i]);
                        r[9].n = 3;
                        r[9].num = 5;
                        r[9].cnt++;
                        r[9].cntnum[Ice_d[i]['label']]++;
                        r[9].type = "小病";
                    } else if (Ice_d[i]['9'] == 2) {
                        r[10].member.push(Ice_d[i]);
                        r[10].n = 3;
                        r[10].num = 6;
                        r[10].cnt++;
                        r[10].cntnum[Ice_d[i]['label']]++;
                        r[10].type = "中病";
                    } else {
                        r[11].member.push(Ice_d[i]);
                        r[11].n = 3;
                        r[11].num = 7;
                        r[11].cnt++;
                        r[11].cntnum[Ice_d[i]['label']]++;
                        r[11].type = "重病";
                    }
                } else {
                    r[12].member.push(Ice_d[i]);
                    r[12].n = 2;
                    r[12].num = 2;
                    r[12].cnt++;
                    r[12].cntnum[Ice_d[i]['2']]++;
                    r[12].type = "工作能力弱";
                    if (Ice_d[i]['2'] == 2) {
                        r[13].member.push(Ice_d[i]);
                        r[13].n = 3;
                        r[13].num = 8;
                        r[13].cnt++;
                        r[13].cntnum[Ice_d[i]['label']]++;
                        r[13].type = "不投资";
                    } else if (Ice_d[i]['2'] == 1) {
                        r[14].member.push(Ice_d[i]);
                        r[14].n = 3;
                        r[14].num = 9;
                        r[14].cnt++;
                        r[14].cntnum[Ice_d[i]['label']]++;
                        r[14].type = "投资5";
                    } else {
                        r[15].member.push(Ice_d[i]);
                        r[15].n = 3;
                        r[15].num = 10;
                        r[15].cnt++;
                        r[15].cntnum[Ice_d[i]['label']]++;
                        r[15].type = "投资10";
                    }
                }
            } else {
                r[16].member.push(Ice_d[i]);
                r[16].n = 1;
                r[16].num = 1;
                r[16].cnt++;
                r[16].cntnum[Ice_d[i]['9']]++;
                r[16].type = "初始贫穷";
                if (Ice_d[i]['9'] == 3) {
                    r[17].member.push(Ice_d[i]);
                    r[17].n = 2;
                    r[17].num = 3;
                    r[17].cnt++;
                    r[17].cntnum[Ice_d[i]['ability']]++;
                    r[17].type = "重病";
                    if (Ice_d[i]['ability'] == 2) {
                        r[18].member.push(Ice_d[i]);
                        r[18].n = 3;
                        r[18].num = 11;
                        r[18].cnt++;
                        r[18].cntnum[Ice_d[i]['label']]++;
                        r[18].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[19].member.push(Ice_d[i]);
                        r[19].n = 3;
                        r[19].num = 12;
                        r[19].cnt++;
                        r[19].cntnum[Ice_d[i]['label']]++;
                        r[19].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[20].member.push(Ice_d[i]);
                        r[20].n = 3;
                        r[20].num = 13;
                        r[20].cnt++;
                        r[20].cntnum[Ice_d[i]['label']]++;
                        r[20].type = "工作能力弱";
                    }
                } else if (Ice_d[i]['9'] == 2) {
                    r[21].member.push(Ice_d[i]);
                    r[21].n = 2;
                    r[21].num = 4;
                    r[21].cnt++;
                    r[21].cntnum[Ice_d[i]['ability']]++;
                    r[21].type = "中病";
                    if (Ice_d[i]['ability'] == 2) {
                        r[22].member.push(Ice_d[i]);
                        r[22].n = 3;
                        r[22].num = 14;
                        r[22].cnt++;
                        r[22].cntnum[Ice_d[i]['label']]++;
                        r[22].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[23].member.push(Ice_d[i]);
                        r[23].n = 3;
                        r[23].num = 15;
                        r[23].cnt++;
                        r[23].cntnum[Ice_d[i]['label']]++;
                        r[23].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[24].member.push(Ice_d[i]);
                        r[24].n = 3;
                        r[24].num = 16;
                        r[24].cnt++;
                        r[24].cntnum[Ice_d[i]['label']]++;
                        r[24].type = "工作能力弱";
                    }
                } else if (Ice_d[i]['9'] == 1) {
                    r[25].member.push(Ice_d[i]);
                    r[25].n = 2;
                    r[25].num = 5;
                    r[25].cnt++;
                    r[25].cntnum[Ice_d[i]['ability']]++;
                    r[25].type = "小病";
                    if (Ice_d[i]['ability'] == 2) {
                        r[26].member.push(Ice_d[i]);
                        r[26].n = 3;
                        r[26].num = 17;
                        r[26].cnt++;
                        r[26].cntnum[Ice_d[i]['label']]++;
                        r[26].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[27].member.push(Ice_d[i]);
                        r[27].n = 3;
                        r[27].num = 18;
                        r[27].cnt++;
                        r[27].cntnum[Ice_d[i]['label']]++;
                        r[27].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[28].member.push(Ice_d[i]);
                        r[28].n = 3;
                        r[28].num = 19;
                        r[28].cnt++;
                        r[28].cntnum[Ice_d[i]['label']]++;
                        r[28].type = "工作能力弱";
                    }
                } else if (Ice_d[i]['9'] == 0) {
                    r[29].member.push(Ice_d[i]);
                    r[29].n = 2;
                    r[29].num = 6;
                    r[29].cnt++;
                    r[29].cntnum[Ice_d[i]['ability']]++;
                    r[29].type = "健康";
                    if (Ice_d[i]['ability'] == 2) {
                        r[30].member.push(Ice_d[i]);
                        r[30].n = 3;
                        r[30].num = 20;
                        r[30].cnt++;
                        r[30].cntnum[Ice_d[i]['label']]++;
                        r[30].type = "工作能力强";
                    } else if (Ice_d[i]['ability'] == 1) {
                        r[31].member.push(Ice_d[i]);
                        r[31].n = 3;
                        r[31].num = 21;
                        r[31].cnt++;
                        r[31].cntnum[Ice_d[i]['label']]++;
                        r[31].type = "工作能力中";
                    } else if (Ice_d[i]['ability'] == 0) {
                        r[32].member.push(Ice_d[i]);
                        r[32].n = 3;
                        r[32].num = 22;
                        r[32].cnt++;
                        r[32].cntnum[Ice_d[i]['label']]++;
                        r[32].type = "工作能力弱";
                    }
                }
            }
        }
        // console.log(r)
        let krmax = -1000,
            krmin = 1000;
        for (let i = 0; i < 33; ++i) {
            if (r[i].cnt == 0) {
                continue;
            }
            var sum = 0;
            for (let j in r[i].cntnum) {
                if (r[i].cntnum[j] == 0) break;
                let prob = r[i].cntnum[j] / r[i].cnt;
                sum += prob * Math.log2(prob);
            }
            r[i].shannon = -sum;
            krmax = Math.max(krmax, r[i].shannon);
            krmin = Math.min(krmin, r[i].shannon);
        }

        // console.log(min, max);
        // var colora = "#FFFFFF"
        // var colorb = '#7cb5ec'

        // let colore = d3.interpolate(colora, colorb);
        // var color_scalekr = d3.scale.linear()
        //     .domain([krmin, krmax])
        //     .range([0, 1])
        var ice_max = -999999

        console.log(r)

        for (var i in r[0].member) {
            ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129])))
        }
        var p_g = ice_rect.append('g')

        ice_max = 1000;
        var line_scale = d3.scale.linear()
            .domain([0, Math.log2(ice_max)])
            .range([0, height_ice / (lxBei / 1.9)])
        // console.log(r)

        var colora = "#FFFFFF"
        var colorb = color[0]

        let colorx = d3.interpolate(colora, colorb);
        var color_scale = d3.scale.linear()
            .domain([0.5, 0.667])
            .range([0, 1])

        let colorx2 = d3.interpolate('#00FF00', 'red');
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
                return cnt * width_ice * 20 / 6080;
            })
            .attr('height', d => {
                if (d.n == 0) return height_ice / lxBei;
                else return height_ice / (lxBei / 2);
            })
            .attr('width', d => {
                return d.member.length * 20 * width_ice / 6080;
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('fill', d => {
                // if (d.shannon != 0) {
                //     // console.log(d.shannon)
                //     // console.log('k', color_scalekr(d.shannon))
                //     return colore(color_scalekr(d.shannon));
                // } else
                    return 'none';
            })

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
                color: 'red',
                width: high
            }, {
                n: r[i],
                color: 'yellow',
                width: mid
            }, {
                n: r[i],
                color: '#00FF00',
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
                return cnt * 20 * width_ice / 6080;
            })
            .attr('height', d => {
                return height_ice / 9.9;
                // else return height_ice / (lxBei / 2);
            })
            .attr('width', d => {
                return d.width * 20 * width_ice / 6080;
            })
            .attr('stroke', d => {
                return d.color;
            })
            .attr('stroke-width', 0)
            .attr('fill', d => {
                return d.color;
            })
            .attr('opacity', 0.7)
        let line_r_data = [0, 1, 2, 3];
        p_g.selectAll('#r_line')
            .attr('id', 'r_line')
            .data(line_r_data)
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', d => {
                if (d == 0) {
                    return height_ice / (2 * lxBei)
                }
                return (d - 1 / 2) * height_ice / (lxBei / 2) + height_ice / lxBei;
            })
            .attr('x2', width_ice)
            .attr('y2', d => {
                if (d == 0) {
                    return height_ice / (2 * lxBei)
                }
                return (d - 1 / 2) * height_ice / (lxBei / 2) + height_ice / lxBei;
            })
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);

        p_g.selectAll('#r_1')
            .attr('id', 'r_1').data(r)
            .enter()
            .append('text')
            .attr('font-size', 15)
            .attr('y', d => {
                // if (d.n == 1) return 0;
                // return (d.n - 2) * height_ice / (lxBei / 2) + height_ice / (lxBei);
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
                return cnt * 20 * width_ice / 6080;
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
            // .attr('dy', '1em')
            // .text(d => {
            //     if (d.n != 0) {
            //         if (d.n != 3 && d.type[0] == '工') {
            //             return d.type[4];
            //         }
            //         if (d.n != 3)
            //             return d.type
            //     }
            // })
            .attr('dx', (d, i) => {
                var len_in = 0;
                // if (i == 1 || i == 2) len_in = 4 * 15
                // if (i == 3 || i == 6) len_in = 5 * 15
                // if (i == 4 || i == 5) len_in = 6 * 15
                // if (i == 7 || i == 8 || i == 10) len_in = 2 * 15
                // if (i == 9) len_in = 3 * 15
                if (d.type[0] == '初') len_in = 4 * 15
                if (d.type[0] == '工') len_in = 15;
                if (d.type[1] == '病' || d.type[1] == '康') len_in = 2 * 15;
                if (d.type[0] == '投') len_in = 3 * 15;
                return d.member.length * width_ice / 304 / 2 - len_in / 2
            })
            .attr('dy', '1em')
            .text(d => {
                if (d.type[0] == '工' && 15 < d.member.length * width_ice / 304) {
                    return d.type[4];
                } else if (30 < d.member.length * width_ice / 304)
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
                    return (i * 2 + cnt * width_ice / 304);
                })
                .attr('y1', d => {
                    if (k == 0)
                        return height_ice / (lxBei * 2)
                    return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / lxBei - height_ice / (lxBei)
                })
                .attr('x2', (d, i) => {
                    // return i / 10;
                    var cnt = 0;
                    for (var j in r) {
                        if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                    }
                    // if (r[k].n == 4) cnt += r[3].member.length
                    return (i * 2 + cnt * width_ice / 304);
                })
                .attr('y2', d => {
                    if (Math.log2(Math.abs(parseFloat(d[129]))) <= 0) {
                        if (k == 0)
                            return height_ice / (lxBei * 2)
                        return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / (lxBei) - height_ice / (lxBei)
                    }
                    if (k == 0)
                    {
                        if (parseFloat(d[129]) >= 0)
                        return height_ice / (lxBei * 2) - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 4
                        else
                        return height_ice / (lxBei * 2) + line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 4
                    }
                        
                    if (parseFloat(d[129]) >= 0)
                        return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / (lxBei) - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2 - height_ice / (lxBei)
                    else
                        return (r[k].n + 1) * height_ice / (lxBei / 2) - height_ice / (lxBei) + line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2 - height_ice / (lxBei)
                })
                .attr('fill', 'none')
                .attr('stroke', d => {
                    if (parseInt(d["label"]) == 2) {
                        return 'red'
                    }
                    if (parseInt(d["label"]) == 1) {
                        // if (parseInt(d[129]) >= 0)
                        return 'yellow';
                        // else
                        //     return 'blue';
                    }
                    if (parseInt(d["label"]) == 0) {
                        return '#00FF00';
                    }
                })
                .attr('stroke-width', 2)
        }
        // console.log(r)


        var tree_legend = [{
            name: '富裕',
            color: 'red'
        }, {
            name: '中产',
            color: 'yellow'
        }, {
            name: '贫穷',
            color: '#00FF00'
        }]

        p_g.selectAll('#legend_cir')
            .attr('id', 'legend_cir')
            .data(tree_legend)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => {
                return 450 + i * 45
            })
            .attr('cy', (d, i) => {
                // return i * 20 + 255
                return 296;
            })
            .attr('r', 5)
            .attr('fill', d => {
                return d.color
            })
        // .attr('opacity', 0.5)

        p_g.selectAll('#legend_cir')
            .attr('id', 'legend_cir')
            .data(tree_legend)
            .enter()
            .append('text')
            .attr('font-size', 15)
            .attr('font-family', 'kaiti')
            .attr('x', (d, i) => {
                return 455 + i * 45;
            })
            .attr('y', (d, i) => {
                return 301;
            })
            // .attr('r', 5)
            // .attr('fill', d => {
            // return d.color
            // })
            .text(d => {
                return d.name
            })
    })
}