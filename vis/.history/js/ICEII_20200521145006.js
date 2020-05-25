var width_ice = 611,
    height_ice = 306

color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]



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

// function IceLine_2(ice_name_2, ice_num) {
//     d3.csv('data/box_calc.csv', function (Ice_d) {

//         color_g = ['black', 'red', 'green']
//         // console.log(Ice_d)
//         if (ice_line_g != 0) {
//             ice_line_g.remove();
//             ice_line_g = 0;
//         }

//         ice_line_g = ice_rect.append('g');

//         var r = []
//         for (var i = 0; i < 6; ++i) r.push({
//             n: 0,
//             member: [],
//             type: 0,
//             num: 0
//         })
//         //#region 

//         for (var i in Ice_d) {
//             // console.log(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) <= 0.5) r[0].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) <= 0.5) r[1].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) > 0.5) r[2].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) <= 0.5) r[3].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) > 0.5) r[4].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) > 1.5) r[5].member.push(Ice_d[i])
//         }
//         r[0].n = 3, r[1].n = 4, r[2].n = 4, r[3].n = 4, r[4].n = 4, r[5].n = 3;
//         r[0].num = 0, r[1].num = 1, r[2].num = 2, r[3].num = 3, r[4].num = 4, r[5].num = 3;
//         r[0].type = '工作能力弱', r[1].type = '健康', r[2].type = '疾病', r[3].type = '不借贷', r[4].type = '借贷', r[5].type = '工作能力强';

//         rk = []
//         var rk_num = 0,
//             high = [],
//             low = [],
//             mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 4,
//             kn: 0,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 0,
//             knum: 0,
//             color: '#00FF00'
//         })

//         rk.push({
//             n: 4,
//             kn: 0,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 0,
//             knum: 1,
//             color: 'yellow'
//         })

//         rk.push({
//             n: 4,
//             kn: 0,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 0,
//             knum: 2,
//             color: 'red'
//         })
//         high = [], low = [], mid = []
//         for (var i in r[1].member) {
//             if (parseInt(r[1].member[i][11]) == 0) low.push(r[1].member[i])
//             if (parseInt(r[1].member[i][11]) == 1) mid.push(r[1].member[i])
//             if (parseInt(r[1].member[i][11]) == 2) high.push(r[1].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '中等',
//             num: 1,
//             knum: 0,
//             color: '#00FF00'
//         })

//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '中等',
//             num: 1,
//             knum: 1,
//             color: 'yellow'
//         })

//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '中等',
//             num: 1,
//             knum: 2,
//             color: 'red'
//         })
//         rk_num = 2, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 2,
//             knum: 3,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 2,
//             knum: 4,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 2,
//             knum: 5,
//             color: 'red'
//         })
//         rk_num = 3, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 3,
//             knum: 6,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 3,
//             knum: 7,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 3,
//             knum: 8,
//             color: 'red'
//         })
//         rk_num = 4, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 4,
//             knum: 9,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 4,
//             knum: 10,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 4,
//             knum: 11,
//             color: 'red'
//         })
//         rk_num = 5, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 4,
//             kn: 5,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 5,
//             knum: 0,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 4,
//             kn: 5,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 5,
//             knum: 1,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 4,
//             kn: 5,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 5,
//             knum: 2,
//             color: 'red'
//         })
//         var mk = []
//         for (var i in r[1].member) {
//             mk.push(r[1].member[i])
//         }
//         for (var i in r[2].member) {
//             mk.push(r[2].member[i])
//         }
//         r.push({
//             n: 3,
//             member: mk,
//             type: '工作能力较强',
//             num: 1
//         })
//         mk = []
//         for (var i in r[3].member) {
//             mk.push(r[3].member[i])
//         }
//         for (var i in r[4].member) {
//             mk.push(r[4].member[i])
//         }
//         r.push({
//             n: 3,
//             member: mk,
//             type: '工作能力较弱',
//             num: 2
//         })
//         mk = []
//         for (var i in Ice_d) {
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5)
//                 mk.push(Ice_d[i])
//         }
//         r.push({
//             n: 2,
//             member: mk,
//             type: '起始贫穷',
//             num: 0
//         })
//         mk = []
//         for (var i in Ice_d) {
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5)
//                 mk.push(Ice_d[i])
//         }
//         r.push({
//             n: 2,
//             member: mk,
//             type: '起始富裕',
//             num: 1
//         })
//         r.push({
//             n: 1,
//             member: Ice_d,
//             type: '',
//             num: 0
//         })
//         //#endregion

//         r.sort(function (a, b) {
//             if (a.n != b.n) return a.n - b.n
//             return a.num - b.num
//         })

//         r[0]['gini'] = 0.667
//         r[1]['gini'] = 0.593
//         r[2]['gini'] = 0.571
//         r[3]['gini'] = 0.521
//         r[4]['gini'] = 0.63
//         r[5]['gini'] = 0.614
//         r[6]['gini'] = 0.527
//         r[7]['gini'] = 0.661
//         r[8]['gini'] = 0.613
//         r[9]['gini'] = 0.582
//         r[10]['gini'] = 0.663
//         // console.log(rk)

//         var ice_max = -999999

//         // console.log(r)

//         for (var i in r[0].member) {
//             ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129]) - parseFloat(r[0].member[i][19])))
//         }

//         // ice_max = 1000;
//         var line_scale = d3.scale.linear()
//             .domain([0, Math.log2(ice_max)])
//             .range([0, height_ice / 4])
//         // console.log(ice_max)

//         var colora = "#FFFFFF"
//         var colorb = color[0]

//         let colorx = d3.interpolate(colora, colorb);
//         var color_scale = d3.scale.linear()
//             .domain([0.5, 0.667])
//             .range([0, 1])

//         let colorx2 = d3.interpolate('red', '#00FF00');
//         var color_scale2 = d3.scale.linear()
//             .domain([-1, 1])
//             .range([0, 1])
//         // console.log(ice_num)
//         // console.log(r)


//         for (var i in r) {
//             for (var j in r[i].member) {
//                 r[i].member[j]['kval'] = parseFloat(r[i].member[j]['129']) - parseFloat(r[i].member[j]['19'])
//             }
//         }
//         console.log(r)

//         r[3].member.sort(function (a, b) {
//             return b.kval - a.kval
//         })
//         for (var i = 6; i <= 10; ++i)
//             r[i].member.sort(function (a, b) {
//                 return b.kval - a.kval
//             })

//         var diagonal = d3.svg.diagonal()
//             .projection(d => {
//                 return [d.x, d.y]
//             });


//         for (var kkk in ice_name_2) {
//             var ice_name = ice_name_2[kkk];
//             var line_x1 = 0,
//                 line_x2 = 0,
//                 line_y1 = 0,
//                 line_y2 = 0,
//                 line_x3 = 0,
//                 line_y3 = 0;
//             var k = 0;
//             for (var kk in r[k].member) {
//                 if (r[k].member[kk].code == ice_name && parseInt(r[k].member[kk].biao) == ice_num) {
//                     // console.log(r[k].member[kk])
//                     // console.log(kk)
//                     ice_line_g.selectAll('#linein')
//                         .attr('id', 'linein')
//                         .data([r[k].member[kk]])
//                         .enter()
//                         .append('line')
//                         .attr('x1', (d, i) => {
//                             var cnt = 0;
//                             for (var j in r) {
//                                 if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                             }
//                             if (r[k].n == 4) cnt += r[3].member.length
//                             // console.log(i / 10 + cnt / 10 + r[k].num * 1)
//                             line_x1 = kk / 10 + cnt / 10 + r[k].num * 1;
//                             return kk / 10 + cnt / 10 + r[k].num * 1;
//                         })
//                         .attr('y1', d => {
//                             if (k == 0) {
//                                 line_y1 = height_ice / 8;
//                                 return height_ice / 8
//                             }
//                             line_y1 = r[k].n * height_ice / 4 - height_ice / 8;
//                             return r[k].n * height_ice / 4 - height_ice / 8
//                         })
//                         .attr('x2', (d, i) => {
//                             // return i / 10;
//                             var cnt = 0;
//                             for (var j in r) {
//                                 if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                             }
//                             if (r[k].n == 4) cnt += r[3].member.length
//                             return kk / 10 + cnt / 10 + r[k].num * 1;
//                         })
//                         .attr('y2', d => {
//                             // if (Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19]))) <= 0)
//                             // return r[k].n * height_ice / 4 - height_ice / 8
//                             if (k == 0) {
//                                 // line_y1 = height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                                 return height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                             }
//                             // line_y1 = r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                             return r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                         })
//                         .attr('fill', 'none')
//                         .attr('stroke', d => {

//                             if (parseFloat(d[129] - d[19]) > 0)
//                                 return '#00FF00';
//                             else
//                                 return 'red'
//                         })
//                         .attr('stroke-width', 2)
//                     break;
//                 }
//             }

//             for (var k = 1; k < 11; ++k) {
//                 for (var kk in r[k].member) {
//                     if (r[k].member[kk].code == ice_name && parseInt(r[k].member[kk].biao) == ice_num) {
//                         // console.log(r[k].member[kk])
//                         // console.log(kk)
//                         ice_line_g.selectAll('#linein')
//                             .attr('id', 'linein')
//                             .data([r[k].member[kk]])
//                             .enter()
//                             .append('line')
//                             .attr('x1', (d, i) => {
//                                 var cnt = 0;
//                                 for (var j in r) {
//                                     if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                                 }
//                                 if (r[k].n == 4) cnt += r[3].member.length
//                                 // console.log(i / 10 + cnt / 10 + r[k].num * 1)
//                                 return kk / 10 + cnt / 10 + r[k].num * 1;
//                             })
//                             .attr('y1', d => {
//                                 if (k == 0) {
//                                     line_y3 = height_ice / 8
//                                     return height_ice / 8
//                                 }
//                                 line_y3 = r[k].n * height_ice / 4 - height_ice / 8
//                                 return r[k].n * height_ice / 4 - height_ice / 8
//                             })
//                             .attr('x2', (d, i) => {
//                                 // return i / 10;
//                                 var cnt = 0;
//                                 for (var j in r) {
//                                     if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                                 }
//                                 if (r[k].n == 4) cnt += r[3].member.length
//                                 line_x2 = kk / 10 + cnt / 10 + r[k].num * 1
//                                 return kk / 10 + cnt / 10 + r[k].num * 1;
//                             })
//                             .attr('y2', d => {
//                                 // if (Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19]))) <= 0)
//                                 // return r[k].n * height_ice / 4 - height_ice / 8
//                                 if (k == 0) {
//                                     line_y2 = height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                                     return height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                                 }
//                                 line_y2 = r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                                 return r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                             })
//                             .attr('fill', 'none')
//                             .attr('stroke', d => {
//                                 if (parseFloat(d[129] - d[19]) > 0)
//                                     return '#00FF00';
//                                 else
//                                     return 'red'
//                                 // return color_g[kkk % 10]
//                             })
//                             .attr('stroke-width', 2)

//                         dia = [{
//                             source: {
//                                 x: line_x1,
//                                 y: line_y1
//                             },
//                             target: {
//                                 x: line_x2,
//                                 y: line_y2
//                             }
//                         }]

//                         ice_line_g.selectAll('#dia_g')
//                             .attr('id', 'dia_g')
//                             .data(dia)
//                             .enter()
//                             .append('g')
//                             .append('path')
//                             .attr('d', d => {
//                                 // console.log(d)
//                                 return diagonal(d)
//                             })
//                             .attr('fill', 'none')
//                             .attr('stroke', color_g[kkk % color_g.length])
//                             .attr('stroke-width', 0.5)
//                             .attr('stroke-opacity', 1)
//                         line_x1 = line_x2
//                         line_y1 = line_y3
//                     }
//                 }
//             }
//         }
//     })
// }

// function IceLine(ice_name, ice_num) {
//     d3.csv('data/box_calc.csv', function (Ice_d) {
//         color_g = ['black', 'red', 'green']
//         // console.log(Ice_d)
//         if (ice_line_g != 0) {
//             ice_line_g.remove();
//             ice_line_g = 0;
//         }

//         ice_line_g = ice_rect.append('g');

//         var r = []
//         for (var i = 0; i < 6; ++i) r.push({
//             n: 0,
//             member: [],
//             type: 0,
//             num: 0
//         })
//         //#region 

//         for (var i in Ice_d) {
//             // console.log(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) <= 0.5) r[0].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) <= 0.5) r[1].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) > 0.5) r[2].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) <= 0.5) r[3].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) > 0.5) r[4].member.push(Ice_d[i])
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) > 1.5) r[5].member.push(Ice_d[i])
//         }
//         r[0].n = 3, r[1].n = 4, r[2].n = 4, r[3].n = 4, r[4].n = 4, r[5].n = 3;
//         r[0].num = 0, r[1].num = 1, r[2].num = 2, r[3].num = 3, r[4].num = 4, r[5].num = 3;
//         r[0].type = '工作能力弱', r[1].type = '健康', r[2].type = '疾病', r[3].type = '不借贷', r[4].type = '借贷', r[5].type = '工作能力强';

//         rk = []
//         var rk_num = 0,
//             high = [],
//             low = [],
//             mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 4,
//             kn: 0,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 0,
//             knum: 0,
//             color: '#00FF00'
//         })

//         rk.push({
//             n: 4,
//             kn: 0,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 0,
//             knum: 1,
//             color: 'yellow'
//         })

//         rk.push({
//             n: 4,
//             kn: 0,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 0,
//             knum: 2,
//             color: 'red'
//         })
//         high = [], low = [], mid = []
//         for (var i in r[1].member) {
//             if (parseInt(r[1].member[i][11]) == 0) low.push(r[1].member[i])
//             if (parseInt(r[1].member[i][11]) == 1) mid.push(r[1].member[i])
//             if (parseInt(r[1].member[i][11]) == 2) high.push(r[1].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '中等',
//             num: 1,
//             knum: 0,
//             color: '#00FF00'
//         })

//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '中等',
//             num: 1,
//             knum: 1,
//             color: 'yellow'
//         })

//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '中等',
//             num: 1,
//             knum: 2,
//             color: 'red'
//         })
//         rk_num = 2, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 2,
//             knum: 3,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 2,
//             knum: 4,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 2,
//             knum: 5,
//             color: 'red'
//         })
//         rk_num = 3, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 3,
//             knum: 6,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 3,
//             knum: 7,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 3,
//             knum: 8,
//             color: 'red'
//         })
//         rk_num = 4, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 4,
//             knum: 9,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 4,
//             knum: 10,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 5,
//             kn: 1,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 4,
//             knum: 11,
//             color: 'red'
//         })
//         rk_num = 5, high = [], low = [], mid = []
//         for (var i in r[rk_num].member) {
//             if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
//             if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
//         }
//         rk.push({
//             n: 4,
//             kn: 5,
//             member: high,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 5,
//             knum: 0,
//             color: '#00FF00'
//         })
//         rk.push({
//             n: 4,
//             kn: 5,
//             member: mid,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 5,
//             knum: 1,
//             color: 'yellow'
//         })
//         rk.push({
//             n: 4,
//             kn: 5,
//             member: low,
//             high: high,
//             mid: mid,
//             low: low,
//             type: '负',
//             num: 5,
//             knum: 2,
//             color: 'red'
//         })
//         var mk = []
//         for (var i in r[1].member) {
//             mk.push(r[1].member[i])
//         }
//         for (var i in r[2].member) {
//             mk.push(r[2].member[i])
//         }
//         r.push({
//             n: 3,
//             member: mk,
//             type: '工作能力较强',
//             num: 1
//         })
//         mk = []
//         for (var i in r[3].member) {
//             mk.push(r[3].member[i])
//         }
//         for (var i in r[4].member) {
//             mk.push(r[4].member[i])
//         }
//         r.push({
//             n: 3,
//             member: mk,
//             type: '工作能力较弱',
//             num: 2
//         })
//         mk = []
//         for (var i in Ice_d) {
//             if (parseFloat(Ice_d[i]['kaishi']) <= 0.5)
//                 mk.push(Ice_d[i])
//         }
//         r.push({
//             n: 2,
//             member: mk,
//             type: '起始贫穷',
//             num: 0
//         })
//         mk = []
//         for (var i in Ice_d) {
//             if (parseFloat(Ice_d[i]['kaishi']) > 0.5)
//                 mk.push(Ice_d[i])
//         }
//         r.push({
//             n: 2,
//             member: mk,
//             type: '起始富裕',
//             num: 1
//         })
//         r.push({
//             n: 1,
//             member: Ice_d,
//             type: '',
//             num: 0
//         })
//         //#endregion

//         r.sort(function (a, b) {
//             if (a.n != b.n) return a.n - b.n
//             return a.num - b.num
//         })

//         r[0]['gini'] = 0.667
//         r[1]['gini'] = 0.593
//         r[2]['gini'] = 0.571
//         r[3]['gini'] = 0.521
//         r[4]['gini'] = 0.63
//         r[5]['gini'] = 0.614
//         r[6]['gini'] = 0.527
//         r[7]['gini'] = 0.661
//         r[8]['gini'] = 0.613
//         r[9]['gini'] = 0.582
//         r[10]['gini'] = 0.663
//         // console.log(rk)

//         var ice_max = -999999

//         // console.log(r)

//         for (var i in r[0].member) {
//             ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129]) - parseFloat(r[0].member[i][19])))
//         }

//         // ice_max = 1000;
//         var line_scale = d3.scale.linear()
//             .domain([0, Math.log2(ice_max)])
//             .range([0, height_ice / 4])
//         // console.log(ice_max)

//         var colora = "#FFFFFF"
//         var colorb = color[0]

//         let colorx = d3.interpolate(colora, colorb);
//         var color_scale = d3.scale.linear()
//             .domain([0.5, 0.667])
//             .range([0, 1])

//         let colorx2 = d3.interpolate('red', '#00FF00');
//         var color_scale2 = d3.scale.linear()
//             .domain([-1, 1])
//             .range([0, 1])
//         // console.log(ice_num)
//         // console.log(r)


//         for (var i in r) {
//             for (var j in r[i].member) {
//                 r[i].member[j]['kval'] = parseFloat(r[i].member[j]['129']) - parseFloat(r[i].member[j]['19'])
//             }
//         }
//         console.log(r)

//         r[3].member.sort(function (a, b) {
//             return b.kval - a.kval
//         })
//         for (var i = 6; i <= 10; ++i)
//             r[i].member.sort(function (a, b) {
//                 return b.kval - a.kval
//             })

//         var diagonal = d3.svg.diagonal()
//             .projection(d => {
//                 return [d.x, d.y]
//             });


//         // for (var kkk in ice_name_2) {
//         // var ice_name = ice_name_2[kkk];
//         kkk = 0
//         var line_x1 = 0,
//             line_x2 = 0,
//             line_y1 = 0,
//             line_y2 = 0,
//             line_x3 = 0,
//             line_y3 = 0;
//         var k = 0;
//         for (var kk in r[k].member) {
//             if (r[k].member[kk].code == ice_name && parseInt(r[k].member[kk].biao) == ice_num) {
//                 // console.log(r[k].member[kk])
//                 // console.log(kk)
//                 ice_line_g.selectAll('#linein')
//                     .attr('id', 'linein')
//                     .data([r[k].member[kk]])
//                     .enter()
//                     .append('line')
//                     .attr('x1', (d, i) => {
//                         var cnt = 0;
//                         for (var j in r) {
//                             if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                         }
//                         if (r[k].n == 4) cnt += r[3].member.length
//                         // console.log(i / 10 + cnt / 10 + r[k].num * 1)
//                         line_x1 = kk / 10 + cnt / 10 + r[k].num * 1;
//                         return kk / 10 + cnt / 10 + r[k].num * 1;
//                     })
//                     .attr('y1', d => {
//                         if (k == 0) {
//                             line_y1 = height_ice / 8;
//                             return height_ice / 8
//                         }
//                         line_y1 = r[k].n * height_ice / 4 - height_ice / 8;
//                         return r[k].n * height_ice / 4 - height_ice / 8
//                     })
//                     .attr('x2', (d, i) => {
//                         // return i / 10;
//                         var cnt = 0;
//                         for (var j in r) {
//                             if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                         }
//                         if (r[k].n == 4) cnt += r[3].member.length
//                         return kk / 10 + cnt / 10 + r[k].num * 1;
//                     })
//                     .attr('y2', d => {
//                         // if (Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19]))) <= 0)
//                         // return r[k].n * height_ice / 4 - height_ice / 8
//                         if (k == 0) {
//                             // line_y1 = height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                             return height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                         }
//                         // line_y1 = r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                         return r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                     })
//                     .attr('fill', 'none')
//                     .attr('stroke', d => {

//                         if (parseFloat(d[129] - d[19]) > 0)
//                             return '#00FF00';
//                         else
//                             return 'red'
//                     })
//                     .attr('stroke-width', 2)
//                 break;
//             }
//         }

//         for (var k = 1; k < 11; ++k) {
//             for (var kk in r[k].member) {
//                 if (r[k].member[kk].code == ice_name && parseInt(r[k].member[kk].biao) == ice_num) {
//                     // console.log(r[k].member[kk])
//                     // console.log(kk)
//                     ice_line_g.selectAll('#linein')
//                         .attr('id', 'linein')
//                         .data([r[k].member[kk]])
//                         .enter()
//                         .append('line')
//                         .attr('x1', (d, i) => {
//                             var cnt = 0;
//                             for (var j in r) {
//                                 if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                             }
//                             if (r[k].n == 4) cnt += r[3].member.length
//                             // console.log(i / 10 + cnt / 10 + r[k].num * 1)
//                             return kk / 10 + cnt / 10 + r[k].num * 1;
//                         })
//                         .attr('y1', d => {
//                             if (k == 0) {
//                                 line_y3 = height_ice / 8
//                                 return height_ice / 8
//                             }
//                             line_y3 = r[k].n * height_ice / 4 - height_ice / 8
//                             return r[k].n * height_ice / 4 - height_ice / 8
//                         })
//                         .attr('x2', (d, i) => {
//                             // return i / 10;
//                             var cnt = 0;
//                             for (var j in r) {
//                                 if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
//                             }
//                             if (r[k].n == 4) cnt += r[3].member.length
//                             line_x2 = kk / 10 + cnt / 10 + r[k].num * 1
//                             return kk / 10 + cnt / 10 + r[k].num * 1;
//                         })
//                         .attr('y2', d => {
//                             // if (Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19]))) <= 0)
//                             // return r[k].n * height_ice / 4 - height_ice / 8
//                             if (k == 0) {
//                                 line_y2 = height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                                 return height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                             }
//                             line_y2 = r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                             return r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129]) - parseFloat(d[19])))) / 2;
//                         })
//                         .attr('fill', 'none')
//                         .attr('stroke', d => {
//                             if (parseFloat(d[129] - d[19]) > 0)
//                                 return '#00FF00';
//                             else
//                                 return 'red'
//                             // return color_g[kkk % 10]
//                         })
//                         .attr('stroke-width', 2)

//                     dia = [{
//                         source: {
//                             x: line_x1,
//                             y: line_y1
//                         },
//                         target: {
//                             x: line_x2,
//                             y: line_y2
//                         }
//                     }]

//                     ice_line_g.selectAll('#dia_g')
//                         .attr('id', 'dia_g')
//                         .data(dia)
//                         .enter()
//                         .append('g')
//                         .append('path')
//                         .attr('d', d => {
//                             // console.log(d)
//                             return diagonal(d)
//                         })
//                         .attr('fill', 'none')
//                         .attr('stroke', color_g[kkk % color_g.length])
//                         .attr('stroke-width', 0.5)
//                         .attr('stroke-opacity', 1)
//                     line_x1 = line_x2
//                     line_y1 = line_y3
//                 }
//             }
//         }
//         // }
//     })
// }


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

    // console.log(r);

    // var r = []
    // for (var i = 0; i < 6; ++i) r.push({
    //     n: 0,
    //     member: [],
    //     type: 0,
    //     num: 0
    // })
    // //#region 

    // for (var i in Ice_d) {
    //     // console.log(Ice_d[i])
    //     if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) <= 0.5) r[0].member.push(Ice_d[i])
    //     if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) <= 0.5) r[1].member.push(Ice_d[i])
    //     if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) > 0.5) r[2].member.push(Ice_d[i])
    //     if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) <= 0.5) r[3].member.push(Ice_d[i])
    //     if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) > 0.5) r[4].member.push(Ice_d[i])
    //     if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) > 1.5) r[5].member.push(Ice_d[i])
    // }
    // r[0].n = 3, r[1].n = 4, r[2].n = 4, r[3].n = 4, r[4].n = 4, r[5].n = 3;
    // r[0].num = 0, r[1].num = 1, r[2].num = 2, r[3].num = 3, r[4].num = 4, r[5].num = 3;
    // r[0].type = '工作能力弱', r[1].type = '健康', r[2].type = '疾病', r[3].type = '不借贷', r[4].type = '借贷', r[5].type = '工作能力强';

    // rk = []
    // var rk_num = 0,
    //     high = [],
    //     low = [],
    //     mid = []
    // for (var i in r[rk_num].member) {
    //     if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    // }
    // rk.push({
    //     n: 4,
    //     kn: 0,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 0,
    //     knum: 0,
    //     color: '#00FF00'
    // })

    // rk.push({
    //     n: 4,
    //     kn: 0,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 0,
    //     knum: 1,
    //     color: 'yellow'
    // })

    // rk.push({
    //     n: 4,
    //     kn: 0,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 0,
    //     knum: 2,
    //     color: 'red'
    // })
    // high = [], low = [], mid = []
    // for (var i in r[1].member) {
    //     if (parseInt(r[1].member[i][11]) == 0) low.push(r[1].member[i])
    //     if (parseInt(r[1].member[i][11]) == 1) mid.push(r[1].member[i])
    //     if (parseInt(r[1].member[i][11]) == 2) high.push(r[1].member[i])
    // }
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '中等',
    //     num: 1,
    //     knum: 0,
    //     color: '#00FF00'
    // })

    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '中等',
    //     num: 1,
    //     knum: 1,
    //     color: 'yellow'
    // })

    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '中等',
    //     num: 1,
    //     knum: 2,
    //     color: 'red'
    // })
    // rk_num = 2, high = [], low = [], mid = []
    // for (var i in r[rk_num].member) {
    //     if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    // }
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 2,
    //     knum: 3,
    //     color: '#00FF00'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 2,
    //     knum: 4,
    //     color: 'yellow'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 2,
    //     knum: 5,
    //     color: 'red'
    // })
    // rk_num = 3, high = [], low = [], mid = []
    // for (var i in r[rk_num].member) {
    //     if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    // }
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 3,
    //     knum: 6,
    //     color: '#00FF00'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 3,
    //     knum: 7,
    //     color: 'yellow'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 3,
    //     knum: 8,
    //     color: 'red'
    // })
    // rk_num = 4, high = [], low = [], mid = []
    // for (var i in r[rk_num].member) {
    //     if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    // }
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 4,
    //     knum: 9,
    //     color: '#00FF00'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 4,
    //     knum: 10,
    //     color: 'yellow'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 4,
    //     knum: 11,
    //     color: 'red'
    // })
    // rk_num = 5, high = [], low = [], mid = []
    // for (var i in r[rk_num].member) {
    //     if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
    //     if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    // }
    // rk.push({
    //     n: 4,
    //     kn: 5,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 5,
    //     knum: 0,
    //     color: '#00FF00'
    // })
    // rk.push({
    //     n: 4,
    //     kn: 5,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 5,
    //     knum: 1,
    //     color: 'yellow'
    // })
    // rk.push({
    //     n: 4,
    //     kn: 5,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 5,
    //     knum: 2,
    //     color: 'red'
    // })
    // var mk = []
    // for (var i in r[1].member) {
    //     mk.push(r[1].member[i])
    // }
    // for (var i in r[2].member) {
    //     mk.push(r[2].member[i])
    // }
    // r.push({
    //     n: 3,
    //     member: mk,
    //     type: '工作能力较强',
    //     num: 1
    // })
    // mk = []
    // for (var i in r[3].member) {
    //     mk.push(r[3].member[i])
    // }
    // for (var i in r[4].member) {
    //     mk.push(r[4].member[i])
    // }
    // r.push({
    //     n: 3,
    //     member: mk,
    //     type: '工作能力较弱',
    //     num: 2
    // })
    // mk = []
    // for (var i in Ice_d) {
    //     if (parseFloat(Ice_d[i]['kaishi']) <= 0.5)
    //         mk.push(Ice_d[i])
    // }
    // r.push({
    //     n: 2,
    //     member: mk,
    //     type: '起始贫穷',
    //     num: 0
    // })
    // mk = []
    // for (var i in Ice_d) {
    //     if (parseFloat(Ice_d[i]['kaishi']) > 0.5)
    //         mk.push(Ice_d[i])
    // }
    // r.push({
    //     n: 2,
    //     member: mk,
    //     type: '起始富裕',
    //     num: 1
    // })
    // r.push({
    //     n: 1,
    //     member: Ice_d,
    //     type: '',
    //     num: 0
    // })
    // //#endregion



    // r.sort(function (a, b) {
    //     if (a.n != b.n) return a.n - b.n
    //     return a.num - b.num
    // })

    // r[0]['gini'] = 0.667
    // r[1]['gini'] = 0.593
    // r[2]['gini'] = 0.571
    // r[3]['gini'] = 0.521
    // r[4]['gini'] = 0.63
    // r[5]['gini'] = 0.614
    // r[6]['gini'] = 0.527
    // r[7]['gini'] = 0.661
    // r[8]['gini'] = 0.613
    // r[9]['gini'] = 0.582
    // r[10]['gini'] = 0.663
    // // console.log(r)

    // for (var i in r) {
    //     for (var j in r[i].member) {
    //         r[i].member[j]['kval'] = parseFloat(r[i].member[j]['129']) - parseFloat(r[i].member[j]['19'])
    //     }
    // }
    // // console.log(r)

    // // r[3].member.sort(function (a, b) {
    // //     return b.kval - a.kval
    // // })
    // for (var i = 0; i <= 10; ++i)
    //     r[i].member.sort(function (a, b) {
    //         return b['11'] - a['11']
    //     })

    // for (var i = 0; i <= 2; ++i) {
    //     r[i].member.sort(function (a, b) {
    //         return a['12'] - b['12']
    //     })
    // }

    // var ice_max = -999999

    // console.log(r)

    // for (var i in r[0].member) {
    //     ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129])))
    // }
    var p_g = ice_rect.append('g')

    // ice_max = 1000;
    // var line_scale = d3.scale.linear()
    //     .domain([0, Math.log2(ice_max)])
    //     .range([0, height_ice / 4])
    // // console.log(r)

    // var colora = "#FFFFFF"
    // var colorb = color[0]

    // let colorx = d3.interpolate(colora, colorb);
    // var color_scale = d3.scale.linear()
    //     .domain([0.5, 0.667])
    //     .range([0, 1])

    // let colorx2 = d3.interpolate('red', '#00FF00');
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
            return (d.n - 1) * height_ice / 4 + height_ice / 8;
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
            if (d.n == 0) return height_ice / 8;
            else return height_ice / 4;
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
        console.log(r[i]);
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

    console.log(rk)

    p_g.selectAll('#rr__')
        .attr('id', 'rr__')
        .data(rk)
        .enter()
        .append('rect')
        .attr('y', d => {
            // if (d.n == 0) return 0;
            return 3 * height_ice / 4 + height_ice / 8;
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
            return height_ice / 8;
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


    // p_g.selectAll('#r_1')
    //     .attr('id', 'r_1').data(r)
    //     .enter()
    //     .append('rect')
    //     .attr('y', d => {
    //         if (d.n == 1) return (d.n - 1) * height_ice / 4
    //         return (d.n - 2) * height_ice / 4 + height_ice / 8;
    //         // return 100
    //     })
    //     .attr('x', d => {
    //         var cnt = 0;
    //         for (var i in r) {
    //             if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
    //         }
    //         if (d.n == 4) cnt += r[3].member.length
    //         return cnt * width_ice / 6080;
    //         // return 100
    //     })
    //     .attr('height', (d, i) => {
    //         if (i == 0)
    //             return height_ice / 8
    //         return height_ice / 4
    //     })
    //     .attr('width', d => {
    //         return d.member.length * width_ice / 6080;
    //         // return 100
    //     })
    //     .attr('fill', (d, i) => {
    //         // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
    //         return colorx(color_scale(d.gini))
    //         // else {
    //         // if (d.type == '高')
    //         //     return '#00FF00'
    //         // else if (d.type == '负')
    //         //     return 'red'
    //         // else
    //         //     return 'yellow'
    //         // }
    //     })
    //     .attr('opacity', (d, i) => {

    //         // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
    //         return 1;
    //         // else
    //         return 0.5
    //     })
    //     .attr('stroke', (d, i) => {
    //         // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
    //         return 'blue'
    //         // // else {
    //         //     if (d.type == '高')
    //         //         return '#00FF00'
    //         //     else if (d.type == '负')
    //         //         return 'red'
    //         //     else
    //         //         return 'yellow'
    //         // }

    //     })
    //     .attr('stroke-width', 1)
    //     .on('click', d => {
    //         // console.log(d)
    //         var name_sum = []
    //         var name_set = {}
    //         for (var i in d.member) {
    //             // console.log(d[i])
    //             if (name_set[d.member[i].code] != 1) {
    //                 name_sum.push(d.member[i].code)
    //                 name_set[d.member[i].code] = 1;
    //             }
    //         }
    //         // console.log(name_sum)
    //         OrRect(name_sum, 'blue')
    //     })

    // p_g.selectAll('#r_1')
    //     .attr('id', 'r_1')
    //     .data(rk)
    //     .enter()
    //     .append('rect')
    //     .attr('y', d => {
    //         if (d.n == 1) return (d.n - 1) * height_ice / 4
    //         return (d.n - 2) * height_ice / 4 + height_ice / 8;
    //         // return 100
    //     })
    //     .attr('x', d => {
    //         var cnt = 0;
    //         for (var i in r) {
    //             if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
    //         }
    //         if (d.n == 5 || d.kn == 5) cnt += r[3].member.length
    //         for (var i in rk) {
    //             if (rk[i].kn == d.kn && rk[i].knum < d.knum) cnt += rk[i].member.length
    //         }
    //         // if (d.n == 5 && d.knum > 2) cnt += r[8].member.length
    //         return cnt * width_ice / 6080;
    //         // return 100
    //     })
    //     .attr('height', (d, i) => {
    //         // if (i == 0)
    //         return height_ice / 8
    //         // return height_ice / 4
    //     })
    //     .attr('width', d => {
    //         return d.member.length * width_ice / 6080;
    //         // return 100
    //     })
    //     .attr('fill', (d, i) => {
    //         // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
    //         return d.color
    //         // else {
    //         // if (d.type == '高')
    //         //     return '#00FF00'
    //         // else if (d.type == '负')
    //         //     return 'red'
    //         // else
    //         //     return 'yellow'
    //         // }
    //     })
    //     .attr('opacity', (d, i) => {

    //         // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
    //         // return 1;
    //         // else
    //         return 0.5
    //     })
    //     .attr('stroke', (d, i) => {
    //         // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
    //         return d.color
    //         // // else {
    //         //     if (d.type == '高')
    //         //         return '#00FF00'
    //         //     else if (d.type == '负')
    //         //         return 'red'
    //         //     else
    //         //         return 'yellow'
    //         // }

    //     })
    //     .attr('stroke-width', 1)
    //     .on('click', d => {
    //         // console.log(d)
    //         var name_sum = []
    //         var name_set = {}
    //         for (var i in d.member) {
    //             // console.log(d[i])
    //             if (name_set[d.member[i].code] != 1) {
    //                 name_sum.push(d.member[i].code)
    //                 name_set[d.member[i].code] = 1;
    //             }
    //         }
    //         // console.log(name_sum)
    //         OrRect(name_sum, 'blue')
    //     })
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
            return (d.n - 1) * height_ice / 4 + height_ice / 8;
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
        // .attr('dy', '1em')
        .text(d => {
            if (d.n != 3)
            return d.type
        })

    // for (var k = 0; k < 11; ++k) {
    //     // if (k != 0)
    //     p_g.selectAll('#linein')
    //         .attr('id', 'linein')
    //         .data(r[k].member)
    //         .enter()
    //         .append('line')
    //         .attr('x1', (d, i) => {
    //             var cnt = 0;
    //             for (var j in r) {
    //                 if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
    //             }
    //             if (r[k].n == 4) cnt += r[3].member.length
    //             // console.log(i / 10 + cnt / 10 + r[k].num * 1)
    //             return i / 10 + cnt / 10 + r[k].num * 1;
    //         })
    //         .attr('y1', d => {
    //             if (k == 0)
    //                 return height_ice / 8
    //             return r[k].n * height_ice / 4 - height_ice / 8
    //         })
    //         .attr('x2', (d, i) => {
    //             // return i / 10;
    //             var cnt = 0;
    //             for (var j in r) {
    //                 if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
    //             }
    //             if (r[k].n == 4) cnt += r[3].member.length
    //             return i / 10 + cnt / 10 + r[k].num * 1;
    //         })
    //         .attr('y2', d => {
    //             if (Math.log2(Math.abs(parseFloat(d[129]))) <= 0)
    //                 return r[k].n * height_ice / 4 - height_ice / 8
    //             if (k == 0)
    //                 return height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2
    //             return r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.log2(Math.abs(parseFloat(d[129])))) / 2
    //         })
    //         .attr('fill', 'none')
    //         .attr('stroke', d => {
    //             if (parseFloat(d[129]) > 0)
    //                 return '#00FF00';
    //             else
    //                 return 'red'
    //         })
    //         .attr('stroke-width', 0.1)
    // }
    // console.log(r)


    // var tree_legend = [{
    //     name: '富裕',
    //     color: '#00FF00'
    // }, {
    //     name: '中产',
    //     color: 'yellow'
    // }, {
    //     name: '贫穷',
    //     color: 'red'
    // }]

    // p_g.selectAll('#legend_cir')
    //     .attr('id', 'legend_cir')
    //     .data(tree_legend)
    //     .enter()
    //     .append('circle')
    //     .attr('cx', (d, i) => {
    //         return 550
    //     })
    //     .attr('cy', (d, i) => {
    //         return i * 20 + 255
    //     })
    //     .attr('r', 5)
    //     .attr('fill', d => {
    //         return d.color
    //     })
    //     .attr('opacity', 0.5)

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