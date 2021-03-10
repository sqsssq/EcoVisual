// console.log(2222)

var width_R = 525;
var height_R = 288

var R_svg = d3.select('#Sun').append('svg')
    .attr('width', width_R)
    .attr('height', height_R)
    .attr('transform', 'translate(' + 0 + ',' + -50 + ')')
var Ksvg = d3.select('#Sun').append('svg')
    .attr('width', 600)
    .attr('height', 15)
    .attr('transform', 'translate(' + 0 + ',' + 18 + ')')
var T_svg = d3.select('#Ins').append('svg')
    .attr('width', 100)
    .attr('height', 15000)
// .attr('transform', 'translate(' + 0 + ',' + 20 + ')')

function Sum(array, left, right) {
    var sum = 0;
    var cnt = 0;
    for (let i in array) {
        if (cnt >= left && cnt < right)
            sum += array[i].val;
        cnt++;
    }
    return sum;
}

var T_rect = 0;

var color = d3.scale.category20();
var titlex = ['初始财富', '工作', '健康投资', '财产保险', '借贷机会', '投资', '风险投资', '负面冲击', '买彩票', '生病', '失业']
Ksvg.selectAll('#dia_g_rect')
    .attr('id', 'dia_g_rect')
    .data(titlex)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        if (i > 1 && i <= 5) {
            return 5 + 62 * (i - 1) + 40;
        } else if (i > 5 && i <= 9) {
            return 5 + 62 * (i - 2) + 80;
        } else if (i > 9) {
            return 5 + 62 * (i - 3) + 120;
        }
        return 5 + 62 * i;
    })
    .attr('y', (d, i) => {
        // if (i < 9) {
        //     return 260;
        // } else {
        //     return 280;
        // }
        return 0;
    })
    .attr('height', 15)
    .attr('width', 15)
    .attr('fill', (d, i) => {
        return color(i);
    })
    .attr('fill-opacity', 0.3);

Ksvg.selectAll('#dia_g_t')
    .attr('id', 'dia_g_t')
    .data(titlex)
    .enter()
    .append('text')
    .attr('x', (d, i) => {
        if (i > 1 && i <= 5) {
            return 17 + 62 * (i - 1) + 40;
        } else if (i > 5 && i <= 9) {
            return 17 + 62 * (i - 2) + 80;
        } else if (i > 9) {
            return 17 + 62 * (i - 3) + 120;
        }
        return 17 + 62 * i;
    })
    .attr('dx', 3)
    .attr('dy', 10)
    .attr('font-family', 'kaiti')
    .attr('y', (d, i) => {
        // if (i < 9) {
        //     return 260;
        // } else {
        //     return 280;
        // }
        return 0;
    })
    .attr("font-size", 12)
    .text(d => {
        return d;
    });

var RectInStep = 240;
var RectInWidth = 30;
var color_kr = ['#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

function PaintRectIn(snum) {
    // console.log(222)
    d3.json('data/DK/sum2.json', function (sdata) {
        d3.csv('data/box_calc.csv', function (bdata) {
            // console.log(sdata)
            if (R_svg != 0) {
                R_svg.remove();
            }
            R_svg = d3.select('#Sun').append('svg')
                .attr('width', width_R)
                .attr('height', height_R)
                .attr('transform', 'translate(' + 0 + ',' + -285 + ')')
            if (T_svg != 0) {
                T_svg.remove();
            }
            T_svg = d3.select('#Ins').append('svg')
                .attr('width', 100)
                .attr('height', 12500)
            // .attr('transform', 'translate(' + 0 + ',' + 20 + ')')
            var Dec_1 = new Object(),
                Dec_2 = new Object(),
                Dec_3 = new Object();
            // for (let i = 1; i <= 12; ++i) {
            //     Dec_1.push(0);
            //     Dec_2.push(0);
            //     Dec_3.push(0);
            // }
            // console.log(Dec_3)
            // console.log(Dec_1[100])
            var cal_1 = new Object();
            var cal_2 = new Object();
            // console.log(typeof(cal_1[0]) == 'undefined')
            var pie_data = new Object();
            var coooo = 0;
            for (let p = 1; p <= 20; ++p) {
                var Cir_1 = new Array();
                var Cir_2 = new Array();
                var Cir_3 = new Array();
                var cnt1 = 0,
                    cnt2 = 0,
                    cnt3 = 0;
                for (let i in sdata[p]) {
                    // console.log(i)
                    // Dec_1[i] += 154;
                    for (let j in sdata[p][i]) {
                        // console.log(j)
                        Cir_1.push({
                            Decision: {},
                            cnt: cnt1,
                            h: 1,
                            main: i,
                            member: new Array()
                        })
                        Cir_1[cnt1]['Decision'][i] = parseInt(j);
                        cnt1++;
                        for (let k in sdata[p][i][j]) {
                            // console.log(Object.keys(sdata[p][i][j][k]));
                            // Dec_2[k]++;
                            for (let l in sdata[p][i][j][k]) {
                                // console.log(sdata[p][i][j][k][l])
                                // var tag = 1;
                                for (let m in sdata[p][i][j][k][l]) {
                                    var tag = 1;
                                    for (let n in sdata[p][i][j][k][l][m]) {
                                        tag = 0;
                                        Cir_3.push({
                                            Decision: {},
                                            cnt: cnt3,
                                            h: 3,
                                            tag: 0,
                                            main: m,
                                            mid: k,
                                            member: new Array(),
                                            x1: i,
                                            D1: j,
                                            x2: k,
                                            D2: l,
                                            x3: m,
                                            D3: n,
                                            str: i * 1000000000 + j * 10000000 + k * 100000 + l * 1000 + m * 10 + n
                                        })
                                        Cir_3[cnt3]['Decision'][i] = j;
                                        Cir_3[cnt3]['Decision'][k] = l;
                                        Cir_3[cnt3]['Decision'][m] = n;
                                        cnt3++;
                                    }
                                    // if (!tag) {
                                    //     // Dec_3[m]++;
                                    //     if (typeof (cal_2[parseInt(k) * 100 + parseInt(m)]) == 'undefined') {
                                    //         cal_2[parseInt(k) * 100 + parseInt(m)] = 0;
                                    //     }
                                    //     cal_2[parseInt(k) * 100 + parseInt(m)]++;
                                    // }
                                }
                                Cir_2.push({
                                    Decision: {},
                                    cnt: cnt2,
                                    tag: tag,
                                    h: 2,
                                    main: k,
                                    mid: i,
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
                                        member: new Array(),
                                        x1: i,
                                        D1: j,
                                        x2: k,
                                        D2: l,
                                        str: i * 1000000000 + j * 10000000 + k * 100000 + l * 1000
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

                            // if (typeof (cal_1[parseInt(i) * 100 + parseInt(k)]) == 'undefined') {
                            //     cal_1[parseInt(i) * 100 + parseInt(k)] = 0;
                            // }
                            // cal_1[parseInt(i) * 100 + parseInt(k)]++;
                        }
                    }
                }
                // console.log(Cir_2)

                var pdata = []
                for (let j in bdata) {
                    if (parseInt(bdata[j]['biao']) == p) {
                        bdata[j]['2'] = bdata[j]['ability']
                        pdata.push(bdata[j]);
                    }
                }
                for (let knumr in pdata) {
                    t1 = 0, t2 = 0, t3 = 0
                    for (let j in Cir_1) {
                        for (let k in Cir_1[j].Decision) {
                            // console.log(Cir_1[j].Decision[k], k)
                            // console.log(parseInt(pdata[i][k]))
                            if (parseInt(pdata[knumr][k]) == parseInt(Cir_1[j].Decision[k])) {
                                Cir_1[j].member.push(pdata[knumr]);
                            }
                        }
                    }
                    for (let j in Cir_2) {
                        // console.log(j)
                        var flag = 0;
                        for (let k in Cir_2[j].Decision) {
                            // console.log(k)
                            if (parseInt(pdata[knumr][k]) != parseInt(Cir_2[j].Decision[k])) {
                                flag = 1;
                            }
                        }
                        if (!flag) {
                            // console.log(t12)
                            // t12 += 1
                            Cir_2[j].member.push(pdata[knumr]);
                        }
                    }
                    for (let j in Cir_3) {
                        var flag = 0;
                        for (let k in Cir_3[j].Decision) {
                            if (parseInt(pdata[knumr][k]) != parseInt(Cir_3[j].Decision[k])) {
                                flag = 1;
                            }
                        }
                        if (!flag) {
                            Cir_3[j].member.push(pdata[knumr]);
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
                // break

                for (let j in Cir_1) {
                    if (typeof (Dec_1[parseInt(Cir_1[j].main) * 100 + parseInt(Cir_1[j].Decision[Cir_1[j].main])]) == 'undefined') {
                        Dec_1[parseInt(Cir_1[j].main) * 100 + parseInt(Cir_1[j].Decision[Cir_1[j].main])] = 0;
                    }
                    Dec_1[parseInt(Cir_1[j].main) * 100 + parseInt(Cir_1[j].Decision[Cir_1[j].main])] += Cir_1[j].member.length;
                }
                for (let j in Cir_2) {
                    if (typeof (Dec_2[parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])]) == 'undefined') {
                        Dec_2[parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])] = 0;
                    }
                    Dec_2[parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])] += Cir_2[j].member.length;
                    if (typeof (cal_1[parseInt(Cir_2[j].mid) * 1000000 + parseInt(Cir_2[j].Decision[Cir_2[j].mid]) * 10000 + parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])]) == 'undefined') {
                        cal_1[parseInt(Cir_2[j].mid) * 1000000 + parseInt(Cir_2[j].Decision[Cir_2[j].mid]) * 10000 + parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])] = 0;
                    }
                    // if (parseInt(Cir_2[j].main) * 100 == 0)
                    // console.log([parseInt(Cir_2[j].mid) * 1000000 + parseInt(Cir_2[j].Decision[Cir_2[j].mid]) * 10000 + parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])]);
                    cal_1[parseInt(Cir_2[j].mid) * 1000000 + parseInt(Cir_2[j].Decision[Cir_2[j].mid]) * 10000 + parseInt(Cir_2[j].main) * 100 + parseInt(Cir_2[j].Decision[Cir_2[j].main])] += Cir_2[j].member.length;
                }
                for (let j in Cir_3) {
                    if (typeof (Dec_3[parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])]) == 'undefined') {
                        Dec_3[parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])] = 0;
                    }
                    Dec_3[parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])] += Cir_3[j].member.length;
                    if (typeof (cal_2[parseInt(Cir_3[j].mid) * 1000000 + parseInt(Cir_3[j].Decision[Cir_3[j].mid]) * 10000 + parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])]) == 'undefined') {
                        cal_2[parseInt(Cir_3[j].mid) * 1000000 + parseInt(Cir_3[j].Decision[Cir_3[j].mid]) * 10000 + parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])] = 0;
                    }
                    cal_2[parseInt(Cir_3[j].mid) * 1000000 + parseInt(Cir_3[j].Decision[Cir_3[j].mid]) * 10000 + parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])] += Cir_3[j].member.length;
                }
                for (let j in Cir_3) {
                    if (typeof (pie_data[Cir_3[j].str]) == 'undefined') {
                        pie_data[Cir_3[j].str] = {
                            val: 0,
                            member: new Array()
                        }
                    }
                    pie_data[Cir_3[j].str]['member'] = pie_data[Cir_3[j].str]['member'].concat(Cir_3[j].member);
                }
            }

            // console.log(dx_3)
            var dx_1 = new Array(),
                dx_2 = new Array(),
                dx_3 = new Array();

            for (let i in Dec_1) {
                dx_1.push({
                    Decision: parseInt(i / 100),
                    result: i % 100,
                    val: Dec_1[i]
                })
            }
            // console.log(dx_1)

            for (let i in Dec_2) {
                dx_2.push({
                    Decision: parseInt(i / 100),
                    result: i % 100,
                    val: Dec_2[i]
                })
            }


            for (let i in Dec_3) {
                dx_3.push({
                    Decision: parseInt(i / 100),
                    result: i % 100,
                    val: Dec_3[i]
                })
            }
            console.log(dx_2)

            var scale_1 = d3.scale.linear()
                .domain([0, Sum(dx_1, 0, dx_1.length)])
                .range([0, 270]);
            // console.log( Dec_1.length)
            var DX1 = R_svg.selectAll('#DRect')
                .attr('id', 'DRect')
                .data(dx_1)
                .enter()
                .append('rect')
                .attr('x', 15)
                .attr('y', (d, i) => {
                    // console.log(d)
                    if (d != 0) {
                        let ks = Sum(dx_1, 0, i);
                        // console.log(ks)
                        return scale_1(ks) + 5;
                    }
                    // console.log(ks);
                })
                .attr('height', d => {
                    // console.log((d))
                    if (d != 0) {
                        return scale_1(d.val);
                    }
                })
                .attr('width', RectInWidth)
                .attr('fill', (d, i) => {
                    return color(d.Decision - 1)
                })
                .attr('fill-opacity', 0.3)
                .attr('stroke', d => {

                    if (d != 0)
                        return color(d.Decision - 1);
                    else
                        return 'none'
                })
                .attr('stroke-width', 1)

            var scale_2 = d3.scale.linear()
                .domain([0, Sum(dx_1, 0, dx_1.length)])
                .range([0, 270]);
            // console.log(Sum(Dec_3, 0, Dec_3.length))
            var DX2 = R_svg.selectAll('#DRect')
                .attr('id', 'DRect')
                .data(dx_2)
                .enter()
                .append('rect')
                .attr('x', 15 + RectInStep)
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_2, 0, i);
                        return scale_2(ks) + 5;
                    }
                    // console.log(ks);
                })
                .attr('height', d => {
                    // console.log((d))
                    if (d != 0) {
                        return scale_2(d.val);
                    }
                })
                .attr('width', RectInWidth)
                .attr('fill', (d, i) => {
                    return color(d.Decision - 1)
                })
                .attr('fill-opacity', 0.3)
                .attr('stroke', d => {

                    if (d != 0)
                        return color(d.Decision - 1);
                    else
                        return 'none'
                })
                .attr('stroke-width', 0.3)

            var DT2 = R_svg.selectAll('#DRectt2')
                .attr('id', 'DRectt2')
                .data(dx_2)
                .enter()
                .append('text')
                .attr('x', 15 + RectInStep + RectInWidth / 2)
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_2, 0, i);
                        return scale_2(ks) + 5;
                    }
                    // console.log(ks);
                })
                .attr("text-anchor", "middle")
                .attr('font-family', 'kaiti')
                .attr('font-size', 9)
                .attr('dy', 9)
                .text(d => {
                    if (d.val >= 200)
                        return title_tip[d.Decision - 1][d.result];
                })

            var scale_3 = d3.scale.linear()
                .domain([0, Sum(dx_1, 0, dx_1.length)])
                .range([0, 270]);
            // console.log( Dec_1.length)
            var DX3 = R_svg.selectAll('#DRect')
                .attr('id', 'DRect')
                .data(dx_3)
                .enter()
                .append('rect')
                .attr('x', d => {
                    if (d != 0)
                        return 15 + 2 * RectInStep
                })
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_3, 0, i);
                        return scale_3(ks) + 5;
                    }
                    // console.log(ks);
                })
                .attr('height', d => {
                    // console.log((d))
                    if (d != 0) {
                        return scale_3(d.val);
                    }
                })
                .attr('width', RectInWidth)
                .attr('fill', (d, i) => {
                    return color(d.Decision - 1)
                })
                .attr('fill-opacity', 0.3)
                .attr('stroke', d => {
                    if (d != 0)
                        return color(d.Decision - 1);
                    else
                        return 'none'
                })
                .attr('stroke-width', 0.3)
                var DT3 = R_svg.selectAll('#DRectt2')
                .attr('id', 'DRectt2')
                .data(dx_3)
                .enter()
                .append('text')
                .attr('x', 15 + 2 * RectInStep + RectInWidth / 2)
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_3, 0, i);
                        return scale_2(ks) + 5;
                    }
                    // console.log(ks);
                })
                .attr('font-size', 9)
                .attr('font-family', 'kaiti')
                .attr('dy', 9)
                .attr("text-anchor", "middle")
                .text(d => {
                    if (d.val >= 200)
                        return title_tip[d.Decision - 1][d.result];
                })

            var DT1 = R_svg.selectAll('#DRectt2')
                .attr('id', 'DRectt2')
                .data(dx_1)
                .enter()
                .append('text')
                .attr('x', 15 + RectInWidth / 2)
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_1, 0, i);
                        return scale_2(ks) + 5;
                    }
                    // console.log(ks);
                })
                .attr("text-anchor", "middle")
                .attr('font-family', 'kaiti')
                .attr('font-size', 9)
                .attr('dy', 9)
                .text(d => {
                    if (d.val >= 200)
                        return title_tip[d.Decision - 1][d.result];
                })

            var diagonal = d3.svg.diagonal()
                .projection(d => {
                    return [d.y, d.x]
                });

            var dia_path_1 = [];
            var dia_path_2 = [];
            var kt = 0;
            for (let i in cal_1) {
                kt += cal_1[i];
            }
            // console.log(kt, 'aa')

            var krscale = d3.scale.linear()
                .domain([0, kt])
                .range([0, 270]);
            // console.log(krscale(43))

            // console.log(cal_1)
            // console.log(Dec_1)
            // console.log(Dec_2)

            let cnt = 0;

            for (let i in cal_1) {
                cnt++
                // console.log(i)
                if (cal_1[i] == 0)
                    continue;
                var k1 = 0,
                    k2 = 0;
                // console.log('i = ', i)
                for (let j in cal_1) {
                    if (parseInt(j) < parseInt(i)) {
                        k1 += cal_1[j];
                        // console.log(111)
                        // console.log('j < i', 1002 < 102)
                        // console.log(j)
                    }
                    let kr1 = i % 10000,
                        kr2 = j % 10000;
                    // console.log(kr1, kr2)
                    if (kr2 < kr1 || (parseInt(j) < parseInt(i) && kr1 == kr2)) {
                        k2 += cal_1[j];
                        // console.log(222)
                        // console.log('j = ', j)
                    }
                }
                dia_path_1.push({
                    source: {
                        x: krscale(k1) + krscale(cal_1[i]) / 2 + 5,
                        y: 15 + RectInWidth
                    },
                    target: {
                        x: krscale(k2) + krscale(cal_1[i]) / 2 + 5,
                        y: 15 + RectInStep
                    },
                    weight: krscale(cal_1[i]),
                    x1: parseInt(i / 1000000),
                    y1: parseInt(i % 1000000 / 10000),
                    x2: parseInt(i % 10000 / 100),
                    y2: parseInt(i % 100)
                })
                // if (cnt == 10) break;
            }
            // console.log(dia)
            // console.log(cal_2)
            for (let i in cal_2) {
                cnt = 0;
                // console.log(i)
                var k1 = 0,
                    k2 = 0;
                // k1 += Sum(dx_2, 0, parseInt(parseInt(i) / 1000000) - 1)
                let Dec = parseInt(parseInt(i) / 1000000);
                let res = parseInt((parseInt(i) % 1000000) / 10000);
                for (let j in dx_2) {
                    if (dx_2[j].Decision < Dec || (dx_2[j].Decision == Dec && dx_2[j].result < res)) {
                        k1 += dx_2[j].val;
                    }
                }
                // console.log(Sum(dx_2, 0, parseInt(parseInt(i) / 1000000) - 1))
                // console.log('i = ', i)
                for (let j in cal_2) {
                    // console.log('j = ', j)
                    // console.log('i = ', i)
                    // console.log('j == i', parseInt(j) / 100 == parseInt(i) / 100)
                    // console.log(parseInt(j) / 100)
                    if (parseInt(parseInt(j) / 10000) == parseInt(parseInt(i) / 10000) && parseInt(j) < parseInt(i)) {
                        k1 += cal_2[j];
                        // console.log(111)
                        // console.log('j < i', 1002 < 102)
                        // console.log(j)
                    }
                    let kr1 = i % 10000,
                        kr2 = j % 10000;
                    // console.log(kr1, kr2)
                    if (kr2 < kr1 || (parseInt(j) < parseInt(i) && kr1 == kr2)) {
                        k2 += cal_2[j];
                        // console.log(222)
                        // console.log('j = ', j)
                    }
                }
                dia_path_2.push({
                    source: {
                        x: krscale(k1) + krscale(cal_2[i]) / 2 + 5,
                        y: 15 + RectInWidth + RectInStep
                    },
                    target: {
                        x: krscale(k2) + krscale(cal_2[i]) / 2 + 5,
                        y: 15 + RectInStep * 2
                    },
                    weight: krscale(cal_2[i]),
                    x2: parseInt(i / 1000000),
                    y2: parseInt(i % 1000000 / 10000),
                    x3: parseInt(i % 10000 / 100),
                    y3: parseInt(i % 100)
                })
                // if (cnt) break
            }
            // console.log(dia_path)



            var PieData = new Array();
            for (let i in pie_data) {
                // console.log(i);
                let value = 0;
                let l = 0,
                    m = 0,
                    h = 0;
                if (pie_data[i].member.length == 0)
                    continue;
                for (let j in pie_data[i].member) {
                    value += parseFloat(pie_data[i].member[j]['129']);
                    if (parseInt(pie_data[i].member[j]['label']) == 0) {
                        l++;
                    } else if (parseInt(pie_data[i].member[j]['label']) == 1) {
                        m++;
                    } else if (parseInt(pie_data[i].member[j]['label']) == 2) {
                        h++;
                    }
                }

                PieData.push({
                    value: Math.round(value, 3),
                    average: Math.round(value / pie_data[i].member.length, 3),
                    len: pie_data[i].member.length,
                    low: l,
                    mid: m,
                    high: h,
                    ll: l / pie_data[i].member.length,
                    mm: m / pie_data[i].member.length,
                    hh: h / pie_data[i].member.length,
                    x1: parseInt(i / 10000000000),
                    y1: parseInt(i % 10000000000 / 100000000),
                    x2: parseInt(i % 100000000 / 1000000),
                    y2: parseInt(i % 1000000 / 10000),
                    x3: parseInt(i % 10000 / 100),
                    y3: parseInt(i % 100)
                })
                // console.log(i, PieData[PieData.length - 1])
            }
            // console.log(PieData)
            if (snum == 1)
                PieData.sort((a, b) => {
                    return -a.len + b.len;
                })
            if (snum == 2) {
                PieData.sort((a, b) => {
                    return -a.average + b.average;
                })
            }
            if (snum == 3) {
                PieData.sort((a, b) => {
                    return a.average - b.average;
                })
            }

            let maxPeo = 0;
            let minPeo = 9999;
            for (let i in PieData) {
                maxPeo = Math.max(PieData[i].len, maxPeo);
                minPeo = Math.min(PieData[i].len, maxPeo);
            }
            // console.log(maxPeo, minPeo)
            let scale_x = d3.scale.linear()
                .domain([minPeo, maxPeo])
                .range([20, 25]);
            // var arc_data = 
            var kcnt = 0;

            for (let i in PieData) {
                if (snum == 3 && i < 20)
                continue;
                
                var arc1 = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(scale_x(PieData[i].len))
                let StartAngle = 0;
                var arc_data1;
                if (PieData[i].low != 0) {
                    arc_data1 = {
                        startAngle: StartAngle * Math.PI * 2,
                        endAngle: (StartAngle + PieData[i].low / PieData[i].len) * 2 * Math.PI
                    }
                    // console.log(PieData[i].l)
                    StartAngle += PieData[i].low / PieData[i].len;
                    T_svg.append('g')
                        .append('path')
                        .attr('d', arc1(arc_data1))
                        .attr('transform', 'translate(' + 40 + ',' + (32 + 50 * kcnt) + ')')
                        // .attr('stroke', '	#D3D3D3')
                        // .attr('stroke-width', '3px')
                        .attr('fill', (d) => {
                            return '#41CA77';
                        })
                        .attr('stroke', '#A9A9A9')
                        .attr('stroke-width', 0.5)
                        .on('mouseover', function (d) {
                            // Dia_3.attr('stroke-opacity', (x, y) => {
                            //     if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
                            //         return 0.5;
                            //     } else {
                            //         return 0.05;
                            //     }
                            // });
                            d = PieData[i];
                            var ks = i;
                            if (snum == 3) {
                                ks -= 20;
                            }
                            T_rect = T_svg.append('circle')
                                .attr('transform', 'translate(' + 40 + ',' + (32 + 50 * ks) + ')')
                                .attr('fill', 'none')
                                .attr('r', (scale_x(PieData[i].len) + 1))
                                .attr('stroke', 'blue')
                                .attr('stroke-width', 3);
                            Dia_2.attr('stroke-opacity', (x, y) => {
                                if (d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
                                    return 0.5;
                                } else {
                                    return 0.05
                                }
                            });
                            Dia_1.attr('stroke-opacity', (x, y) => {
                                if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2) {
                                    return 0.5;
                                } else {
                                    return 0.05
                                }
                            });
                            DX1.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DX2.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DX3.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT1.attr('opacity', (x, y) => {
                                if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT2.attr('opacity', (x, y) => {
                                if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT3.attr('opacity', (x, y) => {
                                if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                        })
                        .on('mouseout', function (d, i) {
                            // Dia_3.attr('stroke-opacity', (x, y) => {
                            //     return 0.1
                            // });
                            if (T_rect != 0) {
                                T_rect.remove();
                                T_rect = 0;
                            }
                            Dia_2.attr('stroke-opacity', (x, y) => {
                                return 0.1;
                            });
                            Dia_1.attr('stroke-opacity', (x, y) => {
                                return 0.1;
                            });
                            DX1.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DX2.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DX3.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DT1.attr('opacity', (x, y) => {
                                return 1;
                            });
                            DT2.attr('opacity', (x, y) => {
                                return 1;
                            });
                            DT3.attr('opacity', (x, y) => {
                                return 1;
                            });
                        })
                }
                if (PieData[i].mid != 0) {
                    arc_data1 = {
                        startAngle: StartAngle * Math.PI * 2,
                        endAngle: (StartAngle + PieData[i].mid / PieData[i].len) * 2 * Math.PI
                    }
                    // console.log(PieData[i].l)
                    StartAngle += PieData[i].mid / PieData[i].len;
                    T_svg.append('g')
                        .append('path')
                        .attr('d', arc1(arc_data1))
                        .attr('transform', 'translate(' + 40 + ',' + (32 + 50 * kcnt) + ')')
                        // .attr('stroke', '	#D3D3D3')
                        // .attr('stroke-width', '3px')
                        .attr('fill', "#F3AC2A")
                        .attr('stroke', '#A9A9A9')
                        .attr('stroke-width', 0.5)
                        .on('mouseover', function (d) {
                            // Dia_3.attr('stroke-opacity', (x, y) => {
                            //     if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
                            //         return 0.5;
                            //     } else {
                            //         return 0.05;
                            //     }
                            // });
                            d = PieData[i];
                            var ks = i;
                            if (snum == 3) {
                                ks -= 20;
                            }
                            T_rect = T_svg.append('circle')
                                .attr('transform', 'translate(' + 40 + ',' + (32 + 50 * ks) + ')')
                                .attr('fill', 'none')
                                .attr('r', (scale_x(PieData[i].len) + 1))
                                .attr('stroke', 'blue')
                                .attr('stroke-width', 3);
                            Dia_2.attr('stroke-opacity', (x, y) => {
                                if (d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
                                    return 0.5;
                                } else {
                                    return 0.05
                                }
                            });
                            Dia_1.attr('stroke-opacity', (x, y) => {
                                if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2) {
                                    return 0.5;
                                } else {
                                    return 0.05
                                }
                            });
                            DX1.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DX2.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DX3.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT1.attr('opacity', (x, y) => {
                                if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT2.attr('opacity', (x, y) => {
                                if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT3.attr('opacity', (x, y) => {
                                if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                        })
                        .on('mouseout', function (d, i) {
                            // Dia_3.attr('stroke-opacity', (x, y) => {
                            //     return 0.1
                            // });
                            if (T_rect != 0) {
                                T_rect.remove();
                                T_rect = 0;
                            }
                            Dia_2.attr('stroke-opacity', (x, y) => {
                                return 0.1;
                            });
                            Dia_1.attr('stroke-opacity', (x, y) => {
                                return 0.1;
                            });
                            DX1.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DX2.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DX3.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DT1.attr('opacity', (x, y) => {
                                return 1;
                            });
                            DT2.attr('opacity', (x, y) => {
                                return 1;
                            });
                            DT3.attr('opacity', (x, y) => {
                                return 1;
                            });
                        })
                }
                if (PieData[i].high != 0) {
                    arc_data1 = {
                        startAngle: StartAngle * Math.PI * 2,
                        endAngle: (StartAngle + PieData[i].high / PieData[i].len) * 2 * Math.PI
                    }
                    // console.log(PieData[i].l)
                    StartAngle += PieData[i].high / PieData[i].len;
                    T_svg.append('g')
                        .append('path')
                        .attr('d', arc1(arc_data1))
                        .attr('transform', 'translate(' + 40 + ',' + (32 + 50 * kcnt) + ')')
                        // .attr('stroke', '	#D3D3D3')
                        // .attr('stroke-width', '3px')
                        .attr('fill', "#D8483E")
                        .attr('stroke', '#A9A9A9')
                        .attr('stroke-width', 0.5)
                        .on('mouseover', function (d) {
                            // Dia_3.attr('stroke-opacity', (x, y) => {
                            //     if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
                            //         return 0.5;
                            //     } else {
                            //         return 0.05;
                            //     }
                            // });
                            d = PieData[i];
                            var ks = i;
                            if (snum == 3) {
                                ks -= 20;
                            }
                            T_rect = T_svg.append('circle')
                                .attr('transform', 'translate(' + 40 + ',' + (32 + 50 * ks) + ')')
                                .attr('fill', 'none')
                                .attr('r', (scale_x(PieData[i].len) + 1))
                                .attr('stroke', 'blue')
                                .attr('stroke-width', 3);
                            Dia_2.attr('stroke-opacity', (x, y) => {
                                if (d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
                                    return 0.5;
                                } else {
                                    return 0.05
                                }
                            });
                            Dia_1.attr('stroke-opacity', (x, y) => {
                                if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2) {
                                    return 0.5;
                                } else {
                                    return 0.05
                                }
                            });
                            DX1.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DX2.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DX3.attr('fill-opacity', (x, y) => {
                                if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
                                    return 0.6;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT1.attr('opacity', (x, y) => {
                                if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT2.attr('opacity', (x, y) => {
                                if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                            DT3.attr('opacity', (x, y) => {
                                if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
                                    return 1;
                                } else {
                                    return 0.1;
                                }
                            });
                        })
                        .on('mouseout', function (d, i) {
                            // Dia_3.attr('stroke-opacity', (x, y) => {
                            //     return 0.1
                            // });
                            if (T_rect != 0) {
                                T_rect.remove();
                                T_rect = 0;
                            }
                            Dia_2.attr('stroke-opacity', (x, y) => {
                                return 0.1;
                            });
                            Dia_1.attr('stroke-opacity', (x, y) => {
                                return 0.1;
                            });
                            DX1.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DX2.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DX3.attr('fill-opacity', (x, y) => {
                                return 0.3;
                            });
                            DT1.attr('opacity', (x, y) => {
                                return 1;
                            });
                            DT2.attr('opacity', (x, y) => {
                                return 1;
                            });
                            DT3.attr('opacity', (x, y) => {
                                return 1;
                            });
                        })

                }
                // break;
                
                kcnt++;
            }

            // console.log(dx_3)
            var d_p = new Array();
            console.log(PieData)
            for (let i = 0; i < 5; ++i) {
                let kn = 0;
                let mark = 0;
                for (let j in dx_3) {
                    if (dx_3[j].Decision < PieData[i].x3 || (dx_3[j].Decision == parseInt(PieData[i].x3) && dx_3[j].result < parseInt(PieData[i].y3))) {
                        kn += dx_3[j].val;
                        // console.log(cal_2[j])
                    }
                    if (dx_3[j].Decision == parseInt(PieData[i].x3) && dx_3[j].result == parseInt(PieData[i].y3)) {
                        mark = j;
                    }
                }
                // console.log(kn)
                d_p.push({
                    source: {
                        x: krscale(kn) + krscale(dx_3[mark].val) / 2 + 5,
                        y: 15 + RectInWidth + RectInStep * 2
                    },
                    target: {
                        y: 580 - scale_x(PieData[i].len),
                        x: 40 + 50 * i
                    },
                    weight: scale_x(PieData[i].len) / 3,
                    x1: PieData[i]['x1'],
                    y1: PieData[i]['y1'],
                    x2: PieData[i]['x2'],
                    y2: PieData[i]['y2'],
                    x3: PieData[i]['x3'],
                    y3: PieData[i]['y3']
                })
            }
            var Dia_1 = R_svg.selectAll('#dia_g_r')
                .attr('id', 'dia_g_r')
                .data(dia_path_1)
                .enter()
                .append('g')
                .append('path')
                .attr('d', d => {
                    // console.log(d)
                    return diagonal(d)
                })
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', d => {
                    return d.weight;
                })
                .attr('stroke-opacity', 0.1)


            var Dia_2 = R_svg.selectAll('#dia_g_r')
                .attr('id', 'dia_g_r')
                .data(dia_path_2)
                .enter()
                .append('g')
                .append('path')
                .attr('d', d => {
                    // console.log(d)
                    return diagonal(d)
                })
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', d => {
                    return d.weight;
                })
                .attr('stroke-opacity', 0.1)

            var Divs = R_svg.append('div')
                .attr('id', 'Ins')

            // console.log(d_p)
            // var Dia_3 = R_svg.selectAll('#dia_g_rx')
            //     .attr('id', 'dia_g_rx')
            //     .data(d_p)
            //     .enter()
            //     .append('g')
            //     .append('path')
            //     .attr('d', d => {
            //         // console.log(d)
            //         return diagonal(d)
            //     })
            //     .attr('fill', 'none')
            //     .attr('stroke', 'black')
            //     .attr('stroke-width', d => {
            //         return d.weight;
            //     })
            //     .attr('stroke-opacity', 0.1)
            //     .on('mouseover', function (d, i) {
            //         Dia_3.attr('stroke-opacity', (x, y) => {
            //             if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
            //                 return 0.5;
            //             } else {
            //                 return 0.05;
            //             }
            //         });
            //         Dia_2.attr('stroke-opacity', (x, y) => {
            //             if (d.x2 == x.x2 && d.y2 == x.y2 && d.x3 == x.x3 && d.y3 == x.y3) {
            //                 return 0.5;
            //             } else {
            //                 return 0.05
            //             }
            //         });
            //         Dia_1.attr('stroke-opacity', (x, y) => {
            //             if (d.x1 == x.x1 && d.y1 == x.y1 && d.x2 == x.x2 && d.y2 == x.y2) {
            //                 return 0.5;
            //             } else {
            //                 return 0.05
            //             }
            //         });
            //         DX1.attr('fill-opacity', (x, y) => {
            //             if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
            //                 return 0.6;
            //             } else {
            //                 return 0.1;
            //             }
            //         });
            //         DX2.attr('fill-opacity', (x, y) => {
            //             if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
            //                 return 0.6;
            //             } else {
            //                 return 0.1;
            //             }
            //         });
            //         DX3.attr('fill-opacity', (x, y) => {
            //             if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
            //                 return 0.6;
            //             } else {
            //                 return 0.1;
            //             }
            //         });
            //         DT1.attr('opacity', (x, y) => {
            //             if (parseInt(d.x1) == parseInt(x.Decision) && parseInt(d.y1) == parseInt(x.result)) {
            //                 return 1;
            //             } else {
            //                 return 0.1;
            //             }
            //         });
            //         DT2.attr('opacity', (x, y) => {
            //             if (parseInt(d.x2) == parseInt(x.Decision) && parseInt(d.y2) == parseInt(x.result)) {
            //                 return 1;
            //             } else {
            //                 return 0.1;
            //             }
            //         });
            //         DT3.attr('opacity', (x, y) => {
            //             if (parseInt(d.x3) == parseInt(x.Decision) && parseInt(d.y3) == parseInt(x.result)) {
            //                 return 1;
            //             } else {
            //                 return 0.1;
            //             }
            //         });
            //     })
            //     .on('mouseout', function (d, i) {
            //         Dia_3.attr('stroke-opacity', (x, y) => {
            //             return 0.1
            //         });
            //         Dia_2.attr('stroke-opacity', (x, y) => {
            //             return 0.1;
            //         });
            //         Dia_1.attr('stroke-opacity', (x, y) => {
            //             return 0.1;
            //         });
            //         DX1.attr('fill-opacity', (x, y) => {
            //             return 0.3;
            //         });
            //         DX2.attr('fill-opacity', (x, y) => {
            //             return 0.3;
            //         });
            //         DX3.attr('fill-opacity', (x, y) => {
            //             return 0.3;
            //         });
            //         DT1.attr('opacity', (x, y) => {
            //             return 1;
            //         });
            //         DT2.attr('opacity', (x, y) => {
            //             return 1;
            //         });
            //         DT3.attr('opacity', (x, y) => {
            //             return 1;
            //         });
            //     })


        })
    })
}

PaintRectIn(1);