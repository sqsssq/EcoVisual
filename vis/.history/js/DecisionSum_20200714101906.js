// console.log(2222)

var width_R = 611;
var height_R = 298

var R_svg = d3.select('#Sun').append('svg')
    .attr('width', width_R)
    .attr('height', height_R)

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

var RectInStep = 200;
var RectInWidth = 30;
var color_kr = ['#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

function PaintRactIn() {
    // console.log(222)
    d3.json('data/DT/sum2.json', function (sdata) {
        d3.csv('data/box_calc.csv', function (bdata) {
            // console.log(sdata)
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
                    // Dec_1[i] += 304;
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
                                            member: new Array()
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

                            // if (typeof (cal_1[parseInt(i) * 100 + parseInt(k)]) == 'undefined') {
                            //     cal_1[parseInt(i) * 100 + parseInt(k)] = 0;
                            // }
                            // cal_1[parseInt(i) * 100 + parseInt(k)]++;
                        }
                    }
                }

                var pdata = []
                for (let j = 0 + (p - 1) * 304; j < 304 * p; ++j)
                    pdata.push(bdata[j]);
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
                    // if (typeof (cal_1[parseInt(Cir_2[j].mid) * 100 + parseInt(Cir_2[j].main)]) == 'undefined') {
                    //     cal_1[parseInt(Cir_2[j].mid) * 100 + parseInt(Cir_2[j].main)] = 0;
                    // }
                    // cal_1[parseInt(Cir_2[j].mid) * 100 + parseInt(Cir_2[j].main)] += Cir_2[j].member.length;
                }
                for (let j in Cir_3) {
                    if (typeof (Dec_3[parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])]) == 'undefined') {
                        Dec_3[parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])] = 0;
                    }
                    Dec_3[parseInt(Cir_3[j].main) * 100 + parseInt(Cir_3[j].Decision[Cir_3[j].main])] += Cir_3[j].member.length;
                    // if (typeof (cal_2[parseInt(Cir_3[j].mid) * 100 + parseInt(Cir_3[j].main)]) == 'undefined') {
                    //     cal_2[parseInt(Cir_3[j].mid) * 100 + parseInt(Cir_3[j].main)] = 0;
                    // }
                    // cal_2[parseInt(Cir_3[j].mid) * 100 + parseInt(Cir_3[j].main)] += Cir_3[j].member.length;
                }
            }
            // console.log(Dec_1)
            var dx_1 = new Array(), dx_2 = new Array(), dx_3 = new Array();

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

            var color = d3.scale.category20();
            var scale_1 = d3.scale.linear()
                .domain([0, Sum(dx_1, 0, dx_1.length)])
                .range([0, 250]);
            // console.log( Dec_1.length)
            R_svg.selectAll('#DRect')
                .attr('id', 'DRect')
                .data(dx_1)
                .enter()
                .append('rect')
                .attr('x', 30)
                .attr('y', (d, i) => {
                    console.log(d)
                    if (d != 0) {
                        let ks = Sum(dx_1, 0, i);
                        console.log(ks)
                        return scale_1(ks) + 10;
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
                    return color(d.Decision)
                })
                .attr('fill-opacity', 0.3)
                .attr('stroke', d => {
                    if (d != 0)
                        return 'black';
                    else
                        return 'none'
                })
                .attr('stroke-width', 0.3)

            var scale_2 = d3.scale.linear()
                .domain([0, Sum(dx_1, 0, dx_1.length)])
                .range([0, 250]);
            // console.log(Sum(Dec_3, 0, Dec_3.length))
            R_svg.selectAll('#DRect')
                .attr('id', 'DRect')
                .data(dx_2)
                .enter()
                .append('rect')
                .attr('x', 30 + RectInStep)
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_2, 0, i);
                        return scale_2(ks) + 10;
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
                    return color(d.Decision)
                })
                .attr('fill-opacity', 0.3)
                .attr('stroke', d => {
                    if (d != 0)
                        return 'black';
                    else
                        return 'none'
                })
                .attr('stroke-width', 0.3)

            var scale_3 = d3.scale.linear()
                .domain([0, Sum(dx_1, 0, dx_1.length)])
                .range([0, 250]);
            // console.log( Dec_1.length)
            R_svg.selectAll('#DRect')
                .attr('id', 'DRect')
                .data(dx_3)
                .enter()
                .append('rect')
                .attr('x', d => {
                    if (d != 0)
                        return 30 + 2 * RectInStep
                })
                .attr('y', (d, i) => {
                    if (d != 0) {
                        let ks = Sum(dx_3, 0, i);
                        return scale_3(ks) + 10 + 30;
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
                    return color(d.Decision)
                })
                .attr('fill-opacity', 0.3)
                .attr('stroke', d => {
                    if (d != 0)
                        return 'black';
                    else
                        return 'none'
                })
                .attr('stroke-width', 0.3)

            var diagonal = d3.svg.diagonal()
                .projection(d => {
                    return [d.y, d.x]
                });

            var dia_path = [];
            var kt = 0;
            for (let i in cal_1) {
                kt += cal_1[i];
            }
            // console.log(kt, 'aa')

            var krscale = d3.scale.linear()
                .domain([0, kt])
                .range([0, 250]);
            // console.log(krscale(43))

            // console.log(cal_1)
            // console.log(Dec_1)
            // console.log(Dec_2)

            let cnt = 0;

            for (let i in cal_1) {
                cnt++
                // console.log(i)
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
                    if (j % 100 < i % 100 || (j % 100 == i % 100 && parseInt(j) < parseInt(i))) {
                        k2 += cal_1[j];
                        // console.log(222)
                        // console.log('j = ', j)
                    }
                }
                dia_path.push({
                    source: {
                        x: krscale(k1) + krscale(cal_1[i]) / 2 + 10,
                        y: 30 + RectInWidth
                    },
                    target: {
                        x: krscale(k2) + krscale(cal_1[i]) / 2 + 10,
                        y: 30 + RectInStep
                    },
                    weight: krscale(cal_1[i])
                })
                // if (cnt) break
            }
            // console.log(dia)
            for (let i in cal_2) {
                cnt++
                // console.log(i)
                var k1 = 0,
                    k2 = 0;
                k1 += Sum(Dec_2, 0, parseInt(i) / 100 - 1)
                // console.log('i = ', i)
                for (let j in cal_2) {
                    // console.log('j = ', j)
                    // console.log('i = ', i)
                    // console.log('j == i', parseInt(j) / 100 == parseInt(i) / 100)
                    // console.log(parseInt(j) / 100)
                    if (parseInt(parseInt(j) / 100) == parseInt(parseInt(i) / 100) && parseInt(j) < parseInt(i)) {
                        k1 += cal_2[j];
                        // console.log(111)
                        // console.log('j < i', 1002 < 102)
                        // console.log(j)
                    }
                    if (j % 100 < i % 100 || (j % 100 == i % 100 && parseInt(j) < parseInt(i))) {
                        k2 += cal_2[j];
                        // console.log(222)
                        // console.log('j = ', j)
                    }
                }
                dia_path.push({
                    source: {
                        x: krscale(k1) + krscale(cal_2[i]) / 2 + 10,
                        y: 30 + RectInWidth + RectInStep
                    },
                    target: {
                        x: krscale(k2) + krscale(cal_2[i]) / 2 + 10,
                        y: 30 + RectInStep * 2
                    },
                    weight: krscale(cal_2[i])
                })
                // if (cnt) break
            }


            R_svg.selectAll('#dia_g_r')
                .attr('id', 'dia_g_r')
                .data(dia_path)
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
        })
    })
}

PaintRactIn();