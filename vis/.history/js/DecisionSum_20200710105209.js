// console.log(2222)

var width_R = 611;
var height_R = 298

var R_svg = d3.select('#Sun').append('svg')
    .attr('width', width_R)
    .attr('height', height_R)

function Sum(array, left, right) {
    var sum = 0;
    for (let i = left; i < right; ++i) {
        sum += array[i];
    }
    return sum;
}

var RectInStep = 260;
var RectInWidth = 40;

function PaintRactIn() {
    // console.log(222)
    d3.json('data/DT/sum2.json', function (sdata) {
        // console.log(sdata)
        var Dec_1 = new Array(),
            Dec_2 = new Array(),
            Dec_3 = new Array();
        for (let i = 1; i <= 12; ++i) {
            Dec_1.push(0);
            Dec_2.push(0);
            Dec_3.push(0);
        }
        // console.log(Dec_3)
        var cal_1 = new Object();
        var cal_2 = new Object();
        console.log(cal_1[1])
        for (let p = 1; p <= 20; ++p) {
            var Cir_1 = new Array();
            var Cir_2 = new Array();
            var Cir_3 = new Array();
            var cnt1 = 0,
                cnt2 = 0,
                cnt3 = 0;
            for (let i in sdata[p]) {
                // console.log(i)
                Dec_1[i]++;
                for (let j in sdata[p][i]) {
                    // console.log(j)
                    // Cir_1.push({
                    //     Decision: {},
                    //     cnt: cnt1,
                    //     h: 1,
                    //     member: new Array()
                    // })
                    // Cir_1[cnt1]['Decision'][i] = parseInt(j);
                    // cnt1++;
                    for (let k in sdata[p][i][j]) {
                        // console.log(Object.keys(sdata[p][i][j][k]));
                        Dec_2[k]++;
                        for (let l in sdata[p][i][j][k]) {
                            // console.log(sdata[p][i][j][k][l])
                            // var tag = 1;
                            for (let m in sdata[p][i][j][k][l]) {
                                var tag = 1;
                                for (let n in sdata[p][i][j][k][l][m]) {
                                    tag = 0;
                                    // Cir_3.push({
                                    //     Decision: {},
                                    //     cnt: cnt3,
                                    //     h: 3,
                                    //     tag: 0,
                                    //     member: new Array()
                                    // })
                                    // Cir_3[cnt3]['Decision'][i] = j;
                                    // Cir_3[cnt3]['Decision'][k] = l;
                                    // Cir_3[cnt3]['Decision'][m] = n;
                                    // cnt3++;
                                }
                                if (!tag) {
                                    Dec_3[m]++;
                                    // cal_1[i * 100 + j]
                                }
                            }
                            // Cir_2.push({
                            //     Decision: {},
                            //     cnt: cnt2,
                            //     tag: tag,
                            //     h: 2,
                            //     member: new Array()
                            // })
                            // Cir_2[cnt2]['Decision'][i] = j;
                            // // console.log(1)
                            // Cir_2[cnt2]['Decision'][k] = l;
                            // if (tag) {
                            //     // console.log(1)
                            //     Cir_3.push({
                            //         Decision: {},
                            //         cnt: cnt3,
                            //         tag: tag,
                            //         h: 2,
                            //         member: new Array()
                            //     });
                            //     Cir_3[cnt3]['Decision'][i] = j;
                            //     // console.log(1)
                            //     Cir_3[cnt3]['Decision'][k] = l;
                            //     // console.log(Cir_3)
                            //     // console.log(cnt3)
                            //     // Cir_3[cnt3]['cnt'] = cnt3 + 1;
                            //     cnt3++;
                            // }
                            // cnt2++;
                        }
                    }
                }
            }
        }
        // console.log(Sum(Dec_3))
        var scale_1 = d3.scale.linear()
            .domain([0, Sum(Dec_1, 0, Dec_1.length)])
            .range([0, 270]);
        // console.log( Dec_1.length)
        R_svg.selectAll('#DRect')
            .attr('id', 'DRect')
            .data(Dec_1)
            .enter()
            .append('rect')
            .attr('x', 30)
            .attr('y', (d, i) => {
                if (d != 0) {
                    let ks = Sum(Dec_1, 0, i);
                    return scale_1(ks) + 10;
                }
                // console.log(ks);
            })
            .attr('height', d => {
                // console.log((d))
                if (d != 0) {
                    return scale_1(d);
                }
            })
            .attr('width', RectInWidth)
            .attr('fill', 'none')
            .attr('stroke', d => {
                if (d != 0)
                    return 'black';
                else
                    return 'none'
            })
            .attr('stroke-width', 0.3)

        var scale_2 = d3.scale.linear()
            .domain([0, Sum(Dec_2, 0, Dec_2.length)])
            .range([0, 270]);
        // console.log( Dec_1.length)
        R_svg.selectAll('#DRect')
            .attr('id', 'DRect')
            .data(Dec_2)
            .enter()
            .append('rect')
            .attr('x', 30 + RectInStep)
            .attr('y', (d, i) => {
                if (d != 0) {
                    let ks = Sum(Dec_2, 0, i);
                    return scale_2(ks) + 10;
                }
                // console.log(ks);
            })
            .attr('height', d => {
                // console.log((d))
                if (d != 0) {
                    return scale_2(d);
                }
            })
            .attr('width', RectInWidth)
            .attr('fill', 'none')
            .attr('stroke', d => {
                if (d != 0)
                    return 'black';
                else
                    return 'none'
            })
            .attr('stroke-width', 0.3)

        var scale_3 = d3.scale.linear()
            .domain([0, Sum(Dec_3, 0, Dec_3.length)])
            .range([0, 270]);
        // console.log( Dec_1.length)
        R_svg.selectAll('#DRect')
            .attr('id', 'DRect')
            .data(Dec_3)
            .enter()
            .append('rect')
            .attr('x', d => {
                if (d != 0)
                return 30 + 2 * RectInStep
            })
            .attr('y', (d, i) => {
                if (d != 0) {
                    let ks = Sum(Dec_3, 0, i);
                    return scale_3(ks) + 10;
                }
                // console.log(ks);
            })
            .attr('height', d => {
                // console.log((d))
                if (d != 0) {
                    return scale_3(d);
                }
            })
            .attr('width', RectInWidth)
            .attr('fill', 'none')
            .attr('stroke', d => {
                if (d != 0)
                    return 'black';
                else
                    return 'none'
            })
            .attr('stroke-width', 0.3)
    })
}

PaintRactIn();