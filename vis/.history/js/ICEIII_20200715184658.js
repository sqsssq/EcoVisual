var width_ice = 611,
    height_ice = 485

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var lxBei = 9

var ice_svg = d3.select('#RectV').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)
    .attr("transform", "translate(" + 0 + "," + 5 + ")")
// console.log(1)
var ice_rect = ice_svg.append('g')

var Redius_in = 55

// ice_rect.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('width', width_ice)
//     .attr('height', height_ice)
//     .attr('fill-opacity', 0)

var ice_line_g = 0;

function SunCir(num, lun) {
    d3.json('data/DK/' + num.toString() + '.json', function (idata) {
        d3.csv('data/box_calc.csv', function (bdata) {
            if (ice_rect != 0) {
                ice_rect.remove();
            }
            ice_rect = ice_svg.append('g');
            var pdata = new Array();
            let max_ = -99999,
                min_ = 99999
            var legend = ['富裕', '中产', '贫穷']
            ice_rect.selectAll('#sssss')
                .attr('id', 'sssss')
                .data(legend)
                .enter()
                .append('circle')
                .attr('cx', 560)
                .attr('cy', (d, i) => {
                    return 400 + i * 30;
                })
                .attr('r', 8)
                .attr('fill', (d, i) => {
                    if (i == 0)
                        return '#D8483E';
                    else if (i == 1)
                        return '#F3AC2A';
                    else
                        return '#41CA77';
                })
            ice_rect.selectAll('#sssss')
                .attr('id', 'sssss')
                .data(legend)
                .enter()
                .append('text')
                .attr('font-family', 'kaiti')
                .attr('font-size', 15)
                .attr('x', 570)
                .attr('dy', '0.3em')
                .attr('y', (d, i) => {
                    return 400 + i * 30;

                })
                .text(d => {
                    return d;
                })

            var arc = d3.svg.arc()
                .innerRadius(10)
                .outerRadius(10 + Redius_in / 2)
            var arcr = d3.svg.arc()
                .innerRadius(10 + Redius_in / 2 + Redius_in)
                .outerRadius(10 + Redius_in / 2 + Redius_in * 2)
            var arc_d = {
                startAngle: 0,
                endAngle: Math.PI * 2
            }

            // ice_rect.append('g')
            //     .append('path')
            //     .attr('d', arc(arc_d))
            //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 - 10) + ')')
            //     // .attr('stroke', '	#D3D3D3')
            //     // .attr('stroke-width', '3px')
            //     .attr('fill', (d) => {
            //         return '#F0F0F0';
            //     })
            //     // .attr('fill-opacity', 0.1)
            // ice_rect.append('g')
            //     .append('path')
            //     .attr('d', arcr(arc_d))
            //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 - 10) + ')')
            //     // .attr('stroke', '	#D3D3D3')
            //     // .attr('stroke-width', '3px')
            //     .attr('fill', (d) => {
            //         return '#F0F0F0';
            //     })
                // .attr('fill-opacity', 0.8)
            // .attr('stroke', '	#D3D3D3')
            // .attr('stroke-width', 0.5)

            for (let i in bdata) {
                if (parseInt(bdata[i].biao) == lun) {
                    bdata[i]['2'] = bdata[i]['ability']
                    if (parseFloat(bdata[i]['129']) > 600)
                        (bdata[i]['129']) = 600;
                    if (parseFloat(bdata[i]['129']) < -600)
                        (bdata[i]['129']) = -600;
                    max_ = Math.max(parseFloat(bdata[i]['129']), max_);
                    min_ = Math.min(parseFloat(bdata[i]['129']), min_);
                    pdata.push(bdata[i]);
                }
            }
            let pmax = Math.max(Math.abs(max_), Math.abs(min_));
            var line_lengh_scale = d3.scale.linear()
                .domain([0, pmax])
                .range([0, Redius_in / 2]);
            if (lun > 1) {
                var loss_name = new Object();
                for (let i in bdata) {
                    if (parseInt(bdata[i].biao) == lun - 1) {
                        loss_name[bdata[i].code] = bdata[i]['11'];
                    }
                }
                for (let i in pdata) {
                    pdata[i]['11'] = loss_name[pdata[i].code];
                }
            }

            // console.log(1);
            var Cir_1 = new Array();
            var Cir_2 = new Array();
            var Cir_3 = new Array();
            var cnt1 = 0,
                cnt2 = 0,
                cnt3 = 0;
            for (let i in idata) {
                // console.log(i)
                for (let j in idata[i]) {
                    // console.log(j)
                    Cir_1.push({
                        Decision: {},
                        cnt: cnt1,
                        h: 1,
                        member: new Array(),
                        text: title_tip[i - 1][j]
                    })
                    Cir_1[cnt1]['Decision'][i] = parseInt(j);
                    cnt1++;
                    for (let k in idata[i][j]) {
                        // console.log(Object.keys(idata[i][j][k]));
                        for (let l in idata[i][j][k]) {
                            // console.log(idata[i][j][k][l])
                            var tag = 1;
                            for (let m in idata[i][j][k][l]) {
                                for (let n in idata[i][j][k][l][m]) {
                                    tag = 0;
                                    Cir_3.push({
                                        Decision: {},
                                        cnt: cnt3,
                                        h: 3,
                                        tag: 0,
                                        member: new Array(),
                                        text: title_tip[m - 1][n]
                                    })
                                    Cir_3[cnt3]['Decision'][i] = j;
                                    Cir_3[cnt3]['Decision'][k] = l;
                                    Cir_3[cnt3]['Decision'][m] = n;
                                    cnt3++;
                                }
                            }
                            Cir_2.push({
                                Decision: {},
                                cnt: cnt2,
                                tag: tag,
                                h: 2,
                                member: new Array(),
                                text: title_tip[k - 1][l]
                            })
                            Cir_2[cnt2]['Decision'][i] = j;
                            // console.log(1)
                            Cir_2[cnt2]['Decision'][k] = l;
                            if (tag) {
                                // console.log(1)
                                Cir_3.push({
                                    Decision: {},
                                    cnt: cnt3,
                                    tag: tag,
                                    h: 2,
                                    member: new Array()
                                });
                                Cir_3[cnt3]['Decision'][i] = j;
                                // console.log(1)
                                Cir_3[cnt3]['Decision'][k] = l;
                                // console.log(Cir_3)
                                // console.log(cnt3)
                                // Cir_3[cnt3]['cnt'] = cnt3 + 1;
                                cnt3++;
                            }
                            cnt2++;
                        }
                    }
                }
            }

            // console.log(pdata)
            for (let i in pdata) {
                t1 = 0, t2 = 0, t3 = 0
                for (let j in Cir_1) {
                    for (let k in Cir_1[j].Decision) {
                        // console.log(Cir_1[j].Decision[k], k)
                        // console.log(parseInt(pdata[i][k]))
                        if (parseInt(pdata[i][k]) == parseInt(Cir_1[j].Decision[k])) {
                            Cir_1[j].member.push(pdata[i]);
                        }
                    }
                }
                for (let j in Cir_2) {
                    // console.log(j)
                    var flag = 0;
                    for (let k in Cir_2[j].Decision) {
                        // console.log(k)
                        if (parseInt(pdata[i][k]) != parseInt(Cir_2[j].Decision[k])) {
                            flag = 1;
                        }
                    }
                    if (!flag) {
                        // console.log(t12)
                        // t12 += 1
                        Cir_2[j].member.push(pdata[i]);
                    }
                }
                for (let j in Cir_3) {
                    var flag = 0;
                    for (let k in Cir_3[j].Decision) {
                        if (parseInt(pdata[i][k]) != parseInt(Cir_3[j].Decision[k])) {
                            flag = 1;
                        }
                    }
                    if (!flag) {
                        Cir_3[j].member.push(pdata[i]);
                    }
                }
                // console.log(t1, t2, t3)
                // if (!t1) {
                //     Cir_1.member.push(pdata[i]);
                // }
                // if (!t2) {
                //     Cir_2.member.push(pdata[i]);
                // }
                // if (!t3) {
                //     Cir_3.member.push(pdata[i]);
                // }
            }

            // console.log(Cir_2)

            var Cir_4 = new Array();
            for (let i in Cir_3) {
                var h = {
                        tag: Cir_3[i]['tag'],
                        member: new Array(),
                        cnt: Cir_3[i]['cnt'],
                        color: '#D8483E'
                    },
                    m = {
                        tag: Cir_3[i]['tag'],
                        member: new Array(),
                        cnt: Cir_3[i]['cnt'] + 1,
                        color: '#F3AC2A'
                    },
                    l = {
                        tag: Cir_3[i]['tag'],
                        member: new Array(),
                        cnt: Cir_3[i]['cnt'] + 2,
                        color: '#41CA77'
                    }
                for (let j in Cir_3[i].member) {
                    if (parseInt(Cir_3[i].member[j][12]) == 0)
                        l.member.push(Cir_3[i].member[j])

                    if (parseInt(Cir_3[i].member[j][12]) == 1)
                        m.member.push(Cir_3[i].member[j])

                    if (parseInt(Cir_3[i].member[j][12]) == 2)
                        h.member.push(Cir_3[i].member[j])
                }
                Cir_4.push(h);
                Cir_4.push(m);
                Cir_4.push(l);
            }

            // console.log(Cir_4)

            // console.log(Cir_3)
            //#region 
            var Cir_d = [10, (10 + Redius_in / 4), (10 + Redius_in), (10 + Redius_in * 2), (10 + Redius_in * 3)]
            ice_rect
                .selectAll('#iceCir')
                .attr('id', 'iceCir')
                .data(Cir_d)
                .enter()
                .append('circle')
                .attr('cx', width_ice / 2)
                .attr('cy', (height_ice / 2 - 10))
                .attr('r', d => {
                    return d
                })
                .attr('fill', 'none')
                .attr('stroke', '#D3D3D3')
                .attr('stroke-width', 3)
            var cir_d = [(10 + Redius_in / 2), (10 + Redius_in * 1 + Redius_in / 2), (10 + Redius_in * 2 + Redius_in / 2)]
            ice_rect
                .selectAll('#iceCir')
                .attr('id', 'iceCir')
                .data(cir_d)
                .enter()
                .append('circle')
                .attr('cx', width_ice / 2)
                .attr('cy', (height_ice / 2 - 10))
                .attr('r', d => {
                    return d
                })
                .attr('fill', 'none')
                .attr('stroke', 'blue')
                .attr('stroke-width', (d, i) => {
                    return 2;
                })

            // 0
            var arc = d3.svg.arc()
                .innerRadius(10)
                .outerRadius(10 + Redius_in)
            var arc_data = {
                startAngle: 0,
                endAngle: Math.PI * 2
            }
            // ice_rect.append('g')
            //     .append('path')
            //     .attr('d', arc(arc_data))
            //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
            //     // .attr('stroke', '	#D3D3D3')
            //     // .attr('stroke-width', '3px')
            //     .attr('fill', (d) => {
            //         return 'none';
            //     })
            //     .attr('stroke', '	#D3D3D3')
            //     .attr('stroke-width', 0.5)

            // 1
            // var arc1 = d3.svg.arc()
            //     .innerRadius(10 + Redius_in - 20)
            //     .outerRadius(10 + Redius_in * 2 - 20)
            var StartAngle = 0;
            for (let i in Cir_1) {
                var arc_data1 = {
                    startAngle: StartAngle * Math.PI * 2,
                    endAngle: (StartAngle + Cir_1[i].member.length / 304) * 2 * Math.PI
                }

                ice_rect.selectAll('RLine_2')
                    .attr('id', 'RLine_2')
                    .data(Cir_1[i].member)
                    .enter()
                    .append('line')
                    .attr('x1', (d, i) => {
                        let sita = Math.PI - (StartAngle * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        return (10 + Redius_in) * Math.sin(sita) + width_ice / 2;
                    })
                    .attr('y1', (d, i) => {
                        let sita = Math.PI - (StartAngle * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        return (10 + Redius_in) * Math.cos(sita) + (height_ice / 2 - 10);
                    })
                    .attr('x2', (d, i) => {
                        let sita = Math.PI - (StartAngle * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        let cx = 0;
                        cx = line_lengh_scale(Math.abs(parseFloat(d['129'])));
                        if (parseFloat(d['129']) < 0)
                            cx = -cx;
                        return ((10 + Redius_in) + cx) * Math.sin(sita) + width_ice / 2;
                    })
                    .attr('y2', (d, i) => {
                        let sita = Math.PI - (StartAngle * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        cx = line_lengh_scale(Math.abs(parseFloat(d['129'])));
                        if (parseFloat(d['129']) < 0)
                            cx = -cx;
                        return ((10 + Redius_in) + cx) * Math.cos(sita) + (height_ice / 2 - 10);
                    })
                    .attr('fill', 'none')
                    .attr('stroke', d => {
                        if (parseFloat(d['label']) == 2) {
                            return '#D8483E';
                        } else if (parseFloat(d['label']) == 0) {
                            return "#41CA77";
                        } else {
                            return '#F3AC2A';
                        }
                    })
                    .attr('stroke-width', 2);


                StartAngle += Cir_1[i].member.length / 304
                // ice_rect.append('g')
                //     .append('path')
                //     .attr('d', arc1(arc_data1))
                //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
                //     // .attr('stroke', '	#D3D3D3')
                //     // .attr('stroke-width', '3px')
                //     .attr('fill', (d) => {
                //         return 'none';
                //     })
                //     .attr('stroke', '#A9A9A9')
                //     .attr('stroke-width', 0.5)
                // break
            }
            ice_rect.selectAll('RLine_1')
                .attr('id', 'RLine_1')
                .data(pdata)
                .enter()
                .append('line')
                .attr('x1', (d, i) => {
                    let sita = Math.PI - (i * 360 / 304 * Math.PI / 180);
                    return (10 + Redius_in / 4) * Math.sin(sita) + width_ice / 2;
                })
                .attr('y1', (d, i) => {
                    let sita = Math.PI - (i * 360 / 304 * Math.PI / 180);
                    return (10 + Redius_in / 4) * Math.cos(sita) + (height_ice / 2 - 10);
                })
                .attr('x2', (d, i) => {
                    let sita = Math.PI - (i * 360 / 304 * Math.PI / 180);
                    let cx = 0;
                    cx = line_lengh_scale(Math.abs(parseFloat(d['129']))) / 2;
                    if (parseFloat(d['129']) < 0)
                        cx = -cx;
                    return ((10 + Redius_in / 4) + cx) * Math.sin(sita) + width_ice / 2;
                })
                .attr('y2', (d, i) => {
                    let sita = Math.PI - (i * 360 / 304 * Math.PI / 180);
                    cx = line_lengh_scale(Math.abs(parseFloat(d['129']))) / 2;
                    if (parseFloat(d['129']) < 0)
                        cx = -cx;
                    return ((10 + Redius_in / 4) + cx) * Math.cos(sita) + (height_ice / 2 - 10);
                })
                .attr('fill', 'none')
                .attr('stroke', d => {
                    if (parseFloat(d['label']) == 2) {
                        return '#D8483E';
                    } else if (parseFloat(d['label']) == 0) {
                        return "#41CA77";
                    } else {
                        return '#F3AC2A';
                    }
                })
                .attr('stroke-width', 0.5);

            var StartAngle2 = 0;
            // var arc2 = d3.svg.arc()
            //     .innerRadius(10 + Redius_in * 2 - 20)
            //     .outerRadius(10 + Redius_in * 3 - 20)
            for (let i in Cir_2) {
                var arc_data1 = {
                    startAngle: StartAngle2 * Math.PI * 2,
                    endAngle: (StartAngle2 + Cir_2[i].member.length / 304) * 2 * Math.PI
                }
                ice_rect.selectAll('RLine_2')
                    .attr('id', 'RLine_2')
                    .data(Cir_2[i].member)
                    .enter()
                    .append('line')
                    .attr('x1', (d, i) => {
                        let sita = Math.PI - (StartAngle2 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        return (10 + Redius_in * 2) * Math.sin(sita) + width_ice / 2;
                    })
                    .attr('y1', (d, i) => {
                        let sita = Math.PI - (StartAngle2 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        return (10 + Redius_in * 2) * Math.cos(sita) + (height_ice / 2 - 10);
                    })
                    .attr('x2', (d, i) => {
                        let sita = Math.PI - (StartAngle2 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        let cx = 0;
                        cx = line_lengh_scale(Math.abs(parseFloat(d['129'])));
                        if (parseFloat(d['129']) < 0)
                            cx = -cx;
                        return ((10 + Redius_in * 2) + cx) * Math.sin(sita) + width_ice / 2;
                    })
                    .attr('y2', (d, i) => {
                        let sita = Math.PI - (StartAngle2 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        cx = line_lengh_scale(Math.abs(parseFloat(d['129'])));
                        if (parseFloat(d['129']) < 0)
                            cx = -cx;
                        return ((10 + Redius_in * 2) + cx) * Math.cos(sita) + (height_ice / 2 - 10);
                    })
                    .attr('fill', 'none')
                    .attr('stroke', d => {
                        if (parseFloat(d['label']) == 2) {
                            return '#D8483E';
                        } else if (parseFloat(d['label']) == 0) {
                            return "#41CA77";
                        } else {
                            return '#F3AC2A';
                        }
                    })
                    .attr('stroke-width', 3);
                StartAngle2 += Cir_2[i].member.length / 304
                // ice_rect.append('g')
                //     .append('path')
                //     .attr('d', arc2(arc_data1))
                //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
                //     // .attr('stroke', '	#A9A9A9')
                //     // .attr('stroke-width', '3px')
                //     .attr('fill', (d) => {
                //         return 'none';
                //     })
                //     .attr('stroke', '	#A9A9A9')
                //     .attr('stroke-width', 0.5)
            }

            var StartAngle3 = 0;
            // var arc3 = d3.svg.arc()
            //     .innerRadius(10 + Redius_in * 3 - 20)
            //     .outerRadius(10 + Redius_in * 4 - 20)
            for (let i in Cir_3) {
                var arc_data1 = {
                    startAngle: StartAngle3 * Math.PI * 2,
                    endAngle: (StartAngle3 + Cir_3[i].member.length / 304) * 2 * Math.PI
                }

                if (!Cir_3[i].tag)
                    ice_rect.selectAll('RLine_2')
                    .attr('id', 'RLine_2')
                    .data(Cir_3[i].member)
                    .enter()
                    .append('line')
                    .attr('x1', (d, i) => {
                        let sita = Math.PI - (StartAngle3 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        return (10 + Redius_in * 3) * Math.sin(sita) + width_ice / 2;
                    })
                    .attr('y1', (d, i) => {
                        let sita = Math.PI - (StartAngle3 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        return (10 + Redius_in * 3) * Math.cos(sita) + (height_ice / 2 - 10);
                    })
                    .attr('x2', (d, i) => {
                        let sita = Math.PI - (StartAngle3 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        let cx = 0;
                        cx = line_lengh_scale(Math.abs(parseFloat(d['129'])));
                        if (parseFloat(d['129']) < 0)
                            cx = -cx;
                        return ((10 + Redius_in * 3) + cx) * Math.sin(sita) + width_ice / 2;
                    })
                    .attr('y2', (d, i) => {
                        let sita = Math.PI - (StartAngle3 * Math.PI * 2 + i * 360 / 304 * Math.PI / 180);
                        cx = line_lengh_scale(Math.abs(parseFloat(d['129'])));
                        if (parseFloat(d['129']) < 0)
                            cx = -cx;
                        return ((10 + Redius_in * 3) + cx) * Math.cos(sita) + (height_ice / 2 - 10);
                    })
                    .attr('fill', 'none')
                    .attr('stroke', d => {
                        // console.log(d)
                        if (parseFloat(d['label']) == 2) {
                            return '#D8483E';
                        } else if (parseFloat(d['label']) == 0) {
                            return "#41CA77";
                        } else {
                            return '#F3AC2A';
                        }
                    })
                    .attr('stroke-width', 4);

                StartAngle3 += Cir_3[i].member.length / 304

                if (Cir_3[i].tag)
                    continue;
                // ice_rect.append('g')
                //     .append('path')
                //     .attr('d', arc3(arc_data1))
                //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
                //     // .attr('stroke', '	#A9A9A9')
                //     // .attr('stroke-width', '3px')
                //     .attr('fill', (d) => {
                //         return 'none';
                //     })
                //     .attr('stroke', '	#A9A9A9')
                //     .attr('stroke-width', 0.5)
            }

            var StartAngle4 = 0;
            for (let i in Cir_4) {

                var arc3 = d3.svg.arc()
                    .innerRadius((10 + Redius_in * 3 + Redius_in / 2))
                    .outerRadius((10 + Redius_in * 3 + Redius_in))
                if (Cir_4[i].tag == 1) {
                    arc3 = d3.svg.arc()
                        .innerRadius((10 + Redius_in * 2 + Redius_in / 2))
                        .outerRadius((10 + Redius_in * 3))
                }
                var arc_data1 = {
                    startAngle: StartAngle4 * Math.PI * 2,
                    endAngle: (StartAngle4 + Cir_4[i].member.length / 304) * 2 * Math.PI,
                    color: Cir_4[i].color
                }
                StartAngle4 += Cir_4[i].member.length / 304
                // if (Cir_3[i].tag)
                //     continue;
                ice_rect.append('g')
                    .append('path')
                    .attr('d', arc3(arc_data1))
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 - 10) + ')')
                    // .attr('stroke', '	#A9A9A9')
                    // .attr('stroke-width', '3px')
                    .attr('fill', Cir_4[i].color)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 0.5)
            }
            //#endregion


            // 1
            // var arc1 = d3.svg.arc()
            //     .innerRadius(10 + Redius_in - 20)
            //     .outerRadius(10 + Redius_in * 2 - 20)
            var StartAngle = 0;
            for (let i in Cir_1) {
                var arc_data1 = {
                    startAngle: StartAngle * Math.PI * 2,
                    endAngle: (StartAngle + Cir_1[i].member.length / 304) * 2 * Math.PI
                }

                let sita2 = Math.PI - (StartAngle * Math.PI * 2 + (StartAngle + Cir_1[i].member.length / 304) * Math.PI * 2) / 2;
                ice_rect.append('text')
                    .attr("text-anchor", "middle") //字体尾部对齐
                    .attr('x', (10 + Redius_in) * Math.sin(sita2) + width_ice / 2)
                    .attr('y', (10 + Redius_in) * Math.cos(sita2) + (height_ice / 2 - 10))
                    .text(Cir_1[i].text)
                    .attr('font-family', 'kaiti')
                    .attr('font-size', 18);
                StartAngle += Cir_1[i].member.length / 304
                // ice_rect.append('g')
                //     .append('path')
                //     .attr('d', arc1(arc_data1))
                //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
                //     // .attr('stroke', '	#D3D3D3')
                //     // .attr('stroke-width', '3px')
                //     .attr('fill', (d) => {
                //         return 'none';
                //     })
                //     .attr('stroke', '#A9A9A9')
                //     .attr('stroke-width', 0.5)
                // break
                let sita = Math.PI - (StartAngle * Math.PI * 2 + 0 * 360 / 304 * Math.PI / 180);
                if (num == 5 && i == 0) {
                    console.log(1)
                    ice_rect.append('line')
                        .attr('x1', (10 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                        .attr('y1', (10 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                        .attr('x2', (10 + Redius_in * 2 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                        .attr('y2', (10 + Redius_in * 2 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                        .attr('fill', 'none')
                        .attr('stroke-width', 3)
                        .attr('stroke', '#A9A9A9')
                } else
                    ice_rect.append('line')
                    .attr('x1', (10 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y1', (10 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('x2', (10 + Redius_in * 3 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y2', (10 + Redius_in * 3 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('fill', 'none')
                    .attr('stroke-width', 3)
                    .attr('stroke', '#A9A9A9')
            }

            var StartAngle2 = 0;
            // var arc2 = d3.svg.arc()
            //     .innerRadius(10 + Redius_in * 2 - 20)
            //     .outerRadius(10 + Redius_in * 3 - 20)
            for (let i in Cir_2) {
                var arc_data1 = {
                    startAngle: StartAngle2 * Math.PI * 2,
                    endAngle: (StartAngle2 + Cir_2[i].member.length / 304) * 2 * Math.PI
                }
                let sita2 = Math.PI - (StartAngle2 * Math.PI * 2 + (StartAngle2 + Cir_2[i].member.length / 304) * Math.PI * 2) / 2;
                ice_rect.append('text')
                    .attr("text-anchor", "middle") //字体尾部对齐
                    .attr('x', (10 + Redius_in * 2) * Math.sin(sita2) + width_ice / 2)
                    .attr('y', (10 + Redius_in * 2) * Math.cos(sita2) + (height_ice / 2 - 10))
                    .text(Cir_2[i].text)
                    .attr('font-family', 'kaiti')
                    .attr('font-size', 15);
                StartAngle2 += Cir_2[i].member.length / 304


                let sita = Math.PI - (StartAngle2 * Math.PI * 2 + 0 * 360 / 304 * Math.PI / 180);
                if ((num == 5 && i == 3) || (num == 3 && i == 2))
                    ice_rect.append('line')
                    .attr('x1', (10 + Redius_in * 1 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y1', (10 + Redius_in * 1 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('x2', (10 + Redius_in * 2 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y2', (10 + Redius_in * 2 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('fill', 'none')
                    .attr('stroke-width', 2)
                    .attr('stroke', '#A9A9A9')
                else

                    ice_rect.append('line')
                    .attr('x1', (10 + Redius_in * 1 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y1', (10 + Redius_in * 1 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('x2', (10 + Redius_in * 3 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y2', (10 + Redius_in * 3 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('fill', 'none')
                    .attr('stroke-width', 2)
                    .attr('stroke', '#A9A9A9')
                // ice_rect.append('g')
                //     .append('path')
                //     .attr('d', arc2(arc_data1))
                //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
                //     // .attr('stroke', '	#A9A9A9')
                //     // .attr('stroke-width', '3px')
                //     .attr('fill', (d) => {
                //         return 'none';
                //     })
                //     .attr('stroke', '	#A9A9A9')
                //     .attr('stroke-width', 0.5)
            }

            var StartAngle3 = 0;
            // var arc3 = d3.svg.arc()
            //     .innerRadius(10 + Redius_in * 3 - 20)
            //     .outerRadius(10 + Redius_in * 4 - 20)
            for (let i in Cir_3) {
                var arc_data1 = {
                    startAngle: StartAngle3 * Math.PI * 2,
                    endAngle: (StartAngle3 + Cir_3[i].member.length / 304) * 2 * Math.PI
                }
                if (!Cir_3[i].tag && Cir_3[i].member.length > 5) {
                    let sita2 = Math.PI - (StartAngle3 * Math.PI * 2 + (StartAngle3 + Cir_3[i].member.length / 304) * Math.PI * 2) / 2;
                    ice_rect.append('text')
                        .attr("text-anchor", "middle") //字体尾部对齐
                        .attr('x', (10 + Redius_in * 3) * Math.sin(sita2) + width_ice / 2)
                        .attr('y', (10 + Redius_in * 3) * Math.cos(sita2) + (height_ice / 2 - 10))
                        .text(Cir_3[i].text)
                        .attr('font-family', 'kaiti')
                        .attr('font-size', 12);
                }

                StartAngle3 += Cir_3[i].member.length / 304

                if (Cir_3[i].tag)
                    continue;
                let sita = Math.PI - (StartAngle3 * Math.PI * 2 + 0 * 360 / 304 * Math.PI / 180);
                ice_rect.append('line')
                    .attr('x1', (10 + Redius_in * 2 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y1', (10 + Redius_in * 2 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('x2', (10 + Redius_in * 3 + Redius_in / 2) * Math.sin(sita) + width_ice / 2)
                    .attr('y2', (10 + Redius_in * 3 + Redius_in / 2) * Math.cos(sita) + (height_ice / 2 - 10))
                    .attr('fill', 'none')
                    .attr('stroke-width', 1)
                    .attr('stroke', '#A9A9A9')
                // ice_rect.append('g')
                //     .append('path')
                //     .attr('d', arc3(arc_data1))
                //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2  - 10) + ')')
                //     // .attr('stroke', '	#A9A9A9')
                //     // .attr('stroke-width', '3px')
                //     .attr('fill', (d) => {
                //         return 'none';
                //     })
                //     .attr('stroke', '	#A9A9A9')
                //     .attr('stroke-width', 0.5)
            }
        })
    })
}

SunCir(1, 1)