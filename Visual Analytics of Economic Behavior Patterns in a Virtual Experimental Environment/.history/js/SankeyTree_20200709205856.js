var widtha = 384;
var heighta = 460;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0

var DecisionRectStep = 50;
var DecisionRectBei = 0.03;
var DecisionBe = 87;
// var TitleName = ['工作', '', '', '', '', '', '', '', '', '']

var TitleName = ['工作', '健康投资', '财产保险', '借贷机会', '投资', '风险投资', '负面冲击', '买彩票', '生病', '失业']

function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", 1600)

    ksvg = d3.select("#select").append("svg")
        .attr('id', 'SView2')
        .attr("width", widtha)
        .attr("height", 140)
}

var pr = [];

var coort = [];

var tcircle = 0;
var flag = -1;
var heatmapInstance = 0;

var DecisionList = new Array();

PP()

let RectLine = ksvg.append('g');
let DecisionRect = ssvg.append('g');
let DecisionLine = ssvg.append('g');

var cir___ = new Array();

// function SelectDecision(num) {
//     let KRect = RectLine.append('g')
//         // .select('#krect')
//         // .attr('id', 'krect')
//         .append('circle')
//         .attr('cx', 17.5 + num * 38)
//         .attr('cy', 55)
//         .attr('r', 5)
//         .attr('fill', 'blue')
//         .on('click', function () {
//             KRect.remove();
//             let temp = new Array();
//             for (let i in DecisionList) {
//                 if (DecisionList[i] != num) {
//                     temp.push(DecisionList[i]);
//                 }
//             }
//             DecisionList = temp;

//             // PaintDecisionLine(DecisionList, name_in);
//             // PaintDecisionRect(DecisionList, name_in);
//         })

//     cir___.push(KRect);
//     console.log(name_in)

//     DecisionList.push(num);
//     DecisionList.sort(function (a, b) {
//         return a - b;
//     })
//     PaintDecisionLine(DecisionList, name_in);
//     PaintDecisionRect(DecisionList, name_in);
// }

// function PaintUnderRect() {
//     d3.csv("data/box_calc.csv", function (RectInData) {
//         // console.log(RectInData);

//         colorLine = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B']
//         let RectInnerData = []
//         for (var i in RectInData) {
//             // if (parseInt(RectInData[i].biao) == num) {
//             RectInnerData.push(RectInData[i])
//             // }
//         }
//         var sort_ten = [] // 第十列排序
//         var sort_one = []
//         var sort_ten_inner = {}
//         var sort_one_inner = {}
//         var code_Num = {} // 记录编号排布
//         // console.log(RectInnerData)
//         for (var i in RectInnerData) {
//             // sort_ten.push(parseFloat(RectInnerData[i][119]))
//             sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
//             // code_Num[RectInnerData[i].code] = i
//         }
//         // sort_ten.sort(function (a, b) {
//         //     return a - b;
//         // })
//         sort_one.sort(function (a, b) {
//             return a - b;
//         })
//         for (var i in sort_one) {
//             // sort_ten_inner[sort_ten[i]] = i;
//             sort_one_inner[sort_one[i]] = i;
//         }
//         for (var i in RectInnerData) {
//             // if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 100)
//             //     RectInnerData[i][11] = 0;
//             // else if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 200)
//             //     RectInnerData[i][11] = 1;
//             // else
//             //     RectInnerData[i][11] = 2

//             if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
//                 RectInnerData[i][1] = 0;
//             else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
//                 RectInnerData[i][1] = 1;
//             else
//                 RectInnerData[i][1] = 2;
//         }
//         // for (var i in RectInnerData) {
//         //     for (var j = 1; j <= 10; ++j) {
//         //         RectInnerData[i][j * 10 + 7] = title_tip_symbol[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
//         //         RectInnerData[i][j * 10 + 8] = title_tip[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
//         //     }
//         // }
//         // console.log(RectInnerData)
//         let RectOuterData = []
//         for (let i = 1; i <= 10; ++i) {
//             RectOuterData[i] = [];
//             for (let j = 0; j <= 3; ++j) {
//                 RectOuterData[i].push({
//                     'val': 0,
//                     'member': []
//                 })
//             }
//         }
//         // RectOuterData[1][0] = {
//         //     'val': 0,
//         //     'member': []
//         // }
//         // RectOuterData[1][1] = {
//         //     'val': 0,
//         //     'member': []
//         // }
//         // RectOuterData[1][2] = {
//         //     'val': 0,
//         //     'member': []
//         // }
//         for (let num = 1; num <= 10; ++num) {
//             for (var i in RectInnerData) {
//                 RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
//                 RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
//             }
//         }
//         // for (var i in RectOuterData[1]) {
//         //     RectOuterData[1][i].val /= RectOuterData[1][i]["member"].length
//         // }
//         // console.log(RectOuterData)
//         var Sankey_Rect = []
//         for (var i in RectOuterData) {
//             var s_num = 0;
//             // console.log(i);
//             for (var j in RectOuterData[i]) {
//                 // console.log( RectOuterData[i][j].member[0])
//                 if (RectOuterData[i][j].member.length == 0)
//                     continue;
//                 a = {}
//                 a["x"] = i - 1
//                 a["n"] = j
//                 a["start"] = s_num
//                 s_num += RectOuterData[i][j].member.length
//                 // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
//                 // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
//                 a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
//                 a["end"] = s_num;
//                 Sankey_Rect.push(a)
//             }
//         }
//         // console.log(Sankey_Rect)
//         RectLine.selectAll(".rectLine")
//             .attr("class", "rectLine")
//             .data(Sankey_Rect)
//             .enter()
//             .append("rect")
//             .attr("x", (d, i) => {
//                 // if (d.x > 4)
//                 // return 15 + (d.x - 5)
//                 return 15 + d.x % 5 * 76;
//             })
//             .attr("y", d => {
//                 // console.log(d);
//                 var tt = 0;
//                 if (d.x > 4)
//                 return d.start * 0.007 + 82;
//                 // // if (d.x == 0) tt = 3 * steplen / 2;
//                 // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
//                 return d.start * 0.007 + 20;
//             })
//             // .attr("rx", 5)
//             .attr("width", 25)
//             .attr("height", d => {
//                 return (d.end - d.start) * 0.007;
//             })
//             // .attr("stroke", d => {
//             //     return "black"
//             // })
//             // .attr("stroke-width", 0.5)
//             .attr("fill", d => {
//                 // if (d.x != 11)
//                 // return color[d.n];
//                 // console.log(d.n)
//                 // var colora = "#FFFFFF"
//                 // var colorb = "blue"

//                 // let colorx = d3.interpolate(colora, colorb);
//                 // var color_scale = d3.scale.linear()
//                 //     .domain([-2, 8])
//                 //     .range([0, 1])
//                 // if (d.x != 11)
//                 //     return colorx(color_scale(parseInt(d.weight * 2)))
//                 // console.log(d.weight);
//                 return colorLine[3 - (parseInt(d.weight))]
//             })
//         // .attr('rx', 2)
//         // .attr('ry', 2)
//         var LineCir = new Array();
//         for (var i = 1; i <= 10; ++i) {
//             LineCir.push(i);
//         }
//             // RectLine.selectAll('#LineCir')
//             //     .attr('id', 'LineCir')
//             //     .data(LineCir)
//             //     .enter()
//             //     .append('circle')
//             //     .attr('cx', (d, i) => {
//             //         return 17.5 + i * 38;
//             //     })
//             //     .attr('cy', 55)
//             //     .attr('r', 5)
//             //     .attr('fill', 'white')
//             //     .attr("stroke", 'blue')
//             //     .on('click', (d, i) => {
//             //         SelectDecision(i);
//             //     })
//         // .attr('r', 2)

//         // RectLine.append('line')
//         //     .attr('x1', 0)
//         //     .attr('y1', 65)
//         //     .attr('x2', 376)
//         //     .attr('y2', 65)
//         //     .attr('fill', 'none')
//         //     .attr('stroke', 'blue')
//         //     .attr('stroke-dasharray', 5.5)

//         RectLine.selectAll('#textLine')
//             .attr('id', 'textLine')
//             .data(TitleName)
//             .enter().append('text')
//             .attr('x', (d, i) => {
//                 return 27 + i % 5 * 76;
//             })
//             .attr('y', (d, i) => {
//                 if (i > 4)
//                 return 76;
//                 else
//                 return 13;
//             })
//             .attr('font-size', 12)
//             // .attr('font-weight', 'bold')
//             .attr('text-anchor', 'middle')
//             .attr("font-family", "courier")
//             .text(d => {
//                 return d;
//             })
//     })
// }

// PaintUnderRect();

// function PaintDecisionRect(Decision, people) {
//     if (DecisionRect != -1) {
//         DecisionRect.remove();
//         DecisionRect = ssvg.append('g');
//     }
//     d3.csv("data/box_calc.csv", function (RectInData) {
//         // console.log(RectInData);

//         colorLine = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B']
//         let RectInnerData = []
//         // if (people == -1 || people.length == 0) {
//         for (var i in RectInData) {
//             // if (parseInt(RectInData[i].biao) == num) {
//             RectInnerData.push(RectInData[i])
//             // }
//         }
//         // } else {
//         //     var NameMark = {};
//         //     for (var i in people) {
//         //         NameMark[people[i]] = 1;
//         //     }
//         //     for (var i in RectInData) {
//         //         if (NameMark[RectInData[i].code]) {
//         //             RectInnerData.push(RectInData[i])

//         //         }
//         //     }
//         // }
//         var sort_ten = [] // 第十列排序
//         var sort_one = []
//         var sort_ten_inner = {}
//         var sort_one_inner = {}
//         var code_Num = {} // 记录编号排布
//         for (var i in RectInnerData) {
//             sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
//         }
//         sort_one.sort(function (a, b) {
//             return a - b;
//         })
//         for (var i in sort_one) {
//             // sort_ten_inner[sort_ten[i]] = i;
//             sort_one_inner[sort_one[i]] = i;
//         }
//         for (var i in RectInnerData) {
//             if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
//                 RectInnerData[i][1] = 0;
//             else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
//                 RectInnerData[i][1] = 1;
//             else
//                 RectInnerData[i][1] = 2;
//         }
//         let RectOuterData = []
//         for (let i = 1; i <= 10; ++i) {
//             RectOuterData[i] = [];
//             for (let j = 0; j <= 3; ++j) {
//                 RectOuterData[i].push({
//                     'val': 0,
//                     'member': []
//                 })
//             }
//         }
//         var NameMark = new Object();
//         if (people == -1 || people.length == 0);
//         else {
//             for (var i in people) {
//                 NameMark[people[i]] = 1;
//             }
//         }
//         if (people == -1 || people.length == 0) {
//             for (let num = 1; num <= 10; ++num) {
//                 for (var i in RectInnerData) {
//                     RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
//                     RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
//                 }
//             }
//         } else {
//             for (let num = 1; num <= 10; ++num) {
//                 for (var i in RectInnerData) {
//                     if (NameMark[RectInnerData[i].code] == 1) {
//                         RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
//                         RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
//                     }
//                 }
//             }
//         }
//         var Sankey_Rect = []
//         for (var i in RectOuterData) {
//             var s_num = 0;
//             var s_cnt = 0;
//             var s_sum = 0;
//             for (var j in RectOuterData[i]) {
//                 if (RectOuterData[i][j].member.length == 0) continue;
//                 s_sum += RectOuterData[i][j].member.length;
//                 s_cnt++;
//             }
//             // console.log(i);
//             for (var j in RectOuterData[i]) {
//                 // console.log( RectOuterData[i][j].member[0])
//                 if (RectOuterData[i][j].member.length == 0)
//                     continue;
//                 a = {}
//                 a["x"] = i - 1
//                 a["n"] = j
//                 a['num'] = s_cnt;
//                 a['s_sum'] = s_sum;
//                 a["start"] = s_num
//                 s_num += RectOuterData[i][j].member.length
//                 // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
//                 // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
//                 a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
//                 a["end"] = s_num;
//                 Sankey_Rect.push(a)
//             }
//         }
//         console.log(Sankey_Rect)
//         // console.log(15 + 18 * 6080 * DecisionRectBei / 20 + lencnt * DecisionRectStep * 3 / 2)
//         if (Decision == -1 || Decision.length == 0) {
//             DecisionRect.selectAll(".rectLine")
//                 .attr("class", "rectLine")
//                 .data(Sankey_Rect)
//                 .enter()
//                 .append("rect")
//                 .attr("x", (d, i) => {
//                     let tt = 0;
//                     if (d.num == 4) tt = DecisionRectStep;
//                     else if (d.num == 3) tt = DecisionRectStep * 3 / 2;
//                     else tt = DecisionRectStep * 3;
//                     let lencnt = 0;
//                     if (d.n < d.num)
//                         lencnt = d.n;
//                     else lencnt = d.n - (d.n - d.num + 1);
//                     if (d.num == 1) {
//                         lencnt = 1;
//                         tt = 3 * DecisionRectStep / 2;
//                     }
//                     let startx = 0;
//                     // if (d.n < d.num) startx = d.start;
//                     // else {
//                     //     for (let j in Sankey_Rect) {
//                     //         if ((Sankey_Rect[j].x) == d.x && Sankey_Rect[j].n < lencnt)
//                     //             startx = Sankey_Rect[j].start;
//                     //     }
//                     // }
//                     // return 15 + d.start * 6080 * DecisionRectBei / d.s_sum + lencnt * tt;
//                     return 15 + d.start * 6080 * DecisionRectBei / d.s_sum + lencnt * tt;
//                 })
//                 .attr("y", d => {
//                     // console.log(d);
//                     var tt = 0;
//                     // // if (d.x == 0) tt = 3 * steplen / 2;
//                     // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
//                     return 10 + d.x * DecisionBe;
//                 })
//                 // .attr("rx", 5)
//                 .attr("width", d => {
//                     let len = 304;
//                     if (people.length > 0) len = people.length;
//                     return ((d.end - d.start) * 304 / len) * DecisionRectBei;
//                 })
//                 .attr("height", 10)
//                 .attr("fill", d => {
//                     return colorLine[3 - (parseInt(d.weight))]
//                 })
//                 .attr('rx', 2)
//                 .attr('stroke', 'black')
//                 .attr('stroke-width', 0.1)
//         } else if (Decision.length == 1) {
//             // console.log(Decision)
//             DecisionRect.selectAll(".rectLine")
//                 .attr("class", "rectLine")
//                 .data(Sankey_Rect)
//                 .enter()
//                 .append("rect")
//                 .attr("x", (d, i) => {
//                     if (d.x == Decision[0]) {
//                         let tt = 0;
//                         if (d.num == 4) tt = DecisionRectStep;
//                         else if (d.num == 3) tt = DecisionRectStep * 3 / 2;
//                         else tt = DecisionRectStep * 3;
//                         // return 15 + d.start * 6080 * DecisionRectBei / d.s_sum + d.n * tt;
//                         let lencnt = 0;
//                         if (d.n < d.num)
//                             lencnt = d.n;
//                         else lencnt = d.n - (d.n - d.num + 1);
//                         if (d.num == 1) {
//                             lencnt = 1;
//                             tt = 3 * DecisionRectStep / 2;
//                         }
//                         return 15 + d.start * 6080 * DecisionRectBei / d.s_sum + lencnt * tt;
//                     }
//                 })
//                 .attr("y", (d, i) => {
//                     // console.log(d);
//                     var tt = 0;
//                     // // if (d.x == 0) tt = 3 * steplen / 2;
//                     // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
//                     if (d.x == Decision[0])
//                         return 10;
//                 })
//                 // .attr("rx", 5)
//                 .attr("width", d => {
//                     let len = 304;
//                     if (people.length > 0) len = people.length;
//                     if (d.x == Decision[0])
//                         return ((d.end - d.start) * 304 / len) * DecisionRectBei;
//                 })
//                 .attr("height", 10)
//                 .attr("fill", d => {
//                     return colorLine[3 - (parseInt(d.weight))]
//                 })
//                 .attr('rx', 2)
//                 .attr('stroke', 'black')
//                 .attr('stroke-width', 0.1)
//         } else {
//             var NewSankeyRect = new Array();
//             console.log(Decision)
//             let cnt = 0;
//             DecisionRect.selectAll(".rectLine")
//                 .attr("class", "rectLine")
//                 .data(Sankey_Rect)
//                 .enter()
//                 .append("rect")
//                 .attr("x", (d, i) => {
//                     for (var k in Decision)
//                         if (d.x == Decision[k]) {
//                             console.log(cnt);
//                             let tt = 0;
//                             if (d.num == 4) tt = DecisionRectStep;
//                             else if (d.num == 3) tt = DecisionRectStep * 3 / 2;
//                             else tt = DecisionRectStep * 3;
//                             // return 15 + d.start * 6080 * DecisionRectBei / d.s_sum + d.n * tt;
//                             let lencnt = 0;
//                             if (d.n < d.num)
//                                 lencnt = d.n;
//                             else lencnt = d.n - (d.n - d.num + 1);
//                             if (d.num == 1) {
//                                 lencnt = 1;
//                                 tt = 3 * DecisionRectStep / 2;
//                             }
//                             return 15 + d.start * 6080 * DecisionRectBei / d.s_sum + lencnt * tt;
//                         }
//                 })
//                 .attr("y", d => {
//                     // console.log(d);
//                     var tt = 0;
//                     // // if (d.x == 0) tt = 3 * steplen / 2;
//                     // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
//                     for (var k in Decision)
//                         if (d.x == Decision[k])
//                             // return 10 + k * DecisionBe * 9 / (Decision.length - 1);
//                             return 10 + k * DecisionBe;
//                 })
//                 // .attr("rx", 5)
//                 .attr("width", d => {
//                     for (var k in Decision) {
//                         let len = 304;
//                         if (people.length > 0) len = people.length;
//                         if (d.x == Decision[k])
//                             return ((d.end - d.start) * 304 / len) * DecisionRectBei;
//                     }

//                 })
//                 .attr("height", 10)
//                 .attr("fill", d => {
//                     return colorLine[3 - (parseInt(d.weight))]
//                 })
//                 .attr('rx', 2)
//                 .attr('stroke', 'black')
//                 .attr('stroke-width', 0.1)
//         }
//     })
// }

// function link(d) {
//     var curvature = .5;
//     var x0 = d.source.x,
//         x1 = d.target.x,
//         xi = d3.interpolateNumber(x0, x1),
//         x2 = xi(curvature),
//         x3 = xi(1 - curvature),
//         y0 = d.source.y,
//         y1 = d.target.y;
//     return "M" + y0 + "," + x0 +
//         "C" + y0 + "," + x2 +
//         " " + y1 + "," + x3 +
//         " " + y1 + "," + x1;
// }

// var LinePaintDecision = function (dia, pValue) {
//     var diagonal = d3.svg.diagonal()
//         .projection(d => {
//             return [d.x, d.y]
//         });

//     var CntNum = 0;
//     for (let i in pValue) {
//         CntNum += parseInt(pValue[i]);
//     }
//     if (DecisionList.length > 0)
//         CntNum /= (DecisionList.length - 1);
//     else CntNum /= 9;
//     // console.log((pValue));

//     LineNameg = DecisionLine.selectAll('#dia_g')
//         .attr('id', 'dia_g')
//         .data(dia)
//         .enter()
//         .append('g')
//         .append('path')
//         .attr('d', d => {
//             // console.log(d)
//             return diagonal(d)
//         })
//         .attr('fill', 'none')
//         // .attr('stroke', '#E5E5E5')
//         .attr('stroke', 'black')
//         .attr('stroke-width', (d, i) => {
//             // return pValue[i] * 0.01;
//             return pValue[i] * 6080 / CntNum * DecisionRectBei;
//         })
//         .attr('stroke-opacity', 0.1)
// }

// function PaintDecisionLine(Decision, people) {
//     if (DecisionLine != -1) {
//         DecisionLine.remove();
//         DecisionLine = ssvg.append('g');
//     }
//     d3.csv("data/box_calc.csv", function (RectInData) {
//         // console.log(RectInData);

//         colorLine = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B']
//         // let RectInnerData = []
//         // for (var i in RectInData) {
//         //     // if (parseInt(RectInData[i].biao) == num) {
//         //     RectInnerData.push(RectInData[i])
//         //     // }
//         // }
//         // var sort_ten = [] // 第十列排序
//         // var sort_one = []
//         // var sort_ten_inner = {}
//         // var sort_one_inner = {}
//         // var code_Num = {} // 记录编号排布
//         // for (var i in RectInnerData) {
//         //     sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
//         // }
//         // sort_one.sort(function (a, b) {
//         //     return a - b;
//         // })
//         // for (var i in sort_one) {
//         //     // sort_ten_inner[sort_ten[i]] = i;
//         //     sort_one_inner[sort_one[i]] = i;
//         // }
//         // for (var i in RectInnerData) {
//         //     if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
//         //         RectInnerData[i][1] = 0;
//         //     else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
//         //         RectInnerData[i][1] = 1;
//         //     else
//         //         RectInnerData[i][1] = 2;
//         // }
//         // let RectOuterData = []
//         // for (let i = 1; i <= 10; ++i) {
//         //     RectOuterData[i] = [];
//         //     for (let j = 0; j <= 3; ++j) {
//         //         RectOuterData[i].push({
//         //             'val': 0,
//         //             'member': []
//         //         })
//         //     }
//         // }
//         // for (let num = 1; num <= 10; ++num) {
//         //     for (var i in RectInnerData) {
//         //         RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
//         //         RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
//         //     }
//         // }
//         // var Sankey_Rect = []
//         // for (var i in RectOuterData) {
//         //     var s_num = 0;
//         //     // console.log(i);
//         //     for (var j in RectOuterData[i]) {
//         //         // console.log( RectOuterData[i][j].member[0])
//         //         if (RectOuterData[i][j].member.length == 0)
//         //             continue;
//         //         a = {}
//         //         a["x"] = i - 1
//         //         a["n"] = j
//         //         a["start"] = s_num
//         //         s_num += RectOuterData[i][j].member.length
//         //         // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
//         //         // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
//         //         a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
//         //         a["end"] = s_num;
//         //         Sankey_Rect.push(a)
//         //     }
//         // }
//         // // console.log(RectInData)
//         var RectInnerData = new Array();

//         for (var i in RectInData) {
//             // if (parseInt(RectInData[i].biao) == num) {
//             RectInnerData.push(RectInData[i])
//             // }
//         }
//         // } else {
//         //     var NameMark = {};
//         //     for (var i in people) {
//         //         NameMark[people[i]] = 1;
//         //     }
//         //     for (var i in RectInData) {
//         //         if (NameMark[RectInData[i].code]) {
//         //             RectInnerData.push(RectInData[i])

//         //         }
//         //     }
//         // }
//         var sort_ten = [] // 第十列排序
//         var sort_one = []
//         var sort_ten_inner = {}
//         var sort_one_inner = {}
//         var code_Num = {} // 记录编号排布
//         for (var i in RectInnerData) {
//             sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
//         }
//         sort_one.sort(function (a, b) {
//             return a - b;
//         })
//         for (var i in sort_one) {
//             // sort_ten_inner[sort_ten[i]] = i;
//             sort_one_inner[sort_one[i]] = i;
//         }
//         for (var i in RectInnerData) {
//             if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
//                 RectInnerData[i][1] = 0;
//             else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
//                 RectInnerData[i][1] = 1;
//             else
//                 RectInnerData[i][1] = 2;
//         }
//         let RectOuterData = []
//         for (let i = 1; i <= 10; ++i) {
//             RectOuterData[i] = [];
//             for (let j = 0; j <= 3; ++j) {
//                 RectOuterData[i].push({
//                     'val': 0,
//                     'member': []
//                 })
//             }
//         }
//         var NameMark = new Object();
//         if (!(people == -1 || people.length == 0)) {
//             for (var i in people) {
//                 NameMark[people[i]] = 1;
//             }
//         }
//         if (people == -1 || people.length == 0) {
//             for (let num = 1; num <= 10; ++num) {
//                 for (var i in RectInnerData) {
//                     RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
//                     RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
//                 }
//             }
//         } else {
//             for (let num = 1; num <= 10; ++num) {
//                 for (var i in RectInnerData) {
//                     if (NameMark[RectInnerData[i].code] == 1) {
//                         RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
//                         RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
//                     }
//                 }
//             }
//         }
//         var Sankey_Rect = []
//         for (var i in RectOuterData) {
//             var s_num = 0;
//             var s_cnt = 0;
//             var s_sum = 0;
//             for (var j in RectOuterData[i]) {
//                 if (RectOuterData[i][j].member.length == 0) continue;
//                 s_sum += RectOuterData[i][j].member.length;
//                 s_cnt++;
//             }
//             // console.log(i);
//             for (var j in RectOuterData[i]) {
//                 // console.log( RectOuterData[i][j].member[0])
//                 if (RectOuterData[i][j].member.length == 0)
//                     continue;
//                 a = {}
//                 a["x"] = i - 1
//                 a["n"] = j
//                 a['num'] = s_cnt;
//                 a['s_sum'] = s_sum;
//                 a["start"] = s_num
//                 s_num += RectOuterData[i][j].member.length
//                 // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
//                 // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
//                 a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
//                 a["end"] = s_num;
//                 Sankey_Rect.push(a)
//             }
//         }

//         let ModLen = 6080;
//         if (people.length > 0)
//             ModLen = people.length * 20;

//         var p = {}; // 计算连接线

//         if (Decision == -1 || Decision.length == 0) {
//             for (let i in RectInnerData) {
//                 // console.log(RectInnerData[i])
//                 if (people == -1 || people.length == 0) {
//                     for (let j = 1; j < 10; ++j) {
//                         if (typeof (p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()]) == 'undefined')
//                             p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()] = 1;
//                         else
//                             p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()]++;
//                     }
//                 } else {
//                     if (NameMark[RectInnerData[i].code] == 1) {
//                         for (let j = 1; j < 10; ++j) {
//                             if (typeof (p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()]) == 'undefined')
//                                 p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()] = 1;
//                             else
//                                 p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()]++;
//                         }
//                     }
//                 }
//             }
//             let dia_path = new Array();
//             // console.log(p)
//             let RectX = new Object();
//             for (let i in Sankey_Rect) {
//                 // console.log(Sankey_Rect[i])
//                 RectX[Sankey_Rect[i].x.toString() + Sankey_Rect[i].n.toString()] = Sankey_Rect[i];
//             }
//             // console.table(Sankey_Rect)
//             // console.log(RectX);
//             console.log(p)
//             let pValue = new Array();
//             for (var i in p) {
//                 // console.log(i);
//                 pValue.push(p[i]);
//                 let tt = 0;
//                 if (RectX[i[0] + i[1]].num == 4) tt = DecisionRectStep;
//                 else if (RectX[i[0] + i[1]].num == 3) tt = DecisionRectStep * 3 / 2;
//                 else if (RectX[i[0] + i[1]].num == 1) tt = DecisionRectStep * 3 / 2;
//                 else tt = DecisionRectStep * 3;
//                 // return 15 + d.start * DecisionRectBei + d.n * tt;
//                 let ttt = 0;
//                 // if (RectX[i[2] + i[3]].num == "undefined")
//                 // console.log(RectX[i[2] + i[3]])
//                 if (RectX[i[2] + i[3]].num == 4) ttt = DecisionRectStep;
//                 else if (RectX[i[2] + i[3]].num == 3) ttt = DecisionRectStep * 3 / 2;
//                 else if (RectX[i[2] + i[3]].num == 1) ttt = DecisionRectStep * 3 / 2;
//                 else ttt = DecisionRectStep * 3;
//                 // return 15 + d.start * DecisionRectBei + d.n * tt;
//                 let dp = 0;
//                 for (let j = 0; j < parseInt(i[3]); ++j) {
//                     if (typeof (p[i[0] + i[1] + i[2] + j.toString()]) != "undefined")
//                         dp += p[i[0] + i[1] + i[2] + j.toString()];
//                 }
//                 let dpp = 0;
//                 for (let j = 0; j < parseInt(i[1]); ++j) {
//                     if (typeof (p[i[0] + j.toString() + i[2] + i[3]]) != "undefined")
//                         dpp += p[i[0] + j.toString() + i[2] + i[3]];
//                 }

//                 let lencnt1 = 0;
//                 if (RectX[i[0] + i[1]].n < RectX[i[0] + i[1]].num)
//                     lencnt1 = RectX[i[0] + i[1]].n;
//                 else lencnt1 = RectX[i[0] + i[1]].n - (RectX[i[0] + i[1]].n - RectX[i[0] + i[1]].num + 1);
//                 if (RectX[i[0] + i[1]].num == 1) {
//                     lencnt1 = 1;
//                     // tt = 3 * DecisionRectStep / 2;
//                 }

//                 let lencnt2 = 0;
//                 if (RectX[i[2] + i[3]].n < RectX[i[2] + i[3]].num)
//                     lencnt2 = RectX[i[2] + i[3]].n;
//                 else lencnt2 = RectX[i[2] + i[3]].n - (RectX[i[2] + i[3]].n - RectX[i[2] + i[3]].num + 1);
//                 if (RectX[i[2] + i[3]].num == 1) {
//                     lencnt2 = 1;
//                     // tt = 3 * DecisionRectStep / 2;
//                 }

//                 b = {
//                     source: {
//                         // x: 15 + RectX[i[0] + i[1]].start * 6080 * DecisionRectBei / RectX[i[0] + i[1]].s_sum + RectX[i[0] + i[1]].n * tt + (dp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         x: 15 + RectX[i[0] + i[1]].start * 6080 * DecisionRectBei / RectX[i[0] + i[1]].s_sum + lencnt1 * tt + (dp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         y: 10 + RectX[i[0] + i[1]].x * DecisionBe + 10
//                     },
//                     target: {
//                         // x: 15 + RectX[i[2] + i[3]].start * 6080 * DecisionRectBei / RectX[i[2] + i[3]].s_sum + RectX[i[2] + i[3]].n * ttt + (dpp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         x: 15 + RectX[i[2] + i[3]].start * 6080 * DecisionRectBei / RectX[i[2] + i[3]].s_sum + lencnt2 * ttt + (dpp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         y: 10 + RectX[i[2] + i[3]].x * DecisionBe
//                     }
//                 }
//                 // if (isNaN(b.target.x))
//                 // {
//                 //     if (typeof (p[i[0] + i[1] + i[2] + j.toString()]) != "undefined")
//                 // }
//                 dia_path.push(b);
//             }
//             // console.table(dia_path)
//             LinePaintDecision(dia_path, pValue);
//         } else if (Decision.length > 1) {
//             let CCPP = new Object();
//             for (let j = 0; j < Decision.length; ++j) {
//                 CCPP[Decision[j]] = j;
//             }
//             console.log(CCPP);
//             for (let i in RectInnerData) {
//                 // console.log(RectInnerData[i])
//                 if (people == -1 || people.length == 0) {
//                     for (let j = 0; j < Decision.length - 1; ++j) {
//                         if (typeof (p[(Decision[j]).toString() + RectInnerData[i][Decision[j] + 1].toString() + (Decision[j + 1]).toString() + RectInnerData[i][(Decision[j + 1] + 1)].toString()]) == 'undefined')
//                             p[(Decision[j]).toString() + RectInnerData[i][Decision[j] + 1].toString() + (Decision[j + 1]).toString() + RectInnerData[i][(Decision[j + 1]) + 1].toString()] = 1;
//                         else
//                             p[(Decision[j]).toString() + RectInnerData[i][Decision[j] + 1].toString() + (Decision[j + 1]).toString() + RectInnerData[i][(Decision[j + 1]) + 1].toString()]++;
//                     }
//                 } else {
//                     if (NameMark[RectInnerData[i].code] == 1) {
//                         for (let j = 0; j < Decision.length - 1; ++j) {
//                             if (typeof (p[(Decision[j]).toString() + RectInnerData[i][Decision[j] + 1].toString() + (Decision[j + 1]).toString() + RectInnerData[i][(Decision[j + 1] + 1)].toString()]) == 'undefined')
//                                 p[(Decision[j]).toString() + RectInnerData[i][Decision[j] + 1].toString() + (Decision[j + 1]).toString() + RectInnerData[i][(Decision[j + 1]) + 1].toString()] = 1;
//                             else
//                                 p[(Decision[j]).toString() + RectInnerData[i][Decision[j] + 1].toString() + (Decision[j + 1]).toString() + RectInnerData[i][(Decision[j + 1]) + 1].toString()]++;
//                         }
//                     }
//                 }
//             }
//             let dia_path = new Array();
//             // console.log(p)
//             let RectX = new Object();
//             // console.log(Sankey_Rect)
//             console.log(Sankey_Rect)
//             for (let i in Sankey_Rect) {
//                 // console.log(Sankey_Rect[i])
//                 RectX[Sankey_Rect[i].x.toString() + Sankey_Rect[i].n.toString()] = Sankey_Rect[i];
//             }
//             console.table(RectX)
//             // console.log(RectX);
//             let pValue = new Array();
//             console.table(p)
//             for (var i in p) {
//                 // console.log(i[0]);
//                 pValue.push(p[i]);
//                 let tt = 0;
//                 if (RectX[i[0] + i[1]].num == 4) tt = DecisionRectStep;
//                 else if (RectX[i[0] + i[1]].num == 3) tt = DecisionRectStep * 3 / 2;
//                 else if (RectX[i[0] + i[1]].num == 1) tt = DecisionRectStep * 3 / 2;
//                 else tt = DecisionRectStep * 3;
//                 // return 15 + d.start * DecisionRectBei + d.n * tt;
//                 let ttt = 0;
//                 // if (RectX[i[2] + i[3]].num == "undefined")
//                 // console.log(RectX[i[2] + i[3]])
//                 if (RectX[i[2] + i[3]].num == 4) ttt = DecisionRectStep;
//                 else if (RectX[i[2] + i[3]].num == 3) ttt = DecisionRectStep * 3 / 2;
//                 else if (RectX[i[2] + i[3]].num == 1) ttt = DecisionRectStep * 3 / 2;
//                 else ttt = DecisionRectStep * 3;
//                 // return 15 + d.start * DecisionRectBei + d.n * tt;
//                 // let dp = 0;
//                 // for (let j = 0; j < parseInt(i[3]); ++j) {
//                 //     dp += p[i[0] + i[1] + i[2] + j.toString()];
//                 // }
//                 // let dpp = 0;
//                 // for (let j = 0; j < parseInt(i[1]); ++j) {
//                 //     dpp += p[i[0] + j.toString() + i[2] + i[3]];
//                 // }

//                 // b = {
//                 //     source: {
//                 //         x: 15 + RectX[i[0] + i[1]].start * 6080 * DecisionRectBei / RectX[i[0] + i[1]].s_sum + RectX[i[0] + i[1]].n * tt + (dp + p[i] / 2) * DecisionRectBei,
//                 //         y: 10 + RectX[i[0] + i[1]].x * DecisionBe + 10
//                 //     },
//                 //     target: {
//                 //         x: 15 + RectX[i[2] + i[3]].start * 6080 * DecisionRectBei / RectX[i[2] + i[3]].s_sum + RectX[i[2] + i[3]].n * ttt + (dpp + p[i] / 2) * DecisionRectBei,
//                 //         y: 10 + RectX[i[2] + i[3]].x * DecisionBe
//                 //     }
//                 // }

//                 let dp = 0;
//                 for (let j = 0; j < parseInt(i[3]); ++j) {
//                     if (typeof (p[i[0] + i[1] + i[2] + j.toString()]) != "undefined")
//                         dp += p[i[0] + i[1] + i[2] + j.toString()];
//                 }
//                 let dpp = 0;
//                 for (let j = 0; j < parseInt(i[1]); ++j) {
//                     if (typeof (p[i[0] + j.toString() + i[2] + i[3]]) != "undefined")
//                         dpp += p[i[0] + j.toString() + i[2] + i[3]];
//                 }

//                 let lencnt1 = 0;
//                 if (RectX[i[0] + i[1]].n < RectX[i[0] + i[1]].num)
//                     lencnt1 = RectX[i[0] + i[1]].n;
//                 else lencnt1 = RectX[i[0] + i[1]].n - (RectX[i[0] + i[1]].n - RectX[i[0] + i[1]].num + 1);
//                 if (RectX[i[0] + i[1]].num == 1) {
//                     lencnt1 = 1;
//                     // tt = 3 * DecisionRectStep / 2;
//                 }

//                 let lencnt2 = 0;
//                 if (RectX[i[2] + i[3]].n < RectX[i[2] + i[3]].num)
//                     lencnt2 = RectX[i[2] + i[3]].n;
//                 else lencnt2 = RectX[i[2] + i[3]].n - (RectX[i[2] + i[3]].n - RectX[i[2] + i[3]].num + 1);
//                 if (RectX[i[2] + i[3]].num == 1) {
//                     lencnt2 = 1;
//                     // tt = 3 * DecisionRectStep / 2;
//                 }

//                 b = {
//                     source: {
//                         // x: 15 + RectX[i[0] + i[1]].start * 6080 * DecisionRectBei / RectX[i[0] + i[1]].s_sum + RectX[i[0] + i[1]].n * tt + (dp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         x: 15 + RectX[i[0] + i[1]].start * 6080 * DecisionRectBei / RectX[i[0] + i[1]].s_sum + lencnt1 * tt + (dp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         // y: 10 + CCPP[RectX[i[0] + i[1]].x] * DecisionBe * 9 / (Decision.length - 1) + 10
//                         y: 10 + CCPP[RectX[i[0] + i[1]].x] * DecisionBe + 10
//                     },
//                     target: {
//                         // x: 15 + RectX[i[2] + i[3]].start * 6080 * DecisionRectBei / RectX[i[2] + i[3]].s_sum + RectX[i[2] + i[3]].n * ttt + (dpp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         x: 15 + RectX[i[2] + i[3]].start * 6080 * DecisionRectBei / RectX[i[2] + i[3]].s_sum + lencnt2 * ttt + (dpp * 6080 / ModLen + p[i] * 6080 / ModLen / 2) * DecisionRectBei,
//                         // y: 10 + CCPP[RectX[i[2] + i[3]].x] * DecisionBe * 9 / (Decision.length - 1)

//                         y: 10 + CCPP[RectX[i[2] + i[3]].x] * DecisionBe
//                     }
//                 }
//                 dia_path.push(b);
//             }
//             // console.log(dia_path)
//             LinePaintDecision(dia_path, pValue);
//         }
//     })
// }

// PaintDecisionLine(-1, -1);

// PaintDecisionRect(-1, -1);