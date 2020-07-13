var width_ice = 611,
    height_ice = 330

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var lxBei = 9

var ice_svg = d3.select('#Sun').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)
// console.log(1)
var ice_rect = ice_svg.append('g')

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
                    pdata.push(bdata[i]);
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
                                Cir_3.push(Cir_2[cnt2]);
                                // console.log(Cir_3)
                                // console.log(cnt3)
                                Cir_3[cnt3]['cnt'] = cnt3 + 1;
                                cnt3++;
                            }
                            cnt2++;
                        }
                    }
                }
            }

            let t1, t2, t3;
            console.log(pdata)
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
                    for (let k in Cir_2[j].Decision) {
                        // console.log(k)
                        if (parseInt(pdata[i][k]) != parseInt(Cir_2[j].Decision[k])) {
                            Cir_2[j].member.push(pdata[i]);
                        }
                    }
                }
                for (let j in Cir_3) {
                    for (let k in Cir_3[j].Decision) {
                        if (parseInt(pdata[i][k]) != parseInt(Cir_3[j].Decision[k])) {
                            Cir_3[j].member.push(pdata[i]);
                        }
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

            console.log(Cir_2)
            ice_rect
                // .select('#iceCir')
                // .attr('id', 'iceCir')
                .append('circle')
                .attr('cx', width_ice / 2)
                .attr('cy', height_ice / 2)
                .attr('r', 20)
                .attr('fill', 'blue')

            // 0
            var arc = d3.svg.arc()
                .innerRadius(20)
                .outerRadius(40)
            var arc_data = {
                startAngle: 0,
                endAngle: Math.PI * 2
            }
            ice_rect.append('g')
                .append('path')
                .attr('d', arc(arc_data))
                .attr('transform', 'translate(' + width_ice / 2 + ',' + height_ice / 2 + ')')
                // .attr('stroke', 'black')
                // .attr('stroke-width', '3px')
                .attr('fill', (d) => {
                    return 'none';
                })
                .attr('stroke', 'black')
                .attr('stroke-width', 0.5)

            // 1
            var arc1 = d3.svg.arc()
                .innerRadius(40)
                .outerRadius(60)
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
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + height_ice / 2 + ')')
                    // .attr('stroke', 'black')
                    // .attr('stroke-width', '3px')
                    .attr('fill', (d) => {
                        return 'none';
                    })
                    .attr('stroke', 'black')
                    .attr('stroke-width', 0.5)
            }

            var StartAngle2 = 0;
            var arc2 = d3.svg.arc()
                .innerRadius(60)
                .outerRadius(80)
            for (let i in Cir_2) {
                var arc_data1 = {
                    startAngle: StartAngle2 * Math.PI * 2,
                    endAngle: (StartAngle2 + Cir_1[i].member.length / 304) * 2 * Math.PI
                }
                StartAngle2 += Cir_2[i].member.length / 304
                ice_rect.append('g')
                    .append('path')
                    .attr('d', arc2(arc_data1))
                    .attr('transform', 'translate(' + width_ice / 2 + ',' + height_ice / 2 + ')')
                    // .attr('stroke', 'black')
                    // .attr('stroke-width', '3px')
                    .attr('fill', (d) => {
                        return 'none';
                    })
                    .attr('stroke', 'black')
                    .attr('stroke-width', 0.5)
            }
            // var arc_data1 = {
            //     startAngle: 0,
            //     endAngle: Math.PI * 2
            // }
            // ice_rect.append('g')
            //     .append('path')
            //     .attr('d', arc1(arc_data))
            //     .attr('transform', 'translate(' + width_ice / 2 + ',' + height_ice / 2 + ')')
            //     // .attr('stroke', 'black')
            //     // .attr('stroke-width', '3px')
            //     .attr('fill', (d) => {
            //         return 'none';
            //     })
            //     .attr('stroke', 'black')
            //     .attr('stroke-width', 0.5)
        })
    })
}

SunCir(1, 1)