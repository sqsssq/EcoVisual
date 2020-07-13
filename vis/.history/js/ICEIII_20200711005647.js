var width_ice = 611,
    height_ice = 375

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var lxBei = 9

var ice_svg = d3.select('#RectV').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)
// console.log(1)
var ice_rect = ice_svg.append('g')

var Redius_in = 40

// ice_rect.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('width', width_ice)
//     .attr('height', height_ice)
//     .attr('fill-opacity', 0)

var ice_line_g = 0;

function SunCir(num, lun) {
    d3.json('data/DT/' + num.toString() + '.json', function (idata) {
        d3.csv('data/box_calc.csv', function (bdata) {
            if (ice_rect != 0) {
                ice_rect.remove();
            }
            ice_rect = ice_svg.append('g');
            var pdata = new Array();
            for (let i in bdata) {
                if (parseInt(bdata[i].biao) == lun) {
                    bdata[i]['2'] = bdata[i]['ability']
                    pdata.push(bdata[i]);
                }
            }
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
                        member: new Array()
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
                                        member: new Array()
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
                                member: new Array()
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

            var Cir_4 = new Array();
            for (let i in Cir_3) {
                var h = {
                        tag: Cir_3[i]['tag'],
                        member: new Array(),
                        cnt: Cir_3[i]['cnt'],
                        color: '#00FF00'
                    },
                    m = {
                        tag: Cir_3[i]['tag'],
                        member: new Array(),
                        cnt: Cir_3[i]['cnt'] + 1,
                        color: 'yellow'
                    },
                    l = {
                        tag: Cir_3[i]['tag'],
                        member: new Array(),
                        cnt: Cir_3[i]['cnt'] + 2,
                        color: 'red'
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
            ice_rect
                // .select('#iceCir')
                // .attr('id', 'iceCir')
                .append('circle')
                .attr('cx', width_ice / 2)
                .attr('cy', (height_ice / 2 + 10))
                .attr('r', 10)
                .attr('fill', 'none')
                .attr('stroke', '#D3D3D3')
                .attr('stroke-width', 0.5)

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
            //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 + 10) + ')')
            //     // .attr('stroke', '	#D3D3D3')
            //     // .attr('stroke-width', '3px')
            //     .attr('fill', (d) => {
            //         return 'none';
            //     })
            //     .attr('stroke', '	#D3D3D3')
            //     .attr('stroke-width', 0.5)

            // 1
            var arc1 = d3.svg.arc()
                .innerRadius(10 + Redius_in)
                .outerRadius(10 + Redius_in * 2)
            var StartAngle = 0;
            for (let i in Cir_1) {
                var arc_data1 = {
                    startAngle: StartAngle * Math.PI * 2,
                    endAngle: (StartAngle + Cir_1[i].member.length / 304) * 2 * Math.PI
                }
                StartAngle += Cir_1[i].member.length / 304
                ice_rect.append('g')
                    .append('path')
                    .attr('d', arc1(arc_data1))
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 + 10) + ')')
                    // .attr('stroke', '	#D3D3D3')
                    // .attr('stroke-width', '3px')
                    .attr('fill', (d) => {
                        return 'none';
                    })
                    .attr('stroke', '	#D3D3D3')
                    .attr('stroke-width', 0.5)
            }

            var StartAngle2 = 0;
            var arc2 = d3.svg.arc()
                .innerRadius(10 + Redius_in * 2)
                .outerRadius(10 + Redius_in * 3)
            for (let i in Cir_2) {
                var arc_data1 = {
                    startAngle: StartAngle2 * Math.PI * 2,
                    endAngle: (StartAngle2 + Cir_2[i].member.length / 304) * 2 * Math.PI
                }
                StartAngle2 += Cir_2[i].member.length / 304
                ice_rect.append('g')
                    .append('path')
                    .attr('d', arc2(arc_data1))
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 + 10) + ')')
                    // .attr('stroke', '	#D3D3D3')
                    // .attr('stroke-width', '3px')
                    .attr('fill', (d) => {
                        return 'none';
                    })
                    .attr('stroke', '	#D3D3D3')
                    .attr('stroke-width', 0.5)
            }

            var StartAngle3 = 0;
            var arc3 = d3.svg.arc()
                .innerRadius(10 + Redius_in * 3)
                .outerRadius(10 + Redius_in * 4)
            for (let i in Cir_3) {
                var arc_data1 = {
                    startAngle: StartAngle3 * Math.PI * 2,
                    endAngle: (StartAngle3 + Cir_3[i].member.length / 304) * 2 * Math.PI
                }
                StartAngle3 += Cir_3[i].member.length / 304
                if (Cir_3[i].tag)
                    continue;
                ice_rect.append('g')
                    .append('path')
                    .attr('d', arc3(arc_data1))
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 + 10) + ')')
                    // .attr('stroke', '	#D3D3D3')
                    // .attr('stroke-width', '3px')
                    .attr('fill', (d) => {
                        return 'none';
                    })
                    .attr('stroke', '	#D3D3D3')
                    .attr('stroke-width', 0.5)
            }

            var StartAngle4 = 0;
            for (let i in Cir_4) {

                var arc3 = d3.svg.arc()
                    .innerRadius(170)
                    .outerRadius(190)
                if (Cir_4[i].tag == 1) {
                    arc3 = d3.svg.arc()
                        .innerRadius(130)
                        .outerRadius(150)
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
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 + 10) + ')')
                    // .attr('stroke', '	#D3D3D3')
                    // .attr('stroke-width', '3px')
                    .attr('fill', Cir_4[i].color)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 0.5)
            }
            // console.log(Cir_3)
            // var arc_data1 = {
            //     startAngle: 0,
            //     endAngle: Math.PI * 2
            // }
            // ice_rect.append('g')
            //     .append('path')
            //     .attr('d', arc1(arc_data))
            //     .attr('transform', 'translate(' + width_ice / 2 + ',' + (height_ice / 2 -  12) + ')')
            //     // .attr('stroke', '	#D3D3D3')
            //     // .attr('stroke-width', '3px')
            //     .attr('fill', (d) => {
            //         return 'none';
            //     })
            //     .attr('stroke', '	#D3D3D3')
            //     .attr('stroke-width', 0.5)
        })
    })
}

SunCir(1, 1)