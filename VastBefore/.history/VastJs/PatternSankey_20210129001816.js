var widthMain = document.getElementById("ganttView").offsetWidth,
    heightMain = document.getElementById("ganttView").offsetHeight;

var svgMain;

svgMain = d3.select("#ganttView").append("svg")
    .attr("width", widthMain)
    .attr("height", heightMain);
var padding = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

var svg = 0;
var zg = 0;
var cirg = 0;
var Rect_g = 0;
var con_g = 0
var g = 0;
var text_g = 0;
var type_g = 0;

var bei = 1
var steplen = 3

var number = 1;

var rectWidth = 40;
var rectStep = (widthMain - 13 * rectWidth) / 8.2;
var LineName = 0;
var Line_Name = 0;
var L = 0;
var K = 0;
var orange_rect = 0;
var firstjudge = -1;

var title = ['wealth', 'work', 'health', 'insurance', 'loan', 'investment', 'risk', 'disaster', 'lottery', 'ill', 'unemploy', 'rank', 'preference']

var title_tip_symbol = [
    ['poor', 'rich'],
    ['low', 'mid', 'high'],
    ['0', '5', '10'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'low', 'mid', 'high'],
    ['No', 'Yes'],
    ['No', 'low', 'mid', 'high'],
    ['No', 'Yes'],
    ['low', 'mid', 'high'],
    ['0', '1', '2', '3', '4', '5', '6']
]

function PaintRect(pattern_data) {
            d3.csv("data/box_calc_rank.csv").then((RectInDataR) => {
                    RectInData = pattern_data;
                    if (Rect_g != 0) Rect_g.remove()
                    if (text_g != 0) text_g.remove()
                    let width = widthMain;
                    let height = heightMain;
                    let num = 0;

                    Rect_g = svgMain.append('g').attr("transform", "translate(" + 0 + "," + -500 + ")")

                    text_g = svgMain.append('g')
                        .attr("transform", "translate(" + 0 + "," + -5 + ")");


                    var textk = text_g.selectAll('#textk')
                        .attr("id", "trextk")
                        .data(title)
                        .enter()
                        .append('text')
                        .attr('fill', 'black')
                        .attr('font-size', '15px')
                        .attr('text-anchor', 'middle')
                        .attr("font-family", "courier")
                        .attr('x', function (d, i) {
                            return padding.left + i * rectStep;
                        })
                        .attr('y', function (d) {
                            return height - padding.bottom - 28;
                        })
                        .attr('dx', rectWidth / 2) //dx是相对于x平移的大小
                        .attr('dy', '-1em') //dy是相对于y平移的大小
                        .text(function (d) {
                            // console.log(d.length);
                            return d;
                        })


                    let minx = 999;
                    let maxx = 0

                    for (var i = 0; i < pattern_data; ++i) {
                        // console.log(d[i][91])
                        if (parseFloat(d[i][19]) > maxx) maxx = parseFloat(d[i][19]);
                        if (parseFloat(d[i][19]) < minx) minx = parseFloat(d[i][19]);
                        if (parseFloat(d[i][29]) > maxx) maxx = parseFloat(d[i][29]);
                        if (parseFloat(d[i][29]) < minx) minx = parseFloat(d[i][29]);
                        if (parseFloat(d[i][129]) > maxx) maxx = parseFloat(d[i][129]);
                        if (parseFloat(d[i][129]) < minx) minx = parseFloat(d[i][129]);
                        if (parseFloat(d[i][39]) > maxx) maxx = parseFloat(d[i][39]);
                        if (parseFloat(d[i][39]) < minx) minx = parseFloat(d[i][39]);
                        if (parseFloat(d[i][49]) > maxx) maxx = parseFloat(d[i][49]);
                        if (parseFloat(d[i][49]) < minx) minx = parseFloat(d[i][49]);
                        if (parseFloat(d[i][59]) > maxx) maxx = parseFloat(d[i][59]);
                        if (parseFloat(d[i][59]) < minx) minx = parseFloat(d[i][59]);
                        if (parseFloat(d[i][69]) > maxx) maxx = parseFloat(d[i][69]);
                        if (parseFloat(d[i][69]) < minx) minx = parseFloat(d[i][69]);
                        if (parseFloat(d[i][79]) > maxx) maxx = parseFloat(d[i][79]);
                        if (parseFloat(d[i][79]) < minx) minx = parseFloat(d[i][79]);
                        if (parseFloat(d[i][89]) > maxx) maxx = parseFloat(d[i][89]);
                        if (parseFloat(d[i][89]) < minx) minx = parseFloat(d[i][89]);
                        if (parseFloat(d[i][99]) > maxx) maxx = parseFloat(d[i][99]);
                        if (parseFloat(d[i][99]) < minx) minx = parseFloat(d[i][99]);
                    }
                    // 计算比例尺
                    var lne_line = Math.max(Math.abs(maxx), Math.abs(minx));
                    if (lne_line > 550) lne_line = 550;

                    var line_linear = d3.scaleLinear()
                        .domain([0, lne_line])
                        .range([0, 70])

                    // 减少杂化
                    let RectInnerData = []
                    // for (var i in RectInData) {
                    //     if (parseInt(RectInData[i].biao) == num) {
                    //         RectInnerData.push(RectInData[i])
                    //     }
                    // }
                    RectInnerData = RectInData;
                    var sort_ten = [] // 第十列排序
                    var sort_one = []
                    var sort_ten_inner = {}
                    var sort_one_inner = {}
                    var code_Num = {} // 记录编号排布
                    // console.log(RectInnerData)
                    // for (var i in RectInnerData) {
                    //     sort_ten.push(parseFloat(RectInnerData[i][129]))
                    //     sort_one.push(parseFloat(RectInnerData[i][39]) - parseFloat(RectInnerData[i][29]))
                    //     code_Num[RectInnerData[i].code] = i
                    // }
                    // sort_ten.sort(function (a, b) {
                    //     return a - b;
                    // })
                    // sort_one.sort(function (a, b) {
                    //     return a - b;
                    // })
                    // for (var i in sort_ten) {
                    //     sort_ten_inner[sort_ten[i]] = i;
                    //     sort_one_inner[sort_one[i]] = i;
                    // }
                    // for (var i in RectInnerData) {
                    //     if (parseInt(sort_ten_inner[RectInnerData[i][129]]) <= 100)
                    //         RectInnerData[i][12] = 0;
                    //     else if (parseInt(sort_ten_inner[RectInnerData[i][129]]) <= 200)
                    //         RectInnerData[i][12] = 1;
                    //     else
                    //         RectInnerData[i][12] = 2

                    //     // if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][39]) - parseFloat(RectInnerData[i][29])]) <= 100)
                    //     //     RectInnerData[i][2] = 0;
                    //     // else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][39]) - parseFloat(RectInnerData[i][29])]) <= 200)
                    //     //     RectInnerData[i][2] = 1;
                    //     // else
                    //     //     RectInnerData[i][2] = 2;

                    // }


                    for (var i in RectInnerData) {
                        for (var j = 1; j <= 13; ++j) {
                            RectInnerData[i][j * 10 + 7] = title_tip_symbol[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
                            // RectInnerData[i][j * 10 + 8] = title_tip[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
                        }
                    }
                    // console.log(RectInnerData)
                    let RectOuterData = []
                    RectOuterData[1] = []
                    if (num == 1)
                        RectOuterData[1][0] = {
                            'val': 0,
                            'member': []
                        }
                    else {
                        RectOuterData[1][0] = {
                            'val': 0,
                            'member': []
                        }
                        RectOuterData[1][1] = {
                            'val': 0,
                            'member': []
                        }
                    }

                    // RectOuterData[1][2] = {
                    //     'val': 0,
                    //     'member': []
                    // }
                    for (var i in RectInnerData) {
                        RectOuterData[1][RectInnerData[i][1]]['member'].push(RectInnerData[i])
                        RectOuterData[1][RectInnerData[i][1]].val += parseInt(code_Num[RectInnerData[i].code])
                    }
                    for (var i in RectOuterData[1]) {
                        RectOuterData[1][i].val /= RectOuterData[1][i]["member"].length
                    }
                    // for (var t = 1; t <= 20; ++t) {
                    for (var k = 2; k <= 13; ++k) {
                        // console.log(k)
                        if (typeof (RectOuterData[k]) == "undefined")
                            RectOuterData[k] = []
                        for (var i in RectOuterData[k - 1]) {
                            for (var j in RectOuterData[k - 1][i]["member"]) {
                                RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]] = {
                                    "val": 0,
                                    "member": []
                                }
                            }
                        }
                        for (var i in RectOuterData[k - 1]) {
                            for (var j in RectOuterData[k - 1][i]["member"]) {
                                // RectOuterData[k - 1][i]["member"][j][k] 对应的分类
                                RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].val += parseInt(code_Num[RectOuterData[k - 1][i]["member"][j]["code"]])
                                RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].member.push(RectOuterData[k - 1][i]["member"][j])
                            }
                        }
                        for (var i in RectOuterData[k]) {
                            RectOuterData[k][i].val /= RectOuterData[k][i]["member"].length
                        }
                        RectOuterData[k].sort(function (a, b) {
                            return a.val - b.val;
                        })
                        for (var i in RectOuterData[k]) {
                            for (var j in RectOuterData[k][i]["member"]) {
                                if (i == 0)
                                    code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j)
                                else
                                    code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j) + RectOuterData[k][i]["member"].length
                            }
                        }
                        // console.log(code_Num)
                    }
                    for (var k = 12; k >= 1; --k) {
                        for (var i in RectOuterData[k + 1]) {
                            for (var j in RectOuterData[k + 1][i]["member"]) {
                                RectOuterData[k][RectOuterData[k + 1][i]["member"][j][k]] = {
                                    "val": 0,
                                    "member": []
                                }
                            }
                        }
                        for (var i in RectOuterData[k + 1]) {
                            for (var j in RectOuterData[k + 1][i]["member"]) {
                                // RectOuterData[k - 1][i]["member"][j][k] 对应的分类
                                // if (typeof (RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]]) == "undefined")
                                // console.log("i = " + i + "; j = " + j)
                                RectOuterData[k][RectOuterData[k + 1][i]["member"][j][k]].val += parseInt(code_Num[RectOuterData[k + 1][i]["member"][j]["code"]])
                                RectOuterData[k][RectOuterData[k + 1][i]["member"][j][k]].member.push(RectOuterData[k + 1][i]["member"][j])
                            }
                        }
                        for (var i in RectOuterData[k]) {
                            RectOuterData[k][i].val /= RectOuterData[k][i]["member"].length
                        }
                        RectOuterData[k].sort(function (a, b) {
                            return a.val - b.val;
                        })
                        for (var i in RectOuterData[k]) {
                            for (var j in RectOuterData[k][i]["member"]) {
                                if (i == 0)
                                    code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j)
                                else
                                    code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j) + RectOuterData[k][i]["member"].length
                            }
                        }
                        // console.log(code_Num)
                    }
                    var Sankey_Rect = []
                    for (var i in RectOuterData) {
                        var s_num = 0;
                        for (var j in RectOuterData[i]) {
                            // console.log( RectOuterData[i][j].member[0])
                            // if (typeof(RectOuterData[i][j].member[0][i * 10 + 8]) == 'undefined') {
                            // console.log(RectOuterData[i][j].member[0]);
                            // }
                            a = {}
                            a["x"] = i - 1
                            a["n"] = j
                            a["start"] = s_num
                            a['rectcnt'] = RectOuterData[i].length
                            s_num += RectOuterData[i][j].member.length
                            a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
                            a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
                            a['weight'] = RectOuterData[i][j].member[0][i]
                            a["end"] = s_num;
                            Sankey_Rect.push(a)
                        }
                    }


                    var Font_scale = d3.scaleLinear()
                        .domain([1, 3])
                        .range([15, 20])

                    Rect_g.selectAll(".recta")
                        .attr("class", "recta")
                        .data(Sankey_Rect)
                        .enter()
                        .append("line")
                        .attr("x1", (d, i) => {
                            return padding.left + d.x * rectStep + rectWidth / 2;
                        })
                        .attr("y1", d => {
                            // console.log(d);
                            var tt = steplen;
                            // // if (d.x == 0) tt = 3 * steplen / 2;
                            // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                            // if (d.x == 9 && (num == 1 || num == 10)) {
                            if (d.rectcnt == 1) {
                                return height - padding.top - 375 + d.start * bei + 3 * steplen - 10;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
                                tt = 6 * steplen;
                            } else {
                                tt = steplen;
                            }
                            return height - padding.top - 375 + d.start * bei + d.n * tt - 10;
                        })
                        // .attr("rx", 5)
                        // .attr("width", rectWidth)
                        // .attr("height", d => {
                        //     return (d.end - d.start) * bei;
                        // })
                        .attr('x2', d => {
                            return padding.left + d.x * rectStep + rectWidth / 2;
                        })
                        .attr('y2', d => {
                            let tt = steplen;
                            if (d.rectcnt == 1) {
                                return height - padding.top - 375 + d.start * bei + 3 * steplen - 10 + (d.end - d.start) * bei;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
                                tt = 6 * steplen;
                            }
                            return height - padding.top - 375 + d.start * bei + d.n * tt - 10 + (d.end - d.start) * bei;
                        })
                        .attr("stroke", d => {
                            return "black"
                        })
                        .attr("stroke-width", 1)
                        .attr("fill", d => {
                            // if (d.x != 11)
                            // return color[d.n];
                            // console.log(d.n)
                            // var colora = "#FFFFFF"
                            // var colorb = "blue"

                            // let colorx = d3.interpolate(colora, colorb);
                            // var color_scale = d3.scaleLinear()
                            //     .domain([-2, 8])
                            //     .range([0, 1])
                            // if (d.x != 11)
                            //     return colorx(color_scale(parseInt(d.weight * 2)))
                            // return colorx(color_scale(parseInt(d.weight)))
                            return "none";
                        })
                        .attr("fill-opacity", d => {
                            if (d.x != 11)
                                return 1
                            else
                                return 1
                        })
                    Rect_g.selectAll(".recta")
                        .data(Sankey_Rect)
                        .enter()
                        .append('text')
                        .attr('fill', 'black')
                        .attr('font-size', (d, i) => {
                            // if (d.weight == 0 || (d.x == 11) || d.x == 7 || d.x == 10 || d.x == 9)
                            //     return '15px'
                            // else
                            //     return Font_scale(parseInt(d.weight))
                            return '12px';
                        })
                        .attr('font-weight', 'bold')
                        .attr('text-anchor', 'head')
                        .attr("font-family", "courier")
                        .attr('x', function (d, i) {
                            return padding.left + d.x * rectStep + rectWidth - 8;
                        })
                        .attr('y', function (d) {
                            // console.log(d);
                            var tt = steplen;
                            // if (d.x == 0) tt = 3 * steplen / 2;
                            // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                            // if (d.symbol == '🈚' && d.n != 0) tt += 10
                            if (d.rectcnt == 1) {

                                return height - padding.top - 375 + d.start * bei + 3 * steplen;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
                                tt = 6 * steplen;
                            }
                            return height - padding.top - 375 + d.start * bei + d.n * tt;
                        })
                        .attr('dx', '0em') //dx是相对于x平移的大小
                        .attr('dy', '-0em') //dy是相对于y平移的大小
                        .text(function (d) {
                            // if (d.end - d.start >= 20)
                            return d.symbol;
                        })

                    var Rect_Line_Data = []; // 块内横线的数据
                    var p = {}; // 计算连接线

                    for (var i = 0; i < RectInData.length; ++i) {
                        p[RectInData[i].code] = {};
                    }
                    // console.log(RectOuterData);
                    for (var i in RectOuterData) {
                        var s_num = 0;
                        for (var j in RectOuterData[i]) {
                            for (var k in RectOuterData[i][j].member) {
                                var a = {
                                    "x": i - 1, // 第几列
                                    "y": parseInt(k) + s_num, // 第几行
                                    "v": parseFloat(RectOuterData[i][j]["member"][k][i * 10 + 9]), // 长度
                                    "n": parseInt(j),
                                    "id": RectOuterData[i][j]["member"][k].code,
                                    // "label": code_Label[RectOuterData[i][j]["member"][k].code],
                                    "Llabel": parseInt(RectOuterData[i][j]["member"][k]['12']),
                                    "treat": parseInt(RectOuterData[i][j]["member"][k].treat),
                                    'num': num,
                                    'rectcnt': RectOuterData[i].length
                                }
                                p[a.id][i - 1] = a;
                                Rect_Line_Data.push(a)
                            }
                            s_num += RectOuterData[i][j].member.length
                        }
                    }

                    // 格内画线     
                    // Rect_g.selectAll(".line")
                    //     .attr("class", "line")
                    //     .data(Rect_Line_Data)
                    //     .enter()
                    //     .append("line")
                    //     .attr("x1", (d, i) => {
                    //         var lenr = 0;
                    //         if (d.v > 550) d.v = 550;
                    //         if (d.v < -550) d.v = -550;
                    //         if (d.v < 0) lenr = -1
                    //         return padding.left + d.x * rectStep + 0.5 + rectWidth / 2 + lenr;
                    //     })
                    //     .attr("y1", (d, i) => {
                    //         // console.log(d)
                    //         var tt = steplen;
                    //         // if (d.x == 0) tt = 3 * steplen / 2;
                    //         // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                    //         if (d.rectcnt == 1) {
                    //             return d.y * bei + height - padding.top - 375 + 3 * steplen - 10;
                    //         }
                    //         // if (d.x == 0 || d.x == 1 || d.x == 10) {
                    //         if (d.rectcnt == 3) {
                    //             tt = 3 * steplen;
                    //             // } else if (d.x == 6 || d.x == 8) {
                    //         } else if (d.rectcnt == 4) {
                    //             tt = 2 * steplen;
                    //             // } else if (d.x != 11) {
                    //         } else if (d.rectcnt == 2) {
                    //             tt = 6 * steplen;
                    //         }
                    //         return d.y * bei + height - padding.top - 375 + d.n * tt - 10;
                    //     })
                    //     .attr("x2", (d, i) => {
                    //         var len;
                    //         var lenr = 0;
                    //         if (d.v > 550) d.v = 550;
                    //         if (d.v < -550) d.v = -550;
                    //         if (d.v < 0) lenr = -1
                    //         len = line_linear(Math.abs(d.v)) / 2
                    //         if (d.v < 0)
                    //             len = -len;
                    //         // if (d.v >= 0)
                    //         // len = linearZ(d.v);
                    //         // else if (d.v <= 0)
                    //         // len = linearF(d.v);
                    //         return padding.left + d.x * rectStep + len + 0.5 + rectWidth / 2 + lenr;
                    //     })
                    //     .attr("y2", (d, i) => {

                    //         var tt = steplen;
                    //         // if (d.x == 0) tt = 3 * steplen / 2;
                    //         // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                    //         if (d.rectcnt == 1) {
                    //             return d.y * bei + height - padding.top - 375 + 3 * steplen - 10;
                    //         }
                    //         // if (d.x == 0 || d.x == 1 || d.x == 10) {
                    //         if (d.rectcnt == 3) {
                    //             tt = 3 * steplen;
                    //             // } else if (d.x == 6 || d.x == 8) {
                    //         } else if (d.rectcnt == 4) {
                    //             tt = 2 * steplen;
                    //             // } else if (d.x != 11) {
                    //         } else if (d.rectcnt == 2) {
                    //             tt = 6 * steplen;
                    //         }
                    //         return d.y * bei + height - padding.top - 375 + d.n * tt - 10;
                    //     })
                    //     .attr("stroke", d => {
                    //         if (d.Llabel == 2)
                    //             // return "#D8483E";
                    //             return "#41CA77";
                    //         else if (d.Llabel == 1) {
                    //             return "#F3AC2A";
                    //         } else
                    //             // return "#41CA77";
                    //             return "#D8483E";
                    //     })
                    //     .attr("stroke-width", 1);


                    // var path = PathCalc(p, -1, -1, num);

                    // LinePaint(path[0], path[2], "black")
                    // 画桑基块
                    // Rect_g.selectAll(".recta")
                    //     .attr("class", "recta")
                    //     .data(Sankey_Rect)
                    //     .enter()
                    //     .append("rect")
                    //     .attr("x", (d, i) => {
                    //         return padding.left + d.x * rectStep;
                    //     })
                    //     .attr("y", d => {
                    //         // console.log(d);
                    //         var tt = steplen;
                    //         // // if (d.x == 0) tt = 3 * steplen / 2;
                    //         // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                    //         if (d.rectcnt == 1) {
                    //             return heightMain - padding.top + d.start * bei + 3 * steplen - 10;
                    //         }
                    //         // if (d.x == 0 || d.x == 1 || d.x == 10) {
                    //         if (d.rectcnt == 3) {
                    //             tt = 3 * steplen;
                    //             // } else if (d.x == 6 || d.x == 8) {
                    //         } else if (d.rectcnt == 4) {
                    //             tt = 2 * steplen;
                    //             // } else if (d.x != 11) {
                    //         } else if (d.rectcnt == 2) {
                    //             tt = 6 * steplen;
                    //         }
                    //         return heightMain - padding.top + d.start * bei + d.n * tt - 10;
                    //     })
                    //     // .attr("rx", 5)
                    //     .attr("width", rectWidth)
                    //     .attr("height", d => {
                    //         return (d.end - d.start) * bei;
                    //     })
                    //     .attr("stroke", d => {
                    //         return "black"
                    //     })
                    //     .attr("stroke-width", 0)
                    //     .attr('stroke-opacity', 0.5)
                    //     .attr("fill", d => {
                    //         return "black";
                    //     })
                    //     .attr("fill-opacity", d => {
                    //         // if (d.x != 11)
                    //         //     return 1
                    //         // else
                    //         //     return 1
                    //         return 0;
                    //     })
                })
}
