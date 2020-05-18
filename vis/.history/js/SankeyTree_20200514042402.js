var widtha = 384;
var heighta = 370;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0

var DecisionRectStep = 2;
var DecisionRectBei = 0.055

function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", heighta)
}

var pr = [];

var coort = [];

var tcircle = 0;
var flag = -1;
var heatmapInstance = 0;

PP()

let RectLine = ssvg.append('g');
let DecisionRect = ssvg.append('g');

function PaintUnderRect() {
    d3.csv("data/box_calc.csv", function (RectInData) {
        // console.log(RectInData);

        colorLine = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B']
        let RectInnerData = []
        for (var i in RectInData) {
            // if (parseInt(RectInData[i].biao) == num) {
            RectInnerData.push(RectInData[i])
            // }
        }
        var sort_ten = [] // 第十列排序
        var sort_one = []
        var sort_ten_inner = {}
        var sort_one_inner = {}
        var code_Num = {} // 记录编号排布
        // console.log(RectInnerData)
        for (var i in RectInnerData) {
            // sort_ten.push(parseFloat(RectInnerData[i][119]))
            sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
            // code_Num[RectInnerData[i].code] = i
        }
        // sort_ten.sort(function (a, b) {
        //     return a - b;
        // })
        sort_one.sort(function (a, b) {
            return a - b;
        })
        for (var i in sort_one) {
            // sort_ten_inner[sort_ten[i]] = i;
            sort_one_inner[sort_one[i]] = i;
        }
        for (var i in RectInnerData) {
            // if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 100)
            //     RectInnerData[i][11] = 0;
            // else if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 200)
            //     RectInnerData[i][11] = 1;
            // else
            //     RectInnerData[i][11] = 2

            if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
                RectInnerData[i][1] = 0;
            else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
                RectInnerData[i][1] = 1;
            else
                RectInnerData[i][1] = 2;
        }
        // for (var i in RectInnerData) {
        //     for (var j = 1; j <= 10; ++j) {
        //         RectInnerData[i][j * 10 + 7] = title_tip_symbol[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
        //         RectInnerData[i][j * 10 + 8] = title_tip[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
        //     }
        // }
        // console.log(RectInnerData)
        let RectOuterData = []
        for (let i = 1; i <= 10; ++i) {
            RectOuterData[i] = [];
            for (let j = 0; j <= 3; ++j) {
                RectOuterData[i].push({
                    'val': 0,
                    'member': []
                })
            }
        }
        // RectOuterData[1][0] = {
        //     'val': 0,
        //     'member': []
        // }
        // RectOuterData[1][1] = {
        //     'val': 0,
        //     'member': []
        // }
        // RectOuterData[1][2] = {
        //     'val': 0,
        //     'member': []
        // }
        for (let num = 1; num <= 10; ++num) {
            for (var i in RectInnerData) {
                RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
                RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
            }
        }
        // for (var i in RectOuterData[1]) {
        //     RectOuterData[1][i].val /= RectOuterData[1][i]["member"].length
        // }
        // console.log(RectOuterData)
        var Sankey_Rect = []
        for (var i in RectOuterData) {
            var s_num = 0;
            // console.log(i);
            for (var j in RectOuterData[i]) {
                // console.log( RectOuterData[i][j].member[0])
                if (RectOuterData[i][j].member.length == 0)
                    continue;
                a = {}
                a["x"] = i - 1
                a["n"] = j
                a["start"] = s_num
                s_num += RectOuterData[i][j].member.length
                // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
                // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
                a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
                a["end"] = s_num;
                Sankey_Rect.push(a)
            }
        }
        // console.log(Sankey_Rect)
        RectLine.selectAll(".rectLine")
            .attr("class", "rectLine")
            .data(Sankey_Rect)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return 5 + d.x * 38;
            })
            .attr("y", d => {
                // console.log(d);
                var tt = 0;
                // // if (d.x == 0) tt = 3 * steplen / 2;
                // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                return height - 475 + d.start * 0.005;
            })
            // .attr("rx", 5)
            .attr("width", 25)
            .attr("height", d => {
                return (d.end - d.start) * 0.005;
            })
            // .attr("stroke", d => {
            //     return "black"
            // })
            // .attr("stroke-width", 0.5)
            .attr("fill", d => {
                // if (d.x != 11)
                // return color[d.n];
                // console.log(d.n)
                // var colora = "#FFFFFF"
                // var colorb = "blue"

                // let colorx = d3.interpolate(colora, colorb);
                // var color_scale = d3.scale.linear()
                //     .domain([-2, 8])
                //     .range([0, 1])
                // if (d.x != 11)
                //     return colorx(color_scale(parseInt(d.weight * 2)))
                // console.log(d.weight);
                return colorLine[3 - (parseInt(d.weight))]
            })
        // .attr('rx', 2)
        // .attr('ry', 2)
        var LineCir = new Array();
        for (var i = 1; i <= 10; ++i) {
            LineCir.push(i);
        }
        RectLine.selectAll('#LineCir')
            .attr('id', 'LineCir')
            .data(LineCir)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => {
                return 17.5 + i * 38;
            })
            .attr('cy', 45)
            .attr('r', 5)
            .attr('fill', 'white')
            .attr("stroke", 'blue')
        // .attr('r', 2)

        RectLine.append('line')
            .attr('x1', 0)
            .attr('y1', 55)
            .attr('x2', 379)
            .attr('y2', 55)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('stroke-dasharray', 5.5)
    })
}

PaintUnderRect();

function PaintDecisionRect(Decision) {
    d3.csv("data/box_calc.csv", function (RectInData) {
        // console.log(RectInData);

        colorLine = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B']
        let RectInnerData = []
        for (var i in RectInData) {
            // if (parseInt(RectInData[i].biao) == num) {
            RectInnerData.push(RectInData[i])
            // }
        }
        var sort_ten = [] // 第十列排序
        var sort_one = []
        var sort_ten_inner = {}
        var sort_one_inner = {}
        var code_Num = {} // 记录编号排布
        for (var i in RectInnerData) {
            sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
        }
        sort_one.sort(function (a, b) {
            return a - b;
        })
        for (var i in sort_one) {
            // sort_ten_inner[sort_ten[i]] = i;
            sort_one_inner[sort_one[i]] = i;
        }
        for (var i in RectInnerData) {
            if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
                RectInnerData[i][1] = 0;
            else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
                RectInnerData[i][1] = 1;
            else
                RectInnerData[i][1] = 2;
        }
        let RectOuterData = []
        for (let i = 1; i <= 10; ++i) {
            RectOuterData[i] = [];
            for (let j = 0; j <= 3; ++j) {
                RectOuterData[i].push({
                    'val': 0,
                    'member': []
                })
            }
        }
        for (let num = 1; num <= 10; ++num) {
            for (var i in RectInnerData) {
                RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
                RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
            }
        }
        var Sankey_Rect = []
        for (var i in RectOuterData) {
            var s_num = 0;
            // console.log(i);
            for (var j in RectOuterData[i]) {
                // console.log( RectOuterData[i][j].member[0])
                if (RectOuterData[i][j].member.length == 0)
                    continue;
                a = {}
                a["x"] = i - 1
                a["n"] = j
                a["start"] = s_num
                s_num += RectOuterData[i][j].member.length
                // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
                // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
                a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
                a["end"] = s_num;
                Sankey_Rect.push(a)
            }
        }
        // console.log(Sankey_Rect)
        if (Decision == -1) {
            DecisionRect.selectAll(".rectLine")
                .attr("class", "rectLine")
                .data(Sankey_Rect)
                .enter()
                .append("rect")
                .attr("x", (d, i) => {
                    let tt = 0;
                    if (d.x == 6 || d.x == 8) tt = DecisionRectStep;
                    else if (d.x == 0 || d.x == 1) tt = DecisionRectStep * 3 / 2;
                    else tt = DecisionRectStep * 3;
                    return 15 + d.start * DecisionRectBei + d.n * tt;
                })
                .attr("y", d => {
                    // console.log(d);
                    var tt = 0;
                    // // if (d.x == 0) tt = 3 * steplen / 2;
                    // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                    return 70 + d.x * 32;
                })
                // .attr("rx", 5)
                .attr("width", d => {
                    return (d.end - d.start) * DecisionRectBei;
                })
                .attr("height", 10)
                .attr("fill", d => {
                    return colorLine[3 - (parseInt(d.weight))]
                })
                .attr('rx', 2)
                .attr('stroke', 'black')
                .attr('stroke-width', 0.1)
        }

    })
}

PaintDecisionRect(-1);



function link(d) {
    var curvature = .5;
    var x0 = d.source.x,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y,
        y1 = d.target.y;
    return "M" + y0 + "," + x0 +
        "C" + y0 + "," + x2 +
        " " + y1 + "," + x3 +
        " " + y1 + "," + x1;
}

var LinePaintDecision = function (dia, color) {
    // var diagonal = d3.svg.diagonal()
    //     .projection(d => {
    //         return [d.x, d.y]
    //     });

    LineName = DecisionRect.selectAll('#dia_g')
        .attr('id', 'dia_g')
        .data(dia)
        .enter()
        .append('g')
        .append('path')
        .attr('d', d => {
            console.log(d[1])
            return link(dia[0])
        })
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 10)
        .attr('stroke-opacity', 0.5)
}




function PaintDecisionLine(Decision, People) {
    d3.csv("data/box_calc.csv", function (RectInnerData) {
        // console.log(RectInData);

        colorLine = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B']
        // let RectInnerData = []
        // for (var i in RectInData) {
        //     // if (parseInt(RectInData[i].biao) == num) {
        //     RectInnerData.push(RectInData[i])
        //     // }
        // }
        var sort_ten = [] // 第十列排序
        var sort_one = []
        var sort_ten_inner = {}
        var sort_one_inner = {}
        var code_Num = {} // 记录编号排布
        for (var i in RectInnerData) {
            sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
        }
        sort_one.sort(function (a, b) {
            return a - b;
        })
        for (var i in sort_one) {
            // sort_ten_inner[sort_ten[i]] = i;
            sort_one_inner[sort_one[i]] = i;
        }
        for (var i in RectInnerData) {
            if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
                RectInnerData[i][1] = 0;
            else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
                RectInnerData[i][1] = 1;
            else
                RectInnerData[i][1] = 2;
        }
        let RectOuterData = []
        for (let i = 1; i <= 10; ++i) {
            RectOuterData[i] = [];
            for (let j = 0; j <= 3; ++j) {
                RectOuterData[i].push({
                    'val': 0,
                    'member': []
                })
            }
        }
        for (let num = 1; num <= 10; ++num) {
            for (var i in RectInnerData) {
                RectOuterData[num][RectInnerData[i][num]]['member'].push(RectInnerData[i])
                RectOuterData[num][RectInnerData[i][num]].val += parseInt(code_Num[RectInnerData[i].code])
            }
        }
        var Sankey_Rect = []
        for (var i in RectOuterData) {
            var s_num = 0;
            // console.log(i);
            for (var j in RectOuterData[i]) {
                // console.log( RectOuterData[i][j].member[0])
                if (RectOuterData[i][j].member.length == 0)
                    continue;
                a = {}
                a["x"] = i - 1
                a["n"] = j
                a["start"] = s_num
                s_num += RectOuterData[i][j].member.length
                // a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
                // a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
                a['weight'] = parseInt(RectOuterData[i][j].member[0][i])
                a["end"] = s_num;
                Sankey_Rect.push(a)
            }
        }
        // console.log(RectInData)
        var p = {}; // 计算连接线

        for (let i in RectInnerData) {
            // console.log(RectInnerData[i])
            for (let j = 1; j < 10; ++j) {
                if (typeof (p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()]) == 'undefined')
                    p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()] = 1;
                else
                    p[(j - 1).toString() + RectInnerData[i][j].toString() + (j).toString() + RectInnerData[i][j + 1].toString()]++;
            }
        }
        let dia_path = new Array();
        // console.log(p)
        let RectX = new Object();
        for (let i in Sankey_Rect) {
            // console.log(Sankey_Rect[i])
            RectX[Sankey_Rect[i].x.toString() + Sankey_Rect[i].n.toString()] = Sankey_Rect[i];
        }
        // console.table(RectX)
        // console.log(RectX);
        for (var i in p) {
            // console.log(i[0]);
            let tt = 0;
            if (RectX[i[0] + i[1]].x == 6 || RectX[i[0] + i[1]].x == 8) tt = DecisionRectStep;
            else if (RectX[i[0] + i[1]].x == 0 || RectX[i[0] + i[1]].x == 1) tt = DecisionRectStep * 3 / 2;
            else tt = DecisionRectStep * 3;
            // return 15 + d.start * DecisionRectBei + d.n * tt;
            let ttt = 0;
            // console.log(i[2] + i[3])
            if (RectX[i[2] + i[3]].x == 6 || RectX[i[2] + i[3]].x == 8) ttt = DecisionRectStep;
            else if (RectX[i[2] + i[3]].x == 0 || RectX[i[2] + i[3]].x == 1) ttt = DecisionRectStep * 3 / 2;
            else ttt = DecisionRectStep * 3;
            // return 15 + d.start * DecisionRectBei + d.n * tt;
            b = {
                source: {
                    y: 15 + RectX[i[0] + i[1]].start * DecisionRectBei + RectX[i[0] + i[1]].n * tt + (RectX[i[0] + i[1]].end - RectX[i[0] + i[1]].start) / 2 * DecisionRectBei,
                    x: 70 + RectX[i[0] + i[1]].x * 32 + 10
                },
                target: {
                    y: 15 + RectX[i[2] + i[3]].start * DecisionRectBei + RectX[i[2] + i[3]].n * ttt + (RectX[i[2] + i[3]].end - RectX[i[2] + i[3]].start) / 2 * DecisionRectBei,
                    x: 70 + RectX[i[2] + i[3]].x * 32
                }
            }

            dia_path.push(b);
        }
        // console.log(dia_path)
        LinePaintDecision(dia_path);
    })
}
PaintDecisionLine(-1, -1);

